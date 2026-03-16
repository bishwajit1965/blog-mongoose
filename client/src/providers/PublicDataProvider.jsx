import { useEffect, useState } from "react";
import PublicDataContext from "./PublicDataContext";

const publicURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

const PublicDataProvider = ({ children }) => {
  const [notices, setNotices] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [bookmarked, setBookmarked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const [noticesRes, comingSoonRes, bookmarkedResponse] =
          await Promise.all([
            fetch(`${publicURL}/notifications/public`),
            fetch(`${publicURL}/coming-soon`),
            fetch(`${publicURL}/bookmarked-posts`),
          ]);

        // Only parse JSON if response is ok
        const noticesData = noticesRes.ok ? await noticesRes.json() : [];
        const comingSoonData = comingSoonRes.ok
          ? await comingSoonRes.json()
          : [];
        const bookmarkedData = bookmarkedResponse.ok
          ? await bookmarkedResponse.json()
          : [];

        setNotices(noticesData?.notifications || []);
        setComingSoon(comingSoonData?.data || []);
        setBookmarked(bookmarkedData?.data || []);
      } catch (err) {
        console.error("Error fetching public data:", err);
        setNotices([]);
        setComingSoon([]);
        setBookmarked([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  return (
    <PublicDataContext.Provider
      value={{ notices, comingSoon, bookmarked, loading }}
    >
      {children}
    </PublicDataContext.Provider>
  );
};

export default PublicDataProvider;
