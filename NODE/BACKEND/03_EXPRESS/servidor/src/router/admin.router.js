import { Router } from "express";
import { Producto } from "../model/producto.model.js";
import { Admin } from "../model/admin.model.js";
import { Log } from "../model/log.model.js"
import bcrypt from "bcrypt";

const adminRouter = Router();

adminRouter.get("/login", (req, res) => {
  res.render("login");
});

adminRouter.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

adminRouter.get("/alta-producto", (req, res) => {
  res.render("altaProducto");
});

adminRouter.get("/editar-producto/:id", async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.render("editarProducto", { producto });
});

adminRouter.post("/login", async (req, res) => {
  const { nombre, pass } = req.body;

  try {
    const admin = await Admin.findOne({ where: { nombre } })
   
    if (!admin) {
      return res.render('login', console.log("Usuario no encontrado.. "))
    }

    const contraseña = await bcrypt.compare( pass, admin.pass)
    if (!contraseña) {
      return res.render("login", { error: "Contraseña incorrecta" });
    }

   await Log.create({ adminNombre: admin.nombre, adminId: admin.id });

    console.log(`Admin ${admin.nombre} inició sesión correctamente`);
    return res.redirect("/admin/dashboard");
    
  } catch (err) {
    console.error("Error en login:", err);
    res.render("login", { error: "Error al iniciar sesión" });
  }
  return res.redirect("/pages/bienvenida.html");
});

adminRouter.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

export default adminRouter;






// adminRouter.post("/login", (req, res) => {
//   const { nombre, pass } = req.body;
//   if (nombre === "admin" && pass === "1234") {
//     return res.redirect("/admin/dashboard");
//   }
//   return res.redirect("/pages/bienvenida.html");
// });