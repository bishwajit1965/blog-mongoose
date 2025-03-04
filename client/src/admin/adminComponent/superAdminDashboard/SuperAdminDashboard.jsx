import {
  Bar,
  BarChart,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import AdminSubTitle from "../adminSubTitle/AdminSubTitle";
import AllStatisticsCard from "./AllStatisticsCard";
import BlogStatisticsCard from "./BlogStatisticsCard";
import CategoryWiseBlogCard from "./CategoryWiseBlogCard";
import SuperAdminDashboardCard from "./SuperAdminDashboardCard";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminBlog from "../../adminHooks/useAdminBlog";
import useAdminCategory from "../../adminHooks/useAdminCategory";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import useAdminTag from "../../adminHooks/useAdminTag";
import useAdminUser from "../../adminHooks/useAdminUser";

const SuperAdminDashboard = () => {
  const { blogs } = useAdminBlog();
  const { categories } = useAdminCategory();
  const { users } = useAdminUser();
  const { permissions } = useAdminPermission();
  const { roles } = useAdminRole();
  const { tags } = useAdminTag();

  const totalBlogs = blogs.length || 0;
  const totalCategories = categories.length || 0;
  const totalUsers = users.length || 0;
  const totalPermissions = permissions.length || 0;
  const totalRoles = roles.length || 0;
  const totalTags = tags.length || 0;

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

  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div className="">
      <AdminSubTitle subTitle="Super Admin dashboard" dataLength={len} />
      <div className="p-2">
        <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-center">
          <div className="lg:col-span-6 col-span-12">
            {/* Blog Categories Bar Chart */}
            <div className="bg-white p-4 shadow-md rounded-lg">
              <h3 className="text-xl font-bold mb-2">Posts by Category</h3>
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
          <div className="lg:col-span-6 col-span-12 shadow-md rounded-lg">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
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
      </div>

      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between gap-4 p-2">
        <SuperAdminDashboardCard
          isAuthenticated={isAuthenticated}
          adminData={adminData}
          loading={loading}
        />
        <AllStatisticsCard
          blogs={blogs}
          totalBlogs={totalBlogs}
          categories={categories}
          totalCategories={totalCategories}
          permissions={permissions}
          totalPermissions={totalPermissions}
          roles={roles}
          totalRoles={totalRoles}
          tags={tags}
          totalTags={totalTags}
          users={users}
          totalUsers={totalUsers}
        />
        <BlogStatisticsCard blogs={blogs} totalBlogs={totalBlogs} />
        <CategoryWiseBlogCard blogs={blogs} totalBlogs={totalBlogs} />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
