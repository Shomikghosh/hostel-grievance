import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function header() {


  const handleLogout = (event) => {
    localStorage.clear();
    window.location.reload(); 
  };
  return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="/">Hostel Grievence</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {localStorage.getItem('person')==='student'?(
                <>
                <Navbar.Brand href="/student-home/add-complain">Add complain</Navbar.Brand>
                <Navbar.Brand href="/student-home/complain-list">Complain List</Navbar.Brand>
                <Navbar.Brand href="/student-home/profile">Profile</Navbar.Brand>
                <Navbar.Brand onClick={handleLogout} style={{cursor:"pointer"}}>Logout</Navbar.Brand>
              </>
              ):(<NavDropdown title="Login/SignUp" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/login">Login/Signup</NavDropdown.Item>
              </NavDropdown>)
              }
              
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    </>
  )
}

export default header