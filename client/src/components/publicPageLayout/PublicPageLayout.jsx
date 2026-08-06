import ScrollProgressBar from "../scrollProgressBar/ScrollProgressBar";
import Seo from "../seo/Seo";
import "./PublicPageLayout.css";

const PublicPageLayout = ({ page, children }) => {
  return (
    <>
      <Seo
        title={page?.title}
        metaTitle={page?.seoTitle}
        description={page?.content}
        metaDescription={page?.seoDescription}
        url={page?.slug}
        schemaType="WebPage"
      />

      <section className="max-w-5xl mx-auto lg:px-4 px-4 lg:py-4 py-2">
        <header className="mb-12 border-b-2 border-base-content/15 dark:border-gray-600 lg:pb-6 pb-3">
          <h1 className="text-4xl md:text-5xl font-bold dark:text-gray-400">
            {page?.title}
          </h1>

          {page?.updatedAt && (
            <p className="mt-3 text-sm text-base-content/60 dark:text-gray-400">
              Last updated: {new Date(page?.updatedAt).toLocaleDateString()}
            </p>
          )}
        </header>

        <main>{children}</main>
      </section>

      {/* Scroll progress bar begins */}
      <div className="">
        <ScrollProgressBar />
      </div>
    </>
  );
};

export default PublicPageLayout;
