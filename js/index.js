
// dictionaries
const covers = {
  1: {
    img: "/images/miss-sloane.jpg",
    bg: "linear-gradient(90deg, blue, transparent)"
  },
  2: {
    img: "/images/miss-sloane.jpg",
    bg: "linear-gradient(90deg, blue, transparent)"
  },
}

// board


// slider
$(".list-item").click(function(eventData) {
  $(".slider").addClass("slider--open")
})

$("#main").click(function(eventData) {
  if (eventData.target.className.includes("board-ctn")) {
    $(".slider").removeClass("slider--open")
  }
})

// dash
const url = "http://192.168.10.11:4000/videos/output/stream.mpd"
const player = dashjs.MediaPlayer().create()
player.initialize($("video")[0], url, false)
player.on("canPlay", function() {
  // const bitrates = player.getBitrateInfoListFor("video")
  // player.setQualityFor("video", 0)
})
