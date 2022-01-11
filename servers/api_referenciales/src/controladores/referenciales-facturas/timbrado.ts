import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';


class TimbradoControlador {
    public async recuperarCodigo(req: Request, res:Response): Promise<any>{
        const codigomaximo = await pool.query('SELECT MAX(NumeroTimbrado)+1 AS codigo FROM timbrados');
        JSON.stringify(codigomaximo);
        const codigo = codigomaximo[0].codigo;
        console.log(codigo);
        res.json(codigo)
    }

    public async listarTimbrados(req: Request, res: Response) {
        const timbrados = await pool.query('SELECT * FROM timbrados');
        console.log(timbrados)
        res.json(timbrados);
      }
    public async crear(req:Request, res:Response): Promise<void> {
        let timbrado = req.body.timbrados;
        // console.log("Datos Recividos en backend", timbrado);
        await  transaccion.query("SET autocommit=0");
        // console.log(timbrado);
        // for (const i in timbrado) {
        //     if (Object.prototype.hasOwnProperty.call(timbrado, i)) {
        // const element = timbrado[i];
        const NumeroTimbrado = timbrado.NumeroTimbrado;
        const CodigoSucursal = timbrado.CodigoSucursal;
        const PuntoExpedicion = timbrado.PuntoExpedicion;
        const CodigoTiposDocumento = timbrado.CodigoTiposDocumento;
        const FechaInicioVigencia = timbrado.FechaInicioVigencia;
        const FechaFinVigencia = timbrado.FechaFinVigencia;
        const NumeroInicial = timbrado.NumeroInicial;
        const NumeroFinal = timbrado.NumeroFinal;
        if (timbrado.Estado) {
            const Estado = '1';
        } else {
            const Estado = '0';
        }
        const Estado = timbrado.Estado;
        const values = {NumeroTimbrado, CodigoSucursal, PuntoExpedicion, CodigoTiposDocumento, FechaInicioVigencia, FechaFinVigencia, NumeroInicial, NumeroFinal, Estado};
        await pool.query("INSERT INTO timbrados SET ?", values);
                
        //     }
        // }
        await transaccion.query("COMMIT");// se confirma la transaccion
        await transaccion.query("SET autocommit=1")
        res.json({message: "El registro fué guardado"});

    }

    public async actualizar(req:Request, res:Response): Promise<void> {
        let timbrado = req.body.timbrados;
        // console.log("Datos Recividos en backend", timbrado);
        await  transaccion.query("SET autocommit=0");
        // console.log(timbrado);
        // for (const i in timbrado) {
        //     if (Object.prototype.hasOwnProperty.call(timbrado, i)) {
        // const element = timbrado[i];
        const NumeroTimbrado = timbrado.NumeroTimbrado;
        const CodigoSucursal = timbrado.CodigoSucursal;
        const PuntoExpedicion = timbrado.PuntoExpedicion;
        const CodigoTiposDocumento = timbrado.CodigoTiposDocumento;
        const FechaInicioVigencia = timbrado.FechaInicioVigencia;
        const FechaFinVigencia = timbrado.FechaFinVigencia;
        const NumeroInicial = timbrado.NumeroInicial;
        const NumeroFinal = timbrado.NumeroFinal;
        if (timbrado.Estado) {
            const Estado = '1';
        } else {
            const Estado = '0';
        }
        const Estado = timbrado.Estado;
        const values = {NumeroTimbrado, CodigoSucursal, PuntoExpedicion, CodigoTiposDocumento, FechaInicioVigencia, FechaFinVigencia, NumeroInicial, NumeroFinal, Estado}
        console.log("Datos Recividos en backend", values);
        await pool.query("UPDATE timbrados SET ? WHERE NumeroTimbrado = ?", [values, NumeroTimbrado]);
                
        //     }
        // }
        await transaccion.query("COMMIT");// se confirma la transaccion
        await transaccion.query("SET autocommit=1")
        res.json({message: "El registro fué guardado"});

    }
}

export const timbradoControlador = new TimbradoControlador();