"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formaspago_1 = require("../../controladores/referencial-compras/formaspago");
class FormaPagos {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get("/formapagos", formaspago_1.formasPagoControlador.listarFpago);
        this.router.post("/insertarformapagos", formaspago_1.formasPagoControlador.crear);
        this.router.put("/actualizarformapagos", formaspago_1.formasPagoControlador.actualizar);
    }
}
const formaPagosRutas = new FormaPagos();
exports.default = formaPagosRutas.router;
