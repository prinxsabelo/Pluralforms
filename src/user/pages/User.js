
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContextProvider from "../../shared/contexts/context";
import FormContextProvider from "../../shared/contexts/form.context";
import ViewportProvider from "../../shared/contexts/viewport-context";
import ModalContextProvider from "../../shared/contexts/modal-context";
import ResultContextProvider from "../../shared/contexts/result-context";
import FormDialog from "../../shared/collection/FormDialog";
import BuildQuestionProvider from "../../shared/contexts/build-question.context";
import RespondentDetail from "../../formBuilder/pages/RespondentDetail";
import FormBuilder from "../../formBuilder/pages/FormBuilder";
import Wrapper from "../../shared/wrapper/Wrapper";
import LandingModal from "../../shared/collection/LandingModal";


export const User = () => {

    return (

        <>

            <Router>
                <ContextProvider>
                    <ViewportProvider>
                        <FormContextProvider>
                            <BuildQuestionProvider>
                                <ResultContextProvider>
                                    <ModalContextProvider>
                                        <Switch>

                                            <Route path="/user/form/:form_id/results/responses/:token">
                                                <RespondentDetail />
                                            </Route>
                                            <Route path="/user/form/:form_id/">
                                                <FormBuilder />
                                                <LandingModal />
                                            </Route>

                                            <Route path={["/user/", "/user/home", "/user/forms", "/user/profile",]} >
                                                <div className=" bg-white text-black w-full text-white flex flex-col h-screen">
                                                    <Wrapper />
                                                    <FormDialog />
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
        </>
    )
}