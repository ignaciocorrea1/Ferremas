import { abrir_modal_carrito, cerrar_modal_carrito } from "./modales.js";
import { get_producto_api } from "./api.js";
import {
  add_producto,
  del_producto,
  add_cantidad,
  del_cantidad,
  set_divisa,
} from "./storage.js";

/* -------------------------------------------------------- Constantes -------------------------------------------------------- */

const $openCarroBtn = document.getElementById("openCarroBtn");
const $closeCarroBtn = document.getElementById("closeCarroBtn");
const $modalContent = document.querySelector(".modal-content");
const $carro = document.getElementById("modalCarro");
const $carroSection = document.getElementById("carro-section");

const $addCarroBtns = document.querySelectorAll(".add-carrito");

const $selectDivisa = document.getElementById("divisa-select");
const $flechasDivisas = document.querySelectorAll(".flechas-divisas")

/* -------------------------------------------------------- Eventos -------------------------------------------------------- */

export function eventos() {
  /* -------------------------------------------------------- Modales -------------------------------------------------------- */

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

  /* -------------------------------------------------------- Funciones carrito -------------------------------------------------------- */

  /* Agregar producto */
  $addCarroBtns.forEach((btn) => {
    // Obtencion y envio de la id
    btn.addEventListener("click", async (e) => {
      const id = Number(e.target.dataset.addid);

      // Se realiza una solicitud get a la api
      const producto = await get_producto_api(id);
      console.log("Producto obtenido: ", producto);
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
      const id = Number(e.target.dataset.delid);
      del_producto(id);

      // Eliminacion del HTML
      const $productoDin = document.getElementById("producto-din-" + id);
      $carroSection.removeChild($productoDin);

      const $productoDinHR = document.getElementById("producto-din-hr-" + id);
      $carroSection.removeChild($productoDinHR);
    }
  });

  /* Aumentar la cantidad de un producto */
  $carroSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("mas-cant")) {
      const id = Number(e.target.dataset.masid);

      let $cantidad = document.getElementById("pro-cantidad-" + id);

      if (add_cantidad(id)) {
        // Se obtiene la cantidad del dom y se actualiza
        let cantidadActual = Number($cantidad.textContent);
        let nuevaCantidad = cantidadActual + 1;

        // Se cambia la cantidad
        $cantidad.textContent = String(nuevaCantidad);
      } else {
        // Transicion de 70ms
        $cantidad.classList.add("transition", "duration-70");

        // 1: Se mueve a la derecha
        $cantidad.classList.add("translate-x-1");

        // 2:
        setTimeout(() => {
          // 2: Se quita el movimiento a la derecha y se desplaza a izquierda
          $cantidad.classList.remove("translate-x-1");
          $cantidad.classList.add("-translate-x-1");

          // 3:
          setTimeout(() => {
            // 3: Se quita el movimiento a la izquierda y se desplaza a la posicion original
            $cantidad.classList.remove("-translate-x-1");
            $cantidad.classList.add("translate-x-0");
          }, 70);
        }, 70);
      }
    }
  });

  /* Disminuir la cantidad de un producto */
  $carroSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("menos-cant")) {
      const id = Number(e.target.dataset.menid);

      let $cantidad = document.getElementById("pro-cantidad-" + id);

      if (del_cantidad(id)) {
        // Se obtiene la cantidad del dom y se actualiza
        let cantidadActual = Number($cantidad.textContent);
        let nuevaCantidad = cantidadActual - 1;

        // Se cambia la cantidad
        $cantidad.textContent = String(nuevaCantidad);
      } else {
        // Transicion de 70ms
        $cantidad.classList.add("transition", "duration-70");

        // 1: Se mueve a la derecha
        $cantidad.classList.add("translate-x-1");

        // 2:
        setTimeout(() => {
          // 2: Se quita el movimiento a la derecha y se desplaza a izquierda
          $cantidad.classList.remove("translate-x-1");
          $cantidad.classList.add("-translate-x-1");

          // 3:
          setTimeout(() => {
            // 3: Se quita el movimiento a la izquierda y se desplaza a la posicion original
            $cantidad.classList.remove("-translate-x-1");
            $cantidad.classList.add("translate-x-0");
          }, 70);
        }, 70);
      }
    }
  });

  /* -------------------------------------------------------- Funciones divisa -------------------------------------------------------- */

  /* Cambio de divisa */
  $selectDivisa.addEventListener("change", (e) => {
    const nuevaDivisa = e.target.value; // Se obtiene el valor seleccionado
    set_divisa(nuevaDivisa); // Se setea el nuevo valor
  });
};