import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import ListingReservation from "./ListingReservation";
import { differenceInDays, eachDayOfInterval } from "date-fns";
import { Reservation } from "../../interfaces/reservations";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { Range } from "react-date-range";
import { newRequest } from "../../utills/newRequest";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SingleListingPage = () => {
  const data = useLoaderData();

  const { state } = useLocation();
  const { id } = useParams();



  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(state.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getReservations = async () => {
      const res = await newRequest.get(`/reservations/${id}`);
      setReservations(res.data);
    };
    getReservations();
  }, [id]);

  const disabledDate = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservations) => {
      const range = eachDayOfInterval({
        start: new Date(reservations.startDate),
        end: new Date(reservations.endDate),
      });
      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = () => {
    const userId = data?._id;

    setLoading(true);

    newRequest
      .post("/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingInfo: state,
        userId: userId,
      })

      .then(() => {
        setDateRange(initialDateRange);
        toast("Reservation is successful!");
        toast("You will be redirected to your reservations!");
        setTimeout(() => {
          navigate(`/reservations/${userId}`);
        }, 2000);
      })
      .catch((error) => {
        toast(error.response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.startDate, dateRange.endDate);

      if (dayCount && state.price) {
        setTotalPrice(Math.abs(dayCount) * state.price);
      } else {
        setTotalPrice(state.price);
      }
    }
  }, [dateRange?.startDate, dateRange?.endDate, state.price]);

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={state.description}
            location={state.location}
            imageSrc={state.imageSrc}
            listingId={state._id}
            user={data}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={state.owner}
              category={state.category}
              coordinates={state.location.latlng}
              description={state.description}
              guestCount={state.guestCount}
              roomCount={state.roomCount}
              bathroomCount={state.bathroomCount}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={state.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={loading}
                disabledDates={disabledDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListingPage;
