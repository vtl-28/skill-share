import React, { useState, useContext } from 'react'
import { useParams} from 'react-router-dom'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock,  faCompass } from '@fortawesome/free-regular-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { getTalk, attendTalk, cancelTalk } from '../components/miscellaneous/Utils';
import { ErrorToast, SuccessToast } from './miscellaneous/Toasts'
import AttendNavbar from '../components/AttendNavbar'
import { TalkContext } from '../Context/TalkProvider';
import Attendant from '../components/Attendant'
import TalkLocationMap from './TalkLocationMap';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const Talk = () => {
    const { id } = useParams();
    const { user, socket } = useContext(TalkContext);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);

    const { data, error, status, isError } = useQuery({ queryKey: ['userProfile'], queryFn: () => getTalk(id),
    enabled: true,
    refetchOnMount: true,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true })
    
    if (status === 'loading') {
        return <div>loading profile</div> // loading state
      }
    
      if (status === 'error') {
        return <div>{error.message}</div> // error state
      }
      const { _id, title, hostedBy, body, pic, date, attendants, location } = data;

      const { _id: hostId, name, email, about, profession, pic: hostPic } = hostedBy;

      const coordinates = {
        address: '1600 Amphitheatre Parkway, Mountain View, california.',
        lat: 37.42216,
        lng: -122.08427,
      }

      async function bookSeat(e){
        e.preventDefault();
        if(attendants.includes(user._id)){
            setErrorMessage("You are already attending this talk event")
            toggleErrorToast();
            return;
        }else{
            const response = await attendTalk(_id)

            const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 
    
            if(hostDetailsValidation === 'no'){
                setErrorMessage(response)
                toggleErrorToast() 
            }else{    
                setSuccessMessage("You have successfully booked a seat for the talk event");
                handleAttendTalkNotification(5,response)
                toggleSuccessToast(); 
            }
        }
        
      }
     async function cancelSeat(e){
        e.preventDefault();

        const response = await cancelTalk(_id)
        console.log(response)
        const hostDetailsValidation = typeof response === 'object' ? 'yes' : 'no' 

        if(hostDetailsValidation === 'no'){
            setErrorMessage(response)
            toggleErrorToast() 
        }else{    
            setSuccessMessage("You have successfully cancelled your seat for the talk event");
            handleCancelTalkNotification(6,response)
            toggleSuccessToast(); 
        }
      }

      function handleAttendTalkNotification(type,response){
        socket?.emit('attend talk', {
            sender: user,
            response,
            type
        })
    }
    function handleCancelTalkNotification(type,response){
        socket?.emit('cancel talk', {
            sender: user,
            response,
            type
        })
    }
    
  return (
    <div>
      <Navbar />
      <div className='container mx-auto'>
        <div className='flex flex-col py-6 border-b-2 border-red-400 mx-28'>
            <h1 className='text-3xl font-bold text font-link'>{title}</h1>
            <div className='flex flex-row w-1/5 mt-4 justify-content-around'>
                <a href={`/host/${hostId}`}><img src={hostPic} alt='logo' 
                className='rounded-full' target='blank'/></a>
                <div className='flex flex-col justify-center ml-4 w-1/2'>
                    <h1 className='mb-2'>Hosted by</h1>
                    <h1>{name}</h1>
                </div>
            </div>
        </div>
        <div className='grid h-full grid-cols-10 pt-6 bg-gray-50'>
            <div className='h-full col-span-4 col-start-2'>
                <img src={pic} alt='logo'
                    className='w-full'
                />
                <h1 className='mt-3 mb-4 text-xl font-bold'>Details</h1>
                <p className='mb-3 font-bold'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <a href='#'  onClick={(e) => bookSeat(e)} className='mt-8 text-teal-600 font-semibold'>Ticket here</a>
                <div className='flex flex-col mt-6'>
                    <div className='flex justify-between mb-3'>
                        <h1 className='text-xl font-bold font-link'>Attendees { attendants.length > 0 ? (attendants.length) : ''}</h1>
                        <a href='#' className='text-teal-600 font-semibold'>See all</a>
                    </div>
                    <div>
                       <ul className='flex justify-between'>
                        { attendants ? attendants.map(attendant => {
                           return <Attendant attendant={attendant}/>
                        }): ( <div>No attendants have booked for this talk event yet</div>)}
                    
                       </ul>
                    </div>
                </div>
            </div>
            <div className='col-span-3 col-start-7'>
                <div className='flex p-4 border rounded'>
                    <img src={hostPic} alt='logo'
                            className='w-1/4' />
                    <div className='flex flex-col ml-4'>
                        <h1 className='font-bold'>{name}</h1>
                        <h1 className='mt-2 text-slate-500'>{profession}</h1>
                    </div>
                </div>
                <div className='flex flex-col justify-between p-4 mt-4 border rounded'>
                    <div className='flex'>
                        <FontAwesomeIcon icon={faClock} />
                            <h1 className='ml-4'>{format(new Date(date), "eee',' MMM d',' y", {
                            weekStartsOn: 1
                        })}</h1>
                    </div>
                    <div className='flex mt-3'>
                        <FontAwesomeIcon icon={ faCompass} />
                        <h1 className='ml-4'>{location}</h1>
                    </div>
                </div>
                <div className='mt-4'>
                    <TalkLocationMap />
                </div>
                {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
                {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
            </div>
        </div>
       <div className='grid grid-cols-10'>
            <div className='col-span-8 col-start-2'>
                <AttendNavbar title={title} date={date} attendants={attendants} book={bookSeat} cancel={cancelSeat}/>
            </div> 
       </div>
        
      </div>
    </div>
  )
}

export default Talk;
