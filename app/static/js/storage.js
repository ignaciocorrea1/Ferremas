/* Obtención del carrito */
export function get_carrito() {
  return JSON.parse(localStorage.getItem("Carrito")) || [];
};

/* Guardar el producto en el localStorage */
export function set_carrito(carrito) {
  localStorage.setItem("Carrito", JSON.stringify(carrito));
};

/* Agregar el producto al carrito */
export function add_producto(producto) {
  // Obtencion del carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existente = carrito.find((item) => item.id === producto.id);

  // Validacion de existencia
  if (existente) {
    // Si existe se agrega un producto y se recalcula el total
    existente.cantidad += 1;
    existente.total = existente.cantidad * existente.precio;
  } else {
    // Si no existe se agrega
    carrito.push(producto);
  }

  // Se guarda
  set_carrito(carrito);
};

/* Eliminar el producto del carrito */
export function del_producto(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el index del producto pasado
  let idxProducto = carrito.findIndex((item) => item.id === Number(id));

  // Se le quita al carrito y se vuelve a guardar
  carrito.splice(idxProducto, 1);
  set_carrito(carrito);
};
