import { Admin } from "./admin.model.js"; 

import { Venta } from "./ventas.model.js";
import { VentaItem } from "./ventasItems.model.js";
import { Producto } from "./producto.model.js";

Venta.hasMany(VentaItem, { foreignKey: "VentaId" });
VentaItem.belongsTo(Venta, { foreignKey: "VentaId" });

VentaItem.belongsTo(Producto, { foreignKey: "ProductoId" });
Producto.hasMany(VentaItem, { foreignKey: "ProductoId" });

// relacion M:M
Producto.belongsToMany(Venta, {
  through: VentaItem,
  foreignKey: "ProductoId",
  otherKey: "VentaId"
});

Venta.belongsToMany(Producto, {
  through: VentaItem,
  foreignKey: "VentaId",
  otherKey: "ProductoId"
});
