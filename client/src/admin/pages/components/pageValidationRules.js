const pageValidationRules = {
  title: {
    required: { message: "Title is required" },
    minLength: {
      value: 5,
      message: "Title length should be at least 5 characters",
    },
    maxLength: {
      value: 100,
      message: "Page title cannot exceed 100 characters.",
    },
  },

  slug: {
    required: { message: "Slug is required" },
    minLength: {
      value: 3,
      message: "Slug length should be at least 3 characters",
    },
    maxLength: {
      value: 120,
      message: "Page title cannot exceed 120 characters.",
    },
    pattern: {
      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      message: "Slug can only contain lowercase letters, numbers, and hyphens.",
    },
  },

  content: {
    required: { message: "Permission description is required" },
    maxLength: {
      value: 4000,
      message: "Permission description must be less than 4000 characters",
    },
  },

  seoTitle: {
    required: { message: "Seo title is required." },
    maxLength: {
      value: 60,
      message: "SEO title should not exceed 60 characters",
    },
  },

  seoDescription: {
    required: { message: "Seo description is required." },
    minLength: {
      value: 50,
      message: "SEO description should be at least 50 characters.",
    },
    maxLength: {
      value: 560,
      message: "SEO description should not exceed 160 characters.",
    },
  },

  status: {
    required: {
      message: "Status is required.",
    },
    enum: {
      values: ["draft", "published"],
      message: "Invalid page status.",
    },
  },

  pageType: {
    required: {
      message: "Page type is required.",
    },
    enum: {
      values: [
        "about",
        "contact",
        "privacy-policy",
        "terms-and-conditions",
        "cookie-policy",
        "disclaimer",
        "dmca",
        "editorial-policy",
        "licensing",
        "custom",
      ],
      message: "Invalid page type.",
    },
  },
};

export default pageValidationRules;
