
import { Router } from 'express';
import { coloresControlador } from '../../controladores/referenciales-taller/colores';

class ColorRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',coloresControlador.listar);
       this.router.post('/',coloresControlador.crear);
       this.router.put('/',coloresControlador.actualizar);
   }
}

const colorRutas = new ColorRutas();
 export default colorRutas.router;