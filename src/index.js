import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./Style/style.css";
import { ChakraProvider } from "@chakra-ui/react";
import CreateChannelProvider from "./States/Reducers/CreateChannelProvider";
import { authInitialState, AuthReducer } from "./States/Reducers/AuthReducer";
import AuthProvider from "./States/AuthProvider";
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider reducer={AuthReducer} initialState={authInitialState}>
      <CreateChannelProvider>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </CreateChannelProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
