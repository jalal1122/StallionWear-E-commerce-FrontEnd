import Header from "../Components/Header/Header";
import Hero from "../Components/LandingPage/Hero";
import BrowseByCategories from "../Components/LandingPage/BrowseByCategories";
import NewArrivals from "../Components/LandingPage/NewArrivals";
import TopSelling from "../Components/LandingPage/TopSelling";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";

const reviews = [
  {
    name: "Anis Khan",
    review: "Loved the quality and comfort of the hoodie!",
    rating: "5",
  },
  {
    name: "Muhammad Jalal",
    review: "Great fitting and fabric, totally worth the price!",
    rating: "5",
  },
  {
    name: "Uzair Khan",
    review: "Soft material and trendy design. Will buy again!",
    rating: "5",
  },
  {
    name: "Fazle Samad",
    review: "Color is exactly like the picture. Very happy!",
    rating: "5",
  },
];

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewArrivals />
      <TopSelling />
      <BrowseByCategories />
      <Reviews heading={"OUR HAPPY CUSTOMERS"} reviews={reviews} />
      <Footer />
    </>
  );
};

export default LandingPage;
