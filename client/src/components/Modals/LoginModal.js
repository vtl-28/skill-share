import React, {  useState } from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { loginHost } from "../../Utils/host";
import { Spinner } from "react-bootstrap";
import RegisterModal from "./RegisterModal";
import ErrorToast from "../Toasts/ErrorToast";

const LoginModal = ({ onClose, isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  const {
    isOpen: isOpenSignup,
    onOpen: onOpenSignup,
    onClose: onCloseSignup,
  } = useDisclosure();

  const toggleErrorToast = () => setShowErrorToast(!showErrorToast);
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      email,
      password,
    };
    let response = await loginHost(data);

    const hostDetailsValidation = typeof response === "object" ? "yes" : "no";

    if (hostDetailsValidation === "no") {
      setIsLoading(false);
      setErrorMessage(response);
      toggleErrorToast();
    } else {
      setIsLoading(false);
      navigate("/dashboard", { state: response });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" className="py-10">
            <Flex
              direction="column"
              alignItems="center"
              h="120px"
              justifyContent="space-between"
            >
              <Text
                fontSize="2xl"
                color="#F64060"
                className="font-semibold font-link"
              >
                <Link>Talk Host</Link>
              </Text>
              <Heading>Log in</Heading>
              <Text className="text-lg leading-5">
                Not a member?{" "}
                <Link color="#008294" onClick={onOpenSignup}>
                  Sign up
                </Link>
              </Text>
            </Flex>
            {showErrorToast && (
              <ErrorToast
                message={errorMessage}
                showErrorToast={showErrorToast}
                toggleErrorToast={toggleErrorToast}
              />
            )}

            <Box className="pt-10">
              <FormControl className="mb-3">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl className="mb-6">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Button
                  bgColor="#F64060"
                  className="w-full"
                  onClick={submitForm}
                >
                  {isLoading && (
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
                      isLoading ? "visually-hidden text-white" : "text-white"
                    }
                  >
                    Log in
                  </span>
                </Button>
              </FormControl>
            </Box>
            <RegisterModal isOpen={isOpenSignup} onClose={onCloseSignup} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
