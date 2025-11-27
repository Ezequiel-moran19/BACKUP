import { Router } from "express";
import ProductoController from "../controllers/producto.controller.js";
import VentaController from "../controllers/venta.controller.js";
import { verificarAdmin } from "../utils/middelwareJWT.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "servidor/src/uploads" });

// LISTAR
router.get("/productos", ProductoController.listar);
router.get("/productos/buscar", ProductoController.buscar);

// OBTENER UNO
router.get("/productos/:id", verificarAdmin, ProductoController.obtenerUno);

// CREAR
router.post("/productos", verificarAdmin, upload.single("imgProductos"), ProductoController.crear);

// ACTUALIZAR
router.post("/productos/:id", verificarAdmin, upload.single("imgProductos"), ProductoController.actualizar);

// ELIMINAR Y ESTADO
router.delete("/productos/:id", verificarAdmin, ProductoController.desactivar);
router.patch("/productos/:id", verificarAdmin, ProductoController.cambiarEstado);

// VENTAS
router.post("/ventas", VentaController.crear);

export default router;