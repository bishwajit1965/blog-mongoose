import AdminAuditLogContextProvider from "./AdminAuditLogContextProvider";
import AdminBlogProvider from "./AdminBlogProvider";
import AdminCategoryProvider from "./AdminCategoryProvider";
import AdminFlaggedPostContextProvider from "./AdminFlaggedPostContextProvider";
import AdminMessageNotificationContextProvider from "./AdminMessageNotificationContextProvider";
import AdminMessageProviders from "./AdminMessageProviders";
import AdminNotificationProvider from "./AdminNotificationProvider";
import AdminPermissionProvider from "./AdminPermissionProvider";
import AdminRoleProvider from "./AdminRoleProvider";
import AdminTagProvider from "./AdminTagProvider";
import AdminUserProvider from "./AdminUserProvider";
import ArchivedBlogProvider from "./ArchivedBlogProvider";

const AdminDataProvider = ({ children }) => {
  return (
    <AdminRoleProvider>
      <AdminPermissionProvider>
        <AdminMessageNotificationContextProvider>
          <ArchivedBlogProvider>
            <AdminAuditLogContextProvider>
              <AdminFlaggedPostContextProvider>
                <AdminNotificationProvider>
                  <AdminMessageProviders>
                    <AdminUserProvider>
                      <AdminBlogProvider>
                        <AdminCategoryProvider>
                          <AdminTagProvider>{children}</AdminTagProvider>
                        </AdminCategoryProvider>
                      </AdminBlogProvider>
                    </AdminUserProvider>
                  </AdminMessageProviders>
                </AdminNotificationProvider>
              </AdminFlaggedPostContextProvider>
            </AdminAuditLogContextProvider>
          </ArchivedBlogProvider>
        </AdminMessageNotificationContextProvider>
      </AdminPermissionProvider>
    </AdminRoleProvider>
  );
};

export default AdminDataProvider;
