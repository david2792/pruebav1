"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ordenTrabajo_1 = require("./../../controladores/referenciales-taller/ordenTrabajo");
const express_1 = require("express");
class OrdenoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/recepcion', ordenTrabajo_1.ordenControlador.listar);
        this.router.get('/listar', ordenTrabajo_1.ordenControlador.listarOrden);
        this.router.get('/update/:id', ordenTrabajo_1.ordenControlador.listarUno);
        this.router.get('/repuesto', ordenTrabajo_1.ordenControlador.listarRepuestos);
        this.router.put('/entregado', ordenTrabajo_1.ordenControlador.entregado);
        this.router.post('/guardar', ordenTrabajo_1.ordenControlador.guardarOrden);
        this.router.post('/insertardetalle', ordenTrabajo_1.ordenControlador.guardardetalle);
        this.router.put('/eliminar', ordenTrabajo_1.ordenControlador.eliminarDetalles);
        this.router.post('/filtrarvordentrabajos', ordenTrabajo_1.ordenControlador.ordenPorFecha);
        this.router.post('/lista_entregados', ordenTrabajo_1.ordenControlador.listarEntregados);
        this.router.get('/listadones', ordenTrabajo_1.ordenControlador.listarDone);
        this.router.post('/listall', ordenTrabajo_1.ordenControlador.listall);
        this.router.post('/listaDetallesOrdenTrabajo', ordenTrabajo_1.ordenControlador.listaDetallesOrdenTrabajo);
    }
}
const ordenoRuta = new OrdenoRuta();
exports.default = ordenoRuta.router;
