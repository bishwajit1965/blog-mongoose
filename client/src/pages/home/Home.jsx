import { FaBlog, FaBookmark, FaRegListAlt, FaSearch } from "react-icons/fa";
import { Suspense, lazy } from "react";

import BlogPosts from "../blogPosts/BlogPosts";
import Button from "../../components/buttons/Button";
import Categories from "../../components/categories/Categories";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import { Helmet } from "react-helmet-async";
import Marquee from "react-fast-marquee";
import MarqueeNotification from "../../components/marqueeNotification/MarqueeNotification";
import OlderBlogPosts from "../blogPosts/OlderBlogPosts";
import PageTitle from "../../components/pageTitle/PageTitle";
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
import useGetTags from "../../hooks/useGetTags";
import { useState } from "react";
import PopularPosts from "../../components/popularPosts/PopularPosts";

// import BookmarkedPage from "../bookmarkedPage/BookmarkedPage";

const BookmarkedPage = lazy(() => import("../bookmarkedPage/BookmarkedPage"));

const Home = () => {
  const { user } = useAuth();
  const [width, setWidth] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showBlogPosts, setShowBlogPosts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const { data, isLoading, error } = useGetBlogs();
  const { data: bookmarkedPosts } = useGetBookmarkedPosts();
  const isFilterActive = selectedTag || selectedCategory;
  console.log("Searched term", searchTerm);
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
  };

  return (
    <div className="">
      <Helmet>
        <title>Blog || Home Page</title>
      </Helmet>
      <PageTitle
        title="Blog"
        about="Posts"
        decoratedText="Home Page"
        subtitle="Where Stories Ignite, Ideas Thrive, and Conversations Connect."
        slogan="Where Every Story Matters – From Thought-Provoking Insights to Everyday Inspirations, Discover a World of Perspectives, Ideas, and Conversations That Ignite Curiosity and Foster Connection."
        dataLength={data?.length > 0 ? data?.length : "0"}
        Blog
        Posts
        navigationLink="terms-conditions"
        navigationArea="Terms & conditions"
      />

      {/**=================================
      | MARQUEE NOTIFICATION SECTION BEGINS
      | ================================*/}
      <div className="border-t border-2 border-gray-300 shadow-md">
        <Marquee
          speed={50}
          pauseOnHover={true}
          pauseOnClick={true}
          gradient={true}
          gradientColor="#888"
          gradientWidth={400}
          autoFill={false}
          style={{
            backgroundColor: "#fff",
            height: "50px",
            fontWeight: "bold",
            fontSize: "20px",
            color: "black",
          }}
        >
          <MarqueeNotification />
        </Marquee>
      </div>
      {/**=================================
      | MARQUEE NOTIFICATION SECTION ENDS
      | ================================*/}

      {/**===================================
      | BLOG CONTENT AREA LEFT & RIGHT BEGINS
      | =====================================*/}
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-10 gap-2">
        {/**============================
        | BLOG CONTENT AREA LEFT BEGINS
        | ==============================*/}
        <div className="col-span-12 lg:col-span-8 space-y-4 lg:py-8 py-4 shadow-sm rounded-b-lg border-b border-gray-200 dark:border-gray-700">
          {/* Bookmarked blog post section begins */}
          <div className="">
            {showBlogPosts ? (
              <SectionTitle
                title="Blog Posts ➡️"
                icon={<FaBlog />}
                dataLength={data?.length > 0 ? data.length : 0}
              />
            ) : (
              <SectionTitle
                title="My Bookmarked Posts ➡️"
                icon={<FaBookmark />}
                description="Latest blog posts first. Summary is added."
                dataLength={
                  bookmarkedPosts?.bookmarks.length > 0
                    ? bookmarkedPosts?.bookmarks.length
                    : 0
                }
              />
            )}
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 items-center justify-evenly px-2 py-4">
              <div className="col-span-12 lg:col-span-3">
                <Button
                  onClick={() => handleToggle(!showBookmarks)}
                  label={showBookmarks ? "Blog Posts" : "My Bookmarks"}
                  icon={showBookmarks ? <FaBlog /> : <FaBookmark />}
                  variant={showBookmarks ? "gray" : "white"}
                />
              </div>

              {/* Category search begins */}
              {!width && (
                <div className="col-span-12 lg:col-span-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 input-sm rounded-full py- px-4 w-full"
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
                    className="border border-gray-300 input-sm rounded-full py- px-4 w-full"
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

              {/* Search bar begins */}
              <div
                className={`${
                  width ? "col-span-9" : "col-span-3"
                } col-span-12 lg: w-full flex justify-end relative`}
              >
                <input
                  onClick={handleSetWidth}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search..."
                  className={`${
                    width ? "w-full flex justify-end" : "lg:w-full w-full"
                  } input lg:pl-6 input-sm input-bordered rounded-full w-full max-w-full flex justify-end`}
                />

                <FaSearch
                  className={`${
                    width
                      ? "absolute top-[.6rem] left-2 w-[1rem]"
                      : "absolute lg:w-[1rem] top-[.6rem] left-2 right-[11.2rem]"
                  } text-sm lg:[1rem] text-gray-400`}
                />
              </div>
              {/* Search bar ends */}

              {/* Clear Filter */}
              {!width && (
                <div className="col-span-12 lg:col-span-2">
                  <Button
                    onClick={handleClearFilter}
                    variant={isFilterActive ? "danger" : "white"}
                    label="Clear Filter"
                    className={
                      isFilterActive
                        ? "border-4 shadow-xl border-amber-500"
                        : ""
                    }
                  />
                </div>
              )}
              {/* Clear Filter Ends*/}
            </div>

            {showBookmarks && (
              <div className="w-full lg:mt-4 mt-2">
                <Suspense fallback={<div>Loading...</div>}>
                  <BookmarkedPage />
                </Suspense>
              </div>
            )}
          </div>
          {/* Bookmarked blog post section ends */}

          {/* Blog posts section begins */}
          <div className="">
            {showBlogPosts && (
              <BlogPosts
                data={data}
                isLoading={isLoading}
                error={error}
                user={user}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                selectedTag={selectedTag}
              />
            )}
          </div>
          {/* Blog posts section ends */}
        </div>
        {/**================================
      | BLOG CONTENT AREA LEFT ENDS
      | ====================================*/}

        {/**=======================================
      | RIGHT SIDEBAR BEGINS
      | ===========================================*/}
        <div className="col-span-12 lg:col-span-4 rounded-xl lg:py-8 py-4 shadow-sm rounded-b-lg border-b border-gray-200 dark:border-gray-700">
          <div className="sticky top-[5.8rem]">
            <div className="">
              {/**=================================
              | COMING SOON POSTS SECTION BEGINS
              | ===================================*/}
              <div className="">
                <ComingSoonPost />
              </div>
              {/**=================================
              | COMING SOON POSTS SECTION ENDS
              | ===================================*/}

              {/* Social media links section begins */}
              <div className="bg-base-300 dark:bg-gray-800 rounded-md lg:p-4 p-2">
                <SocialMediaLinks />
              </div>
              {/* Social media links section ends */}

              {/* Categories section begins */}
              <div className="lg:my-10 my-2">
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
              <div className="lg:my-10 my-2">
                <Tags
                  data={tags}
                  isLoading={isTagLoading}
                  error={isTagError}
                  onTagSelect={setSelectedTag}
                  selectedTag={selectedTag}
                />
              </div>
              {/* Tags section ends */}

              {/* Popular posts section begins */}
              <div className="lg:my-10 my-2 lg:space-y-4 space-y-2">
                <PopularPosts />
              </div>
              {/* Popular posts section ends */}
            </div>
          </div>
        </div>
        {/**=====================================
        | RIGHT SIDEBAR ENDS
        **=======================================*/}
      </div>
      {/**===================================
      | BLOG CONTENT AREA LEFT & RIGHT ENDS
      | =====================================*/}

      {/**===================================
      | BLOG RANDOM POSTS SECTION BEGINS
      | =====================================*/}
      <div className="lg:my-10 my-4">
        {/* <SectionTitle title="Random Posts" /> */}
        <RandomBlogPosts />
      </div>
      {/**===================================
      | BLOG RANDOM POSTS SECTION ENDS
      | =====================================*/}

      {/**===================================
      | BLOG OLDER POSTS SECTION BEGINS
      | =====================================*/}
      <div className="lg:my- my-4">
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
      </div>
      {/**===================================
      | BLOG OLDER POSTS SECTION ENDS
      | =====================================*/}

      {/* Scroll to top button */}
      <div className="height-[px]">
        <ScrollTopButton />
      </div>

      {/* Scroll progress bar begins */}
      <div className="">
        <ScrollProgressBar />
      </div>
    </div>
  );
};

export default Home;
