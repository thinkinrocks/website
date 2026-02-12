import fs from 'fs';
import https from 'https';
import path from 'path';
import 'dotenv/config';

const GITHUB_TOKEN = process.env.GITHUB_PAT;
const REPO_OWNER = 'thinkinrocks';
const REPO_NAME = 'fonts';
const BRANCH = 'main';

// List of fonts to download
// source: path inside the repo (e.g., 'assets/fonts/my-font.woff2')
// dest: filename to save in public/fonts (e.g., 'my-font.woff2')
const FONTS = [
    { source: 'PPMondwest-Regular.woff2', dest: 'PPMondwest-Regular.woff2' },
    { source: 'PPMondwest-Bold.woff2', dest: 'PPMondwest-Bold.woff2' }
];

// --- 2. SETUP ---
if (!GITHUB_TOKEN) {
    console.error("❌ No GITHUB_PAT found. Skipping font download.");
    process.exit(1); // Fail build if token is missing
}

const destDir = path.join(process.cwd(), 'public', 'fonts');

// Ensure public/fonts exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

// --- 3. DOWNLOAD FUNCTION ---
function downloadFont(font) {
    return new Promise((resolve, reject) => {
        // Construct the Raw URL
        // Format: https://raw.githubusercontent.com/:owner/:repo/:branch/:path
        const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/refs/heads/${BRANCH}/${font.source}`;

        const destPath = path.join(destDir, font.dest);
        const file = fs.createWriteStream(destPath);

        const options = {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'User-Agent': 'Vercel-Font-Downloader'
            }
        };

        https.get(rawUrl, options, function (response) {
            if (response.statusCode !== 200) {
                fs.unlink(destPath, () => { }); // Delete empty file
                reject(new Error(`HTTP ${response.statusCode} for ${rawUrl}`));
                return;
            }

            response.pipe(file);

            file.on('finish', () => {
                file.close(() => {
                    console.log(`✅ Downloaded: ${font.dest}`);
                    resolve();
                });
            });
        }).on('error', (err) => {
            fs.unlink(destPath, () => { }); // Delete partial file
            reject(err);
        });
    });
}

// --- 4. EXECUTION ---
console.log(`⬇️  Starting download of ${FONTS.length} fonts...`);

// Run downloads in parallel
Promise.all(FONTS.map(downloadFont))
    .then(() => {
        console.log("🎉 All fonts downloaded successfully!");
    })
    .catch((err) => {
        console.error("❌ Error downloading fonts:", err.message);
        process.exit(1); // Fail the build so you don't deploy broken fonts
    });