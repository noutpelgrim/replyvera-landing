const fs = require('fs');
const path = require('path');

// Ensure index.html template exists
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html template not found!');
    process.exit(1);
}

const html = fs.readFileSync(templatePath, 'utf8');

// Extract nav header (up to </nav>)
const navSplit = html.split('</nav>');
if (navSplit.length < 2) {
    console.error('Navbar closing tag </nav> not found in index.html');
    process.exit(1);
}
const rawHeader = navSplit[0] + '</nav>';
const restPart = navSplit[1];

// Extract footer layout (starting from <!-- Footer -->)
const footerSplit = restPart.split('<!-- Footer -->');
if (footerSplit.length < 2) {
    console.error('Footer comment <!-- Footer --> not found in index.html');
    process.exit(1);
}
const rawFooter = '<!-- Footer -->' + footerSplit[1];

// Reformat headers and footers to use absolute root-relative paths
let baseHeader = rawHeader;
baseHeader = baseHeader.replace(/href="index\.html"/g, 'href="/index.html"');
baseHeader = baseHeader.replace(/href="pricing\.html"/g, 'href="/pricing.html"');
baseHeader = baseHeader.replace(/href="industries\/restaurants"/g, 'href="/industries/restaurants"');
baseHeader = baseHeader.replace(/href="industries\/dentists"/g, 'href="/industries/dentists"');
baseHeader = baseHeader.replace(/href="industries\/agencies"/g, 'href="/industries/agencies"');
baseHeader = baseHeader.replace(/href="industries\/martial-arts"/g, 'href="/industries/martial-arts"');
baseHeader = baseHeader.replace(/href="industries\/childcare"/g, 'href="/industries/childcare"');
baseHeader = baseHeader.replace(/href="industries\/tutoring"/g, 'href="/industries/tutoring"');
baseHeader = baseHeader.replace(/href="industries\/pet-care"/g, 'href="/industries/pet-care"');
baseHeader = baseHeader.replace(/href="industries\/car-washes"/g, 'href="/industries/car-washes"');
baseHeader = baseHeader.replace(/href="industries\/laundromats"/g, 'href="/industries/laundromats"');
baseHeader = baseHeader.replace(/href="style\.css"/g, 'href="/style.css"');
baseHeader = baseHeader.replace(/href="#features"/g, 'href="/index.html#features"');
baseHeader = baseHeader.replace(/href="#how-it-works"/g, 'href="/index.html#how-it-works"');
baseHeader = baseHeader.replace(/href="https:\/\/replyvera-dashboard\.vercel\.app\/login"/g, 'href="https://replyvera-dashboard.vercel.app/login"');

