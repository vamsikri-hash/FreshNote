$(document).ready(function () {
  app
    .initialized()
    .then(function (_client) {
      window.client = _client;
      client.instance
        .context()
        .then(function (context) {
          showNotes(context.data);
          $("#deleteNote").click(function () {
            console.log("here del clicked");
            deleteNotes(context.data);
          });
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
      html = `<h3>${data.title}</h3><p>${data.description}</p>`;
      $("#modal").append(html);
      console.log(data);
    })
    .catch(function (error) {
      console.error(error);
    });
}

/**
 * Function to delete note drom db
 */

function deleteNotes(ticket) {
  console.log("clicked");
  var ticketId = ticket.id;
  client.db
    .delete(ticketId)
    .then(function (data) {
      showNotification("success", "Hey", "Successfully deleted note!");
    })
    .catch(function (error) {
      console.error(error);
    });
}

/**
 * Show notifications using notification API
 * @param {String} type
 * @param {String}  title
 * @param {String} message
 */

function showNotification(type, title, message) {
  client.interface
    .trigger("showNotify", {
      type: `${type}`,
      title: `${title}`,
      message: `${message}`,
    })
    .catch(function (error) {
      console.error("Notification error", error);
    });
}
