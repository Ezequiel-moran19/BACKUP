export class Persona {
    constructor(idPersona, nombre) {
        this.idPersona = idPersona;
        this.nombre = nombre;
    }

    static guardarNombre(nombre) {
        localStorage.setItem("nombreUsuario", nombre);
    }

    static obtenerNombre() {
        return localStorage.getItem("nombreUsuario");
    }

    static borrarNombre() {
        localStorage.removeItem("nombreUsuario");
    }

    static validar(nombre) {
        return nombre.trim() !== "";
    }
}