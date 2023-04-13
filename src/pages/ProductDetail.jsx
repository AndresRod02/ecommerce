import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { createProductsThunk } from '../store/slices/cart.slice';
import { useDispatch } from 'react-redux';
const ProductDetail = () => {
    const {id} = useParams()
    const [detail, setDetail] = useState({})
    const [counter, setCounter] = useState(1)
    const dispatch = useDispatch()
    useEffect(()=>{
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(resp => {setDetail(resp.data)})
        .catch(error => console.error(error))
    }, [])
    const addProducts = () =>{
        const data = {
            quantity: counter,
            productId: id
        }
        dispatch(createProductsThunk(data))
    }
    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img style={{objectFit: 'contain', maxHeight: '500px'}}
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
            <Button onClick={()=>counter === 1? counter : setCounter(counter-1)}>-</Button>
            {counter}
            <Button onClick={()=>setCounter(counter+1)}>+</Button>
            <Button onClick={addProducts}>Añadir al carrito</Button>
        </div>
    );
};

export default ProductDetail;