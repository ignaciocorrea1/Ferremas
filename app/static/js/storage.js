/* Obtención del carrito */
export function get_carrito() {
  return JSON.parse(localStorage.getItem("Carrito")) || [];
}

/* Guardar el producto en el localStorage */
export function set_carrito(carrito) {
  localStorage.setItem("Carrito", JSON.stringify(carrito));
}

/* Agregar el producto al carrito */
export function add_producto(producto) {
  // Obtencion del carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existencia = carrito.find((item) => item.id === producto.id);

  // Validacion de existencia
  if (existencia) {
    // Si existe se agrega un producto y se recalcula el total
    existencia.cantidad += 1;
    existencia.total = existencia.cantidad * existencia.precio;
  } else {
    // Si no existe se agrega
    carrito.push(producto);
  }

  // Se guarda
  set_carrito(carrito);
}

/* Eliminar el producto del carrito */
export function del_producto(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el index del producto pasado
  let idxProducto = carrito.findIndex(item => item.id === id);

  // Se le quita al carrito y se vuelve a guardar
  carrito.splice(idxProducto, 1);
  set_carrito(carrito);
}

export function add_cantidad(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existencia = carrito.find((item) => item.id === id);

  // Validacion de la existencia 
  if (existencia) {
    // Valida que el stock sea mayor a la cantidad del producto solicitado
    if(existencia.stock > existencia.cantidad) {
      // Si es mayor, se modifica con map el carrito
      carrito.map(producto => { // En si, Map crea un nuevo array
        if (producto.id === id) {
          producto.cantidad += 1;
          producto.total = producto.cantidad * producto.precio;
        }

        return producto; // Siempre se debe retornar algo en un map, aqui se retorna el producto actualizado
      });

      // Se guarda el carrito modificado
      set_carrito(carrito);
  
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  };
};