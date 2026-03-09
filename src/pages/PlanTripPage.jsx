// pages/PlanTripPage.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../store/countries/countries.thunks";
import { addToTrip } from "../store/trip/trip.slice"; // Import addToTrip
import TripSidebar from "../components/TripSidebar"; // Import TripSidebar
import "../styles/components/CountryCard.css";
import ShowCard from "../components/ShowCard";
import { FaHeart, FaPlus } from "react-icons/fa";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCountries } from "../store/countries/countries.thunks";
// import { BiCode } from "react-icons/bi";

const PlanTripPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [favorites, setFavorites] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);
  const dispatch = useDispatch();
  const { loading, error, countries } = useSelector((state) => state.countries);
  const { showTripSidebar } = useSelector((state) => state.header); // Get sidebar state
  const { currentTrip } = useSelector((state) => state.trip); // Get current trip from Redux
  const [showFavouritesOnly, setShowFavouritesOnly] = useState(false);
  const formatNumber = (num) => {
    if (!num && num !== 0) return "N/A";
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num.toString();
    }
  };

  // Handle adding/removing from favorites
  const handleAddToFavorites = (countryCode, e) => {
    e.stopPropagation();
    if (favorites.includes(countryCode)) {
      setFavorites(favorites.filter((code) => code !== countryCode));
    } else {
      setFavorites([...favorites, countryCode]);
    }
  };

  // Handle adding to Redux trip
  const handleAddToTrip = (country, e) => {
    e.stopPropagation();
    dispatch(addToTrip(country));
  };

  // Use useMemo for optimized filtering
  const filteredCountries = useMemo(() => {
    if (!Array.isArray(countries)) return [];

    let result = countries;

    // 🔍 Search filter
    if (searchTerm.trim()) {
      const searchStr = searchTerm.trim().toLowerCase();
      result = result.filter((country) =>
        country.name.common.toLowerCase().startsWith(searchStr),
      );
    }

    // 🌍 Region filter
    if (selectedRegion !== "all") {
      result = result.filter(
        (country) =>
          country.region === selectedRegion ||
          country.subregion === selectedRegion,
      );
    }
    // 🧠 Favorites filter
    if(showFavouritesOnly) {
      result = result.filter((country) => favorites.includes(country.cca2))
    }

    return result;
  }, [countries, searchTerm, selectedRegion,  showFavouritesOnly]);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  if (loading) return <div className="loading">Loading countries...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="plan-trip-page">
      {/* Trip Sidebar */}
      <TripSidebar />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Stats */}
      <div className="controls-container">
        <div className="countries-count">
          Showing {filteredCountries.length} of {countries.length} countries
        </div>
        <div className="drag-hint">
          Drag countries to the trip planner to add them
        </div>
      </div>

      {/* Region Filter */}
      <div className="select-wrapper">
        <select
          value={selectedRegion}
          onChange={(e) => {
            setSelectedRegion(e.target.value);
          }}
        >
          <option value="all">🌍 All Regions</option>
          <option value="Africa">🌍 Africa</option>
          <option value="Antarctica">🏔️ Antarctica</option>
          <option value="Asia">🗾 Asia</option>
          <option value="Europe">🏛️ Europe</option>
          <option value="North America">🗽 North America</option>
          <option value="Oceania">🏝️ Oceania</option>
          <option value="South America">🌄 South America</option>
        </select>
      </div>

      <div className="favourites-wrapper">
        <label className="favorites-checkbox">
          <input
            type="checkbox"
            checked={showFavouritesOnly}
            onChange={(e) => setShowFavouritesOnly(e.target.checked)}
          />
          <span className="checkbox-text">Show Favorites Only</span>
          {showFavouritesOnly && (
            <span className="favorites-count">
              ({favorites.length} countries)
            </span>
          )}
        </label>
      </div>

      {/* No Results Message */}
      {searchTerm && filteredCountries.length === 0 && (
        <div className="no-results">
          <h2>No countries found</h2>
          <p>Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Countries Grid */}
      <div className="countries-container">
        {filteredCountries.map((country) => {
          const isInTrip = currentTrip.some((c) => c.cca2 === country.cca2);
          return (
            <div
              key={country.cca2}
              className="country-card"
              onClick={() => setSelectedCountry(country)}
            >
              {/* Card Buttons */}
              <div className="card-buttons">
                <button
                  className={`card-button favorite-btn ${
                    favorites.includes(country.cca2) ? "active" : ""
                  }`}
                  onClick={(e) => handleAddToFavorites(country.cca2, e)}
                  title={
                    favorites.includes(country.cca2)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <FaHeart />
                </button>
                <button
                  className={`card-button plus-btn ${isInTrip ? "active" : ""}`}
                  onClick={(e) => handleAddToTrip(country, e)}
                  title={isInTrip ? "Remove from trip" : "Add to trip"}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Flag Image */}
              <div className="flag-container">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="country-flag"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://picsum.photos/300/200?grayscale"; // Simple, always works
                  }}
                />
              </div>

              {/* Country Details */}
              <div className="country-content">
                <h2 className="country-name">{country.name.common}</h2>
                <p className="region-line">{country.region}</p>
                <p className="capital-line">
                  Capital: {country.capital?.[0] || "N/A"}
                </p>
                <p className="population-line">
                  {formatNumber(country.population)}
                </p>
                <div className="bottom-region">
                  {favorites.includes(country.cca2) && "❤️ "}
                  {isInTrip && "✈️ "}
                  {country.region}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show Selected Country Modal */}
      {selectedCountry && (
        <ShowCard
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          isFavorite={favorites.includes(selectedCountry.cca2)}
          isPlanned={currentTrip.some((c) => c.cca2 === selectedCountry.cca2)}
          onToggleFavorite={(code) => {
            if (favorites.includes(code)) {
              setFavorites(favorites.filter((c) => c !== code));
            } else {
              setFavorites([...favorites, code]);
            }
          }}
          onTogglePlan={(code) => {
            const country = countries.find((c) => c.cca2 === code);
            if (country) {
              if (currentTrip.some((c) => c.cca2 === code)) {
                dispatch(removeFromTrip(code));
              } else {
                dispatch(addToTrip(country));
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default PlanTripPage;















































//  import { FaHeart, FaPlus } from "react-icons/fa";
// import "../styles/PlanTripPage.css";
// const PlanTripPage = () => {
//   const dispatch = useDispatch();
//   const { countries, loading, error } = useSelector((state) => state.countries);

//   useEffect(() => {
//     dispatch(fetchCountries());
//   }, [dispatch]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;
// console.log(countries);


// const convertPopulation = (population) => {
//   if(population >=1000000000) {
//     return (population/1000000000).toFixed(1) + "B";
//   } else if(population >=1000000) {
//     return (population/1000000).toFixed(1) + "M";
//   } else if(population >=1000) {
//     return (population/1000).toFixed(1) + "K";
//   }
// }
//   return (
//     <div>
//       <div className="countries-container">
//         {countries.map((country) => (
//           <div key={country.cca2} className="flag-container">
//             <div className="country-flag">
//               <FaHeart />
//               <FaPlus />
//               <img src={country.flags.png} alt={country.name.common} />
//             </div>
//             <h2>{country.name.common}</h2>
//             <p>{country.region}</p>

//             <p>Capital: {country.capital?.[0] || "No capital"}</p>
//             <p>Population: {convertPopulation(country.population)}</p>
//             <p>{country.region}</p>

//             {/* <div className="currency-section">
              
//               {country.currencies ? (
//                 <div>
//                   {Object.entries(country.currencies).map(
//                     ([code, currencyData]) => (
//                       <div key={code} className="currency-item">
//                         <p>
//                           <strong>Currency Name:</strong> {currencyData.name}
//                         </p>
//                         <p>
//                           <strong>Currency Code:</strong> {code}
//                         </p>
//                         <p>
//                           <strong>Currency Symbol:</strong>{" "}
//                           {currencyData.symbol}
//                         </p>
//                       </div>
//                     ),
//                   )}
//                 </div>
//               ) : (
//                 <p>No currency information available</p>
//               )}
//             </div> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default PlanTripPage;