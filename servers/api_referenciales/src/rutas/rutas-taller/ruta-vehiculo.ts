import { vehiculoControlador } from './../../controladores/referenciales-taller/vehiculo';
import { Router } from 'express';

class VehiculoRuta
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',vehiculoControlador.listar);
       this.router.post('/',vehiculoControlador.crear);
       this.router.put('/',vehiculoControlador.actualizar);
   }
}

const vehiculoRuta = new VehiculoRuta();
 export default vehiculoRuta.router;