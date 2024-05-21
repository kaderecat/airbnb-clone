import { Link } from "react-router-dom";
import { Listings } from "../../interfaces/Listings";
import { currentUser } from "../../interfaces/currentUserI";
import HeartButton from "../HeartButton";
import { newRequest } from "../../utills/newRequest";
import { Dispatch, SetStateAction } from "react";

interface ListingCardProps {
  data: Listings;
  currentUser: currentUser | undefined;
  setLiked: Dispatch<SetStateAction<string[]>>;
  liked: string[];
}

const ListingCard = ({
  data,
  currentUser,
  setLiked,
  liked,
}: ListingCardProps) => {
  const listingId = data._id;
  const userId = currentUser?._id;
  const resevertation = false;

  const handleLike = async () => {
    if (currentUser) {
      if (!currentUser.favorites.includes(listingId)) {
        await newRequest.post("/likes", { listingId, userId });
        setLiked((prev) => [...prev, listingId]);
      } else {
        const filteredArr = currentUser.favorites.filter(
          (id) => id !== listingId
        );

        await newRequest.put(`/likes/${listingId}`, { userId, filteredArr });
        setLiked(filteredArr);
      }
    } else {
      console.log("asd");
    }
  };

  return (
    <div className="col-span-1  cursor-pointer group relative z-40">
      <div className="absolute top-3 right-3 z-50">
        <HeartButton
          onClick={handleLike}
          currentUser={currentUser}
          listingId={listingId}
          liked={liked}
        />
      </div>
      <Link to={`/listings/${data._id}`}>
        <div className="flex flex-col gap-2 w-full">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <img
              className="object-cover h-full w-full group-hover:scale-110 transition"
              src={data.imageSrc}
              alt=""
            />
          </div>
          <div className="font-semibold text-lg">{data.location}</div>
          <div className="font-light text-neutral-500">{data.category}</div>
          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">$ {data.price}</div>
            {!resevertation && <div className="font-light">night</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
