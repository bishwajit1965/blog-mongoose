import { LucideAlertCircle } from "lucide-react";

const TableDataNotFound = ({ icon, table, message }) => {
  const defaultMessage = "No data is available now !";
  const defaultIcon = <LucideAlertCircle size={20} className="text-red-500" />;
  return (
    <div className="">
      <p className="flex items-center justify-center gap-1.5">
        {icon ? icon : defaultIcon}
        {`${table ? table : ""} ${message ? message : defaultMessage}`}
      </p>
    </div>
  );
};

export default TableDataNotFound;
