import axios from 'axios';
import React, { useState } from 'react'
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { like, unlike } from '../components/miscellaneous/Utils';

function TalksList({talk}){
    const { _id, title, body, date, location, pic, comments, likes, hostedBy } = talk;
    console.log(_id)
    const [ text, setText ] = useState('');


  const submitComment = (e) => {
    e.preventDefault()
    axios.put(`api/talks/comment/${_id}`, text, { headers: {
        'Authorization':"Bearer "+localStorage.getItem("jwt").replace(/"/g,"")
    }}).then(response => {
        console.log(response.data)
    }).catch(error => {
        console.log(error.response.data)
    })
  }

    return(
      <div key={_id}>
          <div className='flex flex-col border-red-200 border-y-2 py-2'>
            <div className='justify-around flex w-full '>
                <div className='w-1/5 border-2 border-green-500'>
                   <a href={`/talk/${_id}`} target='blank'><img src={pic} alt="talk logo"/></a>
                </div>
                <div className='w-1/2 flex flex-col border-2 border-green-500'>
                    <h4 className='mb-2'>{date}</h4>
                    <h4 className='mb-2'>{title}</h4>
                    <h4>{location}</h4>
                </div>
                <div className='w-1/5 border-green-500 border-2'>
                    <h1>Attendees</h1>
                </div>
            </div>
            <div className='flex flex-col mt-4 w-50 self-center'>
                    <div className='flex w-1/5'>
                        <a href="#" onClick={() => like(_id)} className='text-red-500'><FaHeart/></a>
                        <a href="#" onClick={() => unlike(_id)} className='ml-2 text-red-500'><FaHeartBroken/></a>
                    </div>
                    <div>
                    <h3>{likes.length}likes</h3>
{/*                 
                                {
                                    comments.map(comment=>{
                                        return(
                                        <h3 key={comment._id}><span style={{fontWeight:"500"}}>{comment.postedBy.name}</span> {comment.text}</h3>
                                        )
                                    })
                                } */}
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
