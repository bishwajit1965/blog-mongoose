import { Link } from "react-router-dom";
import SocialMediaLinks from "../socialMediaLinks/SocialMediaLinks";
import { LucideRss } from "lucide-react";
import { LucideIcon } from "../lucideIcon/LucideIcons";

const Footer = ({ systemSettings }) => {
  const settings = systemSettings?.data?.branding || {};
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-white flex items-center gap-1">
              <LucideIcon.UserCircle size={16} /> Bishwajit Paul
            </h3>
            <p className="flex items-center gap-1 text-sm">
              <LucideIcon.Mail size={16} />
              {systemSettings?.data?.contact?.email}
            </p>
            <address className="flex items-center gap-1 text-sm">
              <LucideIcon.FaAddressBook size={16} />{" "}
              {systemSettings?.data?.contact?.address}
            </address>
            <p className="text-sm leading-relaxed text-gray-400">
              A developer diary sharing software engineering thoughts,
              development experiences, architectural decisions, and lessons
              learned while building real-world applications.
            </p>
            <img
              src={settings?.logo?.secureUrl}
              alt={settings?.site?.name}
              className="w-28 h-28 object-cover"
            />
          </div>

          {/* Navigation Section */}
          <div className="grid grid-cols-2 gap-8">
            {/* Company */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Company</h4>

              <div className="flex flex-col gap-2 text-sm">
                <Link to="/" className="hover:text-indigo-400">
                  Home
                </Link>
                <Link to="/about-me" className="hover:text-indigo-400">
                  About
                </Link>
                <Link to="/contact-me" className="hover:text-indigo-400">
                  Contact
                </Link>
                <Link to="/blog-posts" className="hover:text-indigo-400">
                  Articles
                </Link>
                <Link to="/blog-coming-soon" className="hover:text-indigo-400">
                  Coming Soon
                </Link>
                <Link to="/rss" className="hover:text-indigo-400">
                  RSS Feed
                </Link>
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Legal</h4>

              <div className="flex flex-col gap-2 text-sm">
                <Link to="/privacy-policy" className="hover:text-indigo-400">
                  Privacy Policy
                </Link>

                <Link to="/terms-conditions" className="hover:text-indigo-400">
                  Terms & Conditions
                </Link>

                <Link to="/cookie-policy" className="hover:text-indigo-400">
                  Cookie Policy
                </Link>

                <Link to="/disclaimer" className="hover:text-indigo-400">
                  Disclaimer
                </Link>

                <Link to="/editorial-policy" className="hover:text-indigo-400">
                  Editorial Policy
                </Link>

                <Link to="/dmca-policy" className="hover:text-indigo-400">
                  DMCA Policy
                </Link>

                <Link to="/licensing" className="hover:text-indigo-400">
                  Licensing
                </Link>
              </div>
            </div>
          </div>

          {/* Social Section */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Connect</h4>
            <div className="flex items-center lg:gap-4">
              <SocialMediaLinks />
              <Link
                to="http://localhost:3000/api/blogs/rss"
                className="flex items-center gap-"
              >
                <LucideRss className="text-amber-500 font-bold w-6 h-6" />
              </Link>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Built with React, Node.js, MongoDB, and modern web technologies.
            </p>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-5 text-center text-sm text-gray-400">
          &copy; {currentYear} {systemSettings?.data?.branding?.footerText}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
