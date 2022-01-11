import {Router} from 'express'
import {comprasControlador} from '../../controladores/referencial-compras/compras'

class Compras{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.post("/guardar", comprasControlador.guardarCompras);
    }
}

const compras = new Compras();
export default compras.router;