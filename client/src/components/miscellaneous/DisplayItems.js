import UserTalksList from "../UserTalksList";

 export function displayTalks(data){
    const talks = Object.keys(data)
   return <ul>{talks.map(talk => {
        console.log(data[talk])
       return <UserTalksList key={data[talk._id]}   talk={data[talk]}/>
   })}</ul>
    
 }
 export function displayHostTalks(userTalks){
    return <ul>{userTalks.map(talk => {
        return <UserTalksList key={talk._id} talk={talk}/>
    })}</ul>
  }