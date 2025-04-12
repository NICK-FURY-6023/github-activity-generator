```py

# 🎨 GitHub Activity Generator

Easily generate GitHub activity for your profile with this simple and customizable Node.js script. Perfect for spicing up your GitHub contributions graph and showcasing consistent activity!

---

## 🌟 Features

- 📅 **Customizable Activity**: Define how many days and commits per day you want.
- 🔧 **Simple Setup**: Minimal configuration with easy-to-understand code.
- ⚡ **Effortless Execution**: Generate commits with a single command.
- 🌍 **Open Source**: Built for the community, by the community!

```

## 📊 Profile Stats (Sample)

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=nick-fury-6023&show_icons=true&theme=radical" alt="GitHub Stats">
  <img src="https://github-readme-streak-stats.herokuapp.com?user=nick-fury-6023&theme=radical" alt="GitHub Streak">
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=nick-fury-6023&layout=compact&theme=radical" alt="Top Languages">
</p>

<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=NICK-FURY-6023&bg_color=21232D&color=58A6FF&line=FE428E&point=E6E6E6&area=true&hide_border=true" alt="GitHub Activity Graph">
</p>

---

## 🚀 Getting Started

Follow this step-by-step guide to set up and run the GitHub Activity Generator.

### Step 1: Clone the Repository

```bash
git clone https://github.com/NICK-FURY-6023/github-activity-generator.git
cd github-activity-generator
```

---

### Step 2: Install Dependencies

Ensure you have Node.js installed, then run:

```bash
npm install
```

---

### Step 3: Configure the Script

Modify the configuration in `activityGenerator.js` to suit your needs:

- **DAYS**: Number of days to generate activity for (default: 30).
- **COMMITS_PER_DAY**: Number of commits per day (default: 3).
- **FILE_NAME**: Name of the file to modify for each commit (default: `activity.txt`).

---

### Step 4: Run the Generator

Run the script to generate activity:

```bash
npm run generate
```

---

### Step 5: Push Commits to GitHub

After generating commits locally, push them to your GitHub repository:

```bash
git init           # Initialize the Git repository (if not already initialized)
git remote add origin https://github.com/NICK-FURY-6023/github-activity-generator.git
git push -u origin main
```

---

### Step 6: Verify Activity

Visit your GitHub profile and admire your enhanced contribution graph! 🎉

---

## 🛠 How It Works

The script performs the following tasks:
1. **File Creation**: Creates/updates a file named `activity.txt`.
2. **Commit Generation**: Uses the `simple-git` library to make commits with custom timestamps.
3. **Customization**: Lets you control the number of days and commits per day through configuration.

Here’s a snippet of the script:

```javascript
const simpleGit = require("simple-git");
const fs = require("fs");
const path = require("path");

// Configuration
const DAYS = 30;
const COMMITS_PER_DAY = 3;
const FILE_NAME = "activity.txt";

const git = simpleGit();

const getFormattedDate = (date) => date.toISOString().replace('T', ' ').substring(0, 19);

(async () => {
  const filePath = path.join(__dirname, FILE_NAME);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "GitHub Activity Generator\n");
  }

  for (let day = 0; day < DAYS; day++) {
    const commitDate = new Date();
    commitDate.setDate(commitDate.getDate() - day);

    for (let commit = 0; commit < COMMITS_PER_DAY; commit++) {
      const dateString = getFormattedDate(commitDate);

      fs.appendFileSync(filePath, `Commit for ${dateString}\n`);
      await git.add(FILE_NAME);
      await git.commit(`Commit on ${dateString}`, FILE_NAME, { "--date": dateString });
      console.log(`Committed: ${dateString}`);
    }
  }

  console.log("All commits generated successfully!");
})();
```

---

## 📜 License

This project is licensed under the [ISC License](LICENSE). Feel free to use, modify, and distribute it as you wish.

---

## 🤝 Contributions

Contributions are welcome! If you have an idea for improving the project or adding features, feel free to fork the repository and submit a pull request.

---

## 📬 Contact

For any questions or suggestions, reach out to [NICK-FURY-6023](https://github.com/NICK-FURY-6023).

---

Enjoy boosting your GitHub profile! 🚀
```

This version emphasizes readability, proper formatting, and a professional presentation, making it both informative and visually appealing. Let me know if you'd like to tweak anything further! 😊 