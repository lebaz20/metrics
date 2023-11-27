#!/bin/bash

S3_PREFIX="s3://$LAMBDA_BUCKET_NAME/"

# Check if the bucket exists
if aws s3 ls "$S3_PREFIX" 2>&1 | grep -q 'NoSuchBucket'; then
  # Bucket does not exist, create it
  echo "Creating bucket: $LAMBDA_BUCKET_NAME"
  aws s3 mb "$S3_PREFIX"
fi

cd ../../src/api/
npm install -g yarn
yarn install
yarn build  # Adjust this command based on your project

# Copy files to the bucket
cd ../../dist
zip -r lambda-code.zip api/index.js
aws s3 cp lambda-code.zip s3://$LAMBDA_BUCKET_NAME/lambda-code.zip