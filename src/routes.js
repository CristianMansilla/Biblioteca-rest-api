import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get('/libro', libro.getOne);
router.get('/libros', libro.getAll);
router.post('/agregar-libro', libro.add);
router.put('/editar-libro', libro.update);
router.delete('/eliminar-libro', libro.delete);

