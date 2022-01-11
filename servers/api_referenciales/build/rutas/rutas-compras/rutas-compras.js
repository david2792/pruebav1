"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compras_1 = require("../../controladores/referencial-compras/compras");
class Compras {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/guardar", compras_1.comprasControlador.guardarCompras);
    }
}
const compras = new Compras();
exports.default = compras.router;
