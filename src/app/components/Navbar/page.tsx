import useWindowSize from '@/app/hook/useWindowSize'
import React from 'react'
import NavbarVertical from './NavbarVertical';
import NavbarHorizontal from './NavbarHorizontal';
const Navbar = () => {
     const { width } = useWindowSize();
     if (width === undefined) return null;
     return (
          <>
               {width >= 768 ? (
                    <NavbarVertical />
               ) : (
                    <NavbarHorizontal />
               )}
          </>
     )
}

export default Navbar