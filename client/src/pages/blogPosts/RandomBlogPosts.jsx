import { Link } from "react-router-dom";
import useGetRandomBlogPosts from "../../hooks/useGetRandomBlogPosts";
import SectionTitle from "../../components/sectionTitle/SectionTitle";
import { FaListOl } from "react-icons/fa";

const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const RandomBlogPosts = () => {
  const { data, isLoading, error } = useGetRandomBlogPosts();
  console.log("Random posts", data);

  if (isLoading) return <p className="flex justify-center">Loading...</p>;
  if (error) return <p className="flex justify-center">{error.message}</p>;

  return (
    <div className="lg:my-10 my-4">
      <SectionTitle
        title="Random"
        decoratedText="Blog Posts"
        dataLength={data && data.length > 0 ? data.length : 0}
        icon={<FaListOl size={20} />}
      />
      {data && data.length > 0 ? (
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between lg:mt-5 mt-3">
          {data.map((blog) => (
            <div
              key={blog._id}
              className="col-span-12 lg:col-span-3 lg:space-y-4 space-y-2 shadow-sm rounded-md border border-base-300 dark:border-gray-700 p-2 tooltip"
              data-tip={blog?.title}
            >
              <div className="lg:h-44 h-38 w-full">
                <Link to={`/blog-details/${blog.slug}`} className="m-0">
                  <img
                    src={`${apiURL}${blog.image}`}
                    alt=""
                    className="lg:h-44 h-38 w-full"
                  />
                </Link>
              </div>
              <div className="">
                <Link to={`/blog-details/${blog.slug}`} className="m-0">
                  <h2 className="text-xl font-bold">
                    {blog.title.length > 60
                      ? blog.title.slice(0, 60) + "..."
                      : blog.title}
                  </h2>
                </Link>
              </div>
              <div className="dark:text-gray-400">
                <Link to={`/blog-details/${blog.slug}`} className="m-0">
                  {blog?.content ? (
                    <p
                      style={{ fontSize: "16px" }}
                      className="prose prose-lg max-w-none list-decimal text-gray-700 mb-4 dark:text-gray-400"
                      dangerouslySetInnerHTML={{
                        __html:
                          blog.content.length > 120
                            ? blog.content.slice(0, 120) + "..."
                            : blog.content,
                      }}
                    />
                  ) : (
                    <p>No blog post content is available</p>
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="flex justify-center">No random blog posts available</p>
      )}
    </div>
  );
};

export default RandomBlogPosts;
