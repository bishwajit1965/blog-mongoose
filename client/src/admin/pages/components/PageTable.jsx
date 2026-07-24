import CTAButton from "../../../components/buttons/CTAButton";
import AdminLoader from "../../adminComponent/adminLoader/AdminLoader";
import { LucideIcon } from "../../lib/LucideIcons";
import TableDataNotFound from "../../ui/TableDataNotFound";

const PageTable = ({
  loading,
  pages,
  onView,
  handleSelectPageEdit,
  onSelectSoftDelete,
}) => {
  return (
    <div>
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
            {pages?.length > 0 ? (
              pages?.map((page, index) => (
                <tr key={page?._id}>
                  <th>{index + 1}</th>
                  <td>{page?.title}</td>
                  <td>{page?.slug}</td>
                  <td>{page?.status}</td>
                  <td>{page?.pageType}</td>

                  <td className="flex flex-wrap">
                    <CTAButton
                      onClick={() => onView(page)}
                      variant="primary"
                      icon={<LucideIcon.Eye size={14} />}
                      size="xs"
                      label="View"
                    />

                    <CTAButton
                      onClick={() => handleSelectPageEdit(page)}
                      variant="success"
                      icon={<LucideIcon.Edit size={14} />}
                      size="xs"
                      label="Edit"
                    />

                    <CTAButton
                      onClick={() => onSelectSoftDelete(page)}
                      variant="danger"
                      icon={<LucideIcon.Trash2 size={14} />}
                      size="xs"
                      label="Soft-Del"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={6} className="text-center bg-gray-100 py-4">
                  <TableDataNotFound table="In Pages Table • " />
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
      </div>
    </div>
  );
};

export default PageTable;
