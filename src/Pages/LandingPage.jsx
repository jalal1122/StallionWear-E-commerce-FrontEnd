import Header from "../Components/Header/Header";
import Hero from "../Components/Hero/Hero";
import Categories from "../Components/Category/Categories";
import NewArrivals from "../Components/Hero/NewArrivals";
import TopSelling from "../Components/Hero/TopSelling";
import Reviews from "../Components/Reviews/Reviews";
import Footer from "../Components/Footer/Footer";

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
