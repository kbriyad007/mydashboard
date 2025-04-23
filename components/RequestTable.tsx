"use client";

import React from "react";
import { useTable, usePagination } from "react-table";
import { useFirestoreQuery } from "../hooks/useFirestoreQuery"; // Your custom hook for Firestore data

const RequestTable: React.FC = () => {
  const { data, isLoading } = useFirestoreQuery(); // Assuming this is your custom hook to fetch data

  const columns = React.useMemo(
    () => [
      { Header: "Customer Name", accessor: "Customer-Name" },
      { Header: "Phone Number", accessor: "Phone-Number" },
      { Header: "Courier", accessor: "Courier" },
      { Header: "Product Name", accessor: "Product-Name" },
      { Header: "Quantity", accessor: "Quantity" },
      { Header: "Time", accessor: "Time" },
      { Header: "User Email", accessor: "User-Email" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page, // We now use `page` for pagination
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: data || [], // Use data fetched from Firestore
      initialState: { pageIndex: 0, pageSize: 10 }, // Pagination starts at page 0 with 10 rows per page
    },
    usePagination
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      <table {...getTableProps()} className="min-w-full table-auto border-collapse">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-3 py-2 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
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

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RequestTable;
