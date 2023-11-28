#!/bin/bash

REGION="your-region"
index_document="index.html"

# Check if the bucket already exists
if aws s3api head-bucket --bucket "$ASSETS_BUCKET_NAME" 2>/dev/null; then
    echo "Bucket $ASSETS_BUCKET_NAME already exists."
else
    # Create the S3 bucket
    aws s3api create-bucket --bucket "$ASSETS_BUCKET_NAME" --region "$REGION"
    echo "Bucket $ASSETS_BUCKET_NAME created."

    # Enable static website hosting
    aws s3api put-bucket-website --bucket "$ASSETS_BUCKET_NAME" --website-configuration '{
        "IndexDocument": {
            "Suffix": "'"$index_document"'"
        }
    }'
    echo "Static website hosting enabled for $ASSETS_BUCKET_NAME."
fi

cd ../../src/client/
yarn install
yarn build  # Adjust this command based on your project

# Copy files to the bucket
cd ../../dist
aws s3 cp client/* s3://$ASSETS_BUCKET_NAME/