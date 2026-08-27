const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');
const { articles } = require('./lib/resources_master');

// Base template path
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html not found for header/footer extraction!');
    process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf8');

function getHeaderAndFooter() {
    let navSplit = baseHtml.split('<!-- 2. Hero -->');
    if (navSplit.length < 2) navSplit = baseHtml.split('<header class="hero"');
    if (navSplit.length < 2) {
        console.error('Hero section not found in index.html');
        process.exit(1);
    }

    const rawH = navSplit[0];
    const restP = navSplit[1];
    const footerSplit = restP.split('<!-- Footer -->');
    const rawF = footerSplit.length >= 2 ? '<!-- Footer -->' + footerSplit[1] : '</footer></body></html>';

    let patchedH = localizeAllHtmlLinks(rawH, 'en');
    let patchedF = localizeAllHtmlLinks(rawF, 'en');

    return { header: patchedH, footer: patchedF };
}

const { header, footer } = getHeaderAndFooter();

// 1. Build Resources Hub Index (/resources/index.html)
const resourcesDir = path.join(__dirname, 'resources');
if (!fs.existsSync(resourcesDir)) {
    fs.mkdirSync(resourcesDir, { recursive: true });
}

function buildResourcesIndex() {
    const cardsHtml = articles.map(a => `
        <a href="/resources/${a.slug}" class="resource-card">
            <div>
                <div class="resource-card-meta">
                    <span class="resource-category">${a.category}</span>
                    <span class="resource-read-time">
                        <i data-lucide="clock" style="width:13px;height:13px;"></i>
                        ${a.readTime}
                    </span>
                </div>
                <h3 class="resource-card-title">${a.title}</h3>
                <p class="resource-card-desc">${a.summary}</p>
            </div>
            <div class="resource-card-link">
                <span>Read Guide</span>
                <i data-lucide="arrow-right" style="width:14px;height:14px;"></i>
            </div>
        </a>
    `).join('');

    const pageTitle = "Google Review Management Resources & Guides | ReplyVera";
    const pageDesc = "Explore expert guides, best practices, and actionable insights on automated Google review responses, reputation management, and local SEO for small businesses.";
    const canonicalUrl = "https://replyvera.com/resources";

    let customHeader = header
        .replace(/<title>[\s\S]*?<\/title>/, `<title>${pageTitle}</title>`)
        .replace(/<meta\s+name=["']description["'][\s\S]*?>/, `<meta name="description" content="${pageDesc}">`)
        .replace('</head>', `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="ReplyVera" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDesc}" />
</head>`);

    const pageContent = `
    <!-- Resources Hero -->
    <section class="resources-hero">
        <div class="container">
            <div class="eyebrow" style="justify-content: center; margin-bottom: 12px;">
                <i data-lucide="book-open" style="width:14px;height:14px;color:var(--primary-light);"></i>
                Knowledge Base & Insights
            </div>
            <h1>Google Review Management Resources</h1>
            <p>Practical guides and proven strategies to help small business owners handle automated Google review responses professionally, personally, and efficiently.</p>
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
                <div class="article-cta-title">Ready to Automate Your Google Review Responses?</div>
                <p class="article-cta-desc">Save hours each week while maintaining a 100% response rate. ReplyVera handles routine reviews automatically and escalates sensitive feedback to your team.</p>

                <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                    <a href="/#pricing" class="btn btn-accent btn-lg">Start Your 14-Day Free Trial</a>
                    <a href="/pricing.html" class="btn btn-secondary btn-lg">View Pricing & Plans</a>
                </div>
            </div>
        </div>
    </section>
    `;

    const fullHtml = `${customHeader}\n${pageContent}\n${footer}`;
    fs.writeFileSync(path.join(resourcesDir, 'index.html'), fullHtml);
    // Also write alias resources.html for convenience if requested
    fs.writeFileSync(path.join(__dirname, 'resources.html'), fullHtml);
    console.log('✓ Built Resources Hub Index: /resources/index.html');
}

// 2. Build Article Detail Pages (/resources/[slug]/index.html)
function buildArticles() {
    articles.forEach(a => {
        const articleDir = path.join(resourcesDir, a.slug);
        if (!fs.existsSync(articleDir)) {
            fs.mkdirSync(articleDir, { recursive: true });
        }

        const pageTitle = `${a.title} | ReplyVera`;
        const canonicalUrl = `https://replyvera.com/resources/${a.slug}`;

        // Article Schema
        const articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": a.title,
            "description": a.metaDescription,
            "author": {
                "@type": "Organization",
                "name": "ReplyVera Team",
                "url": "https://replyvera.com"
            },
            "publisher": {
                "@type": "Organization",
                "name": "ReplyVera",
                "url": "https://replyvera.com"
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
                    "name": "Home",
                    "item": "https://replyvera.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Resources",
                    "item": "https://replyvera.com/resources"
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": a.title,
                    "item": canonicalUrl
                }
            ]
        };

        let customHeader = header
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${pageTitle}</title>`)
            .replace(/<meta\s+name=["']description["'][\s\S]*?>/, `<meta name="description" content="${a.metaDescription}">`)
            .replace('</head>', `
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${a.metaDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="ReplyVera" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${a.metaDescription}" />
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
                    <a href="/">Home</a>
                    <span>/</span>
                    <a href="/resources">Resources</a>
                    <span>/</span>
                    <span style="color:var(--text-muted);">${a.category}</span>
                </nav>
                <h1 class="article-title">${a.title}</h1>
                <div class="article-author-bar">
                    <span class="article-author">By ReplyVera Team</span>
                    <span>&bull;</span>
                    <span>Published: ${a.publishedDate}</span>
                    <span>&bull;</span>
                    <span style="display:inline-flex;align-items:center;gap:4px;">
                        <i data-lucide="clock" style="width:14px;height:14px;"></i>
                        ${a.readTime}
                    </span>
                </div>
            </header>

            <div class="article-body">
                ${a.content}
            </div>

            <!-- Natural Call to Action Box -->
            <div class="article-cta-box">
                <div class="article-cta-title">Let ReplyVera Handle Your Review Replies</div>
                <p class="article-cta-desc">Never miss a customer review again. Automatically publish tailored 5-star responses while routing sensitive feedback to your team.</p>
                <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
                    <a href="/#pricing" class="btn btn-accent btn-lg">Start Your 14-Day Free Trial</a>
                    <a href="/pricing.html" class="btn btn-secondary btn-lg">Compare Plans & Pricing</a>
                </div>
            </div>
        </article>
        `;

        const fullHtml = `${customHeader}\n${pageContent}\n${footer}`;
        fs.writeFileSync(path.join(articleDir, 'index.html'), fullHtml);
        console.log(`✓ Built Article Page: /resources/${a.slug}/index.html`);
    });
}

// 3. Build sitemap.xml
function buildSitemap() {
    const staticUrls = [
        'https://replyvera.com/',
        'https://replyvera.com/pricing.html',
        'https://replyvera.com/privacy.html',
        'https://replyvera.com/terms.html',
        'https://replyvera.com/cookie.html',
        'https://replyvera.com/resources'
    ];

    const articleUrls = articles.map(a => `https://replyvera.com/resources/${a.slug}`);

    const industrySlugs = [
        'dentists', 'restaurants', 'car-washes', 'agencies',
        'pet-care', 'childcare', 'martial-arts', 'tutoring', 'laundromats'
    ];
    const industryUrls = industrySlugs.map(s => `https://replyvera.com/industries/${s}`);

    const allUrls = [...staticUrls, ...articleUrls, ...industryUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>2026-08-27</lastmod>
    <changefreq>${url.includes('/resources/') ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === 'https://replyvera.com/' ? '1.0' : url.includes('/resources') ? '0.8' : '0.7'}</priority>
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
Allow: /industries/

Sitemap: https://replyvera.com/sitemap.xml
`;
    fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsContent);
    console.log('✓ Generated robots.txt');
}

// Run Build Sequence
buildResourcesIndex();
buildArticles();
buildSitemap();
buildRobotsTxt();

console.log('\n🎉 Resources SEO build completed successfully!');
