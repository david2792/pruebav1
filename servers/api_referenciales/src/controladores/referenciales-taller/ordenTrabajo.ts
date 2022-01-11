import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class OrdenControlador {
  public async listarRepuestos(req: Request, res: Response) {
    const productos = await pool.query('SELECT * FROM vproductos where CodigoProducto>0');
    
    res.json(productos);
  }
  public async listarUno(req: Request, res: Response):Promise<any>  {
    const { id } = req.params;
    const marcas = await pool.query('SELECT * FROM veditaroden WHERE numero=?',id);
    console.log(marcas)
    res.json(marcas);

}
  public async entregado(req: Request, res: Response): Promise<any> {
    try {
      const numero = req.body.numero;
      const codigoestadoorden=2;
      const values = { numero }
      console.log(numero)
      const lista = await pool.query('UPDATE ordenestrabajos SET codigoestadoorden=? WHERE numero=?', [codigoestadoorden,numero]);
      await transaccion.query('UPDATE recepciones SET estado=? WHERE numero=?',["2",numero])
      res.json(lista);
    } catch (error) {
      console.log(error)
    }

  }

    public async listar(req: Request, res: Response):Promise<any>  {
        const recepciones = await pool.query('SELECT * FROM vrecepciones WHERE estado=1');
        res.json(recepciones);
    }

  public async listarOrden(req: Request, res: Response):Promise<any> {
    const recepciones = await pool.query('SELECT * FROM vordentrabajo WHERE codigoestadoorden=1');
    for (let i in recepciones) {
       
      recepciones[i].fechaemision = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      recepciones[i].fechaentrada= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    }
    res.json(recepciones);
  }

  public async listarRecepcion(req: Request, res: Response) {
      const marcas = await pool.query('SELECT * FROM vordentrabajo');
      res.json(marcas);

  }
  public async eliminarDetalles(req: Request, res: Response):Promise<any>  {
    try {

      const codigoproducto =req.body.codigoproducto
      const cantidad = req.body.cantidad
      const numero = req.body.codigorecepcion
    console.log(codigoproducto)
    await  transaccion.query("SET autocommit=0")
            const consulta=await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?',[codigoproducto]);
            const stockanterior= consulta[0].StockActual;
            console.log(stockanterior)
            console.log(cantidad)
            const stockactual = stockanterior+cantidad;
            await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?',[stockactual,codigoproducto])
            await transaccion.query('DELETE FROM detallesordentrabajos WHERE  numero=?  AND CodigoProducto=?',[numero,codigoproducto])
       await transaccion.query("COMMIT");// se confirma la transaccion
       await transaccion.query("SET autocommit=1")
       res.json({ message: "el detalle orden de trabajo fue eliminado" })
    } catch (error) {
      await transaccion.query("ROLLBACK");
      await transaccion.query("SET autocommit=1")
      console.log("ocurrio un error: " + error);
      throw error
    }
  }  
  public async actualizar(req: Request, res: Response):Promise<any>  {
    try {

      const codigosucursal=req.body.CodigoSucursal;
      const puntoexpedicion =req.body.PuntoExpedicion;
      const numero = req.body.numero;
      const codigoestadoorden=req.body.codigoestadoorden;
      const observacion=req.body.observacion;
      const fechaemision= req.body.fecha;
      const horaemision="00:00:00";
      const fechatentativaentrega="2020-01-01";
      const horatentativaentrega="00:00:00";
      const fechafinalizacion="2020-01-01";
      const horafinalizacion="00:00:00";
      const fechaentrega=  new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const horaentrega= "00:00:00";

      const orden={codigosucursal,puntoexpedicion,numero,codigoestadoorden,observacion,
        fechaemision,horaemision,fechatentativaentrega,horatentativaentrega,fechafinalizacion,horafinalizacion,fechaentrega,horaentrega}
    console.log(orden)
    await  transaccion.query("SET autocommit=0")
    await transaccion.query('DELETE FROM detallesordentrabajos INTO ordenestrabajos  SET ?', orden);
      let detalles=req.body.detalles;
        console.log(detalles)
          for (let i in detalles){
            const codigoproducto =detalles[i].codigoproducto
            const codigomecanico =detalles[i].codigomecanico
            const cantidad= detalles[i].cantidad
            const descripcion=detalles[i].descripcion
            const precio = detalles[i].precio
            const codigoimpuesto=detalles[i].codigoimpuesto
            const codigoestadoreparacion = '1'
            const detalle = {codigosucursal,puntoexpedicion,numero,codigoproducto,codigomecanico,cantidad,
              descripcion,precio,codigoimpuesto,codigoestadoreparacion}
            await transaccion.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
            // const consulta=await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?',[codigoproducto]);
            // const stockanterior= consulta[0].StockActual;
            // console.log(stockanterior)
            // const stockactual = stockanterior-cantidad;
            // await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?',[stockactual,codigoproducto])
            await transaccion.query('UPDATE ordenestrabajos SET codigoestadoorden=? WHERE numero=?',[2,numero])
        }
       await transaccion.query("COMMIT");// se confirma la transaccion
       await transaccion.query("SET autocommit=1")
       res.json({ message: "el orden de trabajo fue guardado" })
    } catch (error) {
      await transaccion.query("ROLLBACK");
      await transaccion.query("SET autocommit=1")
      console.log("ocurrio un error: " + error);
      throw error
    }
  }  
    public async guardarOrden(req: Request, res: Response):Promise<any>  {
      try {
        let orden = req.body.ordenes

        const codigosucursal=orden.codigosucursal;
        const puntoexpedicion =orden.puntoexpedicion;
        const codigousuario=orden.CodigoUsuario;
        const numero = orden.numero;
        const codigoestadoorden=1;
        const observacion=orden.observacion;
        const fechaemision= orden.fechaemision;
        const horaemision="00:00:00";
        const fechatentativaentrega="2020-01-01";
        const horatentativaentrega="00:00:00";
        const fechafinalizacion="2020-01-01";
        const horafinalizacion="00:00:00";
        const fechaentrega=  new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const horaentrega= "00:00:00";

        const cabecera={codigosucursal,puntoexpedicion,numero,codigoestadoorden,observacion,
          fechaemision,horaemision,fechatentativaentrega,horatentativaentrega,fechafinalizacion,horafinalizacion,fechaentrega,horaentrega}
      console.log(orden)
      await  transaccion.query("SET autocommit=0")
      await transaccion.query('INSERT INTO ordenestrabajos  SET ?', cabecera);
        let deta=req.body.ordenes.detalles;
          console.log(deta)
            for (let i in deta){
              const codigoproducto =deta[i].codigoproducto
              const codigomecanico =codigousuario
              const cantidad= deta[i].cantidad
              const descripcion=deta[i].descripcion
              const precio = deta[i].precio
              const codigoimpuesto=deta[i].codigoimpuesto
              const codigoestadoreparacion = '1'
              const detalle = {codigosucursal,puntoexpedicion,numero,codigoproducto,codigomecanico,cantidad,
                descripcion,precio,codigoimpuesto,codigoestadoreparacion}
              await transaccion.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
              const consulta=await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?',[codigoproducto]);
              // const stockanterior= consulta[0].StockActual;
              // console.log(stockanterior)
              // const stockactual = stockanterior-cantidad;
              // await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?',[stockactual,codigoproducto])
             
          }
          await transaccion.query('UPDATE recepciones SET estado=? WHERE numero=?',[2,numero])
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         const vOrdenes = await pool.query('SELECT * FROM vordentrabajo WHERE codigoestadoorden=1');
    for (let i in vOrdenes) {
       
      vOrdenes[i].fechaemision = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      vOrdenes[i].fechaentrada= new Date().toJSON().slice(0,10).replace(/-/g,'/')
    }
         res.json(vOrdenes)
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    }   
    public async guardardetalle(req: Request, res: Response):Promise<any>  {
      try {

         
        
      await  transaccion.query("SET autocommit=0")
   //   await transaccion.query('INSERT INTO ordenestrabajos  SET ?', orden);
              const codigosucursal=req.body.CodigoSucursal;
              const puntoexpedicion =req.body.PuntoExpedicion;
              const numero = req.body.numero;  
              const codigoproducto =req.body.codigoproducto
              const codigomecanico =req.body.codigomecanico
              const cantidad= req.body.cantidad
              const descripcion=req.body.descripcion
              const precio = req.body.precio
              const codigoimpuesto=req.body.codigoimpuesto
              const codigoestadoreparacion = '1'
              const detalle = {codigosucursal,puntoexpedicion,numero,codigoproducto,codigomecanico,cantidad,
                descripcion,precio,codigoimpuesto,codigoestadoreparacion}
              await transaccion.query('INSERT INTO detallesordentrabajos  SET ?', detalle);
              const consulta=await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?',[codigoproducto]);
              const stockanterior= consulta[0].StockActual;
              console.log(stockanterior)
              const stockactual = stockanterior-cantidad;
              await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?',[stockactual,codigoproducto])
        
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         res.json({ message: "el orden de trabajo fue guardado" })
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    }

    public async ordenPorFecha(req: Request, res: Response) {
      console.log("Recibido backend: ",req.body)
      const fechaentrada = req.body.fechadesde;
      const fechaemision = req.body.fechaHasta;
      const numerochapa = req.body.chapa;
      if (numerochapa) {
        console.log("Filtrar datos_chapa_fecha");
        const orden_Chapa_fecha = await pool.query('SELECT * FROM vordentrabajo WHERE numerochapa=? AND fechaentrada  BETWEEN ? AND ?',[numerochapa, fechaentrada, fechaemision]);
        res.json(orden_Chapa_fecha); 
      } else {
        console.log("Filtrar datos por fecha");
        const orden_recepcionFecha = await pool.query('SELECT * FROM vordentrabajo WHERE fechaentrada  BETWEEN ? AND ?',[fechaentrada, fechaemision]);
        res.json(orden_recepcionFecha);
      }
  }

  public async listarEntregados(req: Request, res: Response):Promise<any> {
    let orden_trabajo = {};
    let numero = req.body.numerochapa;
    const fechaentrada = req.body.fechadesde;
    const fechaemision = req.body.fechaHasta;
    console.log("Consulta de ordenes done")
    const cabecera = await pool.query('SELECT * FROM vordentrabajo WHERE codigoestadoorden=2 AND numerochapa=? AND fechaemision  BETWEEN ? AND ?', [numero, fechaentrada, fechaemision]);
    let numerorecepcion = "";
    cabecera.forEach((element: any) => {

      numerorecepcion = element.numero;
      console.log(numerorecepcion)
    });
    // detalle orden trabajo
    let detalle= await pool.query("SELECT * FROM detallesordentrabajos WHERE numero=?", [numerorecepcion]);
    console.log("detalle", detalle);
    orden_trabajo = {
      o_cabecera: cabecera,
      o_detalle: detalle
    }
    console.log(orden_trabajo);
    res.json(orden_trabajo);
  }

  public async listarDone(req: Request, res: Response) {
    const done = await pool.query('SELECT * FROM vordentrabajo where codigoestadoorden=2');
    done.forEach((element:any) => {
      element.fechaemision = element.fechaemision.toJSON().slice(0, 10).replace(/-/g,'-');
    });
    res.json(done);
}

public async listall(req: Request, res: Response) {
  const numerochapa = req.body.numerochapa;
  const done = await pool.query('SELECT * FROM vordentrabajo WHERE numerochapa = ?', [numerochapa]);
  done.forEach((element:any) => {
    element.fechaemision = element.fechaemision.toJSON().slice(0,10).replace(/-/g,'-');
  });
  res.json(done);
}
public async listaDetallesOrdenTrabajo(req: Request, res: Response) {
  console.log("datos recibidos: ", req.body)
  const estadoorden = req.body.estadoorden;
  const numerchapa = req.body.numerochapa;
  const fechadesde = req.body.fechadesde;
  const fechahasta = req.body.fechaHasta;
  if (estadoorden=== '3') {
    console.log("hello darkness1");
    const all = await pool.query('SELECT * FROM veditaroden where numerochapa=?', [numerchapa]);
    console.log(all);
    all.forEach((element:any) => {
      element.fechaemision = element.fechaemision.toJSON().slice(0,10).replace(/-/g,'-');
    });
    console.log(all);
    res.json(all);
  }
  else {
    console.log("hello darkness2")
    const done = await pool.query('SELECT * FROM veditaroden where codigoestadoorden=? AND numerochapa=? AND fechaemision BETWEEN ? AND ?', [estadoorden, numerchapa, fechadesde, fechahasta]);
    done.forEach((element:any) => {
      element.fechaemision = element.fechaemision.toJSON().slice(0,10).replace(/-/g,'-');
    });
    console.log(done);
    res.json(done);
  }
  
}
}

export const ordenControlador = new OrdenControlador();