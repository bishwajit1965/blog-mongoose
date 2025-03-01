import { FaEdit, FaEye } from "react-icons/fa";

import AdminPagination from "../../adminComponent/adminPagination/AdminPagination";
import CTAButton from "../../../components/buttons/CTAButton";
import { useState } from "react";

const ProfileTable = ({ profiles, onView, onEdit }) => {
  // Pagination state
  const [paginatedData, setPaginatedData] = useState(profiles || []);

  return (
    <div className="">
      <table className="min-w-full table table-xs dark:border-b-gray-700">
        <thead>
          <tr className="dark:border-gray-700 dark:text-gray-400 font-bold">
            <th>#</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="dark:hover:bg-gray-700 dark:hover:rounded-md dark:border-collapse">
          {paginatedData?.map((profile, index) => (
            <tr
              key={index}
              className="dark:hover:bg-gray-600 hover:bg-gray-100 dark:border-gray-700"
            >
              <td>{index + 1}</td>
              <td>
                <img
                  src={profile?.avatar}
                  alt="Avatar"
                  className="h-6 w-6 rounded-full"
                />
              </td>
              <td>{profile?.name}</td>
              <td>{profile?.email}</td>
              <td className="capitalize">
                {profile.roles?.map((role, index) => (
                  <span key={index}>{role.name}</span>
                ))}
              </td>
              <td className="flex justify-end space-x-1">
                <CTAButton
                  onClick={() => onView(profile)}
                  label="View"
                  icon={<FaEye />}
                  className="btn btn-xs text-xs"
                  variant="primary"
                />

                <CTAButton
                  onClick={() => onEdit(profile)}
                  label="Edit"
                  icon={<FaEdit />}
                  className="btn btn-xs text-xs"
                  variant="info"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <AdminPagination
        items={profiles}
        onPaginatedDataChange={setPaginatedData} // Directly update paginated data
      />
    </div>
  );
};

export default ProfileTable;
