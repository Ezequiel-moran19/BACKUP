import express from 'express';
import { resolve } from 'path';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.set({"content-type":"text/html; charset=utf-8"});
    res.send("<h1>Hola Mundo desde Express con el metodo send</h1>");
});

app.get('/json', (req, res) => {
    res.json({
        name: "Eze",
        age: 34,
        city: "Buenos Aires"
    });
});

app.get('/', (req, res) => {
    res.sendFile(resolve('./index.html'));
});

app.get('/plantilla', (req, res) => {
    // Configurar el motor de plantillas
    res.render("app");
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});
