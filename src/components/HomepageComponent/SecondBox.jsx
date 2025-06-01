import React from "react";
import FlashSales from "./FlashSales";
import SelectCategory from "./SelectCategory";
import BestSales from "./BestSales";
import DisplayBox from "./DisplayBox";
import Explore from "./Explore";
import NewArrival from "./NewArrival";
import LastBox from "./LastBox";
import "../../styling/style.css";

function SecondBox() {
  return (
    <div id="main">
      <FlashSales />
      <SelectCategory />
      <BestSales />
      <DisplayBox />
      <Explore />
      <NewArrival />
      <LastBox />
    </div>
  );
}

export default SecondBox;
