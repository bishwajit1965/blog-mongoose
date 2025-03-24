const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const BACKUP_DIR = path.join(__dirname, "../backups");
const DB_NAME = "blog";
const BACKUP_RETENTION_DAYS = 7; // Keep backups for 7 days
const BACKUP_SCHEDULE = "0 2 * * *"; // Runs daily at 2 AM

// Ensure backup directory exists
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true });
}

// Function to create a new backup
const createBackup = () => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // Safe for filenames
  const backupFileName = `${DB_NAME}-backup-${timestamp}.gz`; // MongoDB's archive format
  const backupFilePath = path.join(BACKUP_DIR, backupFileName);

  exec(
    `mongodump --db ${DB_NAME} --archive=${backupFilePath} --gzip`,
    (error) => {
      if (error) {
        console.error("❌ Error creating backup:", error);
      } else {
        console.log(`✅ Backup created: ${backupFileName}`);
        deleteOldBackups(); // Call retention function after successful backup
      }
    }
  );
};

// Function to delete old backups
// const deleteOldBackups = () => {
//   fs.readdir(BACKUP_DIR, (err, files) => {
//     if (err) {
//       console.error("❌ Error reading backup directory:", err);
//       return;
//     }

//     const expirationDate =
//       Date.now() - BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000;

//     files.forEach((file) => {
//       const filePath = path.join(BACKUP_DIR, file);
//       fs.stat(filePath, (err, stats) => {
//         if (err) {
//           console.error(`❌ Error getting file stats for ${file}:`, err);
//           return;
//         }

//         if (stats.mtime.getTime() < expirationDate) {
//           fs.unlink(filePath, (err) => {
//             if (err) {
//               console.error(`❌ Error deleting old backup ${file}:`, err);
//             } else {
//               console.log(`🗑️ Deleted old backup: ${file}`);
//             }
//           });
//         }
//       });
//     });
//   });
// };

const deleteOldBackups = async () => {
  try {
    const files = await fs.promises.readdir(BACKUP_DIR);
    const expirationDate =
      Date.now() - BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(BACKUP_DIR, file);
        const stats = await fs.promises.stat(filePath);

        if (stats.mtime.getTime() < expirationDate) {
          await fs.promises.unlink(filePath);
          console.log(`🗑️ Deleted old backup: ${file}`);
        }
      })
    );
  } catch (error) {
    console.error("❌ Error during old backup cleanup:", error);
  }
};

// Schedule the backup process
cron.schedule(BACKUP_SCHEDULE, () => {
  console.log("⏳ Running scheduled backup...");
  createBackup();
});

module.exports = createBackup;

// database backup command
// mongorestore --gzip --archive=blog-mongoose/backups/blog-backup-2025-03-21T08-33-06-259Z.gz
