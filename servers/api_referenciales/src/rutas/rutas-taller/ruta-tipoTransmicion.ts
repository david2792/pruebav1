import { tiposTransmisionControlador } from './../../controladores/referenciales-taller/tipoTransmision';
import { Router } from 'express';

class TipoTransmicionRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',tiposTransmisionControlador.listar);
       this.router.post('/',tiposTransmisionControlador.crear);
       this.router.put('/',tiposTransmisionControlador.actualizar);
   }
}

const tipoTransmicionRutas = new TipoTransmicionRutas();
 export default tipoTransmicionRutas.router;