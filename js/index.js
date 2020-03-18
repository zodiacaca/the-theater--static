
const list = []

// slider
$(".list-item").click(function(eventData) {
  $(".slider").addClass("slider--open")
})
$(".slider").click(function(eventData) {
  $(".slider").addClass("slider--open")
})

$("#main").click(function(eventData) {
  if (!eventData.target.className.includes("list")) {
    $(".slider").removeClass("slider--open")
  }
})

REST.model.getList(list)
