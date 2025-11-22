import { inicializarModoOscuro } from "./utils/theme.js";
import { ProductosController } from "./controllers/ProductosController.js";
import { CarritoController } from "./controllers/CarritoController.js";
import { PersonaController } from "./controllers/PersonaController.js";
import { ticketController } from "./controllers/TicketController.js";
import { ConfiguradorNavegacion } from "./config/configuracionNavegacion.js";

function inicializarModulos() {

    if (document.querySelector("#productos")) {
        ProductosController.initProductos();
    }

    if (document.querySelector(".carrito")) {
        CarritoController.initCarrito();
    }

    if (document.querySelector("form") && document.querySelector("#fNombre")) {
        PersonaController.init();
    }

    if (document.querySelector("#principalTicket")) {
        ticketController.initTicket();
    }
}

function verificarSesion() {
    // si estoy en bienvenida.html no hace falta validar sesión
    if (window.location.pathname.includes("bienvenida.html")) {
        return true;
    }

    return PersonaController.verificarSesion();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();

    if (verificarSesion()) {
        inicializarModulos();
    }

    ConfiguradorNavegacion.configurar();
});
