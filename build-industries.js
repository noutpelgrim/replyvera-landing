const fs = require('fs');
const path = require('path');
const { localizeAllHtmlLinks } = require('./lib/router');
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

    // Update language selector button label (EN -> NL / ES)
    patchedH = patchedH.replace(/<button class="lang-btn"[^>]*>[\s\S]*?<\/button>/, `
                    <button class="lang-btn" aria-label="Select Language">
                        <i class="fa-solid fa-globe" style="font-size:16px; margin-right:6px;"></i> ${targetLang.toUpperCase()}
                    </button>`);

    // Update mobile language selector active state
    patchedH = patchedH.replace(/class="mobile-lang-opt active"/g, 'class="mobile-lang-opt"');
    const langUpper = targetLang.toUpperCase();
    patchedH = patchedH.replace(
        new RegExp(`class="mobile-lang-opt"\\s+onclick="changeLang\\('${targetLang}',\\s*event\\)">${langUpper}<\\/a>`),
        `class="mobile-lang-opt active" onclick="changeLang('${targetLang}', event)">${langUpper}</a>`
    );

    patchedH = localizeAllHtmlLinks(patchedH, targetLang);
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
            <div class="benefit-title">${b.title}</div>
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
                <div class="review-alert-title">
                    <i data-lucide="alert-triangle" style="width:13px;height:13px;"></i>
                    ${ex.alertTitle || (isNl ? 'Gevoelig onderwerp gedetecteerd' : isEs ? 'Tema sensible detectado' : 'Sensitive topic detected')}
                </div>
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
                    <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-accent" style="text-align:center;justify-content:center;width:100%;margin-top:28px;">${startAgency}</a>
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
                <p>${isNl ? 'Start gratis. Geen creditcard vereist. Annuleer op elk moment.' : isEs ? 'Comienza gratis. Sin tarjeta de crédito. Cancela en cualquier momento.' : 'Start free. No credit card required. Cancel anytime.'}</p>
            </div>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <div class="pricing-name">Starter</div>
                    <div class="pricing-price">$29</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${starterTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Eén locatie' : isEs ? 'Una ubicación' : 'One location'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Tot 30 reacties per maand' : isEs ? 'Hasta 30 respuestas por mes' : 'Up to 30 replies per month'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Handmatige goedkeuring voor alle reviews' : isEs ? 'Aprobación manual para todas las reseñas' : 'Manual approval for all reviews'}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-secondary" style="text-align:center;justify-content:center;">${starterBtn}</a>
                </div>
                <div class="pricing-card featured">
                    <div class="pricing-popular">${isNl ? 'Meest Populair' : isEs ? 'Más Popular' : 'Most Popular'}</div>
                    <div class="pricing-name">Autopilot</div>
                    <div class="pricing-price">$39</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${autopilotTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Eén locatie' : isEs ? 'Una ubicación' : 'One location'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Onbeperkt aantal reviewreacties*' : isEs ? 'Respuestas ilimitadas*' : 'Unlimited review responses*'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Automatisch publiceren van veilige reviews' : isEs ? 'Publicación automática de reseñas seguras' : 'Automatic publishing for safe reviews'}</li>
                    </ul>
                    <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-accent" style="text-align:center;justify-content:center;">${starterBtn}</a>
                </div>
                <div class="pricing-card">
                    <div class="pricing-name">${multiTitle}</div>
                    <div class="pricing-price" style="font-size:1.85rem;">${from79}</div>
                    <div class="pricing-period">${perMonth}</div>
                    <p class="pricing-tagline">${multiTagline}</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Drie locaties inbegrepen' : isEs ? 'Tres ubicaciones incluidas' : 'Three locations included'}</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> ${isNl ? 'Centraal dashboard' : isEs ? 'Panel central' : 'Central dashboard'}</li>
                    </ul>
                    <a href="${isNl ? '/nl/pricing.html' : isEs ? '/es/pricing.html' : '/pricing.html'}" class="btn btn-secondary" style="text-align:center;justify-content:center;">${multiBtn}</a>
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
            <div class="benefit-title">${trans.name}</div>
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
    const ctaStart = isAgency ? (isNl ? 'Start Bureau Proefperiode' : isEs ? 'Comenzar Prueba de Agencia' : 'Start Agency Trial') : (isNl ? 'Start Uw Gratis Proefperiode' : isEs ? 'Comienza Tu Prueba Gratuita' : 'Start Your Free Trial');
    const ctaHow = isNl ? 'Bekijk Hoe Het Werkt' : isEs ? 'Ver Cómo Funciona' : 'See How It Works';
    const trustText = isNl ? 'Gemaakt voor Google Reviews · Abonnementen beginnen bij $29 per maand' : isEs ? 'Diseñado para Reseñas de Google · Planes desde $29 por mes' : 'Built for Google Reviews · Plans start at $29 per month';
    const activeText = isNl ? 'Actief' : isEs ? 'Activo' : 'Active';
    const recentReviewsText = isNl ? 'Recente Beoordelingen' : isEs ? 'Reseñas Recientes' : 'Recent Reviews';

    const homeTitle = isNl ? 'Home' : isEs ? 'Inicio' : 'Home';
    const indCategoryTitle = isNl ? 'Sectoren' : isEs ? 'Industrias' : 'Industries';
    const homePath = isNl ? '/nl/' : isEs ? '/es/' : '/';
    const indCategoryPath = isNl ? '/nl/#benefits' : isEs ? '/es/#benefits' : '/#benefits';

    const breadcrumbsHtml = `
    <div class="breadcrumbs" style="font-size:0.82rem;color:var(--text-muted);margin-bottom:20px;display:flex;gap:8px;align-items:center;">
        <a href="${homePath}" style="color:var(--text-muted);text-decoration:none;">${homeTitle}</a>
        <span>/</span>
        <a href="${indCategoryPath}" style="color:var(--text-muted);text-decoration:none;">${indCategoryTitle}</a>
        <span>/</span>
        <span style="color:var(--industry-accent, var(--accent));font-weight:600;">${trans.name}</span>
    </div>`;

    const themeStyles = `
    <style>
        :root {
            --industry-accent: ${ind.theme.accent};
            --industry-accent-soft: ${ind.theme.accent}20;
            --industry-icon-bg: ${ind.theme.accent}15;
            --industry-accent-glow: ${ind.theme.accent}33;
        }
    </style>`;

    const heroSection = `
    <header class="hero industry-hero" style="padding:130px 0 70px;">
        <div class="hero-glow-layer"></div>
        <div class="container">
            ${breadcrumbsHtml}
            <div class="hero-inner">
                <div class="hero-text">
                    <div class="eyebrow industry-eyebrow">
                        <i data-lucide="google" style="width:12px;height:12px;color:#DB4437;"></i>
                        ${eyebrowText}
                    </div>
                    <h1 class="mb-6">${trans.heroHeadline}</h1>
                    <p class="lead mb-8">${trans.heroDescription}</p>
                    <div class="hero-actions">
                        <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-accent btn-lg">${ctaStart}</a>
                        <a href="${isNl ? '/nl/#how-it-works' : isEs ? '/es/#how-it-works' : '/#how-it-works'}" class="btn btn-secondary btn-lg">${ctaHow}</a>
                    </div>
                    <div class="hero-trust">
                        <i data-lucide="shield-check" style="width:13px;height:13px;color:var(--accent);"></i>
                        ${trustText}
                    </div>
                </div>
                <div class="mockup-card">
                    <div class="mockup-header">
                        <div class="mockup-dots"><span></span><span></span><span></span></div>
                        <div class="mockup-url"><i data-lucide="lock" style="width:10px;height:10px;"></i> replyvera.com/dashboard</div>
                        <div style="font-size:0.7rem;font-weight:700;color:var(--industry-accent, var(--accent));display:flex;align-items:center;gap:5px;">
                            <span style="width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;"></span>${activeText}
                        </div>
                    </div>
                    <div style="font-size:0.72rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:10px;">${recentReviewsText}</div>
                    <div class="review-rows">
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(5)}</div>
                                <div class="review-row-text">"${trans.mockupPositive}"</div>
                            </div>
                            <span class="review-badge badge-auto">${isNl ? 'Veilig om automatisch te publiceren' : isEs ? 'Seguro para Publicar Automáticamente' : 'Safe to Auto-Publish'}</span>
                        </div>
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(2)}</div>
                                <div class="review-row-text">"${trans.mockupNegative}"</div>
                            </div>
                            <span class="review-badge badge-approval">${isNl ? 'Goedkeuring vereist' : isEs ? 'Requiere Aprobación' : 'Needs Approval'}</span>
                        </div>
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(1)}</div>
                                <div class="review-row-text">"${trans.mockupSensitive}"</div>
                            </div>
                            <span class="review-badge badge-blocked">${isNl ? 'Automatisch publiceren geblokkeerd' : isEs ? 'Publicación Automática Bloqueada' : 'Auto-Publishing Blocked'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

    const benefitsSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light">
        <div class="container">
            <div class="section-header">
                <h2>${trans.benefitsHeadline}</h2>
            </div>
            <div class="benefits-grid">
                ${renderBenefits(trans.benefits)}
            </div>
        </div>
    </section>`;

    const howItWorksTitle = isNl ? 'Koppel Google. Stel uw Regels in. Laat ReplyVera de Rest Doen.' : isEs ? 'Conecta Google. Establece tus Reglas. Deja que ReplyVera Haga el Resto.' : 'Connect Google. Set Your Rules. Let ReplyVera Handle the Rest.';
    const step1Title = isNl ? 'Koppel Google Bedrijfsprofiel' : isEs ? 'Conecta tu Perfil de Empresa en Google' : 'Connect Google Business Profile';
    const step1Text = isNl ? 'Koppel veilig één of meerdere bedrijfslocaties. Er worden geen wachtwoorden opgeslagen.' : isEs ? 'Conecta de forma segura una o más ubicaciones. No almacenamos contraseñas.' : 'Securely connect one or more business locations. No passwords stored.';
    const step2Title = isNl ? 'Kies uw Toon en Goedkeuringsregels' : isEs ? 'Elige tu Tono y Reglas de Aprobación' : 'Choose Your Tone and Approval Rules';
    const step3Title = isNl ? 'ReplyVera Verwerkt Nieuwe Reviews' : isEs ? 'ReplyVera Gestiona las Nuevas Reseñas' : 'ReplyVera Handles New Reviews';

    const howItWorksSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark" id="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>${howItWorksTitle}</h2>
            </div>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <div class="step-title">${step1Title}</div>
                    <p class="step-text">${step1Text}</p>
                </div>
                <div class="step-card">
                    <div class="step-number">2</div>
                    <div class="step-title">${step2Title}</div>
                    <p class="step-text">${trans.step2Text}</p>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <div class="step-title">${step3Title}</div>
                    <p class="step-text">${trans.step3Text}</p>
                </div>
            </div>
        </div>
    </section>`;

    const reviewsSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light">
        <div class="container">
            <div class="section-header">
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
    const sensitiveDetectedTitle = isNl ? 'Gevoelig Onderwerp Gedeclareerd' : isEs ? 'Tema Sensible Detectado' : 'Sensitive Topic Detected';
    const sensitiveBoxText = isNl ? 'Automatisch publiceren is geblokkeerd. Er is een concept voorbereid dat u eerst moet goedkeuren.' : isEs ? 'La publicación automática ha sido bloqueada. Se ha preparado un borrador para tu aprobación.' : 'Auto-publishing has been blocked. A draft has been prepared for your approval.';

    const sensitiveSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-dark">
        <div class="container">
            <div class="sensitive-inner">
                <div>
                    <div class="eyebrow" style="margin-bottom:16px;">
                        <i data-lucide="shield-alert" style="width:12px;height:12px;"></i>
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
                        <div class="sensitive-alert-title">
                            <i data-lucide="alert-triangle" style="width:16px;height:16px;"></i>
                            ${sensitiveDetectedTitle}
                        </div>
                        <p class="sensitive-alert-text" style="margin-bottom:12px;">${sensitiveBoxText}</p>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            <span class="review-badge badge-blocked">${isNl ? 'Automatisch publiceren geblokkeerd' : isEs ? 'Publicación Automática Bloqueada' : 'Auto-Publishing Blocked'}</span>
                            <span style="font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:4px;background:rgba(245,158,11,0.1);color:#FCD34D;border:1px solid rgba(245,158,11,0.2);">${isNl ? 'Eigenaar Gewaarschuwd' : isEs ? 'Propietario Notificado' : 'Owner Notified'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    const pricingSection = renderPricingSection(isAgency, ind, trans, lang);

    const faqTitle = isNl ? 'Veelgestelde Vragen' : isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions';
    const faqSection = `
    <div class="industry-divider-glow"></div>
    <section class="section section-light" id="faq">
        <div class="container" style="max-width:760px;">
            <div class="section-header">
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
        <div class="container" style="max-width:700px;">
            <div class="cta-box">
                <h2 class="mb-4">${trans.finalCtaHeadline}</h2>
                <p class="lead mb-8">${trans.finalCtaDescription}</p>
                <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                    <a href="https://dashboard.replyvera.com/login?signup=true" class="btn btn-accent btn-lg">${isNl ? 'Start Gratis Proefperiode' : isEs ? 'Comenzar Prueba Gratuita' : 'Start Free Trial'}</a>
                    <a href="${isNl ? '/nl/pricing.html' : isEs ? '/es/pricing.html' : '/pricing.html'}" class="btn btn-secondary btn-lg">${isNl ? 'Bekijk Prijzen' : isEs ? 'Ver Precios' : 'View Pricing'}</a>
                </div>
            </div>
        </div>
    </section>`;

    return `${themeStyles}${heroSection}${benefitsSection}${howItWorksSection}${reviewsSection}${sensitiveSection}${pricingSection}${faqSection}${relatedSection}${ctaSection}`;
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
        const hreflangNl = `${baseUrl}${getLocalizedPath(ind.id, 'nl')}`;
        const hreflangEs = `${baseUrl}${getLocalizedPath(ind.id, 'es')}`;

        const seoTags = `
    <title>${trans.metaTitle}</title>
    <meta name="description" content="${trans.metaDescription}">
    <link rel="canonical" href="${canonicalUrl}">
    <link rel="alternate" hreflang="en" href="${hreflangEn}">
    <link rel="alternate" hreflang="nl" href="${hreflangNl}">
    <link rel="alternate" hreflang="es" href="${hreflangEs}">
    <meta property="og:title" content="${trans.metaTitle}">
    <meta property="og:description" content="${trans.metaDescription}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : lang === 'es' ? 'es_ES' : 'en_US'}">`;

        let header = hf.header
            .replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${lang}"`)
            .replace(/<title>[^<]+<\/title>/, seoTags)
            .replace(/<meta name="description" content="[^"]+">/, '');

        // Mark active item in dropdown
        header = header.replace(`href="${localizedPath}" class="dropdown-item"`, `href="${localizedPath}" class="dropdown-item active"`);
        header = header.replace(`href="${localizedPath}" class="mobile-industry-item"`, `href="${localizedPath}" class="mobile-industry-item active"`);

        let fullPage = localizeAllHtmlLinks(header + '\n' + bodyContent + '\n' + hf.footer, lang);

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
