// App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout"; // Add this
import HomePage from "./pages/HomePage";
import PlanTripPage from "./pages/PlanTripPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ), // Wrap with Layout
  },
  {
    path: "/plan-trip",
    element: (
      <Layout>
        <PlanTripPage />
      </Layout>
    ), // Wrap with Layout
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
