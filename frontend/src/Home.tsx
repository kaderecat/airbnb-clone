import { useEffect, useState } from "react";
import { newRequest } from "./utills/newRequest";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/Listings/ListingCard";
import { getCurrentUser } from "./utills/getCurrentUser";
import { currentUser } from "./interfaces/currentUserI";
import { Listings } from "./interfaces/Listings";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState<Listings[]>([]);
  const [user, setUser] = useState<currentUser | undefined>();
  const [liked, setLiked] = useState<string[]>([]);
  const { search } = useLocation();

  const filter = search.split("=");
  const query = filter[1];

  const filteredListings = listings.filter((item) => {
    return item.category.toLocaleLowerCase().includes(query);
  });

  const currentUser: currentUser = getCurrentUser();

  const email = currentUser?.email;

  useEffect(() => {
    const getListings = async () => {
      const res = await newRequest.get(`/listings`);

      setListings(res.data);
    };

    getListings();
  }, [listings.length]);

  useEffect(() => {
    const getUser = async () => {
      const res = await newRequest.post("/auth/", { email });
      setUser(res.data[0]);
      
    };
    getUser();
  }, [email,liked.length]);


  if (query && filteredListings.length === 0) {
    return <EmptyState showReset title="No listings found" />;
  }

  return (
    <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="pt-24 grid  grid-cols-1  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {query &&
          filteredListings.map((item, i) => (
            <ListingCard key={i} data={item} setLiked={setLiked} currentUser={user} liked={liked} />
          ))}
        {!query &&
          listings.map((item, i) => (
            <ListingCard key={i} setLiked={setLiked} data={item} currentUser={user} liked={liked}  />
          ))}
      </div>
    </div>
  );
};

export default Home;
