import { Router } from "express";
import { Producto } from "../model/producto.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();
const upload = multer({ dest: "servidor/src/uploads" });

// Función común para tomar datos del body
function obtenerDatosProducto(req, rutaImg = null) {
  const { nombre, descripcion, precio, categoria, estado, stock } = req.body;

  return {
    nombre,
    descripcion,
    precio,
    categoria,
    estado: estado ?? true,
    stock: stock ?? 0,
    rutaImg,
  };
}

function guardarImagen(file) {
  if (!file) return null;
  const destino = path.join("servidor/src/uploads", file.originalname);
  fs.renameSync(file.path, destino);
  return `/uploads/${file.originalname}`;
}

// LISTAR
router.get("/productos", async (req, res) => {
  const productos = await Producto.findAll();
  res.json({
    message: "Lista de productos",
    status: 200,
    body: productos
  });
});

// OBTENER UNO
router.get("/productos/:id", async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  res.json(producto);
});

// CREAR Utilice el mid de Multer que me trae el dato del archico 
router.post("/productos", upload.single("imgProductos"), async (req, res) => {
  try {
    const rutaImg = guardarImagen(req.file);
    const data = obtenerDatosProducto(req, rutaImg);

    await Producto.create(data);

    return res.redirect("/admin/dashboard");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al crear producto");
  }
});

// ACTUALIZAR
router.post("/productos/:id", upload.single("imgProductos"), async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).send("Producto no encontrado");

    const rutaImg = guardarImagen(req.file) ?? producto.rutaImg;
    
    const data = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoria: req.body.categoria,
      stock: req.body.stock,
      estado: producto.estado, 
      rutaImg,
    };

    await producto.update(data);
    return res.redirect("/admin/dashboard");

  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar producto");
  }
});

// Baja lógica 
router.delete("/productos/:id", async (req, res) => {
  const { id } = req.params;
  await Producto.update({ estado: false }, { where: { id } });
  res.json({ ok: true, msg: "Producto desactivado" });
});
// PATCH - Cambiar estado (activar/desactivar)
router.patch("/productos/:id", async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ ok: false, msg: "Producto no encontrado" });
    }

    await producto.update({ estado });

    return res.json({ ok: true, msg: "Estado actualizado", estado });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, msg: "Error al actualizar estado" });
  }
});

export default router;
