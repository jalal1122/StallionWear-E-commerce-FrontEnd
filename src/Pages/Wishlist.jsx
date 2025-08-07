import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import ProductImage from "../Images/J12.jpg"; 
import { FaTrash } from "react-icons/fa6";

const Wishlist = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Breadcrumbs */}
      <div className="ml-5 mt-3">
        <a href="/">Home</a> &gt; <span>Wishlist</span>
      </div>

      {/* Wishlist Heading */}
      <div className="wishlist-container m-4">
        <h1 className="text-3xl font-bold sm:text-5xl text-black text-center">
          YOUR WISHLIST
        </h1>

        {/* Wishlist Items */}
        <div className="flex flex-col items-center w-[85%] mx-auto mt-10 border-2 rounded-lg">
          {/* Wishlist Item Card */}
          <div className="wishlist-item flex flex-col sm:flex-row justify-center items-center bg-white gap-5 p-5 m-2 border-2 border-[#f0f0f0] rounded-lg w-full md:w-2/3 shadow-md">
            {/* Image */}
            <div className="image w-fit h-fit flex items-center justify-center p-2 shadow-lg rounded-lg">
              <img
                src={ProductImage}
                alt="Wishlist Product"
                className="aspect-auto w-60 rounded-lg"
              />
            </div>

            {/* Product Details */}
            <div className="details flex flex-col gap-5 w-full justify-center">
              <div className="title flex flex-col gap-3">
                <h3 className="font-bold text-2xl text-black">
                  Stylish Bomber Jacket - Black Edition
                </h3>
                <p className="text-lg text-black font-semibold">
                  Size: Medium
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h2 className="font-bold text-black text-2xl">$42.99</h2>
                <a href="/cart">
                   <button className="bg-black text-white px-4 py-2 rounded-full hover:cursor-pointer active:scale-95">
                  Move to Cart
                </button>              
                </a>
              </div>

              {/* Remove Button */}
              <div className="remove-product flex justify-center items-center">
                <button className="flex justify-center items-center bg-black text-white px-4 py-2 w-2/4 rounded-full hover:bg-red-600 active:scale-95">
                  <FaTrash className="mr-2" /> 
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Wishlist;
