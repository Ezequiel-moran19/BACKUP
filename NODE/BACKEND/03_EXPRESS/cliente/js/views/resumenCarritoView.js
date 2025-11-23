export class ResumenCarritoView {
    constructor(contenedor, carrito, confirmarCallback) {
        this.contenedor = contenedor;
        this.carrito = carrito;
        this.confirmarCallback = confirmarCallback;
        this.elemento = null;
    }

    // FORMATEO DE DINERO
    formatear(valor) {
        return `$${valor.toFixed(2)}`;
    }

    // RENDER PRINCIPAL
    render() {
        this.crearEstructura();
        this.asignarEventos();
        this.actualizar();
    }

    // CREAR ESTRUCTURA HTML
    crearEstructura() {
        this.elemento = document.createElement("div");
        this.elemento.className = "p-3 bg-light rounded shadow-sm";
        this.elemento.innerHTML = `
            <h4 class="fw-bold mb-3">Resumen</h4>

            <div class="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span class="resumen-subtotal"></span>
            </div>

            <div class="d-flex justify-content-between fw-bold fs-5 text-danger">
                <span>Total</span>
                <span class="resumen-total"></span>
            </div>

            <div class="mt-3">
                <button class="btn btn-danger w-100 mb-2" id="finalizarCompra">
                    Finalizar Compra
                </button>

                <a href="./productos.html" class="btn btn-outline-secondary w-100">
                    Seguir comprando
                </a>
            </div>
        `;

        this.contenedor.innerHTML = "";
        this.contenedor.appendChild(this.elemento);
    }

    // ASIGNAR EVENTOS
    asignarEventos() {
        const btnFinalizar = this.elemento.querySelector("#finalizarCompra");
        if (!btnFinalizar) return;

        btnFinalizar.addEventListener("click", () => {
            if (this.confirmarCallback) this.confirmarCallback();
            window.location.href = "./ticket.html";
        });
    }

    // ACTUALIZAR VALORES DINÁMICOS
    actualizar() {
        if (!this.elemento) return;

        const total = this.carrito.calcularTotal();
        const formato = this.formatear(total);

        this.elemento.querySelector(".resumen-subtotal").textContent = formato;
        this.elemento.querySelector(".resumen-total").textContent = formato;
    }
}
