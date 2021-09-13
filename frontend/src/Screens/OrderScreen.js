import React, { useEffect, useState } from "react"
import { PayPalButton } from "react-paypal-button-v2"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { Button, Row, Col, Image, ListGroup } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import Message from "../Components/message"
import { deliverOrder, getOrderDetails, payOrder } from "../actions/orderAction"
import Loader from "../Components/Loader"
import { ORDER_DELIVER_RESET } from "../constants/orderConstants"
// import PayPal from "../script/PayPal"

const OrderScreen = ({ match }) => {
  const orderId = match.params.id
  const [ld, setld] = useState(false)
  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  if (!loading) {
    order.itemsPrice = order.orderItems
      .reduce((acc, it) => acc + it.Qty * it.price, 0)
      .toFixed(2)
  }

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  useEffect(() => {
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET })
    }

    if (!successPay) {
      setld(true)
    } else {
      setld(false)
    }
    dispatch(getOrderDetails(orderId))
  }, [dispatch, orderId, successPay, successDeliver])

  const successHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    console.log(order._id)
    dispatch(deliverOrder(order._id))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <React.Fragment>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name: </strong>
                {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress.address} ,{order.shippingAddress.City},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.Country}
              </p>
              {order.isDelievered ? (
                <Message variant='success'>
                  Delivered on {order.delieverdAt}
                </Message>
              ) : (
                <Message variant='danger'>Not Delievered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items Ordering</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          Price: {item.Qty} * ${item.price} = $
                          {item.price * item.Qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!order.isPaid && (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successHandler}
                  />
                )}
                {(!ld || order.isPaid) && (
                  <Message variant='success'>Paid</Message>
                )}
              </ListGroup.Item>
              {loadingDeliver && <Loader />}
              {userInfo.isAdmin && order.isPaid && !order.isDelievered && (
                <ListGroup.Item>
                  <Row>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark Delivered
                    </Button>
                  </Row>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default OrderScreen
