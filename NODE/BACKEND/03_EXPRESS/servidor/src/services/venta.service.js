import { Venta } from "../model/ventas.model.js";
import { VentaItem } from "../model/ventasItems.model.js";
import { ProductoService } from "./producto.service.js";

export class VentaService {
  static async crearVenta(ventaData) {
    const { fecha, nombreCliente, total, productos } = ventaData;
    
    const venta = await Venta.create({ fecha, nombreCliente, total });

    for (const producto of productos) {
      await VentaItem.create({
        VentaId: venta.id,
        ProductoId: producto.id,
        cantidad: producto.cantidad,
        precio: producto.precio,
        subtotal: producto.subtotal
      });

      await ProductoService.actualizarStock(producto.id, producto.cantidad);
    }

    return venta;
  }
}