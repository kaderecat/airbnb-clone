import { Dispatch, SetStateAction } from "react";
import { getCurrentUser } from "../utills/getCurrentUser";
import { newRequest } from "../utills/newRequest";
import { useNavigate } from "react-router-dom";

interface Menu {
  setOpenRegister: Dispatch<SetStateAction<boolean>>;
  setOpenLogin: Dispatch<SetStateAction<boolean>>;
  setOpenRentModal: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ setOpenRegister, setOpenLogin, setOpenRentModal }: Menu) => {
  const currentUser = getCurrentUser();
  const navigate = useNavigate();

  console.log(currentUser);

  const logoutHandler = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-[1px] rounded-[12px] ">
      {currentUser ? (
        <>
          <div className="p-3 my-1 hover:bg-gray-100  ">My fovorites</div>
          <hr />
          <div
            className="p-3 my-1 hover:bg-gray-100  "
            onClick={() => navigate(`/reservations/${currentUser._id}`)}
          >
            My reservations
          </div>
          <div
            className="p-3 my-1 hover:bg-gray-100 "
            onClick={() => navigate(`my-properties/${currentUser._id}`)}
          >
            My proterties
          </div>
          <div
            onClick={() => setOpenRentModal((prev) => !prev)}
            className="p-3 my-1 hover:bg-gray-100  "
          >
            Airbnb my home
          </div>
          <div onClick={logoutHandler} className="p-3 my-1 hover:bg-gray-100  ">
            Logout
          </div>
        </>
      ) : (
        <>
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
          <div
            onClick={() => setOpenLogin((prev) => !prev)}
            className="p-3 my-1 hover:bg-gray-100 "
          >
            Airbnb your home
          </div>
          <div className="p-3 my-1 hover:bg-gray-100  ">Help center</div>
        </>
      )}
    </div>
  );
};

export default Menu;
