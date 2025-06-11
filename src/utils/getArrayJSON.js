function getArrayJSON(texto) {
  try {
    const inicio = texto.indexOf("[");
    const fin = texto.lastIndexOf("]") + 1;
    if (inicio === -1 || fin === -1)
      throw new Error("No se encontró un array válido.");

    const jsonArrayTexto = texto.slice(inicio, fin);
    const jsonArray = JSON.parse(jsonArrayTexto);
    return jsonArray;
  } catch (error) {
    console.error("Error al extraer el array JSON:", error.message);
    return null;
  }
}
module.exports = { getArrayJSON };
