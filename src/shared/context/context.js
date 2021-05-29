import { useState, createContext } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
    const sideBarItems = [
        { index: 0, item: "Home", link: "/user/" },
        { index: 1, item: "My Forms", link: "/user/forms" },

    ];

    const navItems = [
        { index: 0, item: "Home", link: "/user/" },
        { index: 1, item: "My Forms", link: "/user/forms" },

    ];

    const [headerContent, setHeaderContent] = useState(null);
    const [dialog, showDialog] = useState(false);
    const [DialogContent, setDialogContent] = useState({
        type: "",
        header: "",
        placeholder: "",
    });


    const [modalShow, setModalShow] = useState(false);

    const closeDialog = () => {
        showDialog(false);
    };

    const [open, setOpen] = useState(false);

    const closeModal = () => {
        setOpen(false);
    }
    const openDeleteModal = () => {

        setOpen(true);
    }
    const handleDelete = () => {
        alert('delete');
    }
    return (
        <Context.Provider
            value={{
                headerContent,
                setHeaderContent,
                sideBarItems,
                navItems,
                dialog,
                showDialog,
                DialogContent,
                setDialogContent,
                closeDialog,
                modalShow,
                setModalShow,
                // ModalContent,
                // setModalContent,
                open,
                closeModal,
                openDeleteModal,

                handleDelete
            }}
        >
            {props.children}
        </Context.Provider>
    );
};
export default ContextProvider;
