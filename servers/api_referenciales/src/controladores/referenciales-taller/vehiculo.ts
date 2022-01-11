import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class VehiculoControlador {
    public async listar(req: Request, res: Response) {
        const marcas = await pool.query('SELECT * FROM vclientevehiculos');
        res.json(marcas);
    }

    public async listarUno(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const marcas = await pool.query('SELECT * FROM tracciones WHERE codigo=?', [id]);
        if (marcas.length > 0) {
            return res.json(marcas[0]);
            console.log(marcas);
        }
        res.status(404).json({ text: 'La marca no existe' });

    }

    public async crear(req: Request, res: Response): Promise<void> {
        try {

            const codigomaximo = await pool.query('SELECT MAX(codigovehiculo)+1 AS codigo FROM vehiculos');
            JSON.stringify(codigomaximo);
            let codigovehiculo = codigomaximo[0].codigo;
            if (codigovehiculo==null)
            {
                codigovehiculo=1
            }
            let vehiculo=req.body.vehiculos;
            const codigomarca = vehiculo.codigomarca;
            const codigomodelo = vehiculo.codigomodelo;
            const codigotransmision = vehiculo.codigotransmision;
            const codigotipocombustible = "1";
            const codigotraccion = "1";
            const codigocolor = vehiculo.codigocolor;
            const codigoanio = "1";
            const numerochapa = vehiculo.chapa;
            const numerochasis = vehiculo.chasis;
            const observacion=vehiculo.observacion;
            const vehiculos = {
                codigovehiculo, codigomarca, codigomodelo, codigotransmision, codigotipocombustible, codigotraccion, codigocolor,
                codigoanio, numerochapa, numerochasis,observacion
            };
            const codigocliente = vehiculo.CodigoCliente;
           // const codigovehiculo=codigo;
            const detallevehiculo = { codigovehiculo, codigocliente }
            console.log(vehiculos)
            await transaccion.query("SET autocommit=0")
            await transaccion.query('INSERT INTO vehiculos  SET ?', vehiculos);
            await transaccion.query('INSERT INTO detallesvehiculos  SET ?', detallevehiculo);
            await transaccion.query("COMMIT");// se confirma la transaccion
            await transaccion.query("SET autocommit=1")
           // await Promise.all([set0, cabecera, detalle, comi, set1])
            
           const vVehiculo = await pool.query('SELECT * FROM vclientevehiculos');
           res.json(vVehiculo);
        } catch (error) {
            await transaccion.query("ROLLBACK");
            await transaccion.query("SET autocommit=1")
           // await Promise.all([rol, set11]);
            console.log('error' + error)
        }
    }

    public async eliminar(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const marcas = await pool.query('DELETE FROM tracciones WHERE codigo=?', [id]);
        res.json({ message: 'La marca fue eliminado' });
    }

    public async actualizar(req: Request, res: Response): Promise<any> {
        try {
            let vehiculo=req.body.vehiculos;
            const codigovehiculo=vehiculo.codigovehiculo;
            const codigomarca = vehiculo.codigomarca;
            const codigomodelo = vehiculo.codigomodelo;
            const codigotransmision = vehiculo.codigotransmision;
            const codigotipocombustible = "1";
            const codigotraccion = "1";
            const codigocolor = vehiculo.codigocolor;
            const codigoanio = "1";
            const numerochapa = vehiculo.chapa;
            const numerochasis = vehiculo.chasis;
            const observacion=vehiculo.observacion;
            const vehiculos = {
                codigovehiculo, codigomarca, codigomodelo, codigotransmision, codigotipocombustible, codigotraccion, codigocolor,
                codigoanio, numerochapa, numerochasis,observacion
            };
            console.log(vehiculos)
            await transaccion.query("SET autocommit=0")
            await transaccion.query('UPDATE vehiculos SET ? WHERE codigovehiculo = ?', [vehiculos,codigovehiculo]);
            // await transaccion.query('INSERT INTO vehiculos  SET ?', vehiculos);
            // await transaccion.query('INSERT INTO detallesvehiculos  SET ?', detallevehiculo);
            await transaccion.query("COMMIT");// se confirma la transaccion
            await transaccion.query("SET autocommit=1")
           // await Promise.all([set0, cabecera, detalle, comi, set1])
            
           const vVehiculo = await pool.query('SELECT * FROM vclientevehiculos');
           res.json(vVehiculo);
        } catch (error) {
            await transaccion.query("ROLLBACK");
            await transaccion.query("SET autocommit=1")
           // await Promise.all([rol, set11]);
            console.log('error' + error)
        }
    }
}

export const vehiculoControlador = new VehiculoControlador();