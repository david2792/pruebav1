import mysql from 'promise-mysql';
import key from './bdConfig';

const transaccion = mysql.createPool(key.database);
transaccion.getConnection()
    .then(connection=>{
        transaccion.releaseConnection(connection);
        console.log("se conecto para la transaccion");
    });

export default transaccion;