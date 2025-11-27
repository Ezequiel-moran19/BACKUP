// servidor/src/model/log.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Log = sequelize.define("Log", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  adminId: { type: DataTypes.INTEGER, allowNull: true },
  adminNombre: { type: DataTypes.STRING, allowNull: false },
  accion: { type: DataTypes.STRING, allowNull: false },
  detalle: { type: DataTypes.TEXT },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW } // <-- Esta línea estaba cortada
}, {
  tableName: "logs",
  timestamps: false
});