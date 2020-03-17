
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


// REST
const REST = {}

REST.model = {
  getList: function(from = 0, to = 10) {
    const ajax_options = {
      type: 'GET',
      url: `feed/titles?from=${from}&to=${to}`,
      accepts: 'application/json',
      dataType: 'json',
    }
    $.ajax(ajax_options)
    .done(function(data) {
      data.titles.forEach((title) => {
        list.push(title)
      })
    })
    .fail(function(xhr, textStatus, errorThrown) {

    })
  },
  sendAnalyseData: function() {
    const browserInfo = {
      agent: navigator.userAgent,
      version: navigator.appVersion,
    }
    const ajax_options = {
      type: 'PUT',
      url: 'performance_analyse',
      contentType: 'application/json',
      data: JSON.stringify(browserInfo),
    }
    $.ajax(ajax_options)
    .done(function(data) {

    })
    .fail(function(xhr, textStatus, errorThrown) {

    })
  },
}
REST.model.getList()
REST.model.sendAnalyseData()

REST.controller = (function() {
  $(window).scroll(function(eventData) {
    console.log(eventData)
  })
})()

REST.view = {
  freshList: function() {

  },
  popSidePanel: function() {

  },
  error: function(e) {
    $('.error').css('visibility', 'visible')
    setTimeout(function() {
      $('.error').css('visibility', 'hidden')
    }, 3000)
  }
}
