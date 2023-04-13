import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { getCartThunk, cartCheckoutThunk, deleteProductsThunk, updateProductsThunk } from '../store/slices/cart.slice';
import Counter from './Counter';
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
                <ul>{
                    products.map(product=>(
                        <li key={product.id}>
                            <h5>{product.product.title}</h5>
                            <img src={product.product.images?.[0].url} alt="" style={{width: 230}}/>
                            <Button onClick={()=>deleteProduct(product.id)}>Eliminar</Button>
                            <Counter initial={product.quantity} onChange={(count)=>handleCounterChange(count, product.id)}/>
                        </li>
                    ))
                    }
                </ul>
                <Button onClick={()=>dispatch(cartCheckoutThunk())}>Checkout</Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Cart;