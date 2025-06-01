// server.js
import { createServer, Model } from "miragejs";
import { products as allProducts } from "../data/product"; // ✔ adjust this path as needed
import { products as flashSaleProducts } from "../data/flash-sale";
import { products as relatedProducts } from "../data/related";
import { products as bestSales } from "../data/best-selling";
import { products as explore } from "../data/explore";
import { sliderData as billboard } from "../data/billboard-items";
import { sliderData as displayBoard } from "../data/display-board";
import {sliderData as newArrival} from "../data/new-arrival"
import { products as JustForYou } from "../data/just-for-you";

export function server() {
  return createServer({
    models: {
      product: Model, // ✔ this defines the "product" model
    },

    /*  seeds(server) {
      products.forEach((item) => {
        server.create("product", item); // ❗ singular "product" (must match the model name)
      });
    }, */

    seeds(server) {
      allProducts.forEach((item) => {
        server.create("product", { ...item, category: "all" });
      });

      billboard.forEach((item) => {
        server.create("product", { ...item, category: "biilboard" });
      });

      flashSaleProducts.forEach((item) => {
        server.create("product", { ...item, category: "flash-sale" });
      });

      relatedProducts.forEach((item) => {
        server.create("product", { ...item, category: "related" });
      });

      bestSales.forEach((item) => {
        server.create("product", { ...item, category: "best-sales" });
      });

      explore.forEach((item) => {
        server.create("product", { ...item, category: "explore" });
      });

      displayBoard.forEach((item) => {
        server.create("product", { ...item, category: "display-board" });
      });

      newArrival.forEach((item) => {
        server.create("product", { ...item, category: "new-arrival" });
      });

      JustForYou.forEach((item) => {
        server.create("product", { ...item, category: "just-for-you" });
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/products", (schema) => {
        return schema.products.all(); // ✔ returns all products
      });

      /* this.get("/products/:id", (schema, request) => {
        return schema.products.find(request.params.id); // ✔ returns a product by ID
      }); 

      this.get("/products/:id", (schema, request) => {
        const { id } = request.params;
        const allProducts = schema.products.all().models;
        const product = allProducts.find((p) => p.id === id);
        return { product }; // Wrap it in an object so it matches expected format
      }); */

      this.get("/products/:id", (schema, request) => {
        const { id } = request.params;
        const product = schema.products.find(id); // This is safer than `.all().models.find(...)`
        return { product };
      });

      this.get("/all", (schema) => {
        return schema.products.where({ category: "all" });
      });

      this.get("/billboard", (schema) => {
        return schema.products.where({ category: "billboard" });
      });

      this.get("/flash-sale", (schema) => {
        return schema.products.where({ category: "flash-sale" });
      });

      this.get("/related", (schema) => {
        return schema.products.where({ category: "related" });
      });

      this.get("/best-sales", (schema) => {
        return schema.products.where({ category: "best-sales" });
      });

      this.get("/explore", (schema) => {
        return schema.products.where({ category: "explore" });
      });

      this.get("/display-board", (schema) => {
        return schema.products.where({ category: "display-board" });
      });

      this.get("/new-arrival", (schema) => {
        return schema.products.where({ category: "new-arrival" });
      });

      this.get("/just-for-you", (schema) => {
        return schema.products.where({ category: "just-for-you" });
      });
    },
  });
}
