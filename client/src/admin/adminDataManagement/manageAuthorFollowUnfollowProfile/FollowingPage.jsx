import { useEffect, useState } from "react";
import FollowingCard from "../../adminComponent/followingCard/FollowingCard";
import TableDataNotFound from "../../ui/TableDataNotFound";
import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";

const FollowingPage = ({ following }) => {
  // Pagination state
  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    setPaginatedData(following);
  }, [following]);
  return (
    <>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {" "}
        {paginatedData?.length > 0 ? (
          paginatedData?.map((following) => (
            <FollowingCard key={following?._id} following={following} />
          ))
        ) : (
          <TableDataNotFound />
        )}{" "}
      </div>

      {/* Pagination */}
      <AdminPagination
        items={following}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </>
  );
};

export default FollowingPage;
