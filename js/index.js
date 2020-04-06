
const list = []

REST.view.beforeFetch = {}
REST.view.beforeFetch.blockElement = function(ele, loading = true) {
  $(ele).addClass("unavailable")

  if (loading) {
    let ldsWrapper = ele.appendChild(document.createElement('div'))
    $(ldsWrapper).addClass("lds-ripple-wrapper")
    const loadingString = '<div class="lds-ripple"><div></div><div></div></div>'
    ldsWrapper.insertAdjacentHTML('beforeend', loadingString)
    const w = 100
    const s = ele.offsetHeight / w
    ele.querySelector(".lds-ripple-wrapper").style.transform = `translateX(-${w*0.5}px) scale(${s}, ${s})`
  }
}
REST.view.afterFetch = function(ele, ctn, success) {
  if (success) {
    $(ele.closest(ctn)).find(".info-play-button").removeClass("unavailable")
    $(ele).removeClass("unavailable")
  }
  $(ele.closest(ctn)).find(".info-play-button").find(".lds-ripple-wrapper").remove()
  $(ele).find(".lds-ripple-wrapper").remove()
}
REST.view.checkMedia = function() {
  $(".list ol li").each(function(i) {
    let playButton = this.querySelector(".info-play-button")
    REST.view.beforeFetch.blockElement(playButton)

    const item = list[i]
    $(this).find(".info-season").each(function(s) {
      $(this).find(".info-episode").each(function(e) {
        REST.view.beforeFetch.blockElement(this)
        REST.model.checkMediaFile(item.id, s + 1, e + 1, 'afterFetch', this, 'li')
      })
    })
    if (!item.seasons) {
      REST.model.checkMediaFile(item.id, '', '', 'afterFetch', playButton, 'li')
    }

    setTimeout(() => $(this).addClass("list-item--appear"), 0)
  })
}
REST.view.freshList = function() {
  list.forEach((item) => {
    if (item.title != "Demo") {
      let node = document.querySelector(".list ol li").cloneNode(true)
      let playButton = node.querySelector(".info-play-button")
      let $node = $(node)
      $node.find(".info-title").text(item.title)
      $node.find(".item-poster img").attr("src", item.poster)
      playButton.onclick = function () {
        const s = item.seasons ? `&s=1&e=1` : ''
        const ova = item.OVAs ? `&ova=1&e=1` : ''
        window.location.href = `${window.location}watch?id=${item.id}${s}${ova}`
      }
      const lst = document.querySelector(".list ol")
      lst.appendChild($node[0])

      if (item.seasons) {
        for (let s = 0; s < item.seasons.length; s++) {
          let episodes = node.querySelector(".info-episodes")
          let season = episodes.appendChild(document.createElement('div'))
          $(season).addClass("info-season")
          let header = season.appendChild(document.createElement('h3'))
          $(header).text(`第${s+1}季`)
          let separate = season.appendChild(document.createElement('div'))
          $(separate).addClass("separator")
          for (let e = 0; e < item.seasons[s]; e++) {
            let episode = season.appendChild(document.createElement('button'))
            $(episode).addClass("info-episode")
            $(episode).addClass("info-fetch")
            let num = episode.appendChild(document.createElement('span'))
            $(num).text(e + 1)
            episode.onclick = function () {
              window.location.href = `${window.location}watch?id=${item.id}&s=${s+1}&e=${e+1}`
            }
          }
        }
      }
    } else {
      document.querySelector(".info-play-button").onclick = function () {
        window.location.href = `${window.location}watch?id=${item.id}`
      }
    }
  })

  REST.view.checkMedia()
}
REST.model.getList(list, 'freshList')
