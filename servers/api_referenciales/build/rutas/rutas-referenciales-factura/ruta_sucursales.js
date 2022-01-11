"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sucursales_1 = require("../../controladores/referenciales-facturas/sucursales");
class SucursalesRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', sucursales_1.sucursalesControlador.listarSucursales);
    }
}
const sucursalesRutas = new SucursalesRutas();
exports.default = sucursalesRutas.router;
