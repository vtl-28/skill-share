import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";

function NavBar(){
    return(
      <div>
          <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="#">Skill-share</Navbar.Brand>
          <Form className="ml-12 d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
            <Nav
              className="flex justify-between"
              style={{ maxHeight: '100px' }}
         
            >
              <Nav.Link href="#action1" className="mr-4">Host talk</Nav.Link>
              <Nav.Link href="#action2" className="mr-4">Profile</Nav.Link>
              <Nav.Link href="#action2">Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      </div>
    )
}
export default NavBar;