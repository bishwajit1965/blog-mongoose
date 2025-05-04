import AdminLoader from "../../admin/adminComponent/adminLoader/AdminLoader";

const Tags = ({ data, isLoading, error }) => {
  if (isLoading) return <AdminLoader />;
  if (error) return <div>Error!</div>;
  if (!data || data.length === 0) return <div>No tags found</div>;
  console.log("Tags data:", data);
  return (
    <div>
      {data.map((tag) => (
        <div
          key={tag._id}
          className="flex items-center justify-between bg-gray-200 p-2 my-2 rounded-md shadow-md"
        >
          <h2 className="text-lg font-bold uppercase">{tag.name}</h2>
          <p className="text-gray-500">{tag.slug}</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
