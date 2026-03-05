import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAdminContactMessages from "../../adminHooks/useAdminContactMessages";
import AdminCardTitle from "../../adminCardTitle/AdminCardTitle";
import { MailCheckIcon } from "lucide-react";

const COLORS = ["#FACC15", "#3B82F6", "#10B981"]; // Yellow, Blue, Green

const MessagesStatisticsCard = () => {
  const { messages } = useAdminContactMessages();

  const totalMessages = messages?.length || 0;
  const newMessages = messages?.filter((m) => m.status === "new").length || 0;
  const readMessages = messages?.filter((m) => m.status === "read").length || 0;
  const otherMessages = totalMessages - newMessages - readMessages;

  const chartData = [
    { name: "New", value: newMessages },
    { name: "Read", value: readMessages },
    { name: "Other", value: otherMessages },
  ];

  return (
    <div className="lg:col-span-12 col-span-12 rounded-md shadow-md dark:bg-gray-800 border border-gray-300 dark:border-gray-700 ">
      <AdminCardTitle
        subTitle="Messages"
        decoratedText="Statistics"
        dataLength={totalMessages}
      />
      <h2 className="lg:text-2xl text-sm font-bold text-center mt-4 flex items-center justify-center gap-2">
        <MailCheckIcon size={20} /> Users contact Messages Statics
      </h2>
      <div className="h-80">
        {/* <h3 className="font-semibold text-lg mb-4 text-center mt-4">
          Messages Overview
        </h3> */}
        {totalMessages === 0 ? (
          <p className="text-sm text-gray-500">No messages available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label={(entry) => entry.name}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default MessagesStatisticsCard;
