import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getCartThunk, cartCheckoutThunk, deleteProductsThunk, updateProductsThunk } from '../store/slices/cart.slice';
import Counter from './Counter';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
const Cart = ({show, handleClose}) => {
    const dispatch = useDispatch()
    const products =  useSelector(state => state.cart)
    const [counterValue, setCounterValue] = useState(2)
    useEffect(()=>{
        dispatch(getCartThunk())
    }, [])
    const deleteProduct = (id) =>{
        dispatch(deleteProductsThunk(id))
    }
    const handleCounterChange = (value, id) =>{
        setCounterValue(value)
        updateProduct(id)
    }

    const updateProduct = (id) =>{
        const data = {
            quantity: counterValue
        }
        dispatch(updateProductsThunk(data, id))
        console.log(products)
    }
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                <Container>
                    <Col style={{listStyleType: 'none'}}>
                        {
                            products.map(product=>(
                                <Card style={{ width: '18rem', marginTop:'10px'}}>
                                <li key={product.id} style={{ width: '100%'}}>
                                    <Card.Title style={{marginLeft: '1rem'}}>{product.product.title}</Card.Title>
                                    <Card.Img variant="top" src={product.product.images?.[0].url} style={{height: 100, width: 100, objectFit: 'contain', borderRadius: '5px', marginLeft: '1rem'}}/>
                                    <button onClick={()=>deleteProduct(product.id)} style={{marginBottom: '1rem', marginLeft: '5.5rem', backgroundColor: '#4582ec', borderRadius: '10px'}}><box-icon name='trash'></box-icon></button>
                                    <Counter initial={product.quantity} onChange={(count)=>handleCounterChange(count, product.id)}/>
                                </li>
                                </Card>
                            ))
                        }
                        
                    </Col>
                </Container>
                <Button onClick={()=>dispatch(cartCheckoutThunk())} style={{marginLeft: '13rem'}}>Comprar</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Cart;