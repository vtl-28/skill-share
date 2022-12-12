import React, { useState, useContext, useEffect } from "react";
import NavBar from './Navbar';
import Emoji from 'a11y-react-emoji';
import Calendar from 'react-calendar';
import OtherTalks from './OtherTalks'
import { TalkContext } from '../Context/TalkProvider';
import axios from "axios";
import UserTalksList from "./UserTalksList";

// function WelcomeMessage(){
//   const { user } = useContext(TalkContext);
//   return(
//     <h1 className="text-xl mt-11">Welcome, {user ? user.name: ''} <Emoji symbol="👋" label="Hey"/></h1>
//   )
// }

function Dashboard(){
    const [value, onChange] = useState(new Date());
    const { user, userTalks } = useContext(TalkContext);
   
       //useEffect(() => {
        // const instance = axios.create({
        //   baseURL: 'http://localhost:3001',
        //   headers: {
        //     'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
        //   }
        // })
      //   axios.get('/talks', {
      //     headers: {
      //       'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
      //     }
      //   }).then(response => {
      //     console.log(response.data)
      //   }).catch(error => {
      //     console.log(error.response)
      //   })
        
      // }, [])
      const displayTalks = () => {
        return <ul>{userTalks.map(talk => {
            return <UserTalksList talk={talk}/>
        })}</ul>
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
        <h1 className="text-xl mt-11">Welcome, {user ? user.name: ''} <Emoji symbol="👋" label="Hey"/></h1>
          <div className="grid h-full grid-cols-12 grid-rows-6">
            <div className="col-span-4 col-start-1 mt-8">
              <Calendar onChange={onChange} showWeekNumbers value={value} />
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                <div className="flex justify-between">
                  <h1>Attended talks</h1>
                  <a href="#">See all your attended talks</a>
                </div>
                <div className="p-4 mt-2 text-center border-2 border-black">
                  <p>You have no registered for any talks. Talks you have registered for will appear here</p>
                </div>
              </div>
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                {userTalks ? displayTalks(): hostedTalksPlaceholder}
              </div>
            </div>
            <div className="col-span-7 col-start-6 mt-8">
              <OtherTalks />
            </div>
          </div>
        </div>
       
      </div>
    )
}
export default Dashboard;