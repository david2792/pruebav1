import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export interface IPayload {
    codigo: string;
    users:string;
    NivelUsuario: string;
} 

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('auth-token');
        if (!token) return res.status(401).json('Access Denied');
        const payload = jwt.verify(token, 'Secret Password' || 'Secret Password') as IPayload;
        console.log(payload)
        req.usuario = payload.NivelUsuario;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
}