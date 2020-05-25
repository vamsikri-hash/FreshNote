$(document).ready(function () {
  app
    .initialized()
    .then(function (_client) {
      window.client = _client;
      console.log("App Started");
      onLoadClickEventHandler();
    })
    .catch(function (error) {
      console.error(error);
    });
});

// Event handler for createNote
function onLoadClickEventHandler() {
  $("#createNote").click(function () {
    createNote();
  });

  $("#noteModal").click(function () {
    viewNotes();
  });
}

/** create Note */
function createNote() {
  getTicketDetails(
    function fetchNotes(ticketData) {
      var ticketId = ticketData.ticket.id;
      console.info(ticketId);
      client.db
        .get(ticketId)
        .then(function (data) {
          console.log(data);
          var newArr = Object.values(data);
          console.log(newArr);
          var title = $("#title").val();
          var description = $("#description").val();
          if (title && description) {
            var data = {
              title: `${title}`,
              description: `${description}`,
              createdon: new Date().toDateString(),
            };
            console.info([...newArr, data]);
            client.db
              .set(ticketId, [...newArr, data])
              .then(function () {
                showNotification("success", "Hey", "Note stored successfully");
              })
              .catch(function (error) {
                console.error(error);
                showNotification("danger", "Hey", "Something went wrong");
              });
            clearInput();
            console.log(title);
          } else {
            showNotification("danger", "Hey", "Empty params not allowed");
          }
        })
        .catch(function (error) {
          if (error.status == 404) {
            console.log(ticketData);
            //createNoteOnTicket(ticketData.ticket.id);
            var title = $("#title").val();
            var description = $("#description").val();
            if (title && description) {
              var data = {
                title: `${title}`,
                description: `${description}`,
                createdon: new Date().toDateString(),
              };
              client.db
                .set(ticketId, [data])
                .then(function () {
                  showNotification(
                    "success",
                    "Hey",
                    "Note stored successfully"
                  );
                })
                .catch(function (error) {
                  console.error(error);
                  showNotification("danger", "Hey", "Something went wrong");
                });
              clearInput();
              console.log(title);
            } else {
              showNotification("danger", "Hey", "Empty params not allowed");
            }
          }
          console.error(error);
        });
    },
    function (error) {
      console.error("Error Occurred:", error);
    }
  );
}

/**
 * function to show modal
 */

function viewNotes() {
  getTicketDetails(
    function (ticketData) {
      client.interface.trigger("showModal", {
        title: "Notes of ticket",
        template: "./modal/modal.html",
        data: ticketData.ticket,
      });
    },
    function (error) {
      console.error(error);
    }
  );
}

/**
 * get ticket details upon success execute callbacks
 * @param {function}  success callback if ticket details fetched correctly
 * @param {function}  error callback
 */

function getTicketDetails(success, failure) {
  client.data.get("ticket").then(success).catch(failure);
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

/**
 * clear fields after the click
 */

function clearInput() {
  $("#title").val("");
  $("#description").val("");
}
