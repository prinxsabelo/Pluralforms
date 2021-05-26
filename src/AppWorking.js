import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";

import { PublicHomePage } from "./PublicHomePage";
import AuthApi from "./shared/context/AuthApi";
import ConfirmAuth from "./user/pages/ConfirmAuth";
import Login from "./user/pages/Login";
import { User } from "./user/pages/User";

const Routes = () => {
    const Auth = useContext(AuthApi);
    return (
        <Switch>
            <Route exact path="/">
                {Auth.auth ? <Redirect to="/user" /> : <PublicHomePage />}
            </Route>
            <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />

            <Route path="/auth/google" component={ConfirmAuth} />
            <ProtectedRoute
                path="/user"
                auth={Auth.auth}
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
    return (
        <Route
            {...rest}
            render={() =>
                !auth ? <Component /> : <Redirect to="/User" />
            }
        />
    );
};
function App() {
    const [auth, setAuth] = useState(false);
    const readCookie = () => {
        const user = Cookies.get("token");
        if (user) {
            setAuth(true);
        }
    };
    useEffect(() => {
        readCookie();
    });

    return (
        <>
            <AuthApi.Provider value={{ auth, setAuth, token, setToken }}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>
        </>
    );
}

export default App;
