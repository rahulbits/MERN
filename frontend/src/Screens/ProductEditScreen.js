import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Components/message"
import Loader from "../Components/Loader"
import {
  listProductDetails,
  updateProduct,
} from "../actions/productDeatailAction"
import FormContainer from "../Components/formContainer"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import axios from "axios"

const ProductEditScreen = ({ history, match }) => {
  const productId = match.params.id

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [price, setPrice] = useState("")
  const [countInStock, setCounInStock] = useState(0)
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch(listProductDetails(productId))
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push("/admin/productlist")
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setDescription(product.description)
        setCategory(product.category)
        setCounInStock(product.countInStock)
      }
    }
  }, [dispatch, history, productId, product, successUpdate, loading])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        description,
        countInStock,
        category,
        brand,
      })
    )
  }

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image", file)
    setUploading(true)
    try {
      const config = {
        "Content-Type": "multipart/form-data",
      }
      const { data } = await axios.post("/api/upload", formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <React.Fragment>
      <Link to='/admin/productlist' className='btn btn-light '>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlid='name'>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlid='price'>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlid='brand'>
              <Form.Label>Brand </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlid='category'>
              <Form.Label>Category </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlid='description'>
              <Form.Label>Description </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlid='image'>
              <Form.Label>Image </Form.Label>

              <Form.Control
                type='text'
                placeholder='Enter Image URL'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id='file'
                className='my-3'
                onChange={uploadFileHandler}
                custom
              ></Form.File>

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlid='countInStock'>
              <Form.Label>In Stock </Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Count'
                value={countInStock}
                onChange={(e) => setCounInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Row className='py-3'>
              <Col>
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  )
}

export default ProductEditScreen
