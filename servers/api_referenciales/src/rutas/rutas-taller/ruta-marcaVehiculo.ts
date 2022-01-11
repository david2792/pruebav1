
import { Router } from 'express';
import { marcasVehiculosControlador } from '../../controladores/referenciales-taller/marcaVehiculo';


class MarcaVechiculoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',marcasVehiculosControlador.listar);
       this.router.post('/',marcasVehiculosControlador.crear);
       this.router.put('/',marcasVehiculosControlador.actualizar);
   }
}

const marcaVechiculoRutas = new MarcaVechiculoRutas();
 export default marcaVechiculoRutas.router;