const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const BACKUP_DIR = path.join(__dirname, "../backups");

const DB_NAME = process.env.DB_NAME || "blog";
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

// const DB_NAME = "blog";
const BACKUP_RETENTION_DAYS = 7; // Keep backups for 7 days
const BACKUP_SCHEDULE = "0 2 * * *"; // Runs daily at 2 AM

const MONGO_URI = `mongodb+srv://${encodeURIComponent(DB_USER)}:${encodeURIComponent(
  DB_PASSWORD,
)}@cluster0.l3p6wcn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

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
    `mongodump --uri="${MONGO_URI}" --archive="${backupFilePath}" --gzip`,
    (error) => {
      if (error) {
        console.error("❌ Error creating backup:", error);
      } else {
        console.log(`✅ Backup created: ${backupFileName}`);
        deleteOldBackups(); // Call retention function after successful backup
      }
    },
  );
};

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
      }),
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

//BACKUP COMMAND TO POPULATE DB WHEN NEEDED FROM BACKUP
// node -r dotenv/config -e "require('./backupService')()"

//UNCOMMENT & RUN FROM server FOLDER TO POPULATE DATA IF NEEDED
// node -r dotenv/config -e "const {execFileSync}=require('child_process'); const uri='mongodb+srv://'+encodeURIComponent(process.env.DB_USER)+':'+encodeURIComponent(process.env.DB_PASSWORD)+'@cluster0.l3p6wcn.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority&appName=Cluster0'; execFileSync('mongorestore',['--uri',uri,'--gzip','--archive=../backups/blog-backup-2026-08-10T06-52-03-675Z.gz','--nsFrom=blog.*','--nsTo=blog_restore_test.*'],{stdio:'inherit'})"
