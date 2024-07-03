import { useEffect, useState } from "react";
import Heading from "./Heading";
import ListingCard from "./Listings/ListingCard";
import { newRequest } from "../utills/newRequest";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Reservation } from "../interfaces/reservations";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);

  const { id } = useParams();

  const fetchReservations = async () => {
    const res = await newRequest.get(`/reservations/your-reservations/${id}`);

    setReservations(res.data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const onCancel = async (id: string) => {
    console.log(id);
    await newRequest
      .delete(`/reservations/${id}`)
      .then(() => toast("Reservation canceled succesfully"))
      .finally(() => {
        fetchReservations();
      });
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <Heading title="Reservations" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation: Reservation) => (
          <ListingCard
            data={reservation.listingInfo}
            key={reservation._id}
            onAction={onCancel}
            actionLabel="Cancel reservation"
            reservation={reservation}
            actionId={reservation._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Reservations;
