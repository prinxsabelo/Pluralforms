import { useState, createContext } from "react";

export const Context = createContext();
const ContextProvider = (props) => {
    const sideBarItems = [
        { index: 0, item: "Home", link: "/user/home" },
        { index: 1, item: "All Forms", link: "/user/forms" },
        { index: 2, item: "Profile", link: "/user/profile" }
    ];

    const navItems = [
        { index: 0, item: "Home", link: "/user/home" },
        { index: 1, item: "Forms", link: "/user/forms" },
        { index: 2, item: "Profile", link: "/user/profile" },
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
