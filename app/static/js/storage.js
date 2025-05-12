/* -------------------------------------------------------- Obtención y guardado del carrito -------------------------------------------------------- */

/* Obtención del carrito */
export function get_carrito() {
  return JSON.parse(localStorage.getItem("Carrito")) || [];
};

/* Guardar el producto en el localStorage */
export function set_carrito(carrito) {
  localStorage.setItem("Carrito", JSON.stringify(carrito));
};

/* -------------------------------------------------------- Manejo del carrito -------------------------------------------------------- */

/* Agregar el producto al carrito */
export function add_producto(producto) {
  // Obtencion del carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existencia = carrito.find((item) => item.id === producto.id);

  // Validacion de existencia
  if (existencia) {
    // Stock debe ser mayor a la cantidad que se ingrese
    if (existencia.cantidad < existencia.stock) {
      // Si es mayor, se modifica con map el carrito
      carrito.map((item) => {
        if (item.id === producto.id) {
          item.cantidad += 1;
          item.total = item.cantidad * item.precio;

          return item;
        }
      });

      set_carrito(carrito);
    }
  } else {
    // Si no existe se agrega y guarda
    carrito.push(producto);
    set_carrito(carrito);
  };

};

/* Eliminar el producto del carrito */
export function del_producto(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el index del producto pasado
  let idxProducto = carrito.findIndex((item) => item.id === id);

  // Se le quita al carrito y se vuelve a guardar
  carrito.splice(idxProducto, 1);
  set_carrito(carrito);
};

/* Aumento de la cantidad de un producto */
export function add_cantidad(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existencia = carrito.find((item) => item.id === id);

  // Validacion de la existencia
  if (existencia) {
    // Stock debe ser mayor a la cantidad que se ingrese
    if (existencia.cantidad < existencia.stock) {
      // Si es mayor, se modifica con map el carrito
      carrito.map((item) => {
        // En si, Map crea un nuevo array
        if (item.id === id) {
          item.cantidad += 1;
          item.total = item.cantidad * item.precio;
        }

        return item; // Siempre se debe retornar algo en un map, aqui se retorna el producto actualizado
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

/* Disminucion de la cantidad de un producto */
export function del_cantidad(id) {
  // Se obtiene el carrito
  let carrito = get_carrito();
  // Se busca el producto
  let existencia = carrito.find((item) => item.id === id);

  // Validacion de la existencia
  if (existencia) {
    // Stock debe ser mayor a la cantidad que se ingrese
    if (existencia.cantidad > 1) {
      // Si es mayor, se modifica con map el carrito
      carrito.map((item) => {
        if (item.id === id) {
          item.cantidad -= 1;
          item.total = item.cantidad * item.precio;
        }

        return item; 
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

/* -------------------------------------------------------- Manejo de las divisas -------------------------------------------------------- */

/* Obtencion de la divisa */
export function get_divisa() {
  return localStorage.getItem("Divisa") || "clp"; // Retorna usa o clp por defecto
};

/* Guardar la divisa */
export function set_divisa(divisa) {
  localStorage.setItem("Divisa", divisa);
};