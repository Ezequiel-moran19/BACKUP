import { Router } from "express";
import { Producto } from "../model/producto.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = Router();
const upload = multer({ dest: "servidor/src/uploads" });

// Función común para tomar datos del body
function obtenerDatosProducto(req, rutaImg = null) {
  const { nombre, descripcion, precio, categoria, activo, stock } = req.body;

  return {
    nombre,
    descripcion,
    precio,
    categoria,
    activo: activo ?? true,
    stock: stock ?? 0,
    rutaImg,
  };
}

// Función única para guardar imagen
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

// CREAR 
router.post("/productos", upload.single("imgProductos"), async (req, res) => {
  try {
    const rutaImg = guardarImagen(req.file); // si no hay archivo, devuelve null
    const data = obtenerDatosProducto(req, rutaImg);
    const producto = await Producto.create(data);
    res.status(201).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
});

// ACTUALIZAR
router.put("/productos/:id", upload.single("imgProductos"), async (req, res) => {
  try {
    const rutaImg = guardarImagen(req.file);
    const data = obtenerDatosProducto(req, rutaImg);
    await Producto.update(data, { where: { id: req.params.id } });
    res.json({ message: "Producto actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
});

// ELIMINAR
router.delete("/productos/:id", async (req, res) => {
  await Producto.destroy({ where: { id: req.params.id } });
  res.json({ message: "Producto eliminado" });
});

export default router;
