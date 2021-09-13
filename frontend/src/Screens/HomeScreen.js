import React, { useEffect } from "react"
import { Col, Row } from "react-bootstrap"
import Product from "../Components/Product"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Message from "../Components/message"
import Loader from "../Components/Loader"
import Paginate from "../Components/paginate"
import ProductCarousel from "../Components/ProductCarousel"
import Meta from "../Components/meta"

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1
  //This was local state defined at that time
  // const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList
  useEffect(() => {
    //This was for express but know we are using redux
    // const fetchProducts = async () => {
    //   const { data } = await axios.get("/api/products")
    //   setProducts(data)
    // }
    // fetchProducts()
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <React.Fragment>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <h1>Latest Products</h1>
      {keyword && products.length === 0 && (
        <Message variant='success'>
          Product Name with {keyword} not found
        </Message>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default HomeScreen
