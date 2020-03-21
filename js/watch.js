
// dash
const getManifest = () => {
  const prot = window.location.protocol
  const host = window.location.host
  const id = $('video').attr('id')
  const s = $('video').attr('s') ? `${$('video').attr('s')}/` : ''
  const ova = $('video').attr('ova') ? `${$('video').attr('ova')}/` : ''
  const e = $('video').attr('e') ? `${$('video').attr('e')}/` : ''

  let manifest = `${prot}//${host}/videos/${id}/${s}${ova}${e}stream.mpd`

  return manifest
}

const url = getManifest()
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
