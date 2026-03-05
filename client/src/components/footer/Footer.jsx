import { Link } from "react-router-dom";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-200 py-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-">
        <p>© {currentYear} Bishwajit Paul. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/about-me" className="m-0">
            About Me
          </Link>
          <Link to="/contact-me" className="m-0">
            Contact Me
          </Link>
        </div>
        <div className="">
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
