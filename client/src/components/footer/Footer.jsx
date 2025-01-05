const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="p-2 text-center bg-base-300 dark:bg-gray-800 border-t dark:border-t-slate-600 dark:text-gray-400">
      {currentYear} &copy; All rights reserved.
    </div>
  );
};

export default Footer;
