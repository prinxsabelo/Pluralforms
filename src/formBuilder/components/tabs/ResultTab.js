import './Tabs.css';

import { NavLink, useRouteMatch } from 'react-router-dom';
const ResultTab = ({ result_tab }) => {
    const { url } = useRouteMatch();
    return (
        <li className="nav-item">
            <NavLink className={`uppercase text-xs md:text-sm tracking-wider nav-link 
            ${window.location.pathname === url / result_tab.link ? 'active font-extrabold' : ''}`}
                to={`${url}/${result_tab.link}`} >
                <span className="flex items-center">
                    {result_tab.label}

                </span>

            </NavLink >
        </li>
    )
}
export default ResultTab