import { useCallback, useEffect, useState } from "react";
import { getPopularPosts } from "../../admin/adminServices/blogService";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Loader } from "lucide-react";
import { FaBloggerB, FaTags } from "react-icons/fa";
import { Link } from "react-router-dom";
import Badge from "../../admin/ui/Badge";
import { LucideIcon } from "../lucideIcon/LucideIcons";
const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const PopularPosts = () => {
  const [loading, setLoading] = useState();
  const [popularPosts, setPopularPosts] = useState([]);

  const fetchPopularPosts = useCallback(async () => {
    try {
      setLoading(true);
      const [popularPostResponse] = await Promise.all([getPopularPosts()]);
      setPopularPosts(popularPostResponse.popularPosts);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  return (
    <div className="">
      {popularPosts && popularPosts?.length > 0 && (
        <div className="  bg-white dark:bg-gray-800 dark:border-x-gray-700 pt-6 px-6  pb-2 rounded-t-xl shadow-lg">
          <SectionTitle
            title="Popular"
            decoratedText="Posts"
            dataLength={
              popularPosts?.length > 0 ? (
                popularPosts?.length
              ) : (
                <span className="text-red-500">{0}</span>
              )
            }
            icon={<FaBloggerB />}
          />
        </div>
      )}
      {loading && <Loader size={20} className="animate-spin text-center" />}

      <div className="mt-4 space-y-6">
        {popularPosts && popularPosts.length > 0 ? (
          popularPosts?.map((post) => (
            <div
              key={post._id}
              className="dark:border border dark:border-base-content/40 shadow-lg hover:shadow-xl rounded-xl bg-white dark:bg-gray-800"
            >
              <div className=" ">
                <Link
                  to={`/blog-details/${post.slug}`}
                  className="m-0 p-0 flex justify-center"
                >
                  <img
                    src={
                      post?.image?.url
                        ? post?.image?.url
                        : `${apiURL}${post?.image}`
                    }
                    alt={post.title}
                    className="rounded-t-lg w-full h-auto lg:h-36 object-cover cursor-pointer"
                  />
                </Link>
              </div>

              <div className="px-4 pb-4 pt-1 space-y-2">
                <Link to={`/blog-details/${post.slug}`} className="m-0 p-0">
                  <h3 className="lg:text-lg text-lg font-extrabold capitalize text-gray-800 dark:text-gray-400 first-letter:font-roboto first-letter:capitalize first-letter:text-amber-600 first-letter:font-extrabold lg:first-letter:text-xl first-letter:text-3xl first-letter:text-extra-bold line-clamp-2">
                    {post?.title?.length > 60
                      ? post?.title?.slice(0, 60) + " ..."
                      : post?.title}
                  </h3>
                </Link>
                <p className="flex items-center justify-between">
                  <span className="flex items-center gap-1">
                    <FaTags size={16} />
                    <Badge color="blue">{post?.category?.name}</Badge>
                  </span>
                  <span className="flex items-center gap-1">
                    <LucideIcon.Clock3 size={16} />
                    {new Date(post?.publishAt).toLocaleDateString()}
                  </span>
                </p>

                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      post.excerpt.length > 150
                        ? `${post.excerpt.slice(0, 150)}` + "..."
                        : post.excerpt,
                  }}
                  className="prose max-w-none list-decimal text-gray-700 dark:text-gray-400 text-sm text-pretty"
                />
                <div className="flex justify-end">
                  <Link
                    to={`/blog-details/${post.slug}`}
                    className="m-0 text-medium text-indigo-500 hover:text-indigo-900 dark:text-slate-400 font-bold hover:link"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center">
            <p>No data found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPosts;
