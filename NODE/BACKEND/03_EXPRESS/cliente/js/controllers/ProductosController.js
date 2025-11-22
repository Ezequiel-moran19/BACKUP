import { ProductosView } from "../views/productosView.js";
import { Persona } from "../models/Personas.js";
import { Carrito } from "../models/Carrito.js";
import { obtenerProductos } from "../api.js";
import { Paginacion } from "../paginacion.js";

export class ProductosController {

    static carrito = null;
    static productos = [];
    static contenedor = null;
    static paginacion = null;
    static categoriaFiltrada = null;

    static async initProductos() {
        const usuario = Persona.obtenerNombre();
        if (!usuario) {
            window.location.href = "bienvenida.html";
            return;
        }

        this.carrito = Carrito.crearDesdeLocalStorage(usuario);
        this.contenedor = document.getElementById("productos");

        this.productos = await obtenerProductos();

        this.paginacion = new Paginacion(this.productos, 6);

        this.mostrarPagina();
        this.configurarFiltros();
        this.configurarBotonesPaginacion();
        this.configurarAgregar();
        
        ProductosView.actualizarContadorCarrito(this.carrito);
    }

    // ---------------- FILTROS ----------------
    static configurarFiltros() {
        const asignar = (id, categoria) => {
            const btn = document.getElementById(id);
            if (btn) btn.addEventListener("click", () => this.filtrar(categoria));
        };

        asignar("filtro-guitarra", "Guitarra");
        asignar("filtro-pianos", "Piano");
        asignar("filtro-todos", "Todos");
    }

    static filtrar(cat) {
        if (cat === "Todos") {
            this.categoriaFiltrada = null;
            this.paginacion.setItems(this.productos);
        } else {
            const filtrados = this.productos.filter(p => p.categoria === cat);
            this.categoriaFiltrada = filtrados;
            this.paginacion.setItems(filtrados);
        }

        this.mostrarPagina();
    }

    // ---------------- PAGINACION ----------------
    static configurarBotonesPaginacion() {
        const sig = document.getElementById("siguiente");
        const ant = document.getElementById("anterior");

        if (sig) sig.addEventListener("click", () => {
            this.paginacion.siguiente();
            this.mostrarPagina();
        });

        if (ant) ant.addEventListener("click", () => {
            this.paginacion.anterior();
            this.mostrarPagina();
        });
    }

    static mostrarPagina() {
        const lista = this.paginacion.obtenerPaginaActual();

        ProductosView.mostrarProducto(this.contenedor, lista, this.carrito);
        this.actualizarIndicadores();
    }

    static actualizarIndicadores() {
        const actual = document.getElementById("pagina-actual");
        const total = document.getElementById("total-paginas");

        if (actual) actual.textContent = this.paginacion.paginaActual;
        if (total) total.textContent = this.paginacion.totalPaginas();
    }

    // ---------------- AGREGAR AL CARRITO ----------------
    static configurarAgregar() {
        this.contenedor.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            if (!card) return;

            if (!e.target.classList.contains("btnAgregar")) return;

            const nombre = card.querySelector(".card-title").textContent.replace("Nombre: ", "");
            const producto = this.productos.find(p => p.nombre === nombre);

            this.procesarAgregar(card, producto);
        });
    }

    static procesarAgregar(card, producto) {
        const btn = card.querySelector(".btnAgregar");
        btn.style.display = "none";

        const agregado = this.carrito.agregar(producto);

        if (!agregado) {
            alert(`No hay más stock (${producto.stock})`);
            btn.style.display = "block";
            return;
        }

        const viejo = card.querySelector("div.mt-2");
        if (viejo) viejo.remove();

        const contenedorBtn = ProductosView.crearContenedorBotones();
        card.querySelector(".card-body").appendChild(contenedorBtn);

        ProductosView.agregarEventosCard(card, producto, this.carrito);
        ProductosView.actualizarContadorCarrito(this.carrito);
    }
}
