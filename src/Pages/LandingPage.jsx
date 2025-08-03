import Header from "../Components/Header/Header";
import Hero from "../Components/LandingPage/Hero";
import BrowseByCategories from "../Components/LandingPage/BrowseByCategories";
import NewArrivals from "../Components/LandingPage/NewArrivals";
import TopSelling from "../Components/LandingPage/TopSelling";
import Reviews from "../Components/LandingPage/Reviews";
import Footer from "../Components/Footer";

const LandingPage = () => {
  return (
    <>
      <Header />
      <Hero />
      <NewArrivals />
      <TopSelling />
      <BrowseByCategories />
      <Reviews />
      <Footer />
    </>
  );
};

export default LandingPage;
