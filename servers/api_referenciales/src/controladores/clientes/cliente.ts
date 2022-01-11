import { Request, Response } from 'express';
import pool from '../../conexionBD';


class ClienteControlador {

  public async listarMecanico(req: Request, res: Response) {
    const mecanico = await pool.query('SELECT * FROM vmecanico where CodigoNivel=3');
    res.json(mecanico);
  }

  public async listar(req: Request, res: Response) {
    const usuario = await pool.query('SELECT * FROM vclientes');
    res.json(usuario);
  }

  public async crear(req: Request, res: Response): Promise<void> {
    const Codigo = await pool.query('SELECT MAX(CodigoCliente)+1 AS Codigo FROM clientes')
    JSON.stringify(Codigo);
    const CodigoCliente = Codigo[0].Codigo;
    let cliente = req.body.clientes;
    console.log(cliente.Ruc)
    const CodigoCiudad=cliente.CodigoCiudad
    console.log(CodigoCiudad);
    const Cedula = cliente.Cedula;
    const Ruc = cliente.Ruc;
    const RazonSocial =cliente.RazonSocial;
    const Direccion =cliente.Direccion;
    const Telefono =cliente.Telefono;
    const Email = cliente.Email;
    const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono,Email, CodigoCiudad };
    console.log(values);
    await pool.query('INSERT INTO clientes  SET ?', values);
    const vclientes = await pool.query('SELECT * FROM vclientes');
    res.json(vclientes);
  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    let cliente = req.body.clientes;
    const CodigoCliente = cliente.CodigoCliente;
    const CodigoCiudad=cliente.CodigoCiudad
    const Cedula = cliente.Cedula;
    const Ruc = cliente.Ruc;
    const RazonSocial = cliente.RazonSocial;
    const Direccion = cliente.Direccion;
    const Telefono = cliente.Telefono;
    const Email = cliente.Email;
    const values = { CodigoCliente, Cedula, Ruc, RazonSocial, Direccion, Telefono, Email, CodigoCiudad };
    console.log("Datos para actualizar "+values)
    const marcas = await pool.query('UPDATE clientes SET ? WHERE CodigoCliente = ?', [values, CodigoCliente]);
    const vclientes = await pool.query('SELECT * FROM vclientes');
    res.json(vclientes);
  }
  public async listarCiudad(req: Request, res: Response) {

    const ciudad = await pool.query('SELECT nombre FROM ciudades');
    res.json(ciudad);
  }

}
export const controladorCliente = new ClienteControlador();