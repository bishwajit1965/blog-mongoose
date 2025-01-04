const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="p-2 text-center bg-base-300">
      {currentYear} &copy; All rights reserved.
    </div>
  );
};

export default Footer;
