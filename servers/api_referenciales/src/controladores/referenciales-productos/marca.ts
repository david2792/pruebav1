import {Request, Response} from 'express';
import pool from '../../conexionBD';

class MarcasControlador
{
 public async listar (req:Request,res:Response){
    const marcas = await pool.query('SELECT * FROM marcas');
    res.json(marcas);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const marcas =  await pool.query('SELECT * FROM marcas WHERE CodigoMarca=?',[id]);
    if(marcas.length > 0){
      return res.json(marcas[0]);
      console.log(marcas);
    }
    res.status(404).json({text:'La marca no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    try {
      const codigo =await pool.query('SELECT MAX(CodigoMarca)+1 AS CodigoMarca FROM marcas')
      JSON.stringify(codigo);
      const CodigoMarca = codigo[0].CodigoMarca;
      console.log(CodigoMarca);
      const Descripcion = req.body.Descripcion;
      const values={CodigoMarca,Descripcion};
      await pool.query('INSERT INTO marcas  SET ?',values);
       res.json({message:"la marca fue guardada"});
    } catch (error) {
      console.log('error'+ error)
    }
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM marcas WHERE CodigoMarca=?',[id]);
    res.json({message:'La marca fue eliminado'});
  }

  public async actualiar(req:Request, res:Response):Promise<any>
  {
    try {
      const codigo = req.body.CodigoMarca;
      const Descripcion = req.body.Descripcion;
      const categoria =  await pool.query('UPDATE marcas SET ? WHERE CodigoMarca = ?',[ req.body,codigo]);
      res.json({message:'La marca fue actualizada'});
    } catch (error) {
      console.log('error'+ error)
    }
  }
}

export const marcasControlador = new MarcasControlador();