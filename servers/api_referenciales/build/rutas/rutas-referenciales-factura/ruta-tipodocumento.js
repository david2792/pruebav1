"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoDocumento_1 = require("../../controladores/referenciales-facturas/tipoDocumento");
class TipoDocumentonRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipoDocumento_1.tipoDocumentoControlador.listar);
    }
}
const tipoDocumentonRutas = new TipoDocumentonRutas();
exports.default = tipoDocumentonRutas.router;
