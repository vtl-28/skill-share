import UserTalksList from "../UserTalksList";
import TalksList from "../TalksList";

 export function displayTalks(data){
  console.log(data)
    const talks = Object.keys(data)
   return <ul>{talks.map(talk => {
        console.log(data[talk])
       return <TalksList key={data[talk._id]}   talk={data[talk]}/>
   })}</ul>
    
 }
 export function displayHostTalks(userTalks, deleteTalk){
  console.log(userTalks)
    return <ul>{userTalks.map(talk => {
        return <UserTalksList key={talk._id} talk={talk} deleteTalk={deleteTalk}/>
    })}</ul>
  }