import { Link } from "react-router-dom";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white">Bishwajit Paul</h3>

            <p className="text-sm leading-relaxed text-gray-400">
              A developer diary sharing software engineering thoughts,
              development experiences, architectural decisions, and lessons
              learned while building real-world applications.
            </p>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="hover:text-indigo-400 transition-colors">
                Home
              </Link>

              <Link
                to="/blog-posts"
                className="hover:text-indigo-400 transition-colors"
              >
                Articles
              </Link>

              <Link
                to="/about-me"
                className="hover:text-indigo-400 transition-colors"
              >
                About Me
              </Link>

              <Link
                to="/contact-me"
                className="hover:text-indigo-400 transition-colors"
              >
                Contact
              </Link>

              <Link
                to="/terms-conditions"
                className="hover:text-indigo-400 transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>

            <SocialMediaLinks />

            <p className="text-xs text-gray-500 mt-4">
              Built with React, Node.js, MongoDB, and modern web technologies.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-400">
          © {currentYear} Bishwajit Paul. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
