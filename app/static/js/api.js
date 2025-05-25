/* Obtención de la informacion del producto a través de la API */
export async function get_producto_api(id) {
  try {
    // Solicitud HTTP
    const response = await fetch(`http://127.0.0.1:5000/productos/${id}`); // Se espera la respuesta de la API

    // Manejo de respuesta
    if (!response.ok) {
      console.error("Error al obtener el producto");
    } else {
      let producto = await response.json(); // Se espera la conversión a JSON del contenido de la respuesta
      // Adicion de campos para manejo de totales
      producto.cantidad = 1;
      producto.total = producto.precio;

      return producto; // Se retorna como string el objeto
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  };
};