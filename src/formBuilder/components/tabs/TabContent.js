
import { Route, useRouteMatch } from "react-router-dom";
import DeleteModal from "../../../shared/collection/DeleteModal";
import DesktopBuild from "../../pages/DesktopBuild";
import Questions from "../../pages/Questions";
import Results from "../../pages/Results";
import Settings from "../../pages/Settings";
import Share from "../../pages/Share";
import RespondentDetail from '../../pages/RespondentDetail'

const TabContent = (props) => {

    const { path, url } = useRouteMatch();

    return (
        <>
            <div className="tab-content">
                <div className="tab-pane active">

                    <Route path={`${url}`} exact >
                        <DesktopBuild />
                    </Route>
                    <Route path={`${url}/questions`} exact>
                        <Questions />
                    </Route>
                    <Route path={`${url}/build`} exact>
                        <DesktopBuild />
                    </Route>
                    <Route path={`${url}/share`} exact>
                        <Share />
                    </Route>
                    <Route path={`${url}/results/`}  >
                        <Results />
                    </Route>
                    <Route path={`${url}/settings`} exact>
                        <Settings />
                    </Route>

                </div>
            </div>
            {/* <DeleteModal /> */}
        </>
    )
}
export default TabContent;