"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipos_documentos_1 = require("../../controladores/referenciales-facturas/tipos-documentos");
class TipoDocumentosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', tipos_documentos_1.tiposDocumentosControlador.listarTiposDocumentos);
    }
}
const tiposDocumentosRutas = new TipoDocumentosRutas();
exports.default = tiposDocumentosRutas.router;
