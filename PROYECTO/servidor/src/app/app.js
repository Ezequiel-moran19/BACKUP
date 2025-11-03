import express from "express";
import productosRouter from "../router/producto.router.js";
import adminRouter from "../router/admin.router.js";
import morgan from "morgan";
import cors from "cors";
import path from "path";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

app.get("/", (req, res) => {
    res.send("Hola Mundo");
});
// Servir frontend
app.use(express.static(path.join(process.cwd(), "cliente")));
app.use("/js", express.static(path.join(process.cwd(), "cliente/js")));
app.use("/uploads", express.static(path.join(process.cwd(), "servidor/src/uploads")));
app.set("views", path.join(process.cwd(), "servidor/src/views"));

// Rutas API
app.use("/api", productosRouter);

// Rutas Admin
app.use("/admin", adminRouter);

// Capturar TODO lo que no sea API ni uploads
app.get(/^(?!\/api|\/uploads).*/, (req, res) => {
 res.sendFile(path.join(process.cwd(), "cliente/pages", "bienvenida.html"));
});

export default app;
