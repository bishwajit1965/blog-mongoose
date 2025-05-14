import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";
import { Link } from "react-router-dom";
import useGetNotices from "../../hooks/useGetNotices";

const MarqueeNotification = () => {
  const { data, isPending, isError } = useGetNotices();

  if (isPending) return <AdminLoader />;
  if (isError)
    return <div className="flex justify-center">{isError.message}</div>;
  return (
    <div>
      {data.notifications.map((notice) => (
        <span key={notice._id} className="text-sm px-4">
          <Link to="/notice">{notice.title}</Link>
        </span>
      ))}
    </div>
  );
};

export default MarqueeNotification;
