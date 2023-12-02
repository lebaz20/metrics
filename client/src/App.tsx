import React, { useState } from 'react'
import {
  Container,
  Form,
  Label,
  Input,
  SubmitButton,
  ResponseContainer,
  ErrorMessage,
} from './styles/App.styles'
import Header from './Header'
import { postRecord } from './lib/request'

const App: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [value, setValue] = useState<number | 0>(0)
  const [valueError, setValueError] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name) {
      setNameError('Please enter a valid name.')
    }
    if (!value) {
      setValueError('Please enter a valid value.')
    }
    if (name && value) {
      const data = await postRecord(name, value)
      if (data) {
        setResponse(JSON.stringify(data, null, 2))
      }
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.value

    // Basic validation: Check if it's a valid name
    if (!inputName) {
      setNameError('Please enter a valid name.')
    } else {
      setNameError('')
    }

    setName(inputName)
  }

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = parseInt(event.target.value || '0', 10)

    // Basic validation: Check if it's a valid number
    if (inputNumber <= 0) {
      setValueError('Please enter a valid value.')
    } else {
      setValueError('')
    }

    setValue(inputNumber)
  }

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input type='text' value={name} onChange={handleNameChange} />
          </Label>
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          <Label>
            Value:
            <Input type='number' value={value} onChange={handleValueChange} />
          </Label>
          {valueError && <ErrorMessage>{valueError}</ErrorMessage>}
          <SubmitButton type='submit'>Submit Metric Reading</SubmitButton>
        </Form>
        {response && (
          <ResponseContainer>
            <h3>Response:</h3>
            <pre>{response}</pre>
          </ResponseContainer>
        )}
      </Container>
    </>
  )
}

export default App
