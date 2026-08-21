import {
  FaBloggerB,
  FaRegBookmark,
  FaRegListAlt,
  FaSearch,
} from "react-icons/fa";
import { Suspense, lazy } from "react";

import Button from "../../components/buttons/Button";
import Categories from "../../components/categories/Categories";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import Marquee from "react-fast-marquee";
import MarqueeNotification from "../../components/marqueeNotification/MarqueeNotification";
import OlderBlogPosts from "../blogPosts/OlderBlogPosts";
import RandomBlogPosts from "../blogPosts/RandomBlogPosts";
import ScrollProgressBar from "../../components/scrollProgressBar/ScrollProgressBar";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import Tags from "../../components/tags/Tags";
import useAuth from "../../hooks/useAuth";
import useGetBlogs from "../../hooks/useGetBlogs";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";
import useGetCategories from "../../hooks/useGetCategories";
import useGetFeaturedBlogs from "../../hooks/useGetFeaturedBlogs";
import useGetTags from "../../hooks/useGetTags";
import { useState } from "react";
import PopularPosts from "../../components/popularPosts/PopularPosts";
import BlogHero from "../../components/blogHero/BlogHero";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import { motion } from "framer-motion";
import Seo from "../../components/seo/Seo";
import useSystemSettings from "../../hooks/useSystemSettings";
import FeaturedPosts from "../../components/featuredPosts/FeaturedPosts";
import BlogGlobalSearchResults from "../blogPosts/BlogGlobalSearchResults";
import { LucideIcon } from "../../components/lucideIcon/LucideIcons";

const sectionMotion = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const sidebarMotion = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const BookmarkedSection = lazy(
  () => import("../../components/bookmarkSection/BookmarkSection"),
);
const BlogPostsSection = lazy(() => import("../blogPosts/BlogPosts"));

