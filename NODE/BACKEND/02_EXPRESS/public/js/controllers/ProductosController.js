import { ProductosView } from "../views/productosView.js";
import { productos } from "../api.js";
import { Persona } from "../models/Personas.js";
import { Carrito } from "../models/Carrito.js";

export class ProductosController {
    static paginaActual = 1;
    static productosPorPagina = 6;
    static contenedor = null;
    static categoriaFiltrada = null;
    static carrito = null;

    static initProductos() {
        const nombreUsuario = Persona.obtenerNombre();
        if (!nombreUsuario) {
            window.location.href = "bienvenida.html";
            return;
        }

        this.carrito = Carrito.crearDesdeLocalStorage(nombreUsuario);
        this.contenedor = document.getElementById("productos");

        this.mostrarPagina();
        this.configurarFiltros();
        this.configurarPaginacion();
        this.configurarEventosAgregar();
    }

    static configurarFiltros() {
        const configurarFiltro = (id, categoria) => {
            const boton = document.getElementById(id);
            if (boton) boton.addEventListener("click", () => this.filtrarPorCategoria(categoria));
        };

        configurarFiltro("filtro-guitarra", "Guitarra");
        configurarFiltro("filtro-pianos", "Piano");
    }

    static configurarPaginacion() {
        const configurarBoton = (id, accion) => {
            const boton = document.getElementById(id);
            if (boton) boton.addEventListener("click", () => this[accion]());
        };

        configurarBoton("siguiente", "paginaSiguiente");
        configurarBoton("anterior", "paginaAnterior");
    }

    static manejarAgregarProducto(card, producto) {
        const btnAgregar = card.querySelector(".btnAgregar");
        btnAgregar.style.display = "none";

        const agregado = this.carrito.agregar(producto);

        if (agregado) {
            const contenedorExistente = card.querySelector("div.mt-2");
            if (contenedorExistente) contenedorExistente.remove();

            const contenedorBotones = ProductosView.crearContenedorBotones();
            card.querySelector(".card-body").appendChild(contenedorBotones);

            ProductosView.agregarEventosCard(card, producto, this.carrito);
        } else {
            alert(`⚠️ No hay más stock disponible (${producto.stock})`);
            btnAgregar.style.display = "block";
        }
    }

    static configurarEventosAgregar() {
        this.contenedor.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            if (!card) return;

            const nombre = card.querySelector(".card-title").textContent.replace("Nombre: ", "");
            const producto = productos.find(p => p.nombre === nombre);
            if (!producto) return;

            e.preventDefault();

            if (e.target.classList.contains("btnAgregar")) {
                this.manejarAgregarProducto(card, producto);
            }
        });
    }

    static obtenerListaActual() {
        return this.categoriaFiltrada || productos;
    }

    static mostrarPagina() {
        const inicio = (this.paginaActual - 1) * this.productosPorPagina;
        const fin = inicio + this.productosPorPagina;
        const lista = this.obtenerListaActual().slice(inicio, fin);
        
        ProductosView.mostrarProducto(this.contenedor, lista, this.carrito);
        this.actualizarIndicadorPaginas();
    }

    static mostrarTodos() {
        this.categoriaFiltrada = null;
        this.paginaActual = 1;
        this.mostrarPagina();
    }

    static paginaAnterior() {
        if (this.paginaActual > 1) {
            this.paginaActual--;
            this.mostrarPagina();
        }
    }
    static paginaSiguiente() {
        if (this.paginaActual < this.obtenerTotalPaginas()) {
            this.paginaActual++;
            this.mostrarPagina();
        }
    }

    static obtenerTotalPaginas() {
        return Math.ceil(this.obtenerListaActual().length / this.productosPorPagina);
    }

    static filtrarPorCategoria(categoria) {
        this.categoriaFiltrada = productos.filter(p => p.categoria === categoria);
        this.paginaActual = 1;
        this.mostrarPagina();
    }

    static actualizarIndicadorPaginas() {
        const totalPaginas = this.obtenerTotalPaginas();
        const actual = document.getElementById("pagina-actual");
        const total = document.getElementById("total-paginas");
        
        if (actual && total) {
            actual.textContent = this.paginaActual;
            total.textContent = totalPaginas;
        }
    }
}