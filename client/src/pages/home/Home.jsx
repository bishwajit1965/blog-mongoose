import { FaBlog, FaBookmark, FaSearch } from "react-icons/fa";
import { Suspense, lazy } from "react";

import BlogPosts from "../blogPosts/BlogPosts";
import Button from "../../components/buttons/Button";
import Categories from "../../components/categories/Categories";
import ComingSoonPost from "../../components/comingSoonPost/ComingSoonPost";
import { Helmet } from "react-helmet-async";
import Marquee from "react-fast-marquee";
import MarqueeNotification from "../../components/marqueeNotification/MarqueeNotification";
import PageTitle from "../../components/pageTitle/PageTitle";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import Tags from "../../components/tags/Tags";
import useAuth from "../../hooks/useAuth";
import useGetBlogs from "../../hooks/useGetBlogs";
import useGetBookmarkedPosts from "../../hooks/useGetBookmarkedPosts";
import useGetCategories from "../../hooks/useGetCategories";
import useGetComingSoonPost from "../../hooks/useGetComingSoonPost";
import useGetTags from "../../hooks/useGetTags";
import { useState } from "react";

// import BookmarkedPage from "../bookmarkedPage/BookmarkedPage";

const BookmarkedPage = lazy(() => import("../bookmarkedPage/BookmarkedPage"));

