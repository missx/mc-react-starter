import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import CheckImage from '../../../assets/white-circle-check.svg'

class CheckboxOverlay extends PureComponent {
  static propTypes = {
    onCheck: PropTypes.func,
    children: PropTypes.element,
    checked: PropTypes.bool,
  }
  render () {
    const { onCheck, children, checked } = this.props

    return (
      <a
        className='tile-overlay--unchecked'
        onClick={onCheck}
      >
        {children}
        <img
          className='overlay-check__image tile-overlay--check'
          src={CheckImage}
          alt='checkmark'
        />
      </a>
    )
  }
}

export default CheckboxOverlay
