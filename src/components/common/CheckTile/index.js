import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import ImageTile from '../ImageTile'
import VideoTile from '../VideoTile'
import ScaleContainer from '../ScaleContainer'
import CheckboxOverlay from '../CheckboxOverlay'

export default class CheckTile extends PureComponent {
  static propTypes = {
    // CheckboxOverlay
    checked: PropTypes.bool,
    onCheck: PropTypes.func,
    children: PropTypes.element,
    experiment: PropTypes.string,
    slug: PropTypes.string,
    brightcoveVideoId: PropTypes.string,
  }

  render () {
    const {
      checked,
      children,
      slug,
      brightcoveVideoId,
    } = this.props
    console.log('children: ', children)
    const experiment = 'other'
    const classNames = [
      'overlay-check',
      checked ? 'overlay-check--checked' : 'overlay-check--unchecked',
    ].join(' ')

    return (
      <ScaleContainer
        className='video-tile'
        hoverClass='video-tile--hover'
        zoomClass='video-tile--zoom'
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {experiment === 'variant' ?
        (isScaled, reverseScale) => (
          <VideoTile
            showPlayIcon={false}
            showBackgroundGradient
            slug={`/classes/${slug}`}
            brightcoveVideoId={brightcoveVideoId}
            imageUrl={
              course.images.filter(({ kind }) => kind === 'hp_tile')[0]
                .imageUrl
            }
            onClick={() => this.trackVideoTileClick(slug)}
          >
            <CheckboxOverlay checked>
              {children}
            </CheckboxOverlay>
          </VideoTile>
        ) :
        (isScaled, reverseScale) => (
          <ImageTile className={classNames} {...this.props}>
            <CheckboxOverlay checked>
              {children}
            </CheckboxOverlay>
          </ImageTile>
        )
      }
      </ScaleContainer>
    )
  }
}
