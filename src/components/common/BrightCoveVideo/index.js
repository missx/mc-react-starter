import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'

import brightcove from '../../../utils/brightcove'

export default class BrightcoveVideo extends Component {
  static propTypes = {
    videoId: PropTypes.string.isRequired,
    onVideoReady: PropTypes.func.isRequired,
    saveVideoProgress: PropTypes.func.isRequired,
    show: PropTypes.bool,
    startLoading: PropTypes.bool,
    muted: PropTypes.bool,
  }

  static defaultProps = {
    show: false,
    startLoading: false,
    muted: false,
  }

  state = {
    opacity: 0,
    myPlayer: undefined,
    readyToPlay: false,
  }

  videoContainer = React.createRef()

  componentWillReceiveProps (nextProps) {
    const { myPlayer, readyToPlay } = this.state
    const { show, startLoading, saveVideoProgress } = this.props
    const shouldShow = !show && nextProps.show
    const shouldHide = show && !nextProps.show
    const shouldStartLoading = !startLoading && nextProps.startLoading
    if (shouldStartLoading) {
      if (!myPlayer) {
        this.createPlayer()
      }
    }
    if (shouldShow) {
      if (myPlayer && readyToPlay) {
        this.setState({ opacity: 1 })
        myPlayer.play()
        myPlayer.show()
      }
    } else if (shouldHide && myPlayer) {
      this.setState({ opacity: 0 })
      // prettier-ignore
      const progress = (myPlayer.currentTime() * 100) / myPlayer.duration()
      saveVideoProgress(progress)
      myPlayer.pause()
      myPlayer.hide()
    }
  }

  createPlayer = () => {
    const { videoId, onVideoReady, muted } = this.props
    const videoHtmlId = `video-${videoId}-${uuid()}`
    const playerHTML = brightcove.createPlayerHTML({
      id: videoId,
      htmlId: videoHtmlId,
      muted,
    })
    this.videoContainer.current.innerHTML = playerHTML
    brightcove.init().then(() => {
      const { videojs } = window
      const myPlayer = videojs(videoHtmlId)
      myPlayer.ready(() => {
        myPlayer.on('loadedmetadata', () => {
          myPlayer.currentTime(0)
          this.setState({ myPlayer })
        })
        myPlayer.on('canplay', () => {
          onVideoReady()
          myPlayer.play()
          this.setState({ opacity: 1, readyToPlay: true })
        })
      })
    })
  }

  render () {
    const { show } = this.props
    const { opacity } = this.state

    return (
      <div
        className='tile tile--1000x609 tile--no-hover'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div
          ref={this.videoContainer}
          className='mc-brightcove-container'
          style={{
            opacity,
            transition: 'opacity .75s',
          }}
        />
      </div>
    )
  }
}
