import React from "react";
import Slider from "../component/Slider/SliderCount";
import Category from "../component/Category/Category";
import Product from "../component/Product/Product";
import Campaigns from "../component/Campaigns/Campaigns";
import Blog from "../component/Blog/Blog";
import Brands from "../component/Brands/Brands";
import CampaignSingle from "../component/CampaignSingle/CampaignSingle";

const HomePage = () => {
  return (
    <React.Fragment>
      <Slider />
      <Category />
      <Product />
      <Campaigns />
      <Blog />
      <Brands />
      <CampaignSingle />
    </React.Fragment>
  );
};

export default HomePage;
