import { useContext } from 'react';
import { Context } from '../context/context';

import NavItem from './NavItem';
const NavBar = () => {

  const { navItems } = useContext(Context);

  return <div className="md:hidden py-1 bg-gray-100
                        fixed bottom-0 left-0 right-0  text-black flex
                          justify-center justify-between items-center
                            border-t border-t-16 border-gray-200">
    {navItems.map((item, index) => <NavItem item={item} key={index} />)}

  </div>
}
export default NavBar;