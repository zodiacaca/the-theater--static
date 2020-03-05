
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

// dash
const url = "http://192.168.10.11:3000/videos/output/stream.mpd"
const player = dashjs.MediaPlayer().create()
player.initialize($("video")[0], url, false)
player.on("canPlay", function() {
  // const bitrates = player.getBitrateInfoListFor("video")
  // player.setQualityFor("video", 0)
  updateInfo()
})

const updateInfo = () => {
  let speed = 'Ave. Throughput : '
  speed += Math.floor(player.getAverageThroughput('video') / 1000)
  speed += 'Kb/s'
  $(".speed span")[0].innerHTML = speed

  let quality = player.getQualityFor('video')
  if (quality === 0) {

  } else if (quality === 1) {

  }

  setTimeout(() => {
    updateInfo()
  }, 100)
}
