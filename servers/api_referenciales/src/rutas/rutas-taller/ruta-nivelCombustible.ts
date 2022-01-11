import { nivelesCombustiblesControlador } from '../../controladores/referenciales-taller/nivelCombustible';
import { Router } from 'express';

class TipoNivelesCombus
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',nivelesCombustiblesControlador.listar);
       this.router.post('/',nivelesCombustiblesControlador.crear);
       this.router.put('/',nivelesCombustiblesControlador.actualizar);
   }
}

const tipoNivelesCombus = new TipoNivelesCombus();
 export default tipoNivelesCombus.router;