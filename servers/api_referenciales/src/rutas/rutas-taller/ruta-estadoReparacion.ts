import { estadoTrabajoControlador } from '../../controladores/referenciales-taller/Estadosorentrabajos';
import { Router } from 'express';

class EstadoReparacionRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',estadoTrabajoControlador.listar);
       this.router.post('/',estadoTrabajoControlador.crear);
       this.router.put('/',estadoTrabajoControlador.actualizar);
   }
}

const estadoReparacionRutas = new EstadoReparacionRutas();
 export default estadoReparacionRutas.router;