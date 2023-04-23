import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { TalkContext } from "../Context/TalkProvider";
import { displayAttendedTalks } from "./miscellaneous/DisplayItems";
import { InfoIcon } from "@chakra-ui/icons";
import { fetchAttendedTalks } from "../Utils/talk";

const AttendedEvents = () => {
  const { user } = useContext(TalkContext);
  const { _id } = user;

  console.log(_id);

  const { data, status } = useQuery({
    queryKey: ["attendedTalks"],
    queryFn: () => fetchAttendedTalks(_id),
    refetchOnMount: true,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
  if (status === "loading") {
    return <div>loading talks</div>;
  }

  return (
    <div>
      {data.length > 0 ? (
        displayAttendedTalks(data)
      ) : (
        <div className="p-4 mt-2 text-center bg-slate-200 rounded-md">
          <div className="bg-white p-4 flex flex-col">
            <InfoIcon className="self-center text-2xl" />
            <p className="mt-2">
              You have not registered for any talks. Talks you have registered
              for will appear here
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendedEvents;
