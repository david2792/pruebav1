import {Request, Response} from 'express';
import pool from '../../conexionBD';

class ImpuestoControlador
{
 public async listar (req:Request,res:Response){
    const unidad = await pool.query('SELECT * FROM tipoimpuesto');
    res.json(unidad);
  } 

  public async listarUno (req:Request,res:Response):Promise<any>{
    const { id }= req.params;
    const unidad =  await pool.query('SELECT * FROM tipoimpuesto WHERE CodigImpuesto=?',[id]);
    if(unidad.length > 0){
      return res.json(unidad[0]);
      console.log(unidad);
    }
    res.status(404).json({text:'El impuesto no existe'});
  
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
      try {
        const codigo =await pool.query('SELECT MAX(CodigImpuesto)+1 AS CodigImpuesto FROM tipoimpuesto')
      JSON.stringify(codigo);
      const CodigImpuesto = codigo[0].CodigImpuesto;
      console.log(CodigImpuesto);
      const Descripcion = req.body.Descripcion;
      const Porcentaje = req.body.Porcentaje;
      const DividirPor = req.body.DividirPor;
      const values={CodigImpuesto,Descripcion,Porcentaje,DividirPor};
      await pool.query('INSERT INTO  tipoimpuesto  SET ?',values);
      res.json({message:"El impuesto fue guardado"});
      } catch (error) {
        console.log('ocurrio un error '+error)
      }
  }

  public async eliminar(req:Request, res:Response):Promise<void>
  {
    const { id }= req.params;
    const marcas =  await pool.query('DELETE FROM tipoimpuesto WHERE CodigImpuesto=?',[id]);
    res.json({message:'El impuesto fue eliminado'});
  }

  public async actualiar(req:Request, res:Response):Promise<void>
  {
    try {
      const codigo = req.body.CodigImpuesto;
      const Descripcion = req.body.Descripcion;
      const Porcentaje = req.body.Porcentaje;
      const DividirPor = req.body.DividirPor;
      console.log(codigo);
      const categoria =  await pool.query('UPDATE tipoimpuesto SET ? WHERE CodigImpuesto = ?',[ req.body,codigo]);
      res.json({message:'El impuesto fue actualizado'});
    } catch (error) {
      console.log('ocurrio un error '+error)
    }
  }
}

export const impuestoControlador = new ImpuestoControlador();