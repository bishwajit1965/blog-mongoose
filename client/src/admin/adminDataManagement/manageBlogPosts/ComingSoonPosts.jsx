import { useEffect, useState } from "react";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import ComingSoonModal from "./ComingSoonModal";
import { FaEye } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import api from "../../adminServices/api";

const ComingSoonPosts = () => {
  const [selectedComingSoonBlog, setSelectedComingSoonBlog] = useState(null);
  const [comingSoonPosts, setComingSoonPosts] = useState([]);

  // Pagination state
  const [paginatedData, setPaginatedData] = useState(comingSoonPosts || []);
  useEffect(() => {
    setPaginatedData(comingSoonPosts);
  }, [comingSoonPosts]);

  useEffect(() => {
    const fetchComingSoonPosts = async () => {
      const posts = await api.get("/posts/coming-soon");
      setComingSoonPosts(posts.data);
    };
    fetchComingSoonPosts();
  }, []);
  console.log("Coming soon posts:", comingSoonPosts);

  // Update the timer every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setComingSoonPosts((prevPosts) =>
        prevPosts.map((post) => ({
          ...post,
          remainingTime: getTimeRemaining(post.publishAt),
        }))
      );
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const getTimeRemaining = (publishAt) => {
    const publishDate = new Date(publishAt).getTime();
    const now = new Date().getTime();
    const distance = publishDate - now;

    if (distance <= 0) {
      return "Published";
    }

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${hours}:${minutes}:${seconds}`;
  };
  return (
    <div>
      <Helmet>
        <title>Super Admin || Coming Soon Posts</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Coming Soon"
        decoratedText="Blog Posts"
        dataLength={comingSoonPosts?.length > 0 ? comingSoonPosts?.length : "0"}
      />
      <div className="container mx-auto p-2">
        <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-base-300 dark:bg-gray-700 dark:text-white">
              <tr>
                <th className="py-3 px-4 text-left">Post Title</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Publish At</th>
                <th className="py-3 px-4 text-left">Timer</th>
                <th className="py-3 px-4 text-left">View Blog</th>
              </tr>
            </thead>
            <tbody className="dark:bg-gray-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="py-3 px-4">{post.title}</td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-semibold text-sm">
                        {post.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(post.publishAt).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="timer text-lg font-bold">
                        {getTimeRemaining(post.publishAt)}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      <CTAButton
                        onClick={() => setSelectedComingSoonBlog(post)}
                        label="View"
                        icon={<FaEye />}
                        className="btn btn-sm text-sm"
                        variant="primary"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="pt-7 text-center text-md font-semibold text-red-600"
                  >
                    No Coming soon post is available at this moment!
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="py-4">
            <AdminPagination
              items={comingSoonPosts}
              onPaginatedDataChange={setPaginatedData} // Directly update paginated data
            />
          </div>

          {/* User Modal */}
          <ComingSoonModal
            blog={selectedComingSoonBlog}
            onClose={() => setSelectedComingSoonBlog(null)}
          />
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPosts;
