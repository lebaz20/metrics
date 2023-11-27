// App.test.tsx
import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import axios, { AxiosResponse } from 'axios'

import App from '../src/App'

// Mock the axios module
jest.mock('axios')

describe('App', () => {
  test('renders component and submits form', async () => {
    render(<App />)

    // Find input fields
    const nameInput = screen.getByLabelText(/Name/i)
    const valueInput = screen.getByLabelText(/Value/i)
    const submitButton = screen.getByText(/Submit/i)

    // Enter values into input fields
    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(valueInput, { target: { value: '42' } })

    const responseData = { message: 'Post successful' }
    ;(axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({
      data: responseData,
    } as AxiosResponse)

    // Trigger form submission
    fireEvent.click(submitButton)

    // Wait for response to be displayed
    await waitFor(() => {
      const responseElement = screen.getByText(/Response:/i)
      expect(responseElement).toBeInTheDocument()
    })
  })
})
