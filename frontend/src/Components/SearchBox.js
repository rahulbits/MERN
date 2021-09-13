import React, { useState } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("")

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push("/")
    }
  }

  return (
    <Form inline onSubmit={submitHandler}>
      <Row>
        <Form.Group as={Col}>
          <Form.Control
            type='text'
            name='q'
            md='6'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Products......'
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} md='3'>
          <Button type='submit' variant='outline-success' size='sm'>
            Search
          </Button>
        </Form.Group>
      </Row>
    </Form>
  )
}

export default SearchBox
