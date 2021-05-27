
const { default: HeaderLeft } = require("./HeaderLeft")
const { default: HeaderRight } = require("./HeaderRight")

const Header = () => {

    return (
        <>
            <header className="hidden bg-white text-black  h-12 p-2 md:px-8 md:py-4  md:flex justify-between">

                <HeaderLeft />
                <HeaderRight />

            </header>
        </>
    )

}
export default Header;