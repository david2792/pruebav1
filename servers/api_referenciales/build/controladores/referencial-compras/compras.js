"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comprasControlador = void 0;
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class ComprasControlador {
    guardarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tablas afectadas: Factura Compras, Detalle Factura Compra, Stock(actual), Cuentas a pagar
            try {
                // Recibir datos del frontend --> Interfaz compras
                let cabecera_compra = req.body.cabecera_compras;
                let detalle_compras = req.body.detalle_compras;
                // Preparar transaccion
                // Deshabilitar autocommit
                yield transaccionBD_1.default.query("SET autocommit=0");
                // Preparar insert de la cabecera factura
                yield transaccionBD_1.default.query("INSERT INTO facturascompras SET ?", cabecera_compra);
                // Recorrer lista detalle y filtar campos
                for (let index in detalle_compras) {
                    // Asignar valores a utilizar
                    const NroFactura = cabecera_compra.NroFactura;
                    const CodigoProducto = detalle_compras[index].CodigoProducto;
                    const Cantidad = detalle_compras[index].Cantidad;
                    const Precio = detalle_compras[index].Precio;
                    const SubTotal = detalle_compras[index].SubTotal;
                    // crear una lista de las asignaciones ateriores
                    const detalle = { NroFactura, CodigoProducto, Cantidad, Precio, SubTotal };
                    //Preparar insert detalle factura.
                    yield transaccionBD_1.default.query('INSERT INTO detallefacturacompra SET ? ', detalle);
                    // Seleccionar stock a actualizar
                    const consulta_Stock = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [CodigoProducto]);
                    console.log("Sumar", consulta_Stock[0].StockActual, "+", Cantidad);
                    // Realizar suma del stock actual y la cantidad comprada
                    const Stock = consulta_Stock[0].StockActual + Cantidad;
                    console.log("Total: ", Stock);
                    // Actualizar el stock
                    yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [Stock, CodigoProducto]);
                }
                // Fin del ciclo for
                // Iniciar Cuentas a pagar
                const NroCuota = 1;
                const MontoCuota = cabecera_compra.Total;
                const cancelado = 0;
                const Vencimiento = cabecera_compra.Fecha;
                const NroFactura = cabecera_compra.NroFactura;
                const CuentasAPagar = { NroCuota, MontoCuota, cancelado, Vencimiento, NroFactura };
                yield transaccionBD_1.default.query("INSERT INTO cuentaspagar SET ?", CuentasAPagar);
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                res.json({ "mensaje": "Registro existoso" });
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
}
exports.comprasControlador = new ComprasControlador();
