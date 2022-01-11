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
exports.recepcionvehiculoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class RecepcionVehiculoControlador {
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vclientevehiculos WHERE  CodigoCliente=?', id);
            //   console.log(marcas)
            res.json(marcas);
        });
    }
    listarUno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE numero=?', id);
            console.log(marcas);
            res.json(marcas);
        });
    }
    listarRecepcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const marcas = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=1');
            for (let i in marcas) {
                marcas[i].fechaentrada = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            }
            console.log("hola");
            res.json(marcas);
        });
    }
    guardar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield transaccionBD_1.default.query("SET autocommit=0");
                let recepcion = req.body.recepciones;
                const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(numero)+1 AS codigo FROM recepciones');
                JSON.stringify(codigomaximo);
                let numero = codigomaximo[0].codigo;
                if (numero == null) {
                    numero = 1;
                }
                const codigosucursal = recepcion.codigosucursal;
                const puntoexpedicion = recepcion.puntoexpedicion;
                const CodigoCliente = recepcion.codigocliente;
                const recibidopor = recepcion.recibidopor;
                const estado = "1";
                const fechaentrada = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                const horaentrada = "00:00:00";
                const observaciones = recepcion.observaciones;
                const recepciones = { codigosucursal, puntoexpedicion, numero, CodigoCliente, recibidopor, estado, fechaentrada,
                    horaentrada, observaciones };
                console.log(recepciones);
                yield transaccionBD_1.default.query('INSERT INTO recepciones  SET ?', recepciones);
                //   let detalle=req.body.detalles;
                const codigonivelcombustible = recepcion.codigonivelcombustible;
                const codigovehiculos = recepcion.codigovehiculo;
                const km = recepcion.km;
                const detalleRecepcion = { codigosucursal, puntoexpedicion, numero, codigovehiculos, codigonivelcombustible, km };
                yield transaccionBD_1.default.query('INSERT INTO detallesrecepciones  SET ?', detalleRecepcion);
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                const vRecepcion = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=1');
                for (let i in vRecepcion) {
                    vRecepcion[i].fechaentrada = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                }
                res.json(vRecepcion);
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
            try {
                yield transaccionBD_1.default.query("SET autocommit=0");
                let recepcion = req.body.recepciones;
                const numero = recepcion.numero;
                const codigosucursal = recepcion.codigosucursal;
                const puntoexpedicion = recepcion.puntoexpedicion;
                const CodigoCliente = recepcion.codigocliente;
                const recibidopor = recepcion.recibidopor;
                const estado = "1";
                const fechaentrada = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                const horaentrada = "00:00:00";
                const observaciones = recepcion.observaciones;
                const recepciones = { codigosucursal, puntoexpedicion, numero, CodigoCliente, recibidopor, estado, fechaentrada,
                    horaentrada, observaciones };
                console.log(recepciones);
                //await transaccion.query('INSERT INTO recepciones  SET ?', recepciones);
                //   let detalle=req.body.detalles;
                const codigonivelcombustible = recepcion.codigonivelcombustible;
                const codigovehiculos = recepcion.codigovehiculo;
                const km = recepcion.km;
                const detalleRecepcion = { codigosucursal, puntoexpedicion, numero, codigovehiculos, codigonivelcombustible, km };
                yield transaccionBD_1.default.query('UPDATE recepciones SET ? WHERE numero = ?', [recepciones, numero]);
                //await transaccion.query('INSERT INTO detallesrecepciones  SET ?', detalleRecepcion);
                yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
                yield transaccionBD_1.default.query("SET autocommit=1");
                const vRecepcion = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=1');
                for (let i in vRecepcion) {
                    vRecepcion[i].fechaentrada = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
                }
                res.json(vRecepcion);
            }
            catch (error) {
                yield transaccionBD_1.default.query("ROLLBACK");
                yield transaccionBD_1.default.query("SET autocommit=1");
                console.log("ocurrio un error: " + error);
                throw error;
            }
        });
    }
    recepcionPorFecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const fechaentrada = req.body.fechadesde;
            const fechaemision = req.body.fechaHasta;
            const chapa = req.body.chapa;
            if (chapa) {
                console.log("Filtrar datos_chapa_fecha");
                const recepcionChapa_fecha = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=2 AND chapa=? AND fechaentrada  BETWEEN ? AND ?', [chapa, fechaentrada, fechaemision]);
                res.json(recepcionChapa_fecha);
            }
            else {
                console.log("Filtrar datos por fecha");
                const recepcionFecha = yield conexionBD_1.default.query('SELECT * FROM vrecepciones WHERE estado=2 AND fechaentrada  BETWEEN ? AND ?', [fechaentrada, fechaemision]);
                res.json(recepcionFecha);
            }
        });
    }
}
exports.recepcionvehiculoControlador = new RecepcionVehiculoControlador();
