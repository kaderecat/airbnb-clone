import { IconType } from "react-icons";

interface ListingCategoryProps {
  icon: IconType;
  label: string;
  desc: string;
}

const ListingCategory = ({ icon: Icon, label, desc }: ListingCategoryProps) => {
  return (
    <div className="flex flex-col items-start gap-4 ">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className=" flex flex-col">
          <div className="text-lg font-semibold">{label}</div>
          <div className="text-neutral-500 font-light">{desc}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
