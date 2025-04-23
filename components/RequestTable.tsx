"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, FileText } from "lucide-react";
import { generateInvoice, generateWhatsAppInvoiceLink, getValue } from "@/utilsutils/InvoiceUtils";
import { RequestData } from "@/types";

type Props = {
  requests: RequestData[];
  loading: boolean;
  error: string;
};

export default function RequestTable({ requests, loading, error }: Props) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<keyof RequestData | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showMinimal, setShowMinimal] = useState(false);
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  const minimalColumns = [
    "Customer-Name",
    "Status",
    "User-Email",
    "Phone-Number",
    "Courier",
    "Product-Links",
    "Quantity",
    "Time",
    "Message",
  ];

  const allColumns = [
    ...minimalColumns.slice(0, 5),
    "Address",
    "Description",
    ...minimalColumns.slice(5),
  ];

  const columns = showMinimal ? minimalColumns : allColumns;

  const handleSort = (key: keyof RequestData) => {
    setSortOrder(sortBy === key && sortOrder === "asc" ? "desc" : "asc");
    setSortBy(key);
  };

  const renderSortIcon = (key: keyof RequestData) =>
    sortBy === key ? (sortOrder === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />) : null;

  const filtered = requests.filter((r) =>
    [r["Customer-Name"], r["User-Email"], r["Phone-Number"], r.Address, r.Courier]
      .some((v) => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    const valA = a[sortBy];
    const valB = b[sortBy];
    return typeof valA === "string" && typeof valB === "string"
      ? sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA)
      : 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <h1 className="text-xl font-semibold">User Requests</h1>
        <button
          onClick={() => setShowMinimal((prev) => !prev)}
          className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
        >
          {showMinimal ? "Full View" : "Minimal View"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search..."
        className="w-full max-w-md px-3 py-1.5 border rounded text-sm text-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto border border-gray-700 rounded-lg text-xs">
          <table className="min-w-full text-left text-gray-200">
            <thead className="bg-gray-900 text-gray-300 uppercase">
              <tr>
                {columns.map((key) => (
                  <th
                    key={key}
                    onClick={() => key !== "Message" && key !== "Status" && handleSort(key as keyof RequestData)}
                    className={`px-3 py-2 cursor-pointer hover:text-blue-300 whitespace-nowrap ${
                      key === "Quantity" ? "w-12 text-center" : ""
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {key.replace(/-/g, " ")} {renderSortIcon(key as keyof RequestData)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-gray-950 divide-y divide-gray-800">
              {sorted.map((req) => (
                <tr key={req.id} className="hover:bg-gray-800">
                  {columns.map((key) =>
                    key === "Product-Links" ? (
                      <td key={key} className="px-3 py-1 text-blue-400">
                        {(req["Product-Links"] ?? []).map((link, i) => (
                          <div key={i}>
                            <a
                              href={link}
                              target="popup"
                              onClick={(e) => {
                                e.preventDefault();
                                window.open(link, "popup", "width=800,height=600");
                              }}
                              className="underline hover:text-blue-300"
                            >
                              Link-{i + 1}
                            </a>
                          </div>
                        ))}
                      </td>
                    ) : key === "Time" ? (
                      <td key={key} className="px-3 py-1">
                        {req.Time?.seconds
                          ? new Date(req.Time.seconds * 1000).toLocaleString()
                          : "—"}
                      </td>
                    ) : key === "Message" ? (
                      <td key={key} className="px-3 py-1 space-y-1">
                        <a
                          href={generateWhatsAppInvoiceLink(req)}
                          target="_blank"
                          className="text-green-400 underline block hover:text-green-300"
                          onClick={() =>
                            setStatusMap((prev) => ({
                              ...prev,
                              [req.id]: "✅ WhatsApp Sent",
                            }))
                          }
                        >
                          WhatsApp
                        </a>
                        <button
                          onClick={() => {
                            generateInvoice(req);
                            setStatusMap((prev) => ({
                              ...prev,
                              [req.id]: "✅ Invoice Sent",
                            }));
                          }}
                          className="text-blue-300 underline hover:text-blue-200"
                        >
                          <FileText size={14} className="inline mr-1" />
                          Invoice
                        </button>
                      </td>
                    ) : key === "Phone-Number" ? (
                      <td key={key} className="px-3 py-1">
                        <a
                          href={`tel:${req["Phone-Number"]?.replace(/\D/g, "")}`}
                          className="text-blue-300 underline hover:text-blue-200"
                        >
                          {req["Phone-Number"]}
                        </a>
                      </td>
                    ) : key === "User-Email" ? (
                      <td key={key} className="px-3 py-1">
                        <a
                          href={`mailto:${req["User-Email"]}`}
                          className="text-blue-300 underline hover:text-blue-200"
                        >
                          {req["User-Email"]}
                        </a>
                      </td>
                    ) : key === "Status" ? (
                      <td key={key} className="px-3 py-1 text-yellow-300">
                        {statusMap[req.id] || "—"}
                      </td>
                    ) : (
                      <td key={key} className={`px-3 py-1 ${key === "Quantity" ? "text-center" : ""}`}>
                        {getValue(req, key)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
