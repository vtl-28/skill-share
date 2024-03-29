import React, { useState, useContext } from "react";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import ErrorToast from "../components/Toasts/ErrorToast";
import SuccessToast from "../components/Toasts/SuccessToast";
import { TalkContext } from "../Context/TalkProvider";
import { Input } from "@chakra-ui/react";
import { ChatIcon } from "@chakra-ui/icons";
import { format } from "date-fns";
import useInteractWithTalk from "../hooks/useInteractWithTalk";

function TalksList({ talk }) {
  const { user } = useContext(TalkContext);
  const { _id, title, date, city, pic, comments, likes, attendants } = talk;
  const [text, setText] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState([]);
  const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);
  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const [openComments, setOpenComments] = useState(false);
  const { like, unlike, submitComment } = useInteractWithTalk();

  function showComments(e) {
    e.preventDefault();
    setOpenComments((openComments) => !openComments);
  }

  return (
    <div key={_id}>
      {showSuccessToast && (
        <SuccessToast
          message={successMessage}
          showSuccessToast={showSuccessToast}
          toggleSuccessToast={toggleSuccessToast}
        />
      )}
      {showErrorToast && (
        <ErrorToast
          message={errorMessage}
          showErrorToast={showErrorToast}
          toggleErrorToast={toggleErrorToast}
        />
      )}
      <div className="flex flex-col py-3 border-slate-300 border-t-2">
        <div className="flex justify-around w-full mb-2">
          <div className="w-1/5">
            <a href={`/talk/${_id}`}>
              <img src={pic} alt="talk logo" />
            </a>
          </div>
          <div className="flex flex-col xs:w-3/4 sm:w-1/2">
            <h4 className="mb-2 xs:text-sm sm:text-base">
              {date ? (
                format(new Date(date), "eee',' MMM d',' h':'mm a", {
                  weekStartsOn: 1,
                })
              ) : (
                <h3>oops</h3>
              )}
            </h4>
            <h4 className="mb-2 xs:text-sm sm:text-base">{title}</h4>
            <h4 className="xs:text-sm sm:text-base">{city}</h4>
          </div>
          <div className="w-1/5 xs:hidden sm:block">
            <h1 className="xs:text-sm sm:text-base">
              {attendants ? attendants.length : "0"} Attendees
            </h1>
          </div>
        </div>
        <div className="flex self-center w-50">
          <div className="flex xs:w-1/3 align-items-center">
            <span>{likes.length > 0 ? likes.length : "0"}</span>
            {likes.includes(user._id) ? (
              <a
                href="#"
                onClick={(e) => unlike(e, _id)}
                className="ml-2 text-red-500"
              >
                <FaHeartBroken />
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) => like(e, _id)}
                className="text-red-500 ml-2"
              >
                <FaHeart />
              </a>
            )}
          </div>
          <div className="flex xs:w-1/3 align-items-center">
            <span className="mr-2">
              {comments.length > 0 ? comments.length : "0"}
            </span>
            <a href="#" onClick={(e) => showComments(e)}>
              <ChatIcon />
            </a>
          </div>
        </div>
        <div className="w-50 flex self-center">
          {openComments ? (
            <div>
              <ul>
                {comments
                  ? comments.map((comment) => {
                      return (
                        <li
                          key={comment._id}
                          className="xs:text-sm sm:text-base"
                        >
                          <span style={{ fontWeight: "500" }}>
                            {comment.postedBy.name}
                          </span>{" "}
                          {comment.text}
                        </li>
                      );
                    })
                  : ""}
              </ul>
              <form onSubmit={(e) => submitComment(e, _id, text, setText)} className="mt-2">
                <input
                  className="w-full"
                  type="text"
                  placeholder="comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default TalksList;
