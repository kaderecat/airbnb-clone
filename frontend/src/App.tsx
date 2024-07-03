import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import NavFooter from "./components/NavFooter";
import Navbar from "./components/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";
import Categories from "./components/Categories";
import RentModal from "./components/Modals/RentModal";
import { ToastContainer } from "react-toastify";
import Home from "./Home";
import NavbarLayout from "./components/NavbarLayout";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRentModal, setOpenRentModal] = useState(false);

  const { pathname } = useLocation();

  return (
    <div className="">
      <NavbarLayout>
        <ToastContainer />
        <Navbar
          setOpenRentModal={setOpenRentModal}
          setOpenRegister={setOpenRegister}
          setOpenLogin={setOpenLogin}
        />
        <div className="md:hidden absolute flex my-4 justify-center items-center bottom-0 left-0 right-0">
          <NavFooter setOpenLogin={setOpenLogin} />
        </div>
        {openRegister && (
          <RegisterModal
            setOpenReg={setOpenRegister}
            setOpenLogin={setOpenLogin}
            isOpenReg={openRegister}
          />
        )}
        {openLogin && (
          <LoginModal
            isOpenLogin={openLogin}
            setOpenRegister={setOpenRegister}
            setOpenLogin={setOpenLogin}
          />
        )}
        {openRentModal && (
          <RentModal
            setOpenRent={setOpenRentModal}
            isOpenRentModal={openRentModal}
          />
        )}
      </NavbarLayout>
      <Outlet />
      {pathname === "/" ? (
        <>
          <Categories />
          <Home onSetOpenLogin={setOpenLogin} />
        </>
      ) : null}
    </div>
  );
}

export default App;
