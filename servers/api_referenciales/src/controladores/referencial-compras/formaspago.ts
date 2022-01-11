import { Request, Response } from 'express';
import pool from '../../conexionBD';
import transaccion from '../../transaccionBD';

class FormasPagoControlador {
    public async recuperCodigo(req: Request, res: Response): Promise<any>{
        const codigoMaximo = await pool.query('SELECT MAX(CodigoFormasPago)+1 AS codigo FROM formaspago');
        JSON.stringify(codigoMaximo);
        const codigo = codigoMaximo[0].codigo;
        console.log(codigo);
        res.json(codigo);
    }

    public async listarFpago(req: Request, res:Response): Promise<any>{
        const fpago = await pool.query('SELECT * FROM formaspago');
        res.json(fpago);
    }

    public async crear(req: Request, res: Response):Promise<void>{
        let FormasPago = req.body.fpago;
        console.log("Datos recibidos correctamente(Backend): ", FormasPago);
        let Codigo = await pool.query("SELECT MAX(CodigoFormasPago)+1 AS Codigo FROM formaspago" );
        let CodigoFormasPago;
        if (Codigo[0].Codigo) {
            console.log("Código", Codigo[0].Codigo)
            JSON.stringify(Codigo);
            CodigoFormasPago = Codigo[0].Codigo;
        }else{
            console.log("Hello darkness my old friend")
            CodigoFormasPago = 1
        }
        console.log("Código Formas pago: ", CodigoFormasPago);
        const Descripcion = FormasPago.Descripcion;
        const Plazo = FormasPago.Plazo;
        const Dias = FormasPago.Dias;
        const Estado = FormasPago.Estado;
        const values= {CodigoFormasPago, Descripcion, Plazo, Dias, Estado};
        console.log(values);
        await pool.query("INSERT INTO formaspago SET ?", values);
        const formaspago = await pool.query('SELECT * FROM formaspago');
        res.json(formaspago);
    }

    public async actualizar(req: Request, res: Response):Promise<void>{
        let FormasPago = req.body.fpago;
        await  transaccion.query("SET autocommit=0");
        console.log("Datos recibidos correctamente(UPDATE backend): ", FormasPago);
        const CodigoFormasPago = FormasPago.CodigoFormasPago;
        const Descripcion = FormasPago.Descripcion;
        const Plazo = FormasPago.Plazo;
        const Dias = FormasPago.Dias;
        const Estado = FormasPago.Estado;
        const values= {CodigoFormasPago, Descripcion, Plazo, Dias, Estado};
        console.log(values);
        await pool.query("UPDATE formaspago SET ? WHERE CodigoFormasPago = ?", [values, CodigoFormasPago]);
        await transaccion.query("COMMIT");// se confirma la transaccion
        await transaccion.query("SET autocommit=1")
        const fpagos = await pool.query('SELECT * FROM formaspago');
        res.json(fpagos);
    }
}
export const formasPagoControlador = new FormasPagoControlador();