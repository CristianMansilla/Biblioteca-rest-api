//El pool nos permite generar un pool de conexiones. Esto habilita que existan conexiones paralelas o de manera concurrente.
import { pool } from "./database.js";

class LibroController{
    //req = request, lo solicitado por el cliente
    //res = response, respuesta del lado del servidor
    async getOne(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`SELECT * FROM libros WHERE id=(?)`, [libro.id]);
            // Verificar si se encontró algún resultado
            if (result.length === 0) {
                res.status(404).json({ error: 'El libro con el ID proporcionado no existe.' });
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud', errorCode: error.code });
        }
    }
    
    async getAll(req, res){
        //con el [] en result limitamos a que solo nos muestre la primer lista dentro del JSON y así evitamos traer la información del buffer
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            if (result.length === 0) {
                res.status(404).json({ error: 'No se encontraron libros en la base de datos.' });
            } else {
                res.json(result);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud', errorCode: error.code });
        }
    }

    async add(req, res){
        try {
            const libro = req.body;
            const [result] = await pool.query(`INSERT INTO libros(name, author, category, publication_date, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.name, libro.author, libro.category, libro.publication_date, libro.isbn]);
            res.json({"Id insertado": result.insertId});
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al agregar el libro', errorCode: error.code });
        }
    }

    async update(req, res){
        try {
            const libro = req.body;
            const[result] = await pool.query(`UPDATE libros SET name=(?), author=(?), category=(?), publication_date=(?), isbn=(?) WHERE id=(?)`, [libro.name, libro.author, libro.category, libro.publication_date, libro.isbn, libro.id]);
            // Verificar si se realizaron cambios en registros
            if (result.changedRows === 0) {
                res.status(404).json({ error: 'El libro con el ID proporcionado no existe o no se realizaron cambios.' });
            } else {
                res.json({ "Registros actualizados": result.changedRows });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al actualizar el libro', errorCode: error.code });
        }
    }

    async deleteId(req, res){
        try {
            const libro = req.body;
            const[result] = await pool.query(`DELETE FROM libros WHERE id=(?)`, [libro.id]);
            // Verificar si se eliminaron registros
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'El libro con el ID proporcionado no existe o no se eliminaron registros.' });
            } else {
                res.json({ "Registros eliminados": result.affectedRows });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el libro por ID', errorCode: error.code });
        }
    }

    async deleteIsbn(req, res){
        try {
            const libro = req.body;
            const[result] = await pool.query(`DELETE FROM libros WHERE isbn=(?)`, [libro.isbn]);
            // Verificar si se eliminaron registros
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'No se encontraron libros con el ISBN proporcionado o no se eliminaron registros.' });
            } else {
                res.json({ "Registros eliminados": result.affectedRows });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Ocurrió un error al eliminar el libro por ISBN', errorCode: error.code });
        }
    }
}

export const libro = new LibroController();