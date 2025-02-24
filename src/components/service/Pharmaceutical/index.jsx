  import React from "react";
  import SearchBar from "../../common/Search_Bar";
  import Diabetes from "../service_components/Pharmaceutical_Services/diabetes";
  import Newproduct from "../service_components/Pharmaceutical_Services/New_Product";
  import Knowmore from "../service_components/Pharmaceutical_Services/know_More";
  import HealthCondition from "../service_components/Pharmaceutical_Services/Health_Condition"
  import Trendingnew from "../service_components/Pharmaceutical_Services/Trending_New"
import CategoriesPharma from "../service_components/Pharmaceutical_Services/Categories";

  const Pharmaceutical = () => {
    return (
      <div className="w-full">
          <SearchBar  />
          <CategoriesPharma />
          <Diabetes />
          <Newproduct />
          <Knowmore />
          <HealthCondition />
          <Trendingnew />

      </div>
    );
  };

  export default Pharmaceutical;
