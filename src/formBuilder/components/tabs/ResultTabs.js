import './Tabs.css';

import ResultTab from './ResultTab';
const ResultTabs = (props) => {

    const { result_tabs, child } = props;

    return (
        <div>

            <ul className="nav nav-tabs space-x-2 md:space-x-2 ">
                {result_tabs.map(result_tab =>
                    <ResultTab result_tab={result_tab} key={result_tab.id} />
                )}
            </ul>

        </div>
    )
}
export default ResultTabs;