import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import { Helmet } from "react-helmet-async";
import useAdminAuditLog from "../../adminHooks/useAdminAuditLog";
import { useState } from "react";

const ManageAuditLogsReview = () => {
  const { auditLogs } = useAdminAuditLog();
  const [paginatedData, setPaginatedData] = useState(auditLogs || []);

  console.log("Audit logs", auditLogs);
  return (
    <div>
      <Helmet>
        <title>Super Admin || Review Logs</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Review Logs of"
        decoratedText="Flagged Blog Posts"
        dataLength={auditLogs?.length > 0 ? auditLogs?.length : "0"}
      />
      <div className="overflow-x-auto shadow-md rounded-b-md">
        <table className="w-full table table-xs border-collapse">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700">
              <th className="p-2 border dark:border-gray-700">#</th>
              <th className="p-2 border dark:border-gray-700">Action</th>
              <th className="p-2 border dark:border-gray-700">Post Title</th>
              <th className="p-2 border dark:border-gray-700">Mod Comment</th>
              <th className="p-2 border dark:border-gray-700">Moderator</th>
              <th className="p-2 border dark:border-gray-700">Status Change</th>
              <th className="p-2 border dark:border-gray-700">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((log, index) => (
              <tr
                key={log._id}
                className="border-t dark:border-gray-700 hover:bg-gray-100 hover:text-gray-950"
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">
                  {(log?.postId?.flaggedTitle || "—").slice(0, 40)}...
                </td>
                <td className="p-2">{log?.comment}</td>
                <td className="p-2">{log.moderatorId?.name}</td>
                <td className="p-2">
                  {log.statusChange?.oldStatus} → {log.statusChange?.newStatus}
                </td>
                <td className="p-2">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="py-4">
          <AdminPagination
            items={auditLogs}
            onPaginatedDataChange={setPaginatedData} // Directly update paginated data
          />
        </div>
      </div>
    </div>
  );
};

export default ManageAuditLogsReview;
