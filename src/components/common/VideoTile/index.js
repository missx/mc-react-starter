import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'

import ImageTile from '../ImageTile'
import BrightcoveVideo from '../BrightCoveVideo'
import ScaleContainer from '../ScaleContainer'
import playImage from '../../../assets/play-with-circle.svg'

export default class VideoTile extends PureComponent {
  static propTypes = {
    slug: PropTypes.string.isRequired,
    brightcoveVideoId: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    saveVideoProgress: PropTypes.func,
    showPlayIcon: PropTypes.bool,
    showBackgroundGradient: PropTypes.bool,
    children: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    showPlayIcon: true,
    showBackgroundGradient: false,
    saveVideoProgress: () => {},
  }

  state = {
    startLoadingVideo: false,
    videoReady: false,
  }

  onMouseEnter = () => {
    this.setState({ startLoadingVideo: true })
  }

  onVideoReady = () => {
    this.setState({ videoReady: true })
  }

  handleClick = () => {
    if (this.props.onClick) {
      this.props.onClick()
    }
  }

  render () {
    const {
      showPlayIcon,
      showBackgroundGradient,
      slug,
      brightcoveVideoId,
      imageUrl,
      saveVideoProgress,
      children,
    } = this.props
    const { startLoadingVideo, videoReady } = this.state

    return (
      <ScaleContainer
        className='video-tile'
        hoverClass='video-tile--hover'
        zoomClass='video-tile--zoom'
        onMouseEnter={this.onMouseEnter}
      >
        {(isScaled, reverseScale) => (
          <Fragment>
            <a href={slug} onClick={this.handleClick}>
              <BrightcoveVideo
                onVideoReady={this.onVideoReady}
                startLoading={startLoadingVideo}
                show={videoReady && Boolean(isScaled)}
                videoId={brightcoveVideoId}
                saveVideoProgress={saveVideoProgress}
              />
              {!(videoReady && Boolean(isScaled)) && (
                <ImageTile
                  imageUrl={imageUrl}
                  aspectRatio='1000x609'
                  backgroundGradient={showBackgroundGradient}
                >
                  {showPlayIcon && (
                    <Fragment>
                      {!isScaled && (
                        <img
                          src={playImage}
                          className='play-center-image'
                          alt='play'
                        />
                      )}
                    </Fragment>
                  )}
                </ImageTile>
              )}
            </a>
            {children(isScaled, reverseScale)}
          </Fragment>
        )}
      </ScaleContainer>
    )
  }
}
