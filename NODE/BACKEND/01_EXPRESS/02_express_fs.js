import express from 'express';
import { resolve } from 'path';

const app = express();
app.use(express.json());

// Ruta para enviar un archivo HTML como respuesta 
app.get('/', (req, res) => {
    res.sendFile(resolve('./index.html'));//Servir documento statico
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});
