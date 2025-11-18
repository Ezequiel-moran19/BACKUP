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
//Motor de vistas
app.set("view engine", "ejs");

// Servir frontend archivos estaticos
app.use(express.static(path.join(process.cwd(), "cliente")));
app.use("/js", express.static(path.join(process.cwd(), "cliente/js")));
app.use("/uploads", express.static(path.join(process.cwd(), "servidor/src/uploads")));
app.set("views", path.join(process.cwd(), "servidor/src/views"));
app.use("/admin/public", express.static(path.join(process.cwd(), "servidor/src/public")));
// Rutas API
app.use("/api", productosRouter);

// Rutas Admin
app.use("/admin", adminRouter);

// Lo puse para que tome la url que no sea API ni uploads
app.get(/^(?!\/api|\/uploads|\/admin|\/js).*/, (req, res) => {
  res.sendFile(path.join(process.cwd(), "cliente/pages", "bienvenida.html"));
});

export default app;
