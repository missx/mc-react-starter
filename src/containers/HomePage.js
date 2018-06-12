import React, { PureComponent } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { RoundedBox } from 'mc-components'

import logo from '../assets/masterclass-logo.svg'

class HomePage extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  render () {
    const { intl } = this.props

    return (
      <div className='home-page'>
        <img className='logo' src={logo} alt='logo' />
        <RoundedBox
          header={intl.formatMessage({ id: 'home.header' })}
          subheader={intl.formatMessage({ id: 'home.subheader' })}
        >
          <FormattedMessage id='home.welcome'>
            {text => <p>{text}</p>}
          </FormattedMessage>
        </RoundedBox>
      </div>
    )
  }
}

export default injectIntl(HomePage)
