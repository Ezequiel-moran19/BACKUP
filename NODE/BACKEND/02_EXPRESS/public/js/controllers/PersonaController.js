import { Persona } from "../models/Personas.js";
import { PersonaView } from "../views/personaView.js";

export class PersonaController {
    static init() {
        const view = new PersonaView("form", "#fNombre", "#saludo");
        const nombreGuardado = Persona.obtenerNombre();
        const esPaginaBienvenida = window.location.pathname.includes("bienvenida");

        if (nombreGuardado && esPaginaBienvenida) {
            window.location.href = "productos.html";
            return;
        }

        if (!nombreGuardado && !esPaginaBienvenida) {
            window.location.href = "bienvenida";
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
                    window.location.href = "productos.html";
                }, 1000);
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
        window.location.href = "bienvenida";
    }

    static verificarSesion() {
        const nombreUsuario = Persona.obtenerNombre();
        const esPaginaBienvenida = window.location.pathname.includes("bienvenida");

        if (!nombreUsuario && !esPaginaBienvenida) {
            window.location.replace("bienvenida");
            return false;
        }

        return true;
}

}