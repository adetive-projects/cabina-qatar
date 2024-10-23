import { useSelector } from "react-redux";
import { getProducts } from "../lib/product";
import { LayoutOne } from "../layouts";
import { HeroSliderOne, HeroSliderThree } from "../components/HeroSlider";
import { BannerFour, BannerOne, BannerTwo } from "../components/Banner";
import { ProductTab } from "../components/ProductTab";
import { ProductSliderOne } from "../components/ProductSlider";
import { TestimonialOne } from "../components/Testimonial";
import { IconBoxOne } from "../components/IconBox";

import imageSliderData from "../data/image-sliders/image-slider-one.json";
import heroSliderOneData from "../data/hero-sliders/hero-slider-one.json";
import heroSliderThreeData from "../data/hero-sliders/hero-slider-three.json";
import testimonialOneData from "../data/testimonials/testimonial-one.json";
import { ImageSliderOne } from "../components/ImageSlider";
import { useEffect, useState } from "react";
import { apiUrl } from "../data/api/api";
import { useTranslation } from "react-i18next";

const FashionOne = () => {
  const { products } = useSelector((state) => state.product);
  const featuredProducts = getProducts(products, "fashion", "featured", 8);
  const newProducts = getProducts(products, "fashion", "new", 8);
  const bestSellerProducts = getProducts(products, "fashion", "popular", 8);
  const saleProducts = getProducts(products, "fashion", "sale", 8);

  const [sliderData, setSliderData] = useState([]);
  const [allSliderData, setAllSliderData] = useState([]);
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const getSlider = async () => {
    try {
      const response = await fetch(`${apiUrl}/hero-sliders`);
      const data = await response.json();
      if (response.ok) {
        setAllSliderData(data.data);
        setSliderData(
          i18n.language === "ar"
            ? data.data.arabic_hero_sliders
            : data.data.english_hero_sliders
        );
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  useEffect(() => {
    getSlider();
  }, []);

  useEffect(() => {
    setSliderData(
      currentLanguage === "ar"
        ? allSliderData.arabic_hero_sliders
        : allSliderData.english_hero_sliders
    );
  }, [currentLanguage, allSliderData]);
  return (
    <LayoutOne logoBig={true}>
      {/* hero slider */}
      <HeroSliderThree heroSliderData={sliderData} />
      {/* icon box */}
      <IconBoxOne />
      {/* tab product */}
      {/* <ProductTab
        title="Exclusive Products"
        newProducts={newProducts}
        bestSellerProducts={bestSellerProducts}
        featuredProducts={featuredProducts}
        saleProducts={saleProducts}
      /> */}
      {/* single banner */}
      {/* <BannerOne /> */}
      {/* product slider */}
      {/* <ProductSliderOne title="Featured Products" products={featuredProducts} /> */}

      {/* testimonial */}
      {/* <TestimonialOne testimonialData={testimonialOneData} /> */}
      {/* image slider */}
      {/* <ImageSliderOne imageSliderData={imageSliderData} /> */}
      {/* single banner */}
      <BannerOne />

      {/* Fourth banner */}
      <BannerFour />
      {/* double banner */}
      <BannerTwo />
    </LayoutOne>
  );
};

export default FashionOne;
