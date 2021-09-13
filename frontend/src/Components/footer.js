import React from "react"
import { Col, Container, Row } from "react-bootstrap"

const footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>Copyright &copy; Ecommerce</Col>
        </Row>
      </Container>
    </footer>
  )
}
// Container With 1 coloumn and class name defines text posittion and
//padding in y axis (py)

export default footer
