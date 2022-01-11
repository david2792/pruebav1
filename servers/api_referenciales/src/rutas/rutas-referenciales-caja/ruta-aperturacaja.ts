import { Router } from 'express';
import {controladorApertura} from '../../controladores/referenciales-caja/aperturacaja'

class AperturaRutas
{
   public router: Router = Router(); 

   constructor()
   {
        this.config();
   }
   config():void
   {
      this.router.get('/abrir',controladorApertura.listarApertura);
      this.router.get('/validar/:usuarioCajero',controladorApertura.validarApertura);
       this.router.post('/abrir',controladorApertura.abrirCaja);
  //     this.router.put('/',controladorCliente.actualizar);
      
   }
}

const aperturaRutas = new AperturaRutas();
 export default aperturaRutas.router;