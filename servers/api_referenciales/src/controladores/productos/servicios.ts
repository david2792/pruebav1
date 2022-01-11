
import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD'

class ServicioControlador {
  public async recuperarCodigo(req: Request, res: Response): Promise<any> {
    const codigomaximo = await pool.query('SELECT MAX(CodigoProducto)+1 AS codigo FROM productos');
    JSON.stringify(codigomaximo);
    const codigo = codigomaximo[0].codigo;
    console.log(codigo);
    res.json(codigo);

  }

  public async listar(req: Request, res: Response) {
    const productos = await pool.query('SELECT * FROM vproductos where  Categoria = "SERVICIO" and CodigoProducto>0');
    res.json(productos);
  }

  public async listarUno(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const productos = await pool.query('SELECT * FROM  vproductos WHERE Codigoproducto=?', [id]);
    if (productos.length > 0) {
      return res.json(productos[0]);
      console.log(productos);
    }
    res.status(404).json({ text: 'El producto no existe' });

  }

  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const Codigo = await pool.query('SELECT MAX(CodigoProducto)+1 AS Codigo FROM productos')
      JSON.stringify(Codigo); 
      const CodigoProducto = Codigo[0].Codigo;
      const categoria = "SERVICIO";
      const marca = "NO DEFINIDO";
      const idimpuesto = "3"
      const iddeposito = "1"
      // se inicia recuperando los datos de la tabla productos
      let producto=req.body.productos;
      const CodigoCategoria = '2';
      const CodigoMarca = '1';
      const CodigoUnidad = '1';
      const CodigoRepresentante = '1';
      const CodigImpuesto = '3';
      const CodigoBarra =CodigoProducto;
      const Descripcion = producto.Descripcion;
      const cantidadpaquete = '0';
      const perecedero = '1';
      const peso = '0';
      const estado = '1';
      const productos = {
        CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
        CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
      };// datos de productos
      const codigoDeposito = '1';
      const StockActual = 0;
      const StockMinimo =0;
      const StockMaximo = 0;
      const PrecioCompra = producto.PrecioCompra;
      const PrecioVentaMinorista =producto.PrecioVentaMinorista;
      const PrecioVentaMayorista =producto.PrecioVentaMinorista;
      const UtilidadMinima = 0;
      const UtilidadMaxima = 0;
      const stock = {
        codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
        PrecioVentaMayorista
      }
      // console.log(stock)
      await transaccion.query("SET autocommit=0")
      await transaccion.query('INSERT INTO productos  SET ?', productos);// se inserta los datos en la tabla productos
      await transaccion.query('INSERT INTO stock  SET ?', stock);// se inserta los datos en la tabla stock
      await transaccion.query("COMMIT");// se confirma la transaccion
      await transaccion.query("SET autocommit=1")
      const vproducto = await pool.query('SELECT * FROM vproductos where Categoria = "SERVICIO" and CodigoProducto>0');
      res.json(vproducto)
    } catch (error) {
      await transaccion.query("ROLLBACK");
      await transaccion.query("SET autocommit=1")
      console.log("ocurrio un error: " + error);
      throw error
    }


  }
  public async actualizar(req: Request, res: Response): Promise<any> {
    let producto=req.body.productos;
    const categoria = "SERVICIO";
    const marca = "NO DEFINIDO";
    const idimpuesto = "3"
    const iddeposito = "1"
    // se inicia recuperando los datos de la tabla productos
    const CodigoProducto = producto.CodigoProducto;
    const CodigoCategoria = '2';
    const CodigoMarca = '1';
    const CodigoUnidad = '1';
    const CodigoRepresentante = '1';
    const CodigImpuesto = '3';
    const CodigoBarra =CodigoProducto;
    const Descripcion = producto.Descripcion;
    const cantidadpaquete = '0';
    const perecedero = '1';
    const peso = '0';
    const estado = '1';
    const productos = {
      CodigoProducto, CodigoBarra, Descripcion, cantidadpaquete, peso, perecedero, estado,
      CodigoRepresentante, CodigoUnidad, CodigoMarca, CodigoCategoria, CodigImpuesto
    };// datos de productos
     console.log(productos)
    const codigoDeposito = '1';
    const StockActual = 0;
    const StockMinimo =0;
    const StockMaximo = 0;
    const PrecioCompra = producto.PrecioCompra;
    const PrecioVentaMinorista =producto.PrecioVentaMinorista;
    const PrecioVentaMayorista = producto.PrecioVentaMinorista;
    const UtilidadMinima = 0;
    const UtilidadMaxima = 0;
    const stock = {
      codigoDeposito, CodigoProducto, StockActual, StockMinimo, StockMaximo, PrecioCompra, UtilidadMinima, UtilidadMaxima, PrecioVentaMinorista,
      PrecioVentaMayorista
    }
    try {
      console.time('loop');
      await transaccion.query("SET autocommit=0")
      await transaccion.query('UPDATE productos  SET ? WHERE codigoproducto= ?', [productos, CodigoProducto]);// se inserta los datos en la tabla productos
      await transaccion.query('UPDATE  stock  SET ? WHERE codigoproducto= ?', [stock, CodigoProducto]);// se inserta los datos en la tabla stock
      await transaccion.query("COMMIT");// se confirma la transaccion
      await transaccion.query("SET autocommit=1")
      const vproducto = await pool.query('SELECT * FROM vproductos where Categoria = "SERVICIO" and CodigoProducto>0');
      res.json(vproducto)
      console.timeEnd('loop');
    } catch (error) {
      await transaccion.query("ROLLBACK");
      await transaccion.query("SET autocommit=1")
      console.log("ocurrio un error: " + error);
      throw error
    }
  }
  public async listarFamilia(req: Request, res: Response) {

    const familia = await pool.query('SELECT * FROM familias');
    res.json(familia);
  }

  public async listarCategoria(req: Request, res: Response) {
    const familias = await pool.query('SELECT * FROM categorias');
    res.json(familias);
  }
  public async listarDeposito(req: Request, res: Response) {
    const deposito = await pool.query('SELECT * FROM depositos');
    res.json(deposito);
  }
  public async listarImpuesto(req: Request, res: Response) {
    const unidad = await pool.query('SELECT * FROM tipoimpuesto');
    res.json(unidad);
  }

  public async listarMarcas(req: Request, res: Response) {
    const marcas = await pool.query('SELECT * FROM marcas');
    res.json(marcas);
  }

  public async listarMedida(req: Request, res: Response) {
    const unidad = await pool.query('SELECT * FROM unidadesmedida');
    res.json(unidad);
  }

  public async listarPresentacion(req: Request, res: Response) {
    const presentaciones = await pool.query('SELECT * FROM presentaciones');
    res.json(presentaciones);
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const marcas = await pool.query('DELETE FROM productos WHERE codigoproducto=?', [id]);
    res.json({ message: 'La el producto fue eliminado' });
  }
}
export const servicioControlador = new ServicioControlador();