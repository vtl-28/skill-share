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


    async function likeTalk(e){
        e.preventDefault();
        const response = await like(_id)
        //console.log(response)
       handleLikeNotification(1,response)
    }

    async function unlikeTalk(e){
        e.preventDefault();
        const response = await unlike(_id)
        handleLikeNotification(2, response)
    }

    const submitComment = async(e) => {
        e.preventDefault()
        const data = {
            text: text
        }
        const response = await comment(_id, data);
        setText('')
        handleCommentNotification(3, response)
      }

    function handleLikeNotification(type,response){
        socket?.emit('like talk', {
            sender: user,
            response,
            type
        })
    }
    function handleCommentNotification(type,response){
        socket?.emit('comment talk', {
            sender: user,
            response,
            type
        })
    }

  

    return(
      <div key={_id}>
          {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
         {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
          <div className='flex flex-col py-2 border-slate-300 border-t-2'>
            <div className='flex justify-around w-full '>
                <div className='w-1/5'>
                   <a href={`/talk/${_id}`} target='blank'><img src={pic} alt="talk logo"/></a>
                </div>
                <div className='flex flex-col w-1/2'>
                    <h4 className='mb-2'>{date}</h4>
                    <h4 className='mb-2'>{title}</h4>
                    <h4>{location}</h4>
                </div>
                <div className='w-1/5'>
                    <h1>{attendants ? attendants.length : ''} Attendants</h1>
                </div>
            </div>
            <div className='flex flex-col self-center mt-4 w-50'>
                    <div className='flex w-1/5'>
                    { likes.includes(user._id) ?  
                    <a href="#" onClick={(e) => unlikeTalk(e)} className='ml-2 text-red-500'><FaHeartBroken/></a> :
                     <a href="#" onClick={(e) => likeTalk(e)} className='text-red-500'><FaHeart/></a>
                     }
                        
                       
                    </div>
                    <div>
                    <h3>{likes.length > 0 ? likes.length : ''} likes</h3>
                                                
                                <ul>
                                    { comments ? 
                                        comments.map(comment=>{
                                            return(
                                            <li key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy}</span> {comment.text}</li>
                                            )
                                        }) : ''
                                    }
                                </ul>
                                <form onSubmit={(e) => submitComment(e)}>
                                  <input className='w-full' type="text" placeholder="add a comment" value={text} onChange={(e) => setText(e.target.value)}/>
                                </form>
                    </div>
                </div>
        
          </div>
      </div>
    )
}

export default TalksList;
