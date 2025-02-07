import React from "react"
import Tagline from "../../components/home/tagline"
import FeaturedProducts from "../../components/home/featured_products"
import DiscountBanner from "../../components/home/discount_banner"
import SellingServices from "../../components/home/Selling_Services"
import Solutions from "../../components/home/Care_Solutions"
import Productoffer from "../../components/home/Product_Offer"
import OrderedMed from "../../components/home/Ordered_Med"
import CategoryGrid from "../../components/home/Categ_Options"

const Home = () => {
  return (
    <div>
      <Tagline />
      <CategoryGrid />
      <FeaturedProducts />
      <DiscountBanner />
      <SellingServices />
      <Solutions />
      <OrderedMed />
      <Productoffer />
    </div>
  )
}

export default Home
