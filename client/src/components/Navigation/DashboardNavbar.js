import { Search2Icon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputRightAddon,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { TalkContext } from "../../Context/TalkProvider";
import LoadingSpinner from "../LoadingSpinner";
import LogoutAlertDialog from "../LogoutAlertDialog";
import ErrorToast from "../../components/Toasts/ErrorToast";
import { searchTalk } from "../../Utils/talk";

const DashboardNavbar = () => {
  const [notifications, setNotifications] = useState([]);
  const [tempNotifications, setTempNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const { user, socket } = useContext(TalkContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const { _id } = user;
  console.log(user);
  console.log(_id);
  const api = `/profile/${_id}`;

  useEffect(() => {
    socket.on("create talk notification", (data) => {
      setTempNotifications((notifications) => [...notifications, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("like notification", (data) => {
      setTempNotifications((notifications) => [...notifications, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("comment notification", (data) => {
      setTempNotifications((notifications) => [...notifications, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("attend talk notification", (data) => {
      setTempNotifications((notifications) => [...notifications, data]);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("cancel talk notification", (data) => {
      setTempNotifications((notifications) => [...notifications, data]);
    });
  }, [socket]);

  tempNotifications.forEach((n) => {
    if (!notifications.includes(n)) {
      notifications.push(n);
    }
  });

  const displayNotification = (notification) => {
    const { id, sender, response, type } = notification;

    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "unliked";
    } else if (type === 3) {
      action = "commented on";
    } else if (type === 4) {
      action = "created";
    } else if (type === 5) {
      action = "booked";
    } else {
      action = "cancelled";
    }

    return (
      <div key={id} className="notification">
        {type === 1 || type === 2 || type === 3 ? (
          <p>{`${sender.name} ${action} your talk event`}</p>
        ) : (
          ""
        )}
        {type === 4 ? <p>{`${sender.name} created a new talk event.`}</p> : ""}
        {type === 5 ? (
          <p>{`${sender.name} has ${action} a spot on your talk event`}</p>
        ) : (
          ""
        )}
        {type === 6 ? (
          <p>{`${sender.name} has ${action} their booking.`}</p>
        ) : (
          ""
        )}

        <div className="flex w-full justify-between px-2">
          <a href="#" name={id}>
            Mark as read
          </a>
          <a href={`/talk/${response._id}`} className="w-1/2 text-center">
            Open
          </a>
        </div>
      </div>
    );
  };

  async function handleSearch(e) {
    e.preventDefault();

    if (!search) {
      return <div>Please Enter something in search</div>;
    }

    try {
      setIsLoading(true);
      const response = await searchTalk(search);

      const hostDetailsValidation = typeof response === "object" ? "yes" : "no";

      if (hostDetailsValidation === "no") {
        setIsLoading(false);
        setErrorMessage(response);
        toggleErrorToast();
      } else {
        setIsLoading(false);
        setSearch("");
        Object.keys(response).map((resp) => {
          setSearchResult([...searchResult, response[resp]]);
          searchResult.push(response[resp]);
        });
      }
    } catch (error) {
      return <div>Error occured</div>;
    }
  }

  let activeStyle = {
    fontWeight: "bold",
    color: "rgb(15 118 110)",
  };

  return (
    <div className="border-b border-zinc-200">
      <Navbar expand="lg" className="py-3">
        <Container>
          <Navbar.Brand
            href="/dashboard"
            className="text-rose-500 font-semibold tracking-widest text-lg font-link xs:mr-0 md:mr-12 lg:mr-20"
          >
            Talk Host
          </Navbar.Brand>
          <InputGroup
            hideBelow="sm"
            className="flex"
            w={["50%", "50%", "50%", "30%", "30%"]}
          >
            <Input
              size="md"
              type="search"
              placeholder="Search for talk events"
              className="me-2"
              aria-label="Search"
              value={search}
              name="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputRightAddon
              style={{ backgroundColor: "rgb(244 63 94)" }}
              children={
                <a href="#" onClick={(e) => handleSearch(e)}>
                  <Search2Icon className="text-white" />
                </a>
              }
            />
          </InputGroup>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            className="navbar-toggler-style"
          />
          <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
            <Nav
              className="flex justify-between"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                as={NavLink}
                to="/hostTalk"
                className="hover:text-teal-700 lg:mr-2 xl:mr-4 leading-5  font-medium text-slate-900 font-link"
              >
                Host talk
              </Nav.Link>
              <Nav.Link
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
                as={NavLink}
                to={api}
                className=" hover:text-teal-700 lg:mr-2  xl:mr-4 leading-5  font-medium text-slate-900 font-link"
              >
                Profile
              </Nav.Link>
              <Nav.Link
                href="#"
                className="hover:text-teal-700 lg:mr-2  xl:mr-4 leading-5  font-medium text-slate-900 font-link"
                onClick={() => setOpen(!open)}
              >
                <span>
                  {notifications.length > 0 ? notifications.length : ""}
                </span>
                <FaBell className="inline" />
              </Nav.Link>
              {open && (
                <ul className="notifications">
                  {notifications.map((n) => displayNotification(n))}
                </ul>
              )}
              <Nav.Link
                className="hover:text-teal-700  leading-5 font-medium text-slate-900 font-link"
                onClick={onOpen}
              >
                Log out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        className={
          showErrorToast ? "w-1/4 ml-56 h-52 z-50" : "w-1/4 ml-56 z-50"
        }
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ul className="z-50">
            {searchResult.map((result) => {
              return (
                <li key={result._id} className="searchResult z-50">
                  <a href={`/talk/${result._id}`}>{result.title}</a>
                </li>
              );
            })}
          </ul>
        )}
        {showErrorToast && (
          <ErrorToast
            message={errorMessage}
            showErrorToast={showErrorToast}
            toggleErrorToast={toggleErrorToast}
          />
        )}
      </div>
      <LogoutAlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      />
    </div>
  );
};

export default DashboardNavbar;
