import { IoMdSearch } from "react-icons/io";

const SmallSearch = () => {
  return (
    <div className="border-[1px] py-1 text-xs px-6 rounded-full shadow-md hover:shadow-lg   flex gap-5 justify-between items-center cursor-pointer transition duration-300">
      <div className=" flex justify-between items-center gap-5 ">
        <div>
          <h1 className="text-sm font-semibold">Anywhere</h1>
        </div>
        <div className="w-[1px] h-[50px] bg-gray-200"></div>
      </div>
      <div className=" flex justify-between items-center gap-5">
        <div>
          <h1 className="text-sm font-semibold">Any week</h1>
        </div>
        <div className="w-[1px] h-[50px] bg-gray-200"></div>
      </div>
      <div className="   flex justify-between  items-center gap-5">
        <div>
          <p className="text-gray-400 text-[14px] ">Add guests</p>
        </div>
        <div className="bg-rose-500 rounded-full p-3 text-white">
          <IoMdSearch size={15} />
        </div>
      </div>
    </div>
  );
};

export default SmallSearch;
