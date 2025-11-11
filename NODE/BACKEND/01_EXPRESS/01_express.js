import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.end("<h1>Hola Mundo desde Express!</h1>");
    console.log(req);
    console.log(res);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});
