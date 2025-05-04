import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";

const Categories = ({ data, isLoading, error, user }) => {
  if (isLoading) return <AdminLoader />;
  if (error) return <div>Error!</div>;
  if (!data || data.length === 0) return <div>No categories found</div>;
  user && console.log(user);

  return (
    <div>
      {data.map((category) => (
        <div
          key={category._id}
          className="flex items-center justify-between bg-gray-200 p-2 my-2 rounded-md shadow-md"
        >
          <h2 className="text-lg font-bold uppercase">{category.name}</h2>
          <p className="text-gray-500">{category.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Categories;
