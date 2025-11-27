export class ticketView {

    static mostrarticket(ticket) {
        const contenedor = document.getElementById("principalTicket");
        const card = this.crearTicketCompleto(ticket);
        contenedor.appendChild(card);
    }

    //   SECCIÓN PRINCIPAL DEL TICKET
    static crearTicketCompleto(ticket) {
        const container = this.crearContenedor();

        const header = this.crearHeader();
        const body = this.crearBody(ticket);
        const footer = this.crearFooter();

        container.appendChild(header);
        container.appendChild(body);
        container.appendChild(footer);

        return container;
    }

    static crearContenedor() {
        const container = document.createElement("div");
        container.id = "idPdf";
        container.classList.add("card", "shadow-lg", "mx-auto");
        container.style.width = "30rem";
        return container;
    }

    //   HEADER
    // ================================
    static crearHeader() {
        const header = document.createElement("div");
        header.classList.add("card-header", "text-center", "bg-light");

        const titulo = document.createElement("h2");
        titulo.id = "idTitulo";
        titulo.classList.add("text-danger", "fw-bold");
        titulo.textContent = "¡Compra Exitosa!";

        header.appendChild(titulo);
        return header;
    }
    //   BODY COMPLETO
    static crearBody(ticket) {
        const body = document.createElement("div");
        body.classList.add("card-body", "p-4");

        body.appendChild(this.crearBloqueDatos(ticket));
        body.appendChild(this.crearBloqueProductos(ticket.productos));
        body.appendChild(this.crearBloqueTotal(ticket.total));
        body.appendChild(this.crearBloqueBotones());

        return body;
    }

    // DATOS DEL TICKET
    static crearBloqueDatos(ticket) {
        const datos = document.createElement("div");
        datos.classList.add("bg-light", "p-3", "rounded", "mb-4");

        datos.appendChild(this.crearLinea("Ticket #:", ticket.id));
        datos.appendChild(this.crearLinea("Fecha:", ticket.fecha));
        datos.appendChild(this.crearLinea("Cliente:", ticket.nombreCliente));

        return datos;
    }

    // PRODUCTOS
    static crearBloqueProductos(listaProductos) {
        const productosDiv = document.createElement("div");
        productosDiv.classList.add("mb-4");

        const tituloProd = document.createElement("h5");
        tituloProd.classList.add("fw-semibold", "mb-3");
        tituloProd.textContent = "Productos Comprados";

        productosDiv.appendChild(tituloProd);

        listaProductos.forEach(prod => {
            productosDiv.appendChild(this.crearProducto(prod));
        });

        return productosDiv;
    }

    // TOTAL
    static crearBloqueTotal(total) {
        const totalDiv = document.createElement("div");
        totalDiv.classList.add("border-top", "pt-3", "mb-4");

        const totalLinea = document.createElement("div");
        totalLinea.classList.add("d-flex", "justify-content-between", "align-items-center");

        const totalTitulo = document.createElement("h4");
        totalTitulo.classList.add("fw-bold", "m-0");
        totalTitulo.textContent = "TOTAL:";

        const totalMonto = document.createElement("h4");
        totalMonto.classList.add("text-success", "fw-bold", "m-0");
        totalMonto.textContent = total;

        totalLinea.appendChild(totalTitulo);
        totalLinea.appendChild(totalMonto);
        totalDiv.appendChild(totalLinea);

        return totalDiv;
    }

    // BOTONES
    static crearBloqueBotones() {
        const botonesDiv = document.createElement("div");
        botonesDiv.classList.add("d-flex", "gap-3");

        botonesDiv.appendChild(this.crearBotonDescargaPdf());
        botonesDiv.appendChild(this.crearBotonSalir());

        return botonesDiv;
    }

    static crearBotonSalir() {
        const btn = document.createElement("a");
        btn.id = "btnSalir";
        btn.href = "./productos.html";
        btn.classList.add("btn", "bg-light", "border", "flex-fill", "d-flex", "align-items-center", "justify-content-center");
        btn.innerHTML = `<i class="bi bi-house me-2"></i> Salir`;
        return btn;
    }

    static crearBotonDescargaPdf() {
        const btn = document.createElement("button");
        btn.id = "btnConfirmar";
        btn.classList.add("btn", "btn-danger", "flex-fill", "d-flex", "align-items-center", "justify-content-center");
        btn.innerHTML = `<i class="bi bi-download me-2"></i> Descargar PDF`;
        return btn;
    }
    
    //   PRODUCTO INDIVIDUAL
    static crearProducto(producto) {
        const prod = document.createElement("div");
        prod.classList.add("p-3", "mb-2", "bg-light", "rounded", "d-flex", "justify-content-between", "align-items-center");

        const info = document.createElement("div");

        const pNombre = document.createElement("p");
        pNombre.classList.add("m-0", "fw-medium");
        pNombre.textContent = producto.nombre;

        const small = document.createElement("small");
        small.classList.add("text-muted");
        small.textContent = `Cantidad: ${producto.cantidad}`;

        const pPrecio = document.createElement("p");
        pPrecio.classList.add("text-muted", "m-0");
        pPrecio.textContent = `Precio unitario: $${producto.precio.toLocaleString()}`;

        info.appendChild(pNombre);
        info.appendChild(small);
        info.appendChild(pPrecio);

        const pSubtotal = document.createElement("p");
        pSubtotal.classList.add("fw-bold", "m-0");
        pSubtotal.textContent =
            `$${(producto.subtotal || producto.precio * producto.cantidad).toLocaleString()}`;

        prod.appendChild(info);
        prod.appendChild(pSubtotal);

        return prod;
    }

    //   FILA DE INFORMACIÓN
    static crearLinea(etiqueta, valor) {
        const div = document.createElement("div");
        div.classList.add("d-flex", "justify-content-between");

        const strong = document.createElement("strong");
        strong.textContent = etiqueta;

        const span = document.createElement("span");
        span.textContent = valor;

        div.appendChild(strong);
        div.appendChild(span);
        return div;
    }

    //   FOOTER
    static crearFooter() {
        const footer = document.createElement("div");
        footer.classList.add("card-footer", "text-center", "text-muted", "small");

        const text = document.createElement("p");
        text.classList.add("card-text", "m-0");
        text.textContent = "Gracias por su compra";

        footer.appendChild(text);
        return footer;
    }
}
