import { Router } from 'express';
import {paisControlador} from '../../controladores/referenciales-localidades/pais'

class PaisesRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',paisControlador.listar);
       this.router.post('/',paisControlador.crear);
       this.router.put('/',paisControlador.actualizar);
      
   }
}

const paisesRutas = new PaisesRutas();
 export default paisesRutas.router;