
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContextProvider from "../../shared/contexts/context";
import FormContextProvider from "../../shared/contexts/form.context";
import ViewportProvider from "../../shared/contexts/viewport-context";
import ModalContextProvider from "../../shared/contexts/modal-context";
import ResultContextProvider from "../../shared/contexts/result-context";
import Dialog from "../../shared/collection/Dialog";
import BuildQuestionProvider from "../../shared/contexts/build-question.context";
import MobileBuild from "../../formBuilder/pages/MobileBuild";
import RespondentDetail from "../../formBuilder/pages/RespondentDetail";
import FormBuilder from "../../formBuilder/pages/FormBuilder";
import Wrapper from "../../shared/wrapper/Wrapper";

export const User = () => {

    return (
        <Router>
            <ContextProvider>
                <ViewportProvider>
                    <FormContextProvider>
                        <BuildQuestionProvider>
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

                                        <Route path={["/user/", "/user/home", "/user/forms", "/user/profile",]} >
                                            <div className=" bg-white text-black w-full text-white flex flex-col h-screen">
                                                <Wrapper />
                                                <Dialog />
                                            </div>
                                        </Route>
                                    </Switch>
                                </ModalContextProvider>
                            </ResultContextProvider>
                        </BuildQuestionProvider>
                    </FormContextProvider>
                </ViewportProvider>
            </ContextProvider>
        </Router>
    )
}