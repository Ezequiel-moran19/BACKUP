import { ProductoService } from "../services/producto.service.js";
import { FileService } from "../services/file.service.js";

export class ProductoController {
  static async listar(req, res) {
    try {
      const productos = await ProductoService.listarProductos();
      
      res.json({
        message: "Lista de productos",
        status: 200,
        body: productos
      });
    } catch (error) {
      console.error("Error en ProductoController.listar:", error);
      res.status(500).json({ error: "Error al listar productos" });
    }
  }

  static async buscar(req, res) {
    try {
      const { q } = req.query;
      const productos = await ProductoService.buscarProductos(q);
      
      res.json({
        message: "Resultados",
        status: 200,
        body: productos
      });
    } catch (error) {
      console.error("Error en ProductoController.buscar:", error);
      res.status(500).json({ error: "Error en la búsqueda" });
    }
  }

  static async obtenerUno(req, res) {
    try {
      const producto = await ProductoService.obtenerProducto(req.params.id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error) {
      console.error("Error en ProductoController.obtenerUno:", error);
      res.status(404).json({ error: "Producto no encontrado" });
    }
  }

  static async crear(req, res) {
    try {
      const rutaImg = FileService.guardarImagen(req.file);
      const datos = ProductoController.obtenerDatosDelBody(req, rutaImg);
      
      await ProductoService.crearProducto(datos);
      return res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error en ProductoController.crear:", error);
      return res.status(500).send("Error al crear producto");
    }
  }

  static async actualizar(req, res) {
    try {
      const producto = await ProductoService.obtenerProducto(req.params.id);
      if (!producto) return res.status(404).send("Producto no encontrado");

      const rutaImg = FileService.guardarImagen(req.file) ?? producto.rutaImg;
      const datos = ProductoController.obtenerDatosActualizacion(req, producto, rutaImg);
      
      await ProductoService.actualizarProducto(req.params.id, datos);
      return res.redirect("/admin/dashboard");
    } catch (error) {
      console.error("Error en ProductoController.actualizar:", error);
      res.status(500).send("Error al actualizar producto");
    }
  }

  static async desactivar(req, res) {
    try {
      const { id } = req.params;
      await ProductoService.desactivarProducto(id);
      res.json({ ok: true, msg: "Producto desactivado" });
    } catch (error) {
      console.error("Error en ProductoController.desactivar:", error);
      res.status(500).json({ ok: false, msg: "Error al desactivar producto" });
    }
  }

  static async cambiarEstado(req, res) {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      
      await ProductoService.cambiarEstado(id, estado);
      return res.json({ ok: true, msg: "Estado actualizado", estado });
    } catch (error) {
      console.error("Error en ProductoController.cambiarEstado:", error);
      return res.status(500).json({ ok: false, msg: "Error al actualizar estado" });
    }
  }

  static obtenerDatosDelBody(req, rutaImg = null) {
    const { nombre, descripcion, precio, categoria, estado, stock } = req.body;

    return {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      categoria,
      estado: estado ?? true,
      stock: stock ? parseInt(stock) : 0,
      rutaImg,
    };
  }

  static obtenerDatosActualizacion(req, producto, rutaImg) {
    return {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: parseFloat(req.body.precio),
      categoria: req.body.categoria,
      stock: req.body.stock ? parseInt(req.body.stock) : producto.stock,
      estado: producto.estado, 
      rutaImg,
    };
  }
}

export default ProductoController;