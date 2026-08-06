const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    secureUrl: {
      type: String,
      default: "",
      trim: true,
    },

    publicId: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const systemSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      default: "system",
      unique: true,
      trim: true,
    },

    site: {
      name: {
        type: String,
        default: "Nova Journal",
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      websiteUrl: {
        type: String,
        default: "",
      },
    },

    branding: {
      logo: {
        type: imageSchema,
        default: {},
      },

      favicon: {
        type: imageSchema,
        default: {},
      },

      primaryColor: {
        type: String,
        default: "#000000",
      },

      secondaryColor: {
        type: String,
        default: "#ffffff",
      },

      footerText: {
        type: String,
        default: "",
      },
    },

    seo: {
      metaTitle: {
        type: String,
        default: "",
      },

      metaDescription: {
        type: String,
        default: "",
      },

      keywords: [
        {
          type: String,
          trim: true,
        },
      ],

      ogImage: {
        type: imageSchema,
        default: {},
      },
    },

    contact: {
      email: {
        type: String,
        default: "",
      },

      phone: {
        type: String,
        default: "",
      },

      address: {
        type: String,
        default: "",
      },
    },

    socialLinks: {
      facebook: {
        type: String,
        default: "",
      },

      twitter: {
        type: String,
        default: "",
      },

      linkedin: {
        type: String,
        default: "",
      },

      github: {
        type: String,
        default: "",
      },

      youtube: {
        type: String,
        default: "",
      },

      instagram: {
        type: String,
        default: "",
      },
    },

    features: {
      maintenanceMode: {
        type: Boolean,
        default: false,
      },

      registrationEnabled: {
        type: Boolean,
        default: true,
      },

      commentsEnabled: {
        type: Boolean,
        default: true,
      },

      newsletterEnabled: {
        type: Boolean,
        default: true,
      },
    },

    localization: {
      timezone: {
        type: String,
        default: "Asia/Dhaka",
      },

      language: {
        type: String,
        default: "en",
      },

      currency: {
        type: String,
        default: "USD",
      },
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SystemSettings", systemSettingsSchema);

// const mongoose = require("mongoose");

// const systemSettingsSchema = new mongoose.Schema(
//   {
//     key: {
//       type: String,
//       default: "system",
//       unique: true,
//       trim: true,
//     },

//     site: {
//       name: {
//         type: String,
//         default: "Nova Panel",
//         trim: true,
//       },

//       description: {
//         type: String,
//         trim: true,
//       },

//       websiteUrl: {
//         type: String,
//         trim: true,
//       },
//     },

//     branding: {
//       logo: {
//         url: String,
//         publicId: String,
//       },

//       favicon: {
//         url: String,
//         publicId: String,
//       },

//       primaryColor: {
//         type: String,
//         default: "#000000",
//       },

//       secondaryColor: {
//         type: String,
//       },

//       footerText: {
//         type: String,
//       },
//     },

//     seo: {
//       metaTitle: {
//         type: String,
//       },

//       metaDescription: {
//         type: String,
//       },

//       keywords: [
//         {
//           type: String,
//         },
//       ],

//       ogImage: {
//         url: String,
//         publicId: String,
//       },
//     },

//     contact: {
//       email: String,
//       phone: String,
//       address: String,
//     },

//     socialLinks: {
//       facebook: String,
//       twitter: String,
//       linkedin: String,
//       github: String,
//       youtube: String,
//       instagram: String,
//     },

//     features: {
//       maintenanceMode: {
//         type: Boolean,
//         default: false,
//       },

//       registrationEnabled: {
//         type: Boolean,
//         default: true,
//       },

//       commentsEnabled: {
//         type: Boolean,
//         default: true,
//       },

//       newsletterEnabled: {
//         type: Boolean,
//         default: true,
//       },
//     },

//     localization: {
//       timezone: {
//         type: String,
//         default: "Asia/Dhaka",
//       },

//       language: {
//         type: String,
//         default: "en",
//       },

//       currency: {
//         type: String,
//         default: "USD",
//       },
//     },

//     security: {
//       maxLoginAttempts: {
//         type: Number,
//         default: 5,
//       },

//       sessionTimeout: {
//         type: Number,
//         default: 30,
//       },
//     },

//     backup: {
//       enabled: {
//         type: Boolean,
//         default: false,
//       },

//       lastBackupAt: Date,

//       backupFrequency: {
//         type: String,
//         enum: ["daily", "weekly", "monthly"],
//         default: "weekly",
//       },
//     },

//     email: {
//       senderName: String,
//       senderEmail: String,
//     },

//     updatedBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   },
// );
// module.exports = mongoose.model("Settings", systemSettingsSchema);
