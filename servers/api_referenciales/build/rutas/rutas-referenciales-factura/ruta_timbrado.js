"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const timbrado_1 = require("../../controladores/referenciales-facturas/timbrado");
class TimbradosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', timbrado_1.timbradoControlador.listarTimbrados);
        this.router.post('/', timbrado_1.timbradoControlador.crear);
        this.router.put('/', timbrado_1.timbradoControlador.actualizar);
    }
}
const timbradosRutas = new TimbradosRutas();
exports.default = timbradosRutas.router;
