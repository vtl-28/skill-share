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

function Dashboard(){
 
   const [value, onChange] = useState(new Date());
  const [ componentLoaded, setComponentLoaded ] = useState(false)
  const { user, socket } = useContext(TalkContext);
  let id = '';

  useEffect(() =>{
    id = user ? user._id : '';
    socket?.emit('newUser', user);
  }, [ socket, user]);
  

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
    return(
      <div>
        <NavBar />
        <div className="container">
        <h1 className="text-4xl mt-11 font-bold font-link">Welcome,{ user ? user.name : ''} <Emoji symbol="👋" label="Hey"/></h1>
          <div className="grid h-full grid-cols-12 grid-rows-6">
            <div className="col-span-4 col-start-1 mt-8">
              <Calendar className='rounded-md w-full'  onChange={onChange} showWeekNumbers value={value} />
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                <div className="flex justify-between">
                  <h1>Attended talks</h1>
                  <a href="#">See all your attended talks</a>
                </div>
                <div className="p-4 mt-2 text-center border-2 border-black">
                  <p>You have not registered for any talks. Talks you have registered for will appear here</p>
                </div>
              </div>
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
              </div>
            </div>
            <div className="col-span-7 col-start-6 mt-8">
                  { data ? displayTalks(data) : ''}
            </div>
          </div>
        </div>
       
      </div>
    )
}
export default Dashboard;
  // <div>
  //       <NavBar/>
  //       <div className="container">
  //       <h1 className="text-xl mt-11">Welcome, {user ? user.name : ''} <Emoji symbol="👋" label="Hey"/></h1>
  //         <div className="grid h-full grid-cols-12 grid-rows-6">
  //           <div className="col-span-4 col-start-1 mt-8">
  //             <Calendar onChange={onChange} showWeekNumbers value={value} />
  //             <div className="flex flex-col col-span-4 col-start-1 mt-8">
  //               <div className="flex justify-between">
  //                 <h1>Attended talks</h1>
  //                 <a href="#">See all your attended talks</a>
  //               </div>
  //               <div className="p-4 mt-2 text-center border-2 border-black">
  //                 <p>You have not registered for any talks. Talks you have registered for will appear here</p>
  //               </div>
  //             </div>
  //             <div className="flex flex-col col-span-4 col-start-1 mt-8">
  //             </div>
  //           </div>
  //           <div className="col-span-7 col-start-6 mt-8">
  //             { data ? displayTalks(data) : ''}
  //           </div>
  //         </div>
  //       </div>
       
  //     </div>