import { useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import LoginModal from "../Modals/LoginModal";
import RegisterModal from "../Modals/RegisterModal";

const HomeNavbar = ({ ls }) => {
  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();
  return (
    <div>
      <Navbar bg="white">
        <div className="flex justify-between w-full px-2 align-items-center">
          <Navbar.Brand
            href="/"
            className="text-lg font-semibold leading-5 text-rose-500 font-link"
          >
            Talk Host
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse id="navbarScroll" className="flex-row-reverse">
            <Nav
              className="flex justify-between"
              style={{ maxHeight: "100px" }}
            >
              <Nav.Link
                className="mr-4 font-medium leading-5 xs:text-sm sm:text-base text-slate-900 hover:text-teal-700 font-link "
                onClick={onOpenLogin}
              >
                Log in
              </Nav.Link>
              <Nav.Link
                className="font-medium leading-5 xs:text-sm sm:text-base text-slate-900 hover:text-teal-700 font-link"
                onClick={onOpenSignup}
              >
                Sign up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <LoginModal isOpen={isOpenLogin} onClose={onCloseLogin} />
      <RegisterModal isOpen={isOpenSignup} onClose={onCloseSignup} ls={ls} />
    </div>
  );
};

export default HomeNavbar;
