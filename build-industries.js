const fs = require('fs');
const path = require('path');

// ─── Extract nav + footer from index.html ───────────────────────────────────
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html not found!');
    process.exit(1);
}

const html = fs.readFileSync(templatePath, 'utf8');

const navSplit = html.split('</nav>');
if (navSplit.length < 2) { console.error('</nav> not found'); process.exit(1); }
const rawHeader = navSplit[0] + '</nav>';
const restPart  = navSplit[1];

const footerSplit = restPart.split('<!-- Footer -->');
if (footerSplit.length < 2) { console.error('<!-- Footer --> not found'); process.exit(1); }
const rawFooter = '<!-- Footer -->' + footerSplit[1];

// Patch paths to be absolute root-relative for sub-pages
function patchHeader(h) {
    return h
        .replace(/href="index\.html"/g,              'href="/index.html"')
        .replace(/href="pricing\.html"/g,            'href="/pricing.html"')
        .replace(/href="industries\/restaurants"/g,  'href="/industries/restaurants"')
        .replace(/href="industries\/dentists"/g,     'href="/industries/dentists"')
        .replace(/href="industries\/agencies"/g,     'href="/industries/agencies"')
        .replace(/href="industries\/martial-arts"/g, 'href="/industries/martial-arts"')
        .replace(/href="industries\/childcare"/g,    'href="/industries/childcare"')
        .replace(/href="industries\/tutoring"/g,     'href="/industries/tutoring"')
        .replace(/href="industries\/pet-care"/g,     'href="/industries/pet-care"')
        .replace(/href="industries\/car-washes"/g,   'href="/industries/car-washes"')
        .replace(/href="industries\/laundromats"/g,  'href="/industries/laundromats"')
        .replace(/href="style\.css"/g,               'href="/style.css"')
        .replace(/href="#product"/g,                 'href="/index.html#product"')
        .replace(/href="#how-it-works"/g,            'href="/index.html#how-it-works"')
        .replace(/href="#pricing"/g,                 'href="/index.html#pricing"')
        .replace(/href="#faq"/g,                     'href="/index.html#faq"')
        .replace(/href="#benefits"/g,                'href="/index.html#benefits"');
}

