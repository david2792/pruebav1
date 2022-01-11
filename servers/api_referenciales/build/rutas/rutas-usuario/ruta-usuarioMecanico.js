"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_1 = require("../../controladores/usuario/usuario");
class UsuarioMecanicoRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/listar', usuario_1.controladorUsuario.listarMecanico);
        this.router.post('/guardar', usuario_1.controladorUsuario.crear);
        this.router.put('/actualizar', usuario_1.controladorUsuario.actualizar);
    }
}
const usuariomecanicoRutas = new UsuarioMecanicoRutas();
exports.default = usuariomecanicoRutas.router;
