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
exports.controladorCliente = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class ClienteControlador {
    listarMecanico(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const mecanico = yield conexionBD_1.default.query('SELECT * FROM vmecanico where CodigoNivel=3');
            res.json(mecanico);
        });
    }
    listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield conexionBD_1.default.query('SELECT * FROM vclientes');
            res.json(usuario);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoCliente)+1 AS Codigo FROM clientes');
            JSON.stringify(Codigo);
            const CodigoCliente = Codigo[0].Codigo;
            let cliente = req.body.clientes;
            console.log(cliente.Ruc);
            const CodigoCiudad = cliente.CodigoCiudad;
            console.log(CodigoCiudad);
            const Cedula = cliente.Cedula;
            const Ruc = cliente.Ruc;
            const RazonSocial = cliente.RazonSocial;
            const Direccion = cliente.Direccion;
            const Telefono = cliente.Telefono;
            const Email = cliente.Email;
            const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
            console.log(values);
            yield conexionBD_1.default.query('INSERT INTO clientes  SET ?', values);
            const vclientes = yield conexionBD_1.default.query('SELECT * FROM vclientes');
            res.json(vclientes);
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
exports.controladorCliente = new ClienteControlador();
