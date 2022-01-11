import {Request, Response} from 'express';
import pool from '../../conexionBD';

class EstadoRecepcionControlador
{
 public async listar (req:Request,res:Response){
    const marcas = await pool.query('SELECT * FROM estadosrecepciones');
    console.log("marcas")
    res.json(marcas);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const marcas =  await pool.query('SELECT * FROM estadosrecepciones WHERE codigo=?',[id]);
    if(marcas.length > 0){
      return res.json(marcas[0]);
      console.log(marcas);
    }
    res.status(404).json({text:'La marca no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    console.log("hoka");
    try {
      
      const Codigo =await pool.query('SELECT MAX(codigo)+1 AS codigo FROM estadosrecepciones')
      JSON.stringify(Codigo);
      const codigo = Codigo[0].codigo;
      console.log(codigo);
      const descripcion = req.body.descripcion;
      const values={codigo,descripcion};
      console.log(values)
      await pool.query('INSERT INTO estadosrecepciones  SET ?',values);
       res.json({message:"el estadosrecepciones fue guardado"});
    } catch (error) {
      console.log('error'+ error)
    }
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM estadosrecepciones WHERE codigo=?',[id]);
    res.json({message:'La marca fue eliminado'});
  }

  public async actualizar(req:Request, res:Response):Promise<any>
  {
    try {
      const codigo = req.body.codigo;
      const descripcion = req.body.descripcion;
      const categoria =  await pool.query('UPDATE estadosrecepciones SET ? WHERE codigo = ?',[ req.body,codigo]);
      res.json({message:'La marca fue actualizada'});
    } catch (error) {
      console.log('error'+ error)
    }
  }
}

export const estadoRecepcionControlador = new EstadoRecepcionControlador();