#!/bin/bash

index_document="index.html"

# Check if the bucket already exists
if aws s3api head-bucket --bucket "$ASSETS_BUCKET_NAME" 2>/dev/null; then
    echo "Bucket $ASSETS_BUCKET_NAME already exists."
else
    # Create the S3 bucket
    aws s3api create-bucket --bucket "$ASSETS_BUCKET_NAME" --create-bucket-configuration LocationConstraint="$REGION"
    echo "Bucket $ASSETS_BUCKET_NAME created at $REGION."

    # Enable static website hosting
    aws s3api put-bucket-website --bucket "$ASSETS_BUCKET_NAME" --region "$REGION" --website-configuration '{
        "IndexDocument": {
            "Suffix": "'"$index_document"'"
        }
    }'
    echo "Static website hosting enabled for $ASSETS_BUCKET_NAME."

    # Configure bucket policy for public access
    policy='{
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Principal": "*",
                "Action": "s3:GetObject",
                "Resource": "arn:aws:s3:::'"$bucket_name"'/*"
            }
        ]
    }'
    aws s3api put-bucket-policy --bucket "$ASSETS_BUCKET_NAME" --region "$REGION" --policy "$policy"
    echo "Bucket policy configured for public access."
fi

cd ../../src/client/
yarn install
yarn build  # Adjust this command based on your project

# Copy files to the bucket
cd ../../dist
aws s3 cp client s3://$ASSETS_BUCKET_NAME/ --region "$REGION" --recursive