import express from "express";
import morgan from "morgan";
import { router } from "./routes.js";

const app = express();

app.set('port', 3000);

app.use(morgan('dev'));

//Interpreta los objetos JSON de las solicitudes que se van enviando
app.use(express.json());

app.use(router);

//Levantamos el servicio
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})