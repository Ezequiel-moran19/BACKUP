import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Producto = sequelize.define("Producto", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: { type: DataTypes.STRING, allowNull: false }, 
    descripcion: { type: DataTypes.STRING, allowNull: true },
    precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    rutaImg: { type: DataTypes.STRING, allowNull: true },
    categoria: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.BOOLEAN, defaultValue: true },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
    tableName: "productos",
    timestamps: false
});


//multer para subir imagenes

// async function conectarBD() {
//     try {
//         await sequelize.authenticate();
//         console.log("Conexion exitosa a la base de datos");
//     } catch (error) {
//         console.error("No se pudo conectar a la base de datos:", error);
//     }
// }

// conectarBD();