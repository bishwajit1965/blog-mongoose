import { useEffect, useState } from "react";
import FollowerCard from "../../adminComponent/followerCard/FollowerCard";
import TableDataNotFound from "../../ui/TableDataNotFound";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";

const FollowersPage = ({ followers }) => {
  // Pagination state
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setPaginatedData(followers);
  }, [followers]);

  return (
    <>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {paginatedData?.length > 0 ? (
          paginatedData?.map((follower) => (
            <FollowerCard key={follower?._id} follower={follower} />
          ))
        ) : (
          <TableDataNotFound />
        )}
      </div>
      {/* Pagination */}
      <AdminPagination
        items={followers}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </>
  );
};

export default FollowersPage;
