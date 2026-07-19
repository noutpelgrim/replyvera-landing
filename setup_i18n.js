const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const crypto = require('crypto');

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(__dirname, 'locales');
const htmlFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

const enDict = {};

// Helper to clean up text and skip empty strings or single characters
function isValidText(text) {
    text = text.trim();
    if (!text) return false;
    // Skip single characters, numbers, pure punctuation, or just a few symbols
    if (text.length <= 1) return false;
    if (/^[\d\s.,!?@#%&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(text)) return false;
    if (text === '&copy;') return false;
    return true;
}

function processHtmlFile(fileName) {
    const filePath = path.join(srcDir, fileName);
    let html = fs.readFileSync(filePath, 'utf-8');
    
    // We will do a regex-based replacement for simplicity on tags we know have text
    // A Cheerio based replacement is safer but we want to keep the original formatting.
    // Let's use Cheerio to FIND the text, and then string replace to inject the keys.
    const $ = cheerio.load(html, { recognizeSelfClosing: true, decodeEntities: false });
    
    const replacements = [];

    // Traverse all elements
    $('*').contents().each(function() {
        if (this.type === 'text') {
            const rawText = this.data;
            const text = rawText.trim();
            if (isValidText(text)) {
                // Generate a key based on a snippet of the text to be descriptive
                const snippet = text.toLowerCase().replace(/[^a-z0-9]+/g, '_').substring(0, 30).replace(/_$/, '');
                const hash = crypto.createHash('md5').update(text).digest('hex').substring(0, 4);
                const key = `${fileName.replace('.html', '')}_${snippet}_${hash}`;
                
                enDict[key] = text;
                replacements.push({
                    original: rawText,
                    key: key,
                    trimmedText: text
                });
            }
        }
    });

    // Sort replacements by length descending to avoid partial replacements
    replacements.sort((a, b) => b.trimmedText.length - a.trimmedText.length);

    let newHtml = html;
    let replacedCount = 0;
    for (const rep of replacements) {
        // Need to replace the exact text content within its original whitespace context
        // E.g., if original is "   My Text  ", we want "   {{key}}  "
        if (newHtml.includes(rep.trimmedText)) {
            // Replace first occurrence of trimmed text with mustache tag
            // We use simple replace since it might appear multiple times, but hopefully uniqueness helps
            newHtml = newHtml.replace(rep.trimmedText, `{{ ${rep.key} }}`);
            replacedCount++;
        }
    }

    fs.writeFileSync(filePath, newHtml);
    console.log(`Processed ${fileName}: Extracted ${replacedCount} strings.`);
}

htmlFiles.forEach(processHtmlFile);

fs.writeFileSync(path.join(localesDir, 'en.json'), JSON.stringify(enDict, null, 2));
console.log(`Extraction complete. Saved locales/en.json with ${Object.keys(enDict).length} keys.`);
