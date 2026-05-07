import { FaEye, FaEyeSlash } from "react-icons/fa";

import AdminPagination from "../../admin/adminComponent/adminPagination/AdminPagination";
import Button from "../buttons/Button";
import RelatedBlogPostsCard from "./RelatedBlogPostsCard";
import useGetRelatedPosts from "../../hooks/useGetRelatedPosts";
import { useState } from "react";

// Button active state style
const style = {
  active:
    "bg-teal-500 text-gray-100 hover:bg-emerald-700 border border-1 border-emerald-400 shadow-md focus:ring-2 focus:ring-offset-2 transition-transform duration-300 border-none",
};

const RelatedBlogPosts = ({ slug, user }) => {
  const { data, isLoading, isError } = useGetRelatedPosts(slug);

  const [paginatedData, setPaginatedData] = useState(data || []);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleRelatedView = () => {
    setIsExpanded(!isExpanded);
  };

  if (isLoading) return <div>Loading related posts...</div>;

  if (isError) return <div>Error loading related posts.{isError.message}</div>;

  return (
    <div className="">
      <div className="flex justify-center lg:py-4 py-2">
        <div className="relative">
          <Button
            onClick={handleToggleRelatedView}
            label={isExpanded ? "Hide Related Posts" : "Show Related Posts"}
            icon={isExpanded ? <FaEyeSlash /> : <FaEye />}
            variant={`${isExpanded ? "success" : "outline"}`}
          />
          <div
            className={`${
              isExpanded ? style.active : "white"
            } absolute w-8 h-8 border rounded-full border-gray-300 -top-5 -left-5 p-1 flex items-center justify-center`}
          >
            {data?.length > 0 ? data?.length : 0}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="lg:py-8 py-4">
          <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-8 gap-4">
            {paginatedData.length === 0 ? (
              <p className="flex justify-center col-span-12">
                No related post is available now! Try later.
              </p>
            ) : (
              paginatedData
                .slice(0, 3)
                .map((blog) => (
                  <RelatedBlogPostsCard
                    key={blog._id}
                    blog={blog}
                    user={user}
                  />
                ))
            )}
          </div>
          <div className="lg:p-8 pt-4">
            <AdminPagination
              items={data}
              onPaginatedDataChange={setPaginatedData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedBlogPosts;
