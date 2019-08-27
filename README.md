
# Copy S3 Files 
![alt text](https://img.shields.io/npm/l/copy-s3-files?style=plastic)

NPM Module to copy S3 files across AWS accounts, uses streams under the bonnet for efficient resource utilisation - no intermediate downloads & Lambda safe!


## Installation

```$ npm install copy-s3-files```

## Options

Module requires an options object with below keys to be passed on:

```
{
  srcS3,
  destS3,
  srcBucket,
  destBucket,
  srcKey,
  destKey
}
```

*Where*:

`srcS3` - The AWS S3 instance where the source file resides

`destS3` - The AWS S3 instance where the file is to be copied

`srcBucket` - S3 bucket name where the source file resides

`destBucket` - S3 bucket name where the file is to be copied

`srcKey` - Source file key

`destKey` - Destination file key


## Usage

Module assume Read access on the `srcS3` credentials and write access on `destS3` credentials.

```
const srcAWS = require('aws-sdk')
srcAWS.config.update({
  region: SRC_REGION,
  accessKeyId: SRC_ACCESS_KEY_ID,
  secretAccessKey: SRC_SECRET_ACCESS_KEY
})

const destAWS = require('aws-sdk')
destAWS.config.update({
  region: DEST_REGION,
  accessKeyId: DEST_ACCESS_KEY_ID,
  secretAccessKey: DEST_SECRET_ACCESS_KEY
})

const srcS3 = new srcAWS.S3()
const destS3 = new destAWS.S3()

const s3Copy = require('copy-s3-files')

s3Copy({
  srcS3: srcS3,
  destS3: destS3,
  srcBucket: SRC_BUCKET_NAME,
  destBucket: DEST_BUCKET_NAME,
  srcKey: SRC_FILE_KEY,
  destKey: DEST_FILE_KEY
}).then(function() {
  console.log('Done copying file')
}).catch(function(e) {
  console.log('Error while copying file', e)
})

```
