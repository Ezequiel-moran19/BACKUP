
export class ticketView{
        static motrarticket(ticket){
            console.log(ticket)
            const contenedor = document.getElementById("principalTicket");
            const card = ticketView.renderizaTicket(ticket);
            contenedor.appendChild(card);
        }

        static renderizaTicket(ticket) {
            const container = document.createElement("div");
            container.id = "idPdf";
            container.classList.add("card", "shadow-lg", "mx-auto");
            container.style.width = "30rem";
            
            const header = document.createElement("div");
            header.classList.add("card-header", "text-center", "bg-light");
            const titulo = document.createElement("h2");
            titulo.id = "idTitulo";
            titulo.classList.add("text-danger", "fw-bold");
            titulo.textContent = "¡Compra Exitosa!";
            header.appendChild(titulo);
            const body = document.createElement("div");
            body.classList.add("card-body", "p-4");
            const datos = document.createElement("div");
            datos.classList.add("bg-light", "p-3", "rounded", "mb-4");
            const fila1 = ticketView.crearLinea("Ticket #:", ticket.id);
            const fila2 = ticketView.crearLinea("Fecha:", ticket.fecha);
            const fila3 = ticketView.crearLinea("Cliente:", ticket.nombreCliente);
            datos.appendChild(fila1);
            datos.appendChild(fila2);
            datos.appendChild(fila3);

            const productosDiv = document.createElement("div");
            productosDiv.classList.add("mb-4");

            const tituloProd = document.createElement("h5");
            tituloProd.classList.add("fw-semibold", "mb-3");
            tituloProd.textContent = "Productos Comprados";
            productosDiv.appendChild(tituloProd);
            ticket.productos.forEach(element => {
                let productohtml= this.crearProducto(element);
                productosDiv.appendChild(productohtml)
            });
            const totalDiv = document.createElement("div");
            totalDiv.classList.add("border-top", "pt-3", "mb-4");

            const totalLinea = document.createElement("div");
            totalLinea.classList.add("d-flex", "justify-content-between", "align-items-center");

            const totalTitulo = document.createElement("h4");
            totalTitulo.classList.add("fw-bold", "m-0");
            totalTitulo.textContent = "TOTAL:";

            const totalMonto = document.createElement("h4");
            totalMonto.classList.add("text-success", "fw-bold", "m-0");
            totalMonto.textContent = ticket.total;

            totalLinea.appendChild(totalTitulo);
            totalLinea.appendChild(totalMonto);
            totalDiv.appendChild(totalLinea);

            const botonesDiv = document.createElement("div");
            botonesDiv.classList.add("d-flex", "gap-3");

            const btnDescargar = document.createElement("button");
            btnDescargar.classList.add("btn", "btn-danger", "flex-fill", "d-flex", "align-items-center", "justify-content-center");
            btnDescargar.id = "btnConfirmar";
            btnDescargar.innerHTML = `<i class="bi bi-download me-2"></i> Descargar PDF`;

            const btnSalir = document.createElement("a");
            btnSalir.id = "btnSalir";
            btnSalir.href = "./productos.html";
            btnSalir.classList.add("btn", "bg-light", "border", "flex-fill", "d-flex", "align-items-center", "justify-content-center");
            btnSalir.innerHTML = `<i class="bi bi-house me-2"></i> Salir`;

            botonesDiv.appendChild(btnDescargar);
            botonesDiv.appendChild(btnSalir);

            body.appendChild(datos);
            body.appendChild(productosDiv);
            body.appendChild(totalDiv);
            body.appendChild(botonesDiv);

            const footer = document.createElement("div");
            footer.classList.add("card-footer", "text-center", "text-muted", "small");

            const footerText = document.createElement("p");
            footerText.classList.add("card-text", "m-0");
            footerText.textContent = "Gracias por su compra";

            footer.appendChild(footerText);
            container.appendChild(header);
            container.appendChild(body);
            container.appendChild(footer);

        return container;
    }

    static crearProducto(producto) {
        const prod = document.createElement("div");
        prod.classList.add("p-3", "mb-2", "bg-light", "rounded", "d-flex", "justify-content-between", "align-items-center");

        const info = document.createElement("div");

        const pNombre = document.createElement("p");
        pNombre.classList.add("m-0", "fw-medium");
        pNombre.textContent = producto.nombre;

        const small = document.createElement("small");
        small.classList.add("text-muted", "cantidad");
        small.textContent = `Cantidad: ${producto.cantidad}`;
        
        const pPrecio = document.createElement("p");
        pPrecio.classList.add("text-muted", "m-0", "precio");
        pPrecio.textContent = `Precio unitario: $${(producto.precio).toLocaleString()}`;

        info.appendChild(pNombre);
        info.appendChild(small);
        info.appendChild(pPrecio);
        
        const pSubtotal = document.createElement("p");
        pSubtotal.classList.add("fw-bold", "m-0");
        pSubtotal.textContent = `$${(producto.subtotal || producto.precio * producto.cantidad).toLocaleString()}`;

        prod.appendChild(info);
        prod.appendChild(pSubtotal);

        return prod;
    }

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
}


