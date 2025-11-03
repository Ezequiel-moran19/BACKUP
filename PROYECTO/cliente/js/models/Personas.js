export class Persona {
    constructor(idPersona, nombre) {
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    static guardarNombre(nombre) {
        localStorage.setItem("nombreUsuario", nombre);
        localStorage.setItem("sesionActiva", "true");
    }

    static obtenerNombre() {
        if (localStorage.getItem("sesionActiva") !== "true") return null;
        return localStorage.getItem("nombreUsuario");
    }

    static borrarNombre() {
        localStorage.removeItem("nombreUsuario");
        localStorage.removeItem("sesionActiva");
    }

    static validar(nombre) {
        return nombre.trim() !== "";
    }
}
