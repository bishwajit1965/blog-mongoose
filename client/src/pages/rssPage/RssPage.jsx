import Seo from "../../components/seo/Seo";

import { useEffect, useState } from "react";

import Loader from "../../components/loader/Loader";
import RssPostCard from "./RssPostCard";
import { FaRss } from "react-icons/fa";
import PageTitle from "../../components/pageTitle/PageTitle";
import { motion } from "framer-motion";
const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log("BASEURL", baseURL);

const RssPage = () => {
  const [rssPosts, setRssPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
            title: item.querySelector("title")?.textContent.trim(),
            link: item.querySelector("link")?.textContent.trim(),
            description: item.querySelector("description").textContent.trim(),
            publishDate: item.querySelector("pubDate")?.textContent.trim(),
            image: item.querySelector("image")?.textContent.trim(),
          }),
        );
        console.log("Items:", items);
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
      className="lg:max-w-7xl mx-auto lg:p-0 p-2 mb-10"
    >
      <Seo
        title="RSS Feed"
        description="Subscribe to Nova Journal through RSS to receive the latest software engineering articles."
        url="rss"
        schemaType="CollectionPage"
      />

      {loading && <Loader />}
      <PageTitle
        title="Rss Blog"
        icon={FaRss}
        decoratedText="Posts"
        dataLength={rssPosts.length}
        subtitle="All RSS Blog posts are displayed here."
      />

      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        {rssPosts?.length > 0 ? (
          rssPosts.map((post, index) => <RssPostCard key={index} post={post} />)
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
