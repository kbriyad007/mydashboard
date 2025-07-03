"use client";

import React from "react";
import { useParams } from "next/navigation";

type Product = {
  slug: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
};

const products: Product[] = [
  {
    slug: "product-one",
    name: "Product One",
    description:
      "This is a great product that solves many problems and looks fantastic.",
    price: 99.99,
    imageUrl:
      "https://images.unsplash.com/photo-1606813909253-d6d6be6de17e?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "product-two",
    name: "Product Two",
    description:
      "An innovative product with amazing features that you will love.",
    price: 149.99,
    imageUrl:
      "https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=400&q=80",
  },
  {
    slug: "product-three",
    name: "Product Three",
    description:
      "A reliable product with outstanding performance and value.",
    price: 79.99,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug || "";

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return <h1>Product not found.</h1>;
  }

  return (
    <main
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 20,
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", borderRadius: 12, marginBottom: 20 }}
      />
      <p style={{ fontSize: 18, lineHeight: 1.6, marginBottom: 20 }}>
        {product.description}
      </p>
      <p
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#0070f3",
          marginBottom: 30,
        }}
      >
        ${product.price.toFixed(2)}
      </p>
      <button
        style={{
          backgroundColor: "#0070f3",
          color: "white",
          padding: "12px 24px",
          fontSize: 18,
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => alert(`Bought ${product.name}!`)}
      >
        Buy Now
      </button>
    </main>
  );
}
