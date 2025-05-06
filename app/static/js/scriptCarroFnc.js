/* Funciones del carrito */

/* Constantes */
const $addCarroBtns = document.querySelectorAll(".add-carrito");

/* Obtención de la informacion del producto a través de la API */
async function get_producto(id) {
    try {
        // Solicitud HTTP
        const response = await fetch(`http://127.0.0.1:5000/productos/${id}`); // Se espera la respuesta de la API

        // Manejo de respuesta
        if (!response.ok) {
            console.error("Error al obtener el producto");
        } else {
            const producto = await response.json(); // Se espera la conversión a JSON del contenido de la respuesta
            return producto; // Se retorna como string el objeto 
        }
    } catch (error) {
        console.error("Error:", error);
        return null;
    };
};

/* Añadir el producto al localStorage */
function add_producto_LS(producto) {
    localStorage.setItem("Carrito", JSON.stringify(producto))
    console.log("Carrito: ", JSON.parse(localStorage.getItem("Carrito")))
};

/* Evento para obtener y enviar las ids a get_producto */
$addCarroBtns.forEach(btn => {
    // Evento para la obtencion de las ids de los botones para añadir al carro de los productos
    btn.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        
        /* Se realiza un get a la api */
        const producto = await get_producto(id);
        console.log("Producto guardado en el localStorage: ", producto);

        /* Se añade el producto al localStorage */
        add_producto_LS(producto);
    });
});