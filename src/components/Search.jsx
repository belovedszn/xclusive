import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProducts } from "../data/product";
import SearchProp from "./pages/SearchProp";
import { ThreeDot } from "react-loading-indicators";
import "../styling/search.css"

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery().get("query")?.toLowerCase() || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await import("../data/product").then(
          (mod) => mod.products
        );
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const results = products.filter((product) =>
    product.item.toLowerCase().includes(query)
  );

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ThreeDot
          color={["#32cd32", "#327fcd", "#cd32cd", "#cd8032"]}
          size="large"
        />
      </div>
    );
  }

  return (
    <div className="main">
      <span>Search Results for "{query}"</span>

      {results.length === 0 ? (
        <span>No products found.</span>
      ) : (
        <div className="search-grids" id="autoWidth">
          {results.map((product) => (
            <SearchProp
              key={product.id}
              id={product.id}
              image={product.image}
              item={product.item}
              price={product.price}
              slashPrice={product.slashPrice}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
