import { Helmet } from "react-helmet-async";
import seoConfig from "./seoConfig";

const Seo = ({
  author,
  title,
  metaTitle,
  description,
  metaDescription,
  metaKeywords = [],
  image,
  url,
  category,
  tags = [],
  publishDate,
  modifiedDate,
  schemaType,
}) => {
  /* ============================================================
   * Strips HTML tags
   * ============================================================ */
  const stripHtml = (html = "") => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  /* ============================================================
   * SEO Values
   * ============================================================ */

  const pageTitle = metaTitle || title;

  const seoTitle = pageTitle
    ? pageTitle.includes(seoConfig.siteName)
      ? pageTitle
      : `${pageTitle} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  const seoDescription = stripHtml(
    metaDescription || description || seoConfig.defaultDescription,
  );

  const seoImage = image || `${seoConfig.siteUrl}${seoConfig.defaultImage}`;

  const seoUrl = url
    ? `${seoConfig.siteUrl}/${url.replace(/^\/+/, "")}`
    : seoConfig.siteUrl;

  const seoAuthor = author || seoConfig.author;

  const seoCategory = category || "";

  const seoTags =
    metaKeywords?.length > 0 ? metaKeywords : tags?.length > 0 ? tags : [];

  const seoPublishDate = publishDate || "";

  const seoModifiedDate = modifiedDate || seoPublishDate;

  /* ============================================================
   * JSON-LD Schema
   * ============================================================ */

  const structuredData = {
    "@context": "https://schema.org",
    "@type": schemaType,

    headline: seoTitle,
    description: seoDescription,
    image: seoImage,

    author: {
      "@type": "Person",
      name: seoAuthor,
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

    dateModified: seoModifiedDate,

    keywords: seoTags.join(", "),

    articleSection: seoCategory,

    inLanguage: seoConfig.language,
  };

  return (
    <Helmet>
      {/* ========================================================
          Basic SEO
      ======================================================== */}

      <title>{seoTitle}</title>

      <meta name="description" content={seoDescription} />

      <meta name="author" content={seoAuthor} />

      <meta name="keywords" content={seoTags.join(", ")} />

      <link rel="canonical" href={seoUrl} />

      {/* ========================================================
          Open Graph
      ======================================================== */}

      <meta property="og:type" content="article" />

      <meta property="og:title" content={seoTitle} />

      <meta property="og:description" content={seoDescription} />

      <meta property="og:image" content={seoImage} />

      <meta property="og:image:alt" content={seoTitle} />

      <meta property="og:url" content={seoUrl} />

      <meta property="og:site_name" content={seoConfig.siteName} />

      <meta property="og:locale" content={seoConfig.locale} />

      {/* ========================================================
          Article Metadata
      ======================================================== */}

      <meta property="article:author" content={seoAuthor} />

      <meta property="article:section" content={seoCategory} />

      <meta property="article:published_time" content={seoPublishDate} />

      {seoTags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* ========================================================
          Twitter Card
      ======================================================== */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={seoTitle} />

      <meta name="twitter:description" content={seoDescription} />

      <meta name="twitter:image" content={seoImage} />

      <meta name="twitter:creator" content={seoConfig.twitter} />

      {/* ========================================================
          Structured Data (JSON-LD)
      ======================================================== */}

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default Seo;
