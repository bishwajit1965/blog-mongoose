import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";

import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import axios from "axios";

const BlogPostStatisticsCard = () => {
  const [blogStats, setBlogStats] = useState(null);
  console.log("Blog status:", blogStats);
  useEffect(() => {
    const fetchBlogStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/blog/blog-status",
          { withCredentials: true }
        );
        setBlogStats(res.data);
      } catch (error) {
        console.error("Error fetching blog stats:", error);
      }
    };
    fetchBlogStats();
  }, []);

  if (!blogStats) return <p>Loading blog stats...</p>;

  // Data for Pie Chart (Published, Draft, Archived)
  const pieData = [
    {
      name: "Published Posts",
      value: blogStats.publishedPosts,
      color: "#4CAF50",
    },
    { name: "Draft Posts", value: blogStats.draftPosts, color: "#FF9800" },
    {
      name: "Archived Posts",
      value: blogStats.archivedPosts,
      color: "#F44336",
    },
  ];

  // Convert categoryWisePosts into an array for Bar Chart
  const categoryData = blogStats.categoryWisePosts.map((item) => ({
    category: item.categoryName, // Now showing category names instead of IDs
    count: item.count,
  }));

  return (
    <div className="lg:col-span-12 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle
        subTitle="Blog Posts"
        decoratedText="Statistics"
        dataLength={blogStats.totalPosts}
      />
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 rounded-md shadow-md">
        <div className="lg:col-span-6 col-span-12 border-r dark:border-gray-700">
          <h2 className="text-xl font-bold text-center my-2">
            Posts Statistics
          </h2>
          <div className="flex justify-center lg:col-span-6 col-span-12 rounded-md">
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        <div className="lg:col-span-6 col-span-12 border-l dark:border-gray-700">
          <h2 className="text-xl font-bold text-center my-2">
            Category Wise Posts Statistics
          </h2>
          <div className="flex justify-center lg:col-span-6 col-span-12 rounded-md">
            <BarChart width={500} height={300} data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#4CAF50" />
            </BarChart>
          </div>
        </div>
      </div>

      {/* Pie Chart for Published, Draft, Archived Posts */}
    </div>
  );
};

export default BlogPostStatisticsCard;
