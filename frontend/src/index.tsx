import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App/App";
import "./index.css";
import { store } from "./redux/config/config";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
