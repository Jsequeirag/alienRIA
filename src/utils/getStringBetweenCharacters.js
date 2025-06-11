const getStringBetweenCharacters = (texto, inicio = "{", fin = "}") => {
  const regex = new RegExp(`\\${inicio}(.*?)\\${fin}`, "g");
  let coincidencias = [];
  let match;

  while ((match = regex.exec(texto)) !== null) {
    coincidencias.push(match[1]);
  }

  return {
    image: isValidURL(coincidencias[0])
      ? coincidencias[0]
      : "https://mundoavenida.com/wp-content/uploads/2017/10/torre-50-pisos-san-jose.jpg",
  };
  // O cualquier valor que desees retornar si no se encuentran los caracteres
};
//let resultado = obtenerSubcadena(texto, "/*", "/*");
const isValidURL = async (urlString) => {
  try {
    var patronURL = new RegExp(
      // valida protocolo
      "^(https?:\\/\\/)?" +
        // valida nombre de dominio
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        // valida OR direccion ip (v4)
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        // valida puerto y path
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        // valida queries
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        // valida fragment locator
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!patronURL.test(urlString);
  } catch (e) {
    return false;
  }
};
module.exports = { getStringBetweenCharacters };
