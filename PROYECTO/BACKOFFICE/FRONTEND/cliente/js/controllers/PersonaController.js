import { Persona } from "../models/Personas.js";
import { PersonaView } from "../views/personaView.js";

export class PersonaController {
    static init() {
        const view = new PersonaView("form", "#fNombre", "#saludo");
        const nombreGuardado = Persona.obtenerNombre();
        const esPaginaBienvenida = window.location.pathname.includes("bienvenida.html");

        // Redirigir si ya hay sesión
        if (nombreGuardado && esPaginaBienvenida) {
            window.location.href = "productos.html";
            return;
        }

        // Redirigir al login si no hay sesión
        if (!nombreGuardado && !esPaginaBienvenida) {
            window.location.href = "bienvenida.html";
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
                Persona.guardarNombre(nombre); // activa sesión
                view.mostrarSaludo(nombre);
                view.ocultarFormulario();
                setTimeout(() => {
                    window.location.href = "productos.html";
                }, 500); // redirigir rápido
            });
        }
    }

    static cerrarSesion() {
        const nombreUsuario = Persona.obtenerNombre();
        Persona.borrarNombre();

        if (nombreUsuario) {
            localStorage.removeItem(`Carrito_${nombreUsuario}`);
        }
        localStorage.removeItem("carrito");
        window.location.href = "bienvenida.html";
    }

    static verificarSesion() {
        const nombreUsuario = Persona.obtenerNombre();
        const esPaginaBienvenida = window.location.pathname.includes("bienvenida.html");

        if (!nombreUsuario && !esPaginaBienvenida) {
            window.location.replace("bienvenida.html");
            return false;
        }

        return true;
    }
}
