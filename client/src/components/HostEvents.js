import { Avatar, Button, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import AtttendantAvatar from "./AtttendantAvatar"
import { fetchHostTalks } from "./miscellaneous/Utils"

const HostEvents = ({id}) => {
  
    let { data: userTalks, error, status, isError } = useQuery({ queryKey: ['hostTalks'], queryFn: () => fetchHostTalks(id), 
    enabled: true,
    refetchOnMount: true,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true
  })
  if (status === 'loading') {
  return <div>loading user talks...</div> // loading state
  }
  
  if (status === 'error') {
  return <div>{error.message}</div> // error state
  }
  console.log(userTalks)
    return( 
  <div className='w-full h-full flex flex-col justify-between'>
    {
      userTalks ? userTalks.map(talks => {
        return <a href='#' key={talks._id} className="mb-3 border-2 border-yellow-700 rounded-md p-3">
            <div className='flex justify-between'>
              <div className='flex flex-col h-32 justify-between'>
                  <h3>{talks.date}</h3>
                  <h1>{talks.title}</h1>
                  <p>{talks.location}</p>
                  <p>R20.00</p>
              </div>
              <div className='flex h-32'>
                <img src={talks.pic}/>
              </div>
  
            </div>
            <div className='mt-3 h-16'>
              <Text noOfLines={3}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Gravida arcu ac tortor dignissim convallis aenean. Eget arcu dictum varius duis at consectetur lorem donec massa. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Odio ut sem nulla pharetra diam sit. Turpis egestas sed tempus urna et pharetra pharetra massa massa. In egestas erat imperdiet sed euismod. Viverra vitae congue eu consequat ac felis donec et odio. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Sit amet nisl suscipit adipiscing bibendum.</Text>
            </div>
            <div className='flex justify-between mt-3'>
                <div className={talks.attendants.length > 0 ? 'w-1/5 border-2 border-orange-600 flex justify-between align-items-end' : 'w-1/5 border-2 border-orange-600 flex align-items-end'}>
                        <div className='flex'>
                            { talks.attendants ? talks.attendants.map(att => {
                                return <AtttendantAvatar attendee={att}/>
                            }) : ''} 
                        </div> 
                        <p>{talks.attendants.length > 0 ? talks.attendants.length : '0'} attendees</p> 
                </div>
                <div className='flex w-1/4 border-2 border-orange-600 justify-between'>
                  <Button>Comments</Button>
                  <Button>Attend talk</Button>
                </div>
            </div>
      </a>
      }) : ''
    }
  </div>
  
    )
  }

  export default HostEvents;