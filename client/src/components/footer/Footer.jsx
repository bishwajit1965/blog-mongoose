import { Link } from "react-router-dom";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-4 md:px-8 gap-4 md:gap-0">
        <p>© {currentYear} Bishwajit Paul. All rights reserved.</p>
        <div className="flex gap-4">
          <Link
            to="/about-me"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            About Me
          </Link>
          <Link
            to="/contact-me"
            className="hover:text-indigo-400 transition-colors duration-200"
          >
            Contact Me
          </Link>
          <Link
            to="/terms-conditions"
            className="hover:text-indigo-400 transition-colors duration-200"
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
