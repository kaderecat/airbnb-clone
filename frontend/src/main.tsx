import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SingleListingPage from "./components/Listings/SingleListingPage.tsx";
import { getUser } from "./utills/fetchUser.ts";
import Reservations from "./components/Reservations.tsx";
import MyProperties from "./components/MyProperties.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/listings/:id",
        element: <SingleListingPage />,
        loader: async () => getUser(),
      },
      {
        path: "/reservations/:id",
        element: <Reservations />,
      },
      {
        path: "/my-properties/:id",
        element: <MyProperties />,
      },
    ],
  },
  // {
  //   path: "/listings/:id",
  //   element: <SingleListingPage />,
  //   loader: async () => getUser(),
  // },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router}></RouterProvider>
);
