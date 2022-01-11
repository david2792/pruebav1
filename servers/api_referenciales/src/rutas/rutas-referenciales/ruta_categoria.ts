import { Router } from 'express';
import {categoriaControlador} from '../../controladores/referenciales-productos/categoria'

class CategoriaRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',categoriaControlador.listar);
    //    this.router.get('/:id',categoriaControlador.listarUno);
       this.router.post('/',categoriaControlador.crear);
       this.router.delete('/',categoriaControlador.eliminar);
       this.router.put('/',categoriaControlador.actualiar);
      
   }
}

const categoriaRutas = new CategoriaRutas();
 export default categoriaRutas.router;