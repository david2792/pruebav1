import { Request, Response } from 'express';
import pool from '../../conexionBD';

class CategoriaControlador {
  public async listar(req: Request, res: Response) {
    const familias = await (await pool).query('SELECT * FROM categorias');
    res.json(familias);
  }
  query
  public async listarUno(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    const familias = await pool.query('SELECT * FROM  categorias WHERE CodigoCategoria=?', [id]);
    if (familias.length > 0) {
      return res.json(familias[0]);
      console.log(familias);
    }
    res.status(404).json({ text: 'La categoria no existe' });

  }

  public async crear(req: Request, res: Response): Promise<void> {
    try {
      const codigo = await pool.query('SELECT MAX(CodigoCategoria)+1 AS CodigoCategoria FROM categorias')
      JSON.stringify(codigo);
      const CodigoCategoria = codigo[0].CodigoCategoria;
      console.log(CodigoCategoria);
      const Descripcion = req.body.Descripcion;
      const values = { CodigoCategoria, Descripcion };
      await pool.query('INSERT INTO categorias  SET ?', values);
      res.json({ message: "la categoria fue guardada" });
    } catch (error) {
      console.log("ocurrio un error " + error);
    }
  }

  public async actualiar(req: Request, res: Response): Promise<void> {
    try {
      const codigo = req.body.CodigoCategoria;
      const Descripcion = req.body.Descripcion;
      console.log(codigo);
      const categoria = await pool.query('UPDATE categorias SET ? WHERE CodigoCategoria = ?', [req.body, codigo]);
      res.json({ message: 'La categoria fue actualizada' });
    } catch (error) {
      console.log("ocurrio un error " + error);
    }
  }

  public async eliminar(req: Request, res: Response): Promise<void> {
    // const { id }= req.params;
    const codigo = req.body.CodigoCategoria;
    const categoria = await pool.query('DELETE FROM categorias WHERE CodigoCategoria=?', [codigo]);
    res.json({ message: 'La categoria fue eliminada' });
  }

  public async listarFamilia(req: Request, res: Response) {

    const familia = await pool.query('SELECT * FROM familias');
    res.json(familia);
  }
}

export const categoriaControlador = new CategoriaControlador();