"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { HiOutlineShoppingCart } from "react-icons/hi";

type Request = {
  name: string;
  product: string;
  quantity: number;
  email: string;
  phone: string;
};

type ProductGroup = {
  product: string;
  quantity: number;
  customers: Request[];
};

export default function TopProducts() {
  const [topProducts, setTopProducts] = useState<ProductGroup[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductGroup | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      const snapshot = await getDocs(collection(db, "user_request"));
      const data: Request[] = snapshot.docs.map((doc) => {
        const raw = doc.data();
        return {
          name: raw["Customer-Name"],
          product: raw["Product-Name"],
          quantity: Number(raw["Quantity"]),
          email: raw["Email"],
          phone: raw["Phone-Number"],
        };
      });

      const map = new Map<string, ProductGroup>();

      for (const item of data) {
        if (map.has(item.product)) {
          const existing = map.get(item.product)!;
          existing.quantity += item.quantity;
          existing.customers.push(item);
        } else {
          map.set(item.product, {
            product: item.product,
            quantity: item.quantity,
            customers: [item],
          });
        }
      }

      const sorted = Array.from(map.values())
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      setTopProducts(sorted);
    };

    fetchRequests();
  }, []);

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Top 5 Products by Quantity
        </h2>

        {topProducts.length > 0 ? (
          <div className="space-y-4">
            {topProducts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-md hover:bg-gray-100 transition-all"
              >
                <div
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => setSelectedProduct(item)}
                >
                  <HiOutlineShoppingCart className="text-xl text-blue-500" />
                  <div className="text-lg font-semibold text-gray-700 hover:text-blue-600">
                    {item.product}
                  </div>
                </div>
                <div className="font-medium text-gray-900">{item.quantity}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No data available.</p>
        )}
      </div>

      {/* Native Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Customers for {selectedProduct.product}
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {selectedProduct.customers.map((customer, index) => (
                <div key={index} className="p-3 border rounded bg-gray-50">
                  <p className="font-medium text-gray-800">{customer.name}</p>
                  <p className="text-sm text-gray-600">📧 {customer.email}</p>
                  <p className="text-sm text-gray-600">📞 {customer.phone}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
