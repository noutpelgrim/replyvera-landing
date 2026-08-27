const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');
const { articles } = require('./lib/resources_master');

const locales = ['en', 'es', 'nl'];

function getHeaderAndFooter(lang) {
    const isDefault = lang === 'en';
    const indexPath = isDefault
        ? path.join(__dirname, 'index.html')
        : path.join(__dirname, lang, 'index.html');

    const baseHtml = fs.existsSync(indexPath)
        ? fs.readFileSync(indexPath, 'utf8')
        : fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

    let navSplit = baseHtml.split('<!-- 2. Hero -->');
    if (navSplit.length < 2) navSplit = baseHtml.split('<header class="hero"');

    const rawH = navSplit[0];
    const restP = navSplit[1];
    const footerSplit = restP.split('<!-- Footer -->');
    const rawF = footerSplit.length >= 2 ? '<!-- Footer -->' + footerSplit[1] : '</footer></body></html>';

    let cleanedH = rawH
        .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<link\s+rel=["']alternate["']\s+hreflang[^>]*>/gi, '')
        .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '')
        .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']description["'][^>]*>/gi, '');

    let patchedH = localizeAllHtmlLinks(cleanedH, lang);
    let patchedF = localizeAllHtmlLinks(rawF, lang);

    return { header: patchedH, footer: patchedF };
}

