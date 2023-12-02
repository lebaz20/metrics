import { KinesisStreamEvent } from 'aws-lambda'
import { StreamConsumer } from './lib/streamConsumer'

/**
 * Lambda function handler that consumes records from a Kinesis stream and persist them in Timestream Table.
 * @param event - The API Gateway proxy event.
 * @returns A promise that resolves with the API Gateway proxy result.
 */
export const consumeStream = async (
  event: KinesisStreamEvent,
): Promise<void> => {
  try {
    const { TIMESTREAM_DATABASE, TIMESTREAM_RAW_TABLE, TIMESTREAM_MIN_TABLE } =
      process.env

    if (!TIMESTREAM_DATABASE) {
      throw new Error('TIMESTREAM_DATABASE environment variable is not set.')
    }
    if (!TIMESTREAM_RAW_TABLE) {
      throw new Error('TIMESTREAM_RAW_TABLE environment variable is not set.')
    }
    if (!TIMESTREAM_MIN_TABLE) {
      throw new Error('TIMESTREAM_MIN_TABLE environment variable is not set.')
    }

    for (const record of event.Records) {
      // Extract data from Kinesis record
      const data = StreamConsumer.extractData(record)

      // Write data to Timestream
      await StreamConsumer.writeDataToTimestream(data, TIMESTREAM_DATABASE, [
        TIMESTREAM_RAW_TABLE,
        TIMESTREAM_MIN_TABLE,
      ])
    }

    console.log('Records successfully put into the Timestream table')
  } catch (error) {
    console.error('Error handling the request:', error)
    throw error
  }
}
