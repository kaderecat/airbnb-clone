import CategoryBox from "./CategoryBox";
import { useLocation, useSearchParams } from "react-router-dom";
import { categoryArr } from "../utills/CategoriesArray";




const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams({ category: "" });
  const { pathname } = useLocation();
  const q = searchParams.get("category");

  const isMainPage = pathname === "/";


  if (!isMainPage) {
    return;
  }

  return (
    <div className="flex justify-center items-center overflow-x-auto flex-row z-10 gap-2">
      {categoryArr.map((cat) => (
        <CategoryBox
          setSearchParams={setSearchParams}
          label={cat.label}
          icon={cat.icon}
          key={cat.desc}
          q={q}
          selected={q === cat.label.toLocaleLowerCase()}
        />
      ))}
    </div>
  );
};

export default Categories;
