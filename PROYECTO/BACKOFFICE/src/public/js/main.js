import { inicializarModoOscuro } from "./theme.js";
import { ProductosController } from "./controllers/ProductosController.js";

function inicializarModulos() {
    const modulos = [
        { selector: "#productos", inicializador: () => ProductosController.initProductos() },
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

function init() {
    console.log("Iniciando aplicación...");
    console.log("Página actual:", window.location.pathname);
    console.log("Usuario:", localStorage.getItem("nombreUsuario"));
    
    inicializarModulos();
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarModoOscuro();
    init();
});
