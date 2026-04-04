#!/usr/bin/env node
/**
 * Update llms.txt with latest podcast episode date
 * Fetches from Cyber.FM podcast API and updates the "Updated:" field
 * Run this before each deployment: node update-llms-date.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const API_URL = 'https://teamblockchain.cyberfm.workers.dev/api/podcast';
const LLMS_FILE = path.join(__dirname, 'llms.txt');

function fetchLatestPodcastDate() {
    return new Promise((resolve, reject) => {
        https.get(API_URL, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.items && json.items.length > 0) {
                        const latestDate = json.items[0].pubDate; // ISO 8601 format
                        const formattedDate = new Date(latestDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });
                        resolve(formattedDate);
                    } else {
                        reject('No podcast episodes found');
                    }
                } catch (e) {
                    reject(`Failed to parse API response: ${e.message}`);
                }
            });
        }).on('error', reject);
    });
}

function updateLLMSFile(newDate) {
    let content = fs.readFileSync(LLMS_FILE, 'utf8');

    // Update the "Updated:" field - matches format like "Updated: April 4, 2026"
    const regex = /Updated: [\w\s,]+/;

    if (regex.test(content)) {
        content = content.replace(regex, `Updated: ${newDate}`);
        fs.writeFileSync(LLMS_FILE, content, 'utf8');
        console.log(`✓ Updated llms.txt with latest podcast date: ${newDate}`);
        return true;
    } else {
        console.warn('⚠ Could not find "Updated:" field in llms.txt. Please ensure it exists in format: "Updated: [Date]"');
        return false;
    }
}

// Main execution
(async () => {
    try {
        console.log('📡 Fetching latest podcast date from Cyber.FM API...');
        const latestDate = await fetchLatestPodcastDate();
        console.log(`Found: ${latestDate}`);

        updateLLMSFile(latestDate);
        process.exit(0);
    } catch (error) {
        console.error(`✗ Error: ${error}`);
        process.exit(1);
    }
})();
