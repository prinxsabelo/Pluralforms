import { createContext, useEffect, useState } from "react";

export const ViewportContext = createContext({});
const ViewportProvider = ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowResize = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => window.removeEventListener("resize", handleWindowResize);
    }, []);
    return (
        <ViewportContext.Provider value={{ width }}>
            {children}
        </ViewportContext.Provider>
    );
}
export default ViewportProvider;