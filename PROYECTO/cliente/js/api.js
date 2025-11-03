// api.js
export async function obtenerProductos() {
    try {
        const res = await fetch("http://localhost:3000/api/productos");
        const data = await res.json();
        return data.body; // devuelve directamente la lista
    } catch (error) {
        console.error("Error al obtener productos desde la API:", error);
        return []; // devuelve lista vacía si hay error
    }
}

// export const productos = [ 
//   { id: 1, nombre: "guitarra1",descripcion: "Descripcion del productos", precio: 120, rutaImg: "../assets/img/guitarra1.jpg", categoria: "Guitarra", activo: true,stock:4 },
//   { id: 2, nombre: "guitarra2",descripcion: "Descripcion del productos", precio: 50, rutaImg: "../assets/img/guitarra2.jpg", categoria: "Guitarra", activo: true,stock:2 },
//   { id: 3, nombre: "guitarra3",descripcion: "Descripcion del productos", precio: 456, rutaImg: "../assets/img/guitarra3.jpg", categoria: "Guitarra", activo: true,stock:5 },
//   { id: 4, nombre: "guitarra4",descripcion: "Descripcion del productos", precio: 130, rutaImg: "../assets/img/guitarra4.jpg", categoria: "Guitarra", activo: true,stock:2 },
//   { id: 5, nombre: "guitarra5",descripcion: "Descripcion del productos", precio: 150, rutaImg: "../assets/img/guitarra5.jpg", categoria: "Guitarra", activo: true,stock:3 },
//   { id: 6, nombre: "piano1",descripcion: "Descripcion del productos", precio: 455, rutaImg: "../assets/img/piano1.jpg", categoria: "Piano", activo: true,stock:2 },
//   { id: 7, nombre: "piano2",descripcion: "Descripcion del productos", precio: 300, rutaImg: "../assets/img/piano2.jpg", categoria: "Piano", activo: true,stock:7 },
//   { id: 8, nombre: "piano3",descripcion: "Descripcion del productos", precio: 280, rutaImg: "../assets/img/piano3.jpg", categoria: "Piano", activo: true,stock:9 },
//   { id: 9, nombre: "piano4",descripcion: "Descripcion del productos", precio: 767, rutaImg: "../assets/img/piano4.jpg", categoria: "Piano", activo: true,stock:2 },
//   { id: 10, nombre: "piano5",descripcion: "Descripcion del productos", precio: 180, rutaImg: "../assets/img/piano4.jpg", categoria: "Piano", activo: true,stock:3 },
//   { id: 11, nombre: "piano6",descripcion: "Descripcion del productos", precio: 876, rutaImg: "../assets/img/piano2.jpg", categoria: "Piano", activo: true,stock:7 },
//   { id: 12, nombre: "piano7",descripcion: "Descripcion del productos", precio: 111, rutaImg: "../assets/img/piano3.jpg", categoria: "Piano", activo: true,stock:9 },
//   { id: 13, nombre: "piano8",descripcion: "Descripcion del productos", precio: 999, rutaImg: "../assets/img/piano4.jpg", categoria: "Piano", activo: true,stock:2 },
//   { id: 14, nombre: "piano9",descripcion: "Descripcion del productos", precio: 183, rutaImg: "../assets/img/piano4.jpg", categoria: "Piano", activo: true,stock:3 },
// ];