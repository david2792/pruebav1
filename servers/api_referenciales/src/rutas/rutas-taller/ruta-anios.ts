
import { Router } from 'express';
import { aniosControlador } from '../../controladores/referenciales-taller/anio';


class AniosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',aniosControlador.listar);
       this.router.post('/',aniosControlador.crear);
       this.router.put('/',aniosControlador.actualizar);
   }
}

const aniosRutas = new AniosRutas();
 export default aniosRutas.router;