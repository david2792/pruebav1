import { Request, Response } from 'express';
import pool from '../../conexionBD';


class AperturaControlador {

  public async listarMecanico(req: Request, res: Response) {
    const mecanico = await pool.query('SELECT * FROM vmecanico where CodigoNivel=3');
    res.json(mecanico);
  }

  public async listarApertura(req: Request, res: Response) {
    const caja = await pool.query('SELECT * FROM vaperturascaja WHERE estado = 1');
    res.json(caja);
  }

  public async validarApertura(req: Request, res: Response) {
    const {usuarioCajero} = req.params;
    const apertura = await pool.query('SELECT * FROM vaperturascaja WHERE  usuarioCajero=? AND estado = 1',usuarioCajero);
   // JSON.stringify(apertura);
    //console.log(apertura)
    res.json(apertura);
  } 

  public async CalcularTotalVenta(req: Request, res: Response) {
    const {usuarioCajero} = req.params;
    const apertura = await pool.query('SELECT NumeroApertura,CodigoTiposCobro,SUM(Monto) AS Monto,TipoCobro,TipoMovimiento FROM vingresosarqueos WHERE  usuarioCajero=? AND estado = 1',usuarioCajero);
   // JSON.stringify(apertura);
    //console.log(apertura)
    res.json(apertura);
  } 


  public async abrirCaja(req: Request, res: Response): Promise<void> {
    const Codigo = await pool.query('SELECT MAX(NumeroApertura)+1 AS numero FROM aperturascaja')
    JSON.stringify(Codigo);
    const numeroapertura = Codigo[0].numero;
    let apertura = req.body.aperturas
    const CodigoUsuario=apertura.CodigoUsuario;
    const NumeroCaja="1";
    const Fecha=new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const Hora="00:00:00";
    const Monto=apertura.Monto.split('.').join("")
    const Estado="1"
    const values = {numeroapertura,CodigoUsuario,NumeroCaja , Fecha, Hora, Monto, Estado};
    console.log(values);
    await pool.query('INSERT INTO aperturascaja  SET ?', values);
    const vapertura = await pool.query('SELECT * FROM aperturascaja');
    res.json(vapertura);
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
export const controladorApertura = new AperturaControlador();