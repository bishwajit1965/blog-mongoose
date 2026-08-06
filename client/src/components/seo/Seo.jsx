import { Helmet } from "react-helmet-async";
import seoConfig from "./seoConfig";
import useSystemSettings from "../../hooks/useSystemSettings";

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
   * Fetch SITE SETTINGS AND USE IT IN SEO GLOBALLY
   * ============================================================ */
  const { systemSettings } = useSystemSettings();

  const settings = systemSettings?.data || {};

  // Prepare global data to feed in SEO
  const siteName = settings?.site?.name || seoConfig.siteName;

  const siteUrl = settings?.site?.websiteUrl || seoConfig.siteUrl;

  const defaultDescription =
    settings?.seo?.metaDescription || seoConfig.defaultDescription;

  const publisherLogo = settings.branding.logo.secureUrl || "";

  const defaultOgImage =
    settings?.seo?.ogImage?.secureUrl || `${siteUrl}${seoConfig.defaultImage}`;

  const defaultKeywords = settings?.seo?.keywords || [];

  const language = settings?.localization?.language || seoConfig.language;

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
    ? pageTitle.includes(siteName)
      ? pageTitle
      : `${pageTitle} | ${siteName}`
    : seoConfig.defaultTitle;

  const seoDescription = stripHtml(
    metaDescription || description || defaultDescription,
  );

  const seoImage = image || `${seoConfig.siteUrl}${defaultOgImage}`;

  const seoUrl = url
    ? `${seoConfig.siteUrl}/${url.replace(/^\/+/, "")}`
    : siteUrl;

  const seoAuthor = author || seoConfig.author;

  const seoCategory = category || "";

  // const seoTags =
  //   metaKeywords?.length > 0 ? metaKeywords : tags?.length > 0 ? tags : [];
  const seoTags =
    metaKeywords?.length > 0
      ? metaKeywords
      : tags?.length > 0
        ? tags
        : defaultKeywords;

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
        url: `${publisherLogo}`,
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

    inLanguage: language,
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
