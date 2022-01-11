import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class FacturacionControlador {

    public async validarApertura(req: Request, res: Response) {
        const {usuarioCajero} = req.params;
        const apertura = await pool.query('SELECT * FROM vaperturascaja WHERE estado=1 AND usuarioCajero=?',usuarioCajero);
        console.log(apertura)
        res.json(apertura);
      } 
      public async validarTimbrado(req: Request, res: Response) {
        const {documento} = req.params;
        console.log(documento)
        const timbrado = await pool.query('SELECT * FROM timbrados WHERE estado=1 AND CodigoTiposDocumento=?',documento);
       console.log(timbrado)
        res.json(timbrado);
      }

      public async guardarFactura(req: Request, res: Response):Promise<any>  {
        try {
          const codigomaximo = await pool.query('SELECT MAX(NumeroFactura)+1 AS codigo FROM facturasventas');
          JSON.stringify(codigomaximo);
          let NumeroFactura = codigomaximo[0].codigo;
          if (NumeroFactura==null)
          {
            NumeroFactura=1
          }
          const Vencimiento=  new Date().toJSON().slice(0,10).replace(/-/g,'/');
          let factura = req.body.cabeceras
          const NumeroApertura =factura.numeroApertura;
          const CodigoSucursal=factura.CodigoSucursal;
          const NumeroTimbrado= factura.NumeroTimbrado;
          const PuntoExpedicion =factura.PuntoExpedicion;
          const CodigoUsuario=factura.CodigoUsuario;
          const CodigoTiposDocumento = factura.CodigoTiposDocumento;
          const CodigoCondicion=factura.CodigoCondicion;
          const CodigoFormasCobro=factura.CodigoFormasCobro;
          const CodigoCliente= factura.CodigoCliente;
          const Apodo = "sin apodo";
          const Fecha=  new Date().toJSON().slice(0,10).replace(/-/g,'/');
          const Hora= "00:00:00";
          const Estado = 0;
          const TotalLetras = "sin letras"
  
          const cabecera={CodigoTiposDocumento,NumeroTimbrado,CodigoSucursal,PuntoExpedicion,NumeroFactura,CodigoCondicion,
            CodigoFormasCobro,CodigoCliente,Apodo,CodigoUsuario,Fecha,Hora,Estado,TotalLetras}
          console.log(cabecera)
        await  transaccion.query("SET autocommit=0")
        await transaccion.query('INSERT INTO facturasventas  SET ?', cabecera);
          let deta=req.body.detalles.datosDetalle;
            console.log(deta)
              for (let i in deta){
                const codigoproducto =deta[i].codigoproducto
                const cantidad= deta[i].cantidad
                const descripcion=deta[i].descripcion
                const precio = deta[i].precio
                const descuento = 0
                const TasaImpuesto = 1
                const preciocompra = 0
                const detalle = {NumeroTimbrado,CodigoSucursal,PuntoExpedicion,NumeroFactura,codigoproducto,cantidad,descripcion,
                precio,descuento,TasaImpuesto,preciocompra}
                await transaccion.query('INSERT INTO detallesfacturasventas  SET ?', detalle);
                const consulta=await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?',[codigoproducto]);
                const stockanterior= consulta[0].StockActual;
                console.log(stockanterior)
                const stockactual = stockanterior-cantidad;
                await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?',[stockactual,codigoproducto])
                // descontar stock
              //  inicia cuentas a cobrar
            }
            // confirma orden de trabajo si existe
            let numeroorden = req.body.orden.numero
            if (numeroorden != null )
            {
              console.log("paso para confirmar la orden"+numeroorden)
              await transaccion.query('UPDATE ordenestrabajos SET codigoestadoorden=? WHERE numero=?',[2,numeroorden])
            }
            // fin orden
            let cuentacobrar = req.body.detalles
            const NumeroCuota=1;
            const MontoCuota=cuentacobrar.total
            const MontoPagado=cuentacobrar.total
            const cancelado =0
            const cuenta = {NumeroCuota,NumeroTimbrado,CodigoSucursal,PuntoExpedicion,NumeroFactura,MontoCuota,MontoPagado,Vencimiento,cancelado}
            await transaccion.query('INSERT INTO cuentascobrar  SET ?', cuenta);
//          movimiento caja
            const codigomovimiento = await pool.query('SELECT MAX(NumeroOperacion)+1 AS codigo FROM movimientoscaja');
            JSON.stringify(codigomovimiento);
            let NumeroOperacion = codigomovimiento[0].codigo;
            if (NumeroOperacion==null)
            {
              NumeroOperacion=1
            }
            const Descripcion="pago de factura"
            const CodigoOperacion=1
            const movimiento = {NumeroOperacion,NumeroApertura,CodigoOperacion,Fecha,Hora,Descripcion,Estado}
            await transaccion.query('INSERT INTO movimientoscaja  SET ?', movimiento);
            // Detalle movimiento
            const Monto = cuentacobrar.total
            const detallemovimiento = {NumeroOperacion,NumeroCuota,NumeroTimbrado,CodigoSucursal,PuntoExpedicion,NumeroFactura,Monto}
            await transaccion.query('INSERT INTO detallesmovimientoscaja  SET ?', detallemovimiento);
            // detalle  tipo de cobro
            const CodigoTiposCobro=1;
            const detalletipocobro ={CodigoTiposCobro,NumeroOperacion,Monto}
            await transaccion.query('INSERT INTO detallestiposcobro  SET ?', detalletipocobro);
          
            // fin
           await transaccion.query("COMMIT");// se confirma la transaccion
           await transaccion.query("SET autocommit=1")
           const vOrdenes = await pool.query('SELECT * FROM vfacturasventas ');
           const vCabecera = await pool.query('SELECT * FROM vfacturasventas where NumeroFactura = ?', [NumeroFactura]);
           res.json({'cabecera':vCabecera, 'vOrdenes': vOrdenes})
        } catch (error) {
          await transaccion.query("ROLLBACK");
          await transaccion.query("SET autocommit=1")
          console.log("ocurrio un error: " + error);
          throw error
        }
      }   
}

export const facturacionControlador = new FacturacionControlador();