let baseFooter = rawFooter;
baseFooter = baseFooter.replace(/href="index\.html/g, 'href="/index.html');
baseFooter = baseFooter.replace(/href="pricing\.html/g, 'href="/pricing.html');
baseFooter = baseFooter.replace(/href="terms\.html"/g, 'href="/terms.html"');
baseFooter = baseFooter.replace(/href="privacy\.html"/g, 'href="/privacy.html"');
baseFooter = baseFooter.replace(/href="cookie\.html"/g, 'href="/cookie.html"');
baseFooter = baseFooter.replace(/src="script\.js"/g, 'src="/script.js"');

const industryPages = [
    {
        slug: 'restaurants',
        metaTitle: 'AI Google Review Replies for Restaurants | ReplyVera',
        metaDescription: 'Automatically respond to restaurant Google reviews, recognize employees, and escalate allergy, food-safety, and serious service concerns.',
        navigationLabel: 'Restaurants',
        navigationDescription: 'Handle routine reviews and escalate food-safety concerns.',
        heroEyebrow: 'Google Review Automation for Restaurants',
        heroHeadline: 'Every Restaurant Review Answered Automatically',
        heroDescription: 'ReplyVera writes personalized Google review responses, recognizes standout employees, and sends food-safety, allergy, and serious service complaints to your team before anything is published.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Independent restaurants', 'Restaurant groups', 'Cafés', 'Bars', 'Fast-casual brands', 'Franchises'],
        problemHeadline: 'Your Managers Should Run the Restaurant, Not Write Every Review Reply',
        problems: [
            { icon: 'clock', title: 'Positive reviews go unanswered', text: 'Floor managers are too busy running shifts to reply to happy diners, missing opportunities to build repeat business.' },
            { icon: 'copy', title: 'Responses sound repetitive', text: 'Copying and pasting the same generic response looks lazy to new customers looking up your restaurant online.' },
            { icon: 'alert-triangle', title: 'Wait-time complaints remain unresolved', text: 'Queues, slow service, and billing misunderstandings sit on your profile without professional context.' },
            { icon: 'shield-alert', title: 'Food-safety issues require careful handling', text: 'Allergy or food poisoning claims require direct manager intervention to protect your brand and resolve concerns.' },
            { icon: 'award', title: 'Employee praise gets missed', text: 'Standout service feedback from servers, hosts, and bartenders is rarely logged to reward top performers.' },
            { icon: 'map', title: 'Locations respond inconsistently', text: 'Multi-location groups struggle to keep a consistent brand tone across different storefronts.' }
        ],
        step2Text: 'ReplyVera identifies guest sentiment, food and service topics, employee mentions, location, and potential food-safety risks.',
        step3Text: 'Publish routine replies automatically after your configurable delay, while food safety and serious service complaints are held for manager approval.',
        featureHeadline: 'Smarter Reputation Management Designed for the Hospitality Floor',
        features: [
            { name: 'Food Quality Detection', text: 'Identify praise or complaints involving meals, ingredients, temperature, presentation, and consistency.', verdictType: 'positive' },
            { name: 'Wait-Time Monitoring', text: 'Detect complaints involving queues, slow service, delayed food, or long waits.', verdictType: 'complaint' },
            { name: 'Employee Recognition', text: 'Recognize servers, hosts, bartenders, chefs, and managers mentioned by name.', verdictType: 'positive' },
            { name: 'Food-Safety Escalation', text: 'Require approval for allergy, contamination, illness, or food-safety concerns.', verdictType: 'sensitive' },
            { name: 'Service-Type Detection', text: 'Distinguish dine-in, takeout, delivery, reservations, and catering feedback.', verdictType: 'positive' },
            { name: 'Location Insights', text: 'Compare service, cleanliness, food, and employee trends across locations.', verdictType: 'positive' }
        ],
        employeeRoles: ['Server', 'Host', 'Bartender', 'Chef', 'Shift manager', 'General manager'],
        sensitiveTopics: ['Food allergies', 'Food poisoning', 'Contamination', 'Discrimination', 'Injuries', 'Payment disputes', 'Threats', 'Serious cleanliness allegations'],
        reviewExamples: [
            {
                reviewer: 'Sarah Jenkins',
                rating: 5,
                text: 'Maria made our anniversary dinner wonderful, and the pasta was excellent.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for celebrating your anniversary with us. We’re delighted that Maria helped make the evening special and that you enjoyed the pasta. We’ll be sure to share your kind words with her.'
            },
            {
                reviewer: 'David Vance',
                rating: 3,
                text: 'The food was good, but we waited almost an hour.',
                label: 'Manager Approval Recommended',
                reply: 'Thank you for your honest feedback. We’re glad you enjoyed the food, but we’re sorry your wait was much longer than it should have been. We’re sharing this with our team so we can improve the experience during busy periods.'
            },
            {
                reviewer: 'Claire Montgomery',
                rating: 1,
                text: 'I clearly explained my allergy, but the dish still contained the ingredient.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Food-safety concern detected',
                alertText: 'Immediate manager approval required. Auto-publishing blocked.'
            }
        ],
        insightExamples: [
            'Wait-time complaints increased this month',
            'Maria received nine positive mentions',
            'Cleanliness concerns are concentrated at one location',
            'Weekend service complaints peak between 7:00 and 9:00 p.m.',
            'The truffle pasta is the most praised menu item'
        ],
        insightsHeadline: 'Turn Guest Feedback Into Dining Experience Upgrades',
        sensitiveReviewHeadline: 'Escalate Food Safety and Serious Cleanliness Reviews',
        employeeRecognitionHeadline: 'Celebrate the Floor Staff Guest Reviews Praise',
        multiLocationHeadline: 'Unify Brand Tone Across Every Bistro and Location',
        multiLocationCopy: 'Whether you manage a single neighborhood bistro or a growing regional hospitality group, ReplyVera scale settings let general managers oversee location-level approvals while preserving a unified brand voice.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding customers receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Can ReplyVera manage multiple restaurant locations?', a: 'Yes. Our multi-location controls allow you to manage separate Google Business Profiles from one central dashboard, with unique configurations for each branch.' },
            { q: 'Can food-safety reviews be blocked from auto-publishing?', a: 'Absolutely. ReplyVera identifies words related to allergies, illness, or cleanliness, blocking auto-replies immediately and routing them to a manager approval inbox.' },
            { q: 'Can ReplyVera recognize employees?', a: 'Yes. It scans reviews for names and cross-references them with your staff roster, logging top mentions to help reward team performance.' },
            { q: 'Can it respond in Spanish?', a: 'Yes. ReplyVera automatically detects the language of the review and drafts responses in both natural English and Spanish.' },
            { q: 'Does ReplyVera support Yelp or OpenTable?', a: 'Currently supported: Google Reviews. Support for Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases. Yelp and OpenTable are not supported.' }
        ],
        relatedIndustries: [
            { id: 'agencies', title: 'Marketing Agencies' },
            { id: 'pet-care', title: 'Pet Care' },
            { id: 'car-washes', title: 'Car Wash Operators' }
        ],
        finalCtaHeadline: 'Stop Letting Restaurant Reviews Go Unanswered',
        finalCtaDescription: 'Automate your Google reviews, recognize standout staff, and protect food safety ratings with zero administrative friction.',
        mockupLocationName: 'Harbor Table Downtown'
    },
    {
        slug: 'dentists',
        metaTitle: 'Privacy-Conscious Google Review Replies for Dentists | ReplyVera',
        metaDescription: 'Respond professionally to dental Google reviews while keeping clinical, billing, and sensitive patient concerns under human control.',
        navigationLabel: 'Dentists & Clinics',
        navigationDescription: 'Privacy-conscious replies for patient reviews.',
        heroEyebrow: 'Google Review Automation for Dental Practices',
        heroHeadline: 'Professional Review Responses for Every Patient Experience',
        heroDescription: 'ReplyVera creates privacy-conscious Google review responses for your practice while sending clinical, billing, and sensitive patient concerns to your team for approval.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Independent dental practices', 'Dental groups', 'Orthodontists', 'Pediatric dentists', 'Cosmetic dental practices', 'Medical clinics'],
        problemHeadline: 'Professional Online Reputation Management Without Patient Privacy Violations',
        problems: [
            { icon: 'shield', title: 'Staff may accidentally confirm private information', text: 'Verifying a reviewer\'s active patient status or referencing their dental details online can lead to serious privacy concerns.' },
            { icon: 'alert-triangle', title: 'Clinical complaints require careful wording', text: 'Negative reviews regarding dental procedures or treatment outcomes must be handled manually with specialized phrasing.' },
            { icon: 'credit-card', title: 'Billing and insurance disputes can escalate', text: 'Financial disagreements need private offline follow-ups rather than public, emotional back-and-forth replies.' },
            { icon: 'award', title: 'Positive staff mentions go unnoticed', text: 'Outstanding reviews praising hygienists, assistants, or receptionists are rarely tracked to reward performance.' },
            { icon: 'clock', title: 'Owners lack time to respond consistently', text: 'Practicing dentists spend their days in operatory chairs, leaving little time to write personalized responses.' },
            { icon: 'map', title: 'Multiple practices use inconsistent language', text: 'Multi-practice groups struggle to enforce a unified, professional tone across all clinical locations.' }
        ],
        step2Text: 'ReplyVera identifies review sentiment, staff mentions, billing topics, location, and potential privacy or clinical concerns.',
        step3Text: 'Routine positive reviews go live after your configured delay, while clinical, billing, and privacy-sensitive reviews require office approval.',
        featureHeadline: 'Privacy-Conscious Features Built Specifically for Medical Professionals',
        features: [
            { name: 'Privacy-Conscious Responses', text: 'Avoid confirming patient status or discussing private treatment details.', verdictType: 'positive' },
            { name: 'Clinical Complaint Detection', text: 'Flag pain, injury, medication, diagnosis, procedure, and treatment-outcome concerns.', verdictType: 'sensitive' },
            { name: 'Billing and Insurance Escalation', text: 'Route unexpected charges, insurance complaints, and payment disputes for approval.', verdictType: 'sensitive' },
            { name: 'Staff Recognition', text: 'Recognize dentists, hygienists, assistants, and front-desk staff.', verdictType: 'positive' },
            { name: 'Safe Positive Automation', text: 'Automatically answer low-risk positive reviews.', verdictType: 'positive' },
            { name: 'Practice-Level Controls', text: 'Set approval rules and tone by location.', verdictType: 'positive' }
        ],
        employeeRoles: ['Dentist', 'Hygienist', 'Dental assistant', 'Orthodontist', 'Office manager', 'Front-desk coordinator'],
        sensitiveTopics: ['Pain', 'Injury', 'Treatment outcomes', 'Medication', 'Diagnosis', 'Insurance', 'Billing disputes', 'Privacy complaints', 'Discrimination'],
        reviewExamples: [
            {
                reviewer: 'Robert Lee',
                rating: 5,
                text: 'Everyone was kind, and Jessica made me feel comfortable throughout the visit.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for your kind feedback. We’re pleased to hear that Jessica and the team helped create a comfortable and welcoming experience. We’ll be sure to share your appreciation with them.'
            },
            {
                reviewer: 'Samantha Brooks',
                rating: 2,
                text: 'I received a bill I was not expecting.',
                label: 'Office Approval Required',
                reply: 'Thank you for sharing your concern. We understand how frustrating an unexpected charge can be. Please contact our office directly so the appropriate team member can review the details with you.'
            },
            {
                reviewer: 'Marcus Vance',
                rating: 1,
                text: 'I had severe pain after the procedure, and no one returned my call.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Clinical concern detected',
                alertText: 'Manual review required before publishing. Auto-reply blocked.'
            }
        ],
        insightExamples: [
            'Front-desk communication received repeated praise',
            'Billing concerns increased this month',
            'Jessica received seven positive mentions',
            'One location has multiple wait-time complaints',
            'Two clinical reviews require follow-up'
        ],
        insightsHeadline: 'Monitor Patient Sentiment and Treatment Feedback',
        sensitiveReviewHeadline: 'Escalate Clinical Pain and HIPAA Privacy Concerns',
        employeeRecognitionHeadline: 'Track Hygienist and Office Staff Patient Appreciation',
        multiLocationHeadline: 'Maintain Clinical Consistency Across Dental Locations',
        multiLocationCopy: 'Manage reputation and review logs across multiple dental clinics. Set location-level access permissions so office managers can review drafts while corporate compliance tracks overall sentiment.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding clinics receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Does ReplyVera reveal patient information?', a: 'No. ReplyVera is programmed to draft privacy-conscious responses that never confirm active patient status or discuss clinical treatments.' },
            { q: 'Can clinical complaints be excluded from auto-publishing?', a: 'Yes. Any review mentioning pain, procedures, side effects, or clinical outcomes is flagged and held for manual review by your dental team.' },
            { q: 'Can multiple practice locations be managed?', a: 'Yes. You can link all clinic Business Profiles to one central account and manage permission levels for office staff.' },
            { q: 'Can staff members approve replies?', a: 'Yes. Roster dentists, coordinators, or clinic leads can log in and approve drafts with one click.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        relatedIndustries: [
            { id: 'agencies', title: 'Marketing Agencies' },
            { id: 'childcare', title: 'Childcare & Preschool' }
        ],
        finalCtaHeadline: 'Respond Professionally Without Risking Patient Privacy',
        finalCtaDescription: 'Automate safe patient review replies, log clinic hygiene praise, and route complex billing reviews to your staff.',
        mockupLocationName: 'Brightline Dental'
    },
    {
        slug: 'agencies',
        metaTitle: 'Google Review Automation for Marketing Agencies | ReplyVera',
        metaDescription: 'Manage client Google review replies from one dashboard with separate brand voices, approval rules, and client workflows.',
        navigationLabel: 'Marketing Agencies',
        navigationDescription: 'Manage Google review replies for every client.',
        heroEyebrow: 'Google Review Automation for Agencies',
        heroHeadline: 'Manage Every Client’s Google Review Replies From One Dashboard',
        heroDescription: 'ReplyVera helps agencies automate Google review responses, preserve every client’s brand voice, and route sensitive reviews for approval.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $149 per Month',
        businessTypes: ['Local marketing agencies', 'SEO agencies', 'Social-media agencies', 'Reputation-management consultants', 'Web-design agencies', 'Franchise marketing teams'],
        problemHeadline: 'Scale Local SEO & Reputation Work Without Swelling Client Management Costs',
        problems: [
            { icon: 'log-out', title: 'Teams switch manually between accounts', text: 'Wasting account manager hours logging in and out of different client Google Business Profile accounts.' },
            { icon: 'clock', title: 'Review responses consume staff time', text: 'Drafting standard responses for hundreds of 5-star reviews drains productive time from higher-value SEO campaigns.' },
            { icon: 'message-square', title: 'Every client needs a different tone', text: 'Maintaining a professional medical voice for one client and a playful restaurant voice for another is error-prone.' },
            { icon: 'mail', title: 'Approvals are slow', text: 'Chasing clients to review response drafts for negative feedback delays resolutions and hurts SEO rankings.' },
            { icon: 'bar-chart', title: 'Reporting is fragmented', text: 'Consolidating review data, response rates, and customer sentiment into reports is manual and tedious.' },
            { icon: 'dollar-sign', title: 'Agencies need room for healthy margins', text: 'SaaS licensing models can eat into retainer margins if pricing models don\'t scale cost-effectively.' }
        ],
        step2Text: 'ReplyVera identifies the client, brand voice, review topic, risk level, and approval workflow.',
        step3Text: 'Deploy client autopilot modes to auto-publish routine replies, while client approval links let business owners review sensitive drafts.',
        features: [
            { name: 'Central Client Dashboard', text: 'Manage multiple businesses and locations from one account.', verdictType: 'positive' },
            { name: 'Client-Specific Brand Voice', text: 'Give every client separate tone, rules, and business context.', verdictType: 'positive' },
            { name: 'Approval Links', text: 'Allow clients to approve sensitive responses without full dashboard access.', verdictType: 'positive' },
            { name: 'Team Permissions', text: 'Assign staff to specific clients or locations.', verdictType: 'positive' },
            { name: 'Automated Safe Replies', text: 'Auto-publish routine responses according to each client’s rules.', verdictType: 'positive' },
            { name: 'Agency Reporting', text: 'Show review volume, response status, and approval activity by client. (White-label reporting planned)', verdictType: 'positive' }
        ],
        employeeRoles: ['Account director', 'SEO specialist', 'Social manager', 'Copywriter', 'Agency partner', 'Support coordinator'],
        sensitiveTopics: ['Negative feedback', 'Billing issues', 'Clinical errors', 'Safety complaints', 'Equipment problems', 'Staff complaints'],
        reviewExamples: [
            {
                reviewer: 'Client: Harbor Table (Restaurant)',
                rating: 5,
                text: 'The food was excellent and the server Maria was super helpful.',
                label: 'Auto-Published (Tone: Friendly)',
                reply: 'Thank you for celebrating with us. We’re delighted that Maria helped make the evening special and that you enjoyed the meals. We\'ll share this with her!'
            },
            {
                reviewer: 'Client: Brightline Dental (Clinic)',
                rating: 2,
                text: 'Billing was confusing, I got charged twice.',
                label: 'Sent to Client Manager (Tone: Professional)',
                reply: 'Thank you for sharing your concern. We understand unexpected charges can be frustrating. Please contact our office manager directly so we can look into the billing details.'
            },
            {
                reviewer: 'Client: Happy Trails (Pet resort)',
                rating: 1,
                text: 'My dog came home with a scratch on his paw.',
                label: 'Sensitive Review - Auto-Draft Blocked',
                alertTitle: 'Animal-safety concern detected',
                alertText: 'Auto-publishing blocked. Emailed immediate alert notification to client owner.'
            }
        ],
        insightExamples: [
            '24 client locations connected across dashboard',
            'Five reviews currently need client approval',
            'Three clients have unanswered negative reviews',
            'Average client response rate is 98.4%',
            'Client satisfaction scores average 4.8★'
        ],
        featureHeadline: 'Review Automation Architected for Digital Agency Retainers',
        insightsHeadline: 'Report Location-Level Review Volume and Rating Growth',
        sensitiveReviewHeadline: 'Escalate Serious Disputes to Your Client Approval Link',
        employeeRecognitionHeadline: 'Track Account Executive and Specialist Mention Metrics',
        multiLocationHeadline: 'Manage Unlimited Client Portfolios and Brands Globally',
        multiLocationCopy: 'Our Multi-Client dashboard is architected specifically for agencies managing portfolios of local brands. Give account managers selective permissions to supervise assigned clients without accessing other partner data.',
        pricingOffer: { label: 'Founding agency package', text: 'Introductory pricing of $149 per month applies for the first 12 months. Standard Agency pricing is $179 per month after the promotional period.' },
        faqItems: [
            { q: 'Can every client have a different brand voice?', a: 'Yes. You configure independent tone settings, triggers, and approval workflows for every Google Business Profile profile connected.' },
            { q: 'Can clients approve responses without accessing the full dashboard?', a: 'Yes. ReplyVera generates secure client approval links where business owners can approve, edit, or reject drafts from their phones.' },
            { q: 'Can team members manage assigned clients?', a: 'Yes. Set specific user access permissions to assign account managers only to the client profiles they handle.' },
            { q: 'Can the agency resell ReplyVera?', a: 'Absolutely. You can package ReplyVera\'s review automation tools as part of your reputation retainer or resell seat licenses with your own markup.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Support for Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future agency packages.' }
        ],
        relatedIndustries: [
            { id: 'restaurants', title: 'Restaurants' },
            { id: 'dentists', title: 'Dentists & Clinics' },
            { id: 'pet-care', title: 'Pet Care' }
        ],
        finalCtaHeadline: 'Turn Review Management Into a Scalable Agency Service',
        finalCtaDescription: 'Automate positive drafts, send client approval notifications, and scale your reputation management services with healthy margins.',
        mockupLocationName: 'Multi-client agency dashboard'
    },
    {
        slug: 'martial-arts',
        metaTitle: 'Google Review Replies for Martial Arts Schools | ReplyVera',
        metaDescription: 'Automatically respond to martial arts Google reviews, recognize instructors, and escalate safety, injury, and membership complaints.',
        navigationLabel: 'Martial Arts Schools',
        navigationDescription: 'Parent-friendly replies with safety escalation.',
        heroEyebrow: 'Google Review Automation for Martial Arts Schools',
        heroHeadline: 'Every Martial Arts Review Answered Automatically',
        heroDescription: 'ReplyVera responds to routine parent and student reviews, recognizes outstanding instructors, and keeps safety, injury, bullying, and membership disputes under your control.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Karate dojos', 'Taekwondo schools', 'BJJ academies', 'Kickboxing gyms', 'MMA training centers', 'Multi-location franchise schools'],
        problemHeadline: 'Spend More Time on the Mat and Less Time at the Keyboard',
        problems: [
            { icon: 'swords', title: 'Owners busy teaching classes', text: 'Instructors spend their afternoons and evenings on the mat, leaving zero admin time to reply to reviews.' },
            { icon: 'smile', title: 'Parents expect encouraging replies', text: 'Parents look for thoughtful, community-focused responses when their children are enrolled.' },
            { icon: 'award', title: 'Instructor praise goes unrecognized', text: 'Praise for specific coaches or Senseis is buried, missing opportunities to celebrate top team performance.' },
            { icon: 'dollar-sign', title: 'Membership disputes can become public', text: 'Cancellation terms or billing conflicts can lead to negative reviews on your profile.' },
            { icon: 'shield-alert', title: 'Child-safety concerns need immediate attention', text: 'Injury, bullying, or safety allegations require immediate owner reviews before any public response goes live.' },
            { icon: 'map', title: 'Multiple academies respond inconsistently', text: 'Multi-school operators struggle to keep a consistent brand voice across regional dojos.' }
        ],
        step2Text: 'ReplyVera identifies parent or student sentiment, instructor mentions, membership topics, and potential safety concerns.',
        step3Text: 'Routine positive parent feedback is published automatically after a delay, while membership and safety reviews are held for your approval.',
        features: [
            { name: 'Instructor Recognition', text: 'Scans customer reviews for coach or Sensei names, tagging positive employee mentions.', verdictType: 'positive' },
            { name: 'Parent-Friendly Tone', text: 'Generates warm, community-oriented responses highlighting confidence, respect, and discipline.', verdictType: 'positive' },
            { name: 'Membership Cancellation Detection', text: 'Identifies keywords related to cancellations, billing, or contracts, sending them for owner approval.', verdictType: 'sensitive' },
            { name: 'Injury Escalation', text: 'Routes reviews mentioning injuries, accidents, or safety concerns directly to a secure draft box.', verdictType: 'sensitive' },
            { name: 'Bullying & Discrimination Detection', text: 'Locks reviews containing safety allegations, preventing auto-responses.', verdictType: 'sensitive' },
            { name: 'Multi-School Dashboard', text: 'Monitor ratings, response times, and reviews across all dojo profiles in one panel.', verdictType: 'positive' }
        ],
        employeeRoles: ['Instructor', 'Coach', 'Sensei', 'School owner', 'Program director', 'Front-desk team member'],
        sensitiveTopics: ['Injuries', 'Child safety', 'Bullying', 'Discrimination', 'Staff conduct', 'Membership disputes', 'Cancellation issues'],
        reviewExamples: [
            {
                reviewer: 'Jennifer Miller',
                rating: 5,
                text: 'My daughter has gained so much confidence. Coach Daniel is wonderful.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing this. We’re thrilled to hear that your daughter is becoming more confident and that Coach Daniel has made such a positive impact. We’ll be sure to share your kind words with him.'
            },
            {
                reviewer: 'Tom Harrison',
                rating: 2,
                text: 'They made it extremely difficult to cancel.',
                label: 'Owner Approval Required',
                reply: 'Thank you for your feedback. We aim to make membership management clear. Please contact our program director directly so we can review your account cancellation details.'
            },
            {
                reviewer: 'Amanda Sterling',
                rating: 1,
                text: 'My child was injured, and no one contacted me.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Child-safety concern detected',
                alertText: 'Immediate escalation required. Review locked in drafts.'
            }
        ],
        insightExamples: [
            'Coach Daniel received eight positive mentions',
            'Membership complaints increased',
            'Parents frequently mention confidence and discipline',
            'One location has recurring cleanliness concerns',
            'Two safety reviews need attention'
        ],
        featureHeadline: 'Review Automation Built for Dojo Growth',
        insightsHeadline: 'Monitor Parent Satisfaction and Confidence Praise',
        sensitiveReviewHeadline: 'Escalate Injury, Bullying, or Child Safety Concerns',
        employeeRecognitionHeadline: 'Highlight the Instructors Parent Reviews Praise',
        multiLocationHeadline: 'Keep Review Operations Consistent Across Academy Branches',
        multiLocationCopy: 'Manage reputation and review metrics across multiple academy branches. Set location-level access rules so managers can respond while school owners track overall student satisfaction.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding schools receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Can ReplyVera manage multiple martial arts locations?', a: 'Yes. Connect multiple Google Business Profile locations and monitor ratings from one central screen.' },
            { q: 'Can safety reviews be blocked from auto-publishing?', a: 'Yes. Any review mentioning injuries, bullying, or child safety is immediately held in drafts, blocking auto-replies.' },
            { q: 'Can ReplyVera recognize employees?', a: 'Yes. The system tags mentions of specific Senseis or coaches to track staff performance.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. It automatically translates and replies to parents in their written language (English or Spanish).' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future dojo rollouts.' }
        ],
        relatedIndustries: [
            { id: 'childcare', title: 'Childcare & Preschool' },
            { id: 'tutoring', title: 'Tutoring Centers' }
        ],
        finalCtaHeadline: 'Spend More Time Teaching and Less Time Writing Replies',
        finalCtaDescription: 'Keep parent trust high and automate positive review responses while holding sensitive safety concerns.',
        mockupLocationName: 'Summit Martial Arts'
    },
    {
        slug: 'childcare',
        metaTitle: 'Google Review Management for Childcare Centers | ReplyVera',
        metaDescription: 'Safely automate routine childcare Google review responses while escalating supervision, injury, allergy, and privacy concerns.',
        navigationLabel: 'Childcare & Preschool',
        navigationDescription: 'Safety-aware responses for parent reviews.',
        heroEyebrow: 'Google Review Automation for Childcare Centers',
        heroHeadline: 'Every Childcare Review Answered With Care',
        heroDescription: 'ReplyVera safely handles routine parent reviews, recognizes great teachers, and immediately escalates concerns involving supervision, injuries, allergies, staff conduct, or child privacy.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Daycares', 'Preschools', 'Early learning centers', 'Montessori schools', 'Childcare franchises', 'Before-and-after school programs'],
        problemHeadline: 'Parent Reviews Require More Than a Generic Response',
        problems: [
            { icon: 'baby', title: 'Busy daycare directors', text: 'Directors spend their days managing children, teacher ratios, and licensing compliance, with zero time for computer tasks.' },
            { icon: 'heart', title: 'Parent trust is critical', text: 'Early education centers require warm, reassuring, and highly professional responses to maintain parent confidence.' },
            { icon: 'award', title: 'Teacher praise goes unrecognized', text: 'Excellent parent feedback praising teachers (like Ms. Ana) is rarely compiled to support staff retention.' },
            { icon: 'lock', title: 'Child privacy rules', text: 'Replying to parents requires extreme care to avoid confirming minor enrollments, schedules, or classroom names.' },
            { icon: 'shield-alert', title: 'Safety concerns require immediate manager attention', text: 'Reviews alleging injuries, child safety failures, or allergies must never be answered automatically.' },
            { icon: 'trending-up', title: 'Staff turnover feedback', text: 'Negative parent comments regarding staff changes can quickly impact school enrollment rates.' }
        ],
        step2Text: 'ReplyVera identifies parent sentiment, teacher mentions, communication topics, and potential safety or privacy concerns.',
        step3Text: 'Routine positive reviews can be published automatically, while supervision, injury, allergy, and privacy concerns trigger immediate alerts.',
        featureHeadline: 'Safety-Aware Review Automation for Childcare Centers',
        features: [
            { name: 'Teacher Recognition', text: 'Scans parent reviews for educator names, tracking top performance mentions.', verdictType: 'positive' },
            { name: 'Privacy-Conscious Responses', text: 'Ensures responses thank the parents politely without confirming children\'s class schedules or private details.', verdictType: 'positive' },
            { name: 'Injury and Safety Escalation', text: 'Flags reviews containing words like hurt, fall, or accident, routing them to director drafts.', verdictType: 'sensitive' },
            { name: 'Allergy and Medication Detection', text: 'Locks reviews mentioning food allergies or medication issues, preventing auto-replies.', verdictType: 'sensitive' },
            { name: 'Supervision Concern Detection', text: 'Scans for allegations of children left unattended, locking responses for licensing reviews.', verdictType: 'sensitive' },
            { name: 'Staff-Turnover Trend Tracking', text: 'Identifies public reviews highlighting staff changes to monitor institutional health.', verdictType: 'complaint' }
        ],
        employeeRoles: ['Teacher', 'Center director', 'Classroom assistant', 'Administrator', 'Program coordinator'],
        sensitiveTopics: ['Injury', 'Supervision', 'Allergies', 'Medication', 'Abuse', 'Neglect', 'Staff conduct', 'Licensing', 'Child privacy'],
        reviewExamples: [
            {
                reviewer: 'Ms. Ana Fan',
                rating: 5,
                text: 'Ms. Ana is amazing, and our daughter loves going every morning.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for your kind feedback. We’re so pleased to hear that Ms. Ana has helped create such a positive and welcoming experience. We’ll be sure to share your appreciation with her.'
            },
            {
                reviewer: 'Liam Patterson',
                rating: 3,
                text: 'Communication from the office has been inconsistent.',
                label: 'Director Approval Recommended',
                reply: 'Thank you for sharing your experience. We aim to keep communication clear and consistent. We\'ve shared your note with our team to improve our messaging tools.'
            },
            {
                reviewer: 'Rachel Albright',
                rating: 1,
                text: 'My child was injured, and I was not informed until pickup.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Serious safety concern detected',
                alertText: 'Immediately escalated to the center director. Auto-publishing blocked.'
            }
        ],
        insightExamples: [
            'Communication complaints increased at one center',
            'Ms. Ana received ten positive mentions',
            'Three reviews mention staff turnover',
            'One allergy-related concern requires attention',
            'Cleanliness feedback improved this month'
        ],
        insightsHeadline: 'Understand What Families Are Saying Across Every Center',
        sensitiveReviewHeadline: 'Know When a Director Must Take Over',
        employeeRecognitionHeadline: 'Recognize the Teachers Parents Appreciate',
        multiLocationHeadline: 'Consistent, Careful Responses Across Every Location',
        multiLocationCopy: 'Our Multi-Location dashboard helps franchise operators monitor licensing compliance, response rates, and ratings across childcare centers from one corporate panel.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding schools receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Does ReplyVera reveal child information?', a: 'No. ReplyVera drafts general, professional replies that thank the parents without confirming minor names, schedules, or classroom locations.' },
            { q: 'Can supervision or allergy reviews be blocked from auto-publishing?', a: 'Yes. Any reviews mentioning cuts, falls, unattended play, or dietary issues are immediately flagged, held in drafts, and alert the director.' },
            { q: 'Can multiple center locations be managed?', a: 'Yes. Connect multiple childcare profiles and manage director approve levels across branches.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. It automatically replies to parent feedback in the language it was written.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future childcare releases.' }
        ],
        relatedIndustries: [
            { id: 'tutoring', title: 'Tutoring Centers' },
            { id: 'martial-arts', title: 'Martial Arts Schools' }
        ],
        finalCtaHeadline: 'Protect Your Reputation Without Overloading Center Directors',
        finalCtaDescription: 'Keep childcare parent trust high, automate positive drafts, and secure immediate alerts for supervision concerns.',
        mockupLocationName: 'Little Oaks Learning Center'
    },
    {
        slug: 'tutoring',
        metaTitle: 'Google Review Replies for Tutoring Centers | ReplyVera',
        metaDescription: 'Automatically respond to tutoring Google reviews, recognize instructors, and escalate progress, refund, billing, and student-safety concerns.',
        navigationLabel: 'Tutoring Centers',
        navigationDescription: 'Professional replies for parent and student feedback.',
        heroEyebrow: 'Google Review Automation for Tutoring Centers',
        heroHeadline: 'Turn Every Parent Review Into Trust',
        heroDescription: 'ReplyVera writes personalized Google review responses, recognizes outstanding tutors, and carefully handles concerns involving progress, refunds, billing, or student safety.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Tutoring centers', 'Test prep academies', 'Learning franchises', 'STEM centers', 'Language schools', 'Private educators'],
        problemHeadline: 'Maintain Educational Trust Without Swelling Administrative Hours',
        problems: [
            { icon: 'book', title: 'Directors teaching classes', text: 'Academic directors are busy instructing students or advising parents, leaving no admin time to track reviews.' },
            { icon: 'smile', title: 'Parents look for active reviews', text: 'Families research local learning centers closely online, making responsive and professional replies vital.' },
            { icon: 'award', title: 'Tutor performance goes unlogged', text: 'Review praise celebrating algebra or SAT prep tutors is buried, missing staff reward metrics.' },
            { icon: 'lock', title: 'Minor student privacy', text: 'Responses must protect student identities, avoiding references to grades or academic struggles.' },
            { icon: 'dollar-sign', title: 'Academic guarantee disputes', text: 'Reviews claiming promised grade improvements or score guarantees need careful, non-automated replies.' },
            { icon: 'credit-card', title: 'Billing and tuition disputes', text: 'Tuition disputes or refund demands can quickly escalate if auto-replied with generic copy.' }
        ],
        step2Text: 'ReplyVera identifies parent or student sentiment, tutor mentions, scheduling or billing topics, and potential academic-claim risks.',
        step3Text: 'Routine positive parent feedback goes live after a configurable delay, while academic guarantees and refunds require academic coach approval.',
        featureHeadline: 'Academic-Aware Review Automation for Tutoring Centers',
        features: [
            { name: 'Tutor Recognition', text: 'Extracts mentions of tutoring staff (like Emily) from positive parent feedback.', verdictType: 'positive' },
            { name: 'Academic-Claim Detection', text: 'Locks reviews containing grade score claims or score improvement guarantees for admin drafts.', verdictType: 'sensitive' },
            { name: 'Refund and Billing Escalation', text: 'Routes reviews regarding package billing or tuition refunds directly to the director.', verdictType: 'sensitive' },
            { name: 'Student Privacy Protection', text: 'Ensures responses thank reviewers without disclosing minor student names or course grades.', verdictType: 'positive' },
            { name: 'Parent-Friendly Language', text: 'Generates polite, academically encouraging, and community-focused replies.', verdictType: 'positive' },
            { name: 'Multi-Location Controls', text: 'Oversee metrics, response rates, and ratings across tutoring locations in one panel.', verdictType: 'positive' }
        ],
        employeeRoles: ['Tutor', 'Instructor', 'Center director', 'Academic coach', 'Administrator'],
        sensitiveTopics: ['Student safety', 'Academic guarantees', 'Refunds', 'Billing', 'Discrimination', 'Staff conduct', 'Private student information'],
        reviewExamples: [
            {
                reviewer: 'Jonathan Sterling',
                rating: 5,
                text: 'Emily helped my son understand algebra and become more confident.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing your experience. We’re delighted that Emily helped make algebra more understandable and supported your son’s confidence. We’ll be sure to share your kind words with her.'
            },
            {
                reviewer: 'Claire Winters',
                rating: 2,
                text: 'We did not see the score improvement we expected.',
                label: 'Manager Approval Required',
                reply: 'Thank you for sharing your feedback. We aim to help every student succeed. Please contact our center director directly so we can review your child\'s learning plan and support options.'
            },
            {
                reviewer: 'Michael Brody',
                rating: 1,
                text: 'The center promised a specific test-score increase.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Potential academic guarantee detected',
                alertText: 'Manual review required. Review held in drafts.'
            }
        ],
        insightExamples: [
            'Emily received seven positive mentions',
            'Scheduling complaints increased',
            'Parents frequently praise communication',
            'Refund concerns are concentrated at one location',
            'Test-preparation reviews have the highest satisfaction'
        ],
        insightsHeadline: 'Track Parent Satisfaction and Subject Improvement Praise',
        sensitiveReviewHeadline: 'Escalate Academic Claims and Tuition Refund Concerns',
        employeeRecognitionHeadline: 'Recognize the Tutors and Academic Coaches Parents Love',
        multiLocationHeadline: 'Manage Review Responses Across All Tutoring Centers',
        multiLocationCopy: 'Monitor tutor reviews and parent sentiment across multiple regional learning centers. Set location-level access rules so directors manage local feedback while owners track overall score improvements.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding centers receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Does ReplyVera reveal minor student information?', a: 'No. ReplyVera is programmed to write professional replies that thank parents without confirming student names or academic records.' },
            { q: 'Can academic guarantee complaints be blocked from auto-publishing?', a: 'Yes. Any reviews mentioning promises, score improvements, or refund demands are held in drafts, blocking auto-replies.' },
            { q: 'Can multiple tutoring locations be managed?', a: 'Yes. Connect multiple Google Business Profile accounts and manage separate staff access levels across branches.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. The system reads and replies to parents in their written language (English or Spanish).' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        relatedIndustries: [
            { id: 'childcare', title: 'Childcare & Preschool' },
            { id: 'martial-arts', title: 'Martial Arts Schools' }
        ],
        finalCtaHeadline: 'Build Parent Trust Without Adding Administrative Work',
        finalCtaDescription: 'Keep parent communication professional, log tutor praise, and secure immediate alerts for billing concerns.',
        mockupLocationName: 'Northstar Learning Center'
    },
    {
        slug: 'pet-care',
        metaTitle: 'Google Review Automation for Pet-Care Businesses | ReplyVera',
        metaDescription: 'Automatically respond to pet-care Google reviews and escalate injury, illness, lost-pet, and grooming concerns.',
        navigationLabel: 'Pet Care',
        navigationDescription: 'Warm replies with animal-safety escalation.',
        heroEyebrow: 'Google Review Automation for Pet-Care Businesses',
        heroHeadline: 'Every Pet-Care Review Answered Automatically',
        heroDescription: 'ReplyVera writes warm Google review responses, recognizes outstanding staff, and immediately escalates concerns involving injuries, illness, lost pets, grooming incidents, or animal safety.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Dog daycares', 'Pet boarding resorts', 'Kennels', 'Grooming salons', 'Pet hotels', 'Multi-location chains'],
        problemHeadline: 'Keep Your Staff With the Animals, Not Replying to Google Reviews',
        problems: [
            { icon: 'dog', title: 'Attendants busy with animals', text: 'Kennel play handlers and groomers are busy caring for dogs, leaving no time to sit at a desk computer.' },
            { icon: 'heart', title: 'Pet owners seek reassurance', text: 'Pet owners treat their dogs as family and expect personal, warm, and prompt responses to their reviews.' },
            { icon: 'award', title: 'Groomer praise goes unrecognized', text: 'Outstanding reviews praising specific groomers or trainers are lost, missing opportunities to celebrate staff.' },
            { icon: 'clock', title: 'Appointment delays spark feedback', text: 'Grooming wait times or delayed pickups can draw complaints on your local business profile.' },
            { icon: 'shield-alert', title: 'Animal safety claims require care', text: 'Mentions of bites, illnesses, cuts, or escape demand immediate manager action to prevent liabilities.' },
            { icon: 'map', title: 'Inconsistent brand voice', text: 'Multi-location pet care chains struggle to enforce a consistent, pet-friendly tone across all daycares.' }
        ],
        step2Text: 'ReplyVera identifies customer sentiment, staff mentions, service type, and potential animal-safety concerns.',
        step3Text: 'Routine positive reviews are posted automatically after a delay, while grooming cuts or boarding safety alerts require manager approval.',
        featureHeadline: 'Review Automation Built for Pet Groomers and Boarders',
        features: [
            { name: 'Groomer and Staff Recognition', text: 'Scans customer reviews for groomer or handler names, logging positive employee mentions.', verdictType: 'positive' },
            { name: 'Boarding, Daycare, and Grooming Detection', text: 'Identify reviews mentioning specific service types (like drop-off daycare, boarding, or nail trims).', verdictType: 'positive' },
            { name: 'Animal-Injury Escalation', text: 'Locks reviews containing words like hurt, cut, scratch, or vet, routing them directly to manager approval.', verdictType: 'sensitive' },
            { name: 'Lost-Pet and Escaped-Pet Detection', text: 'Detects mentions of escaped dogs or missing collars, triggering immediate email notifications to the owner.', verdictType: 'sensitive' },
            { name: 'Medication Concern Detection', text: 'Flags reviews alleging incorrect medicine administration or dietary errors.', verdictType: 'sensitive' },
            { name: 'Service-Delay Detection', text: 'Identifies wait-time complaints or delayed grooming pickup reviews.', verdictType: 'complaint' }
        ],
        employeeRoles: ['Groomer', 'Handler', 'Trainer', 'Kennel attendant', 'Front-desk employee', 'Facility manager'],
        sensitiveTopics: ['Animal injury', 'Illness', 'Escaped pets', 'Missing pets', 'Bites', 'Medication', 'Neglect', 'Grooming injuries'],
        reviewExamples: [
            {
                reviewer: 'Mark Douglas',
                rating: 5,
                text: 'Bella loves daycare, and Jordan always greets her by name.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing this. We love hearing that Bella enjoys her daycare visits and that Jordan makes her feel so welcome. We’ll be sure to share your kind words with the team.'
            },
            {
                reviewer: 'Sandra Collins',
                rating: 3,
                text: 'Our grooming appointment took much longer than expected.',
                label: 'Manager Approval Recommended',
                reply: 'Thank you for your feedback. We\'re glad you chose us, but we\'re sorry your grooming appointment took longer than expected. We\'re sharing this with our groomers to improve scheduling.'
            },
            {
                reviewer: 'Philip Sterling',
                rating: 1,
                text: 'My dog was injured while staying at the facility.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Animal-safety concern detected',
                alertText: 'Immediate management review required. Auto-publishing blocked.'
            }
        ],
        insightExamples: [
            'Jordan received nine positive mentions',
            'Grooming wait-time complaints increased',
            'One location has repeated cleanliness concerns',
            'Customers frequently praise photo updates',
            'Two safety-related reviews require follow-up'
        ],
        insightsHeadline: 'Spot Wait-Time Issues and Kennel Cleanliness Feedback',
        sensitiveReviewHeadline: 'Escalate Animal Safety and Medical Neglect Concerns',
        employeeRecognitionHeadline: 'Highlight the Handlers and Groomers Pet Parents Praise',
        multiLocationHeadline: 'Supervise Review Channels Across Every Boarding Location',
        multiLocationCopy: 'Manage review profiles across all boarding resorts or grooming locations. Let facility managers oversee local feedback while regional owners track overall pet satisfaction levels.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding pet resorts receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Can ReplyVera manage multiple locations?', a: 'Yes. Connect multiple pet boarding or grooming Business Profiles and manage ratings from one screen.' },
            { q: 'Can animal safety reviews be blocked from auto-publishing?', a: 'Yes. Any review mentioning cuts, scratches, illness, escape, or vet visits is flagged, held in drafts, and triggers email alerts.' },
            { q: 'Can we track praised employees?', a: 'Yes. ReplyVera tags groomer or handler names in reviews, logging positive performance Leaderboards.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. It automatically detects Spanish reviews and drafts replies in fluent Spanish.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future pet packages.' }
        ],
        relatedIndustries: [
            { id: 'agencies', title: 'Marketing Agencies' },
            { id: 'restaurants', title: 'Restaurants' }
        ],
        finalCtaHeadline: 'Protect Your Reputation While You Care for Their Pets',
        finalCtaDescription: 'Keep pet owner trust high, automate positive replies, and get immediate alerts for animal safety concerns.',
        mockupLocationName: 'Happy Trails Pet Resort'
    },
    {
        slug: 'car-washes',
        metaTitle: 'Google Review Management for Car Washes | ReplyVera',
        metaDescription: 'Automatically respond to car-wash Google reviews and escalate vehicle-damage, billing, membership, and equipment complaints.',
        navigationLabel: 'Car Wash Operators',
        navigationDescription: 'Track damage, billing, equipment, and service reviews.',
        heroEyebrow: 'Google Review Automation for Car Wash Operators',
        heroHeadline: 'Every Car Wash Review Answered Automatically',
        heroDescription: 'ReplyVera handles routine Google reviews, recognizes great employees, and sends vehicle-damage, billing, membership, and safety complaints to management.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Express car washes', 'Detailing centers', 'Self-serve bays', 'Multi-location wash chains', 'Franchise operators'],
        problemHeadline: 'Keep Your Site Attendants Attending, Not Replying to Google Reviews',
        problems: [
            { icon: 'car', title: 'Site managers busy on site', text: 'Managers spend their shifts clearing tunnel jams, restocking chemicals, and assisting lane traffic, leaving no computer time.' },
            { icon: 'alert-triangle', title: 'Vehicle damage complaints', text: 'Allegations of scratches, broken mirrors, or dented rims require immediate review before posting a response.' },
            { icon: 'credit-card', title: 'Membership cancellation issues', text: 'Customers cancel monthly wash passes and voice billing complaints publicly on your Google profile.' },
            { icon: 'clock', title: 'Long lines and wait times', text: 'Weekend wash queues can draw complaints that lower your local map pack SEO rankings.' },
            { icon: 'users', title: 'Attendant praise gets missed', text: 'Reviews praising helpful payment kiosk cashiers or detailers are lost without staff tracking.' },
            { icon: 'map-pin', title: 'Multiple locations respond inconsistently', text: 'Multi-site operations struggle to maintain a uniform brand voice across all local branches.' }
        ],
        step2Text: 'ReplyVera identifies customer sentiment, employee mentions, equipment issues, membership topics, and possible vehicle-damage concerns.',
        step3Text: 'Routine wash reviews go live automatically, while vehicle damage and billing complaints are sent directly to site managers.',
        featureHeadline: 'Review Automation Built for Express Car Washes',
        features: [
            { name: 'Vehicle-Damage Escalation', text: 'Identifies claims of scratches, mirror issues, or body damage, holding responses for management.', verdictType: 'sensitive' },
            { name: 'Membership and Billing Detection', text: 'Flags reviews complaining about monthly passes, card charges, or refunds.', verdictType: 'sensitive' },
            { name: 'Equipment-Issue Tracking', text: 'Detects comments regarding broken payment terminals, out-of-order vacuums, or tunnel errors.', verdictType: 'complaint' },
            { name: 'Wait-Time Detection', text: 'Identifies queue wait-time complaints to help managers monitor throughput.', verdictType: 'complaint' },
            { name: 'Employee Recognition', text: 'Recognizes lane prep attendants, detailers, and site staff mentioned by name.', verdictType: 'positive' },
            { name: 'Location-Level Reporting', text: 'Compare rating metrics, review volumes, and staff praise across all wash sites.', verdictType: 'positive' }
        ],
        employeeRoles: ['Attendant', 'Site manager', 'Customer-service employee', 'Detailer', 'Membership specialist'],
        sensitiveTopics: ['Vehicle damage', 'Personal injury', 'Billing disputes', 'Membership cancellation', 'Safety', 'Staff conduct'],
        reviewExamples: [
            {
                reviewer: 'Gordon Fisher',
                rating: 5,
                text: 'Excellent wash, and Marcus helped me with the payment machine.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for your review. We’re glad you had a great wash and that Marcus was able to help with the payment machine. We’ll be sure to share your kind words with him.'
            },
            {
                reviewer: 'Terry Cooper',
                rating: 3,
                text: 'The vacuums were not working, and the line was very long.',
                label: 'Location Manager Review',
                reply: 'Thank you for letting us know. We\'re sorry the vacuums were out of service and that you experienced a delay. We\'re sharing this with our site team to inspect the equipment.'
            },
            {
                reviewer: 'Victor Grant',
                rating: 1,
                text: 'The wash scratched the side of my vehicle.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Vehicle-damage complaint detected',
                alertText: 'Escalated before publishing. Review held in drafts for manager check.'
            }
        ],
        insightExamples: [
            'Vacuum complaints increased at one location',
            'Marcus received six positive mentions',
            'Membership cancellation complaints increased',
            'Weekend wait-time complaints are rising',
            'Two damage-related reviews require action'
        ],
        insightsHeadline: 'Detect Equipment and Queue Wait-Time Bottlenecks',
        sensitiveReviewHeadline: 'Escalate Vehicle Damage and Membership Billing Concerns',
        employeeRecognitionHeadline: 'Acknowledge the Wash Kiosk Attendants Customers Praise',
        multiLocationHeadline: 'Maintain Consistent Service Standards Across Every Wash Site',
        multiLocationCopy: 'Our Multi-Location dashboard allows express car wash groups and franchise owners to connect all Business Profiles, track kiosk rating trends, and manage local permissions.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding operators receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Can ReplyVera handle multiple car wash locations?', a: 'Yes. Connect multiple car wash Business Profiles and oversee ratings across your regional footprint.' },
            { q: 'Can vehicle damage reviews be blocked from auto-publishing?', a: 'Yes. Any review containing words like scratch, dent, or mirror is held in drafts, blocking auto-replies.' },
            { q: 'Does it recognize staff members?', a: 'Yes. It tags detailers or prep attendants named in positive reviews to log performance leaderboards.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. It automatically translates and replies to customers in both English and Spanish.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future wash packages.' }
        ],
        relatedIndustries: [
            { id: 'agencies', title: 'Marketing Agencies' },
            { id: 'laundromats', title: 'Laundromats' }
        ],
        finalCtaHeadline: 'Keep Every Location Responsive',
        finalCtaDescription: 'Automate positive review replies, log attendant prep praise, and route rim and damage complaints to site managers.',
        mockupLocationName: 'ClearWave Express Wash'
    },
    {
        slug: 'laundromats',
        metaTitle: 'Google Review Replies for Laundromats | ReplyVera',
        metaDescription: 'Automatically respond to laundromat Google reviews and flag broken machines, refunds, missing items, cleanliness, and safety concerns.',
        navigationLabel: 'Laundromats',
        navigationDescription: 'Monitor cleanliness, equipment, refunds, and missing items.',
        heroEyebrow: 'Google Review Automation for Laundromats',
        heroHeadline: 'Keep Every Laundry Review Clean and Professional',
        heroDescription: 'ReplyVera automatically responds to routine Google reviews and alerts owners when customers report broken machines, refund problems, missing clothing, cleanliness issues, or safety concerns.',
        heroPrimaryCta: 'Start Your Free Trial',
        heroSecondaryCta: 'Start for $39 per Month',
        businessTypes: ['Independent Laundromats', 'Laundry franchises', 'Wash-and-fold services', 'Dry cleaners', 'Pickup-and-delivery laundry services'],
        problemHeadline: 'Broken Machines and Service Problems Should Not Go Unnoticed',
        problems: [
            { icon: 'washing-machine', title: 'Owners busy fixing equipment', text: 'Owners spend their days maintaining machinery, empty coins, and managing utility services, leaving zero computer time.' },
            { icon: 'alert-triangle', title: 'Broken machine complaints', text: 'Reviews complaining about out-of-order washers or dryers can turn away customers looking for open bays.' },
            { icon: 'credit-card', title: 'Coin & card refund disputes', text: 'Lost coins or mobile app transaction issues can lead to angry, public reviews on Google.' },
            { icon: 'package', title: 'Missing wash-and-fold items', text: 'Claims of lost laundry or mixed-up shirts require immediate review to check security cameras.' },
            { icon: 'trash-2', title: 'Trash and cleanliness issues', text: 'Dirty folding tables or full trash cans can quickly pull down a laundromat\'s rating.' },
            { icon: 'users', title: 'Attendant praise gets missed', text: 'Praise for friendly drop-off staff or cleaners goes unnoticed and unlogged.' }
        ],
        step2Text: 'ReplyVera identifies customer sentiment, employee mentions, machine issues, cleanliness topics, refund requests, and missing-item concerns.',
        step3Text: 'Positive feedback is posted automatically after a delay, while broken machine alerts and missing item claims are held in drafts.',
        featureHeadline: 'Review Automation Built for Laundry Businesses',
        features: [
            { name: 'Broken-Machine Detection', text: 'Scans reviews for keywords like broken, out of order, or coin jam, alerting maintenance.', verdictType: 'complaint' },
            { name: 'Refund Complaint Routing', text: 'Detects card charge errors or lost coin disputes, routing them to store manager drafts.', verdictType: 'sensitive' },
            { name: 'Cleanliness Trend Tracking', text: 'Monitors comments regarding trash, floors, or folding tables to preserve store standards.', verdictType: 'complaint' },
            { name: 'Missing-Item Escalation', text: 'Identifies missing laundry or wash quality issues for drop-off orders, blocking auto-replies.', verdictType: 'sensitive' },
            { name: 'Wash-and-Fold Quality Detection', text: 'Tracks feedback regarding detergent scents, folding consistency, or delivery delays.', verdictType: 'positive' },
            { name: 'Staff Recognition', text: 'Recognizes helpful wash-and-fold attendants and cleaners mentioned by name.', verdictType: 'positive' }
        ],
        employeeRoles: ['Attendant', 'Store manager', 'Driver', 'Wash-and-fold employee', 'Customer-service representative'],
        sensitiveTopics: ['Missing clothing', 'Property damage', 'Refund disputes', 'Safety', 'Theft allegations', 'Staff conduct'],
        reviewExamples: [
            {
                reviewer: 'Dorothy Miller',
                rating: 5,
                text: 'The store was spotless, and Linda was extremely helpful.',
                label: 'Safe to Auto-Publish',
                reply: 'Thank you for your kind review. We’re glad you found the store clean and that Linda provided such helpful service. We’ll be sure to share your feedback with her.'
            },
            {
                reviewer: 'Arthur Vance',
                rating: 3,
                text: 'Three washers were out of service.',
                label: 'Location Follow-Up Recommended',
                reply: 'Thank you for letting us know. We’re sorry several machines were unavailable during your visit. We’re sharing this with the location team so the equipment can be reviewed.'
            },
            {
                reviewer: 'Gary Higgins',
                rating: 1,
                text: 'One of my items was missing from my wash-and-fold order.',
                label: 'Sensitive Review - Escalated',
                alertTitle: 'Missing-item complaint detected',
                alertText: 'Manager approval required. Review held in drafts for verification.'
            }
        ],
        insightExamples: [
            'Machine complaints increased at one location',
            'Linda received five positive mentions',
            'Refund requests rose this month',
            'Customers frequently praise cleanliness',
            'Two missing-item complaints require follow-up'
        ],
        insightsHeadline: 'Turn Customer Reviews Into Location-Level Improvements',
        sensitiveReviewHeadline: 'Escalate Refund, Missing-Item, and Safety Complaints',
        employeeRecognitionHeadline: 'Recognize the Employees Customers Appreciate',
        multiLocationHeadline: 'Monitor Every Laundry Location From One Dashboard',
        multiLocationCopy: 'Manage review profiles across all coin-ops, dry cleaners, or wash-and-fold hubs. Let managers coordinate local approvals while regional owners track overall cleanliness ratings.',
        pricingOffer: { label: 'Early-access offer', text: 'Founding laundry owners receive $29 per month for the first 12 months. Standard Autopilot pricing is $39 per month after the promotional period.' },
        faqItems: [
            { q: 'Can ReplyVera handle multiple laundromat locations?', a: 'Yes. Connect all your coin-op or laundry service profiles and oversee ratings across your regional footprint.' },
            { q: 'Can missing-item reviews be blocked from auto-publishing?', a: 'Yes. Any reviews mentioning lost items, clothing mix-ups, or refund demands are held in drafts, blocking auto-replies.' },
            { q: 'Can we track praised employees?', a: 'Yes. The system tags laundry attendants or drop-off workers named in positive reviews to log performance leaderboards.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. It automatically detects Spanish reviews and drafts replies in fluent Spanish.' },
            { q: 'Which review platforms are supported?', a: 'Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future laundry rollouts.' }
        ],
        relatedIndustries: [
            { id: 'car-washes', title: 'Car Wash Operators' },
            { id: 'agencies', title: 'Marketing Agencies' }
        ],
        finalCtaHeadline: 'Keep Every Location Clean, Responsive, and Trusted',
        finalCtaDescription: 'Automate positive review replies, log cleaning staff praise, and route billing or missing clothes complaints to managers.',
        mockupLocationName: 'FreshFold Laundry'
    }
];

