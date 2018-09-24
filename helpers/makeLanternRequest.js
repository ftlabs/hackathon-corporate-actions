const fetch = require("node-fetch");
require('dotenv').config()

function lanternApiRequest(uuid) {
  const options = {
    method: "GET",
    headers: {
      "x-api-key": process.env.LANTERN_API_KEY,
    }
  };

  return fetch(`https://api-lantern.ft.com/realtime/articles?uuid=${uuid}&timespan=48h`, options)
    .then(d => d.json())
    .then(d => d);
}

lanternApiRequest('fc7ae0e4-bfc3-11e8-95b1-d36dfef1b89a');
