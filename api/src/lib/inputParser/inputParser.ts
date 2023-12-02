import type { KinesisStreamRecordDataPayload } from '../streamProducer/streamProducer.types'

/**
 * Handles parsing the incoming JSON data from the API Gateway event body.
 */
export class InputParser {
  /**
   * Parses the request body and extracts relevant information.
   * @param body - The JSON-formatted request body.
   * @returns An object with parsed values (name, value, time).
   */
  static parseRequestBody(body: string | null): KinesisStreamRecordDataPayload {
    if (!body) {
      throw new Error('Invalid JSON-formatted request body')
    }

    const requestBody = JSON.parse(body)
    const { name, value, timestamp } = requestBody

    const processedValue = parseFloat(value)

    let processedTime = timestamp
    const dateObject: Date = new Date(timestamp)
    if (dateObject.toString() === 'Invalid Date') {
      const now = new Date()
      processedTime = now.toISOString()
    }

    return { name, value: processedValue, time: processedTime }
  }
}
