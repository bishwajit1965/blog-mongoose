import AdminBlogProvider from "../admin/adminProviders/AdminBlogProvider";
import AdminCategoryProvider from "../admin/adminProviders/AdminCategoryProvider";
import AdminPermissionProvider from "../admin/adminProviders/AdminPermissionProvider";
import AdminRoleProvider from "../admin/adminProviders/AdminRoleProvider";
import AdminTagProvider from "../admin/adminProviders/AdminTagProvider";
import AdminUserProvider from "../admin/adminProviders/AdminUserProvider";

const AdminDataProvider = ({ children }) => {
  return (
    <AdminRoleProvider>
      <AdminPermissionProvider>
        <AdminUserProvider>
          <AdminBlogProvider>
            <AdminCategoryProvider>
              <AdminTagProvider>{children}</AdminTagProvider>
            </AdminCategoryProvider>
          </AdminBlogProvider>
        </AdminUserProvider>
      </AdminPermissionProvider>
    </AdminRoleProvider>
  );
};

export default AdminDataProvider;
