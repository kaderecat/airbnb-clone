import { IoMdSearch } from "react-icons/io";

const Search = () => {
  return (
    <div className="border-[1px] w-[100%] sm:mx-2  mx-20 text-xs cursor-pointer  rounded-full shadow-md flex  justify-between items-center">
      <div className="hover:bg-gray-200 hover:rounded-full py-3 pl-6 flex relative  justify-between items-center flex-[2_2_0%] after:w-[1px] after:absolute after:top-[10px] after:bottom-[10px] after:right-0  after:bg-gray-400 after:hover:hidden">
        <div className=" flex justify-between items-center w-[100%] gap-5">
          <div>
            <h1 className="text-sm font-semibold">Where</h1>
            <p className="text-gray-400 text-[14px] ">Search destinations</p>
          </div>
        </div>
      </div>
      <div className="hover:bg-gray-200 hover:rounded-full py-3 pl-6 flex relative  justify-between items-center flex-1 after:w-[1px] after:absolute after:top-[10px] after:bottom-[10px] after:right-0  after:bg-gray-400 after:hover:hidden before:absolute before:top-0 before:left-[-1px] before:bottom-0 before:w-[1px] before:bg-transparent hover:before:bg-white ">
        <div className="flex justify-center  items-center">
          <div className="">
            <h1 className="text-sm font-semibold">Check in</h1>
            <p className="text-gray-400 text-[14px] ">Add dates</p>
          </div>
        </div>
      </div>
      <div className="hover:bg-gray-200 hover:rounded-full py-3 pl-6 flex relative  justify-between items-center flex-1 after:w-[1px] after:absolute after:top-[10px] after:bottom-[10px] after:right-0  after:bg-gray-400 after:hover:hidden before:absolute before:top-0 before:left-[-1px] before:bottom-0 before:w-[1px] before:bg-transparent hover:before:bg-white ">
        <div>
          <h1 className="text-sm font-semibold">Check out</h1>
          <p className="text-gray-400 text-[14px] ">Add dates</p>
        </div>
      </div>
      <div className="flex-[2_2_0%] hover:bg-gray-200 hover:rounded-full py-3 pl-6  flex justify-between relative items-center before:absolute before:top-0 before:left-[-1px] before:bottom-0 before:w-[1px] before:bg-transparent hover:before:bg-white  ">
        <div>
          <h1 className="text-sm font-semibold">Who</h1>
          <p className="text-gray-400 text-[14px] ">Add guests</p>
        </div>
        <div className="bg-rose-500 hover:bg-rose-600 rounded-full p-[5px]  text-white mr-[10px]">
          <IoMdSearch size={25} />
        </div>
      </div>
    </div>
  );
};

export default Search;
