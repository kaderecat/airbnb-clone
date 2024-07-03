export interface Listings {
  _id: string;
  category: string;
  location: {
    latlng: [number];
    label: string;
  };
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  price: number;
  title: string;
  imageSrc: string;
  description: string;
  owner: string;
}
