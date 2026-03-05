import { Helmet } from "react-helmet-async";
import { useState } from "react";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import useAdminContactMessages from "../../adminHooks/useAdminContactMessages";
import dateFormatter from "../../../utils/dateFormatter";
import { textShortener } from "../../../hooks/useHelpers";
import { updateContactStatus } from "../../adminServices/contactService";
import {
  notifyError,
  notifySuccess,
} from "../../adminComponent/adminToastNotification/AdminToastNotification";
import { Eye, Check, RefreshCcw } from "lucide-react";

// Modal component
const MessageModal = ({ isOpen, onClose, message }) => {
  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl max-w-lg w-full shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Message Details</h2>
        <p>
          <strong>Name:</strong> {message.name || "—"}
        </p>
        <p>
          <strong>Email:</strong> {message.email || "—"}
        </p>
        <p>
          <strong>Status:</strong> {message.status}
        </p>
        <p>
          <strong>Created At:</strong>{" "}
          {dateFormatter(new Date(message.createdAt))}
        </p>
        <p className="mt-4 whitespace-pre-wrap">
          <strong>Message:</strong> {message.message}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const ManageMessages = () => {
  const { messages, setMessages } = useAdminContactMessages();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const response = await updateContactStatus(id, newStatus);
      if (response.success) {
        setMessages((prev) =>
          prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
        );
        notifySuccess(`Message status updated to "${newStatus}"`);
      }
    } catch (error) {
      console.error("Error updating message status", error);
      notifyError("Failed to update status");
    }
  };

  const openModal = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Helmet>
        <title>Blog || Manage Messages</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Manage"
        decoratedText="Messages"
        dataLength={messages ? messages.length : 0}
      />
      <div className="p-2">
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>CreatedAt</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages && messages.length > 0 ? (
                messages.map((message, idx) => (
                  <tr key={message._id}>
                    <th>{idx + 1}</th>
                    <td>{message.name || "—"}</td>
                    <td>{message.email || "—"}</td>
                    <td>{textShortener(message.message, 50)}</td>
                    <td className="capitalize">
                      {message.status === "new" && (
                        <span className="text-xs">🟡 {message.status}</span>
                      )}
                      {message.status === "read" && (
                        <span className="text-xs">🔵 {message.status}</span>
                      )}
                      {message.status === "resolved" && (
                        <span className="text-xs">🟢 {message.status}</span>
                      )}
                    </td>
                    <td>{dateFormatter(new Date(message.createdAt))}</td>
                    <td className="flex flex-wrap gap-1">
                      <button
                        onClick={() => openModal(message)}
                        className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 flex items-center gap-1"
                      >
                        <Eye size={16} /> View
                      </button>

                      {message.status === "new" && (
                        <>
                          <button
                            onClick={() =>
                              handleUpdateStatus(message._id, "read")
                            }
                            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                          >
                            <Eye size={16} /> Mark as Read
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateStatus(message._id, "resolved")
                            }
                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                          >
                            <Check size={16} /> Resolve
                          </button>
                        </>
                      )}

                      {message.status === "read" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(message._id, "resolved")
                          }
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1"
                        >
                          <Check size={16} /> Resolve
                        </button>
                      )}

                      {message.status === "resolved" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(message._id, "read")
                          }
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
                        >
                          <RefreshCcw size={16} /> Re-Open
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan={7}>No messages available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      <MessageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        message={selectedMessage}
      />
    </div>
  );
};

export default ManageMessages;

// import { Helmet } from "react-helmet-async";
// import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
// import useAdminContactMessages from "../../adminHooks/useAdminContactMessages";
// import dateFormatter from "../../../utils/dateFormatter";
// import { textShortener } from "../../../hooks/useHelpers";
// import { updateContactStatus } from "../../adminServices/contactService";
// import {
//   notifyError,
//   notifySuccess,
// } from "../../adminComponent/adminToastNotification/AdminToastNotification";
// import { Eye, Check, RefreshCcw } from "lucide-react";

// const ManageMessages = () => {
//   const { messages, setMessages } = useAdminContactMessages();

//   // Unified status update function
//   const handleUpdateStatus = async (id, newStatus) => {
//     try {
//       const response = await updateContactStatus(id, newStatus);
//       if (response.success) {
//         setMessages((prev) =>
//           prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m)),
//         );
//         notifySuccess(`Message status updated to "${newStatus}"`);
//       }
//     } catch (error) {
//       console.error("Error updating message status", error);
//       notifyError("Failed to update status");
//     }
//   };

