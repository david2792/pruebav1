import { Router } from 'express';
import {proveedorControlador} from '../../controladores/referencial-compras/proveedor';

class ProveedorRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', proveedorControlador.listarProveedores);
        this.router.post('/',proveedorControlador.crear);
        this.router.put('/',proveedorControlador.actualizar);
    }
}

const proveedorRutas = new ProveedorRutas();
export default proveedorRutas.router;