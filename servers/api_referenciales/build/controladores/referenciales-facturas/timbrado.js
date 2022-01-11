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
exports.timbradoControlador = void 0;
const conexionBD_1 = __importDefault(require("../../conexionBD"));
const transaccionBD_1 = __importDefault(require("../../transaccionBD"));
class TimbradoControlador {
    recuperarCodigo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const codigomaximo = yield conexionBD_1.default.query('SELECT MAX(NumeroTimbrado)+1 AS codigo FROM timbrados');
            JSON.stringify(codigomaximo);
            const codigo = codigomaximo[0].codigo;
            console.log(codigo);
            res.json(codigo);
        });
    }
    listarTimbrados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const timbrados = yield conexionBD_1.default.query('SELECT * FROM timbrados');
            console.log(timbrados);
            res.json(timbrados);
        });
    }
    crear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let timbrado = req.body.timbrados;
            // console.log("Datos Recividos en backend", timbrado);
            yield transaccionBD_1.default.query("SET autocommit=0");
            // console.log(timbrado);
            // for (const i in timbrado) {
            //     if (Object.prototype.hasOwnProperty.call(timbrado, i)) {
            // const element = timbrado[i];
            const NumeroTimbrado = timbrado.NumeroTimbrado;
            const CodigoSucursal = timbrado.CodigoSucursal;
            const PuntoExpedicion = timbrado.PuntoExpedicion;
            const CodigoTiposDocumento = timbrado.CodigoTiposDocumento;
            const FechaInicioVigencia = timbrado.FechaInicioVigencia;
            const FechaFinVigencia = timbrado.FechaFinVigencia;
            const NumeroInicial = timbrado.NumeroInicial;
            const NumeroFinal = timbrado.NumeroFinal;
            if (timbrado.Estado) {
                const Estado = '1';
            }
            else {
                const Estado = '0';
            }
            const Estado = timbrado.Estado;
            const values = { NumeroTimbrado, CodigoSucursal, PuntoExpedicion, CodigoTiposDocumento, FechaInicioVigencia, FechaFinVigencia, NumeroInicial, NumeroFinal, Estado };
            yield conexionBD_1.default.query("INSERT INTO timbrados SET ?", values);
            //     }
            // }
            yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
            yield transaccionBD_1.default.query("SET autocommit=1");
            res.json({ message: "El registro fué guardado" });
        });
    }
    actualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let timbrado = req.body.timbrados;
            // console.log("Datos Recividos en backend", timbrado);
            yield transaccionBD_1.default.query("SET autocommit=0");
            // console.log(timbrado);
            // for (const i in timbrado) {
            //     if (Object.prototype.hasOwnProperty.call(timbrado, i)) {
            // const element = timbrado[i];
            const NumeroTimbrado = timbrado.NumeroTimbrado;
            const CodigoSucursal = timbrado.CodigoSucursal;
            const PuntoExpedicion = timbrado.PuntoExpedicion;
            const CodigoTiposDocumento = timbrado.CodigoTiposDocumento;
            const FechaInicioVigencia = timbrado.FechaInicioVigencia;
            const FechaFinVigencia = timbrado.FechaFinVigencia;
            const NumeroInicial = timbrado.NumeroInicial;
            const NumeroFinal = timbrado.NumeroFinal;
            if (timbrado.Estado) {
                const Estado = '1';
            }
            else {
                const Estado = '0';
            }
            const Estado = timbrado.Estado;
            const values = { NumeroTimbrado, CodigoSucursal, PuntoExpedicion, CodigoTiposDocumento, FechaInicioVigencia, FechaFinVigencia, NumeroInicial, NumeroFinal, Estado };
            console.log("Datos Recividos en backend", values);
            yield conexionBD_1.default.query("UPDATE timbrados SET ? WHERE NumeroTimbrado = ?", [values, NumeroTimbrado]);
            //     }
            // }
            yield transaccionBD_1.default.query("COMMIT"); // se confirma la transaccion
            yield transaccionBD_1.default.query("SET autocommit=1");
            res.json({ message: "El registro fué guardado" });
        });
    }
}
exports.timbradoControlador = new TimbradoControlador();
