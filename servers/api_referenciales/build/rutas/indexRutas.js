"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexControlador_1 = require("../controladores/indexControlador");
class IndexRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexControlador_1.indexControlador.index);
    }
}
const indexRutas = new IndexRutas();
exports.default = indexRutas.router;
