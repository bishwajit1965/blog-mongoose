import { useEffect, useState } from "react";
import HeroImage from "../../assets/Bright cinematic tec.png";
import NovaJournalLogo from "/assets/favicon/nova-journal-brand.svg";
import useWordTyping from "./useWordsTyping";
import { Link } from "react-router-dom";
import { FaBlogger, FaBloggerB, FaCar, FaEnvelope } from "react-icons/fa";
import {
  LucideCalendar,
  LucideCheckCircle2,
  LucideList,
  LucideTags,
} from "lucide-react";
import BlogReadingTimeCounter from "../blogReadingTimeCounter/BlogReadingTimeCounter";
import useSystemSettings from "../../hooks/useSystemSettings";
const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const heroPhrases = [
  "Build Better Software",
  "Write Maintainable Code",
  "Design Scalable Systems",
  "Engineer for the Future",
];

const developerInfo = {
  title: "About the Developer & Nova Journal Creator",
  icon: <LucideCheckCircle2 size={16} />,
  optionTitle: "Developer's Interests",
  options: [
    "Developer Diary",
    "Software Engineering",
    "Full Stack Development",
  ],
  toolsTitle: "Tools Used in Development",
  toolsUsed: ["Production-ready React", "Node.js", "MongoDB"],
  fieldsTitle: "Developer's Working Fields",
  workingFields: ["System Design", "Debugging", "Software Architecture"],
};

const BlogHero = ({ data = [], categories, tags }) => {
  const { systemSettings } = useSystemSettings();

  // console.log("SystemSettings", systemSettings);
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
  const siteName = systemSettings?.site?.name || "Nova Journal";
  const siteDescription =
    systemSettings?.site?.description ||
    "Practical articles on software engineering, MERN development, debugging, architecture, and the lessons learned while building production-ready applications.";

  return (
    <>
      <section className="relative w-full min-h-[75vh] flex items-center text-white overflow-hidden rounded-t-xl border dark:border-gray-700">
        {/* BG IMAGE */}
        <img src={HeroImage} className="absolute w-full h-full object-cover" />
        <div className="absolute w-full h-full bg-black/60"></div>

        <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:p-12 p-">
          {/* LEFT CONTENT */}
          <div className="max-w-4xl p-4 lg:space-y-6 space-y-4">
            <div className="flex items-center lg:gap-4 gap-2">
              <img
                src={NovaJournalLogo}
                alt="Nova Journal logo"
                className="lg:h-16 h-14 w-auto rounded-xl shadow-lg shadow-indigo-500/20"
              />
              <h1 className="lg:text-6xl md:text-5xl text-2xl font-black uppercase tracking-[0.14em] text-white drop-shadow-[0_6px_30px_rgba(99,102,241,0.7)] leading-none">
                <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                  {siteName.split(" ")[0] || "Nova"}
                </span>
                <span className="ml-2 text-white">
                  {siteName.split(" ").slice(1).join(" ") || "Journal"}
                </span>
              </h1>
            </div>

            <h1 className="text-gray-300 lg:text-3xl text-lg md:text-3xl font-extrabold leading-tight drop-shadow-lg">
              <span className="uppercase">Ideas That Help You • </span>
              <span
                className={`text-indigo-400 transition-opacity duration-300 ${
                  fade ? "opacity-100" : "opacity-0"
                }`}
              >
                {heroPhrases[index]}
              </span>
            </h1>

            {/* Sub-heading */}
            <div className="lg:max-w-4xl">
              <div className="space-y-4">
                <h1 className="lg:text-xl text-medium font-extrabold uppercase text-indigo-300 border border-indigo-300/50 shadow-xl rounded-xl p-2">
                  {developerInfo?.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between lg:space-y-0 space-y-8">
                  <div className="space-y-2">
                    <h2 className="lg:text-lg text-sm uppercase text-indigo-300 border border-indigo-300/30 shadow-xl rounded-xl px-3 py-1">
                      {developerInfo?.optionTitle}
                    </h2>
                    <div className="space-y-2">
                      {developerInfo?.options.map((option, index) => (
                        <p
                          key={index}
                          className="text-indigo-300 flex items-center text-medium gap-2"
                        >
                          {developerInfo?.icon} {option}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="lg:text-lg text-sm uppercase text-indigo-300 border border-indigo-300/30 shadow-xl rounded-xl px-3 py-1">
                      {developerInfo?.toolsTitle}
                    </h2>
                    <div className="space-y-2">
                      {developerInfo?.toolsUsed.map((option, index) => (
                        <p
                          key={index}
                          className="text-indigo-300 flex items-center text-medium gap-2"
                        >
                          {developerInfo?.icon} {option}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h2 className="lg:text-lg text-sm uppercase text-indigo-300 border border-indigo-300/30 shadow-xl rounded-xl px-3 py-1">
                      {developerInfo?.fieldsTitle}
                    </h2>
                    <div className="space-y-2">
                      {developerInfo?.workingFields.map((option, index) => (
                        <p
                          key={index}
                          className="text-indigo-300 flex items-center text-medium gap-2"
                        >
                          {developerInfo?.icon} {option}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 lg:h-10 h-32 lg:text-[16px] text-medium">
              {animatedText ||
                siteDescription ||
                "Practical articles on software engineering, MERN development, debugging, architecture, and the lessons learned while building production-ready applications."}
            </p>

            {/* Developer Info */}

            <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-4">
              <div className="lg:col-span-7 col-span-12 border p-4 border-indigo-300/40 rounded-xl">
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
                          className="w-36 h-36 rounded-full object-cover bg-indigo-300 p-1 shadow-md"
                        />
                      </div>
                      <div className="space-y-4">
                        <p className="text-medium font-extrabold text-indigo-300">
                          By {blog?.author?.name || "Anonymous"}
                        </p>
                        <p className="text-medium text-indigo-300">
                          MERN Full Stack Developer
                        </p>
                        <p className="text-medium text-indigo-300 max-w-xs">
                          Writing about software engineering, system
                          architecture, debugging, and modern web development.
                        </p>
                        <p className="text-medium text-indigo-300 max-w-xs">
                          Focused on practical software engineering.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 col-span-12 border p-4 border-indigo-300/40 rounded-xl gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <FaBlogger size={18} />
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Articles
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold">
                    {data?.length > 0 ? data.length : 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <LucideList size={18} />
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Categories
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold">
                    {categories?.length > 0 ? categories.length : 0}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-1 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <LucideTags size={18} />
                    <span className="text-xs uppercase tracking-[0.2em]">
                      Tags
                    </span>
                  </div>
                  <p className="mt-2 text-xl font-bold">
                    {tags?.length > 0 ? tags.length : 0}
                  </p>
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
            <h1 className="lg:text-xl text-indigo-300 uppercase text-lg font-extrabold border border-indigo-300 rounded-xl justify-center p-2 flex items-center gap-2">
              <FaBloggerB /> Latest Articles
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
    </>
  );
};

export default BlogHero;
