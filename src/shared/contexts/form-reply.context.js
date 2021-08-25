import { createContext, useState, } from "react";
import { useHttpClient } from "../hooks/http-hook";
export const FormReplyContext = createContext();
const FormReplyContextProvider = props => {
    const { sendRequest } = useHttpClient();
    const [data, setData] = useState([]);
    const getReply = async ({ token, ref_id, form_id }) => {

        try {

            const response = await sendRequest(`http://localhost:8000/api/reply`,
                'POST', JSON.stringify({ token, ref_id, form_id }));

            if (response) {

                setData(response);
                return response;
            }
        } catch {

        }

    }
    const sendReply = async ({ token, answer, form_id, a_id, q_id }) => {
        try {
            const response = await sendRequest(`http://localhost:8000/api/reply/build`,
                'POST',
                JSON.stringify({ a_id, q_id, answer, form_id, token }));
            if (response) {
                setData(response);
            }
        }
        catch {

        }
    }
    return (
        <FormReplyContext.Provider
            value={{ getReply, sendReply, data }}>
            {props.children}
        </FormReplyContext.Provider>
    )
}
export default FormReplyContextProvider;