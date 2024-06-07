import React, { useEffect, useState } from 'react';
import { MainWrapper } from "../components/mainWrapper";
import { useAuthenticatedFetch } from "../hooks";

export default function HomePage() {

  const fetch = useAuthenticatedFetch();
  const [products, setProducts] = useState([]);
  const [productsCount, setProductsCount] = useState("");

  useEffect(() => {
    async function fetchAllProducts() {
      try {
        const request = await fetch("/api/Allproducts", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const response = await request.json();
        setProducts(response);
        console.log("products", response)
      } catch (error) {
        console.error("Failed to fetch store name:", error);
      }
    }
    fetchAllProducts();
  }, []);

  useEffect(() => {
    async function getProductCount() {
      try {
        const response = await fetch('/api/products/count');
        const result = await response.json()
        setProductsCount(result.count);
      } catch (error) {
        console.log(error)
      }
    }
    getProductCount()
  }, [])

  return (
    <div style={{ padding: "0 17px", height: "100%" }}>
      <section style={{ display: "grid", gridTemplateColumns: "1fr 4fr", gap: "20px", height: "calc(100% - 20px)" }}>
        <aside style={{ background: "rgba(48, 48, 48, 1)", borderRadius: '7px', padding: '30px 20px' }}>
          <ul style={{ listStyle: 'none', color: '#fff', fontSize: '25px', margin: '0', padding: '0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li>Dashboard</li>
            <li>Upload Csv</li>
          </ul>
        </aside>
        <div>
          <MainWrapper count={productsCount} />
        </div>

      </section>
    </div>
  );
}