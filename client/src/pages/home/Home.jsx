import { FaBlog, FaBookmark, FaSearch } from "react-icons/fa";
import { Suspense, lazy } from "react";

import BlogPosts from "../blogPosts/BlogPosts";
import CTAButton from "../../components/buttons/CTAButton";
import Categories from "../../components/categories/Categories";
import { Helmet } from "react-helmet-async";
import PageTitle from "../../components/pageTitle/PageTitle";
import SocialMediaLinks from "../../components/socialMediaLinks/SocialMediaLinks";
import Tags from "../../components/tags/Tags";
import useAuth from "../../hooks/useAuth";
import useGetBlogs from "../../hooks/useGetBlogs";
import useGetCategories from "../../hooks/useGetCategories";
import useGetTags from "../../hooks/useGetTags";
import { useState } from "react";

// import BookmarkedPage from "../bookmarkedPage/BookmarkedPage";

const BookmarkedPage = lazy(() => import("../bookmarkedPage/BookmarkedPage"));

const Home = () => {
  const { user } = useAuth();
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showBlogPosts, setShowBlogPosts] = useState(true);
  const { data, isLoading, error } = useGetBlogs();
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
  return (
    <div className="lg:my-12 my-4">
      <Helmet>
        <title>Blog || Home Page</title>
      </Helmet>
      <PageTitle
        title="Blog"
        decoratedText="Home Page"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        slogan="Lorem ipsum dolor sit amet consectetur adipisicing eli. Sed omnis dignissimos nihil tempore ratione velit blanditiis optio culpa nisi cupiditate excepturi corrupti, labore a, ad cum dolor vel quasi provident."
        dataLength={data?.length > 0 ? data?.length : "0"}
        navigationLink="terms-conditions"
        navigationArea="Terms & conditions"
      />

      <div className="shadow-xl bg-base-100 pb-6 lg:py-8 dark:bg-gray-700">
        <div
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
              </div>

              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                omnis dignissimos nihil tempore ratione velit blanditiis optio
                culpa nisi cupiditate excepturi corrupti, labore a, ad cum dolor
                vel quasi provident.
              </p>
            </div>
          ) : (
            <div className="lg:my-10 my-2">
              <h1 className="lg:text-3xl text-xl font-extrabold text-gray-800 justify-center items-center flex">
                Welcome to the Blog Home Page
              </h1>
            </div>
          )}
        </div>
        {/* Advertisement section begins */}
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between lg:my-10 my-2">
          <div className="col-span-12 lg:col-span-4 p-2 bg-red-500">
            Responsive Advertisements
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 bg-green-500">
            Responsive Advertisements
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 bg-red-500">
            Responsive Advertisements
          </div>
        </div>
        {/* Advertisement section ends */}

        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
          {/**============================
          | BLOG CONTENT AREA LEFT BEGINS
          | ==============================*/}
          <div className="col-span-12 lg:col-span-8 rounded-lg">
            <div className="bg-gray-300 lg:p-4 p-2 flex items-center rounded-t-md">
              <h2 className="text-xl font-bold">Latest Blog Posts</h2>
            </div>

            {/* Slider area begins */}
            <div className="bg-red-500 col-span-12 lg:col-span-8 shadow-md p-2">
              Slider
            </div>
            {/* Slider area ends */}

            {/* Bookmarked blog post section begins */}
            <div className="flex flex-col items-center lg:my-4 my-2">
              <button
                type="button"
                onClick={() => handleToggle(!showBookmarks)}
                className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 flex items-center space-x-2 ${
                  showBookmarks
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                <span>{showBookmarks ? "Blog Posts" : "My Bookmarks"}</span>
                <span>{showBookmarks ? <FaBlog /> : <FaBookmark />}</span>
              </button>
              {showBookmarks && (
                <div className="w-full lg:mt-4 mt-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    <BookmarkedPage />
                  </Suspense>
                </div>
              )}
            </div>
            {/* <div className="flex flex-col items-center my-4">
              <button
                type="button"
                onClick={() => handleToggle(!showBookmarks)}
                className={`px-5 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
                  showBookmarks
                    ? "bg-yellow-400 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {showBookmarks
                  ? "📚 View All Blog Posts"
                  : "🔖 View My Bookmarks"}
              </button>

              {showBookmarks && (
                <div className="w-full mt-6">
                  <BookmarkedPage />
                </div>
              )}
            </div> */}

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
          {/**============================
          | BLOG CONTENT AREA LEFT ENDS
          | ==============================*/}

          {/**=======================
          | RIGHT SIDEBAR BEGINS
          | =========================*/}
          <div className="col-span-12 lg:col-span-4 lg:space-y-4 space-y-2 bg-white shadow-lg rounded-lg">
            {/* Search bar begins */}
            <div className="col-span-12 lg:col-span-4 lg:space-y-2 space-y-2 rounded-lg">
              <div className="bg-gray-300 lg:p-4 flex items-center rounded-t-md">
                <h2 className="text-xl font-bold">Search Blog</h2>
              </div>
              <div className="">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input input-bordered w-full max-w-full"
                />
              </div>
              <div className="">
                <CTAButton
                  label="Search"
                  className="btn w-full text-xl lg:btn-md btn-sm rounded-lg"
                  icon={<FaSearch />}
                />
              </div>
            </div>
            {/* Search bar ends */}

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

            {/* Responsive advertisement begins */}
            <div className="grid lg:grid-cols-12 grid-cols-1 gap-2 justify-between">
              <div className="col-span-12 lg:col-span-6 p-2 h-36 rounded-md bg-red-500">
                Advertisement
              </div>
              <div className="col-span-12 lg:col-span-6 p-2 h-36 rounded-md bg-green-500">
                Advertisement
              </div>
            </div>
            {/* Responsive advertisement ends */}
          </div>
          {/**=======================
          | RIGHT SIDEBAR ENDS
          **=========================*/}
        </div>

        {/**===========================================
          | BOTTOM SECTION BEGINS
          **===========================================*/}
        {/* Responsive advertisements begins */}
        <div className="lg:mt-8 grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
          <div className="col-span-12 lg:col-span-4 p-2">
            <h2 className="text-xl font-bold">Responsive Advertisements</h2>
            <img
              src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
              alt="Responsive Advertisement"
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-12 lg:col-span-4 p-2">
            <h2 className="text-xl font-bold">Responsive Advertisements</h2>
            <img
              src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
              alt="Responsive Advertisement"
              className="w-full h-auto"
            />
          </div>
          <div className="col-span-12 lg:col-span-4 p-2">
            <h2 className="text-xl font-bold">Responsive Advertisements</h2>
            <img
              src="https://i.ibb.co.com/s9M9h92/programming-4.jpg"
              alt="Responsive Advertisement"
              className="w-full h-auto"
            />
          </div>
        </div>
        {/* Responsive advertisements ends */}

        {/* Random, Featured, Most Popular posts begin */}
        <div className="lg:mt-8 grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
          <div className="col-span-12 lg:col-span-4 p-2 lg:space-y-6 space-y-2">
            <h2 className="text-xl font-bold w-full border-b-4 mb-">
              Random Posts
            </h2>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">First random post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Second random post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Third random post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 lg:space-y-6 space-y-2">
            <h2 className="text-xl font-bold w-full border-b-4 mb-">
              Featured Posts
            </h2>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">First featured post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Second featured post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Third featured post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 p-2 lg:space-y-6 space-y-2">
            <h2 className="text-xl font-bold w-full border-b-4 mb-">
              Popular Posts
            </h2>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Third popular post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Third popular post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-12 gap-2 items-center justify-between">
              <div className="col-span-12 lg:col-span-5">
                <img
                  src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                  alt=""
                  className="h-36 w-full rounded-md"
                />
              </div>
              <div className="col-span-12 lg:col-span-7">
                <h2 className="font-bold text-xl">Third popular post</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nihil mollitia, possimus temporibus reprehenderit quae fugiat
                  et tenetur alias nobis.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Random, Featured, Most Popular posts ends */}

        {/* Same Category Related Posts section begins*/}
        <div className="lg:mt-10 mt-4">
          <div className="px-2">
            <h2 className="text-3xl font-bold flex justify-center border-b-4 w-full pb-2">
              Category Related Posts
            </h2>
          </div>
          <div className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between gap-4 lg:space-y-4 space-y-4 p-2">
            <div className="col-span-12 lg:col-span-4">
              <div className="grid lg:grid-cols-12 grid-cols-1 justify-between items-center gap-2">
                <div className="col-span-12 lg:col-span-5">
                  <img
                    src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                    className="h-36 w-full rounded-md shadow-md"
                    alt=""
                  />
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim, accusamus. Neque, rem. A culpa praesentium sequi
                    obcaecati porro excepturi, in mollitia ipsa tempora?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="grid lg:grid-cols-12 grid-cols-1 justify-between items-center gap-2">
                <div className="col-span-12 lg:col-span-5">
                  <img
                    src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                    className="h-36 w-full rounded-md shadow-md"
                    alt=""
                  />
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim, accusamus. Neque, rem. A culpa praesentium sequi
                    obcaecati porro excepturi, in mollitia ipsa tempora?
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className="grid lg:grid-cols-12 grid-cols-1 justify-between items-center gap-2">
                <div className="col-span-12 lg:col-span-5">
                  <img
                    src="https://i.ibb.co.com/9yC1xDs/programming-5.jpg"
                    className="h-36 w-full rounded-md shadow-md"
                    alt=""
                  />
                </div>
                <div className="col-span-12 lg:col-span-7">
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Enim, accusamus. Neque, rem. A culpa praesentium sequi
                    obcaecati porro excepturi, in mollitia ipsa tempora?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Same Category Related Posts section ends*/}
        {/**===========================================
          | BOTTOM SECTION ENDS
          **===========================================*/}
      </div>
    </div>
  );
};

export default Home;
