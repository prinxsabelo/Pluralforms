import { useContext } from "react";
import Cookies from "js-cookie";
import AuthContext from "../../shared/context/auth-context";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContextProvider from "../../shared/context/context";
import FormContextProvider from "../../shared/context/form-context";
import ViewportProvider from "../../shared/context/viewport-context";
import ModalContextProvider from "../../shared/context/modal-context";
import ResultContextProvider from "../../shared/context/result-context";
import Dialog from "../../shared/collection/Dialog";
import QuestionProvider from "../../shared/context/question-context";
import MobileBuild from "../../formBuilder/pages/MobileBuild";
import RespondentDetail from "../../formBuilder/pages/RespondentDetail";
import FormBuilder from "../../formBuilder/pages/FormBuilder";
import Header from "../../shared/header/Header";
import Wrapper from "../../shared/wrapper/Wrapper";

export const User = () => {
    const Auth = useContext(AuthContext);
    const handleLogout = () => {
        Auth.setId(null);
        Auth.setEmail(null);
        Auth.setToken(null);
        Cookies.remove("userData");

    };
    return (
        <Router>
            <ContextProvider>
                <ViewportProvider>
                    <FormContextProvider>
                        <QuestionProvider>
                            <ResultContextProvider>
                                <ModalContextProvider>
                                    <Switch>
                                        <Route path="/user/form/:form_id/questions/compose">
                                            <MobileBuild />
                                        </Route>
                                        <Route path="/user/form/:form_id/questions/:q_id">
                                            <MobileBuild />
                                        </Route>
                                        <Route path="/user/form/:form_id/results/responses/:token">
                                            <RespondentDetail />
                                        </Route>
                                        <Route path="/user/form/:form_id">
                                            <FormBuilder />
                                        </Route>

                                        <Route path={["/user/", "/user/home", "/user/forms", "/user/profile",]} t>
                                            <div className=" bg-white text-black w-full text-white flex flex-col h-screen">
                                                <Header />
                                                <Wrapper />
                                                <Dialog />
                                            </div>
                                        </Route>
                                    </Switch>
                                </ModalContextProvider>
                            </ResultContextProvider>
                        </QuestionProvider>
                    </FormContextProvider>
                </ViewportProvider>
            </ContextProvider>
        </Router>
    )
}