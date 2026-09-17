/**
 * ReplyVera — Complete Production Build Script
 * 
 * Sequentially executes:
 * 1. build.js (Compiles root & localized marketing pages from src/ to dist/ and root)
 * 2. build-industries.js (Compiles all 62 industry landing pages and aliases across EN, ES, NL)
 * 3. build-resources.js (Compiles Resources hubs, guides, sitemap.xml, robots.txt)
 * 4. Assembles clean, isolated production distribution in dist/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('====================================================');
console.log('🚀 Starting ReplyVera Complete Production Build');
console.log('====================================================\n');

const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');

// Step 1: Run build.js
console.log('👉 [1/4] Building Core Marketing Templates...');
execSync('node build.js', { stdio: 'inherit', cwd: rootDir });

// Step 2: Run build-industries.js
console.log('\n👉 [2/4] Building Multilingual Industry Landing Pages...');
execSync('node build-industries.js', { stdio: 'inherit', cwd: rootDir });

// Step 3: Run build-resources.js to guarantee sitemap & robots have latest pages
console.log('\n👉 [3/4] Updating Resources Hub, Sitemap & Robots...');
execSync('node build-resources.js', { stdio: 'inherit', cwd: rootDir });

// Step 4: Assemble dist/ directory
console.log('\n👉 [4/4] Assembling Clean Production Output in dist/...');

// Reset dist directory
if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => {
            // Safety: Skip private, git, or scratch files
            if (child.startsWith('.') || child.endsWith('.py') || child.endsWith('.zip') || child === 'node_modules') return;
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        // Safety: Do not copy sensitive files
        const basename = path.basename(src);
        if (basename.endsWith('.py') || basename.endsWith('.zip') || basename === 'search_results.txt') {
            return;
        }
        fs.copyFileSync(src, dest);
    }
}

// Copy root HTML files
const rootHtmlFiles = ['index.html', 'pricing.html', 'terms.html', 'privacy.html', 'cookie.html', 'demo.html', 'dashboard.html'];
rootHtmlFiles.forEach(file => {
    const srcPath = path.join(rootDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(distDir, file));
    }
});

// Also create /dashboard/index.html for trailingSlash compatibility
const dashSrc = path.join(rootDir, 'dashboard.html');
if (fs.existsSync(dashSrc)) {
    const dashDir = path.join(distDir, 'dashboard');
    if (!fs.existsSync(dashDir)) fs.mkdirSync(dashDir, { recursive: true });
    fs.copyFileSync(dashSrc, path.join(dashDir, 'index.html'));
}

// Copy SEO and asset files
const staticFiles = ['sitemap.xml', 'robots.txt', 'style.css', 'script.js', 'demo.js'];
staticFiles.forEach(file => {
    const srcPath = path.join(rootDir, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(distDir, file));
    }
});

// Copy public directories
const publicDirs = ['img', 'pictures', 'css', 'js', 'es', 'nl', 'industries', 'resources'];
publicDirs.forEach(dir => {
    const srcPath = path.join(rootDir, dir);
    if (fs.existsSync(srcPath)) {
        copyRecursive(srcPath, path.join(distDir, dir));
    }
});

// Post-process demo.html with static language switchers
const { replaceAllLangSelectors } = require('./lib/lang_switcher');
const demoUrls = { en: '/demo.html', es: '/es/demo.html', nl: '/nl/demo.html' };
['en', 'es', 'nl'].forEach(lang => {
    const isDefault = lang === 'en';
    const distDemoPath = isDefault ? path.join(distDir, 'demo.html') : path.join(distDir, lang, 'demo.html');
    if (fs.existsSync(distDemoPath)) {
        let content = fs.readFileSync(distDemoPath, 'utf8');
        content = replaceAllLangSelectors(content, lang, demoUrls);
        fs.writeFileSync(distDemoPath, content, 'utf8');
    }
    const rootDemoPath = isDefault ? path.join(rootDir, 'demo.html') : path.join(rootDir, lang, 'demo.html');
    if (fs.existsSync(rootDemoPath)) {
        let content = fs.readFileSync(rootDemoPath, 'utf8');
        content = replaceAllLangSelectors(content, lang, demoUrls);
        fs.writeFileSync(rootDemoPath, content, 'utf8');
    }
});

// Post-assembly verification
function countHtmlFiles(dir) {
    let count = 0;
    if (!fs.existsSync(dir)) return 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            count += countHtmlFiles(fullPath);
        } else if (entry.name.endsWith('.html')) {
            count++;
        }
    }
    return count;
}

const totalHtmlInDist = countHtmlFiles(distDir);

console.log('\n====================================================');
console.log(`✅ Production Build Successfully Assembled in /dist!`);
console.log(`📊 Total HTML pages deployed: ${totalHtmlInDist}`);
console.log(`🔒 Sensitive files excluded: dashboard.html, *.py, *.zip, staging files`);
console.log('====================================================\n');
