import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import AuthApi from "./context/AuthApi";
import { Dashboard } from "./Dashboard";
import Login from "./Login";
import LoginGoogle from "./LoginGoogle";
import { PublicHomePage } from "./PublicHomePage";
const Routes = () => {
    const Auth = useContext(AuthApi);
    return (
        <Switch>
            <Route exact path="/">
                {Auth.auth ? <Redirect to="/dashboard" /> : <PublicHomePage />}
            </Route>
            <ProtectedLogin path="/login" auth={Auth.auth} component={Login} />
            
            <Route exact path="/auth/google" component={LoginGoogle} />
            <ProtectedRoute
                path="/dashboard"
                auth={Auth.auth}
                component={Dashboard}
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
                !auth ? <Component /> : <Redirect to="/dashboard" />
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
            <AuthApi.Provider value={{ auth, setAuth }}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>
        </>
    );
}

export default App;
