const mongoose = require("mongoose");
const FlaggedPost = require("./models/FlaggedPost"); // Adjust path if needed

const fixFlaggedPosts = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // } );
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName");

    console.log("Connected to MongoDB ✅");

    // Find flagged posts with missing postId, flaggedReason, or flaggedAt
    const flaggedPosts = await FlaggedPost.find({
      $or: [
        { postId: { $exists: false } },
        { flaggedReason: { $size: 0 } },
        { flaggedAt: { $size: 0 } },
      ],
    });

    if (flaggedPosts.length === 0) {
      console.log("No flagged posts need fixing 🎉");
      return;
    }

    console.log(
      `Found ${flaggedPosts.length} flagged posts with missing data.`
    );

    // Loop through flagged posts and fix missing values
    for (let post of flaggedPosts) {
      let updateFields = {};

      if (!post.postId) {
        console.log(`⚠️ postId missing for ${post._id}`);
        // You can manually fetch a valid postId from the Blog collection if needed
      }

      if (!post.flaggedReason || post.flaggedReason.length === 0) {
        updateFields.flaggedReason = ["Other"];
      }

      if (!post.flaggedAt || post.flaggedAt.length === 0) {
        updateFields.flaggedAt = [new Date()];
      }

      if (Object.keys(updateFields).length > 0) {
        await FlaggedPost.updateOne({ _id: post._id }, { $set: updateFields });
        console.log(`✅ Fixed ${post._id}`);
      }
    }

    console.log("All missing data fixed ✅");
  } catch (error) {
    console.error("Error fixing flagged posts:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the script
fixFlaggedPosts();
