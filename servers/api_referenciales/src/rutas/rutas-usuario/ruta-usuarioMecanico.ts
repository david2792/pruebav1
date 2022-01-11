import { Router } from 'express';
import {controladorUsuario} from '../../controladores/usuario/usuario'

class UsuarioMecanicoRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
       this.router.get('/listar',controladorUsuario.listarMecanico);
       this.router.post('/guardar',controladorUsuario.crear);
       this.router.put('/actualizar',controladorUsuario.actualizar);
      
   }
}

const usuariomecanicoRutas = new UsuarioMecanicoRutas();
 export default usuariomecanicoRutas.router;