import { Router } from 'express';
import {timbradoControlador} from '../../controladores/referenciales-facturas/timbrado';

class TimbradosRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', timbradoControlador.listarTimbrados);
        this.router.post('/',timbradoControlador.crear);
        this.router.put('/',timbradoControlador.actualizar);
    }
}

const timbradosRutas = new TimbradosRutas();
export default timbradosRutas.router;