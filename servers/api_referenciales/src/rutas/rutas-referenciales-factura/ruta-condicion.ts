import { Router } from 'express';
import {condicionControlador} from '../../controladores/referenciales-facturas/condicion';

class CondicionRutas{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get('/', condicionControlador.listar);
    }
}
const condicionRutas = new CondicionRutas();
export default condicionRutas.router;