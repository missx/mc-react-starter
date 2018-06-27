const accountId = '5344802162001'
const playerId = 'rkcQq7gAe'

export default class brightcove {
  static init () {
    return new Promise((resolve) => {
      const s = document.createElement('script')
      s.src = `//players.brightcove.net/${accountId}/${
        playerId
      }_default/index.min.js`
      // Add the script tag to the document
      document.body.appendChild(s)
      s.onload = resolve
    })
  }

  static createPlayerHTML ({ id, htmlId }) {
    const playerHTML = `
      <video
        id=${htmlId}
        data-video-id="${id}"
        data-account="${accountId}"
        data-player="${playerId}"
        data-embed="default"
        class="video-js mc-brightcove-player brightcove-default-theme"
        data-application-id
        autoplay
        muted
      >
      </video>
    `
    return playerHTML
  }
}