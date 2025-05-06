"use client";

import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
  ShoppingCart,
  X,
  PhoneIcon,
  MailIcon,
  MessageCircle,
} from "lucide-react";

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
      <div className="p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Top 5 Products by Quantity
        </h2>

        {topProducts.length > 0 ? (
          <div className="space-y-4">
            {topProducts.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow hover:bg-gray-100 cursor-pointer transition-all"
                onClick={() => setSelectedProduct(item)}
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart className="w-5 h-5 text-blue-500" />
                  <div className="text-base font-medium text-gray-700 hover:text-blue-600">
                    {item.product}
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{item.quantity}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No data available.</p>
        )}
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Customers for {selectedProduct.product}
            </h3>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {selectedProduct.customers.map((customer, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm"
                >
                  <p className="text-base font-medium text-gray-900">{customer.name}</p>

                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <PhoneIcon className="w-4 h-4 mr-2 text-gray-500" />
                    {customer.phone}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <MailIcon className="w-4 h-4 mr-2 text-gray-500" />
                    {customer.email}
                  </div>

                  <div className="flex gap-4 mt-3">
                    <a
                      href={`https://wa.me/${customer.phone}?text=Hi%20${encodeURIComponent(
                        customer.name
                      )},%20thanks%20for%20your%20order!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-green-600 hover:text-green-700 font-medium"
                    >
                      <MessageCircle className="w-4 h-4 mr-1.5" />
                      WhatsApp
                    </a>

                    <a
                      href={`mailto:${customer.email}?subject=Order Update&body=Hi ${encodeURIComponent(
                        customer.name
                      )},%0A%0AThanks for your order.`}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <MailIcon className="w-4 h-4 mr-1.5" />
                      Email
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
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
