import Seo from "../../components/seo/Seo";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import RssPostCard from "./RssPostCard";
import { FaRss } from "react-icons/fa";
import { motion } from "framer-motion";
import CustomPageTitle from "../../components/pageTitle/CustomPageTitle";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const RssPage = () => {
  const [rssPosts, setRssPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Latest rss post selection
  const latestRss = rssPosts?.reduce((latest, notice) => {
    if (!latest) return notice;

    const latestDate = new Date(latest.updatedAt || latest.createdAt);

    const noticeDate = new Date(notice.updatedAt || notice.createdAt);

    return noticeDate > latestDate ? notice : latest;
  }, null);

  useEffect(() => {
    setLoading(true);
    fetch(`${baseURL}/rss`) // Replace with your RSS route
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed.");
        }
        return response.text();
      })
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const items = Array.from(xmlDoc.querySelectorAll("item")).map(
          (item) => ({
            id: item.querySelector("id")?.textContent.trim(),
            title: item.querySelector("title")?.textContent.trim(),
            slug: item.querySelector("slug")?.textContent.trim(),
            category: item.querySelector("category")?.textContent.trim(),
            roles: item.querySelector("roles").textContent.trim(),
            content: item.querySelector("content")?.textContent.trim(),
            author: item.querySelector("author")?.textContent.trim(),
            avatar: item.querySelector("avatar")?.textContent.trim(),
            link: item.querySelector("link")?.textContent.trim(),
            description: item.querySelector("description").textContent.trim(),
            publishDate: item.querySelector("pubDate")?.textContent.trim(),
            image: item.querySelector("image")?.textContent.trim(),
          }),
        );

        setRssPosts(items); // Assuming your backend sends an array of posts
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching RSS feed:", error);
        setLoading(false);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="lg:max-w-6xl mx-auto lg:p-0 p-2 mb-"
    >
      <Seo
        title="RSS Feed"
        description="Subscribe to Nova Journal through RSS to receive the latest software engineering articles."
        url="rss"
        schemaType="CollectionPage"
      />

      {loading && <Loader />}

      <CustomPageTitle
        title="Rss Blog Posts"
        icon={FaRss}
        dataLength={rssPosts.length}
        updatedAt={latestRss?.updatedAt || latestRss?.publishDate}
      />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-6 p-4 justify-between">
        {rssPosts?.length > 0 ? (
          rssPosts?.map((post, index) => (
            <div
              key={index}
              className="lg:col-span-4 col-span-12 shadow-lg rounded-xl"
            >
              <RssPostCard
                post={post}
                showCategory={true}
                showPublishDate={true}
                showBookmark={true}
              />
            </div>
          ))
        ) : (
          <div className="flex w-full col-span-12 justify-center">
            No rss post to display.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RssPage;
