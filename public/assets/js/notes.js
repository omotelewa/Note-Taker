
var title;
var body;
renderNotes();

function renderNotes() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(response => {
    console.log("DB Notes: ", response);
    response.forEach(notes => {
      const data = `<div id=${notes.id} class="noteDiv">
                        <h5>${notes.title}</h5>
                        <h6>${notes.body}</h6>
                        <button class="deleteBtn">Delete</button></>
                        <button class="editBtn">Edit</button>
                    </div>`
      $("#savedNotes").append(data);
    });
  });
};

$(document).on("click", "#takeNotes", function () {

  title = $(this).siblings(".textTitle").val();
  body = $(this).siblings(".textBody").val();

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: {
      title: $(this).siblings(".textTitle").val(),
      body: $(this).siblings(".textBody").val()
    }
  }).then(() => location.reload());
});

$(document).on("click", ".editBtn", function () {

  const notes = $(this).parents(".noteDiv");
  
  const data = `<input class="editTitle" value=${notes.find("h5").text()}>
                <textarea class="editBody">${notes.find("h6").text()}</textarea>
                <a href="/notes"><button class="cancelBtn">Cancel</button></a>
                <button class="updateBtn">Update</button>`;
  notes.html(data);
});

$(document).on("click", ".deleteBtn", function () {
  
  $.ajax({
    url: "/api/notes/" + $(this).parent(".noteDiv").attr("id"),
    method: "DELETE"
  })
  .then(()=>location.reload());
})

$(document).on("click", ".updateBtn", function () {

  const parent = $(this).parents(".noteDiv");

  $.ajax({
    url: "/api/notes/" + parent.attr("id"),
    method: "PUT",
    data: {
      title: parent.find(".editTitle").val().trim(),
      body: parent.find(".editBody").val().trim()
    }
  }).then(()=>location.reload());
});