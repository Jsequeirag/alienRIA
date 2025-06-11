const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAAkZtUUpr1CANbqkZJVkqhx-vNbi4aMS8");
// Initialize GoogleAIFileManager with your API_KEY.
const AIModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});
module.exports = { AIModel };
