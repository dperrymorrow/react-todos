import React, { useEffect } from "react";
import { connect } from "react-redux";
import { filter, sort } from "./store/ui-state";
import LocalStore from "./store/local-storage";

function Filters({
  filterBy, sortBy, setFilter, setSort,
}) {
  const filters = [
    { label: "Show Only Complete", value: "complete" },
    { label: "Show Only Incomple", value: "incomplete" },
    { label: "Show All", value: "all" },
  ];

  useEffect(() => LocalStore.savePath("uiState", { filterBy, sortBy }));

  return (
    <div className="filters">
      <div>
        {
          filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={setFilter.bind(null, value)}
              disabled={filterBy === value}
            >
              {label}
            </button>
          ))
        }

      </div>

      <div>
        <select value={sortBy} onChange={(ev) => setSort(ev.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="updated">Sort by Updated at</option>
          <option value="complete">Sort by complete</option>
        </select>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filterBy: state.uiState.filterBy,
  sortBy: state.uiState.sortBy,
});

export default connect(mapStateToProps, { setFilter: filter, setSort: sort })(Filters);
