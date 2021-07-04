import { createContext, useState, } from "react";
import { useHttpClient } from "../hooks/http-hook";
export const FormReplyContext = createContext();
const FormReplyContextProvider = props => {
    const { sendRequest } = useHttpClient();
    const [data, setData] = useState([]);
    const getReply = async ({ token, form_id }) => {

        try {

            const response = await sendRequest(`http://localhost:8000/api/reply`,
                'POST', JSON.stringify({ token, form_id }));

            if (response) {

                setData(response);
            }
        } catch {

        }

    }
    return (
        <FormReplyContext.Provider
            value={{ getReply, data }}>
            {props.children}
        </FormReplyContext.Provider>
    )
}
export default FormReplyContextProvider;