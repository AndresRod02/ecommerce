import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm()
    const submit = data =>{
        userLogin(data)
    }
    const userLogin = (data) =>{
        axios.post("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
        .then(resp => {
        localStorage.setItem('token', resp.data.token )
        navigate('/')
        })
        .catch(error=>{if(error.response?.status === 401){
            alert("Correo o contraseña incorrecta")
        }
        else{
            console.log(error.response?.data)
        }})
    }
    return (
        <div>
            <Form style={{maxWidth: 500, margin: '1rem auto', border: '1px solid black', padding: '1rem'}}
            onSubmit={handleSubmit(submit)}>
                <Form.Label style={{backgroundColor: 'wheat', marginLeft: '10rem'}}>Datos de prueba: <br /> john@gmail.com <br />john1234 </Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="john@gmail.com" {...register("email")}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="john1234" {...register("password")}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    );
};

export default Login;