import { Router } from 'express';
import {usuarioControlador} from '../../controladores/acceso/usuario';

class UsuarioRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
     
       this.router.post('/login',usuarioControlador.acceso);
      // this.router.post('/',listaPrecioControlador.crear);
   }
}

const usuarioRutas = new UsuarioRutas();
 export default usuarioRutas.router;