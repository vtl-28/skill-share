import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
//import 'react-date-picker/dist/DatePicker.css';
import "./index.css";
import "./App.css";
import App from "./App";
import TalkProvider from "../src/Context/TalkProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "react-ui";
import { tokens, components } from "react-ui/themes/light";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDependentScript from 'react-dependent-script';

const queryClient = new QueryClient();


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ReactDependentScript
      scripts={[`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_PLACES_KEY}&libraries=places&callback=initMap`]}
      >
      <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TalkProvider>
          <ThemeProvider tokens={tokens} components={components}>
            <ChakraProvider>
              <App />
            </ChakraProvider>
          </ThemeProvider>
        </TalkProvider>
      </QueryClientProvider>
    </BrowserRouter>
    </ReactDependentScript>

  </React.StrictMode>
);
