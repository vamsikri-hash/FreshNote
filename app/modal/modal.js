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
      html = `<h3><strong>Title:</strong><br/>${data.title}</h3><h3><strong>Description:</strong></h3><p>${data.description}</p><button id="deleteNote" class="btn btn-primary">Delete</button>`;
      $("#modal").append(html);
      console.log(data);
      $("#deleteNote").click(function () {
        console.log("here del clicked");
        deleteNotes(ticket);
        console.log("Afetr del");
      });
    })
    .catch(function (error) {
      console.error(error);
      var html = "";
      html = `<h3>No notes to show</h3>`;
      $("#modal").append(html);
    });
}

/**
 * Function to delete note drom db
 */

function deleteNotes(ticket) {
  var ticketId = ticket.id;
  client.db
    .delete(ticketId)
    .then(function (data) {
      console.log("tick dleted");
      location.reload();
    })
    .catch(function (error) {
      console.error(error);
    });
}
