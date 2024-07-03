import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { currentUser } from "../interfaces/currentUserI";

interface HeartButtonProps {
  onClick: () => void;
  currentUser: currentUser | undefined;
  listingId: string;
}

const HeartButton = ({ onClick, currentUser, listingId }: HeartButtonProps) => {
  const isLiked = currentUser?.favorites.includes(listingId);


  return (
    <div
      onClick={onClick}
      className=" relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px]"
      />
      <AiFillHeart
        size={24}
        className={isLiked ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
