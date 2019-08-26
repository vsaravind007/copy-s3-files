const stream = require('stream')

const uploadStream = ({ S3, Bucket, Key }) => {
  const pass = new stream.PassThrough()
  return {
    writableStream: pass,
    s3Promise: S3.upload({ Bucket, Key, Body: pass }).promise()
  }
}

module.exports = uploadStream
