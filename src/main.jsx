import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App.jsx";
import "./index.css";

const customTheme = extendTheme({
  fonts: {
    body: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
  },
  colors: {
    background: "RGBA(0, 0, 0, 0.04)",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
