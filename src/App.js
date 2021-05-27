import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
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

const Routes = () => {
  const Auth = useContext(AuthContext);
  // console.log(Auth);
  return (
    <Switch>
      <Route exact path="/">
        {Auth.token ? <Redirect to="/user" /> : <PublicHomePage />}
      </Route>
      <ProtectedLogin path="/login" auth={Auth.token} component={Login} />
      <ProtectedLogin path="/signup" auth={Auth.token} component={Signup} />
      <Route path="/auth/google" component={ConfirmAuth} />
      <Route path="/auth/facebook" component={ConfirmAuth} />
      <ProtectedRoute
        path="/user"
        auth={Auth.token}
        component={User}
      />
    </Switch>
  );
};
const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => (auth ? <Component /> : <Redirect to="/login" />)}
    />
  );
};
const ProtectedLogin = ({ auth, component: Component, ...rest }) => {
  // alert(window.location.pathname)
  return (
    <Route
      {...rest}
      render={() =>
        !auth ? <Component /> : <Redirect to="/user" />
      }
    />
  );
};
function App() {

  const [token, setToken] = useState(false);
  const [email, setEmail] = useState();
  const [id, setId] = useState();
  const readCookie = () => {
    const userData = Cookies.get("userData");
    if (userData) {
      const { token, id, email } = JSON.parse(userData);

      if (token && id) {
        setToken(token);
        setEmail(email);
        setId(id)
      }
    }

  };
  useEffect(() => {
    readCookie();
  });

  return (
    <>
      <AuthContext.Provider value={{ token, setToken, email, setEmail, id, setId }}>
        <Router>
          <Routes />
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
