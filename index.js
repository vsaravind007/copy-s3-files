
const uploadStream = require('./lib')

function getReadStream (s3, bucket, filePath) {
  return s3.getObject({
    Bucket: bucket,
    Key: filePath
  }).createReadStream()
}

module.exports = (options) => {
  // Validation
  if (!options.hasOwnProperty('srcS3') || options.srcS3 === null) { return Promise.reject('Missing required parameter srcS3') }
  if (!options.hasOwnProperty('destS3') || options.destS3 === null) { return Promise.reject('Missing required parameter destS3') }
  if (!options.hasOwnProperty('srcBucket') || options.srcBucket === null) { return Promise.reject('Missing required parameter srcBucket') }
  if (!options.hasOwnProperty('destBucket') || options.destBucket === null) { return Promise.reject('Missing required parameter destBucket') }
  if (!options.hasOwnProperty('srcKey') || options.srcKey === null) { return Promise.reject('Missing required parameter srcKey') }

  let sourceS3 = options.srcS3
  let destinationS3 = options.destS3
  let sourceBucket = options.srcBucket
  let destBucket = options.destBucket
  let sourceKey = options.srcKey
  let destKey = options.hasOwnProperty('destKey') && options.destKey !== null ? options.destKey : options.srcKey

  const { writableStream, s3Promise } = uploadStream({ S3: destinationS3, Bucket: destBucket, Key: destKey })

  getReadStream(sourceS3, sourceBucket, sourceKey).pipe(writableStream)

  return s3Promise
}
