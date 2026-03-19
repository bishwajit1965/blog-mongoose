import { useEffect, useState } from "react";
import HeroImage from "../../assets/Bright cinematic tec.png";
import useWordTyping from "./useWordsTyping";
import { Link } from "react-router-dom";
import { FaCar, FaEnvelope } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const words = ["Inspire", "Connect", "Challenge", "Grow", "Enrich"];

const BlogHero = ({ data = [] }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const text =
    "Dive into ideas, experiences, and perspectives that enrich your thinking and challenge your perspective.";

  const animatedText = useWordTyping(text, 250, 2000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] flex items-center text-white overflow-hidden rounded-t-xl">
      {/* BG IMAGE */}
      <img src={HeroImage} className="absolute w-full h-full object-cover" />
      <div className="absolute w-full h-full bg-black/40"></div>

      <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT CONTENT */}
        <div className="max-w-4xl p-4 space-y-6">
          {/* Heading / Title */}
          <h1 className="lg:text-6xl font-extrabold">Nova Blogging Platform</h1>
          {/* Sub-heading */}
          <div className="lg:max-w-lg">
            <h3 className="lg:text-xl font-bold">
              Full-Stack Admin Dashboard with Moderation & Role-Based Access
            </h3>
          </div>
          <h1 className="lg:text-4xl text-lg md:text-4xl font-extrabold leading-tight drop-shadow-lg">
            Stories That{" "}
            <span
              className={`text-indigo-400 transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {words[index]}
            </span>
          </h1>

          <p className="h-10 text-base-100 lg:text-[16px] text-xs">
            {animatedText}
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link to="/blog-coming-soon" className="m-0">
              <button className="px-4 py-3 border border-white/50 bg-indigo-500 hover:bg-indigo-600 rounded-xl font-semibold transition transform hover:scale-105 shadow-lg">
                <span className="flex items-center gap-1">
                  <FaCar size={20} /> Coming Soon
                </span>
              </button>
            </Link>

            <Link to="/contact-me" className="m-0">
              <button className="px-4 py-3 border border-white/50 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold transition transform hover:scale-105">
                <span className="flex items-center gap-1">
                  <FaEnvelope size={20} /> Contact Me
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT PREMIUM CARDS */}
        <div className="hidden md:flex flex-col gap-5 p-4">
          {data?.slice(0, 2).map((blog) => (
            <Link
              to={`/blog-details/${blog.slug}`}
              key={blog._id}
              className="m-0"
            >
              <div
                key={blog._id}
                className="w-[280px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl hover:scale-105 transition duration-300"
              >
                <img
                  src={`${apiURL}${blog?.image}`}
                  alt=""
                  className="w-full h-32 object-fill rounded-t-lg"
                />
                <div className="p-2 space-y-2">
                  <h3 className="mt- font-semibold text-white line-clamp-2">
                    {blog.title}
                  </h3>

                  <div className="flex items-center gap-2">
                    <img
                      src={blog?.author?.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-sm text-gray-300">
                      Author : {blog?.author?.name || "Anonymous"}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogHero;
