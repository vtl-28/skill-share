import { useState, useContext } from "react";
import { TalkContext } from "../Context/TalkProvider";
import {
  handleCommentNotification,
  handleLikeNotification,
} from "../Utils/notifications";
import { commentTalk, likeTalk, unlikeTalk } from "../Utils/talk";

const useInteractWithTalk = () => {
  const { user, socket } = useContext(TalkContext);
  const [text, setText] = useState("");

  async function like(e, _id) {
    e.preventDefault();
    const response = await likeTalk(_id);
    handleLikeNotification(1, response, socket, user);
  }

  async function unlike(e, _id) {
    e.preventDefault();
    const response = await unlikeTalk(_id);
    handleLikeNotification(2, response, socket, user);
  }

  const submitComment = async (e, _id, text, setText) => {
    e.preventDefault();
    const data = {
      text: text,
    };
    const response = await commentTalk(_id, data);
    setText("");
    handleCommentNotification(3, response, socket, user);
  };

  return { like, unlike, submitComment };
};

export default useInteractWithTalk;
