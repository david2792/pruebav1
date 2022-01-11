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
exports.controladorUsuario = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
class UsuarioControlador {
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
            const Codigo = yield conexionBD_1.default.query('SELECT MAX(CodigoUsuario)+1 AS Codigo FROM usuarios');
            JSON.stringify(Codigo);
            const CodigoUsuario = Codigo[0].Codigo;
            const CodigoNivel = 3;
            const CodigoSucursal = '001';
            const Cedula = "0";
            const Nombre = req.body.Nombre;
            const Apellido = req.body.Apellido;
            const FechaNacimiento = "1991-09-04";
            const Direccion = req.body.Direccion;
            const Telefono = req.body.Telefono;
            const Email = req.body.Email;
            const Usuario = req.body.Nombre;
            const Clave = CodigoUsuario;
            const Activo = "1";
            const values = { CodigoUsuario, CodigoNivel, CodigoSucursal,
                Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Telefono, Email, Usuario, Clave, Activo };
            console.log(values);
            yield conexionBD_1.default.query('INSERT INTO usuarios  SET ?', values);
            res.json({ message: "el usuario  fue guardado" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const CodigoUsuario = req.body.CodigoUsuario;
            const CodigoNivel = 3;
            const CodigoSucursal = '001';
            const Cedula = "0";
            const Nombre = req.body.Nombre;
            const Apellido = req.body.Apellido;
            const FechaNacimiento = "1991-09-04";
            const Direccion = req.body.Direccion;
            const Telefono = req.body.Telefono;
            const Email = req.body.Email;
            const Usuario = req.body.Nombre;
            const Clave = CodigoUsuario;
            const Activo = "1";
            const values = { CodigoUsuario, CodigoNivel, CodigoSucursal,
                Cedula, Nombre, Apellido, FechaNacimiento, Direccion, Telefono, Email, Usuario, Clave, Activo };
            console.log(values);
            const marcas = yield conexionBD_1.default.query('UPDATE usuarios SET ? WHERE CodigoUsuario = ?', [values, CodigoUsuario]);
            res.json({ message: 'el usuario fue actualizado' });
        });
    }
    listarCiudad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciudad = yield conexionBD_1.default.query('SELECT nombre FROM ciudades');
            res.json(ciudad);
        });
    }
}
exports.controladorUsuario = new UsuarioControlador();
