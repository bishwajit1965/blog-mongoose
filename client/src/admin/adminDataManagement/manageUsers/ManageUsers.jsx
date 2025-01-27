import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaHome } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
  return (
    <div>
      <Helmet>
        <title>Blog || Manage Users</title>
      </Helmet>
      <AdminSubTitle
        link="/admin/admin-home-dashboard"
        navigationButton={
          <CTAButton
            label="Admin Dashboard"
            icon={<FaHome />}
            variant="light"
          />
        }
        dataLength={length}
        subTitle="Manage"
        decoratedText="Users"
      />
      <div className="p-2">ManageUsers</div>
    </div>
  );
};

export default ManageUsers;
