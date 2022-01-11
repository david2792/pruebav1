"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const condicion_1 = require("../../controladores/referenciales-facturas/condicion");
class CondicionRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', condicion_1.condicionControlador.listar);
    }
}
const condicionRutas = new CondicionRutas();
exports.default = condicionRutas.router;
