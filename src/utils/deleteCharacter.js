const deleteCharacter = (string, character) => {
  const nuevaCadena = string.replaceAll(character, "");
  return nuevaCadena;
};
/*function borrarCadena(cadenaOriginal, cadenaABorrar) {
  // Utiliza el método replaceAll para reemplazar todas las ocurrencias de la cadena a borrar con una cadena vacía
  const nuevaCadena = cadenaOriginal.replaceAll(cadenaABorrar, "");
  return nuevaCadena;
}*/
module.exports = { deleteCharacter };
