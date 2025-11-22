import { PersonaController } from "./controllers/PersonaController.js";
export class ConfiguradorNavegacion {

    static configurarBotonInicio() {
        const btn = document.querySelector("#btn-inicio");
        if (!btn) return;

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const nombreUsuario = Persona.obtenerNombre();
            window.location.href = nombreUsuario ? "productos.html" : "bienvenida.html";
        });
    }

    static configurarBotonCerrarSesion() {
        const btn = document.querySelector("#btn-cerrar-sesion");
        if (!btn) return;

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            PersonaController.cerrarSesion();
        });
    }
}
