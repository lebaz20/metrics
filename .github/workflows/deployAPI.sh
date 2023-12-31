#!/bin/bash

S3_PREFIX="s3://$LAMBDA_BUCKET_NAME/"

# Check if the bucket exists
if aws s3 ls "$S3_PREFIX" --region "$REGION" 2>&1 | grep -q 'NoSuchBucket'; then
  # Bucket does not exist, create it
  echo "Creating bucket: $S3_PREFIX"
  aws s3 mb "$S3_PREFIX" --region "$REGION"
fi

cd ../../api/
yarn install
yarn build  # Adjust this command based on your project

# Copy files to the bucket
cd ../dist/api
zip -r lambda-code-$LAMBDA_CODE_VERSION.zip ./
aws s3 rm s3://$LAMBDA_BUCKET_NAME --recursive
aws s3 cp lambda-code-$LAMBDA_CODE_VERSION.zip s3://$LAMBDA_BUCKET_NAME/lambda-code-$LAMBDA_CODE_VERSION.zip --region "$REGION"