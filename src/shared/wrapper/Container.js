import { Route, Redirect, Switch } from 'react-router-dom';
// import Home from '../../dashboard/pages/Home';
import UserForms from '../../forms/pages/UserForms';
import Profile from '../../user/pages/Profile';

const Container = () => {
    return (
        <div className="bg-white text-gray-800 w-full overflow-x-hidden flex-1 z-100  border-2  shadow-lg">
            <Switch>
                <Route path="/user" exact>
                    <Redirect to={`user/forms`} />
                </Route>
                {/* <Route path="/user/home" exact>
                    <Home />
                </Route> */}
                <Route path="/user/forms" >
                    <UserForms />
                </Route>
                <Route path="/user/closed_forms" >
                    <UserForms />
                </Route>


                <Route path="/user/profile" >
                    <Profile />
                </Route>

            </Switch>


        </div>

    )
}
export default Container;