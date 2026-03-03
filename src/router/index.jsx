import HomePage from "../pages/HomePage";
import PlanTripPage from "../pages/PlanTripPage";

const routes = [
  {
    element: <HomePage />,
    path: "/",
  },
  {
    element: <PlanTripPage />,
    path: "/plan-trip",
  },
];

export default routes;
