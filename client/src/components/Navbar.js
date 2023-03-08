import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from 'react';
import { TalkContext } from '../Context/TalkProvider';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from 'react-icons/fa';
import TalkLoading from "./miscellaneous/TalkLoading";

function NavBar(){
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState([]);
  const [open, setOpen] = useState(false);

    const { user, socket } = useContext(TalkContext);
    const [ search , setSearch ] = useState('')
    const [ searchResult , setSearchResult ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate();
    const { _id } = user;
    console.log(user)
    console.log(_id)
    const api = `/profile/${_id}`;

    useEffect(() => {
      socket.on("create talk notification", (data) => {
        setTempNotifications((notifications) => [...notifications, data]);
      });
    }, [socket]);

    useEffect(() => {
      socket.on('like notification', (data) => {
        setTempNotifications((notifications) => [...notifications, data]);
        console.log(data)
      })
    }, [socket]);

    useEffect(() => {
      socket.on('comment notification', (data) => {
        setTempNotifications((notifications) => [...notifications, data]);
        console.log(data)
      })
    }, [socket]);

    useEffect(() => {
      socket.on('attend talk notification', (data) => {
        setTempNotifications((notifications) => [...notifications, data]);
        console.log(data)
      })
    }, [socket]);

    useEffect(() => {
      socket.on('cancel talk notification', (data) => {
        setTempNotifications((notifications) => [...notifications, data]);
        console.log(data)
      })
    }, [socket]);

    tempNotifications.forEach(n => {
      if(!notifications.includes(n)){
        notifications.push(n)
      }
      console.log(notifications)
    })


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
    function markAsRead(e, id){
      e.preventDefault();
      
      return notifications.filter((notif) => {
        return notif.id !== id
      }) ;
      
      // if(notifications.length < 1){
      //   console.log('Marked')
      //   console.log(notifications)
      // }else{
      //   console.log('Failed')
      //   console.log(notifications)
      // }
     
    }

    const displayNotification = (notification) => {
      console.log(notification)
      const { id, sender, response, type } = notification
      console.log(response)
      let action;
  
      if (type === 1) {
        action = "liked";
      } else if (type === 2) {
        action = "unliked";
      } else if(type === 3) {
        action = "commented on";
      }else if(type === 4){
        action = "created"
      }else if(type === 5){
        action = "booked"
      }else{
        action = "cancelled"
      }
  
      return (
        <div key={id} className="notification" >
            { type === 1 || type === 2 || type === 3 ? 
            <p>{`${sender.name} ${action} your talk event`}</p> : ''}
            { type === 4 ?  <p>{`${sender.name} created a new talk event.`}</p> : ''}
            { type === 5 ? <p>{`${sender.name} has ${action} a spot on your talk event`}</p> :
            <p>{`${sender.name} has ${action} their booking.`}</p> }

            <div className="flex w-full justify-between px-2">
              <a href="#" name={id} onClick={(e) => markAsRead(e, id)}>Mark as read</a>
              <a href={`/talk/${response._id}`} target="blank" className="w-1/2 text-center">Open</a>
            </div>
        </div>
      );
    };

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
          <Navbar expand="md">
        <Container>
        <Navbar.Brand href="/dashboard" className="text-rose-500 font-semibold leading-5 text-lg font-link">Talk Host</Navbar.Brand>
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
              
             
              <Nav.Link href="/hostTalk" className="mr-4 leading-5 leading-5 font-medium text-slate-900 font-link">Host talk</Nav.Link>
              <Nav.Link href={api} className="mr-4 leading-5 leading-5 font-medium text-slate-900 font-link">Profile</Nav.Link>
              <Nav.Link href="#" className="mr-4 leading-5 leading-5 font-medium text-slate-900 font-link" onClick={() => setOpen(!open)}>{notifications.length > 0 ? notifications.length : ''}<FaBell className="inline"/></Nav.Link>
              { open && <ul className="notifications">
                {notifications.map((n) => displayNotification(n))}
                
              </ul> }
              <Nav.Link className="leading-5 leading-5 font-medium text-slate-900 font-link" href="/" onClick={() => {
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