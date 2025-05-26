import { get_carrito } from "./storage.js";
import { dataTotal } from "./carrito.js";

const $pagoItems = document.getElementById("pago-items");
const $pagoInfo = document.getElementById("pago-info");

export function despliegue_items() {
  // Se vacia el contenedor
  $pagoItems.innerHTML = "";
  $pagoInfo.innerHTML = "";

  // Si esta fuera solo genera el carrito una vez, es necesario que se recupere el carro en cada apertura del modal
  const carrito = get_carrito();
  const totalCompra = dataTotal();
  let nroprods = 0

  // Se recorren los productos del carrito y se agregan al HTML
  carrito.forEach((producto) => {
    nroprods = nroprods + producto.cantidad;
    const productoCarrito = `
      <div
        class="product flex-col-around items-center w-[15vw] h-[45vh] border-4 border-[var(--azulMedio)] rounded-2xl p-4 shadow-[2px_2px_10px_rgba(48,84,183,0.5)]"
      >
        <!-- Imagen del producto -->
        <div class="product-img mb-4 h-[40%]">
          <img
            class="w-[90%] h-full object-cover mx-auto"
            src="${producto.imagen}"
            alt="Cargando..."
          />
        </div>
        <hr
          class="w-[90%] mx-auto my-3 border-[1px] border-[var(--azulMedio)] opacity-50"
        />
        <!-- Información del producto -->
        <div class="product-info py-3 flex-col-center text-center h-[20%]">
          <p class="pb-2"><span class="text-info">${producto.nombre}</span></p>
          <p><span class="text-info">Precio: $${producto.precio}</span></p>
          <p><span class="text-info">Cantidad: ${producto.cantidad}</span></p>
        </div>
        <!-- Botones del producto -->
        <div
          class="product-buttons flex-col-around w-full h-[40%] space-y-3 mt-auto"
        >
        </div>
      </div>
    `;
    $pagoItems.insertAdjacentHTML("beforeend", productoCarrito);
  });

  const infoPago = `
    <h2>Info de la compra</h2>
    
    <p class="pb-2"><span class="text-info">Productos en la compra: ${nroprods}</span></p>
    <p class="pb-2"><span class="text-info">Total de la compra: ${totalCompra["valor"]}</span></p>
  `;
  $pagoInfo.insertAdjacentHTML("beforeend", infoPago);
};