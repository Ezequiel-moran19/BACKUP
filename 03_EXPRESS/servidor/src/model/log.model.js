// servidor/src/model/log.model.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Log = sequelize.define("Log", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  adminNombre: { type: DataTypes.STRING, allowNull: false },
  fecha: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  adminId: { type: DataTypes.INTEGER, allowNull: false } // 👈 importante
}, {
  tableName: "logs",
  timestamps: false
});
