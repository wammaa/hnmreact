import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Dropdown, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { productAction } from '../redux/actions/productAction'

const ProductDetail = () => {
  let {id} = useParams()
  const product = useSelector((state) => state.product.selectedItem)
  const dispatch = useDispatch()
  const getProductDetail =() =>{
    dispatch(productAction.getProductDetail(id))
  }
  useEffect(()=>{
    getProductDetail()
  },[])
  return (
    <Container>
      <Row>
        <Col className='detail-img'>
          <img width={450} src={product?.img} alt=''/>
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
