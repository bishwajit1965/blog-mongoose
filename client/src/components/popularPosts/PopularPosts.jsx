import { useCallback, useEffect, useState } from "react";
import { getPopularPosts } from "../../admin/adminServices/blogService";
import SectionTitle from "../sectionTitle/SectionTitle";
import { Loader } from "lucide-react";
import { FaBloggerB, FaBookReader } from "react-icons/fa";
import Button from "../buttons/Button";
import { Link } from "react-router-dom";
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
    <div>
      {popularPosts && popularPosts?.length > 0 && (
        <SectionTitle
          title="Popular Posts ➡️"
          dataLength={
            popularPosts?.length > 0 ? (
              popularPosts?.length
            ) : (
              <span className="text-red-500">{0}</span>
            )
          }
          icon={<FaBloggerB />}
        />
      )}

      {loading && <Loader size={20} className="animate-pulse text-center" />}

      <div className="mt-4">
        {popularPosts && popularPosts.length > 0 ? (
          popularPosts?.map((post) => (
            <div
              key={post._id}
              className="dark:border dark:border-base-content/40 mb-4"
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
                    className="rounded-t-lg w-full h-auto lg:h-36 object-cover shadow-md hover:shadow-xl cursor-pointer"
                  />
                </Link>
              </div>

              <div className="p-2 space-y-2">
                <Link to={`/blog-details/${post.slug}`} className="m-0 p-0">
                  <h3 className="lg:text-lg text-lg font-bold dark:text-gray-200">
                    {post?.title?.length > 34
                      ? post?.title?.slice(0, 34) + " ..."
                      : post?.title}
                  </h3>
                </Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.length > 80
                        ? `${post.content.slice(0, 80)}` + "..."
                        : post.content,
                  }}
                  className="prose max-w-none list-decimal text-gray-700 dark:text-gray-400 text-sm text-pretty"
                />
                <div className="flex justify-end py8">
                  <Button
                    href={`/blog-details/${post.slug}`}
                    label="Read More"
                    icon={<FaBookReader />}
                    variant="outline"
                    className="btn btn-sm font-bold text-[16px] text-sm"
                  />
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
