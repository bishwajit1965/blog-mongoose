const cron = require("node-cron");
const Blog = require("../models/Blog");
const { io } = require("../index"); // Ensure you are importing your socket.io instance

// Debugging: Check if io is available
if (!io) {
  console.error("🚨 Socket.io instance is undefined in cronJobs.js!");
} else {
  console.log("✅ Socket.io instance loaded successfully in cronJobs.js");
}
// Schedule job to run every minute
cron.schedule("* * * * *", async () => {
  try {
    console.log("Checking for scheduled posts");

    const now = new Date();

    // Find posts that need to be published
    const postsToPublish = await Blog.find({
      status: { $in: ["scheduled", "coming-soon"] },
      publishAt: { $lte: now }, // Publish time has passed
    });

    if (postsToPublish.length > 0) {
      console.log(`Publishing ${postsToPublish.length} post(s)...`);

      for (const post of postsToPublish) {
        // Correctly update the post status to 'published'
        post.status = "published";
        post.publishAt = now; // Update the publishAt date to current time
        await post.save(); // Save the updated post

        // Emit notification to admin that the post has been published
        io.emit(
          "publish-alert",
          `A post titled "${post.title}" has been published!`
        );
        console.log(`Published post: ${post.title}`);
      }
    } else {
      console.log("No scheduled posts to publish.");
    }
  } catch (error) {
    console.error("Error in scheduled post publishing:", error);
  }
});

// 🚫 **User Unbanning (Runs Every Day at Midnight)**
cron.schedule("0 0 * * *", async () => {
  try {
    console.log("Checking for banned users to unban...");

    const now = new Date();

    // Find users whose ban period has expired
    const usersToUnban = await User.find({
      isBanned: true,
      banExpiresAt: { $lte: now },
    });

    if (usersToUnban.length > 0) {
      console.log(`Unbanning ${usersToUnban.length} user(s)...`);

      for (const user of usersToUnban) {
        user.isBanned = false;
        user.falseFlagCount = 0; // Reset false flag count
        user.banExpiresAt = null;
        await user.save();
      }

      console.log("Users successfully unbanned.");
    } else {
      console.log("No users to unban.");
    }
  } catch (error) {
    console.error("Error in unbanning users:", error);
  }
});

module.exports = cron;
