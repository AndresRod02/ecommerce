import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Cart from './Cart';
const NavBar = () => {
  const [show, setShow] = useState(false)
  const handleClose = () =>{
    setShow(false)
  }
  
  
  return (
      <>
        <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to='/'>e-commerce</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
            <Nav.Link as={Link} to='/purchases'>Purchases</Nav.Link>
            <Nav.Link onClick={()=> setShow(true)}>Carrito</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
        </div>
        <Cart
        show={show}
        handleClose={handleClose}/>
        </>
    );
};

export default NavBar;