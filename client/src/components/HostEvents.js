import React, { useState, useContext, useEffect, useRef } from "react";
import { Avatar, Button, Text,Show, Hide } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import AtttendantAvatar from "./AtttendantAvatar"
import { fetchHostTalks } from "./miscellaneous/Utils"
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { TalkContext } from "../Context/TalkProvider";
import { useFetch } from '../hooks/useFetchHostedEvents';

function getWindowDimensions() {
  const width = window.innerWidth
  const height = window.innerHeight
  return {
      width,
      height
  };
}

const HostEvents = ({id}) => {
  const inputElement = useRef('');
  const { viewport } = useContext(TalkContext);
  const { data: userTalks } = useFetch(id)
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, [windowDimensions]);

 
    return( 
  <div className='w-full flex flex-col justify-between'>
    {
      userTalks ? userTalks.map(talks => {
        return <a href={`/talk/${talks._id}`} key={talks._id} className="mb-3 bg-white border-0 rounded-lg p-6 hover:text-black">
            <div className='flex justify-between'>
              <div className='flex flex-col h-32 justify-between xs:w-full'>
                  <h3>{format(new Date(talks.date), "eee',' d MMM y',' h':'mm a", {
                        weekStartsOn: 1
                    })}</h3>
                  <h1>{talks.title}</h1>
                  <p>{talks.location}</p>
                  <p>R20.00</p>
              </div>
              <div className='flex h-32 xs:hidden sm:flex'>
                <img src={talks.pic}/>
              </div>
  
            </div>
            <div className='mt-3 h-16'>
              <Text noOfLines={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida arcu ac tortor dignissim convallis aenean. Eget arcu dictum varius duis at consectetur lorem donec massa. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Odio ut sem nulla pharetra diam sit. Turpis egestas sed tempus urna et pharetra pharetra massa massa. In egestas erat imperdiet sed euismod. Viverra vitae congue eu consequat ac felis donec et odio. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Sit amet nisl suscipit adipiscing bibendum.</Text>
            </div>
            <div className='flex justify-between mt-14'>
                <div className={talks.attendants.length > 0 ? ' xs:w-1/5 md:w-2/5 border-0 flex align-items-end' : 'w-1/5 border-2 border-orange-600 flex align-items-end'}>
                        <div className='flex mr-3'>
                            { talks.attendants ? talks.attendants.map(att => {
                                return <AtttendantAvatar attendee={att}/>
                            }) : ''} 
                        </div> 
                        <p ref={inputElement}>{talks.attendants.length > 0 && windowDimensions.width <= 768 ? talks.attendants.length : `${talks.attendants.length} attendees`}</p> 
                </div>
                <div className='flex xs:w-1/2  md:justify-around lg:w-1/3 border-0 xs:justify-end'>
                  <Show breakpoint='(min-width: 768px)'>
                    <Button variant='outline' colorScheme='teal' size={['sm','sm','md']} className=' hover:text-white'>Comments</Button>
                  </Show>
                  <Button bgColor='#F64060' size={['sm','sm','md']} className=" text-white">Attend talk</Button>
                </div>
            </div>
      </a>
      }) : ''
    }
  </div>
  
    )
  }

  export default HostEvents;