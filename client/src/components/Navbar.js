import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import React, { useContext, useEffect, useState } from 'react';
import { TalkContext } from '../Context/TalkProvider';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FaBell } from 'react-icons/fa';
import TalkLoading from "./miscellaneous/TalkLoading";
import { FormControl, FormLabel, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { Search2Icon } from '@chakra-ui/icons'
import { searchTalk } from './miscellaneous/Utils'
import LoadingSpinner from "./LoadingSpinner";
import { ErrorToast } from "./miscellaneous/Toasts";

function NavBar(){
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState([]);
  const [open, setOpen] = useState(false);

    const { user, socket } = useContext(TalkContext);
    const [ search , setSearch ] = useState('')
    const [ searchResult , setSearchResult ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
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

    async function handleSearch(e){
      e.preventDefault()
      
      if (!search) {
      return <div>Please Enter something in search</div>;
    }

    try {
      setIsLoading(true);

      const response = await searchTalk(search);
      console.log(response)

      const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 

      if(hostDetailsValidation === 'no'){
          setIsLoading(false);
          setErrorMessage(response)
          toggleErrorToast() 
      }else{    
          setIsLoading(false);
          setSearch('')
          Object.keys(response).map(resp => {
            setSearchResult([...searchResult, response[resp]]);
            searchResult.push(response[resp])
          })
      }
    } catch (error) {
      return <div>Error occured</div>
    }
    }
    return(
      <div>
          <Navbar expand="md" className="py-3">
        <Container>
        <Navbar.Brand href="/dashboard" className="text-rose-500 font-semibold tracking-widest text-lg font-link">Talk Host</Navbar.Brand>
              <InputGroup className="ml-11 flex" w='30%'>
                <Input size='md' type="search"
                  placeholder="Search for talk events"
                  className="me-2"
                  aria-label="Search"
                  value={search}
                  name="search"
                  onChange={(e) => setSearch(e.target.value)} />
                  <InputRightAddon children={<a href="#" onClick={(e) => handleSearch(e)}><Search2Icon /></a>} />
              </InputGroup>
          <Navbar.Toggle aria-controls="navbarScroll" />
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
          <div className={showErrorToast ? "w-1/4 ml-56 h-52" :  "w-1/4 ml-56"}>
            { isLoading ? (<LoadingSpinner />) : (<ul>{searchResult.map(result => {
              return <li key={result._id} className='p-1 bg-slate-300 rounded-md'><a href={`/talk/${result._id}`}>{result.title}</a></li>})}</ul>
              )
            }
            {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
          </div>
      </div>
    )
}
export default NavBar;