const Home = () => {
  const [loading, setLoading] = useState(false);
  const { systemSettings } = useSystemSettings();
  const { user } = useAuth();
  const [width, setWidth] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showBlogPosts, setShowBlogPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");
  const { data, isLoading, error } = useGetBlogs();
  const { data: featuredPosts = [], isLoading: isFeaturedLoading } =
    useGetFeaturedBlogs();
  const { data: bookmarkedPosts } = useGetBookmarkedPosts();
  const isFilterActive = selectedTag || selectedCategory;

  const {
    data: categories,
    isLoading: isCategoryLoading,
    error: isError,
  } = useGetCategories();

  const {
    data: tags,
    isLoading: isTagLoading,
    error: isTagError,
  } = useGetTags();

  const { data: comingSoon } = useGetComingSoonPost();

  const handleToggle = () => {
    setShowBookmarks((prev) => !prev);
    setShowBlogPosts((prev) => !prev);
  };

  const handleSetWidth = () => {
    setWidth((prev) => !prev);
  };

  const handleClearFilter = () => {
    setSelectedCategory("");
    setSelectedTag("");
    setSearchTerm("");
  };

  /**===========================================
  * GLOBAL SEARCH BOX RESET HANDLER
  ===========================================*/
  const globalSearchQueryResetHandler = () => {
    setGlobalSearchQuery("");
  };

  const filteredBlogs = data?.filter((blog) => {
    const query = globalSearchQuery.trim().toLowerCase();

    if (!query) return true;

    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.excerpt?.toLowerCase().includes(query) ||
      blog.category?.name?.toLowerCase().includes(query) ||
      blog.tags?.some((tag) => tag.name?.toLowerCase().includes(query))
    );
  });

  /**=============================================
   * GLOBAL SEARCH SUBMIT HANDLER
   * @param {*} e EVENT HANDLER
   =============================================*/
  const handleGlobalSearchSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await filteredBlogs();
      if (response.success) {
        console.log("Success", response.success.data);
      }
    } catch (error) {
      console.error("Error in fetching search result", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <Seo
        description="Nova Journal shares practical software engineering articles, React, Node.js, MongoDB, debugging, software architecture, and full-stack web development."
        url=""
        schemaType="WebSite"
      />

      <motion.div
        variants={sectionMotion}
        initial="hidden"
        animate="visible"
        className=""
      >
        {/**=================================
      | BLOG HERO SECTION BEGINS
      |**==================================*/}

        <BlogHero
          data={data}
          categories={categories}
          tags={tags}
          systemSettings={systemSettings?.data || {}}
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={setGlobalSearchQuery}
          globalSearchQueryResetHandler={globalSearchQueryResetHandler}
          onGlobalSearchSubmit={handleGlobalSearchSubmitHandler}
        />

        {/**=================================
      | BLOG HERO SECTION ENDS
      |**==================================*/}

        {/**=================================
      | MARQUEE NOTIFICATION SECTION BEGINS
      |**==================================*/}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t-0 border-red-400 rounded-xs"
        >
          <Marquee
            speed={50}
            pauseOnHover={true}
            pauseOnClick={true}
            gradient={true}
            gradientColor="#333"
            gradientWidth={400}
            autoFill={false}
            style={{
              backgroundColor: "#222",
              height: "50px",
              fontWeight: "bold",
              fontSize: "25px",
              color: "white",
              borderRadius: "0px 0px 5px 5px",
            }}
          >
            <MarqueeNotification />
          </Marquee>
        </motion.div>

        {/**=================================
      | MARQUEE NOTIFICATION SECTION ENDS
      |**====================================*/}
      </motion.div>

      <div className="lg:max-w-7xl mx-auto lg:px-4 px-4 space-y-12">
        {/**==================================
        * BLOG POSTS GLOBAL SEARCH PAGE BEGINS
        ======================================*/}
        {globalSearchQuery && (
          <BlogGlobalSearchResults
            user={user}
            filteredBlogs={filteredBlogs}
            loading={loading}
            globalSearchQuery={globalSearchQuery}
          />
        )}

        {/**==================================
        * FEATURED POSTS BEGIN
        ======================================*/}
        <FeaturedPosts
          user={user}
          featuredPosts={featuredPosts}
          isFeaturedLoading={isFeaturedLoading}
        />

        {/**==================================
        * POPULAR POSTS BEGIN
        ======================================*/}
        <PopularPosts user={user} />
        {/**==================================
        * POPULAR POSTS END
        ======================================*/}

        {/**===================================
      | BLOG CONTENT AREA LEFT & RIGHT BEGINS
      |**====================================*/}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-14 gap-2"
        >
          {/**============================
        | BLOG CONTENT AREA LEFT BEGINS
        |**=============================*/}
          <motion.div
            variants={sectionMotion}
            className="col-span-12 lg:col-span-8 space-y-4 shadow-sm rounded-xl"
          >
            {/* Search & Filter blog post section begins */}
            <div className="bg-white lg:p-6 p-4 rounded-xl mb-6 shadow-lg hover:shadow-xl dark:bg-gray-800">
              {showBlogPosts ? (
                <SectionTitle
                  title="Blog"
                  decoratedText="Posts"
                  icon={<FaBloggerB size={20} />}
                  dataLength={data?.length > 0 ? data.length : 0}
                  dataName="articles"
                />
              ) : (
                <SectionTitle
                  title="My Bookmarked"
                  decoratedText="Posts"
                  icon={<FaRegBookmark size={20} />}
                  dataLength={
                    bookmarkedPosts?.bookmarks.length > 0
                      ? bookmarkedPosts?.bookmarks.length
                      : 0
                  }
                  dataName="articles"
                />
              )}
              <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 items-center justify-between pb-4">
                <div className="col-span-12 lg:col-span-3">
                  <p
                    onClick={() => handleToggle(!showBookmarks)}
                    className="text-lg font-bold text-indigo-500 hover:link hover:text-indigo-800 dark:text-gray-400 cursor-pointer flex items-center gap-1"
                  >
                    {showBookmarks ? (
                      <FaBloggerB size={20} />
                    ) : (
                      <FaRegBookmark size={20} />
                    )}
                    {showBookmarks ? "Blog Posts" : "My Bookmarks"} →
                  </p>
                </div>

                {/* Category search begins */}
                {!width && (
                  <div className="col-span-12 lg:col-span-2">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 input-sm rounded-full py- px-4 w-full dark:bg-slate-800 text-slate-400 dark:text-slate-400 dark:border-slate-700"
                    >
                      <option value="">All Categories</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Category search ends */}

                {/* Tag search begins */}
                {!width && (
                  <div className="col-span-12 lg:col-span-2">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="border border-gray-300 input-sm rounded-full py- px-4 w-full dark:bg-slate-800 text-slate-400 dark:text-slate-400 dark:border-slate-700"
                    >
                      <option value="">All Tags</option>
                      {tags?.map((tag) => (
                        <option key={tag._id} value={tag.name}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                {/* Tag search ends */}

                {/* Clear Filter */}
                {!width && isFilterActive && (
                  <div className="col-span-12 lg:col-span-2">
                    <Button
                      onClick={handleClearFilter}
                      size="xs"
                      icon={
                        <LucideIcon.LucideRefreshCw
                          size={16}
                          className="text-base-100"
                        />
                      }
                      variant={isFilterActive ? "refresh" : "white"}
                      label="Refresh"
                      className={
                        isFilterActive
                          ? "border-2 shadow-xl border-green-300"
                          : "dark:bg-gray-800 dark:text-slate-400 border-slate-300 dark:border-slate-600 text-sm btn btn-sm"
                      }
                    />
                  </div>
                )}
                {/* Clear Filter Ends*/}

                {/* Search bar begins */}
                <div
                  className={`${
                    width ? "col-span-9" : "col-span-3"
                  } col-span-12 lg: w-full flex justify-end relative gap-2`}
                >
                  <input
                    onClick={handleSetWidth}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                    type="text"
                    placeholder="Search..."
                    className={`${
                      width ? "w-full flex justify-end" : "lg:w-full w-full"
                    } input lg:pl-6 pl-6 input-sm input-bordered rounded-full w-full max-w-full flex justify-end dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700`}
                  />

                  <FaSearch
                    className={`${
                      width
                        ? "absolute top-[.6rem] left-2 w-[1rem]"
                        : "absolute lg:w-[1rem] top-[.6rem] left-2 right-[11.2rem]"
                    } text-sm lg:[1rem] text-gray-400`}
                  />

                  {searchTerm && (
                    <Button
                      onClick={() => {
                        setSearchTerm("");
                        setWidth(false);
                      }}
                      size="xs"
                      variant={searchTerm ? "refresh" : "white"}
                      label="Refresh"
                      icon={
                        <LucideIcon.LucideRefreshCw
                          size={16}
                          className="text-base-100"
                        />
                      }
                      className={
                        searchTerm
                          ? "border-2 shadow-xl border-green-300"
                          : "dark:bg-gray-800 dark:text-slate-400 border-green-300 dark:border-slate-600 text-sm btn btn-sm"
                      }
                    >
                      Refresh
                    </Button>
                  )}
                </div>
                {/* Search bar ends */}
              </div>
            </div>
            {/* Search & Filter blog post section ends */}

            {/* Bookmarked blog post section begins */}
            {showBookmarks && (
              <div className="w-full lg:mt-4 mt-2">
                <Suspense fallback={<div>Loading...</div>}>
                  <BookmarkedSection />
                </Suspense>
              </div>
            )}
            {/* Bookmarked blog post section ends */}

            {/* Blog posts section begins */}
            <div className="">
              {showBlogPosts && (
                <div className="">
                  <Suspense fallback={<div>Loading...</div>}>
                    <BlogPostsSection
                      data={data}
                      isLoading={isLoading}
                      error={error}
                      user={user}
                      searchTerm={searchTerm}
                      selectedCategory={selectedCategory}
                      selectedTag={selectedTag}
                    />
                  </Suspense>
                </div>
              )}
            </div>
            {/* Blog posts section ends */}
          </motion.div>
          {/**================================
        | BLOG CONTENT AREA LEFT ENDS
        |**=================================*/}

          {/**=======================================
        | RIGHT SIDEBAR BEGINS
        |**=======================================*/}
          <motion.div
            variants={sidebarMotion}
            className="col-span-12 lg:col-span-4 rounded-xl"
          >
            <div className="sticky top-[5.8rem]">
              <div className="lg:space-y-6 space-y-4">
                {/**=================================
              | COMING SOON POSTS SECTION BEGINS
              | ===================================*/}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:p-6 p-4">
                  <SectionTitle
                    title="Coming"
                    decoratedText="Soon"
                    dataLength={
                      comingSoon?.length > 0 ? (
                        comingSoon?.length
                      ) : (
                        <span className="">{0}</span>
                      )
                    }
                    icon={<FaBloggerB />}
                  />
                  <ComingSoonPost />
                </div>
                {/**=================================
              | COMING SOON POSTS SECTION ENDS
              |**==================================*/}

                {/* Social media links section begins */}
                {user && (
                  <>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:p-6 p-4">
                      <div className="mb-2.5">
                        <SectionTitle title="Follow" decoratedText="Me on" />
                      </div>
                      <div className="flex justify-center">
                        <SocialMediaLinks />
                      </div>
                    </div>
                  </>
                )}
                {/* Social media links section ends */}

                {/* Categories section begins */}
                <div className="lg:my-10 my-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:p-6 p-4">
                  <Categories
                    data={categories}
                    isLoading={isCategoryLoading}
                    onCategorySelect={setSelectedCategory}
                    selectedCategory={selectedCategory}
                    error={isError}
                    user={user}
                  />
                </div>
                {/* Categories section ends */}

                {/* Tags section begins */}
                <div className="lg:my-10 my-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg lg:p-6 p-4">
                  <Tags
                    data={tags}
                    isLoading={isTagLoading}
                    error={isTagError}
                    onTagSelect={setSelectedTag}
                    selectedTag={selectedTag}
                  />
                </div>
                {/* Tags section ends */}
              </div>
            </div>
          </motion.div>
          {/**=====================================
        | RIGHT SIDEBAR ENDS
        |**======================================*/}
        </motion.div>
        {/**===================================
      | BLOG CONTENT AREA LEFT & RIGHT ENDS
      |*=====================================*/}

        {/**===================================
      | BLOG RANDOM POSTS SECTION BEGINS
      |**====================================*/}
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:my-10 my-4"
        >
          {/* <SectionTitle title="Random Posts" /> */}
          <RandomBlogPosts user={user} />
        </motion.div>
        {/**===================================
      | BLOG RANDOM POSTS SECTION ENDS
      |**====================================*/}

        {/**===================================
      | BLOG OLDER POSTS SECTION BEGINS
      |**====================================*/}
        <motion.div
          variants={sectionMotion}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className=""
        >
          <SectionTitle
            title="Older"
            decoratedText="Blog Posts"
            icon={<FaRegListAlt size={20} />}
          />
          <Marquee
            speed={50}
            pauseOnHover={true}
            pauseOnClick={true}
            autoFill={false}
            style={{
              backgroundColor: "",
              height: "px",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
              padding: "px",
            }}
          >
            <OlderBlogPosts />
          </Marquee>
        </motion.div>
        {/**===================================
      | BLOG OLDER POSTS SECTION ENDS
      |**====================================*/}

        {/* Scroll to top button */}
        <div className="height-[px]">
          <ScrollTopButton />
        </div>

        {/* Scroll progress bar begins */}
        <div className="">
          <ScrollProgressBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
