import { CarritoController} from "../controllers/CarritoController.js";
import { Ticket } from "../models/Ticket.js";
import { ticketView } from "../views/ticketView.js";
import { Persona } from "../models/Personas.js";
import { guardarTicketBD } from "../api/ventasApi.js"
import { convertirHtmlPdf } from "../utils/pdf.js"; 

export class ticketController {
    
  static async initTicket() {
    let carrito = CarritoController.conseguirCarrito();

    const ticket = Ticket.generar(carrito);
    ticketView.mostrarticket(ticket);
    ticket.guardar();
    
    await guardarTicketBD(ticket);
    
    let btnDescargar = document.getElementById("btnConfirmar");
    btnDescargar.addEventListener("click",() => convertirHtmlPdf("idPdf"));

    let btnSalir = document.getElementById("btnSalir");
    btnSalir.addEventListener("click", () => {
      window.location.href = "./bienvenida.html";
      carrito.vaciar();
      Persona.borrarNombre();
    });
  }
}
