import { useState, useEffect, useRef } from "react";
import Papa from "papaparse";
import Selector from "../web/Selector";
import { useTable } from "react-table";

const columns = [
  {
    Header: "Course",
    accessor: "Course",
  },
  {
    Header: "Title",
    accessor: "Title",
  },
  {
    Header: "Program",
    accessor: "Program",
  },
  {
    Header: "Quantitative Reasoning",
    accessor: "Quantitative Reasoning",
  },
  {
    Header: "Scientific Inquiry",
    accessor: "Scientific Inquiry",
  },
  {
    Header: "Artistic Process",
    accessor: "Artistic Process",
  },
  {
    Header: "Social Inequality",
    accessor: "Social Inequality",
  },
  {
    Header: "Cultural Differences",
    accessor: "Cultural Differences",
  },
  {
    Header: "Ethical Judgment",
    accessor: "Ethical Judgment",
  },
];

export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Papa.parse("/goals.csv", {
      header: true,
      download: true,
      complete: (results) => {
        setData(results.data);
        setFilteredData(results.data);
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    // Update filteredData when filters change
    applyFilters();
  }, [filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const newData = data.filter((course) => {
      for (const [goal, checkedValues] of Object.entries(filters)) {
        if (checkedValues.length > 0 && !checkedValues.includes(course[goal])) {
          return false;
        }
      }
      return true;
    });

    setFilteredData(newData);
  };

  console.log({
    data: data,
    filteredData: filteredData,
    filters: filters,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-4 sm:py-8 md:py-24 px-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed left-0 top-0 flex flex-col items-center w-full justify-around border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit h-20">
          HWS Educational Goals
          <Selector
            filters={filters}
            handleChange={handleFilterChange}
            setFilters={setFilters}
          />
        </div>
        <div className="fixed bottom-0 left-0 flex h-12 w-full items-end justify-center pb-1 bg-black md:hidden">
          <a
            className="pointer-events-none flex place-items-center p-2 lg:pointer-events-auto lg:p-0"
            href="https://hws-code.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            By <code className="font-mono font-bold">hws.code</code>
          </a>
        </div>
      </div>
      {!loading ? (
        filteredData.length > 0 ? (
          <div className="table-container w-full overflow-x-scroll mt-20">
            <table {...getTableProps()} className="min-w-full">
              <thead className="">
                {headerGroups.map((headerGroup, idx) => (
                  <tr key={idx} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idxx) => (
                      <th
                        key={idxx}
                        {...column.getHeaderProps()}
                        className="bg-white dark:bg-[#006957] px-2 py-2 text-xs md:text-sm" // Update the top value here
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className="text-center">
                {rows.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr key={idx} {...row.getRowProps()}>
                      {row.cells.map((cell, idxx) => {
                        return (
                          <td
                            key={idxx}
                            {...cell.getCellProps()}
                            className="border border-gray-300 dark:border-gray-700 px-2 py-1 text-xs md:text-sm"
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 text-center text-xl font-semibold">
            No courses found with the selected filters.
          </div>
        )
      ) : (
        <div className="mt-8 text-center text-xl font-semibold">Loading...</div>
      )}
    </main>
  );
}
