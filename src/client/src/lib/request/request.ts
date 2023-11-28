import axios from 'axios'

/**
 * Handles interactions with the API.
 */

/**
 * Posts a record into the API.
 * @param name - name field.
 * @param value - value field.
 * @returns A promise that resolves with the result of the putRecord operation.
 */
export async function postRecord(
  name: string,
  value: number,
): Promise<unknown> {
  try {
    const url = 'https://metrics-demo-api.execute-api.eu-west-1.amazonaws.com/prod/metric' // Replace with your API endpoint
    const { data } = await axios.post(url, {
      name,
      value,
      timestamp: new Date().toISOString(),
    })
    return data
  } catch (error) {
    console.error('Error submitting data:', error)
    if (error instanceof Error) {
      return { message: error.message }
    }
  }
}
