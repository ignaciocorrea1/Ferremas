import { get_carrito } from "./storage.js";
import { dataTotal } from "./carrito.js";

const $pagoItemsBody = document.getElementById("pago-items-body");
const $pagoInfo = document.getElementById("pago-info");

export function despliegue_items() {
  $pagoItemsBody.innerHTML = "";
  $pagoInfo.innerHTML = "";

  const carrito = get_carrito();
  const totalCompra = dataTotal();
  let nroprods = 0;

  carrito.forEach((producto) => {
    nroprods += producto.cantidad;

    const filaProducto = `
      <tr class="border-b border-gray-300 hover:bg-gray-100">
        <td class="p-2 text-center">${producto.nombre}</td>
        <td class="p-2 text-center">$${producto.precio}</td>
        <td class="p-2 text-center">${producto.cantidad}</td>
      </tr>
    `;
    $pagoItemsBody.insertAdjacentHTML("beforeend", filaProducto);
  });

  const infoPago = `
    <h2 class="text-lg font-semibold mb-4 text-center">Información de la compra</h2>
    <p><span class="text-info">Productos en la compra: ${nroprods}</span></p>
    <p><span class="text-info">Total de la compra: $${totalCompra["valor"]}</span></p>
  `;
  $pagoInfo.insertAdjacentHTML("beforeend", infoPago);
};