import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { InputParser } from './lib/inputParser'
import { StreamProducer } from './lib/streamProducer'

/**
 * Lambda function handler that puts a record into a Kinesis stream.
 * @param event - The API Gateway proxy event.
 * @returns A promise that resolves with the API Gateway proxy result.
 */
export const handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const { KINESIS_STREAM_NAME } = process.env

    if (!KINESIS_STREAM_NAME) {
      throw new Error('KINESIS_STREAM_NAME environment variable is not set.')
    }

    const { body } = event
    const kinesisData = InputParser.parseRequestBody(body)

    // Put record into the Kinesis stream
    const result = await StreamProducer.putRecord(
      kinesisData,
      kinesisData.name,
      KINESIS_STREAM_NAME,
    )

    console.log('Record successfully put into the Kinesis stream:', result)

    return {
      statusCode: 200,
      body: JSON.stringify('Record put into Kinesis successfully.'),
    }
  } catch (error) {
    console.error('Error handling the request:', error)

    let errorMessage = 'An unknown error occurred'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error handling the request.',
        error: errorMessage,
      }),
    }
  }
}
