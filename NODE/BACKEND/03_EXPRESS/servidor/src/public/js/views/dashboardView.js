export class TablaProductosView {
  constructor(productos = [], callbacks = {}) {
    this.productos = productos;
    this.callbacks = callbacks; 
  }

  renderizarVista(contenedorId = "productos") {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    if (!this.productos.length) {
      contenedor.innerHTML = `<div class="alert alert-info text-center">No hay productos</div>`;
      return;
    }

    contenedor.innerHTML = this.productos.map(p => this.generarCardProducto(p)).join("");
    this.asignarEventos(contenedor);
  }

  generarCardProducto(producto) {
    return `
      <div class="d-flex gap-4 border rounded p-3 mb-3 align-items-center shadow-sm ${!producto.estado ? 'opacity-50' : ''}">
        <img src="${producto.rutaImg || '#'}" alt="${producto.nombre}" class="rounded" style="width:100px;height:100px;">
        
        <div class="flex-grow-1">
          <h5>${producto.nombre}</h5>
          <p class="text-muted">${producto.descripcion || ""}</p>
          <p class="fw-bold text-danger">$${producto.precio}</p>
          <p class="fw-bold">Stock: <span class="text-primary">${producto.stock}</span></p>
          
          <p class="fw-bold">
            Estado: 
            <span class="${producto.estado ? "text-success" : "text-danger"}">
              ${producto.estado ? "Activo" : "Inactivo"}
            </span>
          </p>
        </div>

        <div class="d-flex flex-column gap-2">
          <a href="/admin/editar-producto/${producto.id}" class="btn btn-warning">
            Editar
          </a>

          <button class="btn btn-secondary btn-estado" 
                  data-id="${producto.id}" 
                  data-estado="${producto.estado}">
            ${producto.estado ? "Desactivar" : "Activar"}
          </button>
        </div>
      </div>
    `;
  }

  asignarEventos(contenedor) {
    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-estado")) {
        const id = e.target.dataset.id;
        const estadoActual = e.target.dataset.estado === "true";
        
        this.callbacks.toggleEstado(id, !estadoActual);
      }
    });
  }
}
