import {Request, Response} from 'express';
import pool from '../../conexionBD';

class PresentacionControlador
{
 public async listar (req:Request,res:Response){
    const presentaciones = await pool.query('SELECT * FROM depositos');
    res.json(presentaciones);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const presentaciones =  await pool.query('SELECT * FROM presentaciones WHERE codigo=?',[id]);
    if(presentaciones.length > 0){
      return res.json(presentaciones[0]);
      console.log(presentaciones);
    }
    res.status(404).json({text:'La presentacion no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    await pool.query('INSERT INTO presentaciones set ?',[req.body]);
    res.json({message:"la presentacion fue guardada"});
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM presentaciones WHERE codigo=?',[id]);
    res.json({message:'La presentacion fue eliminada'});
  }

  public async actualiar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('UPDATE presentaciones SET ? WHERE codigo = ?',[req.body,id]);
    res.json({message:'La presentacion fue actualizada'});
  }
}

export const presentacionControlador = new PresentacionControlador();