import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { getPublicPageBySlug } from "../../services/publicPageService";
import { useParams } from "react-router-dom";
// import Loader from "../../components/loader/Loader";
import PublicPageLayout from "../../components/publicPageLayout/PublicPageLayout";
import ErrorPage from "../errorPage/ErrorPage";
import ContactMe from "../contactMe/ContactMe";
import TermsConditions from "../TermsConditions/TermsConditions";
import Loader from "../../admin/ui/Loader";

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
    <div className="max-w-5xl mx-auto">
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
    </div>
  );
};

export default PublicPage;
