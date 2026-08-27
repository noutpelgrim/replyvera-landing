const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');
const { renderHeaderDropdownHTML, renderMobileAccordionHTML } = require('./lib/industries_master');

const srcDir = path.join(__dirname, 'src');
const localesDir = path.join(__dirname, 'locales');
const distDir = __dirname; // Building to root

const htmlFiles = fs.readdirSync(srcDir).filter(f => f.endsWith('.html'));

const locales = ['en', 'es', 'nl'];
const translations = {};

locales.forEach(lang => {
    const localePath = path.join(localesDir, `${lang}.json`);
    if (fs.existsSync(localePath)) {
        translations[lang] = JSON.parse(fs.readFileSync(localePath, 'utf-8'));
    } else {
        translations[lang] = {};
    }
});

const enTranslations = translations['en'];

locales.forEach(lang => {
    const isDefault = lang === 'en';
    const targetDir = isDefault ? distDir : path.join(distDir, lang);
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    htmlFiles.forEach(file => {
        let html = fs.readFileSync(path.join(srcDir, file), 'utf-8');
        
        // Update <html lang="..."> attribute
        html = html.replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${lang}"`);

        // Replace desktop header dropdown content with dynamically generated localized industries dropdown
        const headerDropdownHtml = renderHeaderDropdownHTML(lang);
        html = html.replace(
            /<!-- NAV_DROPDOWN_GRID_START -->[\s\S]*?<!-- NAV_DROPDOWN_GRID_END -->/,
            `<!-- NAV_DROPDOWN_GRID_START -->\n<div class="nav-dropdown-grid">\n${headerDropdownHtml}\n</div>\n<!-- NAV_DROPDOWN_GRID_END -->`
        );

        // Replace mobile menu accordion content with dynamically generated localized industries list
        const mobileAccordionHtml = renderMobileAccordionHTML(lang);
        html = html.replace(
            /<!-- MOBILE_IND_LIST_START -->[\s\S]*?<!-- MOBILE_IND_LIST_END -->/,
            `<!-- MOBILE_IND_LIST_START -->\n<div class="mobile-industry-list" id="mobile-ind-list">\n${mobileAccordionHtml}\n</div>\n<!-- MOBILE_IND_LIST_END -->`
        );

        // Update header language button label (EN -> NL / ES)
        html = html.replace(/<button class="lang-btn"[^>]*>[\s\S]*?<\/button>/, `
                    <button class="lang-btn" aria-label="Select Language">
                        <i class="fa-solid fa-globe" style="font-size:16px; margin-right:6px;"></i> ${lang.toUpperCase()}
                    </button>`);

        // Update mobile language selector active state
        html = html.replace(/class="mobile-lang-opt active"/g, 'class="mobile-lang-opt"');
        const langUpper = lang.toUpperCase();
        html = html.replace(
            new RegExp(`class="mobile-lang-opt"\\s+onclick="changeLang\\('${lang}',\\s*event\\)">${langUpper}<\\/a>`),
            `class="mobile-lang-opt active" onclick="changeLang('${lang}', event)">${langUpper}</a>`
        );

        // Replace {{ key }} with the localized string
        html = html.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, key) => {
            return translations[lang][key] || enTranslations[key] || match;
        });

        // Rewrite all internal links using centralized router
        html = localizeAllHtmlLinks(html, lang);

        if (!isDefault) {
            // Rewrite demo.js path for localized pages if needed
            html = html.replace(/src="\/demo\.js/g, `src="/${lang}/demo.js`);
        }

        // Sanitize pre-existing dynamic head tags to prevent duplication
        html = html
            .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
            .replace(/<link\s+rel=["']alternate["']\s+hreflang[^>]*>/gi, '')
            .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '')
            .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
            .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
            .replace(/<meta\s+name=["']description["'][^>]*>/gi, '');

        // Construct self-referencing canonical URL and hreflang links for host www.replyvera.com
        const baseUrl = 'https://www.replyvera.com';
        let relPath = file === 'index.html' ? (isDefault ? '/' : `/${lang}/`) : (isDefault ? `/${file}` : `/${lang}/${file}`);
        const canonicalUrl = `${baseUrl}${relPath}`;

        let enPath = file === 'index.html' ? '/' : `/${file}`;
        let esPath = file === 'index.html' ? '/es/' : `/es/${file}`;
        let nlPath = file === 'index.html' ? '/nl/' : `/nl/${file}`;

        const hreflangTags = `
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="alternate" hreflang="en" href="${baseUrl}${enPath}">
    <link rel="alternate" hreflang="es" href="${baseUrl}${esPath}">
    <link rel="alternate" hreflang="nl" href="${baseUrl}${nlPath}">
    <link rel="alternate" hreflang="x-default" href="${baseUrl}${enPath}">`;

        // Inject structured data & social sharing metadata for homepage
        let structuredData = '';
        let socialTags = '';
        if (file === 'index.html') {
            const pageTitle = translations[lang]["index_replyvera_google_review_automa_9af3"] || "AI Google Review Response Software | ReplyVera";
            const pageDesc = translations[lang]["index_meta_description"] || translations["en"]["index_meta_description"];
            const imageUrl = `${baseUrl}/img/replyvera_official_logo.png`;

            socialTags = `
    <meta property="og:type" content="website">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDesc}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:site_name" content="ReplyVera">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDesc}">
    <meta name="twitter:image" content="${imageUrl}">`;

            const orgSchema = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "ReplyVera",
                "url": baseUrl,
                "logo": `${baseUrl}/img/replyvera_official_logo.png`
            };

            const websiteSchema = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "ReplyVera",
                "url": baseUrl
            };

            const softwareSchema = {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "ReplyVera",
                "operatingSystem": "Web",
                "applicationCategory": "BusinessApplication",
                "offers": {
                    "@type": "Offer",
                    "price": "29.00",
                    "priceCurrency": "USD"
                },
                "description": "AI-powered Google review response software that automatically drafts and publishes personalized replies to existing Google reviews."
            };

            structuredData = `
    <script type="application/ld+json">
    ${JSON.stringify(orgSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(websiteSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(softwareSchema, null, 2)}
    </script>`;
        }

        // Meta description mapping for static pages
        const staticMetaDescs = {
            'pricing.html': {
                en: 'Simple, transparent pricing for ReplyVera. Automate your Google review responses starting at $29 per month with no contracts or hidden fees.',
                es: 'Precios simples y transparentes para ReplyVera. Automatiza tus respuestas a reseñas de Google desde $29 al mes sin contratos.',
                nl: 'Eenvoudige, transparante prijzen voor ReplyVera. Automatiseer je Google-reviewreacties vanaf $29 per maand zonder verborgen kosten.'
            },
            'privacy.html': {
                en: 'Privacy Policy for ReplyVera. Learn how we handle your Google Business Profile data and protect customer information.',
                es: 'Política de privacidad de ReplyVera. Conoce cómo manejamos tus datos de Google Bedrijfsprofiel y protegemos tu información.',
                nl: 'Privacybeleid voor ReplyVera. Lees hoe wij omgaan met je gegevens van je Google Bedrijfsprofiel en klantinformatie beschermen.'
            },
            'terms.html': {
                en: 'Terms of Service for ReplyVera. Review our service terms, automated review response guidelines, and billing policy.',
                es: 'Términos del servicio de ReplyVera. Revisa nuestros términos de servicio y políticas de facturación.',
                nl: 'Algemene voorwaarden voor ReplyVera. Bekijk onze servicevoorwaarden, richtlijnen en facturatiebeleid.'
            },
            'cookie.html': {
                en: 'Cookie Policy for ReplyVera. Understand how we use essential cookies to maintain site security and performance.',
                es: 'Política de cookies de ReplyVera. Descubre cómo usamos cookies esenciales para seguridad y rendimiento.',
                nl: 'Cookiebeleid voor ReplyVera. Ontdek hoe wij essentiële cookies gebruiken voor beveiliging en prestaties.'
            }
        };

        let metaDescTag = '';
        if (file === 'index.html') {
            metaDescTag = `<meta name="description" content="${translations[lang]["index_meta_description"] || translations["en"]["index_meta_description"]}">`;
        } else if (staticMetaDescs[file]) {
            metaDescTag = `<meta name="description" content="${staticMetaDescs[file][lang] || staticMetaDescs[file]['en']}">`;
        }

        html = html.replace(/<title>[\s\S]*?<\/title>/, (m) => `${m}\n    ${metaDescTag}`);

        html = html.replace('</head>', `${hreflangTags}${socialTags}${structuredData}\n</head>`);

        // Add auto-redirect script only on the root english index file
        if (isDefault && file === 'index.html') {
            const redirectScript = `
    <script>
        (function() {
            if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
                var lang = navigator.language || navigator.userLanguage;
                if (lang) {
                    if (lang.startsWith('es') && !localStorage.getItem('lang_redirected')) {
                        localStorage.setItem('lang_redirected', 'true');
                        window.location.href = '/es/';
                    } else if (lang.startsWith('nl') && !localStorage.getItem('lang_redirected')) {
                        localStorage.setItem('lang_redirected', 'true');
                        window.location.href = '/nl/';
                    }
                }
            }
        })();
    </script>`;
            html = html.replace('</head>', `${redirectScript}\n</head>`);
        }

        fs.writeFileSync(path.join(targetDir, file), html);
    });
});

console.log("Build complete! Generated localized static HTML files with marker-based menu replacements.");

// Automatically build resources & SEO sitemap
try {
    require('./build-resources');
} catch (err) {
    console.error('Error running build-resources:', err);
}
