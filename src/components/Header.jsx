// // components/Header.jsx
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   toggleTripSidebar,
//   setTripPageActive,
//   setTripSidebar,
// } from "../store/header/header.slice";
// import "../styles/Header.css";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { currentTrip } = useSelector(
//     (state) => state.trip || { currentTrip: [] },
//   );
//   const { showTripSidebar } = useSelector(
//     (state) => state.header || { showTripSidebar: false },
//   );

//   const handlePlanTripClick = () => {
//     if (location.pathname === "/plan-trip") {
//       // Already on plan-trip page - toggle sidebar
//       dispatch(toggleTripSidebar());
//     } else {
//       // Navigate to plan-trip page
//       dispatch(setTripPageActive(true));
//       dispatch(setTripSidebar(true)); // Show sidebar immediately
//       navigate("/plan-trip");
//     }
//   };

//   return (
//     <header>
//       <h1>TravelPlanner</h1>
//       <button onClick={handlePlanTripClick} className="plan-trip-btn">
//         Plan a Trip
//         {currentTrip?.length > 0 && ` (${currentTrip.length})`}
//       </button>
//     </header>
//   );
// };

// export default Header;

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
  setHomePageActive,
  setTripPageActive,
  toggleTripSidebar,
} from "../store/header/header.slice";
import { useEffect } from "react";
import "../styles/Header.css";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isHomePageActive } = useSelector((state) => state.header);

  const handlePlanTripClick = () => {
    console.log("current page active: ", isHomePageActive ? "Home" : " Trip");

    if (isHomePageActive) {
      console.log("navigating to plantrip page");
      dispatch(setTripPageActive());
      navigate("/plan-trip");
    } else {
      console.log("toggling trip sidebar");
      dispatch(toggleTripSidebar());
    }
  };

  useEffect(() => {
    console.log("URL changed to:", location.pathname);
    if (location.pathname === "/") {
      dispatch(setHomePageActive());
    } else if (location.pathname === "/plan-trip") {
      dispatch(setTripPageActive());
    }
  }, [location.pathname, dispatch]);

  return (
    <header>
      <h1>TravelPlanner</h1>
      <button onClick={handlePlanTripClick} className="plan-trip-btn">
        Plan a Trip
        {/* {currentTrip?.length > 0 && ` (${currentTrip.length})`} */}
      </button>
    </header>
  );
};

export default Header;

//------------------------ufro martivi----magram reduxit minda gavaketo da amito es amovige--------------------

// Header.jsx - Much cleaner!
// import { useNavigate, useLocation } from "react-router-dom";

// const Header = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handlePlanTripClick = () => {
//     if (location.pathname === "/plan-trip") {
//       // Toggle via URL param instead of Redux
//       navigate("/plan-trip?sidebar=true");
//     } else {
//       navigate("/plan-trip");
//     }
//   };

//   return (
//     <header>
//       <h1>TravelPlanner</h1>
//       <button onClick={handlePlanTripClick}>Plan a Trip</button>
//     </header>
//   );
// };
// export default Header;

//-------------------------PlanTripPageshi-------------------------
// import { useSearchParams } from "react-router-dom";

// const PlanTripPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const showSidebar = searchParams.get("sidebar") === "true";

//   return (
//     <>
//       {showSidebar && <TripSidebar onClose={() => setSearchParams({})} />}
//       {/* rest of your component */}
//     </>
//   );
// };
//------------------------ufro martivi------------------------
