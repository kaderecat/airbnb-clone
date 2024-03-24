import { Dispatch, SetStateAction } from "react";

interface Menu {
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ setOpenRegister, setOpenLogin }: Menu) => {
  return (
    <div className="border-[1px] rounded-[12px] ">
      <div
        onClick={() => setOpenRegister((prev) => !prev)}
        className="p-3 my-1 hover:bg-gray-100 font-semibold"
      >
        Sign up
      </div>
      <div
        onClick={() => setOpenLogin((prev) => !prev)}
        className="p-3 my-1 hover:bg-gray-100  "
      >
        Log in
      </div>
      <hr />
      <div className="p-3 my-1 hover:bg-gray-100  ">Gift cards</div>
      <div className="p-3 my-1 hover:bg-gray-100 ">Airbnb your home</div>
      <div className="p-3 my-1 hover:bg-gray-100  ">Help center</div>
    </div>
  );
};

export default Menu;
