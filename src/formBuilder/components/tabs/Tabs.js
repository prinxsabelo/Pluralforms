import './Tabs.css';

import Tab from './Tab';
const Tabs = (props) => {

    const { tabs } = props;

    return (
        <div>

            <ul className="nav nav-tabs px-2 ">
                {tabs.map(tab =>
                    <Tab tab={tab} key={tab.id} />
                )}
            </ul>

        </div>
    )
}
export default Tabs;