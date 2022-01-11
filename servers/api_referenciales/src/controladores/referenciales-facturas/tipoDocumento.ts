import {Request, Response} from 'express';
import pool from '../../conexionBD';


class TipoDocumentoControlador
{
 public async listar (req:Request,res:Response){
    const documento = await pool.query('SELECT * FROM tiposdocumento');
    res.json(documento); 
  } 

  
}

export const tipoDocumentoControlador = new TipoDocumentoControlador();