import { Loader2 } from "lucide-react";

const Loader = ({ size = 48, message = "Loading...", className = "" }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[50vh] gap-4 ${className}`}
      role="status"
      aria-live="polite"
    >
      <Loader2 className="animate-spin text-primary" size={size} />
      {message && <p className="text-sm text-base-content/70">{message}</p>}
    </div>
  );
};

export default Loader;
