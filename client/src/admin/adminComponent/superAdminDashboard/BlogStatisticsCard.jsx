import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";

const BlogStatisticsCard = ({ blogs, totalBlogs }) => {
  // Count blogs per category
  const categoryCount = blogs.reduce((acc, blog) => {
    const categoryName = blog.category.name;
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {});

  // Convert to array format for the chart
  const chartData = Object.entries(categoryCount).map(([name, count]) => ({
    name,
    count, // This will be used as the bar height
  }));
  return (
    <>
      <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <AdminCardTitle
          subTitle="Category-wise"
          decoratedText="Blog Posts"
          dataLength={totalBlogs}
        />

        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default BlogStatisticsCard;
