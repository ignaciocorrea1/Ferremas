import { abrir_modal_carrito, cerrar_modal_carrito } from "./modales.js";
import { get_producto_api } from "./api.js";
import { add_producto, del_producto } from "./storage.js";

/* Constantes */
const $openCarroBtn = document.getElementById("openCarroBtn");
const $closeCarroBtn = document.getElementById("closeCarroBtn");
const $modalContent = document.querySelector(".modal-content");
const $carro = document.getElementById("modalCarro");
const $carroSection = document.getElementById("carro-section");

const $addCarroBtns = document.querySelectorAll(".add-carrito");

export function eventos() {
  /* Abrir modal */
  $openCarroBtn.addEventListener("click", () => abrir_modal_carrito());

  /* Cerrar modal */
  $closeCarroBtn.addEventListener("click", () => cerrar_modal_carrito());

  /* Cerrar modal haciendo clic fuera del contenido */
  window.addEventListener("click", (e) => {
    if (e.target === $carro) {
      cerrar_modal_carrito();
    }
  });

  /* Cerrar modal con Escape */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      cerrar_modal_carrito();
    }
  });

  /* Evitación de la propagracion */
  $modalContent.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  /* Agregar producto */
  $addCarroBtns.forEach((btn) => {
    // Obtencion y envio de la id
    btn.addEventListener("click", async (e) => {
      const id = e.target.dataset.addid;

      // Se realiza una solicitud get a la api
      const producto = await get_producto_api(id);
      // Se añade el producto al localStorage
      add_producto(producto);
    });
  });

  /* Eliminar producto */
  $carroSection.addEventListener("click", (e) => {
    // Al ser generados dinamicamente los productos, el darle el evento al propio boton no funciona,
    // es por esto que es mejor darle el evento a la propia section, para que dependiendo el elemento que se
    // le hace clic activa la funcion.
    if (e.target.classList.contains("del-carrito")) {
      const id = e.target.dataset.delid;
      del_producto(id);

      // Eliminacion del HTML
      const $productoDin = document.getElementById("producto-din-"+id);
      const $productoDinHR = document.getElementById("producto-din-hr-"+id);
      $carroSection.removeChild($productoDin);
      $carroSection.removeChild($productoDinHR);
    };
  });
};
