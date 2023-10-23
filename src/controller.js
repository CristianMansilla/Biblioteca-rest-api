//El pool nos permite generar un pool de conexiones. Esto habilita que existan conexiones paralelas o de manera concurrente.
import { pool } from "./database.js";

class LibroController{
    //req = request, lo solicitado por el cliente
    //res = response, respuesta del lado del servidor
    async getOne(req, res){
        const libro = req.body;
        const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
        res.json(result);
    }
    
    async getAll(req, res){
        //con el [] en result limitamos a que solo nos muestre la primer lista dentro del JSON y así evitamos traer la información del buffer
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO libros(name, author, category, publication_date, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.name, libro.author, libro.category, libro.publication_date, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }

    async update(req, res){
        const libro = req.body;
        const[result] = await pool.query(`UPDATE libros SET name=(?), author=(?), category=(?), publication_date=(?), isbn=(?) WHERE id=(?)`, [libro.name, libro.author, libro.category, libro.publication_date, libro.isbn, libro.id]);
        res.json({"Registros actualizados": result.changedRows});
    }

    async deleteId(req, res){
        const libro = req.body;
        const[result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async deleteIsbn(req, res){
        const libro = req.body;
        const[result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`, [libro.isbn]);
        res.json({"Registros eliminados": result.affectedRows});
    }
}

export const libro = new LibroController();