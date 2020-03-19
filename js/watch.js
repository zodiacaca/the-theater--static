
// dash
const url = "http://192.168.10.11:3000/videos/AE0WJaEh/stream.mpd"
const player = dashjs.MediaPlayer().create()
player.initialize(document.querySelector("video"), url, false)
player.on("canPlay", function() {
  // const bitrates = player.getBitrateInfoListFor("video")
  // player.setQualityFor("video", 0)
  updateInfo()
})

const updateInfo = () => {
  let speed = 'Ave. Throughput : '
  speed += Math.floor(player.getAverageThroughput('video') / 1000)
  speed += 'Kb/s'
  $(".speed span").text(speed)

  $(".1080p").addClass("quality--unavailable")
  let quality = player.getQualityFor('video')
  $(".quality-option").removeClass("quality--selected")
  if (quality === 0) {
    $(".360p").addClass("quality--selected")
  } else if (quality === 1) {
    $(".720p").addClass("quality--selected")
  }

  setTimeout(() => {
    updateInfo()
  }, 100)
}
