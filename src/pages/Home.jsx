import React from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { filterCategoriesThunk, getProductsThunk, filterHeadlineThunk } from '../store/slices/products.slice';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom';
const Home = () => {
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState('')
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getProductsThunk())
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories")
        .then(resp => setCategories(resp.data))
        .catch(error=> console.error(error))
    }, [])
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Button onClick={()=>dispatch(getProductsThunk())} className='w-100'>Todos los productos</Button>
                    </Col>
                    {
                        categories.map(category=>(
                            <Col key={category.id}>
                                <Button onClick={()=>dispatch(filterCategoriesThunk(category.id))} className='w-100'>{category.name}</Button>
                            </Col>
                        ))
                    }
                </Row>
                <Row className='py-3'>
                    <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                        placeholder="Buscar productos"
                        aria-label="Products name"
                        aria-describedby="basic-addon2"
                        value={value}
                        onChange={e=> setValue(e.target.value)}
                        />
                        <Button variant='outline-primary' onClick={()=> dispatch(filterHeadlineThunk(value))}>Search</Button>
                    </InputGroup>
                    </Col>
                </Row>
                <Row xs={1} md={2} lg={3}>
                    {
                        products.map(product =>(
                        <Col key={product.id}>
                            <Card>
                                <Card.Img variant="top" src={product.images[0].url} style={{height: 200, objectFit: 'cover'}}/>
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <Card.Text style={{color: 'green'}}>${product.price}</Card.Text>
                                    <Card.Text>
                                        {product.description}
                                    </Card.Text>
                                    <Button variant="primary" as={Link} to={`/product/:${product.id}`}>Ver detalle</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        ))
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;