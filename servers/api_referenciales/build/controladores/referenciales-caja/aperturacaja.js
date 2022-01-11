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
exports.controladorApertura = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class AperturaControlador {
    listarMecanico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mecanico = yield conexionBD_1.default.query('SELECT * FROM vmecanico where CodigoNivel=3');
            res.json(mecanico);
        });
    }
    listarApertura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const caja = yield conexionBD_1.default.query('SELECT * FROM vaperturascaja WHERE estado = 1');
            res.json(caja);
        });
    }
    validarApertura(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioCajero } = req.params;
            const apertura = yield conexionBD_1.default.query('SELECT * FROM vaperturascaja WHERE  usuarioCajero=? AND estado = 1', usuarioCajero);
            // JSON.stringify(apertura);
            //console.log(apertura)
            res.json(apertura);
        });
    }
    CalcularTotalVenta(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuarioCajero } = req.params;
            const apertura = yield conexionBD_1.default.query('SELECT NumeroApertura,CodigoTiposCobro,SUM(Monto) AS Monto,TipoCobro,TipoMovimiento FROM vingresosarqueos WHERE  usuarioCajero=? AND estado = 1', usuarioCajero);
            // JSON.stringify(apertura);
            //console.log(apertura)
            res.json(apertura);
        });
    }
    abrirCaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Codigo = yield conexionBD_1.default.query('SELECT MAX(NumeroApertura)+1 AS numero FROM aperturascaja');
            JSON.stringify(Codigo);
            const numeroapertura = Codigo[0].numero;
            let apertura = req.body.aperturas;
            const CodigoUsuario = apertura.CodigoUsuario;
            const NumeroCaja = "1";
            const Fecha = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
            const Hora = "00:00:00";
            const Monto = apertura.Monto.split('.').join("");
            const Estado = "1";
            const values = { numeroapertura, CodigoUsuario, NumeroCaja, Fecha, Hora, Monto, Estado };
            console.log(values);
            yield conexionBD_1.default.query('INSERT INTO aperturascaja  SET ?', values);
            const vapertura = yield conexionBD_1.default.query('SELECT * FROM aperturascaja');
            res.json(vapertura);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cliente = req.body.clientes;
            const CodigoCliente = cliente.CodigoCliente;
            const CodigoCiudad = cliente.CodigoCiudad;
            const Cedula = cliente.Cedula;
            const Ruc = cliente.Ruc;
            const RazonSocial = cliente.RazonSocial;
            const Direccion = cliente.Direccion;
            const Telefono = cliente.Telefono;
            const Email = cliente.Email;
            const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
            console.log("Datos para actualizar " + values);
            const marcas = yield conexionBD_1.default.query('UPDATE clientes SET ? WHERE CodigoCliente = ?', [values, CodigoCliente]);
            const vclientes = yield conexionBD_1.default.query('SELECT * FROM vclientes');
            res.json(vclientes);
        });
    }
    listarCiudad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciudad = yield conexionBD_1.default.query('SELECT nombre FROM ciudades');
            res.json(ciudad);
        });
    }
}
exports.controladorApertura = new AperturaControlador();
