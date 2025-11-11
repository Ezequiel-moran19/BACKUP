import express from 'express';

const app = express();
app.use(express.json());
// Ruta básica
app.get('/', (req, res) => {
    //El metodo edn finaliza la respuesta (seria lo ultimo que se envia al cliente)
    res.end("<h1>Hola Mundo desde Express!</h1>");
});
// Objeto Params para trabajar con parametros
app.get('/user/:id-:name-:age', (req, res) => {
    //http://localhost:3000/user/123-Juan-30
    res.set({"content-type":"text/html; charset=utf-8"});//Con set podemos definir headers
    res.end(`
        <h1>
        ${req.params.name} tiene ${req.params.age} años y su ID es ${req.params.id}
        </h1>`);
});
// Objeto Query para trabajar con variables
app.get('/search', (req, res) => {
    //http://localhost:3000/search?name=Juan&age=30&id=123
    res.set({"content-type":"text/html; charset=utf-8"});
    // Accedemos a los query params con req.query
    res.end(`
        <h1>
        ${req.query.name}, bienvenidos a Express.js. Tu ID es ${req.query.id}, y tu edad ${req.query.age}
        </h1>`);
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto http://localhost:3000');
});
