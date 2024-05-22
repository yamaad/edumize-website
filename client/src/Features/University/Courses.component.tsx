import ReactDOM from "react-dom/client";

const Courses = () => {
  return (
    <>
      <div id="search-box" className="search-box">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <input
          type="search"
          className="search-input"
          id="uni-search-program-name"
          name="prog-name"
          placeholder="Search for Program Name..."
          // onKeyUp="setSearchInput()"
        />
        <div>
          <div id="currency-box" className="currency-box">
            <select
              name="currency"
              id="currency"
              title="currency"
              className="currency"
              // onchange="setCurrency()"
            >
              {" "}
            </select>
          </div>
          <div
            id="sort-box"
            className="sort-box"
            // onClick="toggleSortView()"
          >
            <i className="bi bi-arrow-down-up"></i>
            &#8645
            <div className="sort-option" id="sort-option">
              <div
                id="ranking-asc"
                //  onclick="setSort('ranking-asc')"
                className=""
                style={{ backgroundColor: "#fff" }}
              >
                Most Wanted
              </div>
              <div
                id="full_cost-asc"
                // onclick="setSort('full_cost-asc')"
                className=""
              >
                Price Low-High
              </div>
              <div
                id="full_cost-desc"
                // onclick="setSort('full_cost-desc')"
                className=""
              >
                Price High-Low
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="filter-box" className="filter-box">
        <select
          name="study-level"
          id="study-level"
          title="study-level"
          className="filter-input"
          // onchange="setStudyLevel()"
        ></select>
        <select
          name="study-field"
          id="study-field"
          title="study-field"
          className="filter-input"
          // onchange="setStudyField()"
        ></select>
        <select
          name="study-mode"
          id="study-mode"
          title="study-mode"
          className="filter-input"
          // onchange="setStudyMode()"
        ></select>
      </div>

      <div id="card-list" className="card-list"></div>
      <div id="load-more-button">
        <button
          className="load-more"
          // onclick="fetchMore()"
        >
          Load more
        </button>
      </div>
    </>
  );
};
const elementId = document.getElementById("card-list");
if (elementId) ReactDOM.createRoot(elementId).render(<Courses />);

export default Courses;
