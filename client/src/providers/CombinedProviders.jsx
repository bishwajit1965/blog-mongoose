import AdminAuthProvider from "../admin/adminProviders/AdminAuthProvider";
import AdminBlogProvider from "../admin/adminProviders/AdminBlogProvider";
import AdminCategoryProvider from "../admin/adminProviders/AdminCategoryProvider";
import AdminNotificationProvider from "../admin/adminProviders/AdminNotificationProvider";
import AdminPermissionProvider from "../admin/adminProviders/AdminPermissionProvider";
import AdminRoleProvider from "../admin/adminProviders/AdminRoleProvider";
import AdminTagProvider from "../admin/adminProviders/AdminTagProvider";
import AdminUserProvider from "../admin/adminProviders/AdminUserProvider";
import ArchivedBlogProvider from "../admin/adminProviders/ArchivedBlogProvider";
import AuthProvider from "./AuthProvider";

const CombinedProviders = ({ children }) => (
  <AuthProvider>
    <AdminAuthProvider>
      <ArchivedBlogProvider>
        <AdminNotificationProvider>
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
        </AdminNotificationProvider>
      </ArchivedBlogProvider>
    </AdminAuthProvider>
  </AuthProvider>
);

export default CombinedProviders;
