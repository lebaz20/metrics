import type { KinesisStreamRecordDataPayload } from '../streamProducer/streamProducer.types'
import * as AWS from 'aws-sdk'
import { PromiseResult } from 'aws-sdk/lib/request'

// Set the region for the AWS SDK
// AWS.config.update({ region: 'eu-west-1' });

/**
 * Handles interactions with the AWS Kinesis service.
 */
export class StreamProducer {
  private static kinesis = new AWS.Kinesis()

  /**
   * Puts a record into the specified Kinesis stream.
   * @param data - The data to be stored in the record.
   * @param partitionKey - The partition key for the record.
   * @param streamArn - The ARN of the Kinesis stream.
   * @returns A promise that resolves with the result of the putRecord operation.
   */
  static async putRecord(
    data: KinesisStreamRecordDataPayload,
    partitionKey: string,
    streamArn: string,
  ): Promise<PromiseResult<AWS.Kinesis.PutRecordOutput, AWS.AWSError>> {
    const params: AWS.Kinesis.PutRecordInput = {
      Data: JSON.stringify(data),
      PartitionKey: partitionKey,
      StreamName: streamArn,
    }

    return this.kinesis.putRecord(params).promise()
  }
}
