import {Request, Response} from 'express';
import pool from '../../conexionBD';

class PaisControlador
{
 public async listar (req:Request,res:Response){
    const marcas = await pool.query('SELECT * FROM paises');
    res.json(marcas);
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    const codigo =await pool.query('SELECT MAX(CodigoPais)+1 AS Codigo FROM paises')
    JSON.stringify(codigo);
    const CodigoPais = codigo[0].Codigo;
    console.log(CodigoPais);
    const Nombre = req.body.Nombre;
    const values={CodigoPais,Nombre};
    await pool.query('INSERT INTO paises set ?',values);
    res.json({message:"PAIS GUARDADO"});
  }


  public async actualizar(req:Request, res:Response):Promise<void>
  {
    const CodigoPais= req.body.CodigoPais;
    const Nombre = req.body.Nombre;
    const values={CodigoPais,Nombre};
    console.log(values)
    const pais =  await pool.query('UPDATE paises SET ? WHERE CodigoPais = ?',[values,CodigoPais]);
    res.json({message:'El pais fue actualizado'});
  }
}

export const paisControlador = new PaisControlador();