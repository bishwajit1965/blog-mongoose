import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AdminAuditLogContextProvider from "../admin/adminProviders/AdminAuditLogContextProvider";
import AdminAuthProvider from "../admin/adminProviders/AdminAuthProvider";
import AdminFlaggedPostContextProvider from "../admin/adminProviders/AdminFlaggedPostContextProvider";
import AdminMessageNotificationContextProvider from "../admin/adminProviders/AdminMessageNotificationContextProvider";
import AdminNotificationProvider from "../admin/adminProviders/AdminNotificationProvider";
import ArchivedBlogProvider from "../admin/adminProviders/ArchivedBlogProvider";
import AuthProvider from "./AuthProvider";
import AdminMessageProviders from "../admin/adminProviders/AdminMessageProviders";
import AdminDataProvider from "./AdminDataProvider";

const queryClient = new QueryClient();

const CombinedProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AdminAuthProvider>
        <AdminMessageNotificationContextProvider>
          <ArchivedBlogProvider>
            <AdminAuditLogContextProvider>
              <AdminFlaggedPostContextProvider>
                <AdminNotificationProvider>
                  <AdminMessageProviders>
                    <AdminDataProvider>{children}</AdminDataProvider>
                  </AdminMessageProviders>
                </AdminNotificationProvider>
              </AdminFlaggedPostContextProvider>
            </AdminAuditLogContextProvider>
          </ArchivedBlogProvider>
        </AdminMessageNotificationContextProvider>
      </AdminAuthProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default CombinedProviders;

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import AdminAuditLogContextProvider from "../admin/adminProviders/AdminAuditLogContextProvider";
// import AdminAuthProvider from "../admin/adminProviders/AdminAuthProvider";
// import AdminBlogProvider from "../admin/adminProviders/AdminBlogProvider";
// import AdminCategoryProvider from "../admin/adminProviders/AdminCategoryProvider";
// import AdminFlaggedPostContextProvider from "../admin/adminProviders/AdminFlaggedPostContextProvider";
// import AdminMessageNotificationContextProvider from "../admin/adminProviders/AdminMessageNotificationContextProvider";
// import AdminNotificationProvider from "../admin/adminProviders/AdminNotificationProvider";
// import AdminPermissionProvider from "../admin/adminProviders/AdminPermissionProvider";
// import AdminRoleProvider from "../admin/adminProviders/AdminRoleProvider";
// import AdminTagProvider from "../admin/adminProviders/AdminTagProvider";
// import AdminUserProvider from "../admin/adminProviders/AdminUserProvider";
// import ArchivedBlogProvider from "../admin/adminProviders/ArchivedBlogProvider";
// import AuthProvider from "./AuthProvider";
// import AdminMessageProviders from "../admin/adminProviders/AdminMessageProviders";

// const queryClient = new QueryClient();

// const CombinedProviders = ({ children }) => (
//   <AuthProvider>
//     <AdminAuthProvider>
//       <ArchivedBlogProvider>
//         <AdminAuditLogContextProvider>
//           <AdminMessageNotificationContextProvider>
//             <QueryClientProvider client={queryClient}>
//               <AdminFlaggedPostContextProvider>
//                 <AdminNotificationProvider>
//                   <AdminMessageProviders>
//                     <AdminRoleProvider>
//                       <AdminBlogProvider>
//                         <AdminPermissionProvider>
//                           <AdminCategoryProvider>
//                             <AdminUserProvider>
//                               <AdminTagProvider>{children}</AdminTagProvider>
//                             </AdminUserProvider>
//                           </AdminCategoryProvider>
//                         </AdminPermissionProvider>
//                       </AdminBlogProvider>
//                     </AdminRoleProvider>
//                   </AdminMessageProviders>
//                 </AdminNotificationProvider>
//               </AdminFlaggedPostContextProvider>
//             </QueryClientProvider>
//           </AdminMessageNotificationContextProvider>
//         </AdminAuditLogContextProvider>
//       </ArchivedBlogProvider>
//     </AdminAuthProvider>
//   </AuthProvider>
// );

// export default CombinedProviders;
