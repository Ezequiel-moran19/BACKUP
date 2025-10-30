import express from "express";
import path from "path";
import router from "./src/routers/index.js";
import { PORT } from "./src/config/puerto.js";

const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración EJS
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Archivos estáticos
app.use(express.static(path.resolve("src/public")));

// Rutas
app.use("/", router);

// El servidor ⬇⬇
app.listen(PORT, () =>
  console.log(`Servidor en http://localhost:${PORT}`)
);
