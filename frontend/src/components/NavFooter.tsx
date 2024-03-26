import { IoIosSearch } from "react-icons/io";
import { IoHeartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";

interface NavFooterProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavFooter = ({ setOpenLogin }: NavFooterProps) => {
  return (
    <div className="w-[100%]">
      <hr className="h-[1px] w-[100%] mb-3" />
      <div className="flex justify-center cursor-pointer items-center gap-14">
        <div className="flex flex-col justify-center items-center">
          <IoIosSearch color="darkgray" size={25} />
          <p className="text-[12px] text-gray-500">Explore</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <IoHeartOutline color="darkgray" size={25} />
          <p className="text-[12px] text-gray-500">Wishlist </p>
        </div>
        <div
          onClick={() => setOpenLogin((prev) => !prev)}
          className="flex flex-col justify-center items-center"
        >
          <FaRegUserCircle color="darkgray" size={25} />
          <p className="text-[12px] text-gray-500">Log in</p>
        </div>
      </div>
    </div>
  );
};

export default NavFooter;
