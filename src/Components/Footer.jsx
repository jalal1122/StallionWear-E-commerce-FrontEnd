import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Newsletter Section */}
      <div className="relative">
        <div className="container mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-1 shadow-2xl">
            <div className="bg-gray-900 rounded-[22px] p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                    Stay Up to Date About Our Latest Offers
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Get exclusive deals, new arrivals, and fashion tips
                    delivered to your inbox.
                  </p>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-auto lg:min-w-[400px]">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                    <div className="relative bg-white rounded-full flex items-center px-6 py-3 shadow-xl">
                      <FaEnvelope className="text-gray-400 mr-3" />
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="flex-1 outline-none text-gray-800 bg-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  <button className="relative group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2">
                    <FaPaperPlane className="transition-transform duration-300 group-hover:translate-x-1" />
                    Subscribe to Newsletter
                    <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="group cursor-pointer mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-300 group-hover:to-pink-300 transition-all duration-300">
                STALLION WEAR
              </h1>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"></div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              We have clothes that suit your style and make you feel confident—
              from casual to classy. Discover fashion that speaks to your
              personality.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt size={14} />
                </div>
                <span>123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FaPhone size={14} />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                  <FaEnvelope size={14} />
                </div>
                <span>contact@stallionwear.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-4">
              {[
                {
                  icon: FaLinkedin,
                  href: "https://www.linkedin.com/in/mjdevstudio/",
                  color: "from-blue-600 to-blue-400",
                  hoverColor: "hover:from-blue-500 hover:to-blue-300",
                },
                {
                  icon: FaInstagram,
                  href: "https://www.instagram.com/jalalkhan2084/",
                  color: "from-pink-600 to-purple-400",
                  hoverColor: "hover:from-pink-500 hover:to-purple-300",
                },
                {
                  icon: FaGithub,
                  href: "https://github.com/jalal1122",
                  color: "from-gray-600 to-gray-400",
                  hoverColor: "hover:from-gray-500 hover:to-gray-300",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-12 shadow-lg hover:shadow-xl`}
                >
                  <social.icon size={18} className="text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Company",
              links: ["About", "Features", "Works", "Career"],
            },
            {
              title: "Help",
              links: [
                "Customer Support",
                "Delivery Details",
                "Terms & Conditions",
                "Privacy Policy",
              ],
            },
            {
              title: "FAQ",
              links: ["Account", "Manage Deliveries", "Orders", "Payments"],
            },
            {
              title: "Resources",
              links: [
                "Free eBooks",
                "Development Tutorials",
                "How to - Blog",
                "YouTube Playlist",
              ],
            },
          ].map((column, index) => (
            <div key={index} className="group">
              <h3 className="font-bold text-xl mb-6 text-white group-hover:text-blue-400 transition-colors duration-300">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-all duration-300 relative group/item text-lg"
                    >
                      <span className="relative z-10">{link}</span>
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover/item:w-full transition-all duration-300"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="relative border-t border-gray-700">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-gray-300">
              <span>© Stallion Wear 2025. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="text-sm">Made with</span>
              <FaHeart className="text-red-500 animate-pulse" size={14} />
              <span className="text-sm">by MJ Dev Studio</span>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <span>•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <span>•</span>
                <a
                  href="#"
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookies
                </a>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
              >
                <FaArrowUp
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-16 h-16 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </footer>
  );
};

export default Footer;
