/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Search from "./Search";
import SmallSearch from "./SmallSearch";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Menu from "./Menu";
import { getCurrentUser } from "../utills/getCurrentUser";

interface Navbar {
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
  setOpenRentModal: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({
  setOpenRegister,
  setOpenLogin,
  setOpenRentModal,
}: Navbar) => {
  const [active, setActive] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef(null);

  const currentUser = getCurrentUser();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    //@ts-ignore
    const handle = (e) => {
      if (e.target !== menuRef.current) {
        setMenu(false);
      }
    };
    window.addEventListener("click", handle);

    return () => window.removeEventListener("click", handle);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const onRent = () => {
    if (!currentUser) {
      return setOpenLogin(true);
    }

    setOpenRentModal(true);
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex sm:hidden justify-between  items-center py-5 px-5 text-[18px] md:flex lg:flex  transition">
        <div className="cursor-pointer  ">
          <img
            className="w-[100px] cursor-pointer "
            src="https://logos-world.net/wp-content/uploads/2020/07/Airbnb-Logo.png"
            alt=""
          />
        </div>
        {!active && (
          <div className=" lg:flex justify-between items-center gap-5 md:hidden sm:hidden ">
            <button className="bg-white hover:bg-gray-100 opacity-70  py-3 px-4  rounded-full">
              Stays
            </button>
            <button className="bg-white hover:bg-gray-100 opacity-70 py-3 px-4  rounded-full">
              Experiences
            </button>
            <button className="bg-white hover:bg-gray-100 opacity-70  py-3 px-4  rounded-full">
              Online experiences
            </button>
          </div>
        )}
        {active && (
          <div
            onClick={() => setActive(false)}
            className="flex justify-center  items-center transition-all duration-200"
          >
            <SmallSearch />
          </div>
        )}
        <div className=" sm:flex  justify-between items-center gap-5 md:flex">
          <button
            onClick={onRent}
            className="bg-white hover:bg-gray-100 opacity-70 text-black font-semibold  py-3 px-4  rounded-full"
          >
            Airbnb you home
          </button>
          <div
            ref={menuRef}
            onClick={() => setMenu((prev) => !prev)}
            className="flex relative justify-between items-center cursor-pointer duration-300 hover:shadow-md gap-5 p-4 rounded-full border-[1px]"
          >
            <GiHamburgerMenu />
            <FaUserCircle />
            {menu && (
              <div className="absolute bg-white shadow-md text-[14px] top-[60px] rounded-[12px] border-[1px] left-[-150px]  w-[250px] z-[99]">
                <Menu
                  setOpenRentModal={onRent}
                  setOpenLogin={setOpenLogin}
                  setOpenRegister={setOpenRegister}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className=" lg:hidden  justify-between items-center gap-5 md:block md:text-center w-[100%]">
        <div
          className={`${
            active ? "md:hidden" : ""
          } lg:block md:flex sm:hidden sm:justify-center sm:items-center `}
        >
          <button className="bg-white hover:bg-gray-100 opacity-70  py-3 px-4  rounded-full">
            Stays
          </button>
          <button className="bg-white hover:bg-gray-100 opacity-70 py-3 px-4  rounded-full">
            Experiences
          </button>
          <button className="bg-white hover:bg-gray-100 opacity-70  py-3 px-4  rounded-full">
            Online experiences
          </button>
        </div>
      </div>
      {!active && (
        <div className="md:min-w-[650px] sm:py-2  mx-auto max-w-[850px] flex justify-center items-center">
          <Search />
        </div>
      )}

      <hr className="my-5" />
    </div>
  );
};

export default Navbar;
