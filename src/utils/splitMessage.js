const splitMessage = (message) => {
  try {
    let messages = message.split("********");
    return messages;
  } catch (e) {
    console.log(e);
  }
};
module.exports = { splitMessage };
