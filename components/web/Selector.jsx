import React, { useState, useRef, useEffect } from "react";
import CheckboxGroup from "react-checkbox-group";

const CourseFilter = ({ filters, handleChange, setFilters }) => {
  const goals = [
    "Quantitative Reasoning",
    "Scientific Inquiry",
    "Artistic Process",
    "Social Inequality",
    "Cultural Differences",
    "Ethical Judgment",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleCheckboxChange = (goal, goalCheckedValues) => {
    handleChange({
      ...filters,
      [goal]: goalCheckedValues,
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.classList.contains("filter-checkbox")
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative py-2" ref={dropdownRef}>
      <button
        className="bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        Filter Courses
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-64 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 shadow-md rounded-md text-sm">
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
      )}
    </div>
  );
};

export default CourseFilter;
