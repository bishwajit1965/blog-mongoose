import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";

const CategoryWiseBlogCard = ({ blogs, totalBlogs }) => {
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
    <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle
        subTitle="Category-wise"
        decoratedText="Blog Posts"
        dataLength={totalBlogs}
      />
      <div className="h-[340px] p-4 dark:bg-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={340}>
            <Pie
              dataKey="count"
              startAngle={180}
              endAngle={0}
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryWiseBlogCard;
