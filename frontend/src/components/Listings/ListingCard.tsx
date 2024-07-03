import { useNavigate } from "react-router-dom";
import { Listings } from "../../interfaces/Listings";
import { currentUser } from "../../interfaces/currentUserI";
import HeartButton from "../HeartButton";
import { newRequest } from "../../utills/newRequest";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { format } from "date-fns";
import Button from "../Button";
import { Reservation } from "../../interfaces/reservations";

interface ListingCardProps {
  data: Listings;
  currentUser?: currentUser | undefined;
  onAction?: (id: string) => void;
  actionLabel?: string;
  disabled?: boolean;
  actionId?: string;
  setLiked: Dispatch<SetStateAction<string[]>>;
  onSetOpenLogin: Dispatch<SetStateAction<boolean>>;
  reservation?: Reservation;
}

const ListingCard = ({
  data,
  currentUser,
  setLiked,
  onSetOpenLogin,
  reservation,
  onAction,
  actionId,
  actionLabel,
  disabled,
}: ListingCardProps) => {
  const listingId = data._id;
  const userId = currentUser?._id;
  const navigate = useNavigate();

  const ReservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

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
      onSetOpenLogin(true);
    }
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (disabled) return;

      if (actionId) {
        onAction?.(actionId);
      }
    },
    [actionId, disabled, onAction]
  );

  return (
    < div className="col-span-1  cursor-pointer group relative z-40">
      <div className="absolute top-3 right-3 z-50">
        <HeartButton
          onClick={handleLike}
          currentUser={currentUser}
          listingId={listingId}
        />
      </div>
      <div
        onClick={() =>
          navigate(`/listings/${data._id}`, {
            state: data,
          })
        }
        className="flex flex-col gap-2 w-full"
      >
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={data.imageSrc}
            alt=""
          />
        </div>
        <div className="font-semibold text-lg">{data.location.label}</div>
        <div className="font-light text-neutral-500">
          {ReservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          {reservation ? (
            <div className="font-semibold">$ {reservation.totalPrice}</div>
          ) : (
            <div className="font-semibold">$ {data.price}</div>
          )}
          {!reservation && <div className="font-light">night</div>}
        </div>
      </div>
      {onAction && actionLabel && (
        <Button
          disabled={disabled}
          small
          label={actionLabel}
          onClick={handleCancel}
        />
      )}
    </div>
  );
};

export default ListingCard;
