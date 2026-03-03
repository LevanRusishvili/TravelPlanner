// components/TripSidebar.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTripSidebar } from "../store/header/header.slice";
import {
  removeFromTrip,
  clearTrip,
  saveTrip,
  loadTrip,
  deleteSavedTrip,
} from "../store/trip/trip.slice";
import "../styles/components/TripSidebar.css";

const TripSidebar = () => {
  const dispatch = useDispatch();
  const [tripNameInput, setTripNameInput] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

  // Use safe access with fallbacks
  const { currentTrip = [], savedTrips = [] } = useSelector(
    (state) => state.trip || {},
  );

  const { showTripSidebar = false } = useSelector(
    (state) => state.header || {},
  );

  if (!showTripSidebar) return null;

  const handleClose = () => {
    dispatch(toggleTripSidebar(false));
    setShowSaveInput(false);
    setTripNameInput("");
  };

  const handleSaveTrip = () => {
    if (!tripNameInput.trim()) {
      // If no name provided, let Redux generate the next available number
      dispatch(saveTrip(""));
    } else {
      dispatch(saveTrip(tripNameInput.trim()));
    }

    setTripNameInput("");
    setShowSaveInput(false);
  };

  const handleDeleteTrip = (tripId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this trip?")) {
      dispatch(deleteSavedTrip(tripId));
    }
  };

  return (
    <div className="trip-sidebar-overlay" onClick={handleClose}>
      <div className="trip-sidebar" onClick={(e) => e.stopPropagation()}>
        <button className="close-sidebar" onClick={handleClose}>
          ×
        </button>

        <h2 className="sidebar-title">🏝️ Trip Planner</h2>
        <p className="sidebar-subtitle">
          Drag countries here to add them to your trip
        </p>

        {/* Current Trip Section */}
        <div className="current-trip-section">
          <div className="section-header">
            <h3 className="section-title">Current Trip</h3>
            {currentTrip.length > 0 && (
              <button
                className="clear-all-btn"
                onClick={() => dispatch(clearTrip())}
              >
                Clear All
              </button>
            )}
          </div>

          {!currentTrip || currentTrip.length === 0 ? (
            <p className="empty-message">No countries added yet</p>
          ) : (
            <div className="trip-countries-list">
              {currentTrip.map((country) => (
                <div key={country.cca2} className="trip-country-item">
                  <div className="country-main-info">
                    <strong className="country-name">
                      {country.name?.common || "Unknown Country"}
                    </strong>
                    <span className="country-region">
                      {country.region || ""}
                    </span>
                  </div>
                  <button
                    className="remove-country-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromTrip(country.cca2));
                    }}
                    title="Remove from trip"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Save Trip Section */}
          {currentTrip.length > 0 && (
            <div className="save-trip-section">
              {showSaveInput ? (
                <div className="save-input-container">
                  <input
                    type="text"
                    value={tripNameInput}
                    onChange={(e) => setTripNameInput(e.target.value)}
                    placeholder="Enter trip name"
                    className="trip-name-input"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveTrip();
                      if (e.key === "Escape") {
                        setShowSaveInput(false);
                        setTripNameInput("");
                      }
                    }}
                  />
                  <div className="save-buttons">
                    <button
                      className="save-confirm-btn"
                      onClick={handleSaveTrip}
                      disabled={!tripNameInput.trim()}
                    >
                      Save
                    </button>
                    <button
                      className="save-cancel-btn"
                      onClick={() => {
                        setShowSaveInput(false);
                        setTripNameInput("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="save-trip-main-btn"
                  onClick={() => setShowSaveInput(true)}
                >
                  💾 Save Trip
                </button>
              )}
            </div>
          )}
        </div>

        {/* Saved Trips Section */}
        {savedTrips.length > 0 && (
          <div className="saved-trips-section">
            <div className="section-header">
              <h3 className="section-title">Saved Trips</h3>
            </div>
            <div className="saved-trips-list">
              {savedTrips.map((trip) => (
                <div key={trip.id} className="saved-trip-item">
                  <div className="trip-info">
                    <div className="trip-header">
                      <strong className="trip-name">
                        {trip.name || "Unnamed Trip"}
                      </strong>
                      <span className="trip-count">
                        {trip.countries?.length || 0} countries
                      </span>
                    </div>
                    <span className="trip-date">{trip.date || ""}</span>
                  </div>
                  <div className="trip-actions">
                    <button
                      className="load-trip-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(loadTrip(trip.id));
                      }}
                    >
                      Load
                    </button>
                    <button
                      className="delete-trip-btn"
                      onClick={(e) => handleDeleteTrip(trip.id, e)}
                      title="Delete trip"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripSidebar;
