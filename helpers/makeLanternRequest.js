const fetch = require("node-fetch");
require("dotenv").config();

function lanternApiRequest(uuid) {
  const options = {
    method: "GET",
    headers: {
      "x-api-key": process.env.LANTERN_API_KEY
    }
  };

  return fetch(
    `https://api-lantern.ft.com/realtime/articles?uuid=${uuid}&timespan=48h`,
    options
  )
    .then(d => d.json())
    .then(d => d);
}

module.exports = lanternApiRequest;
