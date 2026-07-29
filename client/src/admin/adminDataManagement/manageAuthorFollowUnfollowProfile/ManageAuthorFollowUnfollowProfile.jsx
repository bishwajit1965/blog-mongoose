import useApiQuery from "../../../hooks/useApiQuery";
import {
  getAllFollowers,
  getAllFollowing,
} from "../../adminServices/authorFollowUnfollowService";
import FollowersPage from "./FollowersPage";
import useAdminAuth from "../../adminHooks/useAdminAuth";
import CTAButton from "../../../components/buttons/CTAButton";
import { FaHome } from "react-icons/fa";
import AdminSubTitle from "../../adminComponent/adminSubTitle/AdminSubTitle";
import FollowingPage from "./FollowingPage";
import { LucideList } from "lucide-react";

const ManageAuthorFollowUnfollowProfile = () => {
  const { adminData } = useAdminAuth();
  const adminId = adminData?.user?._id;
  console.log("Admin Data", adminData?.user?._id);

  const { data: followersData } = useApiQuery({
    key: "followers",
    params: { adminId },
    enabled: !!adminId,
    fetcher: () => getAllFollowers(adminId),
  });

  const { data: followingData } = useApiQuery({
    key: "following",
    params: { adminId },
    enabled: !!adminId,
    fetcher: () => getAllFollowing(adminId),
  });

  const followers = followersData?.followers ?? [];
  const following = followingData?.following ?? [];

  return (
    <div className="">
      <AdminSubTitle
        link="/super-admin/super-admin-dashboard"
        navigationButton={
          <CTAButton
            label="Super Admin Dashboard"
            icon={<FaHome />}
            variant="light"
          />
        }
        dataLength={followers?.length}
        subTitle="Followers & Following"
        decoratedText="List"
      />
      <div className="lg:space-y-10 space-y-5 p-4">
        <div className="space-y-2">
          <h1 className="lg:text-xl text-medium font-bold flex items-center gap-2">
            <LucideList /> Followers List
          </h1>
          <FollowersPage followers={followers} />
        </div>
        <div className="space-y-2">
          <h1 className="lg:text-xl text-medium font-bold flex items-center gap-2">
            <LucideList /> Following List
          </h1>
          <FollowingPage following={following} />
        </div>
      </div>
    </div>
  );
};

export default ManageAuthorFollowUnfollowProfile;
