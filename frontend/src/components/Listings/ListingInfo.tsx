import { useMemo } from "react";
import ListingCategory from "./ListingCategory";
import { categoryArr } from "../../utills/CategoriesArray";
import Map from "../Map";
import { LatLngExpression } from "leaflet";

interface ListingInfoProps {
  user: string;
  description: string;
  guestCount: number;
  bathroomCount: number;
  roomCount: number;
  category: string;
  coordinates: LatLngExpression
}

const ListingInfo = ({
  user,
  description,
  guestCount,
  roomCount,
  category,
  bathroomCount,
  coordinates,
}: ListingInfoProps) => {
  const categoryIcon = useMemo(() => {
    return categoryArr.find((item) => item.label === category);
  }, [category]);


  return (
    <div className="col-span-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user}</div>
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
        <hr />
        {categoryIcon && (
          <ListingCategory
            icon={categoryIcon.icon}
            label={categoryIcon.label}
            desc={categoryIcon.desc}
          />
        )}
      </div>
      <hr />
      {description}
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
