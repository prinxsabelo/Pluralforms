import { useState } from "react";
const AuthFormHook = () => {
    const [inputs, setInputs] = useState({
        email: "",
        name: "",
        password: ""
    });
    const handleInputChange = (event) => {
        event.persist();
        setInputs((inputs) => ({
            ...inputs,
            [event.target.name]: event.target.value,
        }));
    }
    return {
        handleInputChange,
        inputs,
    }
}
export default AuthFormHook