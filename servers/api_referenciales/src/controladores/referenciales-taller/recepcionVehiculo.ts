import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class RecepcionVehiculoControlador {
    public async listar(req: Request, res: Response):Promise<any>  {
        const { id } = req.params;
        const marcas = await pool.query('SELECT * FROM vclientevehiculos WHERE  CodigoCliente=?',id);
     //   console.log(marcas)
        res.json(marcas);

    }
    public async listarUno(req: Request, res: Response):Promise<any>  {
        const { id } = req.params;
        const marcas = await pool.query('SELECT * FROM vrecepciones WHERE numero=?',id);
       
        console.log(marcas)
        res.json(marcas);

    }

    public async listarRecepcion(req: Request, res: Response) :Promise<any> {
      const marcas = await pool.query('SELECT * FROM vrecepciones WHERE estado=1');

      for (let i in marcas) {
       
        marcas[i].fechaentrada = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      }
     
      console.log("hola")
      res.json(marcas);

  }
  
    public async guardar(req: Request, res: Response):Promise<any>  {
      try {
        await  transaccion.query("SET autocommit=0")
       
        let recepcion = req.body.recepciones

        const codigomaximo = await pool.query('SELECT MAX(numero)+1 AS codigo FROM recepciones');
            JSON.stringify(codigomaximo);
            let numero = codigomaximo[0].codigo;
            if (numero==null)
            {
              numero=1
            }
        const codigosucursal=recepcion.codigosucursal;
        const puntoexpedicion =recepcion.puntoexpedicion;
        const CodigoCliente=recepcion.codigocliente;
        const recibidopor=recepcion.recibidopor;
        const estado="1";
        const fechaentrada = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const horaentrada= "00:00:00";
        const observaciones=recepcion.observaciones;
        const recepciones={codigosucursal,puntoexpedicion,numero,CodigoCliente,recibidopor,estado,fechaentrada,
      horaentrada,observaciones}
      console.log(recepciones)
      await transaccion.query('INSERT INTO recepciones  SET ?', recepciones);
     //   let detalle=req.body.detalles;
              const codigonivelcombustible =recepcion.codigonivelcombustible
              const codigovehiculos= recepcion.codigovehiculo
              const km = recepcion.km
              const detalleRecepcion = {codigosucursal,puntoexpedicion,numero,codigovehiculos,codigonivelcombustible,km}
              await transaccion.query('INSERT INTO detallesrecepciones  SET ?', detalleRecepcion);
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         const vRecepcion = await pool.query('SELECT * FROM vrecepciones WHERE estado=1');
         for (let i in vRecepcion) {
             vRecepcion[i].fechaentrada = new Date().toJSON().slice(0,10).replace(/-/g,'/')
         }   
        res.json(vRecepcion);
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    }   
  
    public async actualizar(req: Request, res: Response):Promise<any>  {
      try {
        await  transaccion.query("SET autocommit=0")
       
        let recepcion = req.body.recepciones
        const numero = recepcion.numero
        const codigosucursal=recepcion.codigosucursal;
        const puntoexpedicion =recepcion.puntoexpedicion;
        const CodigoCliente=recepcion.codigocliente;
        const recibidopor=recepcion.recibidopor;
        const estado="1";
        const fechaentrada = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const horaentrada= "00:00:00";
        const observaciones=recepcion.observaciones;
        const recepciones={codigosucursal,puntoexpedicion,numero,CodigoCliente,recibidopor,estado,fechaentrada,
      horaentrada,observaciones}
      console.log(recepciones)
      //await transaccion.query('INSERT INTO recepciones  SET ?', recepciones);
     //   let detalle=req.body.detalles;
              const codigonivelcombustible =recepcion.codigonivelcombustible
              const codigovehiculos= recepcion.codigovehiculo
              const km = recepcion.km
              const detalleRecepcion = {codigosucursal,puntoexpedicion,numero,codigovehiculos,codigonivelcombustible,km}
               await transaccion.query('UPDATE recepciones SET ? WHERE numero = ?',[ recepciones,numero]);
              //await transaccion.query('INSERT INTO detallesrecepciones  SET ?', detalleRecepcion);
         await transaccion.query("COMMIT");// se confirma la transaccion
         await transaccion.query("SET autocommit=1")
         const vRecepcion = await pool.query('SELECT * FROM vrecepciones WHERE estado=1');
      for (let i in vRecepcion) {
       
         vRecepcion[i].fechaentrada = new Date().toJSON().slice(0,10).replace(/-/g,'/')
      }   
      res.json(vRecepcion);
      } catch (error) {
        await transaccion.query("ROLLBACK");
        await transaccion.query("SET autocommit=1")
        console.log("ocurrio un error: " + error);
        throw error
      }
    
    }
    
    public async recepcionPorFecha(req: Request, res: Response) {
      console.log(req.body)
      const fechaentrada = req.body.fechadesde;
      const fechaemision = req.body.fechaHasta;
      const chapa = req.body.chapa;
      if (chapa) {
        console.log("Filtrar datos_chapa_fecha");
        const recepcionChapa_fecha = await pool.query('SELECT * FROM vrecepciones WHERE estado=2 AND chapa=? AND fechaentrada  BETWEEN ? AND ?',[chapa, fechaentrada, fechaemision]);
        res.json(recepcionChapa_fecha); 
      } else {
        console.log("Filtrar datos por fecha");
        const recepcionFecha = await pool.query('SELECT * FROM vrecepciones WHERE estado=2 AND fechaentrada  BETWEEN ? AND ?',[fechaentrada, fechaemision]);
        res.json(recepcionFecha);
      }
  }
}

export const recepcionvehiculoControlador = new RecepcionVehiculoControlador();