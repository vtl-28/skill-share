import React, { useState, useContext, useEffect } from "react";
import NavBar from './Navbar';
import Emoji from 'a11y-react-emoji';
import Calendar from 'react-calendar';
import OtherTalks from './TalksList'
import { TalkContext } from '../Context/TalkProvider';
import axios from "axios";
import UserTalksList from "./UserTalksList";
import { useQuery } from "@tanstack/react-query";
import {displayTalks} from './miscellaneous/DisplayItems'
import {fetchTalks, getAttendedTalks } from './miscellaneous/Utils'
import { FaLessThan } from "react-icons/fa";
import Navigation from './Navigation'
import AttendedEvents from "./AttendedEvents";
import Footer from "./Footer";

function Dashboard(){
 
   const [value, onChange] = useState(new Date());
  const [ componentLoaded, setComponentLoaded ] = useState(false)
  const { user, socket, viewport } = useContext(TalkContext);

  useEffect(() =>{
    socket?.emit('newUser', user);
  }, [ socket, user]);

  console.log(viewport)
  

  const { data, error, status, isFetched } = useQuery({ queryKey: ['talks'], queryFn: fetchTalks,
            refetchOnMount: true,
            refetchInterval: 2000,
            refetchIntervalInBackground: true,
            refetchOnWindowFocus: true})
    if(status === 'loading') {
        return <div>loading talks</div> // loading state
      }

      const hostedTalksPlaceholder = (
        <div>
          <div className="flex justify-between">
                  <h1>Hosted talks</h1>
                  <a href="#">See all your hosted talks</a>
                </div>
                <div className="p-4 mt-2 text-center border-2 border-black">
                  <p>You have not hosted any talks. Talks you have hosted will appear here</p>
                </div>
        </div>
      )

      const yes = {
        borderColor: 'black',
        borderWidth: '4px'
      }

    return(
      <div>
        <NavBar />
        <div className="container">
        <h1 className=" mt-11 font-bold font-link xs:text-2xl md:text-4xl">Welcome,{ user ? user.name : ''} <Emoji symbol="👋" label="Hey"/></h1>
          <div className="grid h-full grid-cols-12">
            <div className="col-span-4 col-start-1 mt-8 xs:col-start-1 xs:col-span-12 xs:mb-12 lg:col-start-1 lg:col-span-5">
              <Calendar style={yes} className='rounded-md w-full xs:hidden lg:contents '  onChange={onChange} showWeekNumbers value={value} />
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                <div className="flex justify-between mb-6">
                  <h1 className="font-semibold  xs:text-xl md:text-2xl lg:text-xl">Events you have attended will appear here</h1>
                </div>
                <AttendedEvents />
                 
              </div>
            </div>
            <div className="col-span-7 col-start-6 xs:col-start-1 xs:col-span-12 lg:col-start-7 lg:col-span-6">
                <div className="flex justify-between mb-6">
                  <h1 className="font-bold  xs:text-xl md:text-2xl">Upcoming talk events</h1>
                </div>
                  { data ? displayTalks(data) : ''}
            </div>
          </div>
        </div>
        <div className="footer-two-style">
          <Footer />
        </div>
       
      </div>
    )
}
export default Dashboard;