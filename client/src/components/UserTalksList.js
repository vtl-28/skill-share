import React from "react";
import { FaAlignJustify } from "react-icons/fa";
import { format } from "date-fns";
import TalkActionsModal from "./Modals/TalkActionsModal";

function UserTalksList({ talk, deleteTalk }) {
  const [modalShow, setModalShow] = React.useState(false);

  const { _id, title, date, location, pic, city } = talk;
  return (
    <div
      className="flex justify-around w-full border-slate-300 border-t-2 py-4"
      key={_id}
    >
      <div className="w-1/5">
        <img src={pic} alt="logo" />
      </div>
      <div className="w-1/2 flex flex-col">
        <h4 className="mb-2 xs:text-sm sm:text-base">
          {format(new Date(date), "eee',' d MMM y',' h':'mm a", {
            weekStartsOn: 1,
          })}
        </h4>
        <h4 className="mb-2 xs:text-sm sm:text-base">{title}</h4>
        <h4 className="xs:text-sm sm:text-base">{city}</h4>
      </div>
      <div className="">
        <a href="#" onClick={() => setModalShow(true)}>
          <FaAlignJustify />
        </a>
        <TalkActionsModal
          talkDetails={talk}
          deleteTalk={deleteTalk}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    </div>
  );
}

export default UserTalksList;
