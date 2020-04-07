
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

  player.updateSettings({
    streaming: {
      fastSwitchEnabled: true,
      stableBufferTime: 240,
      bufferTimeAtTopQualityLongForm: 240,
    }
  })

  const qualityOption = document.getElementsByClassName("quality-option")
  for (const key in qualityOption) {
    qualityOption[key].onclick = function () {
      if ($(this).hasClass("quality--selected")) {
        player.updateSettings({
          streaming: {
            abr: {
              autoSwitchBitrate: { audio: true, video: true }
            }
          }
        })
        $(this).removeClass("quality--selected")
      } else {
        $(".quality-option").removeClass("quality--selected")
        player.updateSettings({
          streaming: {
            abr: {
              autoSwitchBitrate: { audio: true, video: false }
            }
          }
        })
        player.setQualityFor('video', $(".quality-option").length - $(this).index())
        $(this).addClass("quality--selected")
      }
    }
  }
})

const updateInfo = () => {
  let speed = 'Ave. Throughput : '
  speed += Math.floor(player.getAverageThroughput('video') / 1000)
  speed += 'Kb/s'
  $(".speed span").text(speed)

  $(".q-1080p").addClass("quality--unavailable")
  const indicator = document.querySelector(".quality-indicator")
  const qIndex = player.getQualityFor('video')
  const quality = {
    0: document.querySelector(".q-360p"),
    1: document.querySelector(".q-720p"),
    2: document.querySelector(".q-1080p"),
  }
  indicator.style.left = (quality[qIndex].offsetLeft + quality[qIndex].clientWidth * 0.4) + "px"

  setTimeout(() => {
    updateInfo()
  }, 100)
}
