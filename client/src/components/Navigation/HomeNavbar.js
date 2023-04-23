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
  console.log(ls);
  return (
    <div>
      <Navbar bg="white">
        <div className="flex justify-between align-items-center px-2 w-full">
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
                className="mr-4 xs:text-sm sm:text-base font-medium leading-5 text-slate-900 hover:text-teal-700 font-link "
                onClick={onOpenLogin}
              >
                Log in
              </Nav.Link>
              <Nav.Link
                className="xs:text-sm sm:text-base font-medium leading-5 text-slate-900 hover:text-teal-700 font-link"
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
