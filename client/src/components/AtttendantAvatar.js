import { Avatar, AvatarGroup } from '@chakra-ui/react'
import React from 'react'

const AtttendantAvatar = ({attendee}) => {
  return (
        <div>
            <a href={`/host/${attendee._id}`} > <Avatar size='sm' name={`${attendee.name}`} src={attendee.pic} /> </a>
        </div>
  )
}

export default AtttendantAvatar
