import { Router } from 'express';
import {ciudadesControlador} from '../../controladores/referenciales-localidades/ciudad'

class CiudadRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',ciudadesControlador.listar);
       this.router.post('/',ciudadesControlador.crear);
       this.router.put('/',ciudadesControlador.actualizar);
      
   }
}

const ciudadRutas = new CiudadRutas();
 export default ciudadRutas.router;