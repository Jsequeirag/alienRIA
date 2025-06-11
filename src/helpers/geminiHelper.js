import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAAkZtUUpr1CANbqkZJVkqhx-vNbi4aMS8");
// Initialize GoogleAIFileManager with your API_KEY.
export const AIModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});
/*await axios
  .get(
    "https://alienrealty-backend-e9f2c9grecgjcjbz.centralus-01.azurewebsites.net/api/PropertyListing/get-all-properties"
  )
  .then((res) => {
    var propiedades = PropiedadDTOs(res.data);
    AIModel.systemInstruction = {
      parts: {
        text: [
          "segun la siguiente informacion, que es un array de JSON:",
          JSON.stringify(propiedades)
            .replaceAll("\\r\\n", "")
            .replaceAll("\\", ""),
          " .Generar un mensaje personalizado para whatsapp con emojis(no colocar emoji  a fotos), dar un propiedad según la pregunta, considerar la siguiente información: title, description, details, dimension, services, amenities, address_Description, realtorFullName , realtorPhone,photo. Generar un mensaje solamente con los siguiente parametros: el título, descrición, servicios, address_Description, detalles(excluir los {}) , contactos. al final del mensaje agregar un link: de la  siguiente forma: https://alienrealtyhub-e4bdecd9adcfd3fb.centralus-01.azurewebsites.net/properties/property-detail/id_Property, sustituya el id_Property por el id_Property de la propiedad",
          " .Tambien agregar valor de la photo entre estos simbolos {}",
          " .Sino se encuentra una propiedad, enviar un mensaje personalizado ,donde no se encontro la propiedad en la base de datos y  diciendo consideracion de como buscar una propiedad",
        ].join("\n"),
      },
    };
  });*/
