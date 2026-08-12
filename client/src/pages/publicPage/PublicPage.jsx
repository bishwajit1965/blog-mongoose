import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { getPublicPageBySlug } from "../../services/publicPageService";
import { useParams } from "react-router-dom";
import PublicPageLayout from "../../components/publicPageLayout/PublicPageLayout";
import ErrorPage from "../errorPage/ErrorPage";
import ContactMe from "../contactMe/ContactMe";
import TermsConditions from "../TermsConditions/TermsConditions";
import Loader from "../../admin/ui/Loader";
import ScrollTopButton from "../../components/scrollTopButton/ScrollTopButton";
import HomeButton from "../../components/homeButton/HomeButton";
import { motion } from "framer-motion";

const PublicPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [publicPage, setPublicPage] = useState(null);

  const fetchPublicPages = useCallback(async () => {
    try {
      setLoading(true);
      const [publicPageResponse] = await Promise.all([
        getPublicPageBySlug(slug),
      ]);

      if (!publicPageResponse?.page) {
        setPublicPage(null); // mark as not found
        return;
      }

      setPublicPage(publicPageResponse?.page);
    } catch (error) {
      console.error("Error in fetching pages.", error);
      setPublicPage(null);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPublicPages();
  }, [fetchPublicPages]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-6xl mx-auto"
    >
      {loading ? (
        <Loader />
      ) : publicPage ? (
        <PublicPageLayout page={publicPage}>
          <article
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: publicPage?.content,
            }}
          />

          <div className="pt-6 lg:mt-10 border-t-2 dark:border-gray-800">
            {publicPage.pageType === "contact" && <ContactMe />}
            {publicPage.pageType === "terms-and-conditions" && (
              <TermsConditions />
            )}
          </div>
        </PublicPageLayout>
      ) : (
        <ErrorPage />
      )}

      {/* Floating button to lead to homepage begins */}
      <HomeButton />
      {/* Floating button to lead to homepage ends */}

      {/* Scroll to top button begins */}
      <ScrollTopButton />
      {/* Scroll to top button ends */}
    </motion.div>
  );
};

export default PublicPage;
