import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App/App';
import './index.css';
import { store } from './redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <App />
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </ThemeProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);
