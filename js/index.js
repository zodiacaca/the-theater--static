
$(".list-item").click(function(eventData) {
  $(".slider").addClass("slider--open")
})

$("#main").click(function(eventData) {
  if (eventData.target.className === "board" || eventData.target.id === "main") {
    $(".slider").removeClass("slider--open")
  }
})
