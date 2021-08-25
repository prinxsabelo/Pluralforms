import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import jwt from 'jsonwebtoken';
import cookie from "js-cookie";
import axios from "axios";

const jwt_token = "KVCQFJI7zBWSq8TDIpUD5wzHLkSAJnK0X496Y8aKoCff0Wgemf6eqxpNWb5xY8bO";
const userData = cookie.get("userData");
if (userData) {
    const { token } = JSON.parse(userData);
    if (token) {
        jwt.verify(token, jwt_token, function (err, decoded) {

            if (err) {
                // Error dey here, make i no lie you sha..
                // console.log(err);
                // cookie.remove("userData");
                // window.location.href = "https://pluralforms.com/user/forms";


            } else {
                // Coming to back to fill in this too
                // if (decoded.iss !== "http://localhost:8000/api/login/google/callback"
                //   && decoded.iss !== "http://localhost:8000/api/login/facebook/callback") {
                //   cookie.remove("userData");
                //   alert('Unauthenicatedy..');
                // }
            }

            // console.log(decoded);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        })
    }

}

// if (Auth.token) {
//   const token = Auth.token;
//   console.log(token);
// }
ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
