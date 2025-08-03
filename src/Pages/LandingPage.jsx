import Header from "../Components/Header/Header";
import Hero from "../Components/LandingPage/Hero";
import Categories from "../Components/LandingPage/Categories";
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
      <Categories />
      <Reviews />
      <Footer />
    </>
  );
};

export default LandingPage;
