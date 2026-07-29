const User = require("../models/User");
const {
  getAuthorPublicProfileService,
  getPublicBlogCountService,
  getAuthorLatestPostsService,
  getAuthorComingSoonPostsService,
  getAuthorOnlineStatusService,
  getPublicAuthorService,
  getLatestFollowerCountService,
} = require("../services/publicAuthorProfileService");

const getAuthorPublicProfile = async (req, res) => {
  const { authorId } = req.params;

  const author = await getAuthorPublicProfileService(authorId);

  if (!author) {
    return res.status(404).json({
      success: false,
      message: "Author not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully.",
    data: author,
  });
};

const authorProfileBlogCount = async (req, res) => {
  const { authorId } = req.params;
  const authorBlogs = await getPublicBlogCountService(authorId);
  return res.status(200).json({
    success: true,
    message: "Author blog count fetched",
    data: authorBlogs,
  });
};

const getAuthorProfileLatestPosts = async (req, res) => {
  const { authorId } = req.params;
  const latestPosts = await getAuthorLatestPostsService(authorId);
  return res.status(200).json({
    success: true,
    message: "Latest posts fetched successfully.",
    data: latestPosts,
  });
};

const getAuthorProfileComingSoonPosts = async (req, res) => {
  const { authorId } = req.params;
  const comingSoonPosts = await getAuthorComingSoonPostsService(authorId);

  return res.status(200).json({
    success: true,
    message: "Coming soon posts fetched successfully.",
    data: comingSoonPosts,
  });
};

const getAuthorOnlineStatus = async (req, res) => {
  const { authorId } = req.params;
  const authorStatus = await getAuthorOnlineStatusService(authorId);

  return res.status(200).json({
    success: true,
    message: "Author on-line status fetched successfully.",
    data: authorStatus,
  });
};

const getPublicAuthor = async (req, res) => {
  const author = await getPublicAuthorService();

  if (!author) {
    return res.status(404).json({
      success: false,
      message: "Public author not found.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Public author fetched successfully.",
    data: author,
  });
};

const getAuthorFollowers = async (req, res) => {
  const { authorId } = req.params;

  const followers = await getLatestFollowerCountService(authorId);

  return res.status(200).json({
    success: true,
    message: "Followers fetched successfully.",
    data: followers,
  });
};

module.exports = {
  getAuthorPublicProfile,
  authorProfileBlogCount,
  getAuthorProfileLatestPosts,
  getAuthorProfileComingSoonPosts,
  getAuthorOnlineStatus,
  getPublicAuthor,
  getAuthorFollowers,
};