// Validation check for required configuration fields
function validateConfigurations(pages) {
    const requiredFields = [
        'heroHeadline',
        'heroDescription',
        'problemHeadline',
        'problems',
        'featureHeadline',
        'features',
        'reviewExamples',
        'insightsHeadline',
        'insightExamples',
        'sensitiveReviewHeadline',
        'employeeRecognitionHeadline',
        'multiLocationHeadline',
        'faqItems',
        'finalCtaHeadline',
        'finalCtaDescription',
        'metaTitle',
        'metaDescription'
    ];

    let errorsFound = false;

    pages.forEach(ind => {
        const missing = [];
        requiredFields.forEach(field => {
            if (ind[field] === undefined || ind[field] === null || ind[field] === '') {
                missing.push(field);
            }
        });
        
        // Also validate arrays are not empty
        ['problems', 'features', 'reviewExamples', 'insightExamples', 'faqItems'].forEach(arrField => {
            if (ind[arrField] && ind[arrField].length === 0) {
                missing.push(`${arrField} (empty array)`);
            }
        });

        if (missing.length > 0) {
            console.error(`Error: Industry category "${ind.slug}" is missing required configuration fields:`);
            missing.forEach(m => console.error(`  - ${m}`));
            errorsFound = true;
        }
    });

    if (errorsFound) {
        console.error('\nConfiguration validation failed. Aborting compilation.');
        process.exit(1);
    } else {
        console.log('Configuration validation passed successfully.\n');
    }
}

