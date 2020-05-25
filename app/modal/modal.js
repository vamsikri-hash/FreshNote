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
      var len = Object.keys(data).length;
      console.error(len);
      for (var key in data) {
        var note = data[key];
        var html = "";
        html = `<h3><strong>Title:</strong> <br/>${note.title}</h3><h3><strong>Description:</strong></h3><h4>${note.description}</h4><button id="deleteNote-${key}" class="btn btn-primary">Delete</button> <span class="date">Created On:${note.createdon}</span>`;
        $("#modal").append(html);
        $(`#deleteNote-${key}`).click(function () {
          console.log("here del clicked");
          deleteNotes(ticket, key, len);
          console.log("Afetr del");
        });
      }
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

function deleteNotes(ticket, key, len) {
  var ticketId = ticket.id;
  if (len === 0) {
    client.db
      .delete(ticketId)
      .then(function (data) {
        console.info(data);
        location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
  } else {
    console.log("here");
    client.db
      .update(ticketId, "remove", [key])
      .then(function (data) {
        console.info(data);
        location.reload();
      })
      .catch(function (error) {
        console.error(error);
      });
  }
}
