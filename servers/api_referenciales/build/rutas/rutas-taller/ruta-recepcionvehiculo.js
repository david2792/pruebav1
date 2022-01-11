"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recepcionVehiculo_1 = require("./../../controladores/referenciales-taller/recepcionVehiculo");
const express_1 = require("express");
class RecepcionVehiculoRuta {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //    
        this.router.get('/update/:id', recepcionVehiculo_1.recepcionvehiculoControlador.listarUno);
        this.router.get('/listar/', recepcionVehiculo_1.recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/guardar', recepcionVehiculo_1.recepcionvehiculoControlador.guardar);
        this.router.get('/list/:id', recepcionVehiculo_1.recepcionvehiculoControlador.listar);
        this.router.put('/actualizar', recepcionVehiculo_1.recepcionvehiculoControlador.actualizar);
        this.router.get('/lista:id', recepcionVehiculo_1.recepcionvehiculoControlador.listar);
        this.router.get('/update/:id', recepcionVehiculo_1.recepcionvehiculoControlador.listarUno);
        this.router.get('/', recepcionVehiculo_1.recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/', recepcionVehiculo_1.recepcionvehiculoControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
        this.router.post('/recepcionFecha', recepcionVehiculo_1.recepcionvehiculoControlador.recepcionPorFecha);
    }
}
const recepcionVehiculoRuta = new RecepcionVehiculoRuta();
exports.default = recepcionVehiculoRuta.router;
