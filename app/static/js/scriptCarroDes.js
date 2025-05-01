/* Desplegado del modal */

// Constantes
const $carro = document.getElementById("modalCarro");
const $openCarroBtn = document.getElementById("openCarroBtn");
const $closeCarroBtn = document.getElementById("closeCarroBtn");
const $modalContent = document.querySelector(".modal-content");

// Abrir modal
$openCarroBtn.addEventListener("click", () => {
  $carro.classList.remove("hidden");

  // Esperar un momento para que las clases de transición funcionen
  setTimeout(() => {
    $modalContent.classList.remove("translate-x-full");
    $modalContent.classList.add("translate-x-0");
  }, 10);
});

// Cerrar el modal
const cerrarModal = () => {
  $modalContent.classList.add("translate-x-full");
  $modalContent.classList.remove("translate-x-0");

  // Esperar un momento para que las clases de transición funcionen
  setTimeout(() => {
    $carro.classList.add("hidden");
  }, 300);
};

// Cerrar modal al hacer clic en el boton
$closeCarroBtn.addEventListener("click", cerrarModal);

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (event) => {
  if (event.target === $carro) {
    cerrarModal();
  }
});

// Cerrar modal al presionar la tecla "Escape"
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cerrarModal();
  }
});

// Evitar propagación del evento al hacer clic dentro del modal
$modalContent.addEventListener("click", (event) => {
  event.stopPropagation();
});
