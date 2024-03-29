import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
        <Col>
          <img src={product?.img} alt=''/>
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div>{product?.price}</div>
          <div>{product?.choice === true ? "Conscious Choice" : <br/>}</div>
          <div>
            <DropdownButton id="dropdown-basic-button" title="Dropdown button">
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetail
