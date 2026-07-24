import { useState } from "react";
import CTAButton from "../../components/buttons/CTAButton";
import AdminPagination from "../adminComponent/adminPagination/AdminPagination";
import { LucideIcon } from "../lib/LucideIcons";
import TableDataNotFound from "../ui/TableDataNotFound";
import AdminLoader from "../adminComponent/adminLoader/AdminLoader";

const PageTrash = ({
  loading,
  softDeletedPages,
  onView,
  onSelectRestore,
  onSelectPageHardDelete,
}) => {
  // Pagination state
  const [paginatedData, setPaginatedData] = useState(softDeletedPages || []);
  return (
    <div className="">
      {loading && <AdminLoader />}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Type</th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length > 0 ? (
              paginatedData?.map((page, index) => (
                <tr key={page?._id}>
                  <th>{index + 1}</th>
                  <td className="break-after-right">{page?.title}</td>
                  <td>{page?.slug}</td>
                  <td>{page?.status}</td>
                  <td>{page?.pageType}</td>

                  <td className="flex flex-wrap">
                    <CTAButton
                      type="submit"
                      onClick={() => onView(page)}
                      variant="primary"
                      icon={<LucideIcon.Eye size={14} />}
                      size="xs"
                      label="View"
                    />

                    <CTAButton
                      type="submit"
                      onClick={() => onSelectRestore(page)}
                      variant="success"
                      icon={<LucideIcon.ArchiveRestore size={14} />}
                      size="xs"
                      label="Restore"
                    />

                    <CTAButton
                      type="submit"
                      onClick={() => onSelectPageHardDelete(page)}
                      variant="danger"
                      icon={<LucideIcon.Trash2 size={14} />}
                      size="xs"
                      label="Per-Del"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={6} className="text-center bg-gray-100 py-4">
                  <TableDataNotFound table="In Archived Pages Table • " />
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Status</th>
              <th>Type</th>
              <th> Actions</th>
            </tr>
          </tfoot>
        </table>

        {/* Pagination */}
        <AdminPagination
          items={softDeletedPages}
          onPaginatedDataChange={setPaginatedData} // Directly update paginated data
        />
      </div>
    </div>
  );
};

export default PageTrash;
