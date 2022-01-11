import { recepcionvehiculoControlador } from './../../controladores/referenciales-taller/recepcionVehiculo';
import { Router } from 'express';

class RecepcionVehiculoRuta
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    config():void
    {
    //    
        this.router.get('/update/:id',recepcionvehiculoControlador.listarUno);
        this.router.get('/listar/',recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/guardar',recepcionvehiculoControlador.guardar);
        this.router.get('/list/:id',recepcionvehiculoControlador.listar);
        this.router.put('/actualizar',recepcionvehiculoControlador.actualizar);
        this.router.get('/lista:id',recepcionvehiculoControlador.listar);
        this.router.get('/update/:id',recepcionvehiculoControlador.listarUno);
        this.router.get('/',recepcionvehiculoControlador.listarRecepcion);
        this.router.post('/',recepcionvehiculoControlador.guardar);
        //    this.router.put('/',traccionesControlador.actualizar);
        this.router.post('/recepcionFecha',recepcionvehiculoControlador.recepcionPorFecha);
    }
}

const recepcionVehiculoRuta = new RecepcionVehiculoRuta();
export default recepcionVehiculoRuta.router;