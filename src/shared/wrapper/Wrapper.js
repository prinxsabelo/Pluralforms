import SideBar from "./SideBar";
import Container from "./Container";
import NavBar from "./NavBar";



const Wrapper = () => {

    return <div className="flex flex-1 flex-col md:flex-row  bg-red-400">
        <SideBar />
        <Container />
        <NavBar />



    </div>
}
export default Wrapper;