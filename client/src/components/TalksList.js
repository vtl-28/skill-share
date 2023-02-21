import axios from 'axios';
import React, { useState, useContext } from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { like, unlike, comment } from '../components/miscellaneous/Utils';
import { SuccessToast, ErrorToast } from '../components/miscellaneous/Toasts';
import { TalkContext } from '../Context/TalkProvider';

function TalksList({talk}){
    const { user, socket } = useContext(TalkContext);
    const { _id, title, body, date, location, pic, comments, likes, hostedBy, attendants } = talk;
    console.log(_id)
    const [ isLiked, setIsLiked ] = useState({})
    const [ text, setText ] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);


    async function likeTalk(){
        const response = await like(_id)
        //console.log(response)
       handleLikeNotification(response)
    }

    async function unlikeTalk(){
        const response = await unlike(_id)
        //console.log(response)
        handleLikeNotification(response)
    }

    function handleLikeNotification(response){
        socket?.emit('likeTalk', {
            sender: user,
            response
        })
    }
    // function handleUnlikeNotification(response){
    //     socket?.emit('unlikeTalk', {
    //         sender: user,
    //         response
    //     })
    // }
  const submitComment = async(e) => {
    e.preventDefault()
    const data = {
        text: text
    }
    const response = await comment(_id, data);
    setText('')
    console.log(response)
  }

    return(
      <div key={_id}>
          {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
         {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
          <div className='flex flex-col py-2 border-red-200 border-y-2'>
            <div className='flex justify-around w-full '>
                <div className='w-1/5 border-2 border-green-500'>
                   <a href={`/talk/${_id}`} target='blank'><img src={pic} alt="talk logo"/></a>
                </div>
                <div className='flex flex-col w-1/2 border-2 border-green-500'>
                    <h4 className='mb-2'>{date}</h4>
                    <h4 className='mb-2'>{title}</h4>
                    <h4>{location}</h4>
                </div>
                <div className='w-1/5 border-2 border-green-500'>
                    <h1>{attendants ? attendants.length : ''} Attendants</h1>
                </div>
            </div>
            <div className='flex flex-col self-center mt-4 w-50'>
                    <div className='flex w-1/5'>
                    { likes.includes(user._id) ?  
                    <a href="#" onClick={() => unlikeTalk()} className='ml-2 text-red-500'><FaHeartBroken/></a> :
                     <a href="#" onClick={() => likeTalk()} className='text-red-500'><FaHeart/></a>
                     }
                        
                       
                    </div>
                    <div>
                    <h3>{likes.length > 0 ? likes.length : ''} likes</h3>
                                                
                                <ul>
                                    { comments ? 
                                        comments.map(comment=>{
                                            return(
                                            <li key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name}</span> {comment.text}</li>
                                            )
                                        }) : ''
                                    }
                                </ul>
                                <form onSubmit={submitComment}>
                                  <input className='w-full' type="text" placeholder="add a comment" value={text} onChange={(e) => setText(e.target.value)}/>
                                </form>
                    </div>
                </div>
        
          </div>
      </div>
    )
}

export default TalksList;
