import { Router } from 'express';
import {impuestoControlador} from '../../controladores/referenciales-productos/impuesto'

class ImpuestosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',impuestoControlador.listar);
       this.router.get('/',impuestoControlador.listarUno);
       this.router.post('/',impuestoControlador.crear);
       this.router.delete('/',impuestoControlador.eliminar);
       this.router.put('/',impuestoControlador.actualiar);
   }
}

const impuestosRutas = new ImpuestosRutas();
 export default impuestosRutas.router;