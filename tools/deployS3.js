import path from 'path'
import dotenv from 'dotenv'

import { chalkSuccess, chalkInfo, chalkError } from './chalkConfig'
import S3 from './s3'

const environment = process.env.ENV
dotenv.config({ path: path.resolve(__dirname, `../.env.${environment}`) })

if (environment) {
  // Get current branch from git
  const { exec } = require('child_process') // eslint-disable-line
  exec('git symbolic-ref --short HEAD', (err, stdout) => {
    if (err) {
      throw new Error('ERROR(git): check your local branch.')
    } else {
      const branch = stdout
      console.log(chalkInfo(`Environment: ${environment}`)) // eslint-disable-line
      console.log(chalkInfo(`Bucket to deploy: ${process.env.AWS_BUCKET}`)) // eslint-disable-line
      console.log(chalkInfo(`Branch you're in: ${branch}`)) // eslint-disable-line

      // Config readline
      const readline = require('readline') // eslint-disable-line
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })

      // Confirm deploy action
      rl.question(chalkInfo('Do you want to continue? (y/n): '), (answer) => {
        rl.close()
        if (answer === 'y') {
          console.log(chalkInfo('Deploying to AWS S3...')) // eslint-disable-line
          const client = new S3()
          client.clearBucket().then(() => {
            client.syncDir('../dist').then(() => {
              console.log(chalkSuccess('\nSUCCESS: ./dist folder was deployed to AWS S3')) // eslint-disable-line
            })
          }).catch((err) => {
            throw new Error(err)
          })
        }
      })
    }
  })
} else {
  console.error(chalkError('Failed, you must select an environment to deploy.')) // eslint-disable-line
  console.error(chalkInfo('Example: $ ENV=dev yarn deploy')) // eslint-disable-line
}
