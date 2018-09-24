var qs = require("querystring");
var rp = require("request-promise");
var fs = require("fs");

async function topicExtraction(articleText) {
  var options = {
    method: "POST",
    url: "https://api.meaningcloud.com/topics-2.0",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      key: process.env.MEANING_CLOUD_API_KEY,
      lang: "en",
      txt: articleText,
      tt: "a"
    }
  };

  const data = await rp(options);

  return JSON.parse(data)
    .entity_list.filter(function(companies) {
      return companies.relevance > 75;
    })
    .map(function(obj) {
      return { company: obj.form, relevance: obj.relevance };
    });
}

module.exports = { topicExtraction };
