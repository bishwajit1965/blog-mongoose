import { LucideIcon } from "../lucideIcon/LucideIcons";
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

      <section className="max-w-6xl mx-auto lg:px-4 px-4 lg:py-4 py-2">
        <header className="mb-12 border-b-2 border-base-content/15 dark:border-gray-600 lg:pb-6 pb-3">
          <h1 className="lg:text-4xl text-3xl md:text-5xl font-bold dark:text-gray-400">
            {page?.title}
          </h1>

          {page?.updatedAt && (
            <p className="lg:mt-3 mt-2 flex items-center gap-2 text-sm text-base-content/60 dark:text-gray-400">
              <LucideIcon.CalendarDays size={14} /> Last updated:{" "}
              {new Date(page?.updatedAt).toLocaleDateString()}
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
