import { Router } from 'express';
import {sucursalesControlador} from '../../controladores/referenciales-facturas/sucursales';

class SucursalesRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', sucursalesControlador.listarSucursales);
    }
}
const sucursalesRutas = new SucursalesRutas();
export default sucursalesRutas.router;