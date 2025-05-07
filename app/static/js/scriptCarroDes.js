/* Desplegado del modal */

/* Constantes */
const $carro = document.getElementById("modalCarro");
const $openCarroBtn = document.getElementById("openCarroBtn");
const $closeCarroBtn = document.getElementById("closeCarroBtn");
const $modalContent = document.querySelector(".modal-content");

const $carroSection = document.getElementById("carro-section")

/* Abrir modal */
$openCarroBtn.addEventListener("click", () => {
  $carro.classList.remove("hidden");
  
  // Esperar un momento para que las clases de transición funcionen
  setTimeout(() => {
    $modalContent.classList.remove("translate-x-full");
    $modalContent.classList.add("translate-x-0");    
  }, 10);

  setTimeout(() => {
    despliegue_carrito();
  }, 20);
});

/* Cerrar el modal */
const cerrarModal = () => {
  $modalContent.classList.add("translate-x-full");
  $modalContent.classList.remove("translate-x-0");

  // Esperar un momento para que las clases de transición funcionen
  setTimeout(() => {
    $carro.classList.add("hidden");
  }, 300);
};

/* Cerrar modal al hacer clic en el boton */
$closeCarroBtn.addEventListener("click", cerrarModal);

/* Cerrar modal al hacer clic fuera del contenido */
window.addEventListener("click", (event) => {
  if (event.target === $carro) {
    cerrarModal();
  }
});

/* Cerrar modal al presionar la tecla "Escape" */
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

/* Evitar propagación del evento al hacer clic dentro del modal */
$modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});

/* Despliegue de los productos del carrito en localStorage */
function despliegue_carrito() {
  // Se obtienen el carrito
  const carrito = JSON.parse(localStorage.getItem("Carrito")) || [];

  // Se limpia el contenedor
  $carroSection.innerHTML = ""

  carrito.forEach(producto => {
    console.log("Producto en carrito: ", producto);
    
    // Se crea el HTML
    let productoCarrito = 
    `
    <div class="flex justify-start w-full h-full mt-4">
      <!-- Imagen y boton eliminar -->
      <div class="flex-col-center w-[30%] px-6 h-full">
        <div class="py-2 w-[75%] flex-col-center">
          <!-- Contenedor de tamaño fijo para la imagen con dimensiones absolutas -->
          <div class="w-24 h-24 overflow-hidden bg-white rounded-lg">
            <img
              class="max-w-full max-h-full object-contain"
              src="${producto.imagen}"
              alt="Cargando..."
            />
          </div>
          <button class="pt-2">Eliminar</button>
        </div>
      </div>

      <!-- Descripcion producto y contadores -->
      <div
        class="flex flex-col justify-between items-start w-[70%] h-full py-1"
      >
        <div
          class="w-full h-full flex flex-col justify-start items-start"
        >
          <h2>${producto.nombre}</h2>
          <h2 class="pt-3 pb-3">Precio: $${producto.precio}</h2>
        </div>
        <!-- Contadores -->
        <div class="w-full h-full flex justify-start items-center">
          <button class="text-white text-3xl w-[5%]" type="button">
            -
          </button>

          <span class="px-3 text-2xl">1</span>

          <button class="text-white text-3xl w-[5%]" type="button">
            +
          </button>
        </div>
      </div>
    </div>

    <hr
      class="w-full max-w-[95%] mx-auto mt-2 border-[1px] opacity-50"
    />
    `

    // Se agrega el child
    $carroSection.insertAdjacentHTML("beforeend", productoCarrito);
  });
};