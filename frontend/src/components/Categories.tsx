import CategoryBox from "./CategoryBox";
import { GiWindmill } from "react-icons/gi";
import { FaUmbrellaBeach } from "react-icons/fa";
import { PiCastleTurret } from "react-icons/pi";
import { useLocation, useSearchParams } from "react-router-dom";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { PiMountainsFill } from "react-icons/pi";
import { PiSwimmingPool } from "react-icons/pi";
import { GiIsland } from "react-icons/gi";
import { GiBoatFishing } from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { MdOutlineForest } from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import { GiCaveEntrance } from "react-icons/gi";
import { RiCactusLine } from "react-icons/ri";
import { GiBarn } from "react-icons/gi";
import { IoDiamondOutline } from "react-icons/io5";

export const categoryArr = [
  {
    label: "Windmill",
    icon: GiWindmill,
    desc: "This is category Windmill",
  },
  {
    label: "Beach",
    icon: FaUmbrellaBeach,
    desc: "This is category Beach",
  },
  {
    label: "Castle",
    icon: PiCastleTurret,
    desc: "This is category Castle",
  },
  {
    label: "Modern",
    icon: HiOutlineHomeModern,
    desc: "This is category Modern",
  },
  {
    label: "Countryside",
    icon: PiMountainsFill,
    desc: "This is category Countryside",
  },
  {
    label: "Pools",
    icon: PiSwimmingPool,
    desc: "This is category Pools",
  },
  {
    label: "Islands",
    icon: GiIsland,
    desc: "This is category Islands",
  },
  {
    label: "Lakes",
    icon: GiBoatFishing,
    desc: "This is category Lakes",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    desc: "This is category Skiing",
  },
  {
    label: "Camping",
    icon: MdOutlineForest,
    desc: "This is category Camping",
  },
  {
    label: "Arctic",
    icon: FaRegSnowflake,
    desc: "This is category Arctic",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    desc: "This is category Cave",
  },
  {
    label: "Dessert",
    icon: RiCactusLine,
    desc: "This is category Dessert",
  },
  {
    label: "Barn",
    icon: GiBarn,
    desc: "This is category Barns",
  },
  {
    label: "Luxury",
    icon: IoDiamondOutline,
    desc: "This is category Luxury",
  },
];

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams({ category: "" });
  const { pathname } = useLocation();

  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return;
  }

  const q = searchParams.get("category");

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
