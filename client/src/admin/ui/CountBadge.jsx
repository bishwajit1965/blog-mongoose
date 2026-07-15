const CountBadge = ({
  dataLength,
  color = "emerald-500",
  border = "emerald-600",
}) => {
  const count =
    Array.isArray(dataLength) || typeof dataLength === "string"
      ? dataLength.length
      : typeof dataLength === "number"
        ? dataLength
        : 0;

  if (count === 0) {
    return (
      <span className="w-6 h-6 rounded-full p-3 flex items-center justify-center text-xs text-base-100 border shadow bg-emerald-500">
        N/A
      </span>
    );
  }

  return (
    <div
      className={`w-6 h-6 rounded-full p-2 flex items-center justify-center text-base-100 text-xs border shadow ${color ? `bg-${color}` : "bg-emerald-500"} ${border ? `border-${border}` : "border-emerald-600"}`}
    >
      {count}
    </div>
  );
};

export default CountBadge;
