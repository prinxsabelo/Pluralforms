import './Tabs.css';

import Tab from './Tab';
const Tabs = (props) => {

    const { tabs, child } = props;

    return (
        <div>

            <ul className="nav nav-tabs px-2 py-1">
                {tabs.map(tab =>
                    <Tab tab={tab} key={tab.id} />
                )}
            </ul>

        </div>
    )
}
export default Tabs;