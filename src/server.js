const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { getArrayJSON } = require("./utils/getArrayJSON");
const fs = require("fs");
const { getAllAvailableProperties } = require("./services/alienRProperties");
const { AIModel } = require("./services/aiServices");
const { PropiedadDTOs } = require("./DTOs/PropiedadDTO");

//IAtraining
const filePath = path.join("src/IATraining", "searchPropertiesIA.txt");
const searchPropertiesIATxt = fs.readFileSync(filePath, "utf8");
const decisionsPath = path.join("src/IATraining", "decisions.txt");
const decisionsTxt = fs.readFileSync(decisionsPath, "utf8");
const greetingsPath = path.join("src/IATraining", "greetings.txt");
const greetingsTxt = fs.readFileSync(greetingsPath, "utf8");
const indirectPropertyPath = path.join(
  "src/IATraining",
  "indirectPropertyInquiry.txt"
);
const indirectPropertyInquiryTxt = fs.readFileSync(
  indirectPropertyPath,
  "utf8"
);
const outOfContextPath = path.join("src/IATraining", "outOfContext.txt");
const outOfContextTxt = fs.readFileSync(outOfContextPath, "utf8");

const alienRealtyInfoPath = path.join("src/IATraining", "alienRealtyInfo.txt");
const alienRealtyInfoTxt = fs.readFileSync(alienRealtyInfoPath, "utf8");
// Middleware para parsear JSON
app.use(express.json());
app.use(cors());
// Puerto (puedes cambiarlo por el valor de 'n' que desees)
const PORT = process.env.PORT || 3000;

// Endpoint GET simple
app.get("/", (req, res) => {
  res.send("Servidor funcionando en el puerto " + PORT);
});

// Endpoint POST
app.post("/searchPropertiesIAPowered", async (req, res) => {
  try {
    const chatSession = AIModel.startChat({
      systemInstruction: {
        parts: [{ text: decisionsTxt }],
      },
    });
    const result = await chatSession.sendMessage(req.body.message);
    console.log("result: " + result.response.text().trim());
    switch (result.response.text().trim()) {
      case "Greeting":
        const chatSession = AIModel.startChat({
          systemInstruction: {
            parts: [{ text: greetingsTxt }],
          },
        });
        const greetingsResult = await chatSession.sendMessage(req.body.message);

        return res.json(greetingsResult.response.text().trim());

      case "Direct property inquiry":
        const properties = await getAllAvailableProperties();
        const propertiesDtos = PropiedadDTOs(properties);
        const serachPropertiesInstruction = [
          "según la siguiente información, que es un array de JSON con propiedades ubicacadas en el País Costa Rica:",
          JSON.stringify(propertiesDtos),
        ].join("\n");
        // Inicia el chat con instrucciones del sistema
        const chatSessionSearchProperties = AIModel.startChat({
          systemInstruction: {
            parts: [{ text: serachPropertiesInstruction }],
          },
        });

        const searchPropertiesResult =
          await chatSessionSearchProperties.sendMessage(
            [searchPropertiesIATxt, req.body.message].join("\n")
          );

        const json = getArrayJSON(searchPropertiesResult.response.text());

        return res.json(json);

      case "Indirect property inquiry":
        // Inicia el chat con instrucciones del sistema
        const indirectProperties = await getAllAvailableProperties();
        const indirectpropertiesDtos = PropiedadDTOs(indirectProperties);
        const indirectSearchPropertiesInstruction = [
          "según la siguiente información, que es un array de JSON con propiedades ubicacadas en el País Costa Rica:",
          JSON.stringify(indirectpropertiesDtos),
        ].join("\n");
        const indirectPropertyInquiryChatSession = AIModel.startChat({
          systemInstruction: {
            parts: [{ text: indirectSearchPropertiesInstruction }],
          },
        });

        const indirectPropertyInquiryResult =
          await indirectPropertyInquiryChatSession.sendMessage(
            [searchPropertiesIATxt, req.body.message].join("\n")
          );

        const indirectJson = getArrayJSON(
          indirectPropertyInquiryResult.response.text()
        );
        return res.json(indirectJson);
      case "About AlienRealty":
        console.log("aqui");
        // Inicia el chat con instrucciones del sistema
        const alienRealtyInfoChatSession = AIModel.startChat({
          systemInstruction: {
            parts: [{ text: alienRealtyInfoTxt }],
          },
        });

        const alienRealtyInfoResult =
          await alienRealtyInfoChatSession.sendMessage(req.body.message);
        console.log(alienRealtyInfoResult.response.text().trim());

        return res.json(alienRealtyInfoResult.response.text().trim());

      case "Out of context":
        const outOfContextChatSession = AIModel.startChat({
          systemInstruction: {
            parts: [{ text: outOfContextTxt }],
          },
        });

        const outOfContextResult = await outOfContextChatSession.sendMessage(
          [req.body.message].join("\n")
        );
        return res.json(outOfContextResult.response.text());
    }
  } catch (e) {}
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
