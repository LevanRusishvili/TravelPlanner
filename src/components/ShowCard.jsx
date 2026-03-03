import { useState } from "react";
import "../styles/components/ShowCard.css";
import { FaTimes, FaHeart, FaPlus, FaMap } from "react-icons/fa";

const ShowCard = ({
  country,
  onClose,
  isFavorite,
  isPlanned,
  onToggleFavorite,
  onTogglePlan,
}) => {
  const [showAddedMessage, setShowAddedMessage] = useState("");

  const formatCurrencies = () => {
    if (!country.currencies) return "N/A";
    const currencies = Object.values(country.currencies);
    return currencies.map((c) => `${c.name} (${c.symbol || ""})`).join(", ");
  };

  const formatLanguages = () => {
    if (!country.languages) return "N/A";
    return Object.values(country.languages).join(", ");
  };

  const formatTimezones = () => {
    if (!country.timezones || country.timezones.length === 0) return "N/A";
    return country.timezones.slice(0, 2).join(", ");
  };

  const formatArea = (area) => {
    if (!area) return "N/A";
    return area.toLocaleString() + " km²";
  };

  const formatPopulation = (population) => {
    if (!population) return "N/A";
    return population.toLocaleString();
  };

  const handleFavoriteClick = () => {
    onToggleFavorite(country.cca2);
    setShowAddedMessage(
      isFavorite ? "Removed from favorites" : "Added to favorites"
    );
    setTimeout(() => setShowAddedMessage(""), 2000);
  };

  const handleTripClick = () => {
    onTogglePlan(country.cca2);
    setShowAddedMessage(
      isPlanned ? "Removed from trip plan" : "Added to trip plan"
    );
    setTimeout(() => setShowAddedMessage(""), 2000);
  };

  // const openInMaps = () => {
  //   if (country.maps?.googleMaps) {
  //     window.open(country.maps.googleMaps, "_blank");
  //   } else if (country.latlng) {
  //     const [lat, lng] = country.latlng;
  //     window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  //   }
  // };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Header with Action Buttons */}
        <div className="card-header">
          <div className="header-content">
            <h2 className="card-country-name">{country.name.common}</h2>
            {country.name.official && (
              <p className="official-name">{country.name.official}</p>
            )}
          </div>

          <div className="action-buttons">
            <button
              className={`action-btn favorite ${isFavorite ? "active" : ""}`}
              onClick={handleFavoriteClick}
            >
              <FaHeart /> Add to Favorites
            </button>
            <button
              className={`action-btn trip ${isPlanned ? "active" : ""}`}
              onClick={handleTripClick}
            >
              <FaPlus /> Add to Trip
            </button>
          </div>
        </div>

        <hr className="divider" />

        {/* Notification Message */}
        {showAddedMessage && (
          <div className="notification-message">{showAddedMessage}</div>
        )}

        {/* Flag Image */}
        <div className="flag-section">
          <img
            src={country.flags.png}
            alt={country.name.common}
            className="card-flag-image"
          />
        </div>

        {/* Main Content */}
        <div className="card-content">
          {/* First Section */}
          <div className="info-section">
            <div className="info-item">
              <h3 className="info-label">Region</h3>
              <p className="info-value">
                {country.region}
                {country.subregion && (
                  <>
                    <br />
                    {country.subregion}
                  </>
                )}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Capital</h3>
              <p className="info-value">{country.capital?.[0] || "N/A"}</p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Population</h3>
              <p className="info-value">
                {formatPopulation(country.population)}
              </p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Area</h3>
              <p className="info-value">{formatArea(country.area)}</p>
            </div>
          </div>

          <hr className="divider" />

          {/* Second Section */}
          <div className="info-section">
            <div className="info-item">
              <h3 className="info-label">Currency</h3>
              <p className="info-value">{formatCurrencies()}</p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Languages</h3>
              <p className="info-value">{formatLanguages()}</p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Timezones</h3>
              <p className="info-value">{formatTimezones()}</p>
            </div>

            <div className="info-item">
              <h3 className="info-label">Continents</h3>
              <p className="info-value">
                {country.continents?.join(", ") || country.region}
              </p>
            </div>
          </div>

          {/* Map Link */}
          {/* <div className="map-section">
            <button className="map-link" onClick={openInMaps}>
              <FaMap /> View on Google Maps
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
