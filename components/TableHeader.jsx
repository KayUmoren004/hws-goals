import React, { useState, useEffect } from "react";
import { useTable } from "react-table";
const TableHeader = ({ columns, data, tableRef }) => {
  const [tableWidth, setTableWidth] = useState("100%");
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  useEffect(() => {
    if (tableRef.current) {
      setTableWidth(`${tableRef.current.clientWidth}px`);
    }
  }, [tableRef]);
  return (
    <div className="overflow-x-auto" style={{ width: tableWidth }}>
      <table className="w-full text-left border-collapse">
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr
              key={idx}
              {...headerGroup.getHeaderGroupProps()}
              className="border border-gray-300 sticky top-0 bg-black"
            >
              {headerGroup.headers.map((column, idxx) => (
                <th
                  key={idxx}
                  {...column.getHeaderProps()}
                  className={`px-4 py-2 font-semibold text-sm border-r border-gray-300 ${
                    ["Course", "Title", "Program"].includes(column.Header)
                      ? "text-left"
                      : ""
                  }`}
                  style={column.Header === "Title" ? { minWidth: "250px" } : {}}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default TableHeader;
