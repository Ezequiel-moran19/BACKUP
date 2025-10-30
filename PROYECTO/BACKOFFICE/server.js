import express from "express";
import path from "path";

const app = express();
const PORT = 8081;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Carpeta de vistas
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// Archivos estáticos (css, js, img)
app.use(express.static(path.resolve("src/public")));

// Rutas
app.get("/login", (req, res) => res.render("login"));

app.post("/login", (req, res) => {
  const { nombre, pass } = req.body;
  if (nombre === "admin" && pass === "1234") return res.redirect("/dashboard");
  res.send("Usuario o contraseña incorrecta ❌");
});

app.get("/dashboard", (req, res) => res.render("dashboard"));

app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
