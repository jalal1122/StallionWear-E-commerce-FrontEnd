import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import LinkLeader from "../Components/ProductPage/LinkLeader";

// ProductPage component

const ProductPage = () => {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Link breadcrumb */}
      <LinkLeader />

      {/* Main content for ProductPage */}
      <div className="product-content flex flex-col items-center p-2">
        {/* Product Detail */}
        <div className="flex justify-between items-start w-[90%]">
          {/* Left Side */}
          <div>
            {/* main Product Image */}
            <img src="" alt="" />

            {/* Multiple small images */}
            <div className="flex gap-2 mt-2">
              <img src="" alt="" className="w-20 h-20" />
              <img src="" alt="" className="w-20 h-20" />
              <img src="" alt="" className="w-20 h-20" />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col items-start gap-2">

            {/* Product Title */}
<h1>Product Name</h1>

            {/* Product Rating */}
            <div className="flex items-center">
              <span>⭐⭐⭐⭐⭐</span>
              <span className="ml-2">(100 reviews)</span>
            </div>

            {/* Product Price */}
            <p className="text-xl font-bold">$99.99</p>

            {/* Product Description */}
            <p className="text-gray-600">
              This is a brief description of the product. It highlights the key features and benefits.
            </p>

            {/* Horizontal Line */}
            <hr className="w-full my-4 text-gray-500" />

          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default ProductPage;
