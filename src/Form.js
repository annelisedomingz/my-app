export default function Form(props) {
  const grabForecast = props.grabForecast;
  const location = props.location;
  const setLocation = props.setLocation;

  function searchLocation(event) {
    event.preventDefault();
    if (location) {
      grabForecast();
    }
  }

  function recordInput(event) {
    setLocation(event.target.value);
  }

  return (
    <form className="row search">
      <div className="col-12 col-md-9 searchInput">
        <input
          type="text"
          id="search-field"
          placeholder="Search"
          onChange={recordInput}
        />
      </div>
      <div className="col-12 col-md-3 mt-3 mt-md-0 searchButton">
        <button
          className="mainButton"
          type="submit"
          id="search-button"
          onClick={searchLocation}
        >
          Search
        </button>
      </div>
    </form>
  );
}
