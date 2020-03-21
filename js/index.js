
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
  const $demo = $(document.querySelector(".list ol li"))
  list.forEach((item) => {
    if (item.title != "Demo") {
      const node = document.querySelector(".list ol li").cloneNode(true)
      let $node = $(node)
      $node.find(".info-title").text(item.title)
      $node.find(".item-poster img").attr("src", item.poster)
      setTimeout(() => $node.addClass("list-item--appear"), 0)
      $node.click(function() {
        const s = item.seasons ? `&s=1&e=1` : ''
        const ova = item.OVAs ? `&ova=1&e=1` : ''
        window.location.href = `${window.location}watch?id=${item.id}${s}${ova}`
      })
      const lst = document.querySelector(".list")
      lst.appendChild($node[0])
    } else {
      $demo.click(function() {
        window.location.href = `${window.location}watch?id=${item.id}`
      })
    }
  })
  setTimeout(() => $demo.addClass("list-item--appear"), 0)
}
REST.model.getList(list, "freshList")
