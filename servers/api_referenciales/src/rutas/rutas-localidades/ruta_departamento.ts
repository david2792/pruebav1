import { Router } from 'express';
import {departamentoControlador} from '../../controladores/referenciales-localidades/departamento'

class DepartamentoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',departamentoControlador.listar);
       this.router.post('/',departamentoControlador.crear);
       this.router.put('/',departamentoControlador.actualizar);
      
   }
}

const departamentoRutas = new DepartamentoRutas();
 export default departamentoRutas.router;