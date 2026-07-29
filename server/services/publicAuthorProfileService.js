const Blog = require("../models/Blog");
const User = require("../models/User");
const Role = require("../models/Role");

const getAuthorPublicProfileService = async (authorId) => {
  try {
    const author = await User.findById(authorId).select(
      "name avatar createdAt followers following",
    );

    if (!author) {
      return null;
    }

    return {
      _id: author._id,
      name: author.name,
      avatar: author.avatar,
      createdAt: author.createdAt,
      followersCount: author.followers.length,
      followingCount: author.following.length,
    };
  } catch (error) {
    console.error("Error in getting author public profile.", error);
  }
};

const getPublicBlogCountService = async (authorId) => {
  try {
    const blogCount = await Blog.countDocuments({
      author: authorId,
      status: "published",
    });
    return blogCount;
  } catch (error) {
    console.error("Error in getting blog count.", error);
  }
};

const getAuthorLatestPostsService = async (authorId) => {
  try {
    const latestPosts = await Blog.find({
      author: authorId,
      status: "published",
    })
      .select("title slug image excerpt createdAt publishAt")
      .sort({ createdAt: -1 })
      .limit(3);

    return latestPosts;
  } catch (error) {
    console.error("error in fetching author's latest post.", error);
  }
};

const getAuthorComingSoonPostsService = async (authorId) => {
  try {
    const comingSoonPosts = await Blog.find({
      author: authorId,
      status: "coming-soon",
    })
      .select("title slug image excerpt createdAt publishAt")
      .sort({ createdAt: -1 })
      .limit(3);

    return comingSoonPosts;
  } catch (error) {
    console.error("error in fetching author's latest post.", error);
  }
};

const getAuthorOnlineStatusService = async (authorId) => {
  try {
    const author = await User.findById(authorId).select("isOnline lastSeen");

    if (!author) {
      return null;
    }

    return {
      isOnline: author.isOnline,
      lastSeen: author.lastSeen,
    };
  } catch (error) {
    console.error("Error in fetching author status", error);
  }
};

const getPublicAuthorService = async () => {
  try {
    const superAdminRole = await Role.findOne({
      name: "super-admin",
    });

    if (!superAdminRole) {
      return null;
    }

    const author = await User.findOne({
      roles: superAdminRole._id,
      isActive: true,
    }).select("name avatar createdAt");

    return author;
  } catch (error) {
    console.error("Error fetching public author.", error);
  }
};

const getLatestFollowerCountService = async (authorId) => {
  try {
    const author = await User.findById(authorId);
    if (!author) return null;

    const followersCount = author.followers.length;

    await author.populate({
      path: "followers",
      select: "name avatar",
      options: { limit: 5 },
    });

    return {
      followers: author.followers,
      followersCount,
    };
  } catch (error) {
    console.error("Error fetching public author.", error);
  }
};

module.exports = {
  getAuthorPublicProfileService,
  getPublicBlogCountService,
  getAuthorLatestPostsService,
  getAuthorComingSoonPostsService,
  getAuthorOnlineStatusService,
  getPublicAuthorService,
  getLatestFollowerCountService,
};
