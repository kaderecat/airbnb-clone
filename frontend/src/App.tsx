import { useState } from "react";
import "./App.css";
import NavFooter from "./components/NavFooter";
import Navbar from "./components/Navbar";
import RegisterModal from "./components/Modals/RegisterModal";
import LoginModal from "./components/Modals/LoginModal";

function App() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className=" ">
      <Navbar setOpenRegister={setOpenRegister} setOpenLogin={setOpenLogin} />
      <div className="md:hidden absolute flex my-4 justify-center items-center bottom-0 left-0 right-0">
        <NavFooter />
      </div>
      {openRegister && (
        <RegisterModal
          setOpenReg={setOpenRegister}
          setOpenLogin={setOpenLogin}
          isOpenReg={openRegister}
        />
      )}
      {openLogin && <LoginModal isOpenLogin={openLogin} setOpenRegister={setOpenRegister} setOpenLogin={setOpenLogin} />}
    </div>
  );
}

export default App;
