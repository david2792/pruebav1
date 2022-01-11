import { modelosVehiculosControlador } from './../../controladores/referenciales-taller/modeloVehiculo';
import { Router } from 'express';
class ModeloVehiculoRuta
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',modelosVehiculosControlador.listar);
       this.router.post('/',modelosVehiculosControlador.crear);
       this.router.put('/',modelosVehiculosControlador.actualizar);
   }
}

const modeloVehiculoRuta = new ModeloVehiculoRuta();
 export default modeloVehiculoRuta.router;