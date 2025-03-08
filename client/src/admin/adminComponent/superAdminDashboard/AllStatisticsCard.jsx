import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";

const AllStatisticsCard = ({
  totalBlogs,
  categories,
  totalCategories,
  permissions,
  totalPermissions,
  roles,
  totalRoles,
  tags,
  totalTags,
  users,
  totalUsers,
}) => {
  return (
    <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle subTitle="Summary" decoratedText="Section" />

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>Items</th>
              <th>Name</th>
              <th className="pr-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-bold">Blogs: </td>
              <td>Blogs data...</td>
              <td className="flex justify-end">{totalBlogs}</td>
            </tr>
            <tr>
              <td className="font-bold">Categories: </td>
              <td>
                {categories.map((category, index) => (
                  <span key={index} className="capitalize">
                    {category.name},
                  </span>
                ))}
              </td>
              <td className="flex justify-end">{totalCategories}</td>
            </tr>
            <tr>
              <td className="font-bold">Tags: </td>
              <td>
                {tags.map((tag, index) => (
                  <span key={index} className="capitalize">
                    {tag.name.concat(",")}
                  </span>
                ))}
              </td>
              <td className="flex justify-end">{totalTags}</td>
            </tr>
            <tr>
              <td className="font-bold">Permissions: </td>
              <td>
                {permissions.map((permission, index) => (
                  <span key={index} className="capitalize">
                    {permission.name} ,
                  </span>
                ))}
              </td>
              <td className="flex justify-end">{totalPermissions}</td>
            </tr>
            <tr>
              <td className="font-bold">Roles: </td>
              <td>
                {roles.map((role, index) => (
                  <span key={index} className="capitalize">
                    {role.name} ,
                  </span>
                ))}
              </td>
              <td className="flex justify-end">{totalRoles}</td>
            </tr>
            <tr>
              <td className="font-bold">Users: </td>
              <td>
                {users.map((user, index) => (
                  <span key={index} className="capitalize">
                    {user.name} ,
                  </span>
                ))}
              </td>
              <td className="flex justify-end">{totalUsers}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllStatisticsCard;
