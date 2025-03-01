import AdminAuthProvider from "../admin/adminProviders/AdminAuthProvider";
import AdminBlogProvider from "../admin/adminProviders/AdminBlogProvider";
import AdminCategoryProvider from "../admin/adminProviders/AdminCategoryProvider";
import AdminPermissionProvider from "../admin/adminProviders/AdminPermissionProvider";
import AdminRoleProvider from "../admin/adminProviders/AdminRoleProvider";
import AdminTagProvider from "../admin/adminProviders/AdminTagProvider";
import AdminUserProvider from "../admin/adminProviders/AdminUserProvider";
import AuthProvider from "./AuthProvider";

const CombinedProviders = ({ children }) => (
  <AdminAuthProvider>
    <AuthProvider>
      <AdminRoleProvider>
        <AdminBlogProvider>
          <AdminPermissionProvider>
            <AdminCategoryProvider>
              <AdminUserProvider>
                <AdminTagProvider>{children}</AdminTagProvider>
              </AdminUserProvider>
            </AdminCategoryProvider>
          </AdminPermissionProvider>
        </AdminBlogProvider>
      </AdminRoleProvider>
    </AuthProvider>
  </AdminAuthProvider>
);

export default CombinedProviders;
