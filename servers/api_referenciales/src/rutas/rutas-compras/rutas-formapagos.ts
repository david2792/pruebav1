import {Router} from 'express'
import {formasPagoControlador} from '../../controladores/referencial-compras/formaspago'

class FormaPagos {
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config():void{
        this.router.get("/formapagos", formasPagoControlador.listarFpago);
        this.router.post("/insertarformapagos", formasPagoControlador.crear);
        this.router.put("/actualizarformapagos", formasPagoControlador.actualizar);
    }
}
const formaPagosRutas = new FormaPagos();
export default formaPagosRutas.router;