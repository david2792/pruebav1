import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class ComprasControlador {
    public async guardarCompras(req: Request, res: Response): Promise<any> {
        // Tablas afectadas: Factura Compras, Detalle Factura Compra, Stock(actual), Cuentas a pagar
        try {
            // Recibir datos del frontend --> Interfaz compras
            let cabecera_compra = req.body.cabecera_compras;
            let detalle_compras = req.body.detalle_compras;
            // Preparar transaccion
            // Deshabilitar autocommit
            await transaccion.query("SET autocommit=0")
            // Preparar insert de la cabecera factura
            await transaccion.query("INSERT INTO facturascompras SET ?", cabecera_compra);
            // Recorrer lista detalle y filtar campos
            for (let index in detalle_compras) {
                // Asignar valores a utilizar
                const NroFactura = cabecera_compra.NroFactura;
                const CodigoProducto = detalle_compras[index].CodigoProducto;
                const Cantidad = detalle_compras[index].Cantidad;
                const Precio = detalle_compras[index].Precio;
                const SubTotal = detalle_compras[index].SubTotal;
                // crear una lista de las asignaciones ateriores
                const detalle = { NroFactura, CodigoProducto, Cantidad, Precio, SubTotal }
                //Preparar insert detalle factura.
                await transaccion.query('INSERT INTO detallefacturacompra SET ? ', detalle);
                // Seleccionar stock a actualizar
                const consulta_Stock = await transaccion.query('SELECT StockActual FROM stock WHERE CodigoProducto=?', [CodigoProducto]);
                console.log("Sumar", consulta_Stock[0].StockActual, "+", Cantidad);
                // Realizar suma del stock actual y la cantidad comprada
                const Stock = consulta_Stock[0].StockActual + Cantidad;
                console.log("Total: ", Stock);
                // Actualizar el stock
                await transaccion.query('UPDATE stock SET StockActual=? WHERE CodigoProducto=?', [Stock, CodigoProducto]);
            }
            // Fin del ciclo for
            // Iniciar Cuentas a pagar
            const NroCuota = 1;
            const MontoCuota = cabecera_compra.Total;
            const cancelado = 0;
            const Vencimiento = cabecera_compra.Fecha;
            const NroFactura = cabecera_compra.NroFactura;
            const CuentasAPagar = { NroCuota, MontoCuota, cancelado, Vencimiento, NroFactura };
            await transaccion.query("INSERT INTO cuentaspagar SET ?", CuentasAPagar);
            await transaccion.query("COMMIT");// se confirma la transaccion
            await transaccion.query("SET autocommit=1")
            res.json({"mensaje": "Registro existoso"})
        } catch (error) {
            await transaccion.query("ROLLBACK");
            await transaccion.query("SET autocommit=1")
            console.log("ocurrio un error: " + error);
            throw error
        }
    }
}

export const comprasControlador = new ComprasControlador();