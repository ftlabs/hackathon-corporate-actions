const fetch = require("node-fetch");

function getCommentsFromUUID(uuid) {
  const commentsList = [];
  fetch(`http://comment-creation.webservices.ft.com/v1/getComments?articleId=${uuid}&url=https%3A%2F%2Fwww.ft.com%2Fcontent%2F${uuid}&title=test`)
  .then(d => d.json())
  .then(d => {
    for (let i = 0; i < d.collection.comments.length; i ++) {
      const commentText = d.collection.comments[i].content;
      commentsList.push(commentText);
    }
    return commentsList;
  })
  .catch(e => console.log(e));
}
