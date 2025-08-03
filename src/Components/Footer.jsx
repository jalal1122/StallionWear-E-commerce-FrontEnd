import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaGithub
} from "react-icons/fa";

const Footer = () => {
    
  return (
    <footer className=" Footer-Container bg-white">
      {/* Newsletter Section */}
      <div className="bg-black flex gap-5 text-white py-6 px-6 ml-30 rounded-xl lg:w-[80%]">
        <h2 className="text-5xl font-bold text-center mb-4">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-row md:flex-col items-center justify-center gap-4">
          <div className="bg-white flex items-center rounded-full px-4 py-2 w-full md:w-[400px]">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full outline-none text-black bg-transparent"
            />
          </div>
          <button className="bg-white w-full text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 cursor-pointer ">
            Subscribe to Newsletter
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-6 md:px-20 py-12 text-black grid gap-10 md:grid-cols-5">
        {/* Brand Info */}
        <div className="col-span-1">
          <h1 className="text-2xl font-bold mb-3 hover:cursor-pointer">STALLION WEAR</h1>
          <p className="text-sm text-black">
            We have clothes that suit your style and make you feel confident—
            from casual to classy.
          </p>
         <div className="flex gap-4 mt-4 text-xl">
  <a
    href="https://twitter.com/stallionwear"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-500 transition"
  >
    <FaTwitter />
  </a>
  <a
    href="https://instagram.com/stallionwear"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500 transition"
  >
    <FaInstagram />
  </a>
  <a
    href="https://facebook.com/stallionwear"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-blue-700 transition"
  >
    <FaFacebookF />
  </a>
  <a
    href="https://github.com/anisriaz88/StallionWear-E-commerce-FrontEnd"
    target=""
    rel="noopener noreferrer"
    className="hover:text-gray-700 transition"
  >
    <FaGithub />
  </a>
</div>

        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold mb-3">Company</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>About</li>
            <li>Features</li>
            <li>Works</li>
            <li>Career</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Help</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>Customer Support</li>
            <li>Delivery Details</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">FAQ</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>Account</li>
            <li>Manage Deliveries</li>
            <li>Orders</li>
            <li>Payments</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-black">
            <li>Free eBooks</li>
            <li>Development Tutorials</li>
            <li>How to - Blog</li>
            <li>YouTube Playlist</li>
          </ul>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t py-6 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© Stallion Wear 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
