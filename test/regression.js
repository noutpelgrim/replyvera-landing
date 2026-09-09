/**
 * ReplyVera — Automated Production Regression Test Suite
 * 
 * Verifies that the production build in dist/ satisfies all quality,
 * security, conversion, SEO, crawlability, and structural requirements.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function assert(condition, message) {
    if (condition) {
        passedTests++;
    } else {
        console.error(`  ✗ FAIL: ${message}`);
        failedTests++;
        failureDetails.push(message);
    }
}

function getAllFiles(dir, filterFn = () => true) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllFiles(fullPath, filterFn));
        } else if (filterFn(fullPath)) {
            results.push(fullPath);
        }
    }
    return results;
}

console.log('====================================================');
console.log('🧪 Running ReplyVera Production Regression Suite');
console.log('====================================================\n');

// Test Suite 1: Directory Existence & Core Pages
console.log('📦 [1/11] Verifying dist/ output directory & core pages...');
assert(fs.existsSync(distDir), 'dist/ directory exists');
const allHtmlFiles = getAllFiles(distDir, f => f.endsWith('.html'));
assert(allHtmlFiles.length >= 100, `Found ${allHtmlFiles.length} HTML pages in dist/ (expected >= 100)`);

const requiredCoreFiles = [
    'index.html', 'pricing.html', 'demo.html', 'terms.html',
    'privacy.html', 'cookie.html', 'sitemap.xml', 'robots.txt',
    'style.css', 'script.js', 'js/simulator.js'
];
let missingCoreFiles = [];
requiredCoreFiles.forEach(cf => {
    if (!fs.existsSync(path.join(distDir, cf))) {
        missingCoreFiles.push(cf);
    }
});
assert(missingCoreFiles.length === 0, `All core assets exist in dist/ (missing: ${missingCoreFiles.join(', ') || 'none'})`);

// Test Suite 2: Security & Workspace Sanitization
console.log('\n🔒 [2/11] Checking Security & Sanitization in dist/...');
const dashboardExists = fs.existsSync(path.join(distDir, 'dashboard.html'));
assert(!dashboardExists, 'Root dashboard.html is NOT present in dist/');
const esDashboardExists = fs.existsSync(path.join(distDir, 'es', 'dashboard.html'));
assert(!esDashboardExists, 'es/dashboard.html is NOT present in dist/');
const nlDashboardExists = fs.existsSync(path.join(distDir, 'nl', 'dashboard.html'));
assert(!nlDashboardExists, 'nl/dashboard.html is NOT present in dist/');

const sensitiveFiles = getAllFiles(distDir, f => {
    const b = path.basename(f);
    return b.endsWith('.py') || b.endsWith('.zip') || (b.endsWith('.txt') && b !== 'robots.txt') || b === '.env';
});
assert(sensitiveFiles.length === 0, `No private script or archive files in dist/ (found: ${sensitiveFiles.length})`);

let adminBypassFound = false;
let noutEmailFound = false;
let localDashboardLinks = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('admin=nout') || content.includes('?admin=')) {
        adminBypassFound = true;
    }
    if (content.includes('noutpelgrim@') || content.includes('nout@replyvera')) {
        noutEmailFound = true;
    }
    if (content.includes('href="/dashboard.html"') || content.includes('href="dashboard.html"')) {
        localDashboardLinks.push(path.relative(distDir, file));
    }
}
assert(!adminBypassFound, 'Zero occurrences of ?admin=nout bypass in any deployed page');
assert(!noutEmailFound, 'Zero hardcoded private admin emails in any deployed page');
assert(localDashboardLinks.length === 0, `Zero links pointing to local dashboard.html (found in: ${localDashboardLinks.join(', ') || 'none'})`);

// Test Suite 3: Malformed HTML & Broken Tags
console.log('\n🔍 [3/11] Scanning for corrupted HTML syntax (<a h>, unrendered {{ tags }})...');
let brokenTagFiles = [];
let unrenderedTemplateFiles = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('<a h>') || content.includes('<a h ') || content.includes('<a h=')) {
        brokenTagFiles.push(path.relative(distDir, file));
    }
    if (content.includes('{{') || content.includes('}}')) {
        unrenderedTemplateFiles.push(path.relative(distDir, file));
    }
}
assert(brokenTagFiles.length === 0, `Zero occurrences of <a h> (corrupted in: ${brokenTagFiles.join(', ') || 'none'})`);
assert(unrenderedTemplateFiles.length === 0, `Zero unrendered {{ template }} variables (found in: ${unrenderedTemplateFiles.join(', ') || 'none'})`);

// Test Suite 4: CTA Integrity & Paddle Trial Crash Prevention
console.log('\n🎯 [4/11] Verifying CTA hrefs & JavaScript runtime safety...');
let isAgencyErrors = [];
let brokenPaddleTrials = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    if (content.includes('isAgency ?') || content.includes('isAgency?')) {
        isAgencyErrors.push(path.relative(distDir, file));
    }
    if (content.match(/openPaddleCheckout\([^)]+\)[^>]*>(\s*Start 14-Day Free Trial|Start Free Trial|Iniciar Prueba|Start Gratis)/i)) {
        brokenPaddleTrials.push(path.relative(distDir, file));
    }
}
assert(isAgencyErrors.length === 0, `Zero references to undefined 'isAgency' variable (found in: ${isAgencyErrors.join(', ') || 'none'})`);
assert(brokenPaddleTrials.length === 0, `Zero free trial buttons hijacking straight to Paddle checkout (found in: ${brokenPaddleTrials.join(', ') || 'none'})`);

const indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
assert(indexContent.includes('href="https://dashboard.replyvera.com/login?signup=true'), 'Homepage hero CTA points to dashboard signup');

// Test Suite 5: Technical SEO & Metadata Validation
console.log('\n🌐 [5/11] Validating Technical SEO (Titles, Meta Description, Canonical, Hreflang)...');
let missingTitle = [];
let missingDescription = [];
let missingCanonical = [];
let missingHreflang = [];

for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(distDir, file);
    
    if (!content.includes('<title>') || content.includes('<title></title>')) {
        missingTitle.push(rel);
    }
    if (!content.includes('name="description"') && !content.includes("name='description'")) {
        missingDescription.push(rel);
    }
    if (!content.includes('rel="canonical"') && !content.includes("rel='canonical'")) {
        missingCanonical.push(rel);
    }
    if (!content.includes('hreflang=')) {
        missingHreflang.push(rel);
    }
}
assert(missingTitle.length === 0, `Every HTML page has a valid <title> (missing in: ${missingTitle.length})`);
assert(missingDescription.length === 0, `Every HTML page has a meta description (missing in: ${missingDescription.length})`);
assert(missingCanonical.length === 0, `Every HTML page has a self-referencing canonical URL (missing in: ${missingCanonical.length})`);
assert(missingHreflang.length === 0, `Every HTML page contains reciprocal hreflang links (missing in: ${missingHreflang.length})`);

// Validate specific titles
const enIndexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
const esIndexHtml = fs.readFileSync(path.join(distDir, 'es', 'index.html'), 'utf-8');
const nlIndexHtml = fs.readFileSync(path.join(distDir, 'nl', 'index.html'), 'utf-8');

assert(enIndexHtml.includes('<title>Automated Google Review Responses | ReplyVera</title>'), 'EN Homepage title is "Automated Google Review Responses | ReplyVera"');
assert(esIndexHtml.includes('<title>Respuestas Automáticas a Reseñas de Google | ReplyVera</title>'), 'ES Homepage title is "Respuestas Automáticas a Reseñas de Google | ReplyVera"');
assert(nlIndexHtml.includes('<title>Geautomatiseerde Google Review Reacties | ReplyVera</title>'), 'NL Homepage title is "Geautomatiseerde Google Review Reacties | ReplyVera"');

// Test Suite 6: Trust, Factual Consistency & Policy Compliance
console.log('\n🛡️ [6/11] Checking Strict Claims Policy (No Credit Card / No Fake Partners)...');
let ccViolations = [];
let lodgeveraViolations = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(distDir, file);
    if (/no\s+credit\s+card\s+required/i.test(content) ||
        /sin\s+tarjeta\s+de\s+cr[eé]dito/i.test(content) ||
        /geen\s+creditcard\s+vereist/i.test(content) ||
        /geen\s+betaalgegevens/i.test(content)) {
        ccViolations.push(rel);
    }
    if (/lodgevera/i.test(content)) {
        lodgeveraViolations.push(rel);
    }
}
assert(ccViolations.length === 0, `Zero "no credit card required" claims across all pages (found in: ${ccViolations.join(', ') || 'none'})`);
assert(lodgeveraViolations.length === 0, `Zero references to non-existent partner "Lodgevera" (found in: ${lodgeveraViolations.join(', ') || 'none'})`);

// Test Suite 7: Master Industries Multilingual Parity (All 14 Verticals)
console.log('\n🏭 [7/11] Verifying all 14 industries exist across EN, ES, and NL...');
const requiredIndustries = [
    'hotels', 'restaurants', 'auto-repair', 'dentists', 'salons-spas',
    'medspas', 'contractors', 'car-washes', 'pet-care', 'childcare',
    'martial-arts', 'tutoring', 'laundromats', 'agencies'
];

let missingEn = [];
let missingEs = [];
let missingNl = [];

requiredIndustries.forEach(ind => {
    if (!fs.existsSync(path.join(distDir, 'industries', ind, 'index.html'))) {
        missingEn.push(ind);
    }
    const esExists = fs.existsSync(path.join(distDir, 'es', 'industries', ind, 'index.html')) ||
                     getAllFiles(path.join(distDir, 'es', 'industries')).some(f => f.includes(ind));
    if (!esExists) missingEs.push(ind);

    const nlExists = fs.existsSync(path.join(distDir, 'nl', 'industries', ind, 'index.html')) ||
                     getAllFiles(path.join(distDir, 'nl', 'industries')).some(f => f.includes(ind));
    if (!nlExists) missingNl.push(ind);
});

assert(missingEn.length === 0, `All 14 EN industry pages exist (missing: ${missingEn.join(', ') || 'none'})`);
assert(missingEs.length === 0, `All 14 ES industry pages exist (missing: ${missingEs.join(', ') || 'none'})`);
assert(missingNl.length === 0, `All 14 NL industry pages exist (missing: ${missingNl.join(', ') || 'none'})`);

// Test Suite 8: Language Switcher Crawlability (No JS, No Hash Links)
console.log('\n🌐 [8/11] Checking Language Switcher Crawlability & JS-independence...');
let changeLangCalls = [];
let dummyLangHashLinks = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(distDir, file);
    if (content.includes('onclick="changeLang') || content.includes("changeLang(")) {
        changeLangCalls.push(rel);
    }
    if (content.match(/class=["'](lang-item|mobile-lang-opt)[^"']*["'][^>]*href=["'](#[^"']*|\/#[^"']*)["']/)) {
        dummyLangHashLinks.push(rel);
    }
}
assert(changeLangCalls.length === 0, `Zero occurrences of onclick="changeLang" (found in: ${changeLangCalls.join(', ') || 'none'})`);
assert(dummyLangHashLinks.length === 0, `Zero language links pointing to dummy # or /# (found in: ${dummyLangHashLinks.join(', ') || 'none'})`);

// Test Suite 9: Static Asset References Check
console.log('\n🎨 [9/11] Checking that all local script tags point to existing files...');
let brokenScriptRefs = [];
for (const file of allHtmlFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const rel = path.relative(distDir, file);
    const scriptMatches = content.matchAll(/<script[^>]+src=["']([^"']+)["']/gi);
    for (const match of scriptMatches) {
        const src = match[1];
        if (!src.startsWith('http') && !src.startsWith('//') && !src.startsWith('/_vercel')) {
            const cleanPath = src.split('?')[0];
            const targetPath = path.join(distDir, cleanPath.startsWith('/') ? cleanPath.slice(1) : cleanPath);
            if (!fs.existsSync(targetPath)) {
                brokenScriptRefs.push(`${src} referenced in ${rel}`);
            }
        }
    }
}
assert(brokenScriptRefs.length === 0, `All local script tags resolve to existing files (broken: ${brokenScriptRefs.join(', ') || 'none'})`);

// Test Suite 10: Interactive Simulator Component Verification
console.log('\n🎮 [10/11] Verifying Interactive Review Simulator on Homepage...');
assert(enIndexHtml.includes('id="demo-preview"') || enIndexHtml.includes('id="hero-simulator"') || enIndexHtml.includes('id="simulator-preview"'), 'Homepage contains interactive simulator element');
assert(enIndexHtml.includes('simulator.js'), 'Homepage loads js/simulator.js');
assert(!enIndexHtml.includes('/demo.js?v=3'), 'Homepage is decoupled from demo.js script tag');
assert(enIndexHtml.includes('value="hotels"'), 'Simulator includes hotel scenario');
assert(enIndexHtml.includes('value="auto-repair"'), 'Simulator includes auto-repair scenario');
assert(enIndexHtml.includes('value="medspas"'), 'Simulator includes medspa scenario');
assert(enIndexHtml.includes('value="contractors"'), 'Simulator includes contractors scenario');

// Test Suite 11: Demo & Sitemap Integrity
console.log('\n🗺️ [11/11] Verifying sitemap.xml & demo.html indexing...');
assert(fs.existsSync(path.join(distDir, 'sitemap.xml')), 'sitemap.xml exists in dist/');
assert(fs.existsSync(path.join(distDir, 'robots.txt')), 'robots.txt exists in dist/');
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf-8');
assert(sitemapContent.includes('https://www.replyvera.com/demo.html'), 'sitemap.xml includes https://www.replyvera.com/demo.html');
assert(sitemapContent.includes('https://www.replyvera.com/pricing.html'), 'sitemap.xml includes https://www.replyvera.com/pricing.html');
assert(sitemapContent.includes('https://www.replyvera.com/industries/hotels/'), 'sitemap.xml includes hotels industry');
assert(sitemapContent.includes('https://www.replyvera.com/industries/auto-repair/'), 'sitemap.xml includes auto-repair industry');
assert(sitemapContent.includes('https://www.replyvera.com/industries/medspas/'), 'sitemap.xml includes medspas industry');
assert(sitemapContent.includes('https://www.replyvera.com/industries/contractors/'), 'sitemap.xml includes contractors industry');
assert(sitemapContent.includes('https://www.replyvera.com/resources/'), 'sitemap.xml includes resources hub');

const demoHtml = fs.readFileSync(path.join(distDir, 'demo.html'), 'utf-8');
assert(demoHtml.includes('rel="canonical" href="https://www.replyvera.com/demo.html"'), 'demo.html has canonical tag pointing to https://www.replyvera.com/demo.html');

console.log('\n====================================================');
console.log(`Test Results: ${passedTests} passed, ${failedTests} failed`);
if (failureDetails.length > 0) {
    console.log('\n❌ FAILED ASSERTIONS SUMMARY:');
    failureDetails.forEach((f, idx) => console.log(`  ${idx + 1}. ${f}`));
}
console.log('====================================================\n');

if (failedTests > 0) {
    process.exit(1);
} else {
    console.log('🎉 ALL REGRESSION TESTS PASSED! Production output is clean and verified.\n');
    process.exit(0);
}
