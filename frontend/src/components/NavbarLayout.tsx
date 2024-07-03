import { ReactNode } from "react";

interface NavbarLayout{
    children : ReactNode  
}

const NavbarLayout = ({ children } : NavbarLayout) => {
  return <div>{children}</div>;
};

export default NavbarLayout;
