// db/seed.js
const mongoose = require("mongoose");
const Role = require("../models/Role");
const Permission = require("../models/Permission");

async function seedDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear collections before seeding
    await Role.deleteMany({});
    await Permission.deleteMany({});

    // Insert dummy roles
    const rolesData = [
      { name: "admin", description: "Full access to everything" },
      { name: "editor", description: "Can edit content" },
      { name: "user", description: "Can view and create content" },
    ];

    const roles = await Role.insertMany(rolesData);

    // Insert dummy permissions
    const permissionsData = [
      { name: "create-post", description: "Ability to create posts" },
      { name: "edit-post", description: "Ability to edit posts" },
      { name: "delete-post", description: "Ability to delete posts" },
    ];

    const permissions = await Permission.insertMany(permissionsData);

    console.log("Roles and permissions seeded!");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
}

seedDatabase();
