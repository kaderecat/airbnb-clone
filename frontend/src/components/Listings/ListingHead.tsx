import { currentUser } from "../../interfaces/currentUserI";
import { newRequest } from "../../utills/newRequest";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadI {
  title: string;
  location: {
    latlng: number[];
    label: string;
  };
  user: currentUser;
  listingId: string;
  imageSrc: string;
}

const ListingHead = ({
  title,
  location,
  user,
  listingId,
  imageSrc,
}: ListingHeadI) => {
  // const handleLike = async () => {
  //   if (user) {
  //     if (!user.favorites.includes(listingId)) {
  //       await newRequest.post("/likes", { listingId, user._id });
  //       setLiked((prev) => [...prev, listingId]);
  //     } else {
  //       const filteredArr = user.favorites.filter(
  //         (id) => id !== listingId
  //       );

  //       await newRequest.put(`/likes/${listingId}`, { userId, filteredArr });
  //       setLiked(filteredArr);
  //     }
  //   } else {
  //     onSetOpenLogin(true);
  //   }
  // };


  return (
    <>
      <Heading title={title} subtitle={location.label} />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <img src={imageSrc} alt="Image" className="w-full object-cover " />
        <div className="absolute top-5 right-5">
          <HeartButton
            onClick={() => {}}
            currentUser={user}
            listingId={listingId}
          />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
