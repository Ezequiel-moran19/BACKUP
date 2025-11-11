import { TablaProductosView } from "../views/dashboardView.js";
import { obtenerProductos, actualizarEstadoProducto } from "/js/api.js";

export class TablaProductosController {
  static async init() {
    const productos = await obtenerProductos();
    new TablaProductosView(productos, {
    toggleEstado: async (id, nuevoEstado) => {
        await actualizarEstadoProducto(id, nuevoEstado);
        this.init();
    }
    }).renderizarVista("productos");
  }
}