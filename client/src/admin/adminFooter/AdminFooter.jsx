const AdminFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="p-2 text-center bg-base-300 dark:bg-gray-800 dark:text-gray-400">
      {currentYear} &copy; All rights reserved.
    </div>
  );
};

export default AdminFooter;
