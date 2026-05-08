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

      <div className="">
        {popularPosts && popularPosts.length > 0 ? (
          popularPosts?.map((post) => (
            <div
              key={post._id}
              className="grid lg:grid-cols-12 grid-cols-1 items-center justify-between lg:gap-4 gap-2 lg:space-y-4 space-y-2"
            >
              <div className="lg:col-span-4 col-span-12">
                <Link
                  to={`/blog-details/${post.slug}`}
                  className="m-0 p-0 flex justify-center"
                >
                  <img
                    src={`${apiURL}${post?.image}`}
                    alt={post.title}
                    className="rounded-lg w-full lg:h-24 h-44 object-cover border-4 border-base-300 shadow-md hover:shadow-xl cursor-pointer"
                  />
                </Link>
              </div>
              <div className="lg:col-span-8 col-span-12 lg:space-y-1">
                <Link to={`/blog-details/${post.slug}`} className="m-0 p-0">
                  <h3 className="lg:text-xl text-lg font-bold dark:text-gray-200">
                    {post?.title?.slice(0, 20) + " ..."}
                  </h3>
                </Link>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      post.content.length > 80
                        ? `${post.content.slice(0, 80)}...`
                        : post.content,
                  }}
                  className="prose max-w-none list-decimal text-gray-700 dark:text-base-300 text-sm text-pretty"
                />
                <div className="flex justify-end lg:mb- mb-">
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
