
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

REST.view.freshList = function() {
  list.forEach((item) => {
    if (item.title != "Demo") {
      let node = $(".list ol li")[0].cloneNode(true)
      $(".list")[0].appendChild(node)
    }
  })
}
REST.model.getList(list, "freshList")
