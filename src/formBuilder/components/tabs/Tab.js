import './Tabs.css';

import { NavLink, useRouteMatch } from 'react-router-dom';
const Tab = ({ tab }) => {
    const { url } = useRouteMatch();

    return (
        <li className="nav-item">
            <NavLink className={`uppercase text-sm md:text-base tracking-wide md:tracking-wider nav-link ${window.location.pathname === url / tab.link ? 'active' : ''}`}
                to={`${url}/${tab.link}`} >
                <span className="flex items-center">
                    {tab.label}

                </span>

            </NavLink >
        </li>
    )
}
export default Tab