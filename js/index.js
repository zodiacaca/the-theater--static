
const list = []

REST.view.beforeFetch = {}
REST.view.beforeFetch.blockElement = function(ele, loading = true) {
  const overlayString = '<div class="overlay"></div>'
  ele.insertAdjacentHTML('beforeend', overlayString)
  if (loading) {
    let ldsWrapper = ele.appendChild(document.createElement('div'))
    $(ldsWrapper).addClass("lds-ripple-wrapper")
    const loadingString = '<div class="lds-ripple"><div></div><div></div></div>'
    ldsWrapper.insertAdjacentHTML('beforeend', loadingString)
  }
}
REST.view.afterFetch = function(ele, ctn, success) {
  $(ele.closest(ctn)).find(".lds-ripple-wrappe").remove()
  if (success) {
    $(ele).find(".overlay").remove()
    $(ele.closest(ctn)).find(".info-fetch").find(".overlay").remove()
  }
}
REST.view.freshList = function() {
  list.forEach((item) => {
    if (item.title != "Demo") {
      const node = document.querySelector(".list ol li").cloneNode(true)
      let playButton = node.querySelector(".info-play-button")
      REST.view.beforeFetch.blockElement(playButton)
      let $node = $(node)
      $node.find(".info-title").text(item.title)
      $node.find(".item-poster img").attr("src", item.poster)
      setTimeout(() => $node.addClass("list-item--appear"), 0)
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
            $(episode).text(e + 1)
            REST.view.beforeFetch.blockElement(episode)
            REST.model.checkMediaFile(item.id, s + 1, e + 1, 'afterFetch', episode, 'li')
            episode.onclick = function () {
              window.location.href = `${window.location}watch?id=${item.id}&s=${s+1}&e=${e+1}`
            }
          }
        }
      } else {
        REST.model.checkMediaFile(item.id, '', '', 'afterFetch', playButton, 'li')
      }
    } else {
      let demo = document.querySelector(".list ol li")
      let playButton = demo.querySelector(".info-play-button")
      REST.view.beforeFetch.blockElement(playButton)
      REST.model.checkMediaFile(item.id, '', '', 'afterFetch', playButton, 'li')
      playButton.onclick = function () {
        window.location.href = `${window.location}watch?id=${item.id}`
      }
    }
  })
  setTimeout(() => $demo.addClass("list-item--appear"), 0)
}
REST.model.getList(list, 'freshList')
