export class TablaProductosView {
    constructor(productos = [], callbacks = {}) {
        this.productos = productos;
        this.callbacks = callbacks; // {editar: fn, eliminar: fn}
    }

    static crearElemento(tag, className = '', innerHTML = '') {
        const el = document.createElement(tag);
        if (className) el.className = className;
        if (innerHTML) el.innerHTML = innerHTML;
        return el;
    }

    render(contenedorId) {
        const contenedor = document.getElementById(contenedorId);
        if (!contenedor) return;

        if (!this.productos.length) {
            contenedor.innerHTML = `<div class="alert alert-info text-center">No hay productos</div>`;
        } else {
            contenedor.innerHTML = this.productos.map((p, i) => this.generarCardProducto(p, i)).join('');
        }

        this.asignarEventos();
    }

    generarCardProducto(producto, index) {
        return `
        <div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm" data-index="${index}">
            <img src="${producto.rutaImg || '#'}" alt="${producto.nombre}" class="rounded" style="width: 100px; height: 100px;">
            <div class="flex-grow-1">
                <h5>${producto.nombre}</h5>
                <p class="text-muted">${producto.descripcion || ''}</p>
                <p class="fw-bold text-danger">$${producto.precio}</p>
                <p class="text-sm text-danger">Stock: ${producto.stock}</p>
            </div>
            <div class="d-flex flex-column gap-2">
                <button class="btn btn-warning btn-editar" data-index="${index}">Editar</button>
                <button class="btn btn-danger btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
        </div>`;
    }

    asignarEventos() {
        const contenedor = document.getElementById("productos");
        if (!contenedor) return;

        contenedor.addEventListener("click", (e) => {
            const target = e.target.closest("button");
            if (!target) return;
            const index = target.dataset.index;
            if (target.classList.contains("btn-eliminar") && this.callbacks.eliminar) {
                this.callbacks.eliminar(index);
            }
            if (target.classList.contains("btn-editar") && this.callbacks.editar) {
                this.callbacks.editar(index);
            }
        });
    }
}