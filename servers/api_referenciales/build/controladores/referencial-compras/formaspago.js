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
exports.formasPagoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class FormasPagoControlador {
    recuperCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigoMaximo = yield conexionBD_1.default.query('SELECT MAX(CodigoFormasPago)+1 AS codigo FROM formaspago');
            JSON.stringify(codigoMaximo);
            const codigo = codigoMaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listarFpago(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fpago = yield conexionBD_1.default.query('SELECT * FROM formaspago');
            res.json(fpago);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let FormasPago = req.body.fpago;
            console.log("Datos recibidos correctamente(Backend): ", FormasPago);
            let Codigo = yield conexionBD_1.default.query("SELECT MAX(CodigoFormasPago)+1 AS Codigo FROM formaspago");
            let CodigoFormasPago;
            if (Codigo[0].Codigo) {
                console.log("Código", Codigo[0].Codigo);
                JSON.stringify(Codigo);
                CodigoFormasPago = Codigo[0].Codigo;
            }
            else {
                console.log("Hello darkness my old friend");
                CodigoFormasPago = 1;
            }
            console.log("Código Formas pago: ", CodigoFormasPago);
            const Descripcion = FormasPago.Descripcion;
            const Plazo = FormasPago.Plazo;
            const Dias = FormasPago.Dias;
            const Estado = FormasPago.Estado;
            const values = { CodigoFormasPago, Descripcion, Plazo, Dias, Estado };
            console.log(values);
            yield conexionBD_1.default.query("INSERT INTO formaspago SET ?", values);
            const formaspago = yield conexionBD_1.default.query('SELECT * FROM formaspago');
            res.json(formaspago);
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let FormasPago = req.body.fpago;
            yield transaccionBD_1.default.query("SET autocommit=0");
            console.log("Datos recibidos correctamente(UPDATE backend): ", FormasPago);
            const CodigoFormasPago = FormasPago.CodigoFormasPago;
            const Descripcion = FormasPago.Descripcion;
            const Plazo = FormasPago.Plazo;
            const Dias = FormasPago.Dias;
            const Estado = FormasPago.Estado;
            const values = { CodigoFormasPago, Descripcion, Plazo, Dias, Estado };
            console.log(values);
            yield conexionBD_1.default.query("UPDATE formaspago SET ? WHERE CodigoFormasPago = ?", [values, CodigoFormasPago]);
            yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
            yield transaccionBD_1.default.query("SET autocommit=1");
            const fpagos = yield conexionBD_1.default.query('SELECT * FROM formaspago');
            res.json(fpagos);
        });
    }
}
exports.formasPagoControlador = new FormasPagoControlador();
