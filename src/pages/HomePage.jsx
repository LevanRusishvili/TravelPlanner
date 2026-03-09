import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";
const HomePage = () => {
  const navigate = useNavigate();
  const explorePlaces = () => {
    navigate("/plan-trip");
  }
  return (
    <div className="container">
      <div className="main-info">
        <div className="plan-adventure">
          <h1>Plan your Perfect</h1>
          <h1>Adventure</h1>
          <h3>
            Discover amazing destinations, create personalized travel
            itineraries, and save your favorite places. Your next adventure is
            just a click away.
          </h3>
          <div className="buttons">
            <button className="explore-places" onClick={explorePlaces}>Explore Places</button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
        <div className="more-info">
          <div className="info-card">
            <h2>Discover Countries</h2>
            <p>
              Browse through a comprehensive list of countries with detailed
              information, flags, and key facts about each destination.
            </p>
          </div>
          <div className="info-card">
            <h2>Save Favorites</h2>
            <p>
              Mark countries as favorites and easily access them later. Filter
              by your favorite destinations to plan future trips.
            </p>
          </div>
          <div className="info-card">
            <h2>Plan Trips</h2>
            <p>
              Create custom travel itineraries by selecting multiple countries.
              Save your trips and access them anytime for future reference.
            </p>
          </div>
        </div>
        <div className="how-it-works">
          <h1>How it works</h1>
          <div className="steps">
            <div className="step">
              <h1>1</h1>
              <h3>Browse Countries</h3>
              <p>
                Explore our comprehensive list of countries with flags and
                information
              </p>
            </div>
            <div className="step">
              <h1>2</h1>
              <h3>Add to Favorites</h3>
              <p>Mark interesting destinations as favorites for easy access</p>
            </div>
            <div className="step">
              <h1>3</h1>
              <h3>Plan Your Trip</h3>
              <p>Use our trip planner to create custom itineraries</p>
            </div>
            <div className="step">
              <h1>4</h1>
              <h3>Save & Share</h3>
              <p>Save your travel plans and access them anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
