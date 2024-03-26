import { IconType } from "react-icons";
import { SetURLSearchParams } from "react-router-dom";

interface CategoryBoxInterface {
  label: string;
  icon: IconType;
  selected: boolean;
  setSearchParams: SetURLSearchParams;
  q?: string | null;
}

const CategoryBox = ({
  label,
  icon: Icon,
  selected,
  setSearchParams,
  q,
}: CategoryBoxInterface) => {
  const handleCategoryParams = () => {
    if (q === label) {
      return setSearchParams("");
    }
    setSearchParams((prev) => {
      prev.set("category", label.toLocaleLowerCase());
      return prev;
    });
  };

  return (
    <div
      onClick={handleCategoryParams}
      className={`flex justify-center items-center flex-col px-2 hover:text-neutral-700 border-b-2 transition cursor-pointer ${
        selected
          ? "border-b-neutral-700 text-neutral-700"
          : "border-transparent text-neutral-500"
      } `}
    >
      <Icon size={24} />
      <p>{label}</p>
    </div>
  );
};

export default CategoryBox;
