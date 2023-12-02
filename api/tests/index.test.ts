import { APIGatewayProxyEvent } from 'aws-lambda'
import { postRecord } from '..' // Replace with the correct import path

// Import mock data
import sampleEvent from './fixtures/sampleEvent.json'

// Mock StreamProducer
jest.mock('../src/lib/streamProducer/streamProducer', () => {
  return {
    StreamProducer: {
      putRecord: jest.fn(() => Promise.resolve('Mocked result')),
    },
  }
})

describe('Metrics postRecord Lambda Function Test', () => {
  it('should successfully handle the request', async () => {
    // Define a sample event for testing
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify(sampleEvent),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any // 'as any' to avoid TypeScript complaints for simplicity

    // Mock the environment variable
    process.env.KINESIS_STREAM_NAME = 'YourKinesisStreamName'

    // Execute the Lambda handler
    const result = await postRecord(event)

    // Assert the result
    expect(result.statusCode).toBe(200)
    expect(JSON.parse(result.body)).toEqual(
      'Record put into Kinesis successfully.',
    )
  }, 15000)

  it('should handle errors', async () => {
    // Define a sample event for testing
    const event: APIGatewayProxyEvent = {
      body: 'Invalid JSON',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any // 'as any' to avoid TypeScript complaints for simplicity

    // Execute the Lambda handler
    const result = await postRecord(event)

    // Assert the result
    expect(result.statusCode).toBe(500)
    expect(JSON.parse(result.body).message).toEqual(
      'Error handling the request.',
    )
  })
})
