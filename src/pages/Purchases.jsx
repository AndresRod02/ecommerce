import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
const Purchases = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
        .then(resp =>setProducts(resp.data))
        .catch(error=>console.error(error))
    }, [])
    return (
        <div>
            <h1 style={{marginLeft: '7.5rem'}}>Historial de compras</h1>
            <Container>
                <Row xs={1} md={2} lg={3}>
            {
                products.map(product =>(
                    <Col>
                    <li key={product.id} style={{listStyleType: 'none'}}>
                    <CardGroup style={{margin: '0 auto'}}>
                        <Card style={{margin: '0 auto'}}>
                            <Card.Img variant="top" src={product.product.images?.[0].url} style={{height: 200, objectFit: 'contain', border: '#d2d2d2 0.5px solid', borderRadius: '5px'}}/>
                            <Card.Body>
                            <Card.Title>{product.product.title}</Card.Title>
                            <Card.Text>
                                ${product.product.price}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                    </li>
                    </Col>
              ))  
            }
                </Row>
            </Container>
        </div>
        );
    };

export default Purchases;