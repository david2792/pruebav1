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
exports.proveedorControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class ProveedorControlador {
    recuperCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigoMaximo = yield conexionBD_1.default.query('SELECT MAX(CodigoSucursal)+1 AS codigo FROM vproveedores');
            JSON.stringify(codigoMaximo);
            const codigo = codigoMaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listarProveedores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const vproveedores = yield conexionBD_1.default.query('SELECT * FROM vproveedores');
            console.log('Hello friends');
            res.json(vproveedores);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Proveedor = req.body.proveedores;
            console.log("Datos del proveedor recibidos correctamente: ", Proveedor);
            const Codigo = yield conexionBD_1.default.query("SELECT MAX(CodigoProveedor)+1 AS Codigo FROM proveedores");
            JSON.stringify(Codigo);
            const CodigoProveedor = Codigo[0].Codigo;
            const RazonSocial = Proveedor.RazonSocial;
            const Cedula = Proveedor.Cedula;
            const Ruc = Proveedor.Ruc;
            const Direccion = Proveedor.Direccion;
            const Telefono = Proveedor.Telefono;
            const Email = Proveedor.Email;
            const Web = Proveedor.Web;
            const CodigoCiudad = Proveedor.CodigoCiudad;
            const values = { CodigoProveedor, RazonSocial, Cedula, Ruc, Direccion, Telefono, Email, Web, CodigoCiudad };
            console.log(values);
            yield conexionBD_1.default.query("INSERT INTO proveedores SET ?", values);
            const vproveedores = yield conexionBD_1.default.query('SELECT * FROM vproveedores');
            res.json(vproveedores);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let Proveedor = req.body.proveedores;
            yield transaccionBD_1.default.query("SET autocommit=0");
            console.log("Datos del proveedor recibidos correctamente: ", Proveedor);
            const CodigoProveedor = Proveedor.CodigoProveedor;
            const RazonSocial = Proveedor.RazonSocial;
            const Cedula = Proveedor.Cedula;
            const Ruc = Proveedor.Ruc;
            const Direccion = Proveedor.Direccion;
            const Telefono = Proveedor.Telefono;
            const Email = Proveedor.Email;
            const Web = Proveedor.Web;
            const CodigoCiudad = Proveedor.CodigoCiudad;
            const values = { CodigoProveedor, RazonSocial, Cedula, Ruc, Direccion, Telefono, Email, Web, CodigoCiudad };
            console.log(values);
            yield conexionBD_1.default.query("UPDATE proveedores SET ? WHERE CodigoProveedor = ?", [values, CodigoProveedor]);
            yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
            yield transaccionBD_1.default.query("SET autocommit=1");
            const vproveedores = yield conexionBD_1.default.query('SELECT * FROM vproveedores');
            res.json(vproveedores);
        });
    }
}
exports.proveedorControlador = new ProveedorControlador();
