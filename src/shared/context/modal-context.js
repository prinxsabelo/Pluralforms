import { useState, createContext, useEffect, useContext } from "react";

const QUESTION = "QUESTION";
export const ModalContext = createContext();
const ModalContextProvider = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmDelete, setConfirmDelete] = useState({});
    const closeModal = () => {
        setIsOpen(false);
    };
    const openDeleteModal = ({ type, message, id }) => {
        setConfirmMessage({ type, message, id });
        setIsOpen(true);
    };
    const handleDelete = () => {
        console.log("xxx");
        if (confirmMessage.type == QUESTION) {
            setIsOpen(false);
            setConfirmDelete({ type: QUESTION, q_id: confirmMessage.id });
        }
    };

    return (
        <ModalContext.Provider
            value={{
                isOpen,
                closeModal,
                openDeleteModal,
                confirmMessage,
                handleDelete,
                confirmDelete,
                setConfirmDelete,
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
};
export default ModalContextProvider;