// Run validation before proceeding
validateConfigurations(industryPages);

// Reusable IndustryLandingPage Component
function renderIndustryPage(ind) {
    // Generate Business Types Eyebrow List
    const businessTypesHtml = ind.businessTypes.map(type => `
        <div style="display:flex; align-items:center; gap:8px; color:var(--text-primary-current); font-size:0.95rem;">
            <i data-lucide="check-circle" style="color:var(--accent); width:18px; height:18px; flex-shrink:0;"></i> ${type}
        </div>
    `).join('');

    // Generate Customer Problems Cards
    const problemsHtml = ind.problems.map(prob => `
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:24px; border-radius:12px; transition:transform var(--transition-fast);" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
            <div style="width:40px; height:40px; background:rgba(99, 102, 241, 0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                <i data-lucide="${prob.icon}" style="width:20px; height:20px;"></i>
            </div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFF; margin-bottom:8px;">${prob.title}</h3>
            <p style="font-size:0.88rem; color:var(--text-secondary-current); line-height:1.5;">${prob.text}</p>
        </div>
    `).join('');

    // Generate Features Cards
    const featuresHtml = ind.features.map((feat, idx) => {
        // We alternate the flex-direction grid visual for high-end styling
        const isReversed = idx % 2 === 1;
        
        let safetyVerdict = 'No Risk Detected';
        let safetyStatus = 'Safe to Auto-Publish';
        let verdictColor = 'var(--accent)';
        let thirdLine = 'Auto-Published';
        
        if (feat.verdictType === 'sensitive') {
            safetyVerdict = 'Sensitive Topic Detected';
            safetyStatus = 'Approval Required';
            verdictColor = '#EF4444';
            thirdLine = 'Auto-Publishing Blocked';
        } else if (feat.verdictType === 'complaint') {
            safetyVerdict = 'Complaint Detected';
            safetyStatus = 'Review Recommended';
            verdictColor = 'var(--primary-light)';
            thirdLine = 'Manager Approval Recommended';
        }

        return `
            <div class="feature-split" style="margin-bottom: 80px; ${isReversed ? 'flex-direction: row-reverse !important;' : ''}">
                <div class="feature-content-box" style="flex:1;">
                    <div class="label-pill"><i data-lucide="star" style="width:12px; height:12px;"></i> ${feat.name}</div>
                    <h2 class="mb-4" style="font-size:1.8rem; font-weight:800; color:#FFF;">Built for ${ind.navigationLabel}</h2>
                    <p class="mb-6" style="font-size:1.05rem; color:var(--text-secondary-current); line-height:1.6;">${feat.text}</p>
                    <ul class="feature-list" style="list-style:none; padding:0; display:flex; flex-direction:column; gap:12px;">
                        <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Automated scanning and tags</li>
                        <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Contextual brand voice replies</li>
                        <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Safe draft queue routing</li>
                    </ul>
                </div>
                <div class="feature-visual-box" style="flex:1; background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:16px; display:flex; flex-direction:column; justify-content:center; text-align:left;">
                    <div style="font-size:0.75rem; font-weight:700; color:var(--primary-light); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:12px;">Auto-Pilot Analysis</div>
                    <div style="background:#05050C; padding:20px; border-radius:8px; border:1px solid rgba(255,255,255,0.05); font-family:monospace; font-size:0.85rem; color:#94A3B8;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>Topic Extracted:</span> <span style="color:#FFF;">"${feat.name}"</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>Safety Verdict:</span> <span style="color:${verdictColor}; font-weight:700;">${safetyVerdict}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>Status:</span> <span style="color:${verdictColor}; font-weight:700;">${safetyStatus}</span>
                        </div>
                        <div style="display:flex; justify-content:space-between;">
                            <span>Autopilot Action:</span> <span style="color:${verdictColor}; font-weight:700;">${thirdLine}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Generate Review Cards (With Custom Auto-reply copy vs. blocked warning display)
    const reviewsHtml = ind.reviewExamples.map(rev => {
        let labelColor = 'var(--accent)';
        let labelBg = 'rgba(16, 185, 129, 0.08)';
        let borderStyle = '1px solid var(--border-current)';
        let glow = 'none';

        if (rev.alertTitle || rev.label.includes('Escalated')) {
            labelColor = '#EF4444';
            labelBg = 'rgba(239, 68, 68, 0.08)';
            borderStyle = '1.5px solid #EF4444';
            glow = '0 0 15px rgba(239, 68, 68, 0.1)';
        } else if (rev.label.includes('Recommended') || rev.label.includes('Required') || rev.label.includes('Approval')) {
            labelColor = 'var(--primary-light)';
            labelBg = 'rgba(99, 102, 241, 0.08)';
            borderStyle = '1px solid var(--border-current)';
            glow = 'none';
        }

        const ratingStars = Array.from({ length: rev.rating }).map(() => `<i data-lucide="star" style="fill:#F59E0B; color:#F59E0B; width:12px; height:12px;"></i>`).join('');
        const emptyStars = Array.from({ length: 5 - rev.rating }).map(() => `<i data-lucide="star" style="color:#CBD5E1; width:12px; height:12px;"></i>`).join('');

        let innerContent = '';
        if (rev.alertTitle) {
            // This is a sensitive review that blocks publishing
            innerContent = `
                <div style="background:rgba(239,68,68,0.04); border:1px solid rgba(239,68,68,0.18); padding:16px; border-radius:10px; margin-top:auto; text-align:left;">
                    <div style="display:flex; align-items:center; gap:8px; font-size:0.75rem; font-weight:800; color:#EF4444; text-transform:uppercase; margin-bottom:6px;">
                        <i data-lucide="shield-alert" style="width:14px; height:14px;"></i> ${rev.alertTitle}
                    </div>
                    <p style="font-size:0.88rem; color:#EF4444; font-weight:600; line-height:1.4; margin:0;">${rev.alertText}</p>
                </div>
            `;
        } else {
            // Routine review response
            innerContent = `
                <div style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.04); padding:16px; border-radius:10px; margin-top:auto;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.72rem; font-weight:800; letter-spacing:0.03em;">
                        <span style="color:var(--primary-light); text-transform:uppercase;"><i data-lucide="cpu" style="width:12px; height:12px; vertical-align:middle; margin-right:4px;"></i> Autopilot Reply</span>
                        <span style="color:${labelColor}; background:${labelBg}; padding:2px 8px; border-radius:4px; text-transform:uppercase;">${rev.label}</span>
                    </div>
                    <p style="font-size:0.88rem; color:#E2E8F0; line-height:1.5;">"${rev.reply}"</p>
                </div>
            `;
        }

        return `
            <div style="background:var(--bg-card-current); border:${borderStyle}; box-shadow:${glow}; padding:28px; border-radius:16px; text-align:left; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <div>
                            <span style="font-weight:700; color:#FFF; font-size:0.95rem;">${rev.reviewer}</span>
                            <div style="display:flex; gap:2px; margin-top:2px;">
                                ${ratingStars}${emptyStars}
                            </div>
                        </div>
                        <span style="font-size:0.75rem; color:var(--text-secondary-current);">Google Review</span>
                    </div>
                    <p style="font-style:italic; font-size:0.95rem; color:var(--text-primary-current); margin-bottom:20px; line-height:1.5;">"${rev.text}"</p>
                </div>
                ${innerContent}
            </div>
        `;
    }).join('');

    // Generate Dashboard Insights Block HTML
    const insightsHtml = ind.insightExamples.map(ins => `
        <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:16px 20px; border-radius:10px; color:#FFF; font-size:0.95rem; font-weight:500;">
            <i data-lucide="trending-up" style="color:var(--accent); width:18px; height:18px; flex-shrink:0;"></i>
            <span>${ins}</span>
        </div>
    `).join('');

    // Generate FAQs Accordion List
    const faqsHtml = ind.faqItems.map(faq => `
        <div class="faq-item">
            <div class="faq-question">
                <span>${faq.q}</span>
                <div class="faq-icon-wrapper"><i data-lucide="chevron-down"></i></div>
            </div>
            <div class="faq-answer">
                <p>${faq.a}</p>
            </div>
        </div>
    `).join('');

    // Generate Related Industry Footer links
    const relatedHtml = ind.relatedIndustries.map(rel => `
        <a href="/industries/${rel.id}" style="color:var(--primary-light); text-decoration:none; font-weight:600; font-size:0.92rem; border: 1px solid rgba(99, 102, 241, 0.15); background:rgba(99,102,241,0.02); padding:8px 16px; border-radius:50px; transition:all var(--transition-fast);" onmouseover="this.style.borderColor='var(--primary-light)';this.style.background='rgba(99,102,241,0.08)';" onmouseout="this.style.borderColor='rgba(99, 102, 241, 0.15)';this.style.background='rgba(99,102,241,0.02)';">
            ${rel.title} <i data-lucide="arrow-right" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-left:4px;"></i>
        </a>
    `).join('');

    // Generate Employee list badge tags
    const employeeRolesHtml = ind.employeeRoles.map(role => `
        <span style="font-size:0.8rem; font-weight:600; color:var(--primary-light); background:rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.18); padding:6px 14px; border-radius:50px;">
            ${role}
        </span>
    `).join('');

    // Generate Sensitive Topics list badge tags
    const sensitiveTopicsHtml = ind.sensitiveTopics.map(topic => `
        <span style="font-size:0.8rem; font-weight:600; color:#EF4444; background:rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.15); padding:6px 14px; border-radius:50px;">
            ${topic}
        </span>
    `).join('');

    const isAgency = ind.slug === 'agencies';
    const step2Text = ind.step2Text;
    const step3Text = ind.step3Text;

    // Dynamic Mockup layout based on industry type
    let mockupLayoutHtml = '';
    if (isAgency) {
        mockupLayoutHtml = `
            <!-- Agency Client Dashboard Grid Mockup -->
            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:20px; backdrop-filter:blur(20px); box-shadow:var(--shadow-premium); text-align:left; position:relative;">
                <span style="position:absolute; top:12px; right:16px; font-size:0.65rem; color:#64748B; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; pointer-events:none;">Example dashboard data</span>
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:16px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:12px; height:12px; background:#EF4444; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#F59E0B; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#10B981; border-radius:50%;"></div>
                    </div>
                    <span style="font-size:0.75rem; font-weight:700; color:var(--primary-light); text-transform:uppercase;">Agency Client Hub</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:16px;">
                    <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:12px; text-align:center;">
                        <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--border-current);">
                            <div style="font-size:0.7rem; color:var(--text-secondary-current); text-transform:uppercase;">Locations</div>
                            <div style="font-size:1.2rem; font-weight:800; color:#FFF; margin-top:4px;">24</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--border-current);">
                            <div style="font-size:0.7rem; color:var(--text-secondary-current); text-transform:uppercase;">Pending</div>
                            <div style="font-size:1.2rem; font-weight:800; color:var(--primary-light); margin-top:4px;">5</div>
                        </div>
                        <div style="background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--border-current);">
                            <div style="font-size:0.7rem; color:var(--text-secondary-current); text-transform:uppercase;">Avg Rating</div>
                            <div style="font-size:1.2rem; font-weight:800; color:var(--accent); margin-top:4px;">4.8★</div>
                        </div>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary-current);">Connected Client Profiles:</div>
                    <div style="display:flex; flex-direction:column; gap:8px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:10px 14px; border-radius:8px;">
                            <span style="font-size:0.85rem; font-weight:600; color:#FFF;">Harbor Table (Restaurant)</span>
                            <span style="font-size:0.72rem; color:var(--accent); font-weight:700;">Autopilot Active</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:10px 14px; border-radius:8px;">
                            <span style="font-size:0.85rem; font-weight:600; color:#FFF;">Brightline Dental (Clinic)</span>
                            <span style="font-size:0.72rem; color:var(--primary-light); font-weight:700;">Needs Approval (1)</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:10px 14px; border-radius:8px;">
                            <span style="font-size:0.85rem; font-weight:600; color:#FFF;">Happy Trails Pet Resort</span>
                            <span style="font-size:0.72rem; color:var(--accent); font-weight:700;">Autopilot Active</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        mockupLayoutHtml = `
            <!-- Standard Location Autopilot Panel Mockup -->
            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:20px; backdrop-filter:blur(20px); box-shadow:var(--shadow-premium); text-align:left; position:relative;">
                <span style="position:absolute; top:12px; right:16px; font-size:0.65rem; color:#64748B; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; pointer-events:none;">Example dashboard data</span>
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:16px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:12px; height:12px; background:#EF4444; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#F59E0B; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#10B981; border-radius:50%;"></div>
                    </div>
                    <span style="font-size:0.75rem; font-weight:700; color:var(--primary-light); text-transform:uppercase;">Autopilot Dashboard</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="font-size:0.8rem; color:var(--text-secondary-current);">Store location context:</div>
                    <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:12px; border-radius:8px;">
                        <span style="font-weight:600; color:#FFF; display:flex; align-items:center; gap:6px;"><i data-lucide="map-pin" style="color:var(--primary-light); width:16px; height:16px;"></i> ${ind.mockupLocationName}</span>
                        <span style="font-size:0.75rem; font-weight:700; color:var(--accent); background:rgba(16, 185, 129, 0.08); padding:2px 8px; border-radius:4px;">Connected</span>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary-current); margin-top:8px;">Live Autopilot Stream:</div>
                    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:16px; border-radius:8px; font-family:monospace; font-size:0.82rem; color:#94A3B8;">
                        <div style="margin-bottom:4px;">[12:24 PM] New Google review detected.</div>
                        <div style="margin-bottom:4px; color:var(--accent);">[12:24 PM] Tone matched. Autopilot reply drafted.</div>
                        <div style="color:var(--primary-light);">[12:25 PM] Delay completed. Reply published live.</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Set standard pricing plan pricing parameters
    const startPrice = isAgency ? '$149' : '$29';
    const planRate = isAgency ? '$149' : '$39';
    const pricingUnit = isAgency ? ' / mo' : ' / mo / location';

    let pricingFeaturesListHtml = '';
    if (isAgency) {
        pricingFeaturesListHtml = `
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> 10 client locations included</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> $12/mo for additional locations</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Team access controls</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Client approval links</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Client tone profiles</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> English and Spanish responses</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Employee-name recognition</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Review history logs</li>
        `;
    } else {
        pricingFeaturesListHtml = `
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Google review responses</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Auto-publishing for safe reviews</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Approval rules</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Custom tone matching</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> English and Spanish responses</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Employee-name recognition</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Review history logs</li>
            <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Negative-review alerts</li>
        `;
    }

    // 1. Hero Block
    const heroBadgeHtml = ind.heroEyebrow ? `
        <div class="hero-badge" style="display:inline-flex; align-items:center; gap:6px; background:rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); padding: 6px 12px; border-radius: 50px; color: var(--primary-light); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
            <i data-lucide="sparkles" style="width:12px; height:12px;"></i> ${ind.heroEyebrow}
        </div>
    ` : '';
    
    const heroHeadlineHtml = ind.heroHeadline ? `
        <h1 class="hero-headline" style="font-size:2.8rem; font-weight:800; line-height:1.1; margin-bottom:20px; color:#FFF;">${ind.heroHeadline}</h1>
    ` : '';
    
    const heroDescriptionHtml = ind.heroDescription ? `
        <p class="hero-sub" style="font-size:1.1rem; color:var(--text-secondary-current); margin-bottom:32px; line-height:1.6;">${ind.heroDescription}</p>
    ` : '';

    const heroHtml = `
    <!-- Hero Section -->
    <header class="hero theme-dark" style="padding: 160px 0 80px;">
        <div class="hero-glow-layer"></div>
        <div class="container" style="display:grid; grid-template-columns:1.2fr 1fr; gap:40px; align-items:center;">
            <div class="hero-content" style="text-align:left; max-width:100%;">
                ${heroBadgeHtml}
                ${heroHeadlineHtml}
                ${heroDescriptionHtml}
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center; margin-bottom:24px;">
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding:14px 28px; font-size:0.95rem;">${ind.heroPrimaryCta || 'Start Your Free Trial'}</a>
                    <a href="/pricing.html" class="btn btn-secondary" style="padding:14px 28px; font-size:0.95rem;">${ind.heroSecondaryCta || 'View Pricing'}</a>
                </div>
                <p style="font-size:0.82rem; color:var(--text-secondary-current); font-weight:500;">Try ReplyVera free. 14-day free trial. No credit card required.</p>
            </div>
            
            ${mockupLayoutHtml}
        </div>
    </header>
    `;

    // 2. Problems Section
    let problemsSection = '';
    if (ind.problems && ind.problems.length > 0) {
        const problemHeadlineHtml = ind.problemHeadline ? `
            <h2 class="mb-4" style="color:#FFF;">${ind.problemHeadline}</h2>
        ` : '';
        problemsSection = `
        <!-- Problems Section -->
        <section class="section theme-light" style="padding: 80px 0;">
            <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
                <div class="label-pill"><i data-lucide="alert-circle" style="width:12px; height:12px;"></i> Core Challenges</div>
                ${problemHeadlineHtml}
                <p class="lead-text" style="color:var(--text-secondary-current);">Managing reviews shouldn't eat into your day. Here are the core issues we solve.</p>
            </div>
            
            <div class="container">
                <div class="grid-3" style="gap:24px;">
                    ${problemsHtml}
                </div>
            </div>
        </section>
        `;
    }

    // 3. Target Business Types Segment
    let businessTypesSection = '';
    if (ind.businessTypes && ind.businessTypes.length > 0) {
        businessTypesSection = `
        <!-- Target Business Types Segment -->
        <section class="section theme-gray" style="padding: 60px 0; border-top:1px solid var(--border-current); border-bottom:1px solid var(--border-current);">
            <div class="container text-center" style="max-width: 600px; margin-bottom: 32px;">
                <h3 style="font-size:1.4rem; font-weight:700; color:#FFF;">Designed for:</h3>
            </div>
            <div class="container">
                <div style="display:flex; justify-content:center; gap:24px; flex-wrap:wrap; max-width:800px; margin:0 auto;">
                    ${businessTypesHtml}
                </div>
            </div>
        </section>
        `;
    }

    // 4. Setup Section
    const setupSection = `
    <!-- 3-Step Workflow -->
    <section class="section theme-white" style="padding: 80px 0;" id="how-it-works">
        <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
            <div class="label-pill"><i data-lucide="settings" style="width:12px; height:12px;"></i> Connection Setup</div>
            <h2 class="mb-4">Autopilot setup in three simple steps</h2>
            <p class="lead-text">Get connected and protect your local search reputation in under five minutes.</p>
        </div>
        <div class="container">
            <div class="grid-3" style="gap:32px;">
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">1</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">Connect Google Business Profile</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">Securely authorize your Google Business Profile with one OAuth connection. No passwords saved, cancel anytime.</p>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">2</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">ReplyVera understands the review</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">${step2Text || ''}</p>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">3</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">Auto-publish or request approval</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">${step3Text || ''}</p>
                </div>
            </div>
        </div>
    </section>
    `;

    // 5. Features Section
    let featuresSection = '';
    if (ind.features && ind.features.length > 0) {
        const featureHeadlineHtml = ind.featureHeadline ? `
            <h2 class="mb-4" style="color:#FFF;">${ind.featureHeadline}</h2>
        ` : '';

        featuresSection = `
        <!-- Industry Specific Features -->
        <section class="section theme-dark" style="padding: 80px 0;">
            <div class="container">
                <div class="text-center mb-12">
                    <div class="label-pill"><i data-lucide="sliders" style="width:12px; height:12px;"></i> Core Features</div>
                    ${featureHeadlineHtml}
                </div>
                ${featuresHtml}
            </div>
        </section>
        `;
    }

    // 6. Review Examples
    let reviewsSection = '';
    if (ind.reviewExamples && ind.reviewExamples.length > 0) {
        reviewsSection = `
        <!-- Realistic Review Examples -->
        <section class="section theme-light" style="padding: 80px 0;">
            <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
                <div class="label-pill"><i data-lucide="eye" style="width:12px; height:12px;"></i> Interactive Examples</div>
                <h2 class="mb-4" style="color:#FFF;">Realistic Review Response Examples</h2>
                <p class="lead-text" style="color:var(--text-secondary-current);">See how our autopilot safely logs positive experiences, routes minor complaints, and flags serious liabilities.</p>
            </div>
            <div class="container">
                <div class="grid-3" style="gap:24px;">
                    ${reviewsHtml}
                </div>
            </div>
        </section>
        `;
    }

    // 7. Sensitive & Employee Columns
    let sensitiveColumnHtml = '';
    if (ind.sensitiveTopics && ind.sensitiveTopics.length > 0) {
        const sensitiveHeadlineHtml = ind.sensitiveReviewHeadline ? `
            <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">${ind.sensitiveReviewHeadline}</h2>
        ` : '';

        sensitiveColumnHtml = `
            <div style="text-align:left;">
                <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="shield-alert" style="width:12px; height:12px;"></i> Sensitive-Review Escalation</div>
                ${sensitiveHeadlineHtml}
                <p style="color:var(--text-secondary-current); margin-bottom:24px; line-height:1.6;">ReplyVera never auto-posts blindly. Our scanners scan incoming feedback for potential liability risks, contract disputes, safety complaints, or discrimination claims. Auto-publishing is blocked, reviews are locked in draft state, and email alerts are sent to managers immediately.</p>
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary-current); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">Monitored sensitive topics:</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    ${sensitiveTopicsHtml}
                </div>
            </div>
        `;
    }

    let employeeColumnHtml = '';
    if (ind.employeeRoles && ind.employeeRoles.length > 0) {
        const employeeHeadlineHtml = ind.employeeRecognitionHeadline ? `
            <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">${ind.employeeRecognitionHeadline}</h2>
        ` : '';

        employeeColumnHtml = `
            <div style="text-align:left;">
                <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="award" style="width:12px; height:12px;"></i> Employee Recognition</div>
                ${employeeHeadlineHtml}
                <p style="color:var(--text-secondary-current); margin-bottom:24px; line-height:1.6;">Build staff morale and reward your team. ReplyVera identifies and extracts employee names mentioned in customer reviews, logging positive mentions on your staff leaderboard dashboard.</p>
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary-current); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:12px;">Tracked staff roles:</div>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                    ${employeeRolesHtml}
                </div>
            </div>
        `;
    }

    let supervisionSectionHtml = '';
    if (sensitiveColumnHtml || employeeColumnHtml) {
        const gridColumns = (sensitiveColumnHtml && employeeColumnHtml) ? 'grid-template-columns:1fr 1fr;' : 'grid-template-columns:1fr;';
        supervisionSectionHtml = `
        <!-- Supervision & Escalation Section -->
        <section class="section theme-gray" style="padding: 80px 0; border-top:1px solid var(--border-current); border-bottom:1px solid var(--border-current);">
            <div class="container" style="display:grid; ${gridColumns} gap:40px; align-items:start;">
                ${sensitiveColumnHtml}
                ${employeeColumnHtml}
            </div>
        </section>
        `;
    }

    // 8. Insights Section
    let insightsSectionHtml = '';
    if (ind.insightExamples && ind.insightExamples.length > 0) {
        const insightsHeadlineHtml = ind.insightsHeadline ? `
            <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">${ind.insightsHeadline}</h2>
        ` : '';

        insightsSectionHtml = `
        <!-- Operational-insights Dashboard -->
        <section class="section theme-light" style="padding: 80px 0;">
            <div class="container" style="display:grid; grid-template-columns:1fr 1.2fr; gap:40px; align-items:center;">
                <div style="text-align:left;">
                    <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="bar-chart-2" style="width:12px; height:12px;"></i> Reputation Analytics</div>
                    ${insightsHeadlineHtml}
                    <p style="color:var(--text-secondary-current); margin-bottom:16px; line-height:1.6;">Identify recurring service bottlenecks, track rating trends, and spot clean/dirty mentions. Our metrics help you take action before ratings fall.</p>
                    <p style="color:var(--text-secondary-current); line-height:1.6; margin:0;">Receive weekly email reports summarising rating logs, mentions, and response progress directly to your inbox.</p>
                </div>
                <div style="background:var(--bg-card-current); border:1px solid var(--border-current); padding:32px; border-radius:16px; text-align:left; position:relative;">
                    <span style="position:absolute; top:12px; right:16px; font-size:0.65rem; color:#64748B; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; pointer-events:none;">Example dashboard data</span>
                    <div style="font-size:0.8rem; font-weight:700; color:var(--primary-light); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:16px;">Live Client Insights Stream</div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${insightsHtml}
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    // 9. Multi Location Section
    let multiLocationSectionHtml = '';
    if (ind.multiLocationCopy) {
        const multiLocationHeadlineHtml = ind.multiLocationHeadline ? `
            <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">${ind.multiLocationHeadline}</h2>
        ` : '';

        multiLocationSectionHtml = `
        <!-- Multi-Location/Client Section -->
        <section class="section theme-white" style="padding: 80px 0; border-top:1px solid var(--border-current); border-bottom:1px solid var(--border-current);">
            <div class="container" style="display:grid; grid-template-columns:1.2fr 1fr; gap:40px; align-items:center;">
                <div style="text-align:left;">
                    <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="map" style="width:12px; height:12px;"></i> Scalable Administration</div>
                    ${multiLocationHeadlineHtml}
                    <p style="color:var(--text-secondary-current); line-height:1.6; margin-bottom:24px;">${ind.multiLocationCopy}</p>
                    <div style="background:#05050C; padding:20px; border-radius:12px; border:1px solid var(--border-current); display:flex; flex-direction:column; gap:12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
                            <span style="color:#FFF; font-weight:600;"><i data-lucide="users" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; color:var(--primary-light);"></i> ${isAgency ? 'Multi-Client Settings' : 'Multi-Location Settings'}</span>
                            <span style="color:var(--accent); font-weight:700;">Active</span>
                        </div>
                        <p style="font-size:0.82rem; color:var(--text-secondary-current); line-height:1.4; margin:0;">${isAgency ? 'Allow account managers or clients to manage individual locations with secure settings.' : 'Allow regional managers or corporate leads to oversee location responses with selective permissions.'}</p>
                    </div>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:16px; text-align:left; display:flex; flex-direction:column; gap:16px;">
                    <div style="font-size:0.8rem; color:var(--text-secondary-current);">Connection status:</div>
                    <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:12px; border-radius:8px;">
                        <span style="font-weight:600; color:#FFF; display:flex; align-items:center; gap:6px;"><i data-lucide="google" style="color:#DB4437; width:16px; height:16px;"></i> Google Business Profiles</span>
                        <span style="font-size:0.75rem; font-weight:700; color:var(--accent); background:rgba(16, 185, 129, 0.08); padding:2px 8px; border-radius:4px;">Connected</span>
                    </div>
                    <p style="font-size:0.85rem; color:var(--text-secondary-current); line-height:1.5; margin:0;">Securely connect and authorize multiple locations in one central, OAuth-verified dashboard.</p>
                </div>
            </div>
        </section>
        `;
    }

    // 10. Pricing Section
    const pricingSection = `
    <!-- Pricing Preview Block -->
    <section class="section theme-dark" id="pricing" style="padding: 80px 0;">
        <div class="container text-center" style="max-width: 700px;">
            <div class="label-pill"><i data-lucide="credit-card" style="width:12px; height:12px;"></i> Simple Pricing</div>
            <h2 class="mb-4">Plans start at ${startPrice} per month</h2>
            <p class="lead-text mb-8">Choose the plan that fits your business footprint. Start your free trial today.</p>
            
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-current); padding: 40px; border-radius: 20px; box-shadow: var(--shadow-premium); margin-bottom: 32px; backdrop-filter: blur(20px); text-align:left; max-width:600px; margin-left:auto; margin-right:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:16px; margin-bottom:20px;">
                    <div>
                        <div style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary-light); font-weight: 700;">Autopilot Plan</div>
                        <div style="font-size: 0.82rem; color:var(--accent); font-weight:700; margin-top:2px;">${ind.pricingOffer.label || ''}</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;">${planRate}</span>
                        <span style="color: var(--text-secondary-current); font-size: 0.88rem;">${pricingUnit}</span>
                    </div>
                </div>
                
                <ul style="list-style:none; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.9rem; margin-bottom:32px;">
                    ${pricingFeaturesListHtml}
                </ul>

                <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; align-items: center;">
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding: 14px 28px; font-size: 0.95rem; flex:1; text-align:center;">Start Your Free Trial</a>
                    <a href="/pricing.html" class="btn btn-secondary" style="padding: 14px 28px; font-size: 0.95rem; flex:1; text-align:center;">View All Plans</a>
                </div>
            </div>
            
            <p style="font-size: 0.85rem; color: var(--text-secondary-current); font-weight: 500;">
                Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.
            </p>
        </div>
    </section>
    `;

    // 11. FAQ Section
    let faqSection = '';
    if (ind.faqItems && ind.faqItems.length > 0) {
        faqSection = `
        <!-- Industry Specific FAQ -->
        <section class="section theme-white" id="faq" style="padding: 80px 0;">
            <div class="container" style="max-width: 800px;">
                <div class="text-center mb-12">
                    <div class="label-pill"><i data-lucide="help-circle" style="width:12px; height:12px;"></i> FAQ</div>
                    <h2 class="mb-4">Frequently Asked Questions</h2>
                    <p>Everything you need to know about ReplyVera for ${ind.navigationLabel || ''}.</p>
                </div>
                
                <div class="faq-list" style="display:flex; flex-direction:column; gap:4px;">
                    ${faqsHtml}
                </div>
            </div>
        </section>
        `;
    }

    // 12. Final CTA Section
    let finalCtaSectionHtml = '';
    if (ind.finalCtaHeadline) {
        const finalCtaDescriptionHtml = ind.finalCtaDescription ? `
            <p class="mb-8" style="color:var(--text-secondary-current);">${ind.finalCtaDescription}</p>
        ` : '';

        finalCtaSectionHtml = `
        <!-- Final Call to Action -->
        <section class="section theme-dark" style="border-top: 1px solid rgba(255, 255, 255, 0.04); padding: 80px 0;">
            <div class="container text-center" style="max-width: 650px;">
                <h2 class="mb-4" style="color:#FFF;">${ind.finalCtaHeadline}</h2>
                ${finalCtaDescriptionHtml}
                
                <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; margin-bottom:32px; align-items:center;">
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding: 14px 28px; font-size:0.95rem;">Start Your Free Trial</a>
                    <a href="/pricing.html#comparison" style="color: #94A3B8; text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: color var(--transition-fast);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">Compare Plans</a>
                </div>
            </div>
        </section>
        `;
    }

    // 13. Related Industries Section
    let relatedSection = '';
    if (ind.relatedIndustries && ind.relatedIndustries.length > 0) {
        relatedSection = `
        <!-- Related Industries links section -->
        <section class="section theme-gray" style="padding: 40px 0; border-top:1px solid var(--border-current);">
            <div class="container text-center">
                <div style="font-size:0.8rem; font-weight:700; color:var(--text-secondary-current); text-transform:uppercase; letter-spacing:0.05em; margin-bottom:16px;">Related Industries</div>
                <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; align-items:center;">
                    ${relatedHtml}
                </div>
            </div>
        </section>
        `;
    }

    return `
        ${heroHtml}
        ${problemsSection}
        ${businessTypesSection}
        ${setupSection}
        ${featuresSection}
        ${reviewsSection}
        ${supervisionSectionHtml}
        ${insightsSectionHtml}
        ${multiLocationSectionHtml}
        ${pricingSection}
        ${faqSection}
        ${finalCtaSectionHtml}
        ${relatedSection}
    `;
}

// Compile all category pages
industryPages.forEach((ind) => {
    // Generate page body content
    const bodyContent = renderIndustryPage(ind);

    // Modify header tags
    let header = baseHeader;
    header = header.replace(
        /<title>[^<]+<\/title>/,
        `<title>${ind.metaTitle}</title>`
    );
    header = header.replace(
        /<meta name="description" content="[^"]+">/,
        `<meta name="description" content="${ind.metaDescription}">`
    );
    header = header.replace(
        /<\/head>/,
        `    <meta name="keywords" content="${ind.metaDescription}">\n</head>`
    );

    const fullPageContent = header + bodyContent + baseFooter;

    // Target directory: industries/[slug]/
    const indDir = path.join(__dirname, 'industries', ind.slug);
    if (!fs.existsSync(indDir)) {
        fs.mkdirSync(indDir, { recursive: true });
    }

    const indFilePath = path.join(indDir, 'index.html');
    fs.writeFileSync(indFilePath, fullPageContent, 'utf8');
    console.log(`Successfully compiled industry page: ${indFilePath}`);
});

console.log('All 9 industry landing pages successfully generated!');
