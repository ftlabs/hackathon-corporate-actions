const AWS = require("aws-sdk");
require("dotenv").config();
const extractComments = require("./extractComments");
const extractText = require("./extractText");

var comprehend = new AWS.Comprehend({
  apiVersion: "2017-11-27",
  region: "eu-west-1"
});

async function getSentiment(textList) {
  return new Promise((resolve, reject) => {
    comprehend.batchDetectSentiment(
      {
        LanguageCode: "en",
        TextList: textList
      },
      function(err, data) {
        if (err) {
          console.log(err, err.stack); // an error occurred
          reject();
        } else {
          resolve(data);
        }
      }
    );
  });
}

async function getCommentSentiment(uuid) {
  const comments = await extractComments(uuid);
  const commentsText = comments.map(c => extractText(c)).slice(0, 25);
  const sentiment = await getSentiment(commentsText);
  return sentiment;
}

module.exports = { getCommentSentiment };
