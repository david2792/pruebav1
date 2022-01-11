import { traccionesControlador } from './../../controladores/referenciales-taller/traccion';
import { Router } from 'express';
traccionesControlador
class TraccionRuta
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',traccionesControlador.listar);
       this.router.post('/',traccionesControlador.crear);
       this.router.put('/',traccionesControlador.actualizar);
   }
}

const traccionRuta = new TraccionRuta();
 export default traccionRuta.router;