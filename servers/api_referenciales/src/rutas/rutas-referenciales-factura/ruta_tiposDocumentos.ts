import { Router } from 'express';
import {tiposDocumentosControlador} from '../../controladores/referenciales-facturas/tipos-documentos';

class TipoDocumentosRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', tiposDocumentosControlador.listarTiposDocumentos);
    }
}

const tiposDocumentosRutas = new TipoDocumentosRutas();
export default tiposDocumentosRutas.router;