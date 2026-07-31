import { useEffect, useState } from "react";
import HeroImage from "../../assets/Bright cinematic tec.png";
import useWordTyping from "./useWordsTyping";
import { Link } from "react-router-dom";
import { FaBlogger, FaCar, FaEnvelope } from "react-icons/fa";
import { LucideCalendar, LucideList, LucideTags } from "lucide-react";
import BlogReadingTimeCounter from "../blogReadingTimeCounter/BlogReadingTimeCounter";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const heroPhrases = [
  "Build Better Software",
  "Write Maintainable Code",
  "Design Scalable Systems",
  "Engineer for the Future",
];

const BlogHero = ({ data = [], categories, tags }) => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const text =
    "Practical articles on software engineering, MERN development, debugging, architecture, and the lessons learned while building production-ready applications.";

  const animatedText = useWordTyping(text, 250, 2000);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % heroPhrases.length);
        setFade(true);
      }, 200);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] flex items-center text-white overflow-hidden rounded-t-xl border dark:border-gray-700">
      {/* BG IMAGE */}
      <img src={HeroImage} className="absolute w-full h-full object-cover" />
      <div className="absolute w-full h-full bg-black/60"></div>

      <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:p-6 p-2">
        {/* LEFT CONTENT */}
        <div className="max-w-4xl p-4 lg:space-y-6 space-y-4">
          {/* Heading / Title */}
          <h1 className="lg:text-6xl text-xl font-extrabold uppercase">
            Nova Journal
          </h1>

          {/* Sub-heading */}
          <div className="lg:max-w-2xl">
            <h3 className="lg:text-xl font-bold">
              Developer Diary • Software Engineering • Full Stack Development
            </h3>
          </div>
          <div className="lg:max-w-2xl">
            <h3 className="lg:text-xl font-bold">
              Production-ready React • Node.js • MongoDB
            </h3>
          </div>
          <div className="lg:max-w-2xl">
            <h3 className="lg:text-xl font-bold">
              System Design • Debugging • Software Architecture
            </h3>
          </div>

          <h1 className="lg:text-4xl text-lg md:text-4xl font-extrabold leading-tight drop-shadow-lg">
            Ideas That Help You •{" "}
            <span
              className={`text-indigo-400 transition-opacity duration-300 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {heroPhrases[index]}
            </span>
          </h1>

          <p className="lg:h-10 h-32 text-base-100 lg:text-[16px] text-medium/10">
            {animatedText}
          </p>

          {/* Developer Info */}

          <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-4">
            <div className="lg:col-span-7 col-span-12 border p-4 border-gray-500 rounded-xl">
              <div className="flex items-center gap-4">
                {data?.slice(0, 1).map((blog) => (
                  <div
                    key={blog?._id}
                    className="lg:flex grid items-center gap-4"
                  >
                    <div className="flex lg:justify-start justify-center">
                      <img
                        src={blog?.author?.avatar}
                        alt={blog?.author?.name}
                        className="w-32 h-32 rounded-full object-cover bg-gray-400 p-1 shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-white">
                        By {blog?.author?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-white">
                        MERN Full Stack Developer
                      </p>
                      <p className="text-sm text-white max-w-xs">
                        Writing about software engineering, system architecture,
                        debugging, and modern web development.
                      </p>
                      <p className="text-sm text-white max-w-xs">
                        Focused on practical software engineering.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 col-span-12 border p-4 border-gray-500 rounded-xl gap-4">
              <div className="space-y-4">
                <div className="">
                  <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2">
                    <FaBlogger size={30} />{" "}
                    {data?.length > 0 ? data?.length : 0} Articles
                  </h2>
                </div>
                <div className="">
                  <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2">
                    <LucideList size={30} />{" "}
                    {categories?.length > 0 ? categories?.length : 0} Categories
                  </h2>
                </div>
                <div className="">
                  <h2 className="lg:text-3xl text-lg font-bold flex items-center gap-2">
                    {" "}
                    <LucideTags size={30} />{" "}
                    {tags?.length > 0 ? tags?.length : 0} Tags
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}

          <div className="flex gap-8 flex-wrap">
            <Link to="/blog-coming-soon" className="m-0">
              <button className="lg:px-4 lg:py-3 px-1 py-1 border border-white/50 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
                <span className="flex items-center gap-1">
                  <FaCar size={20} /> Coming Soon
                </span>
              </button>
            </Link>

            <Link to="/contact-me" className="m-0">
              <button className="lg:px-4 lg:py-3 px-1 py-1 border border-white/50 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition transform hover:scale-105">
                <span className="flex items-center gap-1">
                  <FaEnvelope size={20} /> About Me
                </span>
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT PREMIUM CARDS */}
        <div className="hidden md:flex flex-col gap-5 p-4">
          <h1 className="lg:text-3xl text-lg font-extrabold">
            Latest Articles
          </h1>
          {data?.slice(0, 2).map((blog) => (
            <Link
              to={`/blog-details/${blog.slug}`}
              key={blog._id}
              className="m-0"
            >
              <div
                key={blog._id}
                className="w-[280px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl hover:scale-105 transition duration-300 rounded-t-xl"
              >
                <img
                  src={
                    blog?.image?.url
                      ? blog?.image.url
                      : `${apiURL}${blog?.image}`
                  }
                  alt={blog?.slug}
                  className="w-full h-32 object-fill rounded-t-xl"
                />
                <div className="p-2 space-y-2 rounded-b-lg">
                  <h3 className="font-semibold text-white line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="flex items-center gap-1">
                    <span>Read in:</span>
                    <span className="italic">
                      {<BlogReadingTimeCounter content={blog?.content} />}
                    </span>
                  </p>
                  <p className="flex items-center gap-1">
                    {" "}
                    <LucideCalendar size={14} />
                    {new Date(blog?.publishAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  <div className="flex items-center gap-2">
                    <img
                      src={blog?.author?.avatar}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-sm text-white">
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
