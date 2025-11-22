export class Ticket {
    constructor(id, fecha, nombreCliente, productos, total) {
        this.id = id;
        this.fecha = fecha;
        this.nombreCliente = nombreCliente;
        this.productos = productos;
        this.total = total;
    }

    static generar(carrito) {
        const f = new Date();
        const fechaFormateada = `${f.toLocaleDateString("es-AR")} ${f.getHours().toString().padStart(2, "0")}:${f.getMinutes().toString().padStart(2, "0")}`;

        return new Ticket(
            Date.now(),
            fechaFormateada,
            carrito.nombreUsuario,
            [...carrito.items],
            carrito.calcularTotal()
        );
    }

    guardar() {
        const tickets = Ticket.obtenerTodos();
        tickets.push(this);
        localStorage.setItem("tickets", JSON.stringify(tickets));
        localStorage.setItem("ultimoTicket", this.id);
    }

    static obtenerTodos() {
        return JSON.parse(localStorage.getItem("tickets")) || [];
    }
}
