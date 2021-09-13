import React, { useState } from "react"
import FormContainer from "../Components/formContainer"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import { saveShippingAddress } from "../actions/cartAction"
import CheckoutSteps from "../Components/CheckoutSteps"

const ShipingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [City, setCity] = useState(shippingAddress.City)
  const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
  const [Country, setCountry] = useState(shippingAddress.Country)

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, City, postalCode, Country }))
    history.push("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlid='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            required='true'
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlid='City'>
          <Form.Label>City</Form.Label>
          <Form.Control
            required='true'
            type='text'
            placeholder='Enter City'
            value={City}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlid='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required='true'
            type='text'
            placeholder='Enter Postal Code'
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlid='Country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            required='true'
            type='text'
            placeholder='Enter Country'
            value={Country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Row className='py-3'>
          <Col>
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default ShipingScreen
