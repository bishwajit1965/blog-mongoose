import { useEffect, useState } from "react";
import useWordTyping from "./useWordsTyping";
import { Link } from "react-router-dom";
import {
  FaBlogger,
  FaBloggerB,
  FaCar,
  FaEnvelope,
  FaSearch,
} from "react-icons/fa";
import {
  LucideCalendar,
  LucideList,
  LucideRotateCcw,
  LucideTags,
} from "lucide-react";
import BlogReadingTimeCounter from "../blogReadingTimeCounter/BlogReadingTimeCounter";
import useLastSeenFormatter from "../../hooks/useLastSeenFormatter";
import Button from "../buttons/Button";
import { LucideIcon } from "../lucideIcon/LucideIcons";
import HeroSkeleton from "./HeroSkeleton";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const heroPhrases = [
  "Build Better Software",
  "Write Maintainable Code",
  "Design Scalable Systems",
  "Engineer for the Future",
];

const BlogHero = ({
  data = [],
  categories,
  tags,
  systemSettings,
  globalSearchQuery,
  setGlobalSearchQuery,
  globalSearchQueryResetHandler,
  onGlobalSearchSubmit,
}) => {
  const logo =
    systemSettings?.branding?.logo?.secureUrl ||
    "https://i.ibb.co.com/YFjLMfQv/nova-journal-brand.jpg";

  const blogAuthor = data?.slice(0, 1)?.map((blog) => {
    return blog?.author?.lastSeen;
  });

  const formattedLastSeen = useLastSeenFormatter(blogAuthor);

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const text =
    "Practical articles on software engineering, MERN development, debugging, architecture, and the lessons learned while building production-ready web applications.";

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
      <section className="relative w-full min-h-[85vh] flex items-center text-white overflow-hidden rounded-t-xl bg-slate-900 dark:bg-slate-800/30">
        <div className="absolute w-full h-full bg-slate-950"></div>

        <div className="relative w-full flex flex-col md:flex-row items-center justify-between gap-10 lg:px-28 py-4">
          {/* LEFT CONTENT */}
          <div className="max-w-4xl p-4 lg:space-y-5 space-y-3">
            <div className="flex items-center lg:gap-4 gap-2">
              <img
                src={logo}
                alt={systemSettings?.site?.name || "Nova Journal Logo"}
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

            <div className="space-y-8">
              <h1 className="text-gray-300 lg:text-2xl text-lg md:text-3xl font-extrabold leading-tight drop-shadow-lg max-w-xl">
                <span className="uppercase">Ideas That Help • </span>
                <span
                  className={`text-indigo-400 transition-opacity duration-300 ${
                    fade ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {heroPhrases[index]}
                </span>
              </h1>

              <p className="text-indigo-300 max-w-xl lg:h-20 h-36 lg:text-normal text-normal">
                {animatedText ||
                  siteDescription ||
                  "Practical articles on software engineering, MERN development, debugging, architecture, and the lessons learned while building production-ready applications."}
              </p>
            </div>

            {/* Developer Info */}

            <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-2">
              <div className="lg:col-span-7 col-span-12 border p-4 border-indigo-300/40 rounded-xl">
                <div className="flex lg:justify-start justify-center items-center gap-4">
                  {data?.slice(0, 1).map((blog) => (
                    <div
                      key={blog?._id}
                      className="lg:flex grid items-center gap-2"
                    >
                      <div className="lg:flex grid lg:justify-start justify-center gap-2">
                        <div className="space-y-2">
                          <div className="flex lg:justify-start mx-auto">
                            <img
                              src={blog?.author?.avatar}
                              alt={blog?.author?.name}
                              className="lg:w-20 lg:h-20 w-16 h-16 rounded-full flex bg-gray-400 p-1 lg:justify-start mx-auto justify-center shadow-md"
                            />
                          </div>

                          {/* Author online status */}
                          <p className="flex items-center lg:justify-start justify-center text-xs">
                            {blog?.author?.isOnline === true ? (
                              <span className="text-emerald-400 font-bo1d border-2 animate-pulse border-emerald-400 rounded-full px-1 py-0.5 text-xs">
                                🟢 Online Now
                              </span>
                            ) : (
                              <span>
                                <span className="text-orange-400 border-2 border-orange-400 text-xs rounded-full px-1 py-0.5 block mb-[1px]">
                                  🔴 Offline Now
                                </span>
                                <span className="block text-xs text-orange-400">
                                  Last seen {formattedLastSeen}
                                </span>
                              </span>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="lg:space-y-2 space-y-1 lg:text-start text-center">
                        <p className="lg:text-xl text-lg font-extrabold text-indigo-300">
                          By {blog?.author?.name || "Anonymous"}
                        </p>
                        <p className="text-lg text-indigo-300">
                          <span className="font-bold text-orange-400">
                            MERN
                          </span>{" "}
                          Full Stack Developer
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-5 col-span-12 border p-4 border-indigo-300/40 rounded-xl gap-4 space-y-3 max-w-4xl">
                <div className="rounded-lg border border-white/10 bg-white/5 px-2 py- backdrop-blur-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <FaBlogger size={14} />
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">
                      Articles
                    </span>
                  </div>
                  <p className="text-lg font-bold">
                    {data?.length > 0 ? data.length : 0}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 px-2 py- backdrop-blur-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <LucideList size={14} />
                    <span className="text-sm font-bold uppercase tracking-[0.2em]">
                      Categories
                    </span>
                  </div>
                  <p className="text-lg font-bold">
                    {categories?.length > 0 ? categories.length : 0}
                  </p>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/5 px-2 py- backdrop-blur-sm flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-indigo-300">
                    <LucideTags size={14} />
                    <span className="text-sm font-bold uppercase tracking-[0.2em]]">
                      Tags
                    </span>
                  </div>
                  <p className="text-lg font-bold">
                    {tags?.length > 0 ? tags.length : 0}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}

            <div className="flex items-center justify-between gap-8 flex-wrap">
              <div className="flex items-center gap-8">
                {/* Coming Soon Button */}
                <Link to="/blog-coming-soon" className="m-0">
                  <button className="lg:px-4 lg:py-3 px-1 py-1 border border-white/50 bg-indigo-500 hover:bg-indigo-600 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg">
                    <span className="flex items-center gap-1">
                      <FaCar size={20} /> Coming Soon
                    </span>
                  </button>
                </Link>

                {/* About Me Button */}
                <Link to="/contact-me" className="m-0">
                  <button className="lg:px-4 lg:py-3 px-1 py-1 border border-white/50 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition transform hover:scale-105">
                    <span className="flex items-center gap-1">
                      <FaEnvelope size={20} /> About Me
                    </span>
                  </button>
                </Link>
              </div>

              {/* Search Area */}

              <div className="flex justify-end">
                <form onSubmit={onGlobalSearchSubmit}>
                  <div className="flex items-center flex-wrap gap-4 justify-end">
                    <div className="relative">
                      <input
                        type="text"
                        value={globalSearchQuery}
                        onChange={(e) => setGlobalSearchQuery(e.target.value)}
                        placeholder="Search term..."
                        className="bg-white/15 border border-white/15 text-gray-200 cursor-pointer input input-md py- input-xl w-72 pl-10"
                      />
                      <div className="absolute left-4 top-4">
                        <FaSearch size={20} className="text-gray-400" />
                      </div>
                    </div>
                    {globalSearchQuery && (
                      <Button
                        type="button"
                        onClick={globalSearchQueryResetHandler}
                        size="lg"
                        icon={<LucideRotateCcw />}
                        variant="success"
                        label="Reset"
                        className="rounded-md lg:w-24 w-full"
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* RIGHT PREMIUM CARDS */}
          {data?.length > 0 ? (
            <div className="hidden md:flex flex-col gap-6 p-4">
              <h1 className="lg:text-xl text-indigo-300 uppercase text-lg font-extrabold flex items-center gap-2">
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
                    className="max-w-xs bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl hover:scale-105 transition duration-300 rounded-t-xl"
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
                    <div className="p-2 space-y-1 rounded-b-xl">
                      <h3 className="font-semibold text-sm text-white line-clamp-2">
                        {blog.title}
                      </h3>

                      <div className="flex items-center gap-2">
                        <img
                          src={blog?.author?.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <p className="text-sm text-white">
                          {blog?.author?.name || "Anonymous"}
                        </p>
                      </div>

                      <p className="flex items-center gap-1 text-xs">
                        Read in 👉
                        <span>
                          <LucideIcon.Clock3 size={14} />
                        </span>
                        <span className="italic">
                          {<BlogReadingTimeCounter content={blog?.content} />}
                        </span>
                      </p>
                      <p className="flex items-center gap-1 text-xs">
                        Published 👉
                        <LucideCalendar size={14} />
                        {new Date(blog?.publishAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <HeroSkeleton />
          )}
        </div>
      </section>
    </>
  );
};

export default BlogHero;
