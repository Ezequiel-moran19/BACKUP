export class Producto{
    constructor(id, nombre, descripcion, precio, rutaImg, categoria, activo = true, stock){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.rutaImg = rutaImg;
        this.categoria = categoria;
        this.activo = activo;
        this.stock = stock;
    }

    estaDisponible(){
            return this.activo && this.stock > 0;
    } 
    
    toJSON(){
        return {
            id: this.id,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            rutaImg: this.rutaImg,
            categoria: this.categoria,
            activo: this.activo,
            stock: this.stock,
        }
    }
}




