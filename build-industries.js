const fs = require('fs');
const path = require('path');

// Read the base template index.html
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html not found! Run this script in the replyvera root directory.');
    process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');

const industries = [
    {
        id: 'restaurants',
        title: 'Restaurants',
        heroHeadline: 'Every Restaurant Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'ReplyVera automatically drafts and publishes personalized, flavor-perfect responses to your Google Reviews. Protect your dining reputation and climb the Google Maps local rankings.',
        offerBadge: 'Introductory Offer',
        offerText: 'Restaurant Launch Offer: Get your first month free, then $39 per month.',
        standardNote: 'Standard Autopilot pricing is $39/mo. Your first month is completely free.'
    },
    {
        id: 'dentists',
        title: 'Dentists & Clinics',
        heroHeadline: 'Every Patient Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'ReplyVera writes professional, patient-perfect responses to your medical or dental practice\'s Google reviews. Build trust with prospective patients on autopilot.',
        offerBadge: 'Early-Access Offer',
        offerText: 'Clinic Early Access: Lock in $29 per month for twelve months.',
        standardNote: 'Standard Starter pricing is $29/mo. Save with our early access lock-in rate.'
    },
    {
        id: 'agencies',
        title: 'Marketing Agencies',
        heroHeadline: 'Every Client Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Manage Google reviews across dozens of clients and hundreds of locations. Empower your agency with white-labeled approval flows and automated replies.',
        offerBadge: 'Limited-Time Offer',
        offerText: 'Agency Introductory Offer: 10 client locations included for $149 per month.',
        standardNote: 'Standard Agency pricing is $149/mo. Add more locations at volume discount rates.'
    },
    {
        id: 'martial-arts',
        title: 'Martial-Arts Schools',
        heroHeadline: 'Every Student Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Show prospective families that your academy cares. ReplyVera automatically crafts encouraging, professional replies to all student reviews on Google.',
        offerBadge: 'Early-Access Offer',
        offerText: 'Martial-Arts Early Access: Start for $29 per month for your first year.',
        standardNote: 'Standard Starter pricing is $29/mo. Lock in your school\'s special early access rate.'
    },
    {
        id: 'childcare',
        title: 'Childcare & Preschool Centers',
        heroHeadline: 'Every Parent Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Show families your dedication. ReplyVera automatically writes warm, empathetic Google review responses for your daycare, preschool, or childcare center.',
        offerBadge: 'Founding Customer Offer',
        offerText: 'Childcare Founding Plan: Lock in $29 per month for twelve months.',
        standardNote: 'Standard Starter pricing is $29/mo. Benefit from our founding customer discount.'
    },
    {
        id: 'tutoring',
        title: 'Tutoring & Learning Centers',
        heroHeadline: 'Every Parent & Student Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Highlight your academic results. ReplyVera writes structured, professional responses to your learning center\'s Google Reviews, driving new enrollments.',
        offerBadge: 'Early-Access Offer',
        offerText: 'Tutoring Early Access: Lock in $29 per month for twelve months.',
        standardNote: 'Standard Starter pricing is $29/mo. Lock in this rate for your learning center.'
    },
    {
        id: 'pet-care',
        title: 'Pet Care & Grooming',
        heroHeadline: 'Every Pet Owner Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Reassure pet owners they are in good hands. ReplyVera drafts caring, personalized responses to Google reviews for boarding facilities, vets, and groomers.',
        offerBadge: 'Founding Customer Offer',
        offerText: 'Pet-Care Founding Plan: Lock in $29 per month for twelve months.',
        standardNote: 'Standard Starter pricing is $29/mo. Lock in our lowest founding customer rate.'
    },
    {
        id: 'car-wash',
        title: 'Car-Wash Operators',
        heroHeadline: 'Every Driver Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Drive more local traffic to your express or detail wash. ReplyVera posts quick, friendly responses to your Google reviews, boosting your search relevance.',
        offerBadge: 'Early-Access Offer',
        offerText: 'Car-Wash Early Access: Lock in $29 per month for twelve months.',
        standardNote: 'Standard Starter pricing is $29/mo. Lock in this operator-exclusive rate.'
    },
    {
        id: 'laundromats',
        title: 'Laundromats',
        heroHeadline: 'Every Laundry Review.<br />Answered <span class="text-gradient">Automatically</span>.',
        heroSub: 'Put your laundromat\'s local reputation on autopilot. ReplyVera drafts neat, speedy responses to your wash & fold and self-service Google reviews.',
        offerBadge: 'Introductory Offer',
        offerText: 'Laundromat Multi-Location Offer: Manage two locations for $49 per month during early access.',
        standardNote: 'Standard Starter is $29/mo per location. Early access lets you manage two locations for $49/mo.'
    }
];

