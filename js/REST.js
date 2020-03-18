
const REST = {}

REST.model = {
  getList: function(list, action, from = 0, to = 10) {
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
      REST.view[action]()
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
REST.model.sendAnalyseData()

REST.controller = (function() {
  $(window).scroll(function(eventData) {
    console.log(eventData)
  })
})()

REST.view = {
  popSidePanel: function() {

  },
  error: function(e) {
    $('.error').css('visibility', 'visible')
    setTimeout(function() {
      $('.error').css('visibility', 'hidden')
    }, 3000)
  }
}
