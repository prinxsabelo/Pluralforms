import cookie from "js-cookie";
import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import { PublicHomePage } from "./PublicHomePage";
import AuthContext from "./shared/contexts/auth-context";
import ConfirmLogin from "./user/pages/ConfirmLogin";
import Login from "./user/pages/Login";
import { User } from "./user/pages/User";

const Routes = ({ authProceed }) => {
  // console.log(authProceed)

  return (
    <Switch>
      <Route exact path="/">
        {authProceed ? <Redirect to="/user" /> : <PublicHomePage />}
      </Route>
      <Route path="/login/google" component={ConfirmLogin} />
      <Route path="/login/facebook" component={ConfirmLogin} />
      <ProtectedLogin path="/login" authProceed={authProceed} component={Login} />

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
  const [user, setUser] = useState();

  useEffect(() => {
    const readCookie = () => {
      const userData = cookie.get("userData");
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

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, user, setUser, authProceed }}>
        <Router>
          <Routes authProceed={authProceed} />
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
