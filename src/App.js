import cookie from "js-cookie";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { FormReply } from "./formReply/pages/FormReply";


// import { PublicHomePage } from "./PublicHomePage";
import AuthContext from "./shared/contexts/auth.context";
import FormReplyContextProvider from "./shared/contexts/form-reply.context";
import ConfirmLogin from "./user/pages/ConfirmLogin";
import Login from "./user/pages/Login";
import { User } from "./user/pages/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Routes = ({ authProceed }) => {
  // console.log(authProceed)

  return (
    <Switch>
      <Route exact path="/">
        {/* {authProceed ? <Redirect to="/user" /> : <PublicHomePage />} */}
        {authProceed ? <Redirect to="/user" /> : <Login />}
      </Route>
      {/* <Route exact path="/" component={Login} /> */}

      {/* <Route exact path="/" component={PublicHomePage} /> */}
      <Route path="/login/google" component={ConfirmLogin} />
      <Route path="/login/facebook" component={ConfirmLogin} />

      <ProtectedLogin path="/login" authProceed={authProceed} component={Login} />

      <ProtectedRoute
        path="/user"
        authProceed={authProceed}
        component={User}
      />
      <Route path="/form/:form_id/:ref_id" component={FormReply} />
    </Switch>
  );
};
const ProtectedRoute = ({ authProceed, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (authProceed ? <Component /> : <Redirect to="/login" />)}
    />
  );
};
const ProtectedLogin = ({ authProceed, component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      render={() =>
        !authProceed ? <Component /> : <Redirect to="/user" />
      }
    />
  );
};
function App() {
  const [authProceed, setAuthProceed] = useState(true);
  const [token, setToken] = useState(false);
  const [user, setUser] = useState();
  const contextClass = {
    success: "bg-green-800",
    error: "bg-red-600",
    info: "bg-gray-600",
    warning: "bg-yellow-800 font-gray-100",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  useEffect(() => {

    const readCookie = () => {
      const userData = cookie.get("userData");
      // console.log(userData);
      if (userData) {
        const { token, user } = JSON.parse(userData);

        if (token && user) {
          setToken(token);
          setUser(user);
          setAuthProceed(true);
        }
      } else {
        setToken(false);
        setUser(false);
        setAuthProceed(false);
      }

    };
    readCookie();

  }, [setAuthProceed, token]);

  const clearWaitingQueue = () => {
    // Easy, right 😎
    toast.clearWaitingQueue();
  }

  if (clearWaitingQueue) { }
  return (
    <>



      <AuthContext.Provider value={{ token, setToken, user, setUser, authProceed }}>
        <FormReplyContextProvider>
          <Router >
            <Routes authProceed={authProceed} />
          </Router>
        </FormReplyContextProvider>

      </AuthContext.Provider>
      {/* <ToastContainer limit={1} /> */}
      <ToastContainer
        toastClassName={({ type }) => contextClass[type || "default"] +
          " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
        }
        bodyClassName={() => " font-white font-med block p-3"}

        autoClose={3000}
        limit={1}
      />
    </>
  );
}

export default App;
