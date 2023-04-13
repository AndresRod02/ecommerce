import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getConfig from '../utils/getConfig';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
const Purchases = () => {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", getConfig())
        .then(resp =>setProducts(resp.data))
        .catch(error=>console.error(error))
    }, [])
    return (
        <div>
            <ul>
            {
              products.map(product =>(
                <li key={product.id}>
                    <CardGroup className='w-50'>
                        <Card>
                            <Card.Img variant="top" src={product.product.images?.[0].url} />
                            <Card.Body>
                            <Card.Title>{product.product.title}</Card.Title>
                            <Card.Text>
                                {product.product.price}
                            </Card.Text>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </li>
              ))  
            }
            </ul>
        </div>
    );
};

export default Purchases;