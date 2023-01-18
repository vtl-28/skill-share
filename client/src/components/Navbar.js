import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import React, { useContext, useState } from 'react';
import { TalkContext } from '../Context/TalkProvider';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import TalkLoading from "./miscellaneous/TalkLoading";

function NavBar(){
    const { user, setUser } = useContext(TalkContext);
    const [ search , setSearch ] = useState('')
    const [ searchResult , setSearchResult ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate();
    const { _id } = user;
    console.log(user)
    console.log(_id)
    const api = `/profile/${_id}`;

    function getSearch(){
      return axios.get(`/api/talks/searchTalk?search=${search}`,  {
        headers: {
            'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
        }
        }).then(response => {
          return response.data
        }).catch(error => {
          return error.response.data
        })
    }

    async function handleSearch(){
      
      if (!search) {
      return <div>Please Enter something in search</div>;
    }

    try {
      setLoading(true);

      const response = await getSearch();
      setLoading(false);
      setSearch('')
      Object.keys(response).map(resp => {
        setSearchResult([...searchResult, response[resp]]);
        searchResult.push(response[resp])
        console.log(response[resp])
        console.log(searchResult)
        console.log(typeof searchResult)
      })

   
      
    } catch (error) {
      return <div>Error occured</div>
    }
    }
    return(
      <div>
          <Navbar bg="light" expand="md">
        <Container>
          <Navbar.Brand href="/dashboard">Skill-share</Navbar.Brand>
          <Form className="ml-12 d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={search}
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button variant="outline-success" onClick={handleSearch}>Search</Button>
            </Form>
          <Navbar.Toggle aria-controls="navbarScroll" />
          { loading ? (<TalkLoading />) : (<ul>{searchResult.map(result => {
          <li key={result._id}>{result.title}</li>})}</ul>
            )
          }
          <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
            <Nav
              className="flex justify-between"
              style={{ maxHeight: '100px' }}
         
            >
              <Nav.Link href="/hostTalk" className="mr-4">Host talk</Nav.Link>
              <Nav.Link href={api} className="mr-4">Profile</Nav.Link>
              <Nav.Link href="/" onClick={() => {
                 localStorage.removeItem('userInfo');
                 navigate('/')
              }
              }>Log out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      </div>
    )
}
export default NavBar;