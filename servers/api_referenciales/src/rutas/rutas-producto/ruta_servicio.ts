import { Router } from 'express';
import {servicioControlador} from '../../controladores/productos/servicios';

class ProductosRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar',servicioControlador.listar);
       this.router.get('/codigo',servicioControlador.recuperarCodigo);
      //  this.router.get('/]',productoControlador.listarCategoria);
      //  this.router.get('/]',productoControlador.listarMarcas);
      //  this.router.get('/]',productoControlador.listarDeposito);
      //  this.router.get('/unidades',productoControlador.listarMedida);
      //  this.router.get('/presentacion',productoControlador.listarPresentacion);
      //  this.router.get('/impuesto',productoControlador.listarImpuesto);
      //  this.router.get('/:id',productoControlador.listarUno);
       this.router.post('/add',servicioControlador.crear);
     //  this.router.delete('/:id',categoriaControlador.eliminar);
       this.router.put('/update',servicioControlador.actualizar);
      
   }
}

const productosRutas = new ProductosRutas();
 export default productosRutas.router;