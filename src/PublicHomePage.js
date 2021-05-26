import { NavLink } from 'react-router-dom'
export const PublicHomePage = () => {
    return (
        <div style={{ padding: "50px" }}>
            <div>
                <h3>GENERAL HOME PAGE FOR PLURALFORMS</h3>
                <div className="p-3">
                    <NavLink className="bg-red-400 p-3" to="/login">LOGIN</NavLink>
                </div>
            </div>
        </div>
    );
};
