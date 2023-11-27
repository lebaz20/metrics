import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from '..' // Replace with the correct import path

// Import mock data
import sampleEvent from './mocks/data/sampleEvent.json'

// Mock StreamProducer
jest.mock('../lib/streamProducer/streamProducer', () => {
  return {
    StreamProducer: {
      putRecord: jest.fn(() => Promise.resolve('Mocked result')),
    },
  }
})

describe('Metrics Lambda Function Test', () => {
  it('should successfully handle the request', async () => {
    // Define a sample event for testing
    const event: APIGatewayProxyEvent = {
      body: JSON.stringify(sampleEvent),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any // 'as any' to avoid TypeScript complaints for simplicity

    // Mock the environment variable
    process.env.KINESIS_STREAM_ARN = 'YourKinesisStreamARN'

    // Execute the Lambda handler
    const result = await handler(event)

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
    const result = await handler(event)

    // Assert the result
    expect(result.statusCode).toBe(500)
    expect(JSON.parse(result.body).message).toEqual(
      'Error handling the request.',
    )
  })
})
