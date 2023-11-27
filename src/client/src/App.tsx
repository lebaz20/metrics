import React, { useState } from 'react'
import {
  Container,
  Form,
  Label,
  Input,
  SubmitButton,
  ResponseContainer,
} from './styles/App.styles'
import Header from './Header'
import { postRecord } from './lib/request'

const App: React.FC = () => {
  const [name, setName] = useState<string>('')
  const [value, setValue] = useState<number | 0>(0)
  const [response, setResponse] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = await postRecord(name, value)
    if (data) {
      setResponse(JSON.stringify(data, null, 2))
    }
  }

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <Label>
            Name:
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          <Label>
            Value:
            <Input
              type='number'
              value={value}
              onChange={(e) =>
                setValue(e.target.value === '' ? 0 : parseInt(e.target.value, 10))
              }
            />
          </Label>
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
