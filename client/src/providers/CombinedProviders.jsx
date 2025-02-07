import AdminAuthProvider from "../admin/adminProviders/AdminAuthProvider";
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
        <AdminPermissionProvider>
          <AdminCategoryProvider>
            <AdminUserProvider>
              <AdminTagProvider>{children}</AdminTagProvider>
            </AdminUserProvider>
          </AdminCategoryProvider>
        </AdminPermissionProvider>
      </AdminRoleProvider>
    </AuthProvider>
  </AdminAuthProvider>
);

export default CombinedProviders;
