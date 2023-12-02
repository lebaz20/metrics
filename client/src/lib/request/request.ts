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
    // Get the current URL search parameters
    const searchParams = new URLSearchParams(window.location.search)

    // Get the value of a specific query parameter
    const apiURL = searchParams.get('api-url')

    if (!apiURL) {
      throw new Error('No API URL')
    }

    const url = decodeURIComponent(apiURL)

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
