import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Dropdown, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  let {id} = useParams()
  const [ product, setProduct] = useState(null)
  const getProductDetail = async() =>{
    let url = `https://my-json-server.typicode.com/wammaa/hnmreact/products/${id}`
    let response = await fetch(url)
    let data = await response.json()
    setProduct(data)
  }
  useEffect(()=>{
    getProductDetail()
  },[])
  return (
    <Container>
      <Row>
        <Col className='detail-img'>
          <img src={product?.img} alt=''/>
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div>₩ {product?.price}</div>
          <div>{product?.choice === true ? "Conscious Choice" : <br/>}</div>
          <Dropdown className="drop-down">
              <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                사이즈 선택
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {product?.size.length > 0 &&
                  product.size.map((item) => (
                    <Dropdown.Item href="#/action-1">{item}</Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="dark" className="detail-button">추가</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
