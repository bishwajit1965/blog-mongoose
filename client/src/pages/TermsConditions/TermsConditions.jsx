import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import PageTitle from "../../components/pageTitle/PageTitle";
import {
  Shield,
  FileText,
  User,
  AlertTriangle,
  RefreshCcw,
  Scale,
  Ban,
  Gavel,
} from "lucide-react";

const TermsConditions = () => {
  const sections = [
    {
      title: "Use of the Platform",
      text: "You agree not to post harmful, illegal, or abusive content. Misuse may result in account suspension.",
      icon: <Shield size={18} />,
    },
    {
      title: "User Content",
      text: "You are responsible for your content. By posting, you allow us to display and distribute it.",
      icon: <FileText size={18} />,
    },
    {
      title: "Intellectual Property",
      text: "All platform design and non-user content are owned and protected by applicable laws.",
      icon: <Scale size={18} />,
    },
    {
      title: "Account Responsibility",
      text: "You are responsible for maintaining the security of your account and credentials.",
      icon: <User size={18} />,
    },
    {
      title: "Moderation",
      text: "We may remove content or suspend accounts that violate these terms.",
      icon: <Ban size={18} />,
    },
    {
      title: "Changes to Terms",
      text: "We may update these terms at any time. Continued use means acceptance.",
      icon: <RefreshCcw size={18} />,
    },
    {
      title: "Disclaimer",
      text: "The platform is provided 'as is' without warranties of any kind.",
      icon: <AlertTriangle size={18} />,
    },
    {
      title: "Limitation of Liability",
      text: "We are not liable for any damages resulting from the use of this platform.",
      icon: <Gavel size={18} />,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      {/* PAGE TITLE */}
      <PageTitle
        title="Terms &"
        decoratedText="Conditions"
        slogan="Clear rules. Safe space. Better experience."
        navigationLink="register"
        navigationArea="Start Writing"
      />

      {/* HERO STRIP */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl md:text-2xl font-bold">Your trust matters.</h2>
          <p className="text-sm md:text-base mt-2 opacity-90">
            These terms ensure a safe, respectful, and high-quality experience
            for everyone using the platform.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 md:p-10 space-y-8">
          {/* LAST UPDATED */}
          <p className="text-sm text-gray-400">Last updated: March 2026</p>

          {/* INTRO */}
          <p className="text-gray-700 leading-relaxed">
            By accessing or using this platform, you agree to be bound by these
            Terms and Conditions. If you do not agree, please discontinue use
            immediately.
          </p>

          {/* SECTIONS */}
          {sections.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 border-l-4 border-indigo-500 pl-4"
            >
              <div className="text-indigo-500 mt-1">{item.icon}</div>

              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {index + 1}. {item.title}
                </h3>
                <p className="text-gray-600 mt-1">{item.text}</p>
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center pt-6">
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-semibold transition shadow-md"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsConditions;
