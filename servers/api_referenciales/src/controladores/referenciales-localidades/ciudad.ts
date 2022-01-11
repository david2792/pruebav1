import {Request, Response} from 'express';
import pool from '../../conexionBD';


class CiudadesControlador
{
 public async listar (req:Request,res:Response){
    const familias = await pool.query('SELECT * FROM vciudades');
    res.json(familias); 
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
    const codigo =await pool.query('SELECT MAX(CodigoCiudad)+1 AS Codigo FROM ciudades')
    JSON.stringify(codigo);
    const CodigoCiudad = codigo[0].Codigo;
   const departamento= req.body.Departamento;
   const Nombre = req.body.Nombre;
   const id= await pool.query('SELECT CodigoDepartamento FROM departamentos  WHERE Nombre =?',departamento);
   JSON.stringify(id);
   const CodigoDepartamento = id[0].CodigoDepartamento;
   const values={CodigoCiudad,Nombre,CodigoDepartamento};
   await pool.query('INSERT INTO ciudades  SET ?',values);
    res.json({message:"la ciudad fue guardada"});
  }
 
  public async actualizar(req:Request, res:Response):Promise<void>
  {
    const CodigoCiudad=req.body.CodigoCiudad;
    const Departamento= req.body.Departamento;
    const Nombre = req.body.Nombre;
   const iddepartamento= await pool.query('SELECT CodigoDepartamento FROM departamentos WHERE Nombre =?',Departamento);
   JSON.stringify(iddepartamento);
   const CodigoDepartamento = iddepartamento[0].CodigoDepartamento;
    const values={CodigoCiudad,Nombre,CodigoDepartamento};
    const marcas =  await pool.query('UPDATE ciudades SET ? WHERE CodigoCiudad = ?',[values,CodigoCiudad]);
    res.json({message:'ciudad fue actualizado'});
  }
   public async listarDepartamento (req:Request,res:Response){
   
    const departamento = await pool.query('SELECT * FROM departamentos');
    res.json(departamento);
  } 
}

export const ciudadesControlador = new CiudadesControlador();