import { Router } from 'express';
import {listaPrecioControlador} from '../../controladores/productos/listaPrecio';

class ListaPrecioRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.put('/',listaPrecioControlador.anular);
       this.router.put('/actualizar',listaPrecioControlador.actualizar);
       this.router.get('/:id',listaPrecioControlador.listarUno);
       this.router.post('/',listaPrecioControlador.crear);
   }
}

const listaPrecioRutas = new ListaPrecioRutas();
 export default listaPrecioRutas.router;