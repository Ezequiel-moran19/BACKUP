import { Router } from "express";
import { Producto } from "../model/producto.model.js";

const adminRouter = Router();

adminRouter.get("/login", (req, res) => {
  res.render("login");
});

adminRouter.post("/login", (req, res) => {
  const { nombre, pass } = req.body;
  if (nombre === "admin" && pass === "1234") {
    return res.redirect("/admin/dashboard");
  }
  return res.redirect("/pages/bienvenida.html");
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


export default adminRouter;
