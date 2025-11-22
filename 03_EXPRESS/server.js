import app from "./servidor/src/app/app.js";
import { sequelize } from "./servidor/src/database/db.js";
import { crearAdmin } from "./servidor/src/utils/funciones.js"; 

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a MySQL OK");

    await sequelize.sync();

    console.log("Tablas sincronizadas");

    await crearAdmin();

    app.listen(port, () => {
      console.log(`Servidor en http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Error al iniciar servidor:", error);
  }
}

startServer();
