const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="p-2 text-center bg-base-300 dark:bg-gray-800 dark:text-gray-400 border-t border-base-200 dark:border-gray-700">
      {currentYear} &copy; All rights reserved.
    </div>
  );
};

export default Footer;
