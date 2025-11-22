import { Admin } from "./admin.model.js";
import { Log } from "./log.model.js";

Admin.hasMany(Log, { foreignKey: "adminId" }); // Apunte para un admin tiene muchos logs
Log.belongsTo(Admin, { foreignKey: "adminId" }); // cada log pertenece a un admin