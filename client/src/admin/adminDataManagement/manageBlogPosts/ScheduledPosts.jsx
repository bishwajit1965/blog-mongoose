import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import { Helmet } from "react-helmet-async";

const ScheduledPosts = () => {
  return (
    <div>
      <Helmet>
        <title>Super Admin || Scheduled Posts</title>
      </Helmet>
      <AdminSubTitle
        subTitle="Scheduled"
        decoratedText="Blog Posts"
        dataLength={0}
      />
      <div className="p-2">ScheduledPosts</div>
    </div>
  );
};

export default ScheduledPosts;
