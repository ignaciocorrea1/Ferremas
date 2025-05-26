import { get_carrito } from "./storage.js";

/* -------------------------------------------------------- Constantes -------------------------------------------------------- */

const $carroSection = document.getElementById("carro-section");
const $carroTotal = document.getElementById("carro-total");

export function despliegue_carrito() {
  // Se vacia el contenedor
  $carroSection.innerHTML = "";

  // Si esta fuera solo genera el carrito una vez, es necesario que se recupere el carro en cada apertura del modal
  const carrito = get_carrito();

  // Se recorren los productos del carrito y se agregan al HTML
  carrito.forEach((producto) => {
    const productoCarrito = `
    <div id="producto-din-${producto.id}" class="flex justify-start w-full h-full mt-4">
        <div class="flex-col-center w-[30%] px-6 h-full">
        <div class="py-2 w-[75%] flex-col-center">
            <div class="w-24 h-24 overflow-hidden bg-white rounded-lg">
            <img class="max-w-full max-h-full object-contain" src="${producto.imagen}" alt="Cargando..." />
            </div>
            <button data-delid=${producto.id} class="del-carrito pt-2">Eliminar</button>
        </div>
        </div>
        <div class="flex flex-col justify-between items-start w-[70%] h-full py-1">
        <div class="w-full h-full flex flex-col justify-start items-start">
            <h2>${producto.nombre}</h2>
            <h2 class="pt-3 pb-3">Precio: $${producto.precio}</h2>
        </div>
        <div class="w-full h-full flex justify-start items-center">
            <button data-menid=${producto.id} class="menos-cant text-white text-3xl w-[5%]" type="button">-</button>
            <span id="pro-cantidad-${producto.id}" class="px-3 text-2xl">${producto.cantidad}</span>
            <button data-masid=${producto.id} class="mas-cant text-white text-3xl w-[5%]" type="button">+</button>
        </div>
        </div>
    </div>
    <hr id="producto-din-hr-${producto.id}" class="w-full max-w-[95%] mx-auto mt-2 border-[1px] opacity-50" />
    `;

    $carroSection.insertAdjacentHTML("beforeend", productoCarrito);
  });

  // Se calcula el total de los productos en el carrito
  calculo_total();
};

export function calculo_total() {
  // Se vacia el contenido
  $carroTotal.textContent = "";

  const carrito = get_carrito();

  // Se inicializa el total
  let totalCarro = 0;

  // Se calcula por cada producto
  carrito.forEach((item) => {
    totalCarro += item.total;
  });

  // Se manda al HTML
  $carroTotal.textContent = totalCarro;
};

export function dataTotal() {
  const carrito = get_carrito();

  // Se inicializa el total
  let totalCarro = 0;

  // Se calcula por cada producto
  carrito.forEach((item) => {
    totalCarro += item.total;
  });
  return { valor: totalCarro };
}