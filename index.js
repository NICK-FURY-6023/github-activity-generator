const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");
const moment = require("moment-timezone");

// Configuration
const CONFIG = {
  DAYS: 1, // Number of days to go back
  COMMITS_PER_DAY: 1000, // Number of commits per day
  BASE_DIR: path.join(__dirname, "src/main/base"), // Base directory
  TIMEZONE: "Asia/Kolkata", // Timezone
  DEVELOPER_NAME: "₦ł₵₭ ₣ɄⱤɎ 🛠️", // Developer's name
};

// Ensure the base directory exists
if (!fs.existsSync(CONFIG.BASE_DIR)) {
  fs.mkdirSync(CONFIG.BASE_DIR, { recursive: true });
  console.log(`✅ Base directory created: ${CONFIG.BASE_DIR}`);
}

const git = simpleGit();

// Helper: Format timestamp in 12-hour format with AM/PM
const formatTime = (date) => date.format("YYYY-MM-DD hh:mm:ss A");

// Helper: Convert a string into binary representation
const stringToBinary = (text) =>
  text
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");

// Helper: Generate a folder name based on current date
const generateFolderName = (date) => {
  const dayName = date.format("dddd"); // Day of the week
  const datePart = date.format("YYYY-MM-DD");
  return `${dayName}_${datePart}`;
};

// Helper: Generate a file name
const generateFileName = (date) => {
  const timePart = date.format("hh-mm-ss_A");
  return `${timePart}.html`;
};

// Write the header to the file with borders
const writeHeader = (filePath) => {
  const header = `
+-----------+---------------------+-------------------------------------------+----------------------+
| Commit #  | Timestamp           | Binary Representation                     | Developer Name       |
+-----------+---------------------+-------------------------------------------+----------------------+\n`;
  fs.writeFileSync(filePath, header, { flag: "w" });
};

// Append a commit row to the file with borders
const appendCommitRow = (filePath, commitNumber, timestamp) => {
  const thought = "Random commit message"; // Placeholder for any text
  const binaryRepresentation = stringToBinary(thought).substring(0, 50) + "..."; // Limit binary length for readability
  const row = `| ${commitNumber.toString().padEnd(9)} | ${timestamp.padEnd(21)} | ${binaryRepresentation.padEnd(41)} | ${CONFIG.DEVELOPER_NAME.padEnd(20)} |\n`;
  fs.appendFileSync(filePath, row);
};

// Write the footer with the bottom border
const writeFooter = (filePath) => {
  const footer = `+-----------+---------------------+-------------------------------------------+----------------------+\n`;
  fs.appendFileSync(filePath, footer);
};

// Main execution
(async () => {
  try {
    const currentDate = moment.tz(CONFIG.TIMEZONE);
    const folderName = generateFolderName(currentDate);
    const folderPath = path.join(CONFIG.BASE_DIR, folderName);

    // Ensure today's folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Folder created: ${folderPath}`);
    }

    const fileName = generateFileName(currentDate);
    const filePath = path.join(folderPath, fileName);

    // Write the header to the log file
    writeHeader(filePath);
    console.log(`✅ Log file initialized: ${filePath}`);

    for (let day = 0; day < CONFIG.DAYS; day++) {
      const commitDate = moment.tz(CONFIG.TIMEZONE).subtract(day, "days");

      for (let commit = 0; commit < CONFIG.COMMITS_PER_DAY; commit++) {
        const timestamp = formatTime(commitDate);

        // Append the commit to the log file
        appendCommitRow(filePath, commit + 1, timestamp);

        const commitMessage = `Commit #: ${commit + 1} - ${timestamp}`;

        try {
          // Stage and commit changes
          await git.add(filePath);
          await git.commit(commitMessage, filePath, { "--date": timestamp });
          console.log(`✅ Commit created: ${commitMessage}`);
        } catch (error) {
          console.error(`❌ Git error on commit #${commit + 1}:`, error.message);
        }

        // Delay to avoid overlapping Git processes
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    // Write the footer to the log file
    writeFooter(filePath);
    console.log("✨ All commits successfully logged!");
  } catch (error) {
    console.error("❌ Error during execution:", error.message);
  }
})();