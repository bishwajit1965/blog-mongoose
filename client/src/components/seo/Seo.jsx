import seoConfig from "./seoConfig";
import { Helmet } from "react-helmet-async";

const Seo = ({
  author,
  title,
  description,
  image,
  url,
  category,
  tags = [],
  publishDate,
}) => {
  const seoTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const seoDescription = description || seoConfig.defaultDescription;

  // const seoImage = image || seoConfig.defaultImage;
  const seoImage = image || `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  const seoUrl = url
    ? `${seoConfig.siteUrl}/${url.replace(/^\//, "")}`
    : seoConfig.siteUrl;

  const seoAuthor = author || "";

  const seoCategory = category || "";

  const seoTags = tags || [];

  const seoPublishDate = publishDate || "";

  /**================================================================
  | *  JSON-LD
  | *  What is JSON-LD?
  | *  JSON-LD stands for JavaScript Object Notation for Linked Data.
  | *  It is embedded in your page like this:
  **================================================================*/

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",

    headline: seoTitle,

    description: seoDescription,

    image: seoImage,

    author: {
      "@type": "Person",
      name: seoAuthor || seoConfig.author,
    },

    publisher: {
      "@type": "Organization",
      name: seoConfig.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
      },
    },

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": seoUrl,
    },

    url: seoUrl,

    datePublished: seoPublishDate,

    dateModified: seoPublishDate,

    keywords: seoTags.join(", "),

    articleSection: seoCategory,

    inLanguage: "en",
  };

  return (
    <div className="">
      <Helmet>
        {/* Basic SEO */}
        <title>{seoTitle}</title>

        <meta name="description" content={seoDescription} />

        <meta name="author" content={seoAuthor} />

        <link rel="canonical" href={seoUrl} />

        {/* Open Graph - Social Sharing */}
        <meta property="og:title" content={seoTitle} />

        <meta property="og:description" content={seoDescription} />

        <meta property="og:image" content={seoImage} />

        <meta property="og:url" content={seoUrl} />

        <meta property="og:type" content="article" />

        {/* Article Metadata */}
        <meta property="article:author" content={seoAuthor} />

        <meta property="article:section" content={seoCategory} />

        {seoTags.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        <meta property="article:published_time" content={seoPublishDate} />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
    </div>
  );
};

export default Seo;
