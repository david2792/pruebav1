"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const facturacion_1 = require("./../../controladores/facturacion/facturacion");
const express_1 = require("express");
class FacturacionRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/validar/:usuarioCajero', facturacion_1.facturacionControlador.validarApertura);
        this.router.get('/timbrado/:documento', facturacion_1.facturacionControlador.validarTimbrado);
        this.router.post('/guardar/', facturacion_1.facturacionControlador.guardarFactura);
    }
}
const facturacionRutas = new FacturacionRuta();
exports.default = facturacionRutas.router;
