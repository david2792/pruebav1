import {Request, Response} from 'express';
import pool from '../../conexionBD';

class MedidasControlador
{
 public async listar (req:Request,res:Response){
    const unidad = await pool.query('SELECT * FROM unidadmedida');
    res.json(unidad);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const unidad =  await pool.query('SELECT * FROM unidadmedida WHERE CodigoUnidad=?',[id]);
    if(unidad.length > 0){
      return res.json(unidad[0]);
      console.log(unidad);
    }
    res.status(404).json({text:'La unidad de medida no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    try {
      const codigo =await pool.query('SELECT MAX(CodigoUnidad)+1 AS CodigoUnidad FROM unidadmedida')
      JSON.stringify(codigo);
      const CodigoUnidad = codigo[0].CodigoUnidad;
      console.log(CodigoUnidad);
      const Descripcion = req.body.Descripcion;
      const Simbolo = req.body.Simbolo;
      const values={CodigoUnidad,Descripcion,Simbolo};
      await pool.query('INSERT INTO unidadmedida  SET ?',values);
       res.json({message:"la unidad fue guardada"});
    } catch (error) {
      console.log("ocurrio un error "+error)
    }
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM unidadmedida WHERE CodigoUnidad=?',[id]);
    res.json({message:'La unidad de medida fue eliminado'});
  }

  public async actualiar(req:Request, res:Response):Promise<void>
  {
    try {
      const codigo = req.body.CodigoUnidad;
      const Descripcion = req.body.Descripcion;
      const Simbolo = req.body.Simbolo;
      console.log(codigo,Descripcion,Simbolo);
      const categoria =  await pool.query('UPDATE unidadmedida SET ? WHERE CodigoUnidad = ?',[ req.body,codigo]);
      res.json({message:'La unidad de medida fue actualizada'});
    } catch (error) {
      console.log("ocurrio un error "+error)
    }
  }
}

export const medidasControlador = new MedidasControlador();