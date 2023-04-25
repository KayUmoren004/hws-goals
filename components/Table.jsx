// import React, { useRef, useEffect } from "react";
// import { useTable } from "react-table";

// const CourseTable = ({ data, columns, tableRef }) => {
//   const headerRefs = useRef([]);

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     useTable({ columns, data });

//   useEffect(() => {
//     if (tableRef.current) {
//       headerRefs.current.forEach((ref, index) => {
//         const headerElement = ref.current;
//         const contentElement = tableRef.current.querySelector(
//           `tbody tr td:nth-child(${index + 1})`
//         );

//         if (headerElement && contentElement) {
//           const headerWidth = headerElement.getBoundingClientRect().width;
//           const contentWidth = contentElement.getBoundingClientRect().width;
//           const maxWidth = Math.max(headerWidth, contentWidth);

//           headerElement.style.width = `${maxWidth}px`;
//         }
//       });
//     }
//   }, [headerGroups, rows]);

//   return (
//     <div className="overflow-x-auto">
//       <table
//         ref={tableRef}
//         {...getTableProps()}
//         className="w-full text-left border-collapse"
//       >
//         <thead className=" ">
//           {headerGroups.map((headerGroup, idx) => (
//             <tr
//               key={idx}
//               {...headerGroup.getHeaderGroupProps()}
//               className="border border-gray-300 sticky top-0 bg-black"
//             >
//               {headerGroup.headers.map((column, idxx) => {
//                 headerRefs.current[idxx] =
//                   headerRefs.current[idxx] || React.createRef();
//                 return (
//                   <th
//                     ref={headerRefs.current[idxx]}
//                     key={idxx}
//                     {...column.getHeaderProps()}
//                     className={`px-4 py-2 font-semibold text-sm border-r border-gray-300 ${
//                       ["Course", "Title", "Program"].includes(column.Header)
//                         ? "text-left"
//                         : ""
//                     }`}
//                     style={
//                       column.Header === "Title" ? { minWidth: "250px" } : {}
//                     }
//                   >
//                     {column.render("Header")}
//                   </th>
//                 );
//               })}
//             </tr>
//           ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//           {rows.map((row, idx) => {
//             prepareRow(row);
//             return (
//               <tr
//                 key={idx}
//                 {...row.getRowProps()}
//                 className="border border-gray-300"
//               >
//                 {row.cells.map((cell, idxx) => {
//                   return (
//                     <td
//                       key={idxx}
//                       {...cell.getCellProps()}
//                       className={`px-4 py-2 text-sm border-r border-gray-300 whitespace-nowrap ${
//                         ["Course", "Title", "Program"].includes(
//                           cell.column.Header
//                         )
//                           ? "text-left"
//                           : ""
//                       }`}
//                       style={
//                         cell.column.Header === "Title"
//                           ? { minWidth: "250px" }
//                           : {}
//                       }
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   );
//                 })}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CourseTable;

import { useTable, useBlockLayout } from "react-table";
import { FixedSizeList } from "react-window";

function Table({ data, columns }) {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useBlockLayout
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map((cell, idx) => {
            return (
              <div key={idx} {...cell.getCellProps()} className="td">
                {cell.render("Cell")}
              </div>
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      <div>
        {headerGroups.map((headerGroup, idx) => (
          <div
            key={idx}
            {...headerGroup.getHeaderGroupProps()}
            className="tr sticky top-0 bg-white dark:bg-black/70"
          >
            {headerGroup.headers.map((column, idxx) => (
              <div key={idxx} {...column.getHeaderProps()} className="th">
                {column.render("Header")}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()} className="tbody">
        <FixedSizeList
          height={500}
          itemCount={rows.length}
          itemSize={50}
          width={1000}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}
