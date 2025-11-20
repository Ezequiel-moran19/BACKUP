import { Router } from "express";
import { Producto } from "../model/producto.model.js";
import { Admin } from "../model/admin.model.js";
import { Log } from "../model/log.model.js"
import { verificarAdmin } from "../utils/middelwareJWT.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminRouter = Router();

adminRouter.get("/login", (req, res) => {
  res.render("login");
});

adminRouter.get("/dashboard", verificarAdmin,(req, res) => {
  res.render("dashboard");
});

adminRouter.get("/alta-producto", verificarAdmin,(req, res) => {
  res.render("altaProducto");
});

adminRouter.get("/editar-producto/:id", verificarAdmin, async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.render("editarProducto", { producto });
});

adminRouter.post("/login", async (req, res) => {
  const { nombre, pass } = req.body;

  try {
    // 1) Busco el usuario admin en DB
    const admin = await Admin.findOne({ where: { nombre } })
    if (!admin) {
      return res.render('login', console.log("Usuario no encontrado.. "))
    }
    // 2) Comparo contraseña ingresada con la hash guardado
    const contraseña = await bcrypt.compare( pass, admin.pass)
    if (!contraseña) {
      return res.render("login", { error: "Contraseña incorrecta" });
    }
    // 3) Crear JWT (aquí ocurre la "firma" digital)
    // jwt.sign(payload, claveSecreta, configuraciones)
    const token = jwt.sign(
      { id: admin.id, nombre: admin.nombre }, // datos visibles en el token
        process.env.JWT_SECRET, // ESTA ES LA CLAVE QUE FIRMA EL TOKEN
      { expiresIn: "20m" } // el token expira en 1 horas
    )
    // 4) Guardar la cookie httpOnly → No es accesible desde JS del navegador
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 20 * 60 * 1000 // 1 hora
    });

    await Log.create({ adminNombre: admin.nombre, adminId: admin.id });

    console.log(`Admin ${admin.nombre} inició sesión correctamente`);
    return res.redirect("/admin/dashboard");
    
  } catch (err) {
    console.error("Error en login:", err);
    res.render("login", { error: "Error al iniciar sesión" });
  }
  // return res.redirect("/pages/bienvenida.html");
});
 
adminRouter.get("/logout", (req, res) => {
  res.clearCookie("token");   // elimina el JWT
  return res.redirect("/admin/login");
});

export default adminRouter;