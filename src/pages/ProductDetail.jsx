import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import { Button } from 'react-bootstrap';
const ProductDetail = () => {
    const {id} = useParams()
    const [detail, setDetail] = useState({})
    useEffect(()=>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id.substring(1)}`)
        .then(resp => {setDetail(resp.data)})
        .catch(error => console.error(error))
    }, [])

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img style={{objectFit: 'cover', maxHeight: '500px'}}
                    className="d-block w-100 h-100"
                    src={detail.images?.[0].url}
                    alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img style={{objectFit: 'contain', maxHeight: '500px'}}
                    className="d-block w-100 h-100"
                    src={detail.images?.[1].url}
                    alt="Second slide"
                    />

                </Carousel.Item>
                <Carousel.Item>
                    <img style={{objectFit: 'contain', maxHeight: '500px'}}
                    className="d-block w-100 h-100"
                    src={detail.images?.[2].url}
                    alt="Third slide"
                    />

                </Carousel.Item>
            </Carousel>
            <h1>{detail.title}</h1>
            <p>{detail.description}</p>
            <h6>Price</h6>
            <h3>{detail.price}</h3>
            <Button>Añadir al carrito</Button>
        </div>
    );
};

export default ProductDetail;