import {Request, Response} from 'express';
import pool from '../../conexionBD';


class DepartamentosControlador
{
 public async listar (req:Request,res:Response){
    const familias = await pool.query('SELECT * FROM vdepartamentos');
    res.json(familias);
  } 

  public async crear(req:Request, res:Response):Promise<void>
  {
   const codigo = await pool.query('SELECT MAX(CodigoDepartamento)+1 AS Codigo FROM departamentos')
   JSON.stringify(codigo);
   const CodigoDepartamento = codigo[0].Codigo
   const Pais= req.body.Pais;
   console.log(Pais)
   const Nombre = req.body.Nombre;
   const id= await pool.query('SELECT CodigoPais FROM paises WHERE Nombre =?',Pais);
   JSON.stringify(id);//CONVIERTE LA CONSULTA A UN JSON
   const CodigoPais = id[0].CodigoPais;//CAPTURA EL VALOR DEL CODIDO FAMILIA DESDE EL DOCUMENTO JSON
   const values={CodigoDepartamento,Nombre,CodigoPais};
   console.log(values);
   await pool.query('INSERT INTO departamentos  SET ?',values);
    res.json({message:"el departamentoo fue guardada"});
  }
 
  public async actualizar(req:Request, res:Response):Promise<void>
  {
    const CodigoDepartamento= req.body.CodigoDepartamento;
    const pais= req.body.Pais;
    const Nombre = req.body.Nombre;
    const idpais= await pool.query('SELECT CodigoPais FROM paises WHERE Nombre =?',pais);
    JSON.stringify(idpais);//CONVIERTE LA CONSULTA A UN JSON
   const CodigoPais = idpais[0].CodigoPais;//CAPTURA EL VALOR DEL CODIDO FAMILIA DESDE EL DOCUMENTO JSON
    const values={CodigoDepartamento,Nombre,CodigoPais};
    const marcas =  await pool.query('UPDATE departamentos SET ? WHERE CodigoDepartamento = ?',[values,CodigoDepartamento]);
    res.json({message:'el departamento fue actualizado'});
  }
}

export const departamentoControlador = new DepartamentosControlador();