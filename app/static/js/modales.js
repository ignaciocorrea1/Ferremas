import { despliegue_carrito } from "./carrito.js";
import { get_divisa, set_divisa } from "./storage.js";

/* -------------------------------------------------------- Constantes -------------------------------------------------------- */

const $carro = document.getElementById("modalCarro");
const $modalContent = document.querySelector(".modal-content");

const $selectDivisa = document.getElementById("divisa-select");

/* -------------------------------------------------------- Apertura del carrito -------------------------------------------------------- */

export const abrir_modal_carrito = () => {
  // Se le quita el hidden
  $carro.classList.remove("hidden");

  // Se desplaza el carro
  setTimeout(() => {
    $modalContent.classList.remove("translate-x-full");
    $modalContent.classList.add("translate-x-0");
  }, 10);

  setTimeout(() => {
    // Seteo de la divisa
    const divisaGuardada = get_divisa(); // Obtiene usa o por defecto clp
    set_divisa(divisaGuardada); // Se setea
    $selectDivisa.value = divisaGuardada; // Se selecciona esa divisa en el select
  }, 20);

  // Se despliegan los productos
  setTimeout(() => {
    despliegue_carrito();
  }, 30);
};

export const cerrar_modal_carrito = () => {
  // Se esconde el modal
  $modalContent.classList.add("translate-x-full");
  $modalContent.classList.remove("translate-x-0");

  // Se oculta
  setTimeout(() => {
    $carro.classList.add("hidden");
  }, 300);
};

/* -------------------------------------------------------- Dropdown button divisas -------------------------------------------------------- */
