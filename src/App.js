import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { PublicHomePage } from "./PublicHomePage";
import AuthContext from "./shared/context/auth-context";
import ConfirmAuth from "./user/pages/ConfirmAuth";
import Login from "./user/pages/Login";
import Signup from "./user/pages/Signup";
import { User } from "./user/pages/User";

const Routes = ({ authProceed }) => {
  console.log(authProceed)

  return (
    <Switch>
      <Route exact path="/">
        {authProceed ? <Redirect to="/user" /> : <PublicHomePage />}
      </Route>
      <ProtectedLogin path="/login" authProceed={authProceed} component={Login} />
      <ProtectedLogin path="/signup" authProceed={authProceed} component={Signup} />
      <Route path="/auth/google" component={ConfirmAuth} />
      <Route path="/auth/facebook" component={ConfirmAuth} />
      <ProtectedRoute
        path="/user"
        authProceed={authProceed}
        component={User}
      />
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
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  useEffect(() => {
    const readCookie = () => {
      const userData = Cookies.get("userData");
      if (userData) {
        const { token, id, email } = JSON.parse(userData);

        if (token && id) {
          setToken(token);
          setEmail(email);
          setId(id)
          setAuthProceed(true);
        }
      } else {
        setToken(false);
        setEmail(false);
        setId(false);
        setAuthProceed(false);
      }

    };
    readCookie();

  }, [setAuthProceed, token]);

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, email, setEmail, id, setId, authProceed }}>
        <Router>
          <Routes authProceed={authProceed} />
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
