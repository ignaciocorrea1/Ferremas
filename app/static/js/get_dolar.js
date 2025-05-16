export async function get_valor_dolar() {
    try {
        const response = await fetch("http://127.0.0.1:5000/valorDolar/")

        if (!response.ok) {
            console.error("Error en la response");
        } else {
            const data = await response.json();
            return data.valor;
        }
    } catch (error) {
        console.error("Error al obtener el valor del dolar: ", error);
        return null;
    };
};