industries.forEach((ind) => {
    let content = template;

    // 1. Replace title, meta description, and hero texts
    content = content.replace(
        /<title>[^<]+<\/title>/,
        `<title>ReplyVera for ${ind.title} – AI Google Review Reply Autopilot</title>`
    );
    content = content.replace(
        /<meta name="description" content="[^"]+">/,
        `<meta name="description" content="AI Google review reply autopilot tailored for ${ind.title}. Save time and improve your storefront local rankings.">`
    );
    content = content.replace(
        /<div class="hero-badge">([\s\S]*?)<\/div>/,
        `<div class="hero-badge"><i data-lucide="sparkles" style="width:12px; height:12px;"></i> Built for ${ind.title}</div>`
    );
    content = content.replace(
        /<h1 class="hero-headline">([\s\S]*?)<\/h1>/,
        `<h1 class="hero-headline">${ind.heroHeadline}</h1>`
    );
    content = content.replace(
        /<p class="hero-sub">([\s\S]*?)<\/p>/,
        `<p class="hero-sub">${ind.heroSub}</p>`
    );

    // 2. Inject introductory offer details into the Pricing section
    const originalPricingTarget = `<div style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary-light); font-weight: 700; margin-bottom: 8px;">Flat-Rate Autopilot</div>`;
    const replacementPricing = `
                <div style="background: rgba(16, 185, 129, 0.12); border: 1px solid var(--accent); border-radius: 20px; padding: 6px 16px; margin-bottom: 20px; color: var(--accent); font-weight: 700; font-size: 0.85rem; text-align: center; display: inline-block;">
                    <i data-lucide="gift" style="width:12px; height:12px; vertical-align: middle; margin-right:4px;"></i> ${ind.offerBadge}
                </div>
                <div style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary-light); font-weight: 700; margin-bottom: 8px;">${ind.title} Launch Rate</div>
    `;
    content = content.replace(originalPricingTarget, replacementPricing);

    // 3. Customize pricing cards subtext on standard pricing
    const originalPriceCallout = `<p style="font-size: 1.05rem; color: var(--text-primary-current); margin-bottom: 32px; font-weight: 500;">Plans start at $29 per month. Fully customized review responses.</p>`;
    const replacementPriceCallout = `<p style="font-size: 1.05rem; color: var(--text-primary-current); margin-bottom: 8px; font-weight: 700;">${ind.offerText}</p>
                <p style="font-size: 0.88rem; color: var(--text-secondary-current); margin-bottom: 32px;">${ind.standardNote}</p>`;
    content = content.replace(originalPriceCallout, replacementPriceCallout);

    // 4. Resolve relative asset links (if they go down a directory)
    content = content.replace(/href="style\.css"/g, 'href="../style.css"');
    content = content.replace(/src="script\.js"/g, 'src="../script.js"');
    content = content.replace(/href="index\.html/g, 'href="../index.html');
    content = content.replace(/href="pricing\.html/g, 'href="../pricing.html');
    content = content.replace(/href="terms\.html"/g, 'href="../terms.html"');
    content = content.replace(/href="privacy\.html"/g, 'href="../privacy.html"');
    content = content.replace(/href="cookie\.html"/g, 'href="../cookie.html"');
    content = content.replace(/href="restaurants"/g, 'href="../restaurants"');
    content = content.replace(/href="dentists"/g, 'href="../dentists"');
    content = content.replace(/href="agencies"/g, 'href="../agencies"');
    content = content.replace(/href="martial-arts"/g, 'href="../martial-arts"');
    content = content.replace(/href="childcare"/g, 'href="../childcare"');
    content = content.replace(/href="tutoring"/g, 'href="../tutoring"');
    content = content.replace(/href="pet-care"/g, 'href="../pet-care"');
    content = content.replace(/href="car-wash"/g, 'href="../car-wash"');
    content = content.replace(/href="laundromats"/g, 'href="../laundromats"');

    // Create the target folder if it doesn't exist
    const dir = path.join(__dirname, ind.id);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    // Write the output file
    const targetFile = path.join(dir, 'index.html');
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log(`Generated page for ${ind.title} at ${targetFile}`);
});
console.log('All industry pages built successfully!');
