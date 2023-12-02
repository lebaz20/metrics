import { KinesisStreamRecord } from 'aws-lambda/trigger/kinesis-stream'
import type { KinesisStreamRecordDataPayload } from './../streamProducer/streamProducer.types'
import TimestreamWrite from 'aws-sdk/clients/timestreamwrite'

// Set the region for the AWS SDK
// AWS.config.update({ region: 'eu-west-1' });

/**
 * Handles interactions with the AWS Timestream service.
 */
export class StreamConsumer {
  // Initialize the Timestream client
  private static timestream = new TimestreamWrite()

  /**
   * Extract data from the stream event record.
   * @param record - Stream record
   * @returns data object originally put in kinesis stream
   */
  static extractData(
    record: KinesisStreamRecord,
  ): KinesisStreamRecordDataPayload {
    // Extract data from Kinesis record
    const kinesisData: string = record.kinesis?.data || ''
    const decodedData: string = Buffer.from(kinesisData, 'base64').toString(
      'utf-8',
    )
    return JSON.parse(decodedData)
  }

  /**
   * Puts a record into the specified Timestream table.
   * @param data - The data to be stored in the record.
   * @param databaseName - The database name.
   * @param tableNames - The name of the tables to pick from.
   * @returns A promise that resolves with the result of the writeRecords operation.
   */
  static async writeDataToTimestream(
    data: KinesisStreamRecordDataPayload,
    databaseName: string,
    tableNames: string[],
  ): Promise<void> {
    // Implement logic to write data to Timestream
    const date = new Date(data.time)
    const timestamp = date.getTime()

    // Reuse same logic for multiple tables
    const tableName = data.raw === 'true' ? tableNames[0] : tableNames[1]

    // Use the timestream client to call the writeRecords API
    const params: TimestreamWrite.Types.WriteRecordsRequest = {
      DatabaseName: databaseName,
      TableName: tableName,
      Records: [
        {
          Dimensions: [
            {
              Name: 'name',
              Value: 'value',
            },
          ],
          MeasureName: data.name,
          MeasureValue: data.value.toString(),
          MeasureValueType: 'DOUBLE',
          Time: timestamp.toString(),
          TimeUnit: 'MILLISECONDS',
        },
      ],
    }

    await this.timestream.writeRecords(params).promise()
  }
}
