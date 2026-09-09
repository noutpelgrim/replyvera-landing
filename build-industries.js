const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');
const { replaceAllLangSelectors } = require('./lib/lang_switcher');
const {
    industriesData,
    renderHeaderDropdownHTML,
    renderMobileAccordionHTML,
    getLocalizedPath,
    getLocalizedSlug
} = require('./lib/industries_master');

// Extract base nav & footer from index.html template
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html not found!');
    process.exit(1);
}

const baseHtml = fs.readFileSync(templatePath, 'utf8');

function getHeaderAndFooter(lang) {
    const isDefault = !lang || lang === 'en';
    const filePath = isDefault ? path.join(__dirname, 'index.html') : path.join(__dirname, lang, 'index.html');
    const fileHtml = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : baseHtml;

    let navSplit = fileHtml.split('<!-- 2. Hero -->');
    if (navSplit.length < 2) navSplit = fileHtml.split('<header class="hero"');
    if (navSplit.length < 2) {
        console.error('Hero section not found');
        process.exit(1);
    }

    const rawH = navSplit[0];
    const restP = navSplit[1];
    const footerSplit = restP.split('<!-- Footer -->');
    const rawF = footerSplit.length >= 2 ? '<!-- Footer -->' + footerSplit[1] : '</footer></body></html>';

    const targetLang = lang || 'en';
    let patchedH = rawH;

    // Replace desktop header dropdown
    const headerDropdownHtml = renderHeaderDropdownHTML(targetLang);
    patchedH = patchedH.replace(
        /<!-- NAV_DROPDOWN_GRID_START -->[\s\S]*?<!-- NAV_DROPDOWN_GRID_END -->/,
        `<!-- NAV_DROPDOWN_GRID_START -->\n<div class="nav-dropdown-grid">\n${headerDropdownHtml}\n</div>\n<!-- NAV_DROPDOWN_GRID_END -->`
    );

    // Replace mobile accordion
    const mobileAccordionHtml = renderMobileAccordionHTML(targetLang);
    patchedH = patchedH.replace(
        /<!-- MOBILE_IND_LIST_START -->[\s\S]*?<!-- MOBILE_IND_LIST_END -->/,
        `<!-- MOBILE_IND_LIST_START -->\n<div class="mobile-industry-list" id="mobile-ind-list">\n${mobileAccordionHtml}\n</div>\n<!-- MOBILE_IND_LIST_END -->`
    );

    patchedH = localizeAllHtmlLinks(patchedH, targetLang);

    // Strip pre-existing homepage head tags that industry pages will replace
    patchedH = patchedH
        .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '')
        .replace(/<link\s+rel=["']alternate["']\s+hreflang[^>]*>/gi, '')
        .replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '')
        .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/gi, '')
        .replace(/<meta\s+name=["']description["'][^>]*>/gi, '');

    const patchedF = localizeAllHtmlLinks(rawF, targetLang);

    return { header: patchedH, footer: patchedF };
}

function stars(n) {
    let s = '';
    for (let i = 1; i <= 5; i++) {
        const filled = i <= n ? `fill:#F59E0B;color:#F59E0B` : `fill:none;color:#64748B`;
        s += `<i data-lucide="star" style="${filled};width:12px;height:12px;"></i>`;
    }
    return s;
}

function renderBenefits(benefits) {
    return benefits.map(b => `
        <div class="benefit-card">
            <div class="benefit-icon"><i data-lucide="${b.icon}" style="width:20px;height:20px;"></i></div>
            <h3 class="benefit-title">${b.title}</h3>
            <p class="benefit-text">${b.text}</p>
        </div>`).join('');
}

function renderReviews(examples, trans, lang) {
    const isNl = lang === 'nl';
    const isEs = lang === 'es';
    const responseLabel = isNl ? 'ReplyVera reactie' : isEs ? 'Respuesta de ReplyVera' : 'ReplyVera response';
    const defaultSensitiveType = isNl ? 'Gevoelige Beoordeling' : isEs ? 'Reseña Sensible' : 'Sensitive Review';
    const alertSubLabel = isNl ? 'Een manager moet dit controleren voordat het wordt gepubliceerd.' : isEs ? 'Un gerente debe revisar esto antes de publicar.' : 'A manager must review this before publishing.';
    const autoPublishBlockedText = isNl ? 'Automatisch publiceren geblokkeerd' : isEs ? 'Publicación Automática Bloqueada' : 'Auto-Publishing Blocked';
    const safeText = isNl ? 'Veilig om automatisch te publiceren' : isEs ? 'Seguro para Publicar Automáticamente' : 'Safe to Auto-Publish';
    const approvalText = isNl ? 'Goedkeuring vereist' : isEs ? 'Requiere Aprobación' : 'Needs Approval';

    return examples.map(ex => {
        const starHtml = stars(ex.rating);
        if (ex.isAlert) {
            return `
        <div class="review-card">
            <div class="review-card-top">
                <div class="review-stars">${starHtml}</div>
                <span class="review-type">${ex.type || defaultSensitiveType}</span>
            </div>
            <p class="review-quote">${ex.quote}</p>
            <div class="review-alert-box">
                <h3 class="review-alert-title">
                    <i data-lucide="alert-triangle" style="width:13px;height:13px;"></i>
                    ${ex.alertTitle || (isNl ? 'Gevoelig onderwerp gedetecteerd' : isEs ? 'Tema sensible detectado' : 'Sensitive topic detected')}
                </h3>
                <p class="review-alert-sub">${ex.alertText || alertSubLabel}</p>
            </div>
            <span class="review-badge badge-blocked" style="align-self:flex-start;">${autoPublishBlockedText}</span>
        </div>`;
        }
        const badgeClass = ex.needsApproval ? 'badge-approval' : 'badge-auto';
        const badgeLabel = ex.needsApproval ? approvalText : safeText;

        return `
        <div class="review-card">
            <div class="review-card-top">
                <div class="review-stars">${starHtml}</div>
                <span class="review-type">${ex.type || (ex.needsApproval ? (isNl ? 'Negatieve Beoordeling' : isEs ? 'Reseña Negativa' : 'Negative Review') : (isNl ? 'Positieve Beoordeling' : isEs ? 'Reseña Positiva' : 'Positive Review'))}</span>
            </div>
            <p class="review-quote">${ex.quote}</p>
            <div class="review-response-box">
                <div class="review-response-label">${responseLabel}</div>
                <p class="review-response-text">${ex.reply}</p>
            </div>
            <span class="review-badge ${badgeClass}" style="align-self:flex-start;">${badgeLabel}</span>
        </div>`;
    }).join('');
}

function renderTopics(topics) {
    return topics.map(t => `<span class="topic-tag industry-tag">${t}</span>`).join('');
}

function renderFAQ(items) {
    return items.map(item => `
        <div class="faq-item">
            <button class="faq-question">
                <span>${item.q}</span>
                <div class="faq-icon-wrapper"><i data-lucide="plus" style="width:16px;height:16px;"></i></div>
            </button>
            <div class="faq-answer">${item.a}</div>
        </div>`).join('');
}

function renderPricingSection(isAgency, ind, trans, lang) {
    const isNl = lang === 'nl';
    const isEs = lang === 'es';

    const agencyTitle = isNl ? 'Eenvoudige Prijzen voor Marketingbureaus' : isEs ? 'Precios Simples para Agencias' : 'Pricing Built for Agencies';
    const agencySub = isNl ? 'Beheer reviewreacties voor al uw klanten vanuit één centraal dashboard.' : isEs ? 'Gestiona respuestas de reseñas para todos tus clientes desde un panel central.' : 'Manage Google review responses for multiple clients from one dashboard.';
    const agencyCardTitle = 'Agency';
    const startingAt = isNl ? 'Vanaf $149' : isEs ? 'Desde $149' : 'Starting at $149';
    const perMonth = isNl ? 'per maand' : isEs ? 'por mes' : 'per month';
    const agencyTagline = isNl ? 'Voor bureaus die Google-reviewreacties beheren voor meerdere klantlocaties.' : isEs ? 'Para agencias que gestionan respuestas de reseñas de Google para múltiples clientes.' : 'For agencies managing Google review responses for multiple client locations.';
    const startAgency = isNl ? 'Start Bureau Proefperiode' : isEs ? 'Comenzar Prueba de Agencia' : 'Start Agency Trial';

    const feat1 = isNl ? '10 klantlocaties inbegrepen' : isEs ? '10 ubicaciones de clientes incluidas' : '10 client locations included';
    const feat2 = isNl ? 'Centraal multi-client dashboard' : isEs ? 'Panel central multi-cliente' : 'Central multi-client dashboard';
    const feat3 = isNl ? 'Eigen merkstem per klant' : isEs ? 'Voz de marca propia para cada cliente' : 'Separate brand voice for every client';
    const feat4 = isNl ? 'Toegang voor klantgoedkeuring' : isEs ? 'Acceso de aprobación para clientes' : 'Client approval access';
    const feat5 = isNl ? 'Toegang voor teamleden' : isEs ? 'Acceso para miembros del equipo' : 'Team member access';
    const feat6 = isNl ? 'Bureau-rapportage' : isEs ? 'Informes para agencias' : 'Agency reporting';

    const needOwnTitle = isNl ? 'ReplyVera Nodig voor uw Eigen Bedrijf?' : isEs ? '¿Necesitas ReplyVera para tu Propio Negocio?' : 'Need ReplyVera for Your Own Business?';
    const needOwnSub = isNl ? 'Starter, Autopilot en Multi-Locatie abonnementen zijn ook beschikbaar.' : isEs ? 'Los planes Starter, Autopilot y Multi-Ubicación también están disponibles.' : 'Starter, Autopilot, and Multi-Location plans are also available.';
    const viewBizPricing = isNl ? 'Bekijk Kleine-Bedrijven Prijzen' : isEs ? 'Ver Precios para Pequeñas Empresas' : 'View Small-Business Pricing';

    if (isAgency) {
        return `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark" id="pricing">
        <div class="container">
            <div class="section-header">
                <h2>${agencyTitle}</h2>
                <p>${agencySub}</p>
            </div>
            <div style="max-width:460px;margin:0 auto;">
                <div class="pricing-card featured" style="padding:36px 32px;">
                    <div class="pricing-name" style="margin-bottom:8px;">${agencyCardTitle}</div>
                    <div class="pricing-price" style="font-size:2.2rem;">${startingAt}</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline" style="margin-bottom:28px;">${agencyTagline}</p>
                    <ul class="pricing-features" style="display:flex;flex-direction:column;gap:16px;">
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat1}</li>
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat2}</li>
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat3}</li>
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat4}</li>
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat5}</li>
                        <li><i data-lucide="check" style="width:16px;height:16px;color:var(--accent);"></i> ${feat6}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true&tier=agency" class="btn btn-accent" style="text-align:center;justify-content:center;width:100%;margin-top:28px;">${startAgency}</a>
                </div>
            </div>
            <div class="text-center" style="margin-top:60px;">
                <h3 style="font-size:1.2rem;margin-bottom:8px;">${needOwnTitle}</h3>
                <p style="font-size:0.9rem;color:var(--text-secondary);margin-bottom:20px;">${needOwnSub}</p>
                <a href="${isNl ? '/nl/pricing.html' : isEs ? '/es/pricing.html' : '/pricing.html'}" class="btn btn-secondary">${viewBizPricing}</a>
            </div>
        </div>
    </section>`;
    }

    const starterTagline = isNl ? 'U keurt elke reactie goed voordat deze wordt gepubliceerd.' : isEs ? 'Apruebas cada respuesta antes de que se publique.' : 'You approve every reply before it is published.';
    const autopilotTagline = isNl ? 'Veilige reacties worden automatisch gepubliceerd. Gevoelige reviews blijven onder uw goedkeuring.' : isEs ? 'Las respuestas seguras se publican automáticamente. Las reseñas sensibles requieren tu aprobación.' : 'Safe replies publish automatically. Sensitive reviews stay under your approval.';
    const multiTagline = isNl ? 'Beheer al uw locaties vanuit één account met regels op locatieniveau.' : isEs ? 'Administra todas tus sedes desde una sola cuenta con reglas por ubicación.' : 'Manage all your locations from one account with location-level rules.';
    const starterBtn = isNl ? 'Start Gratis Proefperiode' : isEs ? 'Comenzar Prueba Gratuita' : 'Start Free Trial';
    const multiTitle = isNl ? 'Meerdere Locaties' : isEs ? 'Multi-Ubicación' : 'Multi-Location';
    const from79 = isNl ? 'Vanaf $79' : isEs ? 'Desde $79' : 'From $79';
    const multiBtn = isNl ? 'Start Proefperiode Meerdere Locaties' : isEs ? 'Iniciar Prueba Multi-Ubicación' : 'Start Multi-Location Trial';

    return `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark" id="pricing">
        <div class="container">
            <div class="section-header">
                <h2>${isNl ? 'Eenvoudige Prijzen voor Kleine Bedrijven' : isEs ? 'Precios Simples para Pequeñas Empresas' : 'Simple Pricing for Small Businesses'}</h2>
                <p>${isNl ? 'Start met een gratis proefperiode van 14 dagen. Annuleer op elk moment.' : isEs ? 'Comienza con una prueba gratuita de 14 días. Cancela en cualquier momento.' : 'Start your 14-day free trial. Cancel anytime.'}</p>
            </div>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3 class="pricing-name">Starter</h3>
                    <div class="pricing-price">$29</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${starterTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Eén locatie' : isEs ? 'Una ubicación' : 'One location'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Tot 30 reacties per maand' : isEs ? 'Hasta 30 respuestas por mes' : 'Up to 30 replies per month'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Handmatige goedkeuring voor alle reviews' : isEs ? 'Aprobación manual para todas las reseñas' : 'Manual approval for all reviews'}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true&tier=starter" class="btn btn-secondary" style="text-align:center;justify-content:center;">${starterBtn}</a>
                </div>
                <div class="pricing-card featured">
                    <div class="pricing-popular">${isNl ? 'Meest Populair' : isEs ? 'Más Popular' : 'Most Popular'}</div>
                    <h3 class="pricing-name">Autopilot</h3>
                    <div class="pricing-price">$39</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${autopilotTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Eén locatie' : isEs ? 'Una ubicación' : 'One location'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Onbeperkte reviewreacties onder ons Fair Use-beleid' : isEs ? 'Respuestas ilimitadas bajo nuestra Política de Uso Razonable' : 'Unlimited review responses under our Fair Use Policy'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Automatisch publiceren van veilige reviews' : isEs ? 'Publicación automática de reseñas seguras' : 'Automatic publishing for safe reviews'}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true&tier=autopilot" class="btn btn-accent" style="text-align:center;justify-content:center;">${starterBtn}</a>
                </div>
                <div class="pricing-card">
                    <h3 class="pricing-name">${multiTitle}</h3>
                    <div class="pricing-price" style="font-size:1.85rem;">${from79}</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${multiTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Drie locaties inbegrepen' : isEs ? 'Tres ubicaciones incluidas' : 'Three locations included'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Centraal dashboard' : isEs ? 'Panel central' : 'Central dashboard'}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true&tier=multi_location" class="btn btn-secondary" style="text-align:center;justify-content:center;">${multiBtn}</a>
                </div>
            </div>
        </div>
    </section>`;
}

function renderRelatedIndustries(currentId, lang) {
    const isNl = lang === 'nl';
    const isEs = lang === 'es';
    const sectionTitle = isNl ? 'Bekijk Andere Sectoren' : isEs ? 'Explora Otras Industrias' : 'Explore Other Industries';

    const otherIndustries = industriesData.filter(ind => ind.id !== currentId).slice(0, 3);

    const cardsHtml = otherIndustries.map(ind => {
        const trans = ind.translations[lang] || ind.translations.en;
        const localizedPath = getLocalizedPath(ind.id, lang);
        return `
        <a href="${localizedPath}" class="benefit-card" style="text-decoration:none;color:inherit;">
            <div class="benefit-icon ${ind.iconBgClass}"><i data-lucide="${ind.icon}" style="width:20px;height:20px;"></i></div>
            <h3 class="benefit-title">${trans.name}</h3>
            <p class="benefit-text">${trans.dropdownDesc}</p>
        </a>`;
    }).join('');

    return `
    <div class="industry-divider-glow"></div>
    <section class="section section-light">
        <div class="container">
            <div class="section-header">
                <h2>${sectionTitle}</h2>
            </div>
            <div class="benefits-grid">
                ${cardsHtml}
            </div>
        </div>
    </section>`;
}

function renderIndustryPage(ind, lang) {
    const isNl = lang === 'nl';
    const isEs = lang === 'es';
    const trans = ind.translations[lang] || ind.translations.en;
    const isAgency = ind.id === 'agencies';

    const eyebrowText = isNl ? 'Google Review Automatisering' : isEs ? 'Automatización de Reseñas de Google' : 'Google Review Automation';
    const ctaStart = isAgency
        ? (isNl ? 'Start Bureau Proefperiode' : isEs ? 'Comenzar Prueba de Agencia' : 'Start Agency Trial')
        : (isNl ? 'Start Uw 14-Dagen Gratis Proefperiode' : isEs ? 'Comienza Tu Prueba Gratuita de 14 Días' : 'Start Your 14-Day Free Trial');
    const ctaDemo = isNl ? 'Probeer de Live Demo' : isEs ? 'Probar Demo en Vivo' : 'Try the Live Demo';
    const demoUrl = isNl ? '/nl/demo.html' : isEs ? '/es/demo.html' : '/demo.html';

    const reassuranceText = isNl
        ? 'Koppel via Google Bedrijfsprofiel • Altijd opzegbaar'
        : isEs
        ? 'Conecta mediante Google Business Profile • Cancela en cualquier momento'
        : 'Connect through Google Business Profile • Cancel anytime';

    const activeText = isNl ? 'Actief' : isEs ? 'Activo' : 'Active';
    const recentReviewsText = isNl ? 'Recente Google Beoordelingen' : isEs ? 'Reseñas Recientes de Google' : 'Recent Google Reviews';

    const homeTitle = isNl ? 'Home' : isEs ? 'Inicio' : 'Home';
    const indCategoryTitle = isNl ? 'Sectoren' : isEs ? 'Industrias' : 'Industries';
    const homePath = isNl ? '/nl/' : isEs ? '/es/' : '/';
    const indCategoryPath = isNl ? '/nl/#benefits' : isEs ? '/es/#benefits' : '/#benefits';

    const safeBadgeText = isNl ? 'Veilig om automatisch te publiceren' : isEs ? 'Seguro para Publicar Automáticamente' : 'Safe to Auto-Publish';
    const approvalBadgeText = isNl ? 'Goedkeuring vereist' : isEs ? 'Requiere Aprobación' : 'Needs Approval';
    const blockedBadgeText = isNl ? 'Automatisch publiceren geblokkeerd' : isEs ? 'Publicación Automática Bloqueada' : 'Auto-Publishing Blocked';

    const breadcrumbsHtml = `
    <nav class="breadcrumbs industry-breadcrumbs" aria-label="Breadcrumb">
        <a href="${homePath}">${homeTitle}</a>
        <span class="breadcrumb-sep">/</span>
        <a href="${indCategoryPath}">${indCategoryTitle}</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">${trans.name}</span>
    </nav>`;

    const themeStyles = `
    <style>
        :root {
            --industry-accent: ${ind.theme.accent};
            --industry-accent-soft: ${ind.theme.accent}18;
            --industry-icon-bg: ${ind.theme.accent}12;
            --industry-accent-glow: ${ind.theme.accent}25;
        }
    </style>`;

    const heroSection = `
    <header class="hero industry-hero">
        <div class="industry-hero-glow"></div>
        <div class="container industry-hero-container">
            <div class="industry-hero-grid">
                <div class="industry-hero-text">
                    ${breadcrumbsHtml}
                    <div class="industry-eyebrow-pill" style="color:var(--industry-accent); border-color:var(--industry-accent-soft); background:var(--industry-icon-bg);">
                        <i data-lucide="shield-check" style="width:13px;height:13px;color:var(--industry-accent);"></i>
                        <span>${eyebrowText}</span>
                    </div>
                    <h1 class="industry-hero-h1">${trans.heroHeadline}</h1>
                    <p class="industry-hero-desc">${trans.heroDescription}</p>
                    <div class="industry-hero-ctas">
                        <a href="https://dashboard.replyvera.com/login?signup=true&tier=${isAgency ? 'agency' : 'autopilot'}" class="btn btn-accent btn-lg industry-btn-primary">${ctaStart}</a>
                        <a href="${demoUrl}" class="btn btn-secondary btn-lg industry-btn-secondary">${ctaDemo}</a>
                    </div>
                    <div class="industry-hero-reassurance">
                        <i data-lucide="check-circle" style="width:14px;height:14px;color:#10B981;"></i>
                        <span>${reassuranceText}</span>
                    </div>
                </div>
                <div class="industry-hero-visual">
                    <div class="industry-mockup-card">
                        <div class="industry-mockup-bar">
                            <div class="mockup-dots"><span></span><span></span><span></span></div>
                            <div class="industry-mockup-badge">
                                <i data-lucide="shield" style="width:11px;height:11px;"></i>
                                <span>replyvera.com • Product Preview</span>
                            </div>
                            <div class="industry-mockup-status">
                                <span class="status-indicator"></span>
                                <span>${activeText}</span>
                            </div>
                        </div>
                        <div class="industry-mockup-header-text">
                            <span>${recentReviewsText}</span>
                            <span class="industry-mockup-meta">Google Business Profile Sync</span>
                        </div>
                        <div class="industry-review-rows">
                            <div class="industry-review-row">
                                <div class="industry-review-main">
                                    <div class="industry-review-stars">${stars(5)}</div>
                                    <div class="industry-review-quote">"${trans.mockupPositive}"</div>
                                </div>
                                <div class="industry-badge-col">
                                    <span class="review-badge badge-auto">${safeBadgeText}</span>
                                </div>
                            </div>
                            <div class="industry-review-row">
                                <div class="industry-review-main">
                                    <div class="industry-review-stars">${stars(2)}</div>
                                    <div class="industry-review-quote">"${trans.mockupNegative}"</div>
                                </div>
                                <div class="industry-badge-col">
                                    <span class="review-badge badge-approval">${approvalBadgeText}</span>
                                </div>
                            </div>
                            <div class="industry-review-row">
                                <div class="industry-review-main">
                                    <div class="industry-review-stars">${stars(1)}</div>
                                    <div class="industry-review-quote">"${trans.mockupSensitive}"</div>
                                </div>
                                <div class="industry-badge-col">
                                    <span class="review-badge badge-blocked">${blockedBadgeText}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

    const benefitsSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light" id="benefits">
        <div class="container industry-content-container">
            <div class="section-header text-center">
                <h2>${trans.benefitsHeadline}</h2>
            </div>
            <div class="benefits-grid">
                ${renderBenefits(trans.benefits)}
            </div>
        </div>
    </section>`;

    const howItWorksTitle = isNl ? 'Koppel Google. Stel uw Regels in. Laat ReplyVera de Rest Doen.' : isEs ? 'Conecta Google. Establece tus Reglas. Deja que ReplyVera Haga el Resto.' : 'Connect Google. Set Your Rules. Let ReplyVera Handle the Rest.';
    const step1Title = isNl ? 'Koppel Google Bedrijfsprofiel' : isEs ? 'Conecta tu Perfil de Empresa en Google' : 'Connect Google Business Profile';
    const step1Text = isNl ? 'Koppel veilig één of meerdere bedrijfslocaties via Google OAuth. Geen wachtwoorden vereist.' : isEs ? 'Conecta de forma segura una o más sedes a través de Google OAuth. No almacenamos contraseñas.' : 'Securely connect one or more business locations via Google OAuth. No passwords stored.';
    const step2Title = isNl ? 'Kies uw Toon en Goedkeuringsregels' : isEs ? 'Elige tu Tono y Reglas de Aprobación' : 'Choose Your Tone and Approval Rules';
    const step3Title = isNl ? 'ReplyVera Verwerkt Nieuwe Reviews' : isEs ? 'ReplyVera Gestiona las Nuevas Reseñas' : 'ReplyVera Handles New Reviews';

    const howItWorksSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark" id="how-it-works">
        <div class="container industry-content-container">
            <div class="section-header text-center">
                <h2>${howItWorksTitle}</h2>
            </div>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <h3 class="step-title">${step1Title}</h3>
                    <p class="step-text">${step1Text}</p>
                </div>
                <div class="step-card">
                    <div class="step-number">2</div>
                    <h3 class="step-title">${step2Title}</h3>
                    <p class="step-text">${trans.step2Text}</p>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <h3 class="step-title">${step3Title}</h3>
                    <p class="step-text">${trans.step3Text}</p>
                </div>
            </div>
        </div>
    </section>`;

    const reviewsSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light" id="scenarios">
        <div class="container industry-content-container">
            <div class="section-header text-center">
                <h2>${trans.reviewsHeadline}</h2>
                <p>${trans.reviewsSubhead}</p>
            </div>
            <div class="reviews-grid">
                ${renderReviews(trans.reviewExamples, trans, lang)}
            </div>
        </div>
    </section>`;

    const sensitiveProtectionTitle = isNl ? 'Bescherming bij Gevoelige Reviews' : isEs ? 'Protección de Reseñas Sensibles' : 'Sensitive Review Protection';
    const sensitiveIntro = isNl ? 'ReplyVera publiceert gevoelige feedback nooit automatisch. Wanneer een review overeenkomt met een beschermd onderwerp, wordt automatisch publiceren geblokkeerd.' : isEs ? 'ReplyVera nunca publica comentarios sensibles automáticamente. Cuando una reseña coincide con un tema protegido, la publicación se bloquea.' : 'ReplyVera never publishes sensitive feedback automatically. When a review matches a protected topic, auto-publishing is blocked.';
    const monitoredTopicsLabel = isNl ? 'Gemonitorde onderwerpen:' : isEs ? 'Temas monitoreados:' : 'Monitored topics:';
    const sensitiveDetectedTitle = isNl ? 'Gevoelig Onderwerp Gedetecteerd' : isEs ? 'Tema Sensible Detectado' : 'Sensitive Topic Detected';
    const sensitiveBoxText = isNl ? 'Automatisch publiceren is geblokkeerd. Er is een concept voorbereid dat u eerst moet goedkeuren.' : isEs ? 'La publicación automática ha sido bloqueada. Se ha preparado un borrador para tu aprobación.' : 'Auto-publishing has been blocked. A draft has been prepared for your approval.';
    const ownerNotifiedText = isNl ? 'Eigenaar Gewaarschuwd' : isEs ? 'Propietario Notificado' : 'Owner Notified';

    const sensitiveSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark" id="safety">
        <div class="container industry-content-container">
            <div class="sensitive-inner">
                <div>
                    <div class="eyebrow" style="margin-bottom:16px;">
                        <i data-lucide="shield-alert" style="width:12px;height:12px;color:#EF4444;"></i>
                        ${sensitiveProtectionTitle}
                    </div>
                    <h2 style="margin-bottom:12px;">${trans.sensitiveHeadline}</h2>
                    <p style="margin-bottom:16px;">${sensitiveIntro}</p>
                    <p style="font-size:0.82rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">${monitoredTopicsLabel}</p>
                    <div class="topic-tags">
                        ${renderTopics(trans.sensitiveTopics)}
                    </div>
                </div>
                <div>
                    <div class="sensitive-alert">
                        <h3 class="sensitive-alert-title">
                            <i data-lucide="alert-triangle" style="width:16px;height:16px;color:#EF4444;"></i>
                            ${sensitiveDetectedTitle}
                        </h3>
                        <p class="sensitive-alert-text" style="margin-bottom:12px;">${sensitiveBoxText}</p>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            <span class="review-badge badge-blocked">${blockedBadgeText}</span>
                            <span style="font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:4px;background:rgba(245,158,11,0.1);color:#D97706;border:1px solid rgba(245,158,11,0.25);">${ownerNotifiedText}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    // ─── Section 7: Interactive or Visual Product Proof ───
    const proofTitle = isNl ? 'De Drie Beveiligingsniveaus in Actie' : isEs ? 'Los Tres Niveles de Seguridad en Acción' : 'The Three-Tier Safeguard Engine';
    const proofSub = isNl ? 'Elke binnenkomende Google-review doorloopt drie strikte controles voordat er iets wordt gepubliceerd.' : isEs ? 'Cada reseña entrante de Google pasa por tres filtros de seguridad estrictos antes de publicarse.' : 'Every incoming Google review passes through three strict filters before anything is published.';
    
    const tier1Title = isNl ? '1. Veilig om te Publiceren' : isEs ? '1. Seguro para Publicar' : '1. Safe to Auto-Publish';
    const tier1Cond = isNl ? '4–5 sterren routinematige lof zonder risicotermen of klachten.' : isEs ? 'Elogios rutinarios de 4–5 estrellas sin términos sensibles ni quejas.' : '4–5 star routine positive praise without sensitive terms or disputes.';
    const tier1Act = isNl ? 'Gepersonaliseerde reactie binnen minuten direct naar Google gepubliceerd.' : isEs ? 'Respuesta personalizada redactada y publicada directamente en Google en minutos.' : 'Personalized response drafted and published directly to Google within minutes.';

    const tier2Title = isNl ? '2. Goedkeuring Vereist' : isEs ? '2. Requiere Aprobación' : '2. Needs Approval';
    const tier2Cond = isNl ? '2–3 sterren gemengde feedback, vertragingen of prijsvragen.' : isEs ? 'Comentarios mixtos de 2–3 estrellas, retrasos o dudas de facturación.' : '2–3 star mixed feedback, service delays, or pricing concerns.';
    const tier2Act = isNl ? 'Vastgehouden in privédashboard. Concept klaargezet voor snelle 1-klik goedkeuring.' : isEs ? 'Retenida en el panel privado. Borrador listo para aprobación humana con 1 clic.' : 'Held in private queue. AI draft prepared for fast 1-click human approval.';

    const tier3Title = isNl ? '3. Publicatie Geblokkeerd' : isEs ? '3. Publicación Bloqueada' : '3. Auto-Publishing Blocked';
    const tier3Cond = isNl ? '1 ster of ernstige triggers (veiligheid, letsel, hygiëne, juridische claims).' : isEs ? '1 estrella o alertas críticas (seguridad, lesiones, higiene, reclamos legales).' : '1 star or critical safety triggers (injuries, hygiene, legal threats).';
    const tier3Act = isNl ? 'Automatisch publiceren direct geblokkeerd. Directe notificatie naar eigenaar/manager.' : isEs ? 'Publicación automática bloqueada. Notificación de emergencia enviada al responsable.' : 'Auto-publishing blocked instantly. Urgent alert dispatched for human-only intervention.';

    const proofDemoCta = isNl ? 'Test deze Safeguards in de Live Demo' : isEs ? 'Prueba estas Reglas en la Demo en Vivo' : 'Test These Safeguards in the Live Demo';

    const productProofSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light" id="product-proof">
        <div class="container industry-content-container">
            <div class="section-header text-center">
                <h2>${proofTitle}</h2>
                <p>${proofSub}</p>
            </div>
            <div class="safeguard-engine-grid">
                <div class="safeguard-card">
                    <div class="safeguard-card-top">
                        <div class="safeguard-icon-wrap icon-auto"><i data-lucide="check-circle" style="width:20px;height:20px;"></i></div>
                        <span class="review-badge badge-auto">${safeBadgeText}</span>
                    </div>
                    <h3 class="safeguard-title">${tier1Title}</h3>
                    <p class="safeguard-condition"><strong>Trigger:</strong> ${tier1Cond}</p>
                    <div class="safeguard-outcome"><strong>Action:</strong> ${tier1Act}</div>
                </div>
                <div class="safeguard-card">
                    <div class="safeguard-card-top">
                        <div class="safeguard-icon-wrap icon-approval"><i data-lucide="clock" style="width:20px;height:20px;"></i></div>
                        <span class="review-badge badge-approval">${approvalBadgeText}</span>
                    </div>
                    <h3 class="safeguard-title">${tier2Title}</h3>
                    <p class="safeguard-condition"><strong>Trigger:</strong> ${tier2Cond}</p>
                    <div class="safeguard-outcome"><strong>Action:</strong> ${tier2Act}</div>
                </div>
                <div class="safeguard-card">
                    <div class="safeguard-card-top">
                        <div class="safeguard-icon-wrap icon-blocked"><i data-lucide="alert-octagon" style="width:20px;height:20px;"></i></div>
                        <span class="review-badge badge-blocked">${blockedBadgeText}</span>
                    </div>
                    <h3 class="safeguard-title">${tier3Title}</h3>
                    <p class="safeguard-condition"><strong>Trigger:</strong> ${tier3Cond}</p>
                    <div class="safeguard-outcome"><strong>Action:</strong> ${tier3Act}</div>
                </div>
            </div>
            <div style="text-align:center;margin-top:36px;">
                <a href="${demoUrl}" class="btn btn-secondary btn-lg" style="display:inline-flex;align-items:center;gap:8px;">
                    <i data-lucide="sliders" style="width:16px;height:16px;"></i>
                    ${proofDemoCta}
                </a>
            </div>
        </div>
    </section>`;

    const pricingSection = renderPricingSection(isAgency, ind, trans, lang);

    const faqTitle = isNl ? 'Veelgestelde Vragen' : isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions';
    const faqSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light" id="faq">
        <div class="container industry-content-container" style="max-width:760px;">
            <div class="section-header text-center">
                <h2>${faqTitle}</h2>
            </div>
            <div class="faq-list">
                ${renderFAQ(trans.faqItems)}
            </div>
        </div>
    </section>`;

    const relatedSection = renderRelatedIndustries(ind.id, lang);

    const ctaSection = `
    <section class="section section-dark">
        <div class="container industry-content-container" style="max-width:700px;">
            <div class="cta-box">
                <h2 class="mb-4">${trans.finalCtaHeadline}</h2>
                <p class="lead mb-8">${trans.finalCtaDescription}</p>
                <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                    <a href="https://dashboard.replyvera.com/login?signup=true&tier=${isAgency ? 'agency' : 'autopilot'}" class="btn btn-accent btn-lg">${isNl ? 'Start Gratis Proefperiode' : isEs ? 'Comenzar Prueba Gratuita' : 'Start Free Trial'}</a>
                    <a href="${isNl ? '/nl/pricing.html' : isEs ? '/es/pricing.html' : '/pricing.html'}" class="btn btn-secondary btn-lg">${isNl ? 'Bekijk Prijzen' : isEs ? 'Ver Precios' : 'View Pricing'}</a>
                </div>
            </div>
        </div>
    </section>`;

    return `${themeStyles}${heroSection}${benefitsSection}${howItWorksSection}${reviewsSection}${sensitiveSection}${productProofSection}${pricingSection}${faqSection}${relatedSection}${ctaSection}`;
}

// ─── Build Pages Loop ─────────────────────────────────────────────────────────
let pageCount = 0;
industriesData.forEach(ind => {
    ['en', 'es', 'nl'].forEach(lang => {
        const trans = ind.translations[lang] || ind.translations.en;
        const localizedSlug = getLocalizedSlug(ind.id, lang);
        const localizedPath = getLocalizedPath(ind.id, lang);
        const bodyContent = renderIndustryPage(ind, lang);

        const hf = getHeaderAndFooter(lang);
        
        // Construct canonical URL and hreflang links
        const baseUrl = 'https://www.replyvera.com';
        const canonicalUrl = `${baseUrl}${localizedPath}`;
        const hreflangEn = `${baseUrl}${getLocalizedPath(ind.id, 'en')}`;
        const hreflangEs = `${baseUrl}${getLocalizedPath(ind.id, 'es')}`;
        const hreflangNl = `${baseUrl}${getLocalizedPath(ind.id, 'nl')}`;

        const homeTitle = lang === 'nl' ? 'Home' : lang === 'es' ? 'Inicio' : 'Home';
        const indCategoryTitle = lang === 'nl' ? 'Sectoren' : lang === 'es' ? 'Industrias' : 'Industries';
        const homePath = lang === 'nl' ? '/nl/' : lang === 'es' ? '/es/' : '/';
        const indCategoryPath = lang === 'nl' ? '/nl/#benefits' : lang === 'es' ? '/es/#benefits' : '/#benefits';

        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": homeTitle,
                    "item": `${baseUrl}${homePath}`
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": indCategoryTitle,
                    "item": `${baseUrl}${indCategoryPath}`
                },
                {
                    "@type": "ListItem",
                    "position": 3,
                    "name": trans.name,
                    "item": canonicalUrl
                }
            ]
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
            "description": trans.metaDescription
        };

        const seoTags = `
    <title>${trans.metaTitle}</title>
    <meta name="description" content="${trans.metaDescription}">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="alternate" hreflang="en" href="${hreflangEn}">
    <link rel="alternate" hreflang="es" href="${hreflangEs}">
    <link rel="alternate" hreflang="nl" href="${hreflangNl}">
    <link rel="alternate" hreflang="x-default" href="${hreflangEn}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${trans.metaTitle}">
    <meta property="og:description" content="${trans.metaDescription}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="${baseUrl}/img/replyvera_official_logo.png">
    <meta property="og:site_name" content="ReplyVera">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${trans.metaTitle}">
    <meta name="twitter:description" content="${trans.metaDescription}">
    <meta name="twitter:image" content="${baseUrl}/img/replyvera_official_logo.png">
    <script type="application/ld+json">
    ${JSON.stringify(breadcrumbSchema, null, 2)}
    </script>
    <script type="application/ld+json">
    ${JSON.stringify(softwareSchema, null, 2)}
    </script>`;

        let header = hf.header
            .replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${lang}"`)
            .replace(/<title>[^<]+<\/title>/, seoTags);

        // Mark active item in dropdown
        header = header.replace(`href="${localizedPath}" class="dropdown-item"`, `href="${localizedPath}" class="dropdown-item active"`);
        header = header.replace(`href="${localizedPath}" class="mobile-industry-item"`, `href="${localizedPath}" class="mobile-industry-item active"`);

        let fullPage = localizeAllHtmlLinks(header + '\n' + bodyContent + '\n' + hf.footer, lang);

        const langUrls = {
            en: getLocalizedPath(ind.id, 'en'),
            es: getLocalizedPath(ind.id, 'es'),
            nl: getLocalizedPath(ind.id, 'nl')
        };
        fullPage = replaceAllLangSelectors(fullPage, lang, langUrls);

        // Save primary localized industry detail page
        const primaryDir = lang === 'en' ?
            path.join(__dirname, 'industries', localizedSlug) :
            path.join(__dirname, lang, 'industries', localizedSlug);

        if (!fs.existsSync(primaryDir)) {
            fs.mkdirSync(primaryDir, { recursive: true });
        }
        fs.writeFileSync(path.join(primaryDir, 'index.html'), fullPage, 'utf8');
        pageCount++;
        console.log(`✓ Built Primary Industry Page [${lang.toUpperCase()}]: ${lang === 'en' ? '' : lang + '/'}industries/${localizedSlug}/index.html`);

        // Also build alias page for English slug if different (e.g., /nl/industries/pet-care/index.html -> renders Dutch content!)
        const enSlug = ind.slugs.en;
        if (localizedSlug !== enSlug) {
            const aliasDir = lang === 'en' ?
                path.join(__dirname, 'industries', enSlug) :
                path.join(__dirname, lang, 'industries', enSlug);

            if (!fs.existsSync(aliasDir)) {
                fs.mkdirSync(aliasDir, { recursive: true });
            }
            fs.writeFileSync(path.join(aliasDir, 'index.html'), fullPage, 'utf8');
            pageCount++;
            console.log(`  ✓ Built Alias Industry Page [${lang.toUpperCase()}]: ${lang === 'en' ? '' : lang + '/'}industries/${enSlug}/index.html`);
        }
    });
});

console.log(`\n✓ All ${pageCount} industry detail pages & aliases built successfully across EN, NL, ES.`);
