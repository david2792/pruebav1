import { Router } from 'express';
import {productoControlador} from '../../controladores/productos/producto';

class ProductosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar',productoControlador.listar);
       this.router.get('/codigo',productoControlador.recuperarCodigo);
       this.router.post('/add',productoControlador.crearProducto);
       this.router.put('/update',productoControlador.actualizarProducto );
      
   }
}

const productosRutas = new ProductosRutas();
 export default productosRutas.router;