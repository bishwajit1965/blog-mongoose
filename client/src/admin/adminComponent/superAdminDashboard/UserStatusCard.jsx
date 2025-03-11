import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";

const UserStatusCard = ({ userStats }) => {
  const data = [
    {
      name: "Active Users",
      value: userStats?.activeUsers || 0,
      color: "#4CAF50",
    },
    {
      name: "Inactive Users",
      value: userStats?.inactiveUsers || 0,
      color: "#F44336",
    },
  ];

  return (
    <div className="lg:col-span-6 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
      <AdminCardTitle
        subTitle="Users"
        decoratedText="Status"
        dataLength={userStats.totalUsers}
      />

      <div className="overflow-x-auto">
        <div className="p-1 flex space-x-4 bg-gray-100 dark:bg-gray-600 border-b dark:border-gray-700">
          <p className="text-xl font-bold">
            Total Users: {userStats.totalUsers}
          </p>
          <p className="text-xl font-bold">
            Active Users: {userStats.activeUsers}
          </p>
          <p className="text-xl font-bold">
            Inactive Users: {userStats.inactiveUsers}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default UserStatusCard;
