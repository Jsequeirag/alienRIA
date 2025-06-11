const axios = require("axios");
const getAllAvailableProperties = async () => {
  const fetch = await axios.get(
    "https://alienrealty-backend-e9f2c9grecgjcjbz.centralus-01.azurewebsites.net/api/PropertyListing/get-all-properties"
  );
  return fetch.data;
};
module.exports = { getAllAvailableProperties };
