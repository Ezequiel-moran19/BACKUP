import express from "express";
const router = express.Router();

// Redirige al login
router.get("/", (req, res) => res.redirect("/login"));

// Renderiza el login
router.get("/login", (req, res) => res.render("login"));

// Validación login
router.post("/login", (req, res) => {
  const { nombre, pass } = req.body;
  if (nombre === "admin" && pass === "1234")
    return res.redirect("/dashboard");
  res.send("Usuario o contraseña incorrecta ❌");
});

// Dashboard
router.get("/dashboard", (req, res) => res.render("dashboard"));

export default router;
