import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import { Helmet } from "react-helmet-async";

const ManageBlogPosts = () => {
  const len = 20;
  return (
    <div>
      <Helmet>
        <title>Blog || Manage Blog Posts</title>
      </Helmet>
      <AdminSubTitle subTitle="Manage Blog Posts" dataLength={len} />
      <div className="p-2">Manage Blog Posts</div>
    </div>
  );
};

export default ManageBlogPosts;
