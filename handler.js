("use strict");
const article = require("./helpers/article");
const topicExtraction = require("./helpers/topicExtraction");
const sentiment = require("./helpers/getCommentSentiment");

module.exports.main = async (event, context, callback) => {
  const data = event.queryStringParameters;

  if (data.uuid) {
    try {
      const articleText = await article.getArticleText(data.uuid);
      const topic = await topicExtraction.topicExtraction(articleText.text);
      const commentSentiment = await sentiment.getCommentSentiment(data.uuid);
      console.log(commentSentiment);

      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: { topic, commentSentiment },
          input: event
        })
      };

      callback(null, response);
    } catch (error) {
      console.log("error", error);
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
