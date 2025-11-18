import { Carrito } from "../models/Carrito.js";
import { CarritoController} from "../controllers/CarritoController.js";
import { Ticket } from "../models/Ticket.js";
import { ticketView } from "../views/ticketView.js";
import { Persona } from "../models/Personas.js";
import { guardarTicketBD } from "../api.js"

export class ticketController{
    
  static async initTicket() {
      let carrito = CarritoController.conseguirCarrito();

      const ticket = Ticket.generar(carrito);
      ticketView.motrarticket(ticket);
      ticket.guardar();
      
      await guardarTicketBD(ticket);
      
      let btnDescargar = document.getElementById("btnConfirmar")
      
      btnDescargar.addEventListener("click",()=>convertirHtmlPdf("idPdf"))
      let btnSalir = document.getElementById("btnSalir")
      btnSalir.addEventListener("click",()=>{

        window.location.href = "./bienvenida.html";
        carrito.vaciar();
        Persona.borrarNombre();
      })
   }
}

export function convertirHtmlPdf(divElement) {
  const original = document.getElementById(divElement);
  const clone = original.cloneNode(true);

  const botones = clone.querySelectorAll("button, a.btn");
  botones.forEach(b => {
    b.remove();
  });

  const titulo = clone.querySelector("#idTitulo");
  if (titulo) {
    titulo.textContent = "Resumen de Compra";
  }

  const opciones = {
    margin: [10, 10, 10, 10],
    filename: "comprobante.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
  };

  html2pdf()
    .set(opciones)
    .from(clone)
    .save();
}
