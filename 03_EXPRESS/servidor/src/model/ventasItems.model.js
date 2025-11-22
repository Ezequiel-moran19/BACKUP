import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.js"
import { Venta } from "./ventas.model.js";
import { Producto } from "./producto.model.js";

export const VentaItem = sequelize.define("VentaItem", {
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL(10, 2),
    subtotal: DataTypes.DECIMAL(10, 2)
}, {
    tableName: "venta_items",
    timestamps: false
});


Venta.hasMany(VentaItem, { foreignKey: "VentaId" });
VentaItem.belongsTo(Venta, { foreignKey: "VentaId" });

VentaItem.belongsTo(Producto, { foreignKey: "ProductoId" });
Producto.hasMany(VentaItem, { foreignKey: "ProductoId" });
