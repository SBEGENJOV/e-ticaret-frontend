import { Fragment } from "react";
import Category from "../component/Category/Category";
import Product from "../component/Product/Product";
import CampaignSingle from "../component/CampaignSingle/CampaignSingle";

const ShopPage = () => {
  return (
    <Fragment>
      <Category />
      <Product />
      <CampaignSingle />  
    </Fragment>
  );
};

export default ShopPage;
