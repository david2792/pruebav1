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
exports.servicioControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class ServicioControlador {
    recuperarCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(CodigoProducto)+1 AS codigo FROM productos');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield conexionBD_1.default.query('SELECT * FROM vproductos where  Categoria = "SERVICIO" and CodigoProducto>0');
            res.json(productos);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield conexionBD_1.default.query('SELECT * FROM  vproductos WHERE Codigoproducto=?', [id]);
            if (productos.length > 0) {
                return res.json(productos[0]);
                console.log(productos);
            }
            res.status(404).json({ text: 'El producto no existe' });
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const Codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoProducto)+1 AS Codigo FROM productos');
                JSON.stringify(Codigo);
                const CodigoProducto = Codigo[0].Codigo;
                const categoria = "SERVICIO";
                const marca = "NO DEFINIDO";
                const idimpuesto = "3";
                const iddeposito = "1";
                // se inicia recuperando los datos de la tabla productos
                let producto = req.body.productos;
                const CodigoCategoria = '2';
                const CodigoMarca = '1';
                const CodigoUnidad = '1';
                const CodigoRepresentante = '1';
                const CodigImpuesto = '3';
                const CodigoBarra = CodigoProducto;
                const Descripcion = producto.Descripcion;
                const cantidadpaquete = '0';
                const perecedero = '1';
                const peso = '0';
                const estado = '1';
                const productos = {
                    CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
                    CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
                }; // datos de productos
                const codigoDeposito = '1';
                const StockActual = 0;
                const StockMinimo = 0;
                const StockMaximo = 0;
                const PrecioCompra = producto.PrecioCompra;
                const PrecioVentaMinorista = producto.PrecioVentaMinorista;
                const PrecioVentaMayorista = producto.PrecioVentaMinorista;
                const UtilidadMinima = 0;
                const UtilidadMaxima = 0;
                const stock = {
                    codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                    PrecioVentaMayorista
                };
                // console.log(stock)
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('INSERT INTO productos  SET ?', productos); // se inserta los datos en la tabla productos
                yield transaccionBD_1.default.query('INSERT INTO stock  SET ?', stock); // se inserta los datos en la tabla stock
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                const vproducto = yield conexionBD_1.default.query('SELECT * FROM vproductos where Categoria = "SERVICIO" and CodigoProducto>0');
                res.json(vproducto);
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let producto = req.body.productos;
            const categoria = "SERVICIO";
            const marca = "NO DEFINIDO";
            const idimpuesto = "3";
            const iddeposito = "1";
            // se inicia recuperando los datos de la tabla productos
            const CodigoProducto = producto.CodigoProducto;
            const CodigoCategoria = '2';
            const CodigoMarca = '1';
            const CodigoUnidad = '1';
            const CodigoRepresentante = '1';
            const CodigImpuesto = '3';
            const CodigoBarra = CodigoProducto;
            const Descripcion = producto.Descripcion;
            const cantidadpaquete = '0';
            const perecedero = '1';
            const peso = '0';
            const estado = '1';
            const productos = {
                CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
                CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
            }; // datos de productos
            console.log(productos);
            const codigoDeposito = '1';
            const StockActual = 0;
            const StockMinimo = 0;
            const StockMaximo = 0;
            const PrecioCompra = producto.PrecioCompra;
            const PrecioVentaMinorista = producto.PrecioVentaMinorista;
            const PrecioVentaMayorista = producto.PrecioVentaMinorista;
            const UtilidadMinima = 0;
            const UtilidadMaxima = 0;
            const stock = {
                codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
                PrecioVentaMayorista
            };
            try {
                console.time('loop');
                yield transaccionBD_1.default.query("SET autocommit=0");
                yield transaccionBD_1.default.query('UPDATE productos  SET ? WHERE codigoproducto= ?', [productos, CodigoProducto]); // se inserta los datos en la tabla productos
                yield transaccionBD_1.default.query('UPDATE  stock  SET ? WHERE codigoproducto= ?', [stock, CodigoProducto]); // se inserta los datos en la tabla stock
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                const vproducto = yield conexionBD_1.default.query('SELECT * FROM vproductos where Categoria = "SERVICIO" and CodigoProducto>0');
                res.json(vproducto);
                console.timeEnd('loop');
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    listarFamilia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familia = yield conexionBD_1.default.query('SELECT * FROM familias');
            res.json(familia);
        });
    }
    listarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const familias = yield conexionBD_1.default.query('SELECT * FROM categorias');
            res.json(familias);
        });
    }
    listarDeposito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const deposito = yield conexionBD_1.default.query('SELECT * FROM depositos');
            res.json(deposito);
        });
    }
    listarImpuesto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM tipoimpuesto');
            res.json(unidad);
        });
    }
    listarMarcas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM marcas');
            res.json(marcas);
        });
    }
    listarMedida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const unidad = yield conexionBD_1.default.query('SELECT * FROM unidadesmedida');
            res.json(unidad);
        });
    }
    listarPresentacion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const presentaciones = yield conexionBD_1.default.query('SELECT * FROM presentaciones');
            res.json(presentaciones);
        });
    }
    eliminar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('DELETE FROM productos WHERE codigoproducto=?', [id]);
            res.json({ message: 'La el producto fue eliminado' });
        });
    }
}
exports.servicioControlador = new ServicioControlador();
