// src/admin/adminProviders/groups/AdminDataProviders.jsx
import ArchivedBlogProvider from "../data/ArchivedBlogProvider";
import AdminAuditLogContextProvider from "../data/AdminAuditLogContextProvider";
import AdminFlaggedPostContextProvider from "../data/AdminFlaggedPostContextProvider";
import AdminUserProvider from "../data/AdminUserProvider";
import AdminBlogProvider from "../data/AdminBlogProvider";
import AdminCategoryProvider from "../data/AdminCategoryProvider";
import AdminTagProvider from "../data/AdminTagProvider";

const AdminDataProviders = ({ children }) => {
  return (
    <ArchivedBlogProvider>
      <AdminAuditLogContextProvider>
        <AdminFlaggedPostContextProvider>
          <AdminUserProvider>
            <AdminBlogProvider>
              <AdminCategoryProvider>
                <AdminTagProvider>{children}</AdminTagProvider>
              </AdminCategoryProvider>
            </AdminBlogProvider>
          </AdminUserProvider>
        </AdminFlaggedPostContextProvider>
      </AdminAuditLogContextProvider>
    </ArchivedBlogProvider>
  );
};

export default AdminDataProviders;
