import React from "react";
import Billboard from "./HomepageComponent/Billboard";
import FlashSale from "./HomepageComponent/FlashSales";
import BestSales from "./HomepageComponent/BestSales";
import Related from "./HomepageComponent/Related";
import Explore from "./HomepageComponent/Explore";

function Sales() {
  return (
    <>
      <Billboard />
      <FlashSale />
      <BestSales />
      <Related />
      <Explore />
    </>
  );
}

export default Sales;
