import { Router } from 'express';
import {medidasControlador} from '../../controladores/referenciales-productos/unidadMedida'

class MedidasRutas 
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',medidasControlador.listar);
      //     this.router.get('/:id',medidasControlador.listarUno);
       this.router.post('/',medidasControlador.crear);
       this.router.delete('/',medidasControlador.eliminar);
       this.router.put('/',medidasControlador.actualiar);
   }
}

const medidasRutas = new MedidasRutas();
export default medidasRutas.router;