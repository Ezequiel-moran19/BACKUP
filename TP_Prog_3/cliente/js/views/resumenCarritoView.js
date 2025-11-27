export class ResumenCarritoView {

    constructor(contenedor, carrito, confirmarCallback) {
        this.contenedor = contenedor; // div#resumen
        this.carrito = carrito;
        this.confirmarCallback = confirmarCallback;
        this.elemento = this.contenedor; // Con esta referencia apunto al mismo div en HTML
    }
    // RENDER PRINCIPAL
    render() {
        this.asignarEventos();
        this.actualizar();
    }

    // ASIGNAR EVENTOS
    asignarEventos() {
        const btnFinalizar = this.elemento.querySelector("#finalizarCompra");
        if (!btnFinalizar) return;

        btnFinalizar.addEventListener("click", () => {
            if (this.carrito.items.length === 0) return;

            if (this.confirmarCallback) this.confirmarCallback();
            window.location.href = "./ticket.html";
        });
    }

    // ACTUALIZAR VALORES DINÁMICOS
    actualizar() {
        if (!this.elemento) return;

        const total = this.carrito.calcularTotal();
        const formato = `$${total.toFixed(2)}`;

        this.elemento.querySelector(".resumen-subtotal").textContent = formato;
        this.elemento.querySelector(".resumen-total").textContent = formato;
    }
}