function patchFooter(f) {
    return f
        .replace(/href="index\.html/g,   'href="/index.html')
        .replace(/href="pricing\.html/g, 'href="/pricing.html')
        .replace(/href="terms\.html"/g,  'href="/terms.html"')
        .replace(/href="privacy\.html"/g,'href="/privacy.html"')
        .replace(/href="cookie\.html"/g, 'href="/cookie.html"')
        .replace(/src="script\.js"/g,    'src="/script.js"');
}

const baseHeader = patchHeader(rawHeader);
const baseFooter = patchFooter(rawFooter);

// ─── Helpers ─────────────────────────────────────────────────────────────────
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

function renderReviews(examples) {
    return examples.map(ex => {
        const starHtml = stars(ex.rating);
        if (ex.isAlert) {
            return `
        <div class="review-card">
            <div class="review-card-top">
                <div class="review-stars">${starHtml}</div>
                <span class="review-type">${ex.type || 'Sensitive Review'}</span>
            </div>
            <p class="review-quote">${ex.quote}</p>
            <div class="review-alert-box">
                <div class="review-alert-title">
                    <i data-lucide="alert-triangle" style="width:13px;height:13px;"></i>
                    Sensitive topic detected
                </div>
                <p class="review-alert-sub">A manager must review this before publishing.</p>
            </div>
            <span class="review-badge badge-blocked" style="align-self:flex-start;">Auto-Publishing Blocked</span>
        </div>`;
        }
        const badgeClass  = ex.needsApproval ? 'badge-approval' : 'badge-auto';
        const badgeLabel  = ex.needsApproval ? 'Needs Approval'  : 'Safe to Auto-Publish';
        const responseLabel = 'ReplyVera response';
        return `
        <div class="review-card">
            <div class="review-card-top">
                <div class="review-stars">${starHtml}</div>
                <span class="review-type">${ex.type || (ex.needsApproval ? 'Negative Review' : 'Positive Review')}</span>
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
    return topics.map(t => `<span class="topic-tag">${t}</span>`).join('');
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

function renderPricingSection(isAgency) {
    if (isAgency) {
        return `
    <!-- Pricing -->
    <section class="section section-dark" id="pricing">
        <div class="container">
            <div class="section-header">
                <h2>Agency Pricing</h2>
                <p>One account. Multiple clients. One affordable monthly fee.</p>
            </div>
            <div style="max-width:460px;margin:0 auto;">
                <div class="pricing-card featured" style="padding:32px 28px;">
                    <div class="pricing-name">Agency Plan</div>
                    <div class="pricing-price" style="font-size:2rem;">From $149</div>
                    <div class="pricing-period">per month</div>
                    <p class="pricing-tagline">Manage Google review replies across all your clients from one account.</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Up to 5 client locations included</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Additional locations available</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Separate brand voice per client</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Client-level approval access</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Team member access</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Central management dashboard</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Sensitive-review escalation per client</li>
                    </ul>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="text-align:center;justify-content:center;">Start Free Trial</a>
                </div>
                <p style="text-align:center;font-size:0.82rem;color:var(--text-muted);margin-top:16px;">14-day free trial. Cancel anytime.</p>
            </div>
        </div>
    </section>`;
    }

    return `
    <!-- Pricing -->
    <section class="section section-dark" id="pricing">
        <div class="container">
            <div class="section-header">
                <h2>Simple Pricing for Small Businesses</h2>
                <p>Start free. No credit card required. Cancel anytime.</p>
            </div>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <div class="pricing-name">Starter</div>
                    <div class="pricing-price">$29</div>
                    <div class="pricing-period">per month</div>
                    <p class="pricing-tagline">You approve every reply before it is published.</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> One location</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Up to 30 replies per month</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Manual approval for all reviews</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Custom tone</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> English and Spanish</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Negative-review alerts</li>
                    </ul>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-secondary" style="text-align:center;justify-content:center;">Start Free</a>
                </div>
                <div class="pricing-card featured">
                    <div class="pricing-popular">Most Popular</div>
                    <div class="pricing-name">Autopilot</div>
                    <div class="pricing-price">$39</div>
                    <div class="pricing-period">per month</div>
                    <p class="pricing-tagline">Safe replies publish automatically. Sensitive reviews stay under your approval.</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> One location</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Unlimited replies</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Automatic publishing for safe reviews</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Sensitive-review detection</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Custom brand voice</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Review history</li>
                    </ul>
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="text-align:center;justify-content:center;">Start Free</a>
                </div>
                <div class="pricing-card">
                    <div class="pricing-name">Multi-Location</div>
                    <div class="pricing-price" style="font-size:1.85rem;">From $79</div>
                    <div class="pricing-period">per month</div>
                    <p class="pricing-tagline">Manage all your locations from one account with location-level rules.</p>
                    <ul class="pricing-features">
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Three locations included</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Central dashboard</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Location-specific rules</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Team access</li>
                        <li><i data-lucide="check" style="width:14px;height:14px;"></i> Additional locations available</li>
                    </ul>
                    <a href="/pricing.html" class="btn btn-secondary" style="text-align:center;justify-content:center;">View Multi-Location Pricing</a>
                </div>
            </div>
            <p style="text-align:center;font-size:0.84rem;color:var(--text-muted);margin-top:24px;">14-day free trial. Cancel anytime.</p>
        </div>
    </section>`;
}

// ─── Main render function ─────────────────────────────────────────────────────
function renderIndustryPage(ind) {
    const isAgency = ind.slug === 'agencies';

    const heroSection = `
    <!-- Hero -->
    <header class="hero" style="padding:140px 0 80px;">
        <div class="hero-glow-layer"></div>
        <div class="container">
            <div class="hero-inner">
                <div class="hero-text">
                    <div class="eyebrow">
                        <i data-lucide="google" style="width:12px;height:12px;color:#DB4437;"></i>
                        Google Review Automation
                    </div>
                    <h1 class="mb-6">${ind.heroHeadline}</h1>
                    <p class="lead mb-8">${ind.heroDescription}</p>
                    <div class="hero-actions">
                        <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent btn-lg">Start Your Free Trial</a>
                        <a href="/index.html#how-it-works" class="btn btn-secondary btn-lg">See How It Works</a>
                    </div>
                    <div class="hero-trust">
                        <i data-lucide="shield-check" style="width:13px;height:13px;color:var(--accent);"></i>
                        Built for Google Reviews &nbsp;·&nbsp; Plans start at ${isAgency ? '$149' : '$29'} per month
                    </div>
                </div>
                <div class="mockup-card">
                    <div class="mockup-header">
                        <div class="mockup-dots"><span></span><span></span><span></span></div>
                        <div class="mockup-url"><i data-lucide="lock" style="width:10px;height:10px;"></i> replyvera.com/dashboard</div>
                        <div style="font-size:0.7rem;font-weight:700;color:var(--accent);display:flex;align-items:center;gap:5px;">
                            <span style="width:6px;height:6px;background:var(--accent);border-radius:50%;display:inline-block;"></span>Active
                        </div>
                    </div>
                    <div style="font-size:0.72rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.07em;margin-bottom:10px;">Recent Reviews</div>
                    <div class="review-rows">
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(5)}</div>
                                <div class="review-row-text">"${ind.mockupPositive || 'Great service and friendly staff.'}"</div>
                            </div>
                            <span class="review-badge badge-auto">Safe to Auto-Publish</span>
                        </div>
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(2)}</div>
                                <div class="review-row-text">"${ind.mockupNegative || 'Service did not meet expectations.'}"</div>
                            </div>
                            <span class="review-badge badge-approval">Needs Approval</span>
                        </div>
                        <div class="review-row-item">
                            <div class="review-row-meta">
                                <div class="review-row-stars">${stars(1)}</div>
                                <div class="review-row-text">"${ind.mockupSensitive || 'Serious complaint requiring review.'}"</div>
                            </div>
                            <span class="review-badge badge-blocked">Auto-Publishing Blocked</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>`;

    const benefitsSection = `
    <!-- Three Benefits -->
    <section class="section section-light">
        <div class="container">
            <div class="section-header">
                <h2>${ind.benefitsHeadline || 'Three Reasons to Choose ReplyVera'}</h2>
            </div>
            <div class="benefits-grid">
                ${renderBenefits(ind.benefits)}
            </div>
        </div>
    </section>`;

    const howItWorksSection = `
    <!-- How It Works -->
    <section class="section section-dark" id="how-it-works">
        <div class="container">
            <div class="section-header">
                <h2>Connect Google. Set Your Rules. Let ReplyVera Handle the Rest.</h2>
            </div>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-number">1</div>
                    <div class="step-title">Connect Google Business Profile</div>
                    <p class="step-text">Securely connect one or more business locations. No passwords stored, and you can disconnect anytime.</p>
                </div>
                <div class="step-card">
                    <div class="step-number">2</div>
                    <div class="step-title">Choose Your Tone and Approval Rules</div>
                    <p class="step-text">${ind.step2Text}</p>
                </div>
                <div class="step-card">
                    <div class="step-number">3</div>
                    <div class="step-title">ReplyVera Handles New Reviews</div>
                    <p class="step-text">${ind.step3Text}</p>
                </div>
            </div>
        </div>
    </section>`;

    const reviewsSection = `
    <!-- Review Examples -->
    <section class="section section-light">
        <div class="container">
            <div class="section-header">
                <h2>${ind.reviewsHeadline || 'How ReplyVera Handles Your Reviews'}</h2>
                <p>${ind.reviewsSubhead || 'See how different review types are handled based on your configuration.'}</p>
            </div>
            <div class="reviews-grid">
                ${renderReviews(ind.reviewExamples)}
            </div>
        </div>
    </section>`;

    const sensitiveSection = `
    <!-- Sensitive Review Protection -->
    <section class="section section-dark">
        <div class="container">
            <div class="sensitive-inner">
                <div>
                    <div class="eyebrow" style="margin-bottom:16px;">
                        <i data-lucide="shield-alert" style="width:12px;height:12px;"></i>
                        Sensitive Review Protection
                    </div>
                    <h2 style="margin-bottom:12px;">${ind.sensitiveHeadline}</h2>
                    <p style="margin-bottom:16px;">ReplyVera never publishes sensitive feedback automatically. When a review matches a protected topic, auto-publishing is blocked and you receive an immediate alert.</p>
                    <p style="font-size:0.82rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:10px;">Monitored topics:</p>
                    <div class="topic-tags">
                        ${renderTopics(ind.sensitiveTopics)}
                    </div>
                </div>
                <div>
                    <div class="sensitive-alert">
                        <div class="sensitive-alert-title">
                            <i data-lucide="alert-triangle" style="width:16px;height:16px;"></i>
                            Sensitive Topic Detected
                        </div>
                        <p class="sensitive-alert-text" style="margin-bottom:12px;">Auto-publishing has been blocked. A draft has been prepared but will not go live until you approve it.</p>
                        <div style="display:flex;gap:8px;flex-wrap:wrap;">
                            <span class="review-badge badge-blocked">Auto-Publishing Blocked</span>
                            <span style="font-size:0.68rem;font-weight:700;padding:3px 9px;border-radius:4px;background:rgba(245,158,11,0.1);color:#FCD34D;border:1px solid rgba(245,158,11,0.2);">Owner Notified</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;

    const pricingSection = renderPricingSection(isAgency);

    const faqSection = `
    <!-- FAQ -->
    <section class="section section-light" id="faq">
        <div class="container" style="max-width:760px;">
            <div class="section-header">
                <h2>Frequently Asked Questions</h2>
            </div>
            <div class="faq-list">
                ${renderFAQ(ind.faqItems)}
            </div>
        </div>
    </section>`;

    const ctaSection = `
    <!-- Final CTA -->
    <section class="section section-dark">
        <div class="container" style="max-width:700px;">
            <div class="cta-box">
                <h2 class="mb-4">${ind.finalCtaHeadline}</h2>
                <p class="lead mb-8">${ind.finalCtaDescription}</p>
                <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent btn-lg">Start Your Free Trial</a>
                    <a href="/pricing.html" class="btn btn-secondary btn-lg">View Pricing</a>
                </div>
            </div>
        </div>
    </section>`;

    return `${heroSection}${benefitsSection}${howItWorksSection}${reviewsSection}${sensitiveSection}${pricingSection}${faqSection}${ctaSection}`;
}

// ─── Industry data ────────────────────────────────────────────────────────────
const industryPages = [
    {
        slug: 'restaurants',
        metaTitle: 'Google Review Automation for Restaurants | ReplyVera',
        metaDescription: 'ReplyVera automatically responds to restaurant Google reviews, recognizes standout staff, and escalates food-safety, allergy, and serious service complaints.',
        heroHeadline: 'Every Restaurant Review Answered Automatically',
        heroDescription: 'ReplyVera writes personalized Google review responses and keeps allergy, food-safety, and serious service complaints under manager control before anything is published.',
        mockupPositive: 'Maria made our anniversary dinner wonderful.',
        mockupNegative: 'The food was good but we waited almost an hour.',
        mockupSensitive: 'I explained my allergy but the dish contained it.',
        benefitsHeadline: 'Replies That Work as Hard as Your Floor Staff',
        benefits: [
            { icon: 'clock', title: 'Save Manager Time', text: 'Routine reviews are handled automatically so your managers can focus on running shifts, not writing replies.' },
            { icon: 'award', title: 'Recognize Great Service', text: 'Servers, hosts, chefs, and managers mentioned in reviews are naturally included in the reply.' },
            { icon: 'shield-alert', title: 'Protect the Brand', text: 'Allergy, illness, injury, and serious cleanliness complaints require manager approval before any response is published.' }
        ],
        step2Text: 'Set your preferred tone, your approval rules, and which staff roles to recognize. ReplyVera handles each review accordingly.',
        step3Text: 'Routine reviews are answered. Food-safety and serious service complaints are held for manager approval and never published automatically.',
        reviewsHeadline: 'From Anniversary Praise to Allergy Complaints',
        reviewsSubhead: 'See how ReplyVera handles the full range of restaurant reviews.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Maria made our anniversary dinner wonderful."',
                reply: '"Thank you for celebrating with us. We\'re delighted that Maria helped make the evening special, and we\'ll be sure to share your kind words with her."',
                needsApproval: false
            },
            {
                rating: 3,
                type: 'Wait-Time Complaint',
                quote: '"The food was good, but we waited almost an hour."',
                reply: '"Thank you for your honest feedback. We\'re glad you enjoyed the food, but we\'re sorry your wait was much longer than expected."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"I explained my allergy, but the dish still contained the ingredient."',
                isAlert: true,
                alertTitle: 'Food-safety concern detected',
                alertText: 'Auto-publishing blocked. Manager approval required before any response is published.'
            }
        ],
        sensitiveHeadline: 'Some Restaurant Reviews Should Never Be Answered Automatically',
        sensitiveTopics: ['Allergies', 'Food poisoning', 'Contamination', 'Injuries', 'Discrimination', 'Serious cleanliness complaints'],
        faqItems: [
            { q: 'Can ReplyVera recognize employee names in reviews?', a: 'Yes. ReplyVera identifies names mentioned in reviews and includes them naturally in the reply, helping you recognize standout staff.' },
            { q: 'Are food-safety reviews blocked from auto-publishing?', a: 'Yes. Reviews containing allergy, illness, contamination, or similar keywords are immediately blocked from automatic publishing and routed to your approval inbox.' },
            { q: 'Can ReplyVera manage multiple restaurant locations?', a: 'Yes. The Multi-Location plan lets you manage separate Google Business Profiles for each location from one central dashboard.' },
            { q: 'Does ReplyVera respond in Spanish?', a: 'Yes. ReplyVera can draft responses in both English and Spanish based on your configuration.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Stop Leaving Restaurant Reviews Unanswered',
        finalCtaDescription: 'Let ReplyVera handle routine replies and protect your reputation while your team focuses on serving great food.'
    },
    {
        slug: 'dentists',
        metaTitle: 'Google Review Automation for Dental Practices | ReplyVera',
        metaDescription: 'ReplyVera writes professional, privacy-conscious Google review responses for dentists while escalating clinical, billing, and sensitive patient concerns.',
        heroHeadline: 'Professional Google Review Responses for Dental Practices',
        heroDescription: 'ReplyVera creates privacy-conscious review responses while keeping clinical, billing, and sensitive patient concerns under staff approval before anything is published.',
        mockupPositive: 'Jessica made me feel comfortable throughout.',
        mockupNegative: 'I received a bill I was not expecting.',
        mockupSensitive: 'I had severe pain and no one returned my call.',
        benefitsHeadline: 'Professional Replies That Protect Your Practice',
        benefits: [
            { icon: 'clock', title: 'Save Front-Desk Time', text: 'Routine positive reviews are handled consistently without requiring your front-desk team to write each response.' },
            { icon: 'lock', title: 'Protect Patient Privacy', text: 'Responses are designed to avoid confirming patient status, treatment details, or any information that should remain private.' },
            { icon: 'shield-alert', title: 'Escalate Clinical Concerns', text: 'Pain, injury, billing, and treatment complaints require approval before any response is published.' }
        ],
        step2Text: 'Set your practice tone and approval rules. ReplyVera identifies clinical, billing, and privacy-sensitive reviews and routes them for manual review.',
        step3Text: 'Routine positive reviews go live after your configured delay. Clinical, billing, and sensitive reviews are held and never published without approval.',
        reviewsHeadline: 'Professional Responses for Every Patient Experience',
        reviewsSubhead: 'From positive feedback to clinical concerns, each review is handled appropriately.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Jessica made me feel comfortable throughout the visit."',
                reply: '"Thank you for your kind feedback. We\'re pleased to hear that Jessica and the team helped create a comfortable experience. We\'ll share your appreciation with them."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Billing Concern',
                quote: '"I received a bill I was not expecting."',
                reply: '"Thank you for sharing your concern. Please contact the office directly so the appropriate team member can review the details with you."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"I had severe pain afterward and no one returned my call."',
                isAlert: true,
                alertTitle: 'Clinical concern detected',
                alertText: 'Auto-publishing blocked. Staff approval required before any response is published.'
            }
        ],
        sensitiveHeadline: 'Keep Clinical and Privacy-Sensitive Reviews Under Human Control',
        sensitiveTopics: ['Pain', 'Injury', 'Treatment outcomes', 'Medication', 'Diagnosis', 'Insurance', 'Billing disputes', 'Privacy complaints'],
        faqItems: [
            { q: 'How does ReplyVera handle patient privacy?', a: 'Responses are designed to avoid confirming patient status or referencing any clinical details. Replies focus on general appreciation without disclosing private information.' },
            { q: 'Are clinical and billing complaints blocked from auto-publishing?', a: 'Yes. Reviews mentioning pain, injury, billing disputes, or treatment outcomes are immediately held for approval and never published automatically.' },
            { q: 'Can ReplyVera recognize hygienists and staff mentioned by name?', a: 'Yes. When a reviewer mentions a specific staff member, ReplyVera includes them naturally in the response.' },
            { q: 'Does ReplyVera support multiple practice locations?', a: 'Yes. The Multi-Location plan supports multiple Google Business Profiles with separate rules for each location.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Respond Professionally Without Risking Patient Privacy',
        finalCtaDescription: 'Let ReplyVera handle routine replies consistently while your team focuses on patient care.'
    },
    {
        slug: 'agencies',
        metaTitle: 'Google Review Management for Marketing Agencies | ReplyVera',
        metaDescription: 'ReplyVera helps marketing agencies manage Google review replies for every client from one dashboard, with separate brand voices and approval rules.',
        heroHeadline: 'Manage Every Client\'s Google Review Replies From One Dashboard',
        heroDescription: 'ReplyVera helps agencies automate client review responses while preserving separate brand voices and approval rules for each business.',
        mockupPositive: 'Best dining experience we\'ve had in years.',
        mockupNegative: 'Billing issue that was never resolved.',
        mockupSensitive: 'Animal was injured while in their care.',
        benefitsHeadline: 'Scale Your Agency\'s Review Management',
        benefits: [
            { icon: 'layout-dashboard', title: 'Manage More Clients', text: 'Handle multiple client locations from a single account without switching between logins or dashboards.' },
            { icon: 'fingerprint', title: 'Protect Every Brand Voice', text: 'Each client uses its own tone configuration, business context, and approval rules.' },
            { icon: 'zap', title: 'Reduce Manual Work', text: 'Routine reviews are handled automatically across all clients, reducing the time your team spends writing replies.' }
        ],
        step2Text: 'Configure separate tone profiles, approval rules, and sensitive topics for each client location. Each client operates independently.',
        step3Text: 'Routine reviews are handled automatically per client settings. Sensitive feedback is held for your team or the client to approve before publishing.',
        reviewsHeadline: 'Across Restaurants, Clinics, and Pet-Care Businesses',
        reviewsSubhead: 'Each client review is handled with the right tone, rules, and protections for their industry.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Restaurant Client',
                quote: '"Best dining experience we\'ve had in years."',
                reply: '"Thank you for your wonderful review. We\'re so glad you had a great experience, and we look forward to welcoming you back."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Dental Client',
                quote: '"I was charged for a procedure I did not agree to."',
                reply: '"Thank you for your feedback. We take billing concerns seriously. Please contact the practice directly so the appropriate team member can address this with you."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Pet-Care Client',
                quote: '"My dog was injured while in their care."',
                isAlert: true,
                alertTitle: 'Animal safety concern detected',
                alertText: 'Auto-publishing blocked. Client notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Every Client\'s Sensitive Reviews Stay Under Control',
        sensitiveTopics: ['Clinical complaints', 'Animal safety', 'Food-safety concerns', 'Child safety', 'Billing disputes', 'Injury claims'],
        faqItems: [
            { q: 'Can each client have their own tone and approval rules?', a: 'Yes. Each client location is configured independently with its own tone profile, brand voice, and approval settings.' },
            { q: 'Can clients approve their own reviews?', a: 'Yes. You can grant client-level access so the business owner can review and approve sensitive responses themselves.' },
            { q: 'How many client locations can I manage?', a: 'The Agency plan starts at $149 per month for up to five locations, with additional locations available at an added rate.' },
            { q: 'Does ReplyVera support sensitive-review detection per industry?', a: 'Yes. Each client location can have its own sensitive-topic rules configured to match their specific industry.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Turn Review Management Into a Scalable Agency Service',
        finalCtaDescription: 'Add Google review automation to your agency\'s service offering without adding headcount.'
    },
    {
        slug: 'martial-arts',
        metaTitle: 'Google Review Automation for Martial Arts Schools | ReplyVera',
        metaDescription: 'ReplyVera handles routine parent and student reviews for martial arts schools while escalating safety, injury, bullying, and membership complaints.',
        heroHeadline: 'Every Martial Arts Review Answered Automatically',
        heroDescription: 'ReplyVera handles routine parent and student reviews while keeping safety, injury, bullying, and membership complaints under owner approval before anything goes live.',
        mockupPositive: 'Sensei David changed my son\'s confidence.',
        mockupNegative: 'I had trouble cancelling my membership.',
        mockupSensitive: 'My child was hurt during a sparring session.',
        benefitsHeadline: 'Spend More Time Teaching. Less Time Writing Replies.',
        benefits: [
            { icon: 'clock', title: 'Save Owner Time', text: 'Stop writing every review reply yourself. Routine responses are handled automatically so you can focus on instruction.' },
            { icon: 'award', title: 'Recognize Great Instructors', text: 'When parents mention coaches and instructors by name, their recognition is reflected naturally in the reply.' },
            { icon: 'shield-alert', title: 'Protect Students and the School', text: 'Safety incidents, membership disputes, and bullying concerns require owner review before any response is published.' }
        ],
        step2Text: 'Set your school\'s tone and approval rules. ReplyVera identifies safety, injury, and membership complaints and routes them to you before publishing.',
        step3Text: 'Routine parent and student reviews are answered automatically. Safety and membership concerns are held for your approval and never published without it.',
        reviewsHeadline: 'From Progress Praise to Safety Concerns',
        reviewsSubhead: 'Each type of martial arts review is handled with the right level of care.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Sensei David has completely changed my son\'s confidence."',
                reply: '"Thank you for sharing this. We\'re so glad your son has grown through training, and we\'ll be sure to pass your kind words on to Sensei David."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Membership Complaint',
                quote: '"I had trouble cancelling my membership and kept getting charged."',
                reply: '"Thank you for letting us know. We\'re sorry for the difficulty you experienced. Please contact us directly so we can resolve this for you right away."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"My child was injured during a sparring session and no one informed me."',
                isAlert: true,
                alertTitle: 'Child safety concern detected',
                alertText: 'Auto-publishing blocked. Owner notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Safety and Membership Disputes Require Your Approval',
        sensitiveTopics: ['Injury', 'Child safety', 'Bullying', 'Discrimination', 'Staff conduct', 'Membership disputes'],
        faqItems: [
            { q: 'Can ReplyVera recognize instructor names in reviews?', a: 'Yes. When parents or students mention a coach or instructor by name, the reply naturally includes that recognition.' },
            { q: 'Are injury and safety reviews blocked from auto-publishing?', a: 'Yes. Any review mentioning injury, child safety, bullying, or staff conduct is immediately held for owner approval.' },
            { q: 'Can membership complaints be routed for approval?', a: 'Yes. Membership cancellation issues, billing disputes, and contract concerns are held for your review before any reply is published.' },
            { q: 'Does ReplyVera support multiple school locations?', a: 'Yes. The Multi-Location plan lets you manage separate Google Business Profiles for each location from one account.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Spend More Time Teaching and Less Time Writing Replies',
        finalCtaDescription: 'Let ReplyVera handle routine reviews while you stay in full control of anything involving student safety or membership disputes.'
    },
    {
        slug: 'childcare',
        metaTitle: 'Google Review Automation for Childcare Centers | ReplyVera',
        metaDescription: 'ReplyVera handles routine parent reviews for childcare centers and preschools while escalating concerns involving supervision, injury, allergies, and child privacy.',
        heroHeadline: 'Every Childcare Review Answered With Care',
        heroDescription: 'ReplyVera handles routine parent reviews while escalating concerns involving supervision, injuries, allergies, staff conduct, or child privacy before anything is published.',
        mockupPositive: 'Miss Sarah goes above and beyond for every child.',
        mockupNegative: 'Communication from the center has been inconsistent.',
        mockupSensitive: 'My daughter had an allergic reaction and I wasn\'t notified.',
        benefitsHeadline: 'Replies That Reflect the Care You Give Every Day',
        benefits: [
            { icon: 'clock', title: 'Save Director Time', text: 'Routine reply drafts are prepared automatically so directors and staff can focus on children, not review management.' },
            { icon: 'heart', title: 'Recognize Great Teachers', text: 'When parents praise a specific teacher or staff member, that recognition is reflected naturally in the reply.' },
            { icon: 'shield-alert', title: 'Protect Families and the Center', text: 'Safety and privacy concerns require director approval before any response is published.' }
        ],
        step2Text: 'Set your center\'s tone and approval rules. ReplyVera identifies safety, allergy, and privacy concerns and routes them for director review.',
        step3Text: 'Routine parent feedback is handled consistently. Safety and privacy concerns are held for your approval and never published without it.',
        reviewsHeadline: 'From Teacher Praise to Safety Concerns',
        reviewsSubhead: 'Each type of childcare review is handled with the appropriate level of care and protection.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Miss Sarah goes above and beyond for every child in her class."',
                reply: '"Thank you for this wonderful feedback. We\'re so glad your child is thriving, and we\'ll make sure to share your kind words with Miss Sarah."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Communication Concern',
                quote: '"Communication from the center has been inconsistent this month."',
                reply: '"Thank you for bringing this to our attention. We take feedback seriously and would like to connect with you directly to understand how we can improve."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"My daughter had an allergic reaction and I was not notified promptly."',
                isAlert: true,
                alertTitle: 'Child safety concern detected',
                alertText: 'Auto-publishing blocked. Director notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Child Safety and Privacy Reviews Always Require Approval',
        sensitiveTopics: ['Injury', 'Supervision', 'Allergy', 'Medication', 'Abuse', 'Neglect', 'Privacy', 'Licensing'],
        faqItems: [
            { q: 'Are allergy and injury reviews blocked from auto-publishing?', a: 'Yes. Any review mentioning allergy, injury, supervision, medication, or child safety is immediately held for director approval and never published automatically.' },
            { q: 'Can ReplyVera recognize teacher names mentioned in reviews?', a: 'Yes. When a parent mentions a specific teacher or staff member, the reply includes that recognition naturally.' },
            { q: 'How does ReplyVera handle child privacy?', a: 'Responses are designed to avoid referencing specific children, personal information, or details that should remain private.' },
            { q: 'Does ReplyVera support multiple center locations?', a: 'Yes. The Multi-Location plan lets you manage separate profiles for each location from one account.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Protect Your Reputation Without Overloading Center Directors',
        finalCtaDescription: 'Let ReplyVera handle routine parent feedback while your team focuses on providing exceptional care every day.'
    },
    {
        slug: 'tutoring',
        metaTitle: 'Google Review Automation for Tutoring Centers | ReplyVera',
        metaDescription: 'ReplyVera writes professional Google review responses for tutoring centers while keeping refund, billing, academic-claim, and student-safety concerns under approval.',
        heroHeadline: 'Turn Every Parent Review Into Trust',
        heroDescription: 'ReplyVera writes professional Google review responses while keeping refund, billing, academic-claim, and student-safety concerns under approval before anything is published.',
        mockupPositive: 'Mr. Chen helped my son go from failing to confident.',
        mockupNegative: 'We didn\'t see the improvement we were promised.',
        mockupSensitive: 'Requesting a refund for sessions that were cancelled.',
        benefitsHeadline: 'Professional Replies That Build Parent Confidence',
        benefits: [
            { icon: 'clock', title: 'Save Administrative Time', text: 'Routine positive reviews are handled consistently without your admin team needing to write each one.' },
            { icon: 'award', title: 'Recognize Great Tutors', text: 'When parents praise a specific tutor by name, that recognition is reflected naturally in the reply.' },
            { icon: 'shield-alert', title: 'Avoid Risky Claims', text: 'Academic guarantees, refund requests, and student-safety concerns require approval before any response is published.' }
        ],
        step2Text: 'Set your center\'s tone and approval rules. ReplyVera identifies academic-claim, billing, and safety concerns and routes them for manual review.',
        step3Text: 'Routine parent praise is answered automatically. Refund, billing, and academic-guarantee concerns are held for your approval and never published without it.',
        reviewsHeadline: 'From Progress Praise to Billing Disputes',
        reviewsSubhead: 'Each parent review is handled with the right level of professionalism and protection.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Mr. Chen helped my son go from failing to confident in just a few weeks."',
                reply: '"Thank you for this encouraging feedback. We\'re so glad to hear about your son\'s progress, and we\'ll be sure to share your kind words with Mr. Chen."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Progress Complaint',
                quote: '"We did not see the improvement we were told to expect."',
                reply: '"Thank you for sharing your concern. We\'d like to connect with you directly to understand your experience and discuss how we can best support your child\'s progress."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"I am requesting a refund for sessions that were cancelled with no notice."',
                isAlert: true,
                alertTitle: 'Billing and refund concern detected',
                alertText: 'Auto-publishing blocked. Administrative approval required before any response is published.'
            }
        ],
        sensitiveHeadline: 'Billing, Refunds, and Academic Claims Require Your Review',
        sensitiveTopics: ['Refund requests', 'Billing disputes', 'Academic guarantees', 'Student safety', 'Staff conduct', 'Cancelled sessions'],
        faqItems: [
            { q: 'Are refund and billing complaints blocked from auto-publishing?', a: 'Yes. Reviews mentioning refunds, billing disputes, or cancelled sessions are immediately held for administrative approval.' },
            { q: 'Can ReplyVera recognize tutor names in reviews?', a: 'Yes. When a parent mentions a specific tutor, the reply includes that recognition naturally.' },
            { q: 'How does ReplyVera handle academic-guarantee claims?', a: 'Any review making specific outcome claims or requesting compensation is routed for manual approval before any reply is drafted or published.' },
            { q: 'Does ReplyVera support multiple tutoring center locations?', a: 'Yes. The Multi-Location plan lets you manage multiple Google Business Profiles from one account.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Build Parent Trust Without Adding Administrative Work',
        finalCtaDescription: 'Let ReplyVera handle routine replies while your team focuses on helping students succeed.'
    },
    {
        slug: 'pet-care',
        metaTitle: 'Google Review Automation for Pet Care Businesses | ReplyVera',
        metaDescription: 'ReplyVera writes warm Google review responses for pet care businesses while immediately holding injury, illness, lost-pet, and animal-safety complaints for approval.',
        heroHeadline: 'Every Pet-Care Review Answered Automatically',
        heroDescription: 'ReplyVera writes warm Google review responses while immediately holding injury, illness, lost-pet, and animal-safety complaints for approval before they go live.',
        mockupPositive: 'Luna always comes home happy and well-groomed.',
        mockupNegative: 'Pickup took longer than the time we agreed on.',
        mockupSensitive: 'My dog got injured while boarding here.',
        benefitsHeadline: 'Replies That Reflect the Care You Give',
        benefits: [
            { icon: 'clock', title: 'Save Staff Time', text: 'Routine reviews are handled automatically, giving your team more time to focus on the animals in your care.' },
            { icon: 'award', title: 'Recognize Great Care', text: 'Groomers, handlers, and staff members mentioned by name are recognized naturally in the reply.' },
            { icon: 'shield-alert', title: 'Protect Pets and the Business', text: 'Injury, illness, lost-pet, and animal-safety complaints require approval before any response is published.' }
        ],
        step2Text: 'Set your business tone and approval rules. ReplyVera identifies animal-safety, injury, and missing-pet concerns and routes them for your review.',
        step3Text: 'Routine positive reviews are answered automatically. Safety and injury concerns are held for your approval and never published without it.',
        reviewsHeadline: 'From Happy Pets to Safety Complaints',
        reviewsSubhead: 'Every type of pet-care review is handled with warmth and the right level of protection.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Luna always comes home happy and beautifully groomed."',
                reply: '"Thank you so much for this lovely review. We\'re so glad Luna loves her visits with us, and we look forward to seeing her again soon."',
                needsApproval: false
            },
            {
                rating: 3,
                type: 'Delay Complaint',
                quote: '"Pickup took longer than the time we agreed on."',
                reply: '"Thank you for your feedback. We\'re sorry the timing wasn\'t what we had discussed. We\'ll review our scheduling to make sure this doesn\'t happen again."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"My dog was injured while boarding here and I was not contacted."',
                isAlert: true,
                alertTitle: 'Animal safety concern detected',
                alertText: 'Auto-publishing blocked. Owner notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Animal Safety Concerns Are Never Published Automatically',
        sensitiveTopics: ['Injury', 'Illness', 'Lost pet', 'Animal safety', 'Medication', 'Neglect', 'Staff conduct'],
        faqItems: [
            { q: 'Are animal injury or illness reviews blocked from auto-publishing?', a: 'Yes. Any review mentioning injury, illness, a missing pet, or animal safety is immediately held for owner approval and never published automatically.' },
            { q: 'Can ReplyVera recognize groomer and handler names in reviews?', a: 'Yes. When a customer mentions a specific team member, the reply includes that recognition naturally.' },
            { q: 'Does ReplyVera support multiple pet-care locations?', a: 'Yes. The Multi-Location plan lets you manage separate Google Business Profiles for each location from one account.' },
            { q: 'Can I set different approval rules for grooming vs. boarding reviews?', a: 'Yes. You can configure separate rules for different types of reviews and services within your account.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Protect Your Reputation While You Care for Their Pets',
        finalCtaDescription: 'Let ReplyVera handle routine replies so your team can focus on providing exceptional care every day.'
    },
    {
        slug: 'car-washes',
        metaTitle: 'Google Review Automation for Car Wash Operators | ReplyVera',
        metaDescription: 'ReplyVera handles routine car wash reviews automatically while escalating vehicle-damage, billing, membership, and safety complaints for owner approval.',
        heroHeadline: 'Every Car Wash Review Answered Automatically',
        heroDescription: 'ReplyVera handles routine reviews while escalating vehicle-damage, billing, membership, and safety complaints before any response is published.',
        mockupPositive: 'Best car wash in the area. Always spotless.',
        mockupNegative: 'The equipment was broken and my car wasn\'t cleaned.',
        mockupSensitive: 'My car was scratched during the wash.',
        benefitsHeadline: 'Keep Every Location Responsive and Protected',
        benefits: [
            { icon: 'clock', title: 'Save Location Manager Time', text: 'Routine reviews are handled consistently without your location managers needing to write each reply.' },
            { icon: 'award', title: 'Recognize Great Employees', text: 'When customers mention a specific team member, their recognition is naturally included in the reply.' },
            { icon: 'shield-alert', title: 'Escalate High-Risk Complaints', text: 'Vehicle damage, billing disputes, and membership cancellation issues require approval before any response is published.' }
        ],
        step2Text: 'Set your tone and approval rules. ReplyVera identifies vehicle-damage, billing, and membership complaints and routes them for approval.',
        step3Text: 'Routine reviews are answered automatically. Damage and billing complaints are held for your approval and never published without it.',
        reviewsHeadline: 'From Happy Customers to Vehicle Damage Claims',
        reviewsSubhead: 'Each car wash review is handled with the right level of care and business protection.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Best car wash in the area. My car always comes out spotless."',
                reply: '"Thank you for the great feedback! We\'re glad you keep coming back, and we look forward to seeing you again soon."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Equipment Complaint',
                quote: '"The equipment was broken and my car was not fully cleaned."',
                reply: '"Thank you for letting us know. We\'re sorry the equipment didn\'t perform as expected. Please contact us directly and we\'ll make this right."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"My car was scratched during the wash and no one would help me."',
                isAlert: true,
                alertTitle: 'Vehicle damage complaint detected',
                alertText: 'Auto-publishing blocked. Manager notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Damage and Billing Complaints Require Owner Approval',
        sensitiveTopics: ['Vehicle damage', 'Billing disputes', 'Membership cancellations', 'Safety concerns', 'Equipment failures', 'Theft claims'],
        faqItems: [
            { q: 'Are vehicle damage complaints blocked from auto-publishing?', a: 'Yes. Any review mentioning vehicle damage, scratches, or property concerns is immediately held for owner approval and never published automatically.' },
            { q: 'Can membership cancellation issues be routed for approval?', a: 'Yes. Membership billing and cancellation disputes are held for your review before any reply is published.' },
            { q: 'Can ReplyVera manage multiple car wash locations?', a: 'Yes. The Multi-Location plan lets you manage separate Google Business Profiles for each location from one dashboard.' },
            { q: 'Can ReplyVera recognize employee names in positive reviews?', a: 'Yes. When a customer mentions a team member by name, the reply includes that recognition naturally.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Keep Every Car Wash Location Responsive',
        finalCtaDescription: 'Let ReplyVera handle routine replies while your team manages the locations and protects the brand.'
    },
    {
        slug: 'laundromats',
        metaTitle: 'Google Review Automation for Laundromats | ReplyVera',
        metaDescription: 'ReplyVera responds to routine laundromat reviews and alerts owners when customers report broken machines, refunds, missing items, cleanliness, or safety concerns.',
        heroHeadline: 'Keep Every Laundry Review Clean and Professional',
        heroDescription: 'ReplyVera responds to routine reviews and alerts owners when customers report broken machines, refunds, missing items, cleanliness, or safety concerns.',
        mockupPositive: 'Always clean, always working. My go-to spot.',
        mockupNegative: 'Two of the washers weren\'t working today.',
        mockupSensitive: 'My clothes went missing and no one helped me.',
        benefitsHeadline: 'Stay on Top of Every Location\'s Reviews',
        benefits: [
            { icon: 'clock', title: 'Save Owner Time', text: 'Routine reviews are answered consistently without requiring you to write each reply yourself.' },
            { icon: 'map-pin', title: 'Spot Location Problems', text: 'Machine and cleanliness complaints are easy to identify so you can address issues before they affect your rating.' },
            { icon: 'shield-alert', title: 'Protect Customer Trust', text: 'Missing-item and refund disputes require approval before any response is published.' }
        ],
        step2Text: 'Set your tone and approval rules. ReplyVera identifies machine, cleanliness, and missing-item complaints and routes them for your review.',
        step3Text: 'Routine positive reviews are answered automatically. Refund, missing-item, and safety concerns are held for your approval before publishing.',
        reviewsHeadline: 'From Loyal Regulars to Missing-Item Complaints',
        reviewsSubhead: 'Each type of laundromat review is handled with the right response and the right protections.',
        reviewExamples: [
            {
                rating: 5,
                type: 'Positive Review',
                quote: '"Always clean, always working. This is my go-to laundromat."',
                reply: '"Thank you for the kind words! We work hard to keep things clean and running smoothly, and we really appreciate you sharing this."',
                needsApproval: false
            },
            {
                rating: 2,
                type: 'Equipment Complaint',
                quote: '"Two of the washers were not working when I arrived."',
                reply: '"Thank you for letting us know. We\'re sorry for the inconvenience. We\'ll look into the machines right away and work to get them back in service as quickly as possible."',
                needsApproval: true
            },
            {
                rating: 1,
                type: 'Sensitive Review',
                quote: '"My clothes went missing and no one at the location was able to help me."',
                isAlert: true,
                alertTitle: 'Missing-item complaint detected',
                alertText: 'Auto-publishing blocked. Owner notified immediately for manual review.'
            }
        ],
        sensitiveHeadline: 'Missing Items and Refund Requests Require Your Approval',
        sensitiveTopics: ['Missing items', 'Refund disputes', 'Safety concerns', 'Theft', 'Equipment damage', 'Health concerns'],
        faqItems: [
            { q: 'Are missing-item and refund complaints blocked from auto-publishing?', a: 'Yes. Any review mentioning missing clothing, theft, or refund requests is immediately held for owner approval and never published automatically.' },
            { q: 'Can I use ReplyVera to track which locations have the most machine complaints?', a: 'Reviews are organized by location, so you can quickly see patterns in machine or cleanliness complaints per site.' },
            { q: 'Can ReplyVera manage multiple laundromat locations?', a: 'Yes. The Multi-Location plan lets you manage separate Google Business Profiles for each location from one account.' },
            { q: 'Does ReplyVera respond in Spanish?', a: 'Yes. ReplyVera can draft responses in both English and Spanish based on your configuration.' },
            { q: 'Which review platforms does ReplyVera support?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        finalCtaHeadline: 'Keep Every Location Clean, Responsive, and Trusted',
        finalCtaDescription: 'Let ReplyVera handle routine replies so you can focus on keeping machines running and customers happy.'
    }
];

// ─── Validate configs ─────────────────────────────────────────────────────────
function validateConfig(ind) {
    const required = ['slug','metaTitle','metaDescription','heroHeadline','heroDescription',
        'benefits','step2Text','step3Text','reviewExamples','sensitiveHeadline',
        'sensitiveTopics','faqItems','finalCtaHeadline','finalCtaDescription'];
    const missing = required.filter(k => !ind[k]);
    if (missing.length) {
        console.error(`[${ind.slug || 'unknown'}] Missing fields: ${missing.join(', ')}`);
        return false;
    }
    if (!Array.isArray(ind.benefits) || ind.benefits.length !== 3) {
        console.error(`[${ind.slug}] benefits must be an array of exactly 3 items`);
        return false;
    }
    if (!Array.isArray(ind.reviewExamples) || ind.reviewExamples.length !== 3) {
        console.error(`[${ind.slug}] reviewExamples must be an array of exactly 3 items`);
        return false;
    }
    return true;
}

let allValid = true;
industryPages.forEach(ind => { if (!validateConfig(ind)) allValid = false; });
if (!allValid) { console.error('Validation failed. Fix errors above before building.'); process.exit(1); }

// ─── Build pages ──────────────────────────────────────────────────────────────
industryPages.forEach(ind => {
    const bodyContent = renderIndustryPage(ind);

    let header = baseHeader
        .replace(/<title>[^<]+<\/title>/, `<title>${ind.metaTitle}</title>`)
        .replace(/<meta name="description" content="[^"]+">/, `<meta name="description" content="${ind.metaDescription}">`);

    const fullPage = header + '\n<body>\n' + bodyContent + '\n' + baseFooter;

    const indDir = path.join(__dirname, 'industries', ind.slug);
    if (!fs.existsSync(indDir)) fs.mkdirSync(indDir, { recursive: true });

    fs.writeFileSync(path.join(indDir, 'index.html'), fullPage, 'utf8');
    console.log(`✓ Built: industries/${ind.slug}/index.html`);
});

console.log('\n✓ All 9 industry landing pages built successfully.');
