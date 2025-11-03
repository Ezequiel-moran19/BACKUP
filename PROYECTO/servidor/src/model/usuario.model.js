import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Admin = sequelize.define("Admin", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    pass: { type: DataTypes.STRING, allowNull: false } // aquí va la contraseña encriptada
});
