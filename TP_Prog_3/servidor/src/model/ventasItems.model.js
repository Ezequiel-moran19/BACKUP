import { DataTypes } from "sequelize"
import { sequelize } from "../database/db.js"

export const VentaItem = sequelize.define("VentaItem", {
    cantidad: DataTypes.INTEGER,
    precio: DataTypes.DECIMAL(10, 2),
    subtotal: DataTypes.DECIMAL(10, 2)
}, {
    tableName: "venta_items",
    timestamps: false
});

