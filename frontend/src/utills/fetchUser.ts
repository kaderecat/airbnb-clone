import { currentUser } from "../interfaces/currentUserI";
import { getCurrentUser } from "./getCurrentUser";
import { newRequest } from "./newRequest";

const user: currentUser = getCurrentUser();

const email = user?.email;

export const getUser = async () => {
  if (email) {

    const res = await newRequest.post("/auth", { email });


    return res.data[0];
  }
  return null;
};
