import { Heading } from "@chakra-ui/react";
import { faClock, faCompass } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Attendant from "../../components/Attendant";
import AttendNavbar from "../../components/AttendNavbar";
import Footer from "../../components/Footer";
import { attendTalk, cancelTalk, fetchTalk } from "../../Utils/talk";
import DashboardNavbar from "../../components/Navigation/DashboardNavbar";
import TalkLocationMap from "../../components/TalkLocationMap";
import ErrorToast from "../../components/Toasts/ErrorToast";
import SuccessToast from "../../components/Toasts/SuccessToast";
import { TalkContext } from "../../Context/TalkProvider";
import {
  handleAttendTalkNotification,
  handleCancelTalkNotification,
} from "../../Utils/notifications";
import { useTalkState } from "../../hooks/useLocalStateVariables";

const Index = () => {
  const { id } = useParams();
  const { user, socket } = useContext(TalkContext);
  const { showSuccessToast,
    showErrorToast,
    successMessage, setSuccessMessage,
    errorMessage, setErrorMessage,
    toggleSuccessToast,
    toggleErrorToast } = useTalkState()

  const { data, error, status } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => fetchTalk(id),
    enabled: true,
    refetchOnMount: true,
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  if (status === "loading") {
    return <div>loading profile</div>;
  }

  if (status === "error") {
    return <div>{error.message}</div>;
  }

  const { _id, title, hostedBy, pic, date, attendants, city, coordinates } =
    data;

  const { _id: hostId, name, profession, pic: hostPic } = hostedBy;

  async function bookSeat(e) {
    e.preventDefault();
    if (attendants.includes(user._id)) {
      setErrorMessage("You are already attending this talk event");
      toggleErrorToast();
      return;
    } else {
      const response = await attendTalk(_id);

      const hostDetailsValidation = typeof response === "object" ? "yes" : "no";

      if (hostDetailsValidation === "no") {
        setErrorMessage(response);
        toggleErrorToast();
      } else {
        setSuccessMessage(
          "You have successfully booked a seat for the talk event"
        );
        handleAttendTalkNotification(5, response, socket, user);
        toggleSuccessToast();
      }
    }
  }
  async function cancelSeat(e) {
    e.preventDefault();

    const response = await cancelTalk(_id);
    console.log(response);
    const hostDetailsValidation = typeof response === "object" ? "yes" : "no";

    if (hostDetailsValidation === "no") {
      setErrorMessage(response);
      toggleErrorToast();
    } else {
      setSuccessMessage(
        "You have successfully cancelled your seat for the talk event"
      );
      handleCancelTalkNotification(6, response, socket, user);
      toggleSuccessToast();
    }
  }

  return (
    <div className="remove-overflow">
      <DashboardNavbar />
      <div className="container px-0">
        <div className="flex flex-col py-6 border-b-2 border-red-400 xs:mx-0">
          <h1 className="text-3xl font-bold text-black font-link">{title}</h1>
          <div className="flex flex-row xs:w-4/5 mt-4">
            <div className="flex xs:align-items-center xs:w-20">
              <a href={`/host/${hostId}`}>
                <img
                  src={hostPic}
                  alt="logo"
                  className="rounded-full"
                  target="blank"
                />
              </a>
            </div>
            <div className="flex flex-col justify-center ml-4 xs:w-1/2">
              <h1 className="mb-2 font-semibold">Hosted By</h1>
              <h1 className="font-bold">{name}</h1>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-10 pt-6 bg-gray-50 xs:mb-96 md:mb-0">
          <div className="xs:col-start-1 xs:col-span-10 md:col-start-1 md:col-span-5">
            <img src={pic} alt="logo" className="w-full" />
            <h1 className="mt-3 mb-4 text-xl font-bold">Details</h1>
            <p className="mb-3 font-bold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <a
              href="#"
              onClick={(e) => bookSeat(e)}
              className="mt-8 text-teal-600 font-semibold"
            >
              Ticket here
            </a>
            <div className="flex flex-col mt-6">
              <div className="flex justify-between mb-3">
                <Heading as="h1" className="text-xl font-bold font-link">
                  Attendees {attendants.length > 0 ? attendants.length : ""}
                </Heading>
                <a href="#" className="text-teal-600 font-semibold">
                  See all
                </a>
              </div>
              <div>
                <ul className="flex justify-between flex-wrap">
                  {attendants ? (
                    attendants.map((attendant) => {
                      return <Attendant attendant={attendant} />;
                    })
                  ) : (
                    <div>No attendants have booked for this talk event yet</div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="xs:col-start-1 xs:col-span-8 md:col-start-7 md:col-span-4">
            <div className="flex p-4 border rounded xs:hidden md:flex">
              <img src={hostPic} alt="logo" className="w-1/4" />
              <div className="flex flex-col ml-4">
                <h1 className="font-bold">{name}</h1>
                <h1 className="mt-2 text-slate-500">{profession}</h1>
              </div>
            </div>
            <div className="flex flex-col justify-between p-4 mt-4 border rounded xs:hidden md:flex">
              <div className="flex">
                <FontAwesomeIcon icon={faClock} />
                <h1 className="ml-4">
                  {format(new Date(date), "eee',' MMM d',' y", {
                    weekStartsOn: 1,
                  })}
                </h1>
              </div>
              <div className="flex mt-3">
                <FontAwesomeIcon icon={faCompass} />
                <h1 className="ml-4">{city}</h1>
              </div>
            </div>
            <div className="mt-4">
              <TalkLocationMap
                address={city}
                addressCoordinates={coordinates}
              />
            </div>
            {showSuccessToast && (
              <SuccessToast
                placement="middle-center"
                message={successMessage}
                showSuccessToast={showSuccessToast}
                toggleSuccessToast={toggleSuccessToast}
              />
            )}
            {showErrorToast && (
              <ErrorToast
                placement="middle-center"
                message={errorMessage}
                showErrorToast={showErrorToast}
                toggleErrorToast={toggleErrorToast}
              />
            )}
          </div>
        </div>
        <div className="grid grid-cols-10 ">
          <div className="xs:col-span-10 xs:col-start-1">
            <AttendNavbar
              title={title}
              date={date}
              book={bookSeat}
              cancel={cancelSeat}
              attendants={attendants}
            />
          </div>
        </div>
      </div>
      <div className="footer-three-style">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
