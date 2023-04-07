import { ChatIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { TalkContext } from '../Context/TalkProvider';
import { ErrorToast, SuccessToast } from './miscellaneous/Toasts';
import { comment, like, unlike } from './miscellaneous/Utils';

const AttendedEventsList = ({talk}) => {
    const { user, socket } = useContext(TalkContext);
    const { _id, title, body, date, location, pic, comments, likes, hostedBy, attendants, createdAt } = talk;
    const [ isLiked, setIsLiked ] = useState({})
    const [ text, setText ] = useState('');
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState([]);
    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
    const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
    const [ openComments, setOpenComments ] = useState(false)
    const [ dateResult, setDateResult ] = useState('')

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
    function showComments(e){
        e.preventDefault();
        setOpenComments((openComments) => !openComments)
    }

  return (
    <div key={_id}>
    {showSuccessToast && <SuccessToast message={successMessage} showSuccessToast={showSuccessToast} toggleSuccessToast={toggleSuccessToast}/>}
   {showErrorToast && <ErrorToast message={errorMessage} showErrorToast={showErrorToast} toggleErrorToast={toggleErrorToast} />}
    <div className='flex flex-col py-3 border-slate-300 border-t-2'>
      <div className='flex justify-around w-full mb-2'>
          <div className='w-1/5'>
             <a href={`/talk/${_id}`} ><img src={pic} alt="talk logo"/></a>
          </div>
          <div className='flex flex-col w-1/2'>
              <h4 className=' text-base tracking-tighter'>{date ? format(new Date(date), "eee',' MMM d',' h':'mm a", {
                  weekStartsOn: 1
              }): (<h3>oops</h3>)}</h4>
              <h4 className=' text-base tracking-tighter'>{title}</h4>
              <h4 className='text-base tracking-tighter'>{location}</h4>
          </div>
          <div className='w-1/5'>
              <span className='text-base tracking-tighter'>{attendants ? attendants.length : '0'} Attendees</span>
          </div>
      </div>
      <div className='flex self-center w-50'>
              <div className='flex w-1/5 align-items-center'>
                  <span>{likes.length > 0 ? likes.length : '0'}</span>
                  { likes.includes(user._id) ?  
                  <a href="#" onClick={(e) => unlikeTalk(e)} className='ml-2 text-red-500'><FaHeartBroken/></a> :
                  <a href="#" onClick={(e) => likeTalk(e)} className='text-red-500 ml-2'><FaHeart/></a>
                  }
              </div>
              <div className='flex w-1/5 align-items-center'>
                          <span className='mr-2'>{comments.length > 0 ? comments.length : '0'}</span>
                          <a href="#" onClick={(e) => showComments(e)}><ChatIcon /></a>
              </div>
             
          </div>
          <div className='w-50 flex self-center'>
                  { openComments ? <div>
                          <ul>
                              { comments ? 
                                  comments.map(comment=>{
                                      return(
                                      <li key={comment._id} className="text-base tracking-tighter"><span className="text-base tracking-tighter" style={{fontWeight:"500"}}>{comment.postedBy.name}</span> {comment.text}</li>
                                      )
                                  }) : ''
                              }
                          </ul>
                          <form onSubmit={(e) => submitComment(e)} className='mt-2'>
                            <input className='w-full' type="text" placeholder="add a comment" value={text} onChange={(e) => setText(e.target.value)}/>
                          </form>
                   </div>: ''
                  }
          </div>
  
    </div>
</div>
  )
}

export default AttendedEventsList