// 1. Build Resources Hub Index for all languages
function buildResourcesIndex() {
    locales.forEach(lang => {
        const isDefault = lang === 'en';
        const targetDir = isDefault
            ? path.join(__dirname, 'resources')
            : path.join(__dirname, lang, 'resources');

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        const { header, footer } = getHeaderAndFooter(lang);

        const readGuideLabel = lang === 'nl' ? 'Lees Gids' : lang === 'es' ? 'Leer Guía' : 'Read Guide';
        const eyebrowLabel = lang === 'nl' ? 'Kennisbank & Inzichten' : lang === 'es' ? 'Centro de Conocimiento' : 'Knowledge Base & Insights';
        const h1Title = lang === 'nl' ? 'Gidsen voor Google-reviewbeheer' : lang === 'es' ? 'Recursos de Gestión de Reseñas de Google' : 'Google Review Management Resources';
        const heroSub = lang === 'nl'
            ? 'Praktische gidsen en strategieën om kleine bedrijven te helpen geautomatiseerde Google-reviewreacties professioneel en efficiënt af te handelen.'
            : lang === 'es'
            ? 'Guías prácticas y estrategias para ayudar a pequeñas empresas a gestionar respuestas automáticas a reseñas de Google de forma profesional y eficiente.'
            : 'Practical guides and proven strategies to help small business owners handle automated Google review responses professionally, personally, and efficiently.';

        const ctaTitle = lang === 'nl' ? 'Klaar om je Google-reviewreacties te automatiseren?' : lang === 'es' ? '¿Listo para automatizar tus respuestas a reseñas de Google?' : 'Ready to Automate Your Google Review Responses?';
        const ctaDesc = lang === 'nl'
            ? 'Bespaar wekelijks uren met een responssnelheid van 100%. ReplyVera handelt routinereviews automatisch af en escaleert gevoelige feedback.'
            : lang === 'es'
            ? 'Ahorra horas cada semana manteniendo una tasa de respuesta del 100%. ReplyVera gestiona reseñas de rutina automáticamente y escala comentarios delicados.'
            : 'Save hours each week while maintaining a 100% response rate. ReplyVera handles routine reviews automatically and escalates sensitive feedback to your team.';

        const ctaBtnText = lang === 'nl' ? 'Start Gratis Proefperiode van 14 Dagen' : lang === 'es' ? 'Comenzar Prueba Gratuita de 14 Días' : 'Start Your 14-Day Free Trial';
        const ctaBtnPricing = lang === 'nl' ? 'Bekijk Tarieven & Pakketten' : lang === 'es' ? 'Ver Precios y Planes' : 'View Pricing & Plans';

        const prefix = isDefault ? '' : `/${lang}`;

        const cardsHtml = articles.map(a => {
            const trans = a.translations[lang] || a.translations['en'];
            const category = a.category[lang] || a.category['en'];
            const readTime = a.readTime[lang] || a.readTime['en'];

            return `
        <a href="${prefix}/resources/${a.slug}" class="resource-card">
            <div>
                <div class="resource-card-meta">
                    <span class="resource-category">${category}</span>
                    <span class="resource-read-time">
                        <i data-lucide="clock" style="width:13px;height:13px;"></i>
                        ${readTime}
                    </span>
                </div>
                <h3 class="resource-card-title">${trans.title}</h3>
                <p class="resource-card-desc">${trans.summary}</p>
            </div>
            <div class="resource-card-link">
                <span>${readGuideLabel}</span>
                <i data-lucide="arrow-right" style="width:14px;height:14px;"></i>
            </div>
        </a>
        `;
        }).join('');

        const pageTitle = lang === 'nl'
            ? "Gidsen voor Google-reviewbeheer | ReplyVera"
            : lang === 'es'
            ? "Recursos y Guías de Gestión de Reseñas de Google | ReplyVera"
            : "Google Review Management Resources & Guides | ReplyVera";

        const pageDesc = lang === 'nl'
            ? "Ontdek gidsen, best practices en inzichten over geautomatiseerde Google-reviewreacties, reputatiebeheer en lokale SEO voor kleine bedrijven."
            : lang === 'es'
            ? "Explora guías de expertos y estrategias sobre respuestas automáticas a reseñas de Google, gestión de reputación y SEO local."
            : "Explore expert guides, best practices, and actionable insights on automated Google review responses, reputation management, and local SEO for small businesses.";

        const canonicalUrl = `https://www.replyvera.com${prefix}/resources/`;

        const hreflangTags = `
    <link rel="alternate" hreflang="en" href="https://www.replyvera.com/resources/" />
    <link rel="alternate" hreflang="es" href="https://www.replyvera.com/es/resources/" />
    <link rel="alternate" hreflang="nl" href="https://www.replyvera.com/nl/resources/" />
    <link rel="alternate" hreflang="x-default" href="https://www.replyvera.com/resources/" />`;

        let customHeader = header
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${pageTitle}</title>\n    <meta name="description" content="${pageDesc}">`)
            .replace('</head>', `
    <link rel="canonical" href="${canonicalUrl}" />${hreflangTags}
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://www.replyvera.com/img/replyvera_official_logo.png" />
    <meta property="og:site_name" content="ReplyVera" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDesc}" />
    <meta name="twitter:image" content="https://www.replyvera.com/img/replyvera_official_logo.png" />
</head>`);

        const pageContent = `
    <!-- Resources Hero -->
    <section class="resources-hero">
        <div class="container">
            <div class="eyebrow" style="justify-content: center; margin-bottom: 12px;">
                <i data-lucide="book-open" style="width:14px;height:14px;color:var(--primary-light);"></i>
                ${eyebrowLabel}
            </div>
            <h1>${h1Title}</h1>
            <p>${heroSub}</p>
        </div>
    </section>

    <!-- Resources Cards Section -->
    <section class="section" style="padding: 48px 0 80px;">
        <div class="container">
            <div class="resources-grid">
                ${cardsHtml}
            </div>

            <!-- Natural Call to Action -->
            <div class="article-cta-box" style="margin-top: 64px;">
                <div class="article-cta-title">${ctaTitle}</div>
                <p class="article-cta-desc">${ctaDesc}</p>

                <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                    <a href="${prefix}/#pricing" class="btn btn-accent btn-lg">${ctaBtnText}</a>
                    <a href="${prefix}/pricing.html" class="btn btn-secondary btn-lg">${ctaBtnPricing}</a>
                </div>
            </div>
        </div>
    </section>
        `;

        const fullHtml = `${customHeader}\n${pageContent}\n${footer}`;
        fs.writeFileSync(path.join(targetDir, 'index.html'), fullHtml);

        if (isDefault) {
            fs.writeFileSync(path.join(__dirname, 'resources.html'), fullHtml);
        }
        console.log(`✓ Built Resources Hub Index [${lang.toUpperCase()}]: ${prefix}/resources/index.html`);
    });
}

// 2. Build Article Detail Pages for all languages
function buildArticles() {
    locales.forEach(lang => {
        const isDefault = lang === 'en';
        const prefix = isDefault ? '' : `/${lang}`;
        const resourcesDir = isDefault
            ? path.join(__dirname, 'resources')
            : path.join(__dirname, lang, 'resources');

        const { header, footer } = getHeaderAndFooter(lang);

        const homeLabel = 'Home';
        const resourcesLabel = lang === 'nl' ? 'Kennisbank' : lang === 'es' ? 'Recursos' : 'Resources';
        const byAuthorLabel = lang === 'nl' ? 'Door ReplyVera Team' : lang === 'es' ? 'Por el Equipo de ReplyVera' : 'By ReplyVera Team';
        const publishedLabel = lang === 'nl' ? 'Gepubliceerd' : lang === 'es' ? 'Publicado' : 'Published';
        const ctaTitle = lang === 'nl' ? 'Laat ReplyVera je reviewreacties afhandelen' : lang === 'es' ? 'Deja que ReplyVera gestione tus respuestas' : 'Let ReplyVera Handle Your Review Replies';
        const ctaDesc = lang === 'nl'
            ? 'Mis nooit meer een klantreview. Publiceer automatisch reacties op 5-sterrenreviews en escaleer gevoelige feedback naar je team.'
            : lang === 'es'
            ? 'No vuelvas a perderte una reseña. Publica respuestas automáticas a reseñas de 5 estrellas y escala comentarios delicados a tu equipo.'
            : 'Never miss a customer review again. Automatically publish tailored 5-star responses while routing sensitive feedback to your team.';

        const ctaBtnText = lang === 'nl' ? 'Start Gratis Proefperiode van 14 Dagen' : lang === 'es' ? 'Comenzar Prueba Gratuita de 14 Días' : 'Start Your 14-Day Free Trial';
        const ctaBtnPricing = lang === 'nl' ? 'Vergelijk Tarieven & Pakketten' : lang === 'es' ? 'Comparar Planes y Precios' : 'Compare Plans & Pricing';

        articles.forEach(a => {
            const articleDir = path.join(resourcesDir, a.slug);
            if (!fs.existsSync(articleDir)) {
                fs.mkdirSync(articleDir, { recursive: true });
            }

            const trans = a.translations[lang] || a.translations['en'];
            const category = a.category[lang] || a.category['en'];
            const readTime = a.readTime[lang] || a.readTime['en'];

            const pageTitle = `${trans.title} | ReplyVera`;
            const canonicalUrl = `https://www.replyvera.com${prefix}/resources/${a.slug}/`;

            const hreflangTags = `
    <link rel="alternate" hreflang="en" href="https://www.replyvera.com/resources/${a.slug}/" />
    <link rel="alternate" hreflang="es" href="https://www.replyvera.com/es/resources/${a.slug}/" />
    <link rel="alternate" hreflang="nl" href="https://www.replyvera.com/nl/resources/${a.slug}/" />
    <link rel="alternate" hreflang="x-default" href="https://www.replyvera.com/resources/${a.slug}/" />`;

            // Article Schema
            const articleSchema = {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": trans.title,
                "description": trans.metaDescription,
                "author": {
                    "@type": "Organization",
                    "name": "ReplyVera Team",
                    "url": "https://www.replyvera.com"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "ReplyVera",
                    "url": "https://www.replyvera.com"
                },
                "datePublished": a.publishedDate,
                "dateModified": a.modifiedDate,
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": canonicalUrl
                }
            };

            // Breadcrumb Schema
            const breadcrumbSchema = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": homeLabel,
                        "item": `https://www.replyvera.com${prefix}/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": resourcesLabel,
                        "item": `https://www.replyvera.com${prefix}/resources/`
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": trans.title,
                        "item": canonicalUrl
                    }
                ]
            };

            let customHeader = header
                .replace(/<title>[\s\S]*?<\/title>/, `<title>${pageTitle}</title>\n    <meta name="description" content="${trans.metaDescription}">`)
                .replace('</head>', `
    <link rel="canonical" href="${canonicalUrl}" />${hreflangTags}
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${trans.metaDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="https://www.replyvera.com/img/replyvera_official_logo.png" />
    <meta property="og:site_name" content="ReplyVera" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${trans.metaDescription}" />
    <meta name="twitter:image" content="https://www.replyvera.com/img/replyvera_official_logo.png" />
    <script type="application/ld+json">
    ${JSON.stringify(articleSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
</head>`);

            const pageContent = `
        <article class="article-container">
            <header class="article-header">
                <nav class="article-breadcrumb" aria-label="Breadcrumb">
                    <a href="${prefix}/">${homeLabel}</a>
                    <span>/</span>
                    <a href="${prefix}/resources">${resourcesLabel}</a>
                    <span>/</span>
                    <span style="color:var(--text-muted);">${category}</span>
                </nav>
                <h1 class="article-title">${trans.title}</h1>
                <div class="article-author-bar">
                    <span class="article-author">${byAuthorLabel}</span>
                    <span>&bull;</span>
                    <span>${publishedLabel}: ${a.publishedDate}</span>
                    <span>&bull;</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">
                        <i data-lucide="clock" style="width:14px;height:14px;"></i>
                        ${readTime}
                    </span>
                </div>
            </header>

            <div class="article-body">
                ${trans.content}
            </div>

            <!-- Natural Call to Action Box -->
            <div class="article-cta-box">
                <div class="article-cta-title">${ctaTitle}</div>
                <p class="article-cta-desc">${ctaDesc}</p>
                <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                    <a href="${prefix}/#pricing" class="btn btn-accent btn-lg">${ctaBtnText}</a>
                    <a href="${prefix}/pricing.html" class="btn btn-secondary btn-lg">${ctaBtnPricing}</a>
                </div>
            </div>
        </article>
        `;

            const fullHtml = `${customHeader}\n${pageContent}\n${footer}`;
            fs.writeFileSync(path.join(articleDir, 'index.html'), fullHtml);
            console.log(`✓ Built Article Page [${lang.toUpperCase()}]: ${prefix}/resources/${a.slug}/index.html`);
        });
    });
}

