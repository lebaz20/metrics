import styled from 'styled-components'

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 8px;
`

const Input = styled.input`
  padding: 8px;
  margin-left: 10px;
  margin-bottom: 16px;
`

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const ResponseContainer = styled.div`
  margin-top: 20px;
`
const ErrorMessage = styled.div`
  color: red;
  margin-top: -20px;
  margin-bottom: 10px;
  &::before {
    content: '⚠️'; /* Content to be added before each paragraph */
    padding-right: 8px; /* Add spacing between the character and the text */
  }
`

export {
  Container,
  Form,
  Label,
  Input,
  SubmitButton,
  ResponseContainer,
  ErrorMessage,
}