const Home = () => {
  const { user } = useAuth();
  const { data: comingSoonPosts } = useGetComingSoonPost();
  const [width, setWidth] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showBlogPosts, setShowBlogPosts] = useState(true);
  const { data, isLoading, error } = useGetBlogs();
  const { data: bookmarkedPosts } = useGetBookmarkedPosts();
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

  console.log("Toggler value", showBookmarks);
  const handleSetWidth = () => {
    setWidth((prev) => !prev);
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

      {/**============================
      | BLOG CONTENT AREA LEFT BEGINS
      | ===========================*/}
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4">
        {/* <div className=" bg-base-100 pb-6 lg:py-8 dark:bg-gray-700"> */}
        {/* <div
          className="flex justify-center items-center 
      space-y-2 lg:px-0"
        >
          {user ? (
            <div className="text-center space-y-2">
              <div className="flex justify-center">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="w-28 h-28 rounded-full flex"
                />
              </div>
              <h1 className="font-bold">
                {user
                  ? `Welcome ${user?.displayName}`
                  : "Welcome to the Home Page"}
              </h1>
              <p className="">Email: {user?.email}</p>

              <div className="">
                <p>UID: {user?.uid}</p>
              </div>

              <div className="">
                <p>Provider: {user?.providerId}</p>{" "}
              </div>

              <div className="">
                {/* <p className="max-w-96 mx-auto">Token: {user?.refreshToken}</p> */}
        {/* </div> */}
        {/* <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                omnis dignissimos nihil tempore ratione velit blanditiis optio
                culpa nisi cupiditate excepturi corrupti, labore a, ad cum dolor
                vel quasi provident.
              </p> */}
        {/* </div> */}
        {/* ) : ( */}
        {/* <div className="lg:my-10 my-2">
              <h1 className="lg:text-3xl text-xl font-extrabold text-gray-800 justify-center items-center flex">
                Welcome to the Blog Home Page
              </h1>
            </div> */}
        {/* )} */}
        {/* </div> */}
        {/* Advertisement section begins */}
        {/* <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between lg:my-10 my-2">
          <div className="col-span-12 lg:col-span-4 p-2 bg-red-500">
            Responsive Advertisements
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 bg-green-500">
            Responsive Advertisements
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 bg-red-500">
            Responsive Advertisements
          </div>
        </div> */}
        {/* Advertisement section ends */}
        {/* <div className="grid lg:grid-cols-3 gap-4 p-4 lg:min-h-[calc(100vh-63px)]"> */}

        {/**============================
        | BLOG CONTENT AREA LEFT BEGINS
        | ==============================*/}
        <div className="col-span-12 lg:col-span-8 space-y-4 lg:py-8 py-4 shadow-lg rounded-b-lg">
          {/* Bookmarked blog post section begins */}
          <div className="">
            {showBlogPosts ? (
              <SectionTitle
                title="Blog Posts ➡️"
                icon={<FaBlog />}
                dataLength={data?.length > 0 ? data.length : 0}
                description="Latest blog posts first. Summary is added."
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
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 items-center justify-between px-2 py-4">
              <div className="col-span-12 lg:col-span-3">
                <Button
                  onClick={() => handleToggle(!showBookmarks)}
                  label={showBookmarks ? "Blog Posts" : "My Bookmarks"}
                  icon={showBookmarks ? <FaBlog /> : <FaBookmark />}
                  variant={showBookmarks ? "active" : "primary"}
                />
              </div>

              {/* Search bar begins */}
              <div className="col-span-12 lg:col-span-9 w-full flex justify-end relative">
                <input
                  onClick={handleSetWidth}
                  type="text"
                  placeholder="Search..."
                  className={`${
                    width ? "w-full flex justify-end" : "lg:w-1/3 w-full"
                  } input pl-6 input-sm input-bordered rounded-full w-full max-w-full flex justify-end`}
                />

                <FaSearch
                  className={`${
                    width
                      ? "absolute top-[.6rem] left-2 w-[1rem]"
                      : "absolute lg:w-[1rem] w-full top-[.6rem] right-[11.52rem]"
                  } text-sm lg:[1rem] text-gray-400`}
                />
              </div>
              {/* Search bar ends */}
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
        <div className="col-span-12 lg:col-span-4 rounded-xl lg:py-8 py-4 shadow-lg rounded-b-lg p-2">
          <div className="sticky top-[5.8rem]">
            <div className="dark:bg-gray-800 ">
              {/**=================================
              | COMING SOON POSTS SECTION BEGINS
              | ===================================*/}
              <SectionTitle
                title="Coming Soon Posts ➡️"
                description="Coming amazing posts!"
                dataLength={
                  comingSoonPosts?.length > 0 ? (
                    comingSoonPosts?.length
                  ) : (
                    <span className="text-red-500">{0}</span>
                  )
                }
              />
              <div className="lg:my-4 my-2">
                <ComingSoonPost />
              </div>
              {/**=================================
              | COMING SOON POSTS SECTION ENDS
              | ===================================*/}

              {/* Social media links section begins */}
              <div className=" ">
                <SocialMediaLinks />
              </div>
              {/* Social media links section ends */}

              {/* Popular posts section begins */}
              <div className="lg:my-10 my-2 lg:space-y-4 space-y-2">
                <div className="bg-gray-300 p-4 flex items-center rounded-t-md">
                  <h2 className="text-xl font-bold">Popular Posts</h2>
                </div>
                <div className="grid grid-cols-12 gap-2 justify-between">
                  <div className="col-span-12 lg:col-span-5 rounded-md shadow-md p-2">
                    <img
                      src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
                      alt="Popular Posts"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-7 rounded-md shadow-md p-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Recusandae amet eum, assumenda at sunt.
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 justify-between">
                  <div className="col-span-12 lg:col-span-5 rounded-md shadow-md p-2">
                    <img
                      src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
                      alt="Popular Posts"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-7 rounded-md shadow-md p-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Recusandae amet eum, assumenda at sunt.
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-2 justify-between">
                  <div className="col-span-12 lg:col-span-5 rounded-md shadow-md p-2">
                    <img
                      src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
                      alt="Popular Posts"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                  <div className="col-span-12 lg:col-span-7 rounded-md shadow-md p-2">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Recusandae amet eum, assumenda at sunt.
                  </div>
                </div>
              </div>
              {/* Popular posts section ends */}

              {/* Categories section begins */}
              <div className="">
                <div className="bg-gray-300 lg:p-4 flex items-center rounded-t-md">
                  <h2 className="text-xl font-bold">Blog Categories </h2>
                </div>
                <Categories
                  data={categories}
                  isLoading={isCategoryLoading}
                  error={isError}
                  user={user}
                />
              </div>
              {/* Categories section ends */}

              {/* Tags section begins */}
              <div className="">
                <div className="bg-gray-300 lg:p-4 p-2 flex items-center rounded-t-md">
                  <h2 className="text-xl font-bold">Blog Tags </h2>
                </div>
                <Tags data={tags} isLoading={isTagLoading} error={isTagError} />
              </div>
              {/* Tags section ends */}

              {/* Search bar begins */}
            </div>
          </div>
        </div>

        {/**=====================================
        | RIGHT SIDEBAR ENDS
        **=======================================*/}
      </div>
    </div>
  );
};

export default Home;
