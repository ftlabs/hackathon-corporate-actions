const article = require("./helpers/article");

("use strict");

module.exports.main = async (event, context, callback) => {
  const data = event.queryStringParameters;

  if (data.uuid) {
    try {
      const articleText = await article.getArticleText(data.uuid);
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: articleText,
          input: event
        })
      };
      callback(null, response);
    } catch (error) {
      const response = {
        statusCode: 400,
        body: JSON.stringify({
          message: "error",
          input: event
        })
      };
      callback(null, response);
    }
  }
};
