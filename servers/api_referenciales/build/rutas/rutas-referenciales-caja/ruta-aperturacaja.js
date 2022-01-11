"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const aperturacaja_1 = require("../../controladores/referenciales-caja/aperturacaja");
class AperturaRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/abrir', aperturacaja_1.controladorApertura.listarApertura);
        this.router.get('/validar/:usuarioCajero', aperturacaja_1.controladorApertura.validarApertura);
        this.router.post('/abrir', aperturacaja_1.controladorApertura.abrirCaja);
        //     this.router.put('/',controladorCliente.actualizar);
    }
}
const aperturaRutas = new AperturaRutas();
exports.default = aperturaRutas.router;
