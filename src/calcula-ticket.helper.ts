type TipoIva =
  | "general"
  | "reducido"
  | "superreducidoA"
  | "superreducidoB"
  | "superreducidoC"
  | "sinIva";

const productos: LineaTicket[] = [
    {
      producto: {
        nombre: "Legumbres",
        precio: 2,
        tipoIva: "general",
      },
      cantidad: 2,
    },
    {
      producto: {
        nombre: "Perfume",
        precio: 20,
        tipoIva: "general",
      },
      cantidad: 3,
    },
    {
      producto: {
        nombre: "Leche",
        precio: 1,
        tipoIva: "superreducidoC",
      },
      cantidad: 6,
    },
    {
      producto: {
        nombre: "Lasaña",
        precio: 5,
        tipoIva: "superreducidoA",
      },
      cantidad: 1,
    },
];

interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

interface ResultadoLineaTicket {
    nombre: string;
    cantidad: number;
    precionSinIva: number;
    tipoIva: TipoIva;
    precioConIva: number;
};

const calculaPrecioProducto = (precioProducto: number): number => {
    
}

const calculaPrecioProducto = (precioProducto: string, arrayProductos: LineaTicket[]): number => {
    
}



const creaLineaTicket = (producto: Producto): LineaTicket => {
    const precio = producto.precio;

    return [ producto: producto.nombre, cantidad: obtenCantidadProductos(producto.nombre)];
}