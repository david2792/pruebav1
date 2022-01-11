import { tipoCombustibleControlador } from '../../controladores/referenciales-taller/tipoCombustible';
import { Router } from 'express';

class TipoCombustibleRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',tipoCombustibleControlador.listar);
       this.router.post('/',tipoCombustibleControlador.crear);
       this.router.put('/',tipoCombustibleControlador.actualizar);
   }
}

const tipoCombustibleRutas = new TipoCombustibleRutas();
 export default tipoCombustibleRutas.router;