import { Persona } from "../models/Personas.js";
import { PersonaView } from "../views/personaView.js";

export class PersonaController {
    static init() {
        const view = new PersonaView("form", "#fNombre", "#saludo");
        const nombreGuardado = Persona.obtenerNombre();
        const esPaginaBienvenida = window.location.pathname.includes("bienvenida.html");

        if (nombreGuardado && esPaginaBienvenida) {
            window.location.href = "/pages/productos.html";
            return;
        }

        if (!nombreGuardado && !esPaginaBienvenida) {
            window.location.href = "/pages/bienvenida.html";
            return;
        }

        if (nombreGuardado) {
            view.mostrarSaludo(nombreGuardado);
            view.ocultarFormulario();
        } else {
            view.escucharSubmit((nombre) => {
                if (!Persona.validar(nombre)) {
                    view.mostrarAlerta("Por favor, ingrese su nombre");
                    return;
                }

                Persona.guardarNombre(nombre);
                view.mostrarSaludo(nombre);
                view.ocultarFormulario();
                setTimeout(() => {
                    window.location.href = "/pages/productos.html";
                }, 500);
            });
        }
    }

    static cerrarSesion() {
        const nombreUsuario = Persona.obtenerNombre();
        Persona.borrarNombre();

        if (nombreUsuario) sessionStorage.removeItem(`Carrito_${nombreUsuario}`);
        sessionStorage.removeItem("carrito");

        window.location.href = "/pages/bienvenida.html";
    }

    static verificarSesion() {
        if (!Persona.obtenerNombre()) {
            window.location.href = "/pages/bienvenida.html";
            return false;
        }
        return true;
    }
}