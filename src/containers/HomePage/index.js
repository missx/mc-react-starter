import React, { PureComponent } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { RoundedBox } from 'mc-components'

import Logo from '../../components/common/Logo'

class HomePage extends PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  render () {
    const { intl } = this.props

    return (
      <div className='home-page'>
        <Logo />
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
