import { useState } from "react";
import { useCallback } from "react";

import { useEffect } from "react";
import { getPublicPageBySlug } from "../../services/publicPageService";
// import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import PublicPageLayout from "../../components/publicPageLayout/PublicPageLayout";

const PublicPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [publicPage, setPublicPage] = useState(null);

  console.log("Public pages", publicPage);

  const fetchPublicPages = useCallback(async () => {
    try {
      setLoading(true);
      const [publicPageResponse] = await Promise.all([
        getPublicPageBySlug(slug),
      ]);
      console.log("Public page response", publicPageResponse);
      setPublicPage(publicPageResponse?.page);
    } catch (error) {
      console.error("Error in fetching pages.", error);
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
      ) : (
        <PublicPageLayout page={publicPage}>
          <article
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: publicPage?.content,
            }}
          />
        </PublicPageLayout>
      )}
    </div>
  );
};

export default PublicPage;
