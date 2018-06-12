import React from 'react'
import { FormattedMessage } from 'react-intl'

import Status from '../../components/routes/Status'

const NotFoundPage = () => (
  <Status code={404}>
    <div>
      <FormattedMessage id='notfound.message'>
        {text => <p>{text}</p>}
      </FormattedMessage>
    </div>
  </Status>
)

export default NotFoundPage
