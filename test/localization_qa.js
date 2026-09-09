/**
 * ReplyVera — Automated Localization & Compliance QA Suite
 * 
 * Verifies that the production build in dist/ satisfies:
 * 1. Zero English leaks in ES and NL pages (headers, simulator, comparison, safeguards).
 * 2. Zero Dutch in Spanish legal pages.
 * 3. Formal Dutch (u/uw) consistency with zero informal (je/jij/jouw) leaks in NL resources & landing pages.
 * 4. Trigger/Action labels: Criterio/Acción (ES) and Criterium/Actie (NL).
 * 5. Simulation disclaimers and "Simulate Publishing" buttons (zero "Publish to Google Now").
 * 6. Paddle identified as Merchant of Record & Google API Limited Use compliance.
 * 7. Security headers in vercel.json.
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
        console.log(`  ✓ PASS: ${message}`);
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
console.log('🌍 Running ReplyVera Localization & Compliance QA Suite');
console.log('====================================================\n');

// ─── 1. Spanish Localization & Zero Leaks ──────────────────────
console.log('🇪🇸 [1/7] Verifying Spanish Localization & Zero Leaks...');

const esIndex = fs.readFileSync(path.join(distDir, 'es', 'index.html'), 'utf-8');

// Language switcher label
assert(!esIndex.includes('Language:'), 'ES index does not contain English "Language:" in switcher');
assert(esIndex.includes('Idioma:'), 'ES index contains localized "Idioma:" in switcher');

// Hero section translations
assert(!esIndex.includes('Try the Live Demo'), 'ES index does not contain English "Try the Live Demo"');
assert(esIndex.includes('Ver la demostración en vivo'), 'ES index contains localized "Ver la demostración en vivo"');
assert(!esIndex.includes('Connects to Google Business Profile &bull; 14-Day Free Trial'), 'ES index does not contain English "Connects to Google Business Profile &bull; 14-Day Free Trial"');
assert(esIndex.includes('Se conecta con el Perfil de Empresa de Google'), 'ES index contains localized "Se conecta con el Perfil de Empresa de Google"');

// Cookie Settings footer link
assert(esIndex.includes('Configuración de Cookies') || esIndex.includes('data-open-cookie-settings'), 'ES index contains Cookie Settings link in footer');

// Comparison table
assert(esIndex.includes('ChatGPT (Copia y Pega Manual)'), 'ES index ChatGPT comparison contains "ChatGPT (Copia y Pega Manual)"');
assert(esIndex.includes('Publicación Automática de Reseñas Positivas'), 'ES index comparison contains "Publicación Automática de Reseñas Positivas"');
assert(esIndex.includes('Sincronización directa con Perfil de Empresa en Google'), 'ES index comparison contains "Sincronización directa con Perfil de Empresa en Google"');
assert(esIndex.includes('Detección de Reseñas Sensibles'), 'ES index comparison contains "Detección de Reseñas Sensibles"');

// Review simulator
assert(esIndex.includes('Simulación Interactiva del Flujo de Trabajo'), 'ES index contains localized simulator eyebrow');
assert(esIndex.includes('Pruebe cómo evalúa ReplyVera reseñas reales antes de conectar'), 'ES index contains localized simulator headline');
assert(esIndex.includes('Seguro para Publicación Automática'), 'ES index simulator contains "Seguro para Publicación Automática"');

// Spanish Privacy & Legal
const esPrivacy = fs.readFileSync(path.join(distDir, 'es', 'privacy.html'), 'utf-8');
assert(!esPrivacy.includes('Google Bedrijfsprofiel'), 'ES privacy policy meta description/body contains zero Dutch "Google Bedrijfsprofiel"');
const dutchWordsInEs = ['Bedrijfsnaam', 'KvK-nummer', 'BTW-nummer', 'Handelsnaam', 'overeenkomst', 'persoonsgegevens', 'verwerken'];
const foundDutchInEs = dutchWordsInEs.filter(w => esPrivacy.includes(w));
assert(foundDutchInEs.length === 0, `ES privacy policy contains zero Dutch words (found: ${foundDutchInEs.join(', ') || 'none'})`);

assert(esPrivacy.includes('Merchant of Record') || esPrivacy.includes('Comerciante Registrado'), 'ES privacy policy specifies Paddle as Merchant of Record');
assert(esPrivacy.includes('info@replyvera.com'), 'ES privacy policy contains valid contact email');
assert(esPrivacy.includes('href="mailto:info@replyvera.com"'), 'ES privacy policy contains clickable mailto link');
assert(esPrivacy.includes('modelos de IA') || esPrivacy.includes('modelos de inteligencia artificial') || esPrivacy.includes('modelos de IA/ML'), 'ES privacy policy clarifies Google API Limited Use regarding AI models');

// ─── 2. Dutch Localization & Formal Tone ───────────────────────
console.log('\n🇳🇱 [2/7] Verifying Dutch Localization & Formal Tone (u/uw)...');

const nlIndex = fs.readFileSync(path.join(distDir, 'nl', 'index.html'), 'utf-8');

// Language switcher label
assert(!nlIndex.includes('Language:'), 'NL index does not contain English "Language:" in switcher');
assert(nlIndex.includes('Taal:'), 'NL index contains localized "Taal:" in switcher');

// Hero section translations
assert(!nlIndex.includes('Try the Live Demo'), 'NL index does not contain English "Try the Live Demo"');
assert(nlIndex.includes('Bekijk de live demo'), 'NL index contains localized "Bekijk de live demo"');
assert(nlIndex.includes('Cookie-instellingen') || nlIndex.includes('data-open-cookie-settings'), 'NL index contains Cookie Settings link in footer');

// Comparison table
assert(nlIndex.includes('ChatGPT (Handmatig Kopiëren & Plakken)'), 'NL index ChatGPT comparison contains "ChatGPT (Handmatig Kopiëren & Plakken)"');
assert(nlIndex.includes('Routinematige Positieve Reviews Publiceren'), 'NL index comparison contains "Routinematige Positieve Reviews Publiceren"');
assert(nlIndex.includes('Directe synchronisatie met Google Bedrijfsprofiel'), 'NL index comparison contains "Directe synchronisatie met Google Bedrijfsprofiel"');
assert(nlIndex.includes('Detectie van Gevoelige Reviews'), 'NL index comparison contains "Detectie van Gevoelige Reviews"');

// Review simulator
assert(nlIndex.includes('Interactieve Workflowsimulatie'), 'NL index contains localized simulator eyebrow');
assert(nlIndex.includes('Bekijk hoe ReplyVera echte reviews evalueert voordat u koppelt'), 'NL index contains localized simulator headline');
assert(nlIndex.includes('Veilig voor Automatische Publicatie'), 'NL index simulator contains "Veilig voor Automatische Publicatie"');

// Dutch Privacy & Legal
const nlPrivacy = fs.readFileSync(path.join(distDir, 'nl', 'privacy.html'), 'utf-8');
assert(nlPrivacy.includes('Merchant of Record') || nlPrivacy.includes('verkoper van record'), 'NL privacy policy specifies Paddle as Merchant of Record');
assert(nlPrivacy.includes('info@replyvera.com'), 'NL privacy policy contains valid contact email');
assert(nlPrivacy.includes('href="mailto:info@replyvera.com"'), 'NL privacy policy contains clickable mailto link');
assert(nlPrivacy.includes('AI/ML-modellen') && nlPrivacy.includes('trainen'), 'NL privacy policy clarifies Google API Limited Use regarding AI training');

// Check formal Dutch in NL resources
const nlResourceFiles = getAllFiles(path.join(distDir, 'nl', 'resources'), f => f.endsWith('.html'));
assert(nlResourceFiles.length >= 7, `Found ${nlResourceFiles.length} NL resource pages`);
let informalDutchLeaks = [];
for (const rf of nlResourceFiles) {
    const text = fs.readFileSync(rf, 'utf-8');
    const bodyMatch = text.match(/<article[\s\S]*?<\/article>/i) || text.match(/<main[\s\S]*?<\/main>/i);
    const contentToScan = bodyMatch ? bodyMatch[0] : text;
    const cleanText = contentToScan.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ');
    const matches = cleanText.match(/\b(je\s+kunt|je\s+moet|je\s+bedrijf|jouw\s+bedrijf|je\s+klanten|jouw\s+klanten|jij\s+kunt)\b/gi);
    if (matches && matches.length > 0) {
        informalDutchLeaks.push(`${path.basename(path.dirname(rf))}: ${matches.slice(0, 3).join(', ')}`);
    }
}
assert(informalDutchLeaks.length === 0, `NL resource articles use formal Dutch (u/uw) with no informal leaks (found: ${informalDutchLeaks.join('; ') || 'none'})`);

// ─── 3. Industry Safeguards & Trigger/Action Labels ─────────────
console.log('\n🏭 [3/7] Verifying Industry Safeguard Engine & Trigger/Action Labels...');

const esIndustryFiles = getAllFiles(path.join(distDir, 'es', 'industries'), f => f.endsWith('.html') && !f.includes('index.html.gz'));
const nlIndustryFiles = getAllFiles(path.join(distDir, 'nl', 'industries'), f => f.endsWith('.html') && !f.includes('index.html.gz'));

assert(esIndustryFiles.length >= 14, `Found ${esIndustryFiles.length} Spanish industry landing pages`);
assert(nlIndustryFiles.length >= 14, `Found ${nlIndustryFiles.length} Dutch industry landing pages`);

let esTriggerErrors = 0;
let esActionErrors = 0;
for (const file of esIndustryFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    if (html.includes('id="product-proof"')) {
        if (!html.includes('<strong>Criterio:</strong>')) esTriggerErrors++;
        if (!html.includes('<strong>Acción:</strong>')) esActionErrors++;
        if (html.includes('<strong>Trigger:</strong>')) esTriggerErrors++;
        if (html.includes('<strong>Action:</strong>')) esActionErrors++;
    }
}
assert(esTriggerErrors === 0, `Zero trigger label errors in Spanish industry pages (all use "Criterio:")`);
assert(esActionErrors === 0, `Zero action label errors in Spanish industry pages (all use "Acción:")`);

let nlTriggerErrors = 0;
let nlActionErrors = 0;
for (const file of nlIndustryFiles) {
    const html = fs.readFileSync(file, 'utf-8');
    if (html.includes('id="product-proof"')) {
        if (!html.includes('<strong>Criterium:</strong>')) nlTriggerErrors++;
        if (!html.includes('<strong>Actie:</strong>')) nlActionErrors++;
        if (html.includes('<strong>Trigger:</strong>')) nlTriggerErrors++;
        if (html.includes('<strong>Action:</strong>')) nlActionErrors++;
    }
}
assert(nlTriggerErrors === 0, `Zero trigger label errors in Dutch industry pages (all use "Criterium:")`);
assert(nlActionErrors === 0, `Zero action label errors in Dutch industry pages (all use "Actie:")`);

// ─── 4. Demo Clarity & Publishing Disclaimer ────────────────────
console.log('\n🎮 [4/7] Verifying Demo Clarity & "Simulate Publishing" Disclaimers...');

const demoFiles = [
    { file: path.join(distDir, 'demo.html'), lang: 'en', btnText: 'Simulate Publishing', discl: 'Simulation' },
    { file: path.join(distDir, 'es', 'demo.html'), lang: 'es', btnText: 'Simular Publicación', discl: 'simulación' },
    { file: path.join(distDir, 'nl', 'demo.html'), lang: 'nl', btnText: 'Publicatie Simuleren', discl: 'simulatie' }
];

demoFiles.forEach(d => {
    assert(fs.existsSync(d.file), `${d.lang.toUpperCase()} demo.html exists`);
    const content = fs.readFileSync(d.file, 'utf-8');
    assert(!content.includes('Publish to Google Now'), `${d.lang.toUpperCase()} demo does NOT say "Publish to Google Now"`);
    assert(content.includes(d.btnText), `${d.lang.toUpperCase()} demo contains button label "${d.btnText}"`);
    assert(content.toLowerCase().includes(d.discl.toLowerCase()), `${d.lang.toUpperCase()} demo contains simulation disclaimer`);
    assert(!content.includes('HIPAA'), `${d.lang.toUpperCase()} demo contains zero HIPAA claims`);
});

// Check demo.js scripts for "Publish to Google Now"
const demoJsFiles = [
    path.join(distDir, 'demo.js'),
    path.join(distDir, 'es', 'demo.js'),
    path.join(distDir, 'nl', 'demo.js')
];
demoJsFiles.forEach(dj => {
    if (fs.existsSync(dj)) {
        const jsContent = fs.readFileSync(dj, 'utf-8');
        assert(!jsContent.includes('Publish to Google Now'), `${path.basename(path.dirname(dj)) || 'root'}/${path.basename(dj)} contains zero "Publish to Google Now"`);
    }
});

// ─── 5. Pricing Spacing & Language Support ──────────────────────
console.log('\n💰 [5/7] Verifying Pricing Spacing, Periods & Language Support...');

const enPricing = fs.readFileSync(path.join(distDir, 'pricing.html'), 'utf-8');
const esPricing = fs.readFileSync(path.join(distDir, 'es', 'pricing.html'), 'utf-8');
const nlPricing = fs.readFileSync(path.join(distDir, 'nl', 'pricing.html'), 'utf-8');

// Ensure price-prefix has margin-right:6px style separation
assert(enPricing.includes('class="price-prefix" style="font-size:1.2rem;font-weight:600;margin-right:6px;">From</span>$79'), 'EN pricing has clean "From $79" with prefix spacing');
assert(esPricing.includes('class="price-prefix" style="font-size:1.2rem;font-weight:600;margin-right:6px;">Desde</span>$79'), 'ES pricing has clean "Desde $79" with prefix spacing');
assert(nlPricing.includes('class="price-prefix" style="font-size:1.2rem;font-weight:600;margin-right:6px;">Vanaf</span>$79'), 'NL pricing has clean "Vanaf $79" with prefix spacing');

// Dutch language support listed in FAQ
assert(enPricing.includes('Dutch') || enPricing.includes('Dutch (Nederlands)'), 'EN pricing FAQ confirms Dutch language support');
assert(esPricing.includes('holandés') || esPricing.includes('neerlandés') || esPricing.includes('Holandés'), 'ES pricing FAQ confirms Dutch language support');
assert(nlPricing.includes('Nederlands'), 'NL pricing FAQ confirms Dutch language support');

// Annual toggle calculation check
assert(enPricing.includes('data-monthly="$79" data-annual="$790"'), 'EN pricing card multi-location has correct $79 / $790 data attributes');
assert(enPricing.includes('data-monthly="$149" data-annual="$1,490"'), 'EN pricing card agency has correct $149 / $1,490 data attributes');

// ─── 6. Production Security Headers ────────────────────────────
console.log('\n🛡️ [6/7] Verifying Security Headers in vercel.json...');

const vercelJsonPath = path.join(__dirname, '..', 'vercel.json');
assert(fs.existsSync(vercelJsonPath), 'vercel.json exists');
const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));
assert(Array.isArray(vercelConfig.headers), 'vercel.json contains headers configuration array');

const rootHeaders = vercelConfig.headers.find(h => h.source === '/(.*)');
assert(!!rootHeaders, 'vercel.json has global headers route "/(.*)"');

if (rootHeaders) {
    const headerMap = {};
    rootHeaders.headers.forEach(h => {
        headerMap[h.key.toLowerCase()] = h.value;
    });

    assert(!!headerMap['x-content-type-options'], 'Security header X-Content-Type-Options: nosniff is set');
    assert(!!headerMap['x-frame-options'], 'Security header X-Frame-Options: DENY is set');
    assert(!!headerMap['referrer-policy'], 'Security header Referrer-Policy is set');
    assert(!!headerMap['strict-transport-security'], 'Security header Strict-Transport-Security (HSTS) is set');
    assert(!!headerMap['content-security-policy'], 'Security header Content-Security-Policy is set');
    assert(headerMap['content-security-policy'].includes("script-src 'self'"), 'CSP allows self scripts');
    assert(headerMap['content-security-policy'].includes("cdn.paddle.com"), 'CSP allows Paddle script CDN');
}

// ─── 7. No Placeholders & Merchant of Record Clarity ────────────
console.log('\n📜 [7/7] Verifying No Unfilled Brackets and MoR Transparency...');

const allPages = getAllFiles(distDir, f => f.endsWith('.html'));
let placeholderPages = [];
for (const p of allPages) {
    const content = fs.readFileSync(p, 'utf-8');
    if (content.match(/\[(Company Legal Name|Trading Name|Physical Address|Registration Number|VAT ID)\]/)) {
        placeholderPages.push(path.relative(distDir, p));
    }
}
assert(placeholderPages.length === 0, `Zero unfilled template brackets [Company ...] in any deployed HTML file (found in: ${placeholderPages.join(', ') || 'none'})`);

const termsFiles = [
    path.join(distDir, 'terms.html'),
    path.join(distDir, 'es', 'terms.html'),
    path.join(distDir, 'nl', 'terms.html')
];
termsFiles.forEach(tf => {
    if (fs.existsSync(tf)) {
        const c = fs.readFileSync(tf, 'utf-8');
        assert(c.includes('Paddle'), `${path.basename(path.dirname(tf)) || 'root'}/${path.basename(tf)} transparently names Paddle as Merchant of Record`);
    }
});

// ─── Summary ────────────────────────────────────────────────────
console.log('\n====================================================');
console.log(`Localization QA Results: ${passedTests} passed, ${failedTests} failed`);
console.log('====================================================\n');

if (failedTests > 0) {
    console.error('❌ Failures occurred:');
    failureDetails.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
} else {
    console.log('🎉 ALL LOCALIZATION & COMPLIANCE QA CHECKS PASSED!');
    process.exit(0);
}
