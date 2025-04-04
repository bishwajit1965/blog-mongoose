import { motion } from "framer-motion";

const AdminNotificationDisplay = ({ notifications }) => {
  // Mapping notification types to corresponding background colors
  const notificationStyles = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };
  return (
    <div className="fixed top-5 right-5 z-50 space-y-2">
      {notifications.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          // className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg"
          className={`${
            notificationStyles[msg.type] || notificationStyles.success
          } text-white px-4 py-2 rounded-lg shadow-lg`}
        >
          {msg}
        </motion.div>
      ))}
    </div>
  );
};

export default AdminNotificationDisplay;
