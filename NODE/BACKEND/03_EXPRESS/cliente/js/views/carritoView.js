export class CarritoView {
    constructor(carrito, confirmarCallback) {
        this.carrito = carrito;
        this.items = carrito.items;
        this.confirmarCallback = confirmarCallback;
        this.resumenContainer = null;
    }

    static crearElemento(tag, className, innerHTML = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;
    }

    mostrarCarrito() {
        const contenedor = document.getElementById("carrito");
        if (!contenedor) return;

        contenedor.innerHTML = "";
        
        this.limpiarResumen();

        if (!this.items.length) {
            contenedor.innerHTML = `<div class="alert alert-info text-center">Tu carrito está vacío </div>`;
        } else {
            contenedor.innerHTML = this.items.map((item, i) => this.generarCardItem(item, i)).join('');
            this.mostrarResumen();
            this.asignarEventos();
        }
        
        this.actualizarContador();
    }

    limpiarResumen() {
        const resumenDiv = document.getElementById("resumen");
        if (resumenDiv) resumenDiv.innerHTML = "";
        this.resumenContainer = null;
    }
    generarCardItem(item, index) {
        return `
            <div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm" data-item-id="${item.id}">
                <img src="http://localhost:3000${item.rutaImg}" alt="${item.nombre}" 
                    class="rounded object-fit-cover" style="width: 100px; height: 100px;">

                <div class="flex-grow-1">
                    <h5 class="fw-semibold mb-1">${item.nombre}</h5>
                    <p class="text-muted mb-2 descripcion">${item.descripcion || "Sin descripción"}</p>
                    <p class="fw-bold text-danger mb-0">$${item.precio}</p>
                    <p class="text-sm text-danger mb-0">Stock: ${item.stock}</p>
                </div>

                <div class="d-flex flex-column align-items-end gap-2">
                    <button class="btn btn-outline-danger btn-sm btn-eliminar" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>

                    <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-outline-secondary btn-sm restar menos" data-index="${index}">-</button>
                        <span class="fw-semibold cantidad" data-index="${index}">${item.cantidad}</span>
                        <button class="btn btn-outline-secondary btn-sm sumar mas" data-index="${index}">+</button>
                    </div>

                    <p class="fw-semibold text-sm mb-0 subtotal" data-index="${index}">Subtotal: $${item.subtotal}</p>
                </div>
            </div>`;
    }

    mostrarResumen() {
        const subtotal = this.carrito.calcularTotal();
        
        this.resumenContainer = CarritoView.crearElemento('div', 'p-3 bg-light rounded shadow-sm');
        this.resumenContainer.innerHTML = this.generarResumenHTML(subtotal);
        
        const resumenDiv = document.getElementById("resumen");
        if (resumenDiv) {
            resumenDiv.innerHTML = ""; 
            resumenDiv.appendChild(this.resumenContainer);
        }

        document.getElementById("finalizarCompra").addEventListener("click", () => {
            if (this.confirmarCallback) this.confirmarCallback();
            window.location.href = "./ticket.html"
        });
}

    generarResumenHTML(subtotal) {
        return `
            <div class="p-3 bg-light rounded">
                <h4 class="fw-bold mb-3">Resumen</h4>
                <div class="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <span class="resumen-subtotal">$${subtotal.toFixed(2)}</span>
                </div>
                <div class="d-flex justify-content-between fw-bold fs-5 text-danger">
                    <span>Total</span>
                    <span class="resumen-total">$${subtotal.toFixed(2)}</span>
                </div>
                <div class="mt-3">
                    <button class="btn btn-danger w-100 mb-2" id="finalizarCompra">Finalizar Compra</button>
                    <a href="./productos.html" class="btn btn-outline-secondary w-100">Seguir comprando</a>
                </div>
            </div>`;
    }

    asignarEventos() {
        this.configurarEventosBoton(".restar", (index) => this.cambiarCantidad(index, -1));
        this.configurarEventosBoton(".sumar", (index) => this.cambiarCantidad(index, 1));
        this.configurarEventosBoton(".btn-eliminar", (index) => this.eliminarItem(index));
    }

    configurarEventosBoton(selector, handler) {
        const contenedor = document.getElementById("carrito");
        if (!contenedor) return;

        contenedor.addEventListener("click", (e) => {
            const target = e.target;
            if (target.matches(selector) || target.closest(selector)) {
                const elemento = target.matches(selector) ? target : target.closest(selector);
                const index = elemento.dataset.index;
                if (index !== undefined) {
                    e.preventDefault();
                    handler(index);
                }
            }
        });
    }
    eliminarItem(index) {
        this.carrito.eliminar(index);
        this.items = this.carrito.items;
        this.mostrarCarrito(); 
    }

    cambiarCantidad(index, delta) {
        const item = this.carrito.items[index];
        if (!item) return;

        if (delta > 0 && item.cantidad >= item.stock) {
            alert(`No hay más stock disponible (${item.stock})`);
            return;
        }

        item.cantidad += delta;
        
        if (item.cantidad <= 0) {
            this.carrito.eliminar(index);
            this.items = this.carrito.items;
            this.mostrarCarrito();
        } else {
            item.subtotal = item.cantidad * item.precio;
            this.carrito.guardar();
            this.actualizarVistaParcial(index); 
        }
    }

    actualizarVistaParcial(index) {
        const item = this.carrito.items[index];
        if (!item) return;

        const cantidadElement = document.querySelector(`.cantidad[data-index="${index}"]`);
        if (cantidadElement) {
            cantidadElement.textContent = item.cantidad;
        }

        const subtotalElement = document.querySelector(`.subtotal[data-index="${index}"]`);
        if (subtotalElement) {
            subtotalElement.textContent = `Subtotal: $${item.subtotal}`;
        }

        this.actualizarResumen();
        this.actualizarContador();
    }

    actualizarResumen() {
        if (!this.resumenContainer) return;
        
        const subtotal = this.carrito.calcularTotal();
        const subtotalElement = this.resumenContainer.querySelector('.resumen-subtotal');
        const totalElement = this.resumenContainer.querySelector('.resumen-total');
        
        if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        if (totalElement) totalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    actualizarContador() {
        const cont = document.getElementById("contador_carrito");
        if (!cont) return;

        const cantidad = this.items.length;
        const total = this.carrito.calcularTotal();

        cont.className = "alert alert-secondary mt-3 text-center";
        cont.textContent = cantidad
            ? `🛒 ${cantidad} producto(s) - Total: $${total}`
            : "🛒 Carrito vacío (0 productos)";
    }
}