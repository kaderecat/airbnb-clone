import { useEffect, useState } from "react";
import Heading from "./Heading";
import ListingCard from "./Listings/ListingCard";
import { newRequest } from "../utills/newRequest";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Listings } from "../interfaces/Listings";

const MyProperties = () => {
  const { id } = useParams();

  const [myProperties, setMyProperties] = useState([]);

  const fetchProperties = async () => {
    const res = await newRequest.get(`/listings/my-properties/${id}`);
    setMyProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const onDelete = async (id: string) => {
    await newRequest
      .delete(`/listings/my-properties/${id}`)
      .then(() => toast("Property deleted succesfully"))
      .finally(() => {
        fetchProperties();
      });
  };

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <Heading title="My Properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {myProperties.map((properties: Listings) => (
          <ListingCard
            data={properties}
            key={properties._id}
            onAction={onDelete}
            actionLabel="Delete Property"
            actionId={properties._id}
          />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
