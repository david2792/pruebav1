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
exports.facturacionControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class FacturacionControlador {
    validarApertura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioCajero } = req.params;
            const apertura = yield conexionBD_1.default.query('SELECT * FROM vaperturascaja WHERE estado=1 AND usuarioCajero=?', usuarioCajero);
            console.log(apertura);
            res.json(apertura);
        });
    }
    validarTimbrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { documento } = req.params;
            console.log(documento);
            const timbrado = yield conexionBD_1.default.query('SELECT * FROM timbrados WHERE estado=1 AND CodigoTiposDocumento=?', documento);
            console.log(timbrado);
            res.json(timbrado);
        });
    }
    guardarFactura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(NumeroFactura)+1 AS codigo FROM facturasventas');
                JSON.stringify(codigomaximo);
                let NumeroFactura = codigomaximo[0].codigo;
                if (NumeroFactura == null) {
                    NumeroFactura = 1;
                }
                const Vencimiento = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                let factura = req.body.cabeceras;
                const NumeroApertura = factura.numeroApertura;
                const CodigoSucursal = factura.CodigoSucursal;
                const NumeroTimbrado = factura.NumeroTimbrado;
                const PuntoExpedicion = factura.PuntoExpedicion;
                const CodigoUsuario = factura.CodigoUsuario;
                const CodigoTiposDocumento = factura.CodigoTiposDocumento;
                const CodigoCondicion = factura.CodigoCondicion;
                const CodigoFormasCobro = factura.CodigoFormasCobro;
                const CodigoCliente = factura.CodigoCliente;
                const Apodo = "sin apodo";
                const Fecha = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                const Hora = "00:00:00";
                const Estado = 0;
                const TotalLetras = "sin letras";
                const cabecera = { CodigoTiposDocumento, NumeroTimbrado, CodigoSucursal, PuntoExpedicion, NumeroFactura, CodigoCondicion,
                    CodigoFormasCobro, CodigoCliente, Apodo, CodigoUsuario, Fecha, Hora, Estado, TotalLetras };
                console.log(cabecera);
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('INSERT INTO facturasventas  SET ?', cabecera);
                let deta = req.body.detalles.datosDetalle;
                console.log(deta);
                for (let i in deta) {
                    const codigoproducto = deta[i].codigoproducto;
                    const cantidad = deta[i].cantidad;
                    const descripcion = deta[i].descripcion;
                    const precio = deta[i].precio;
                    const descuento = 0;
                    const TasaImpuesto = 1;
                    const preciocompra = 0;
                    const detalle = { NumeroTimbrado, CodigoSucursal, PuntoExpedicion, NumeroFactura, codigoproducto, cantidad, descripcion,
                        precio, descuento, TasaImpuesto, preciocompra };
                    yield transaccionBD_1.default.query('INSERT INTO detallesfacturasventas  SET ?', detalle);
                    const consulta = yield transaccionBD_1.default.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [codigoproducto]);
                    const stockanterior = consulta[0].StockActual;
                    console.log(stockanterior);
                    const stockactual = stockanterior - cantidad;
                    yield transaccionBD_1.default.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [stockactual, codigoproducto]);
                    // descontar stock
                    //  inicia cuentas a cobrar
                }
                // confirma orden de trabajo si existe
                let numeroorden = req.body.orden.numero;
                if (numeroorden != null) {
                    console.log("paso para confirmar la orden" + numeroorden);
                    yield transaccionBD_1.default.query('UPDATE ordenestrabajos SET codigoestadoorden=? WHERE numero=?', [2, numeroorden]);
                }
                // fin orden
                let cuentacobrar = req.body.detalles;
                const NumeroCuota = 1;
                const MontoCuota = cuentacobrar.total;
                const MontoPagado = cuentacobrar.total;
                const cancelado = 0;
                const cuenta = { NumeroCuota, NumeroTimbrado, CodigoSucursal, PuntoExpedicion, NumeroFactura, MontoCuota, MontoPagado, Vencimiento, cancelado };
                yield transaccionBD_1.default.query('INSERT INTO cuentascobrar  SET ?', cuenta);
                //          movimiento caja
                const codigomovimiento = yield conexionBD_1.default.query('SELECT MAX(NumeroOperacion)+1 AS codigo FROM movimientoscaja');
                JSON.stringify(codigomovimiento);
                let NumeroOperacion = codigomovimiento[0].codigo;
                if (NumeroOperacion == null) {
                    NumeroOperacion = 1;
                }
                const Descripcion = "pago de factura";
                const CodigoOperacion = 1;
                const movimiento = { NumeroOperacion, NumeroApertura, CodigoOperacion, Fecha, Hora, Descripcion, Estado };
                yield transaccionBD_1.default.query('INSERT INTO movimientoscaja  SET ?', movimiento);
                // Detalle movimiento
                const Monto = cuentacobrar.total;
                const detallemovimiento = { NumeroOperacion, NumeroCuota, NumeroTimbrado, CodigoSucursal, PuntoExpedicion, NumeroFactura, Monto };
                yield transaccionBD_1.default.query('INSERT INTO detallesmovimientoscaja  SET ?', detallemovimiento);
                // detalle  tipo de cobro
                const CodigoTiposCobro = 1;
                const detalletipocobro = { CodigoTiposCobro, NumeroOperacion, Monto };
                yield transaccionBD_1.default.query('INSERT INTO detallestiposcobro  SET ?', detalletipocobro);
                // fin
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                const vOrdenes = yield conexionBD_1.default.query('SELECT * FROM vfacturasventas ');
                const vCabecera = yield conexionBD_1.default.query('SELECT * FROM vfacturasventas where NumeroFactura = ?', [NumeroFactura]);
                res.json({ 'cabecera': vCabecera, 'vOrdenes': vOrdenes });
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
exports.facturacionControlador = new FacturacionControlador();
