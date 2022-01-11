import { Router } from 'express';
import {tipoDocumentoControlador} from '../../controladores/referenciales-facturas/tipoDocumento';

class TipoDocumentonRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', tipoDocumentoControlador.listar);
    }
}
const tipoDocumentonRutas = new TipoDocumentonRutas();
export default tipoDocumentonRutas.router;