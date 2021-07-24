
import { Route, useRouteMatch, Switch } from "react-router-dom";
import DesktopBuild from "../../pages/DesktopBuild";

import Results from "../../pages/Results";
import Settings from "../../pages/Settings";
import Share from "../../pages/Share";

const TabContent = (props) => {

    const { url } = useRouteMatch();

    return (
        <>
            <div className="tab-content">
                <div className="tab-pane active">
                    <Switch>
                        <Route path={`${url}`} exact >
                            <DesktopBuild />
                        </Route>

                        <Route path={`${url}/build`}>
                            <DesktopBuild />
                        </Route>
                        <Route path={`${url}/share`} >
                            <Share />
                        </Route>
                        <Route path={`${url}/results`}>
                            <Results />
                        </Route>

                        <Route path={`${url}/settings`} >
                            <Settings />
                        </Route>
                    </Switch>
                </div>
            </div>
            {/* <DeleteModal /> */}
        </>
    )
}
export default TabContent;