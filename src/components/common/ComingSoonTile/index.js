import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImageTile from '../ImageTile'

class ComingSoonBadge extends PureComponent {
  render () {
    return <span className='tile__coming-soon-text'>Coming Soon</span>
  }
}

export class ComingSoonTile extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    aspectRatio: PropTypes.string,
    children: PropTypes.element,
  }

  render () {
    const { children } = this.props
    return (
      <ImageTile {...this.props}>
        <ComingSoonBadge />
        {children}
      </ImageTile>
    )
  }
}

export default ComingSoonTile
