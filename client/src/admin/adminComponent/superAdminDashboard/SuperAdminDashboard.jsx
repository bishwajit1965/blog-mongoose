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

  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div className="">
      <AdminSubTitle subTitle="Super Admin dashboard" dataLength={len} />

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
