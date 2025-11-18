import { inicializarModoOscuro } from "./theme.js";
import { ProductosController } from "./controllers/ProductosController.js";
import { CarritoController } from "./controllers/CarritoController.js";
import { PersonaController } from "./controllers/PersonaController.js";
import { Persona } from "./models/Personas.js";
import { ticketController } from "./controllers/TicketController.js";

class ConfiguradorNavegacion {
    
    static configurarBotonInicio() {
        document.querySelectorAll('a[href="./bienvenida.html"]').forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const nombreUsuario = Persona.obtenerNombre();
                window.location.href = nombreUsuario ? "productos.html" : "bienvenida.html";
            });
        });
    }

    static configurarBotonCerrarSesion() {
        document.querySelectorAll('a[href="./bienvenida.html"]').forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const nombreUsuario = Persona.obtenerNombre();
                nombreUsuario ? PersonaController.cerrarSesion() : window.location.href = "bienvenida.html";
            });
        });
    }
}

function inicializarModulos() {
    const modulos = [
        { selector: "#productos", inicializador: () => ProductosController.initProductos() },
        { selector: ".carrito", inicializador: () => CarritoController.initCarrito() },
        { selector: "form && #fNombre", inicializador: () => PersonaController.init() },
        { selector: "#principalTicket", inicializador: () => ticketController.initTicket() }
    ];

    modulos.forEach(({ selector, inicializador }) => {
        if (selector.includes("&&")) {
            const [sel1, sel2] = selector.split("&&").map(s => s.trim());
            if (document.querySelector(sel1) && document.querySelector(sel2)) {
                inicializador();
            }
        } else if (document.querySelector(selector)) {
            inicializador();
        }
    });
}

function verificarSesion() {
    const currentPage = window.location.pathname;
    if (!currentPage.includes("bienvenida.html")) {
        console.log("Verificando sesión...");
        if (!PersonaController.verificarSesion()) {
            console.log("Sesión no válida, deteniendo inicialización");
            return false;
        }
    }
    return true;
}

function init() {
    console.log("Iniciando aplicación...");
    console.log("Página actual:", window.location.pathname);
    console.log("Usuario:", localStorage.getItem("nombreUsuario"));

    if (!verificarSesion()) return;
    
    inicializarModulos();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();
    init();
    ConfiguradorNavegacion.configurarBotonInicio();
    ConfiguradorNavegacion.configurarBotonCerrarSesion();
});
