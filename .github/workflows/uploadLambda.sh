#!/bin/bash

S3_PREFIX="s3://$LAMBDA_BUCKET_NAME/"

# Check if the bucket exists
if aws s3 ls "$S3_PREFIX" 2>&1 | grep -q 'NoSuchBucket'; then
  # Bucket does not exist, create it
  echo "Creating bucket: $LAMBDA_BUCKET_NAME"
  aws s3 mb "$S3_PREFIX"
fi

# Copy files to the bucket
cd ../../dist/api
aws s3 cp lambda-code.zip s3://$LAMBDA_BUCKET_NAME/lambda-code.zip