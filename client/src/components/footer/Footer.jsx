import { Link } from "react-router-dom";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-2 md:px-8 lg:gap-4 gap-2 md:gap-0">
        <p>© {currentYear} Bishwajit Paul. All rights reserved.</p>
        <div className="flex items-center lg:gap-4 gap-2 lg:text-normal text-sm">
          <Link
            to="/about-me"
            className="hover:text-indigo-400 transition-colors duration-200 m-0"
          >
            About Me
          </Link>
          <lg:Link
            grid
            to="/contact-me"
            className="hover:text-indigo-400 transition-colors duration-200 m-0"
          >
            Contact Me
          </lg:Link>
          <Link
            to="/terms-conditions"
            className="hover:text-indigo-400 transition-colors duration-200 m-0"
          >
            Terms & Conditions
          </Link>
        </div>
        <div className="flex gap-3">
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
