import { useMemo } from "react";

const useLastSeenFormatter = (lastSeen) => {
  return useMemo(() => {
    if (!lastSeen) return "Never";

    const now = new Date();
    const seen = new Date(lastSeen);

    const diff = now - seen;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "Just now";

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (days < 7) {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    return seen.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [lastSeen]);
};

export default useLastSeenFormatter;
