import { Request, Response } from 'express';
import pool from '../../conexionBD';
import trasaccion from '../../transaccionBD';

class SucursalesControlador {
    public async recuperCodigo(req: Request, res: Response): Promise<any>{
        const codigoMaximo = await pool.query('SELECT MAX(CodigoSucursal)+1 AS codigo FROM vsucursales');
        JSON.stringify(codigoMaximo);
        const codigo = codigoMaximo[0].codigo;
        console.log(codigo);
        res.json(codigo);
    }

    public async listarSucursales(req: Request, res:Response): Promise<any>{
        const sucursales = await pool.query('SELECT * FROM sucursales');
        console.log('Hello friends');
        res.json(sucursales);
    }
}
export const sucursalesControlador = new SucursalesControlador();