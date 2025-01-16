import Loader from "../../components/loader/Loader";

const AdminDashboardHomeCard = ({ loading, isAuthenticated, adminData }) => {
  if (loading) return <Loader />;
  return (
    <div className="lg:col-span-3 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <div className="bg-base-300 text-center p-2 dark:bg-gray-700">
        <h1 className="text-xl font-bold">Blog Posts Details</h1>
      </div>
      <div className="">
        {isAuthenticated && adminData ? (
          <>
            <p>Email: {adminData?.email}</p>
            <p>Role: {adminData?.roles}</p>
            <p>Authenticated: {isAuthenticated.toString()}</p>
          </>
        ) : (
          <p>Not authenticated</p>
        )}
      </div>

      <div className="p-2">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio
          explicabo nostrum iusto quod ipsum adipisci voluptates, nobis itaque
          perspiciatis tenetur fugit corrupti placeat iste enim. Veritatis
          impedit saepe repudiandae deleniti!
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardHomeCard;
