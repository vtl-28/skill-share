import React, { useState } from "react";
import NavBar from './Navbar';
import Emoji from 'a11y-react-emoji';
import Calendar from 'react-calendar';
import OtherTalks from './OtherTalks'

function WelcomeMessage(){
  return(
    <h1 className="text-xl mt-11">Welcome, Tlotliso <Emoji symbol="👋" label="Hey"/></h1>
  )
}

function Dashboard(){
    const [value, onChange] = useState(new Date());
    return(
      <div>
        <NavBar />
        <div className="container">
          <WelcomeMessage />
          <div className="grid h-full grid-cols-12 grid-rows-6">
            <div className="col-span-4 col-start-1 mt-8">
              <Calendar onChange={onChange} showWeekNumbers value={value} />
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                <div className="flex justify-between">
                  <h1>Attended talks</h1>
                  <a href="#">See all your attended talks</a>
                </div>
                <div className="border-2 border-black p-4 text-center mt-2">
                  <p>You have no registered for any talks. Talks you have registered for will appear here</p>
                </div>
              </div>
              <div className="flex flex-col col-span-4 col-start-1 mt-8">
                <div className="flex justify-between">
                  <h1>Hosted talks</h1>
                  <a href="#">See all your hosted talks</a>
                </div>
                <div className="border-2 border-black p-4 text-center mt-2">
                  <p>You have not hosted any talks. Talks you have hosted will appear here</p>
                </div>
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