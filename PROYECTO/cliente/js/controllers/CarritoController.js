import { Carrito } from "../models/Carrito.js";
import { CarritoView } from "../views/carritoView.js";
import { Persona } from "../models/Personas.js";

export class CarritoController {
  static initCarrito() {
    const nombreUsuario = Persona.obtenerNombre();
    if (!nombreUsuario) {
      window.location.href = "bienvenida.html";
      return;
    }

    const carrito = Carrito.crearDesdeLocalStorage(nombreUsuario);
    const vista = new CarritoView(carrito, () => {
      vista.mostrarCarrito();
    });

    vista.mostrarCarrito();
  }
  static conseguirCarrito(){
        const nombreUsuario = Persona.obtenerNombre();
        const carrito = Carrito.crearDesdeLocalStorage(nombreUsuario);
    return carrito
  }
}
