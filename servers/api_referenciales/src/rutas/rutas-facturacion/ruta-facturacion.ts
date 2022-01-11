import { facturacionControlador } from './../../controladores/facturacion/facturacion';
import { Router } from 'express';

class FacturacionRuta
{
    public router: Router = Router();

    constructor()
    {
        this.config();
    }
    config():void
    {
        this.router.get('/validar/:usuarioCajero',facturacionControlador.validarApertura);
        this.router.get('/timbrado/:documento',facturacionControlador.validarTimbrado);
        this.router.post('/guardar/',facturacionControlador.guardarFactura);
    }
}

const facturacionRutas = new FacturacionRuta();
export default facturacionRutas.router;