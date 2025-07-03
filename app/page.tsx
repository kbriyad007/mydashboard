"use client";

import React from "react";

type Product = {
  id: number;
  name: string;
};

const products: Product[] = [
  { id: 1, name: "Product One" },
  { id: 2, name: "Product Two" },
  { id: 3, name: "Product Three" },
];

export default function HomePage() {
  const handleBuy = (productName: string) => {
    alert(`You clicked Buy for ${productName}!`);
  };

  return (
    <main style={{ padding: 20, display: "flex", gap: 20 }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            width: 200,
            textAlign: "center",
          }}
        >
          <h2>{product.name}</h2>
          <button
            style={{
              padding: "10px 20px",
              fontSize: 16,
              borderRadius: 5,
              cursor: "pointer",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
            }}
            onClick={() => handleBuy(product.name)}
          >
            Buy
          </button>
        </div>
      ))}
    </main>
  );
}
