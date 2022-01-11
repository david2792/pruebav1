import { Router } from 'express';
import {marcasControlador} from '../../controladores/referenciales-productos/marca'

class MarcaRutas 
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/',marcasControlador.listar);
    //    this.router.get('/',marcasControlador.listarUno);
       this.router.post('/',marcasControlador.crear);
       this.router.delete('/',marcasControlador.eliminar);
       this.router.put('/',marcasControlador.actualiar);
   }
}

const marcasRutas = new MarcaRutas();
 export default marcasRutas.router;