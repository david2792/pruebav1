import { Request, Response } from 'express';
import pool from '../../conexionBD';


class UsuarioControlador {

  public async listarMecanico(req: Request, res: Response) {
    const mecanico = await pool.query('SELECT * FROM vmecanico where CodigoNivel=3');
    res.json(mecanico);
  }

  public async listar(req: Request, res: Response) {
    const usuario = await pool.query('SELECT * FROM vclientes');
    res.json(usuario);
  }

  public async crear(req: Request, res: Response): Promise<void> {
    const Codigo = await pool.query('SELECT MAX(CodigoUsuario)+1 AS Codigo FROM usuarios')
    JSON.stringify(Codigo);
    const CodigoUsuario = Codigo[0].Codigo;
    const CodigoNivel = 3;
    const CodigoSucursal = '001'
    const Cedula="0";
    const Nombre = req.body.Nombre;
    const Apellido = req.body.Apellido;
    const FechaNacimiento="1991-09-04"
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;
    const Usuario=req.body.Nombre;
    const Clave=CodigoUsuario;
    const Activo="1"
    const values = { CodigoUsuario,CodigoNivel,CodigoSucursal,
       Cedula, Nombre, Apellido,FechaNacimiento, Direccion, Telefono,Email, Usuario,Clave,Activo };
    console.log(values);
    await pool.query('INSERT INTO usuarios  SET ?', values);
    res.json({ message: "el usuario  fue guardado" });
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    const CodigoUsuario = req.body.CodigoUsuario;
    const CodigoNivel = 3;
    const CodigoSucursal = '001'
    const Cedula="0";
    const Nombre = req.body.Nombre;
    const Apellido = req.body.Apellido;
    const FechaNacimiento="1991-09-04"
    const Direccion = req.body.Direccion;
    const Telefono = req.body.Telefono;
    const Email = req.body.Email;
    const Usuario=req.body.Nombre;
    const Clave=CodigoUsuario;
    const Activo="1"
    const values = { CodigoUsuario,CodigoNivel,CodigoSucursal,
       Cedula, Nombre, Apellido,FechaNacimiento, Direccion, Telefono,Email, Usuario,Clave,Activo };
    console.log(values);
    const marcas = await pool.query('UPDATE usuarios SET ? WHERE CodigoUsuario = ?', [values, CodigoUsuario]);
    res.json({ message: 'el usuario fue actualizado' });
  }
  public async listarCiudad(req: Request, res: Response) {

    const ciudad = await pool.query('SELECT nombre FROM ciudades');
    res.json(ciudad);
  }

}
export const controladorUsuario = new UsuarioControlador();