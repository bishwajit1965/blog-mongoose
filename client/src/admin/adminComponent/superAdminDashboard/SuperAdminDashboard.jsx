import {
  fetchRecentUsers,
  fetchUserStats,
} from "../../adminServices/adminStatsApiService";
import { useEffect, useState } from "react";

import AdminSubTitle from "../adminSubTitle/AdminSubTitle";
import AllStatisticsCard from "./AllStatisticsCard";
import AutoPublishNotification from "../autoPublishNotification/AutoPublishNotification";
import BlogPostStatisticsCard from "./BlogPostStatisticsCard";
import BlogStatisticsCard from "./BlogStatisticsCard";
import CategoryWiseBlogCard from "./CategoryWiseBlogCard";
import RecentUsersTableCard from "./RecentUsersTableCard";
import SuperAdminDashboardCard from "./SuperAdminDashboardCard";
import UserStatusCard from "./UserStatusCard";
import { io } from "socket.io-client";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import useAdminBlog from "../../adminHooks/useAdminBlog";
import useAdminCategory from "../../adminHooks/useAdminCategory";
import useAdminPermission from "../../adminHooks/useAdminPermission";
import useAdminRole from "../../adminHooks/useAdminRole";
import useAdminTag from "../../adminHooks/useAdminTag";
import useAdminUser from "../../adminHooks/useAdminUser";

const socket = io("http://localhost:3000", { withCredentials: true });

// import api from "../path-to-axios-instance";

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

  useEffect(() => {
    if (users && users.length > 0) {
      users.forEach((user) => {
        if (user._id) {
          socket.emit("user-online", user._id); // Emit for each user
        }
      });
    }
  }, [users]); // Trigger this effect whenever the users list changes

  const [userStats, setUserStats] = useState(null);
  const [recentUsers, setRecentUsers] = useState([]);

  console.log("Users SADB", recentUsers);
  useEffect(() => {
    const getStats = async () => {
      try {
        const [stats, users] = await Promise.all([
          fetchUserStats(),
          fetchRecentUsers(),
        ]);
        setUserStats(stats);
        setRecentUsers(users);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    getStats();
  }, []);

  // Coming soon / scheduled post publish auto notification alert
  useEffect(() => {
    socket.on("publish-alert", (message) => {
      alert(message);
    });

    return () => {
      socket.off("publish-alert");
    };
  }, []);

  console.log("User status:", userStats);
  console.log("Recent users:", recentUsers);

  const len = 20;
  const { loading, isAuthenticated, adminData } = useAdminAuth();
  return (
    <div className="">
      <AdminSubTitle
        subTitle="Super Admin"
        decoratedText="Dashboard"
        dataLength={len}
      />

      {/* Framer Motion Auto Publish Notification */}
      <AutoPublishNotification />

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

        {userStats && <UserStatusCard userStats={userStats} />}

        {recentUsers.length > 0 && (
          <RecentUsersTableCard recentUsers={recentUsers} />
        )}
        <BlogPostStatisticsCard />
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
