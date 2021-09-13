import React, { useState } from "react"
import FormContainer from "../Components/formContainer"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Row, Col } from "react-bootstrap"
import CheckoutSteps from "../Components/CheckoutSteps"
import { savePaymentMethod } from "../actions/cartAction"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress) {
    history.push("/shipping")
  }
  const [paymentMethod, setpaymentMethod] = useState("Paypal")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history.push("/placeorder")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card '
              id='Paypal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setpaymentMethod(e.target.value)}
            ></Form.Check>

            {/* <Form.Check
              type='radio'
              label='Gpay'
              id='Gpay'
              name='paymentMethod'
              value='Gpay'
              onChange={(e) => setpaymentMethod(e.target.value)}
            ></Form.Check> */}
          </Col>
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

export default PaymentScreen
