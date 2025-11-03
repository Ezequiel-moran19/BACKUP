import { TablaProductosView } from "../views/dashboardView.js";
import { obtenerProductos } from "../api.js";

export class TablaProductosController {
    static async init() {
        const productos = await obtenerProductos();
        const vista = new TablaProductosView(productos, {
            //Aca tengo que desarrollar la logica para el crud
        });

        vista.render("productos");
    }
}