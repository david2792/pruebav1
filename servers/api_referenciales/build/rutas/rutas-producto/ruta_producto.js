"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const producto_1 = require("../../controladores/productos/producto");
class ProductosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/listar', producto_1.productoControlador.listar);
        this.router.get('/codigo', producto_1.productoControlador.recuperarCodigo);
        this.router.post('/add', producto_1.productoControlador.crearProducto);
        this.router.put('/update', producto_1.productoControlador.actualizarProducto);
    }
}
const productosRutas = new ProductosRutas();
exports.default = productosRutas.router;
