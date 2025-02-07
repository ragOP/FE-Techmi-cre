import React from "react";
import SearchBar from "../service_components/Pharmaceutical_Services/Search_Bar";
import Categories_Phaema from "../service_components/Pharmaceutical_Services/Categories";
import Diabetes from "../service_components/Pharmaceutical_Services/diabetes";
import Newproduct from "../service_components/Pharmaceutical_Services/New_Product";
import Knowmore from "../service_components/Pharmaceutical_Services/know_More";
import HealthCondition from "../service_components/Pharmaceutical_Services/Health_Condition"
import Trendingnew from "../service_components/Pharmaceutical_Services/Trending_New"

const Pharmaceutical = () => {
  return (
    <div className="w-full">
        <SearchBar />
        <Categories_Phaema />
        <Diabetes />
        <Newproduct />
        <Knowmore />
        <HealthCondition />
        <Trendingnew />

    </div>
  );
};

export default Pharmaceutical;
