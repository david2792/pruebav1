import {Request, Response} from 'express';
import pool from '../../conexionBD';

class MarcasVehiculosControlador
{
 public async listar (req:Request,res:Response){
    const marcas = await pool.query('SELECT * FROM marcasvehiculos');
    res.json(marcas);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const marcas =  await pool.query('SELECT * FROM marcasvehiculos WHERE codigo=?',[id]);
    if(marcas.length > 0){
      return res.json(marcas[0]);
      console.log(marcas);
    }
    res.status(404).json({text:'La marca no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    try {
      const Codigo =await pool.query('SELECT MAX(codigo)+1 AS Codigo FROM marcasvehiculos')
      JSON.stringify(Codigo);
      const codigo = Codigo[0].Codigo;
      console.log(codigo);
      const nombre = req.body.nombre;
      const values={codigo,nombre};
      await pool.query('INSERT INTO marcasvehiculos  SET ?',values);
       res.json({message:"el anio fue guardado"});
    } catch (error) {
      console.log('error'+ error)
    }
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM marcasvehiculos WHERE codigo=?',[id]);
    res.json({message:'La marca fue eliminado'});
  }

  public async actualizar(req:Request, res:Response):Promise<any>
  {
    try {
      const codigo = req.body.codigo;
      const nombre = req.body.nombre;
      const categoria =  await pool.query('UPDATE marcasvehiculos SET ? WHERE codigo = ?',[ req.body,codigo]);
      res.json({message:'La marca fue actualizada'});
    } catch (error) {
      console.log('error'+ error)
    }
  }
}

export const marcasVehiculosControlador = new MarcasVehiculosControlador();