//   return (
//     <div>
//       <Helmet>
//         <title>Blog || Manage Messages</title>
//       </Helmet>
//       <AdminSubTitle
//         subTitle="Manage"
//         decoratedText="Messages"
//         dataLength={messages ? messages.length : 0}
//       />
//       <div className="p-2">
//         <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>CreatedAt</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {messages && messages.length > 0 ? (
//                 messages.map((message, idx) => (
//                   <tr key={message._id}>
//                     <th>{idx + 1}</th>
//                     <td>{message.name || "—"}</td>
//                     <td>{message.email || "—"}</td>
//                     <td>{textShortener(message.message, 50)}</td>
//                     <td className="capitalize">
//                       {message.status === "new" && (
//                         <span className="text-xs">🟡 {message.status}</span>
//                       )}
//                       {message.status === "read" && (
//                         <span className="text-xs">🔵 {message.status}</span>
//                       )}
//                       {message.status === "resolved" && (
//                         <span className="text-xs">🟢 {message.status}</span>
//                       )}
//                     </td>
//                     <td>{dateFormatter(new Date(message.createdAt))}</td>
//                     <td className="flex flex-wrap gap-1">
//                       {message.status === "new" && (
//                         <>
//                           <button
//                             onClick={() =>
//                               handleUpdateStatus(message._id, "read")
//                             }
//                             className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
//                           >
//                             <Eye size={16} /> Mark as Read
//                           </button>
//                           <button
//                             onClick={() =>
//                               handleUpdateStatus(message._id, "resolved")
//                             }
//                             className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1"
//                           >
//                             <Check size={16} /> Resolve
//                           </button>
//                         </>
//                       )}

//                       {message.status === "read" && (
//                         <button
//                           onClick={() =>
//                             handleUpdateStatus(message._id, "resolved")
//                           }
//                           className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 flex items-center gap-1"
//                         >
//                           <Check size={16} /> Resolve
//                         </button>
//                       )}

//                       {message.status === "resolved" && (
//                         <button
//                           onClick={() =>
//                             handleUpdateStatus(message._id, "read")
//                           }
//                           className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 flex items-center gap-1"
//                         >
//                           <RefreshCcw size={16} /> Re-Open
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr className="text-center">
//                   <td colSpan={7}>No messages available</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageMessages;

// import { Helmet } from "react-helmet-async";
// import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
// import useAdminContactMessages from "../../adminHooks/useAdminContactMessages";
// import dateFormatter from "../../../utils/dateFormatter";
// import { textShortener } from "../../../hooks/useHelpers";
// import { updateContactStatus } from "../../adminServices/contactService";
// import {
//   notifyError,
//   notifySuccess,
// } from "../../adminComponent/adminToastNotification/AdminToastNotification";
// import { Eye } from "lucide-react";

// const ManageMessages = () => {
//   const { messages, setMessages } = useAdminContactMessages();
//   console.log("Messages", messages);

//   // Mark message as read
//   const handleMarkRead = async (id) => {
//     try {
//       const response = await updateContactStatus(id, "read");
//       if (response.success) {
//         setMessages((prev) =>
//           prev.map((c) => (c._id === id ? { ...c, status: "read" } : c)),
//         );
//         notifySuccess("Message marked as read");
//       }
//     } catch (error) {
//       console.error("Error updating message status", error);
//       notifyError("Failed to update status");
//     }
//   };
//   return (
//     <div>
//       <Helmet>
//         <title>Blog || Manage Blog Posts</title>
//       </Helmet>
//       <AdminSubTitle
//         subTitle="Manage"
//         decoratedText="Messages"
//         dataLength={messages ? messages?.length : 0}
//       />
//       <div className="p-2">
//         <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
//           <table className="table">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>CreatedAt</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {messages && messages.length > 0 ? (
//                 messages?.map((message, idx) => (
//                   <tr key={message._id}>
//                     <th>{idx + 1}</th>
//                     <td>{message.name}</td>
//                     <td>{message.email}</td>
//                     <td>{textShortener(message.message, 50)}</td>
//                     <td className="capitalize">
//                       {message.status === "new" ? (
//                         <span className="text-xs">🟡{message.status}</span>
//                       ) : message.status === "read" ? (
//                         <span className="text-xs">🔵 {message.status}</span>
//                       ) : (
//                         <span className="text-xs">🟢 {message.status}</span>
//                       )}
//                     </td>
//                     <td>{dateFormatter(new Date(message.createdAt))}</td>
//                     <td>
//                       {message.status === "new" && (
//                         <button
//                           onClick={() => handleMarkRead(message._id)}
//                           className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
//                         >
//                           <Eye size={18} /> Mark as Read
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr className="text-center">
//                   <td colSpan={6}>No data FaCloudSunRain</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageMessages;
