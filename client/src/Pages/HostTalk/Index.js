import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { format } from "date-fns";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import { Spinner } from "react-bootstrap";
import Footer from "../../components/Footer";
import { displayHostTalks } from "../../components/miscellaneous/DisplayItems";
import { addHostTalk } from "../../Utils/talk";
import DashboardNavbar from "../../components/Navigation/DashboardNavbar";
import PlacesAutoComplete from "../../components/PlacesAutoComplete";
import UploadHostProfilePic from "../../components/UploadHostProfilePic";
import ErrorToast from "../../components/Toasts/ErrorToast";
import SuccessToast from "../../components/Toasts/SuccessToast";
import { TalkContext } from "../../Context/TalkProvider";
import { useFetch } from "../../hooks/useFetchHostedEvents";
import { handleHostTalkNotification } from "../../Utils/notifications";
import { useHostTalkState } from "../../hooks/useLocalStateVariables";

const Index = () => {
  const talkDetails = `   What's the purpose of the talk? 
    Who should join? 
    What will you do at your talks?`;
  const { user, socket, address, addressCoordinates, picUrl } =
    useContext(TalkContext);
  const {
    title,
    setTitle,
    body,
    setBody,
    location,
    setLocation,
    startDate,
    setStartDate,
    successMessage,
    setSuccessMessage,
    errorMessage,
    setErrorMessage,
    dataIsLoading,
    setDataIsLoading,
    toggleSuccessToast,
    toggleErrorToast,
    showErrorToast,
    showSuccessToast,
  } = useHostTalkState();

  const { _id } = user;

  const { data: userTalks, status, error } = useFetch(_id);
  if (status === "loading") {
    return (
      <Spinner
        animation="border"
        size="lg"
        role="status"
        aria-hidden="true"
        variant="secondary"
        className="spin"
      />
    );
  }

  if (status === "error") {
    return <div>{error.message}</div>; // error state
  }
  const caveat = (
    <div>
      You have not hosted any talks. Talks you have hosted will appear here
    </div>
  );

  const submitForm = async (e) => {
    e.preventDefault();

    setDataIsLoading(true);
    let date = format(new Date(startDate), "d'-'MMM'-'y',' h':'mm a", {
      weekStartsOn: 1,
    });
    const data = {
      title,
      body,
      picUrl,
      location,
      address,
      date,
      addressCoordinates,
    };

    let response = await addHostTalk(data);
    const hostDetailsValidation = typeof response === "object" ? "yes" : "no";

    if (hostDetailsValidation === "no") {
      setDataIsLoading(false);
      setErrorMessage(response);
      toggleErrorToast();
    } else {
      setDataIsLoading(false);
      setSuccessMessage("Successfully created talk event");
      handleHostTalkNotification(4, response, socket, user);
      setTitle("");
      setBody("");
      setStartDate("");
      setLocation("");
      toggleSuccessToast();
    }
  };
  function deleteTalk(e) {
    e.preventDefault();
    setDataIsLoading(true);
    axios.delete(`/api/talks/delete/${e.target.name}`);
    setDataIsLoading(false);
    setSuccessMessage("Talk event successfully deleted");
    toggleSuccessToast();
    userTalks.filter((talks) => talks._id !== e.target.name);
  }

  return (
    <div>
      <DashboardNavbar />
      <div className="container mx-auto">
        <Heading className="flex justify-center mt-4">Host Talk</Heading>
        <div className="grid grid-cols-12 py-8">
          <div className="xs:col-start-1 xs:col-span-12 lg:col-start-1 lg:col-span-5 xs:mb-16">
            {userTalks.length > 0
              ? displayHostTalks(userTalks, deleteTalk)
              : caveat}
          </div>
          {showSuccessToast && (
            <SuccessToast
              placement={"middle-center"}
              message={successMessage}
              showSuccessToast={showSuccessToast}
              toggleSuccessToast={toggleSuccessToast}
            />
          )}
          {showErrorToast && (
            <ErrorToast
              placement={"middle-center"}
              message={errorMessage}
              showErrorToast={showErrorToast}
              toggleErrorToast={toggleErrorToast}
            />
          )}
          <div className="xs:col-start-1 xs:col-span-12 lg:col-start-7 lg:col-span-6 xl:col-start-8 xl:col-span-5">
            <div className="flex justify-center mb-4">
              <h1 className="font-semibold  xs:text-xl md:text-2xl lg:text-xl">
                Fill in the below form to host your own talk event
              </h1>
            </div>
            <Card>
              <CardBody>
                <FormControl className="mb-3">
                  <FormLabel className="font-link">Title</FormLabel>
                  <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    name="title"
                  />
                </FormControl>
                <FormControl className="mb-3">
                  <FormLabel className="font-link">About</FormLabel>
                  <Textarea
                    h="100px"
                    placeholder={talkDetails}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    name="body"
                  />
                </FormControl>
                <UploadHostProfilePic />
                <FormControl className="mb-3">
                  <FormLabel className="font-link">Venue</FormLabel>
                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    name="location"
                    placeholder="Enter the venue of the talk event"
                  />
                </FormControl>
                <FormControl className="mb-3">
                  <FormLabel className="font-link">Date</FormLabel>

                  <DatePicker
                    showIcon
                    isClearable
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="dd-MMMM-yyyy h:mm aa"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </FormControl>
                <PlacesAutoComplete />
                <FormControl>
                  <Button
                    bgColor="#F64060"
                    className="w-full"
                    onClick={submitForm}
                  >
                    {dataIsLoading && (
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        variant="secondary"
                      />
                    )}
                    <span
                      className={
                        dataIsLoading
                          ? "visually-hidden text-white"
                          : "text-white"
                      }
                    >
                      Host Talk
                    </span>
                  </Button>
                </FormControl>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="footer-two-style">
        <Footer />
      </div>
    </div>
  );
};

export default Index;
