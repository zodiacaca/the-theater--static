
$(".list-item").click(function(eventData) {
  $(".slider").addClass("slider--open")
})

$("#main").click(function(eventData) {
  if (eventData.target.className === "board" || eventData.target.id === "main") {
    $(".slider").removeClass("slider--open")
  }
})

const url = "http://192.168.10.11:4000/videos/output/stream.mpd"
const player = dashjs.MediaPlayer().create()
player.initialize($("video")[0], url, false)
player.on("canPlay", function() {
  // const bitrates = player.getBitrateInfoListFor("video")
  // player.setQualityFor("video", 0)
})
