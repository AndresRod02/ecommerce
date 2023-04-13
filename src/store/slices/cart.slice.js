import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
export const cartSlice = createSlice({
	name: 'cart',
    initialState: [],
    reducers: {
        setCart : (state, action) =>{
            return action.payload
        }
    }
})

export const getCartThunk = () => dispatch => {
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getConfig())
    .then(resp => dispatch(setCart(resp.data)))
    .catch(error => console.error(error))
}
export const createProductsThunk = data => dispatch =>{
    axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, getConfig())
    .then(() => dispatch(getCartThunk()))
    .catch(error=>console.error(error))
}

export const cartCheckoutThunk = () => dispatch =>{
    axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {} ,getConfig())
    .then(()=> dispatch(getCartThunk()))
    .catch(error => console.error(error))
}

export const deleteProductsThunk= id => dispatch =>{
    axios.delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, getConfig())
    .then(()=>dispatch(getCartThunk()))
    .catch(error => console.error(error))
}

export const updateProductsThunk= (data, id) => dispatch =>{
    axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, getConfig())
    .then(()=>dispatch(getCartThunk()))
    .catch(error => console.error(error))
}


export const { setCart  } = cartSlice.actions;

export default cartSlice.reducer;