// 3. Build sitemap.xml
function buildSitemap() {
    const { getLocalizedPath: getIndPath } = require('./lib/industries_master');

    const staticUrls = [
        'https://www.replyvera.com/',
        'https://www.replyvera.com/es/',
        'https://www.replyvera.com/nl/',
        'https://www.replyvera.com/pricing.html',
        'https://www.replyvera.com/es/pricing.html',
        'https://www.replyvera.com/nl/pricing.html',
        'https://www.replyvera.com/privacy.html',
        'https://www.replyvera.com/terms.html',
        'https://www.replyvera.com/cookie.html',
        'https://www.replyvera.com/resources/',
        'https://www.replyvera.com/es/resources/',
        'https://www.replyvera.com/nl/resources/'
    ];

    const articleUrls = [];
    locales.forEach(lang => {
        const prefix = lang === 'en' ? '' : `/${lang}`;
        articles.forEach(a => {
            articleUrls.push(`https://www.replyvera.com${prefix}/resources/${a.slug}/`);
        });
    });

    const industrySlugs = [
        'dentists', 'restaurants', 'car-washes', 'agencies',
        'pet-care', 'childcare', 'martial-arts', 'tutoring', 'laundromats'
    ];
    const industryUrls = [];
    industrySlugs.forEach(s => {
        industryUrls.push(`https://www.replyvera.com${getIndPath(s, 'en')}`);
        industryUrls.push(`https://www.replyvera.com${getIndPath(s, 'es')}`);
        industryUrls.push(`https://www.replyvera.com${getIndPath(s, 'nl')}`);
    });

    const allUrls = [...new Set([...staticUrls, ...articleUrls, ...industryUrls])];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-08-27</lastmod>
    <changefreq>${url.includes('/resources/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === 'https://www.replyvera.com/' ? '1.0' : url.includes('/resources') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml);
    console.log('✓ Generated sitemap.xml with ' + allUrls.length + ' indexable URLs.');
}

// 4. Build robots.txt
function buildRobotsTxt() {
    const robotsContent = `# Robots.txt for ReplyVera
User-agent: *
Allow: /
Allow: /resources/
Allow: /es/resources/
Allow: /nl/resources/
Allow: /industries/

Sitemap: https://www.replyvera.com/sitemap.xml
`;
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsContent);
    console.log('✓ Generated robots.txt');
}

// Run Build Sequence
buildResourcesIndex();
buildArticles();
buildSitemap();
buildRobotsTxt();

console.log('\n🎉 Multilingual Resources SEO build completed successfully!');
