$(document).ready(function () {
  app
    .initialized()
    .then(function (_client) {
      window.client = _client;
      client.instance
        .context()
        .then(function (context) {
          showNotes(context.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    })
    .catch(function (error) {
      console.error(error);
    });
});

/**
 * After Modal triggered display notes
 */

function showNotes(ticket) {
  var ticketId = ticket.id;
  client.db
    .get(ticketId)
    .then(function (data) {
      var html = "";
      html = `<h3>${data.title}</h3><p>${data.description}</p><button class="btn btn-primary">Delete</button>`;
      $("#modal").append(html);
      console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
