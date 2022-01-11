import { Request, Response, json } from 'express';
import pool from '../../conexionBD';
class ListaPrecio {
  
  public async listar(req: Request, res: Response) {
    const productos = await pool.query('SELECT * FROM vproductos');
    res.json(productos);
  }

  public async recuperarCodigo(req: Request, res: Response): Promise<any> {
    const codigomaximo = await pool.query('SELECT MAX(CodigoProducto) as codigo FROM productos');
    JSON.stringify(codigomaximo);
    const codigo = codigomaximo[0].codigo;
    res.json(codigo + 1)
  }

  // public async recuperarCodigo(req: Request, res: Response): Promise<any> {
  //   const codigomaximo = await mysqlConexion.query('SELECT MAX(Codigo) as Codigo+1 FROM listaprecios', (err, rows, fields) => {
  //     if (!err) {
  //       return res.json(rows[0].Codigo)
  //     } else {
  //       console.log(err)
  //     }
  //   });
  // }
  // public async anular(req: Request, res: Response): Promise<any> {
  //   try {
  //     const Codigo = req.body.Codigo;
  //     let Estado = req.body.Estado;
  //     console.log(Estado);
  //     if (Estado == "ACTIVADO") {
  //       Estado = "DESACTIVADO";
  //     } else {
  //       Estado = "ACTIVADO";
  //     }
  //     const values = { Estado }
  //     const lista = await mysqlConexion.query('UPDATE listaprecios SET ? WHERE Codigo=?', [values, Codigo]);
  //     res.json(lista);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }
  public async listarUno(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const productos = await pool.query('SELECT * FROM  listaprecio1 WHERE CodigoProducto=?', [id]);
    if (productos.length > 0) {
      return res.json(productos);
    }
    res.status(404).json({ text: 'El producto no existe' });

  
}

  public async crear(req: Request, res: Response): Promise<void> {
    try {
      await pool.query("START TRANSACTION");// se inica la transaccion
      const codigomaximo = await pool.query('SELECT MAX(codigo)+1 AS codigo FROM listaprecios');
      JSON.stringify(codigomaximo);
      const Codigo = codigomaximo[0].codigo;
      const depo = req.body.depo;
      console.log(depo);
      const iddeposito = await pool.query('SELECT codigoDeposito FROM depositos WHERE Nombre =?', depo);
      JSON.stringify(iddeposito);
      const codigoDeposito = iddeposito[0].codigoDeposito;
      const CodigoProducto = req.body.codigoproducto;
      const Descripcion = req.body.Descripcion;
      const Precio = req.body.Precio;
      const Porcentaje = "0";
      const PrecioCompra = '0';
      const Cuotas = req.body.Cuotas;
      const lista = { Codigo, codigoDeposito, CodigoProducto, Descripcion, Precio, Porcentaje, PrecioCompra, Cuotas };// datos de productos
      console.log(lista);    
      await pool.query('INSERT INTO listaprecios  SET ?', lista);// se inserta los datos en la tabla productos
      await pool.query("COMMIT");// se confirma la transaccion
      res.json({ message: "el producto fue guardado" });
    } catch (error) {
      await pool.query("ROLLBACK");
      console.log("ocurrio un error: " + error);
      throw error
    }
  }


  public async anular(req: Request, res: Response): Promise<any> {
    try {
      const Codigo = req.body.Codigo;
      let Estado = req.body.Estado;
      console.log(Estado);
      if (Estado == "ACTIVADO") {
        Estado = "DESACTIVADO";
      } else {
        Estado = "ACTIVADO";
      }
      const values = { Estado }
      const lista = await pool.query('UPDATE listaprecios SET ? WHERE Codigo=?', [values, Codigo]);
      res.json(lista);
    } catch (error) {
      console.log(error)
    }

  }

  public async actualizar(req: Request, res: Response): Promise<void> {
    try {
      const Codigo = req.body.Codigo;
      console.log(Codigo)
      const Descripcion = req.body.Descripcion;
      const Precio = req.body.Precio;
      const Porcentaje = "0";
      const PrecioCompra = '0';
      const Cuotas = req.body.Cuotas;
      const lista = { Codigo, Descripcion, Precio, Porcentaje, PrecioCompra, Cuotas };// datos de productos
      console.log(lista);
      await pool.query('UPDATE  listaprecios  SET ? WHERE Codigo =?', [lista, Codigo]);// se inserta los datos en la tabla productos
      res.json({ message: "el producto fue guardado" });
    } catch (error) {
      console.log("ocurrio un error: " + error);
      throw error
    }

  }


}
export const listaPrecioControlador = new ListaPrecio();