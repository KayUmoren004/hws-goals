import React, { useState, useRef, useEffect } from "react";
import CheckboxGroup from "react-checkbox-group";

const MobileSelector = ({ filters, handleChange, setFilters }) => {
  const goals = [
    "Quantitative Reasoning",
    "Scientific Inquiry",
    "Artistic Process",
    "Social Inequality",
    "Cultural Differences",
    "Ethical Judgment",
  ];

  const [isOpen, setIsOpen] = useState(false);
  // const dropdownRef = useRef(null);

  const handleCheckboxChange = (goal, goalCheckedValues) => {
    handleChange({
      ...filters,
      [goal]: goalCheckedValues,
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <div className="relative bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <h1 className="text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
        Find Courses by Goal
      </h1>
      <div className="">
        {goals.map((goal) => (
          <div key={goal} className="p-2 text-center">
            {goal}
            <br />
            <CheckboxGroup
              name={goal}
              value={filters[goal] || []}
              onChange={(goalCheckedValues) =>
                handleCheckboxChange(goal, goalCheckedValues)
              }
            >
              {(Checkbox) => (
                <div className="flex flex-col justify-around items-center mt-1">
                  <label className="flex flex-row items-center ">
                    <Checkbox
                      value="Partially"
                      className="filter-checkbox mr-1"
                    />{" "}
                    Partially
                  </label>
                  <label className="flex flex-row items-center ">
                    <Checkbox
                      value="Substantially"
                      className="filter-checkbox mr-1"
                    />{" "}
                    Substantially
                  </label>
                </div>
              )}
            </CheckboxGroup>
          </div>
        ))}
        {/* Clear Filters */}
        <div className="p-2 text-center">
          <button
            className=" text-white rounded-md p-2 "
            onClick={clearFilters}
            style={{ color: "red" }}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSelector;
