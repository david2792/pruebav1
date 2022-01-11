import { Request, Response } from 'express';
import pool from '../../conexionBD';
import trasaccion from '../../transaccionBD';

class TiposDocumentosControlador {
    public async listarTiposDocumentos(req: Request, res:Response): Promise<any>{
        const tiposDocumentos = await pool.query('SELECT * FROM tiposdocumento');
        console.log('Hello friends');
        res.json(tiposDocumentos);
    }
}
export const tiposDocumentosControlador = new TiposDocumentosControlador();