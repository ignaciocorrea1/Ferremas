import { despliegue_items } from "./pago.js";
import { abrir_modal_carrito, cerrar_modal_carrito } from "./modales.js";
import { get_producto_api } from "./api.js";
import { get_valor_dolar } from "./get_dolar.js";
import { despliegue_carrito, dataTotal } from "./carrito.js";
import {
  add_producto,
  del_producto,
  add_cantidad,
  del_cantidad,
  set_divisa,
  get_divisa,
  convertir_precios,
  get_carrito,
} from "./storage.js";

/* -------------------------------------------------------- Constantes -------------------------------------------------------- */

const $openCarroBtn = document.getElementById("openCarroBtn");
const $closeCarroBtn = document.getElementById("closeCarroBtn");
const $modalContent = document.querySelector(".modal-content");
const $carro = document.getElementById("modalCarro");
const $carroSection = document.getElementById("carro-section");
const $pagoItems = document.getElementById("pago-items");

const $addCarroBtns = document.querySelectorAll(".add-carrito");

const $selectDivisa = document.getElementById("divisa-select");

const $webpayBtn = document.getElementById("webpayBtn");

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
  $selectDivisa.addEventListener("change", async (e) => {
    const divisaActual = get_divisa();
    console.log("Divisa actual: ", divisaActual);
    const nuevaDivisa = e.target.value;
    console.log("Divisa nueva: ", nuevaDivisa);
    if (nuevaDivisa === divisaActual) return; // Si es la misma no pasa nada

    try {
      // Obtener valor del dólar
      const valor_dolar = await get_valor_dolar();
      console.log("Valor dolar obtenido: ", valor_dolar);
      if (valor_dolar === null) return;

      const endpoint =
        nuevaDivisa === "usd"
          ? "http://127.0.0.1:5000/actualizarUSD/"
          : "http://127.0.0.1:5000/actualizarCLP/";
      console.log("Endpoint para solicitud: ", endpoint);

      // Solicitud PUT para actualizar precios
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor: valor_dolar }),
      });

      if (!response.ok) throw new Error("Error al actualizar la BD");

      // Actualizar localStorage
      convertir_precios(divisaActual, nuevaDivisa, valor_dolar);
      set_divisa(nuevaDivisa);
      console.log("Divisa y precios actualizados exitosamente");

      // Se recarga la pagina
      location.reload();
    } catch (error) {
      console.error("Error en el cambio de divisa: ", error);
    }
  });

  /* ------------------------------------------------------- Funciones para pagar ------------------------------------------------------- */

  // Cargar items
  if ($pagoItems) {
    despliegue_items();
  }

  if ($webpayBtn) {
    $webpayBtn.addEventListener("click", async (e) => {
      try {
        const data = {
          nroorden: "orden123",
          usuario: "0",
          total: Math.round(dataTotal().valor),
          carrito: get_carrito(), // función que retorna el array de productos
        };

        console.log(data);

        const endpoint = "http://127.0.0.1:5000/crear_transaccion";
        console.log("Endpoint para solicitud: ", endpoint);

        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        // Obtener valor
        const result = await response.json();

        if (result.estado === "ok") {
          // Redirigir al usuario a Webpay
          window.location.href = result.redirect;
        } else {
          console.error("Error del servidor:", result.detalle);
        }
      } catch (error) {
        console.error("Error en el inicio del pago: ", error);
      }
    });
  }
}
