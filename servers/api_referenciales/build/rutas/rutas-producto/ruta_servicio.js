"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicios_1 = require("../../controladores/productos/servicios");
class ProductosRutas {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/listar', servicios_1.servicioControlador.listar);
        this.router.get('/codigo', servicios_1.servicioControlador.recuperarCodigo);
        //  this.router.get('/]',productoControlador.listarCategoria);
        //  this.router.get('/]',productoControlador.listarMarcas);
        //  this.router.get('/]',productoControlador.listarDeposito);
        //  this.router.get('/unidades',productoControlador.listarMedida);
        //  this.router.get('/presentacion',productoControlador.listarPresentacion);
        //  this.router.get('/impuesto',productoControlador.listarImpuesto);
        //  this.router.get('/:id',productoControlador.listarUno);
        this.router.post('/add', servicios_1.servicioControlador.crear);
        //  this.router.delete('/:id',categoriaControlador.eliminar);
        this.router.put('/update', servicios_1.servicioControlador.actualizar);
    }
}
const productosRutas = new ProductosRutas();
exports.default = productosRutas.router;
