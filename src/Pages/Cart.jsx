import Header from "../Components/Header/Header";
import Footer from "../Components/Footer"
import Jacket from "../Images/J12.jpg"
import { FaTrash } from "react-icons/fa6";

const Cart = () => {
  return (
    <>
      {/* Headrer */}
        <Header />
        {/* Cart */}
        <div className="ml-5 mt-3">
            <a href="/">Home  </a>
            >
            <span>  Cart</span>
        </div>
        <div className='cart-container m-4'>
            <h1 className="text-3xl font-bold sm:text-5xl text-black text-center">
                YOUR CART
            </h1>
            <div className="flex flex-col lg:flex-row w-[95%] items-center lg:items-start mx-auto mt-10">
                {/* Right-Side */}
                <div className="cart-items flex flex-col justify-center items-center gap-5 p-5 m-2 border-2 border-[#f0f0f0] rounded-lg w-full lg:w-2/3">
                    <div className="cart-item flex flex-col sm:flex-row justify-center items-center bg-white gap-5 p-5 m-2 border-2 border- [#f0f0f0] rounded-lg w-full shadow-md">
                        {/* Image */}
                        <div className="image w-fit h-fit flex items-center justify-center p-2 shadow-lg rounded-lg">
                            <img src={Jacket} alt="J-P" className=" aspect-auto w-60 rounded-lg"/>
                        </div>
                        {/* Product-Details */}
                        <div className="details flex flex-col gap-5 w-full justify-center">
                            <div className="title flex flex-col gap-3">
                                <h3 className="font-bold text-2xl text--black">TACVASEN Men's Bomber Jacket Lightweight Casual Spring Fall Windbreaker Zip Up Coat with Pocket</h3>
                                <p className="text-lg text-black font-semibold">
                                    Size : Medium
                                </p>
                            </div>
                            <div className="flex justify-between items-center gap-3 ">
                                <h2 className="font-bold text-black text-2xl">$33.99</h2>
                                <div className="quantity flex justify-center items-center bg-[#f0f0f0] gap-5 rounded-full px-3 py-1">
                                   <button className="decrease-quantity text-xl sm:text-2xl rounded-full hover:cursor-pointer hover:bg-gray-300"> - </button>
                                   <span className="p-quntity font-bold sm:text-lg text-md"> 1 </span>
                                   <button className="decrease-quantity text-xl sm:text-2xl rounded-full hover:cursor-pointer hover:bg-gray-300"> + </button>
                                </div>
                            </div>
                            {/* Delete-Button */}
                            <div className="delete-product flex justify-center items-center">
                                <button className="flex justify-center items-center bg-black text-white px-4 py-2 w-3/4 rounded-full hover:cursor-pointer hover:bg-red-600 active:scale-95">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>                   
                    </div>                
                </div>

                {/* Left-SIde */}
                <div className="cart-summary flex flex-col justify-center items-center gap-5 p-5 m-2 border-2 border-[#f0f0f0] rounded-lg w-full md:w-1/3">
                   <h2 className="text-3xl font-bold text-black">Order Summary</h2>

                   <div className="subTotal flex justify-between items-center w-2/3 lg:w-full gap-5">
                       <p>Subtotal</p>
                       <p className="font-bold text-lg">$33.99</p>
                   </div>
                   <div className="discount flex justify-between items-center w-2/3 lg:w-full gap-5">
                       <p>Discount</p>
                       <p className="font-bold text-lg">$0</p>
                   </div>
                   <div className="Ship-fee flex justify-between items-center w-2/3 lg:w-full gap-5">
                       <p>Shipping Fee</p>
                       <p className="font-bold text-lg">$15</p>
                   </div>
                   <div className="line h-[1px] w-full bg-[#f0f0f0] "></div>
                   {/* Total Amont */}
                   <div className="total flex justify-between items-center w-2/3 lg:w-full gap-5">
                       <p className="font-bold text-lg">Total</p>
                       <p className="font-bold text-lg">$48.99</p>
                   </div>
                   {/* Checkout Button */}
                   <div className="chechout-button flex justify-between items-center w-1/3">
                      <button className="bg-black w-full text-white active:scale-95 px-5 py-2 rounded-full hover:cursor-pointer">
                        Checkout
                        </button>
                   </div>
                </div>
            </div>
        </div>
        {/* Footer */}
        <Footer />
         
    </>
  )
}

export default Cart