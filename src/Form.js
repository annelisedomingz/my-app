export default function Form() {
  return (
    <form className="row search">
      <div className="col-6 searchInput">
        <input type="text" id="search-field" placeholder="Search" />
      </div>
      <div className="col-3 searchButton">
        <button type="submit" id="search-button">
          Search
        </button>
      </div>
      <div className="col-3 currentLocation">
        <button type="submit" className="location">
          Current Location
        </button>
      </div>
    </form>
  );
}
