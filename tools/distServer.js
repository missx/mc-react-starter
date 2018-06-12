/* eslint no-console: 0 */

import path from 'path'
import express from 'express'
import opn from 'opn'
import historyApiFallback from 'connect-history-api-fallback'

import { chalkInfo, chalkProcessing } from './chalkConfig'

console.log(chalkProcessing('Opening production build...'))

const port = 8000
const app = express()

app.use(historyApiFallback())
app.get(/\.js$|\.css$/, (req, res, next) => {
  res.set('Content-Encoding', 'gzip')
  next()
})

app.use(express.static(path.join(__dirname, '/../dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(
    chalkInfo(`==> Listening on port ${port}. Open up http://0.0.0.0:${port}/ in your browser.`),
  )
  opn(`http://localhost:${port}`)
})
