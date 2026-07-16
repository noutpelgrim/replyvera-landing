const fs = require('fs');
const path = require('path');

// Ensure root is correct
const templatePath = path.join(__dirname, 'index.html');
if (!fs.existsSync(templatePath)) {
    console.error('index.html template not found!');
    process.exit(1);
}

const html = fs.readFileSync(templatePath, 'utf8');

// Split layout
const navSplit = html.split('</nav>');
if (navSplit.length < 2) {
    console.error('Navbar closing tag </nav> not found in index.html');
    process.exit(1);
}
const rawHeader = navSplit[0] + '</nav>';
const restPart = navSplit[1];

const footerSplit = restPart.split('<!-- Footer -->');
if (footerSplit.length < 2) {
    console.error('Footer comment <!-- Footer --> not found in index.html');
    process.exit(1);
}
const rawFooter = '<!-- Footer -->' + footerSplit[1];

// Reformat headers and footers for industries/[id]/index.html (depth of 2)
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
        id: 'restaurants',
        title: 'Restaurants',
        metaTitle: 'ReplyVera for Restaurants | Automatic Google Review Responses',
        metaDesc: 'ReplyVera automatically drafts personalized Google review replies for restaurants, recognizes servers, and routes food safety or allergy reviews to your manager.',
        seoKeywords: 'restaurant Google review management, automatic review replies for restaurants, AI review responses for restaurants, restaurant reputation software, multi-location restaurant reviews',
        heroTitle: 'Every Restaurant Review<br />Answered <span class="text-gradient">Automatically</span>',
        heroSub: 'ReplyVera writes personalized Google review responses, recognizes standout employees, and sends food-safety, allergy, and serious service complaints to your team before anything is published.',
        targetCustomers: ['Independent restaurants', 'Restaurant groups', 'Cafés and Bars', 'Fast-casual brands', 'Franchise operators', 'Multi-location hospitality'],
        problems: [
            { icon: 'clock', title: 'Too Busy to Reply', text: 'Floor managers and chefs are too busy running shifts to write personalized responses to every Google review.' },
            { icon: 'copy', title: 'Repetitive Drafts', text: 'Copied-and-pasted "Thanks for visiting!" replies look lazy to prospective diners looking at your profiles.' },
            { icon: 'alert-triangle', title: 'Unanswered Complaints', text: 'Wait-time and slow service reviews remain unresolved, pulling down your local search rating.' },
            { icon: 'shield-alert', title: 'Food Safety Hazards', text: 'Allergy or food-safety claims require delicate, direct human handling rather than generic automation.' },
            { icon: 'map', title: 'Inconsistent Location Voice', text: 'Multi-location operators struggle to maintain a unified brand tone across downtown, suburban, or franchise branches.' },
            { icon: 'award', title: 'Missed Server Praise', text: 'Valuable feedback praising specific servers, hosts, or bartenders goes uncollected and unrewarded.' }
        ],
        features: [
            { icon: 'utensils', title: 'Food & Quality Detection', text: 'Extracts mentions of specific dishes (like truffle pasta) or delivery issues (like cold food) to reply accurately.' },
            { icon: 'clock', title: 'Service & Wait-Time Filters', text: 'Categorizes reviews flagging slow service or long weekend wait times and routes them for manager drafting.' },
            { icon: 'alert-circle', title: 'Allergy & Safety Escalations', text: 'Instantly identifies keywords like "allergy", "sick", or "food poisoning" and locks them in draft state for immediate approval.' },
            { icon: 'users', title: 'Server & Host Recognition', text: 'Automatically extracts names of servers or hosts mentioned, logging positive employee mentions on your analytics.' },
            { icon: 'map-pin', title: 'Multi-Location Tone Rules', text: 'Configure distinct brand voices or manager approvals for each store, franchise, or regional location.' },
            { icon: 'languages', title: 'Dine-In, Takeout, & Delivery Filters', text: 'Knows whether a review concerns a dine-in experience, takeout, or third-party delivery apps, adapting the response context.' }
        ],
        reviews: [
            {
                author: 'Sarah Jenkins',
                rating: 5,
                text: 'Maria made our anniversary dinner wonderful, and the pasta was excellent.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for celebrating your anniversary with us! We’re delighted that Maria helped make the evening special and that you enjoyed the pasta. We’ll be sure to share your kind words with her.'
            },
            {
                author: 'David Vance',
                rating: 3,
                text: 'The food was good, but we waited almost an hour.',
                status: 'Manager Approval Recommended',
                reply: 'Thank you for your honest feedback. We’re glad you enjoyed the food, but we’re sorry your wait was much longer than it should have been. We’re sharing this with our team so we can improve the experience during busy periods.'
            },
            {
                author: 'Claire Montgomery',
                rating: 1,
                text: 'I clearly explained my allergy, but the dish still contained the ingredient.',
                status: 'Sensitive Review - Escalation Required',
                reply: 'Critical Alert: Food-safety concern detected. Immediate manager approval required before publishing.'
            }
        ],
        insights: [
            'Wait-time complaints increased this month by 14%',
            'Maria received 9 positive server mentions in reviews',
            'Cleanliness concerns are concentrated at the Downtown location',
            'Weekend service complaints peak between 7:00 and 9:00 p.m.',
            'The truffle pasta is the most praised menu item across all branches'
        ],
        faqs: [
            { q: 'Can ReplyVera handle multiple restaurant locations?', a: 'Yes. Our Multi-Location and Agency plans allow you to manage multiple Google Business Profiles from a single dashboard, with distinct brand voice settings for each storefront.' },
            { q: 'Can food-safety reviews be blocked from automatic publishing?', a: 'Absolutely. ReplyVera’s sensitive-review filters scan for safety, allergy, or liability keywords. These reviews are immediately flagged, auto-publishing is blocked, and an alert is sent for manual manager follow-up.' },
            { q: 'Can ReplyVera recognize employees?', a: 'Yes. Our engine extracts staff names (like servers, bartenders, or hosts) and tags them. You can view employee leaderboard analytics to reward top-performing staff.' },
            { q: 'Does it handle Spanish reviews?', a: 'Yes. ReplyVera detects the language of the review and drafts responses in the same language. We currently support natural, fluent English and Spanish responses.' },
            { q: 'Does ReplyVera support Yelp or OpenTable?', a: 'ReplyVera currently supports Google Reviews, which represents the highest volume of local search actions. Integrations for Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        related: [
            { id: 'agencies', title: 'Agencies' },
            { id: 'pet-care', title: 'Pet Care' },
            { id: 'car-washes', title: 'Car Washes' }
        ]
    },
    {
        id: 'dentists',
        title: 'Dentists & Clinics',
        metaTitle: 'ReplyVera for Dentists & Clinics | Privacy-Conscious Google Review Replies',
        metaDesc: 'ReplyVera creates privacy-conscious Google review responses for dental and medical practices. Safely automate positive reviews and manually approve clinical concerns.',
        seoKeywords: 'dental review response software, Google review management for dentists, privacy-conscious dental review replies, automatic review replies for dental practices, dental reputation management',
        heroTitle: 'Privacy-Conscious Google Review Replies for <span class="text-gradient">Clinics</span>',
        heroSub: 'ReplyVera creates privacy-conscious Google review responses for your practice while sending billing, clinical, and sensitive patient concerns to your team for approval.',
        targetCustomers: ['Independent dental practices', 'Dental groups', 'Orthodontists & Pediatric dentists', 'Cosmetic dental practices', 'Medical clinics', 'Multi-location healthcare groups'],
        problems: [
            { icon: 'shield', title: 'Careful HIPAA Boundaries', text: 'Patient reviews require careful wording. Staff must avoid confirming clinical status or treatment details publicly.' },
            { icon: 'alert-triangle', title: 'Accidental Disclosures', text: 'Untrained front-desk staff can accidentally confirm a patient\'s identity or diagnoses in response text.' },
            { icon: 'shield-alert', title: 'Clinical Complaints', text: 'Clinical and treatment outcome complaints should never be auto-published and need specialist medical review.' },
            { icon: 'credit-card', title: 'Insurance & Billing Disputes', text: 'Complex billing disputes require private offline resolutions rather than public back-and-forth arguments.' },
            { icon: 'award', title: 'Missed Hygienist Praise', text: 'Praise for specific hygienists, assistants, or front-desk administrators is rarely collected to track performance.' },
            { icon: 'clock', title: 'Owners Lack Admin Time', text: 'Practice owners are busy treating patients and lack the time to respond consistently to online feedback.' }
        ],
        features: [
            { icon: 'eye-off', title: 'Diagnosis Redaction Filters', text: 'Scans and strips out direct medical words, preventing the assistant from confirming patient details.' },
            { icon: 'check-square', title: 'Status De-identification', text: 'Ensures responses thank the reviewer generally without confirming that they are active patients of the clinic.' },
            { icon: 'credit-card', title: 'Billing & Insurance Triggers', text: 'Identifies keywords like "bill", "insurance", "charge", or "overcharge" and automatically routes them to billing office approval.' },
            { icon: 'heart', title: 'Praise Recognition', text: 'Tags and recognizes specific dentists, hygienists, or receptionists to build positive staff morale.' },
            { icon: 'shield', title: 'Clinic Approval Workflows', text: 'Allows office managers or clinical directors to review drafts for negative reviews before going live on Google.' },
            { icon: 'globe', title: 'Bilingual Patient Communication', text: 'Responds naturally to patient feedback in both English and Spanish based on their written review.' }
        ],
        reviews: [
            {
                author: 'Robert Lee',
                rating: 5,
                text: 'Everyone was kind, and Jessica made me feel comfortable throughout the visit.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing your experience. We are pleased to hear that Jessica and our team helped create a comfortable and welcoming environment. We appreciate your feedback.'
            },
            {
                author: 'Samantha Brooks',
                rating: 2,
                text: 'I received a bill I was not expecting.',
                status: 'Office Approval Required',
                reply: 'Thank you for sharing your concern. We understand how frustrating an unexpected charge can be. Please contact our office manager directly so we can look into the billing details with you.'
            },
            {
                author: 'Marcus Vance',
                rating: 1,
                text: 'I had severe pain after the procedure and no one returned my call.',
                status: 'Sensitive Review - Manual Review Required',
                reply: 'Clinical concern detected. Manual review required before publishing. Response locked in draft state.'
            }
        ],
        insights: [
            'Front-desk communication received repeated praise in 8 reviews',
            'Billing and unexpected fee complaints rose by 10% this month',
            'Jessica (Hygienist) received 7 positive mentions',
            'Wait-time complaints are concentrated at the Westside branch',
            'Two clinical feedback reviews are locked in drafts pending board review'
        ],
        faqs: [
            { q: 'Does ReplyVera reveal patient information?', a: 'No. ReplyVera is built with privacy guardrails. It never confirms that the reviewer was a patient, never discloses clinical details, and drafts generic, polite, and safe responses.' },
            { q: 'Can clinical complaints be excluded from auto-publishing?', a: 'Yes. Any review mentioning pain, procedures, clinical failures, or diagnoses is immediately flagged as a clinical concern and routed for manual staff review.' },
            { q: 'Can multiple practice locations be managed?', a: 'Yes. You can manage multiple clinic locations, assign separate staff permissions, and track patient satisfaction trends across branches.' },
            { q: 'Can staff members approve replies?', a: 'Yes. You can invite office managers, administrative coordinators, or practitioners to review and approve drafts before publication.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently supports Google Reviews, as it is the most critical driver of local clinic search visibility. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        related: [
            { id: 'agencies', title: 'Agencies' }
        ]
    },
    {
        id: 'agencies',
        title: 'Marketing Agencies',
        metaTitle: 'ReplyVera for Agencies | Multi-Client Google Review Reply Management',
        metaDesc: 'Manage Google review replies across all your clients and locations from a single dashboard. Automated drafts, client approval links, and brand voice matching.',
        seoKeywords: 'Google review software for agencies, agency review management platform, automatic review replies for agency clients, white-label Google review responses, multi-client reputation management',
        heroTitle: 'Manage Every Client\'s Google Review Replies from <span class="text-gradient">One Dashboard</span>',
        heroSub: 'ReplyVera helps agencies automate Google review responses, preserve each client\'s brand voice, and route sensitive reviews for client approval.',
        targetCustomers: ['Local marketing agencies', 'SEO and Social Media agencies', 'Reputation management consultants', 'Web-design agencies', 'Franchise marketing teams'],
        problems: [
            { icon: 'log-out', title: 'Manual Account Switching', text: 'Teams waste hours logging in and out of client Google Business Profiles every week.' },
            { icon: 'clock', title: 'Staff Time Sink', text: 'Writing standard positive review replies drains high-value account manager hours.' },
            { icon: 'languages', title: 'Unique Client Voices', text: 'Each client (e.g. restaurant vs. dental clinic) requires a completely different tone and policy.' },
            { icon: 'mail', title: 'Slow Client Approvals', text: 'Chasing clients for negative review responses delays resolutions and ruins response speed.' },
            { icon: 'bar-chart', title: 'Scattered Performance Reports', text: 'Consolidating reputation metrics for client review reports is painful and unautomated.' },
            { icon: 'dollar-sign', title: 'Thin Reseller Margins', text: 'Agencies need a software pricing structure that leaves healthy margins for resale and markup.' }
        ],
        features: [
            { icon: 'layout', title: 'Central Client Hub', text: 'Connect, monitor, and respond across unlimited client accounts from a single agency interface.' },
            { icon: 'settings', title: 'Client Tone Profiles', text: 'Configure custom voice tones (e.g. professional clinic, friendly café) to match each client\'s brand.' },
            { icon: 'link', title: 'Client Approval Links', text: 'Generate white-labeled external links for clients to approve negative review drafts without logging in.' },
            { icon: 'users', title: 'Team Access Control', text: 'Assign team members to specific clients or locations, protecting account privacy.' },
            { icon: 'shield-alert', title: 'Smart Escalation Rules', text: 'Safely auto-reply to positive reviews, while locking negative reviews in drafts for client confirmation.' },
            { icon: 'file-text', title: 'Branded Analytics Reports', text: 'Export reputation performance data to share directly with clients (white-label reporting planned).' }
        ],
        reviews: [
            {
                author: 'Client: The Mudhouse (Restaurant)',
                rating: 5,
                text: 'The food was excellent and the server Maria was super helpful.',
                status: 'Auto-Published (Tone: Friendly)',
                reply: 'Thank you so much! We are glad you enjoyed the food and that Maria took such great care of you. We\'ll share this with her!'
            },
            {
                author: 'Client: Oak Dental (Clinic)',
                rating: 2,
                text: 'Billing was confusing, I got charged twice.',
                status: 'Escalated - Sent to Oak Dental Manager',
                reply: 'Thank you for your feedback. We understand billing issues are frustrating. Please contact our office manager directly so we can resolve this.'
            },
            {
                author: 'Client: Bark Lodge (Pet-Care)',
                rating: 1,
                text: 'My dog came home with a scratch on his paw.',
                status: 'Sensitive Review - Sent Alert to Owner',
                reply: 'Animal-safety concern detected. Response locked in drafts. Immediate email alert dispatched to Bark Lodge owner.'
            }
        ],
        insights: [
            '24 client locations connected across dashboard',
            '5 reviews currently pending client approval',
            '3 client accounts have unanswered negative reviews',
            'Average response velocity is 4.2 hours across clients',
            'Tones configured: 14 Friendly, 8 Professional, 2 Empathetic'
        ],
        faqs: [
            { q: 'Can every client have a different brand voice?', a: 'Yes. Every business location or profile has its own settings. You can configure a unique tone, automatic publish criteria, and approval workflows.' },
            { q: 'Can clients approve responses without accessing the full dashboard?', a: 'Yes. ReplyVera generates secure client approval links. Clients can approve or edit drafts from their phone without full system access.' },
            { q: 'Can team members manage assigned clients?', a: 'Yes. Our agency portal lets you assign specific staff members or account managers to specific client profiles.' },
            { q: 'Can the agency resell ReplyVera?', a: 'Absolutely. You can package ReplyVera\'s review automation as a premium add-on to your local SEO or reputation services.' },
            { q: 'Which platforms are supported?', a: 'We currently support Google Reviews. Integrations for Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future agency releases.' }
        ],
        related: [
            { id: 'restaurants', title: 'Restaurants' },
            { id: 'dentists', title: 'Dentists' }
        ]
    },
    {
        id: 'martial-arts',
        title: 'Martial-Arts Schools',
        metaTitle: 'ReplyVera for Martial Arts Schools | Google Review Auto-Replies',
        metaDesc: 'Automate Google review replies for your martial arts dojo or academy. Respond to parent praise, track coach mentions, and escalate safety concerns.',
        seoKeywords: 'martial arts review software, karate school Google review management, automatic review replies for martial arts, martial arts reputation management',
        heroTitle: 'Every Martial Arts Review<br />Answered <span class="text-gradient">Automatically</span>',
        heroSub: 'ReplyVera responds to routine parent and student reviews, recognizes outstanding instructors, and keeps safety, injury, bullying, and membership disputes under your control.',
        targetCustomers: ['Karate dojos', 'Taekwondo schools', 'BJJ academies', 'Kickboxing gyms', 'MMA training centers', 'Multi-location franchise schools'],
        problems: [
            { icon: 'swords', title: 'Owners Busy on the Mats', text: 'Dojo owners are teaching classes and leading training, leaving zero time to manage Google reviews.' },
            { icon: 'smile', title: 'Parents Expect Caring Replies', text: 'Parents trust you with their kids and expect personal, encouraging responses to their feedback.' },
            { icon: 'award', title: 'Missed Instructor Praise', text: 'Review praise for specific coaches or Senseis goes untracked, missing great staff feedback.' },
            { icon: 'dollar-sign', title: 'Public Billing Disputes', text: 'Membership cancellations or contract disputes can quickly blow up into negative public reviews.' },
            { icon: 'shield-alert', title: 'Safety Concerns Publicized', text: 'Injury or safety complaints require immediate executive attention before a reply is posted.' },
            { icon: 'map-pin', title: 'Inconsistent Multi-Gym Tone', text: 'Dojos with multiple branches struggle to ensure each manager replies professionally.' }
        ],
        features: [
            { icon: 'award', title: 'Sensei & Coach Recognition', text: 'Identifies student praise for specific coaches and attributes them to employee leaderboard profiles.' },
            { icon: 'users', title: 'Parent-Friendly Language', text: 'Drafts warm, community-oriented responses highlighting confidence, respect, and focus.' },
            { icon: 'alert-triangle', title: 'Injury & Safety Escalations', text: 'Identifies keywords like "hurt", "injured", "accident", or "safety" and flags them for immediate owner review.' },
            { icon: 'ban', title: 'Bullying & Harassment Scanners', text: 'Scans reviews for allegations of bullying or discrimination, ensuring zero auto-posting occurs.' },
            { icon: 'credit-card', title: 'Membership & Cancellation Filters', text: 'Detects refund or contract-related disputes and routes them directly to admin drafts.' },
            { icon: 'layout', title: 'Multi-Academy Controls', text: 'Oversee review responses, local SEO rankings, and metrics for all your schools in one panel.' }
        ],
        reviews: [
            {
                author: 'Jessica Miller',
                rating: 5,
                text: 'My daughter has gained so much confidence. Coach Daniel is wonderful.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing this! We’re thrilled to hear that your daughter is becoming more confident and that Coach Daniel has made such a positive impact. We’ll be sure to share your kind words with him.'
            },
            {
                author: 'Tom Harrison',
                rating: 2,
                text: 'They made it extremely difficult to cancel my membership.',
                status: 'Owner Approval Required',
                reply: 'Thank you for your feedback. We aim to make membership management clear. Please contact our school director directly so we can resolve your account cancellation details.'
            },
            {
                author: 'Amanda Sterling',
                rating: 1,
                text: 'My child was injured on the mat, and no one contacted me.',
                status: 'Child-Safety Concern - Immediate Escalation Required',
                reply: 'Immediate escalation triggered. Review locked in drafts. Notification dispatched to school owner.'
            }
        ],
        insights: [
            'Coach Daniel received 8 positive mentions in parent reviews',
            'Membership and contract complaints increased by 5%',
            'Confidence and discipline were mentioned in 12 reviews',
            'One school location has repeated cleanliness mentions',
            'Two student safety concerns require immediate owner review'
        ],
        faqs: [
            { q: 'Can ReplyVera handle multiple martial arts locations?', a: 'Yes. Our platform allows multi-school owners and franchise directors to connect and manage all local profiles from one main screen.' },
            { q: 'Can staff members approve replies?', a: 'Yes. You can configure permission levels so front-desk coordinators, program directors, or managers can approve replies.' },
            { q: 'Does it recognize Spanish reviews?', a: 'Yes. ReplyVera reads and replies in the language of the reviewer, supporting both English and Spanish.' },
            { q: 'How does it help with SEO?', a: 'Responding to Google Reviews quickly is a major ranking factor for local searches. ReplyVera helps you keep a 100% response rate to boost your search prominence.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently automates Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future dojo packages.' }
        ],
        related: [
            { id: 'childcare', title: 'Childcare' },
            { id: 'tutoring', title: 'Tutoring' }
        ]
    },
    {
        id: 'childcare',
        title: 'Childcare & Preschool',
        metaTitle: 'ReplyVera for Childcare & Preschool | Empathic Review Reply Management',
        metaDesc: 'Automate Google review replies for daycares, childcare centers, and preschools. Safely reply to parents, tag teachers, and lock supervision reviews.',
        seoKeywords: 'childcare review management, daycare Google review software, automatic review replies for preschools, childcare reputation management',
        heroTitle: 'Every Childcare Review<br />Answered <span class="text-gradient">With Care</span>',
        heroSub: 'ReplyVera safely handles routine parent reviews, recognizes great teachers, and immediately escalates concerns involving supervision, injuries, allergies, staff conduct, or child privacy.',
        targetCustomers: ['Daycares', 'Preschools', 'Early learning centers', 'Montessori schools', 'Childcare franchises', 'Before-and-after school programs'],
        problems: [
            { icon: 'baby', title: 'Busy Daycare Directors', text: 'Directors are overseeing classrooms, licensing, and parenting communications, leaving zero time for reviews.' },
            { icon: 'heart', title: 'Parent Trust is Vital', text: 'Childcare is deeply personal. Parents require empathetic, professional, and clear communication.' },
            { icon: 'award', title: 'Missed Teacher Kudos', text: 'Praise for outstanding early education teachers is easily buried in old online reviews.' },
            { icon: 'lock', title: 'Strict Child Privacy', text: 'Replying to reviews requires care to avoid revealing children\'s names, schedules, or sensitive details.' },
            { icon: 'shield-alert', title: 'Safety Complaints Escalation', text: 'Issues involving supervision, allergies, or injuries must never be answered automatically.' },
            { icon: 'trending-up', title: 'Staff Turnover Alerts', text: 'Public concerns regarding staff turnover should be identified early to protect enrollment.' }
        ],
        features: [
            { icon: 'award', title: 'Teacher Mention Tracking', text: 'Extracts mentions of specific teachers (like Ms. Ana) and logs their positive reviews.' },
            { icon: 'shield', title: 'Privacy-Aware Responses', text: 'Ensures replies never confirm children\'s enrollments, schedules, or private details.' },
            { icon: 'alert-triangle', title: 'Supervision & Safety Flags', text: 'Locks reviews containing words like "alone", "injured", "fall", or "unattended" from auto-publishing.' },
            { icon: 'coffee', title: 'Warm Parenting Tone', text: 'Generates warm, reassuring, and community-focused replies matching preschool values.' },
            { icon: 'users', title: 'Staff Turnover Metrics', text: 'Identifies public reviews mentioning staff changes to help management monitor reputational trends.' },
            { icon: 'map', title: 'Multi-Center Administration', text: 'Manage childcare centers across multiple cities from one dashboard with regional permissions.' }
        ],
        reviews: [
            {
                author: 'Rebecca Thorne',
                rating: 5,
                text: 'Ms. Ana is amazing, and our daughter loves going every morning.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for your kind feedback! We’re so pleased to hear that Ms. Ana has helped create such a positive and welcoming experience for your daughter. We’ll be sure to share your appreciation with her.'
            },
            {
                author: 'Liam Patterson',
                rating: 3,
                text: 'Communication from the office has been inconsistent.',
                status: 'Director Approval Recommended',
                reply: 'Thank you for sharing your experience. We aim to keep communication clear and consistent. We\'ve shared your note with our admin team to improve our center alerts.'
            },
            {
                author: 'Rachel Albright',
                rating: 1,
                text: 'My child was injured, and I was not informed until pickup.',
                status: 'Supervision Alert - Director Action Required',
                reply: 'Serious safety concern detected. Auto-publishing blocked. Escalated immediately to childcare center director.'
            }
        ],
        insights: [
            'Communication and admin complaints increased at the Suburban center',
            'Ms. Ana received 10 positive parent mentions this quarter',
            '3 review comments mention staff turnover concern',
            'One allergy or meal concern requires director check',
            'Cleanliness feedback ratings improved by 12% this month'
        ],
        faqs: [
            { q: 'Does ReplyVera reveal child information?', a: 'No. ReplyVera is programmed to write warm but generic replies that never confirm child identity, enrollment status, or program details, keeping privacy safe.' },
            { q: 'Can supervision or allergy complaints be blocked from auto-publishing?', a: 'Yes. Any review containing words related to injuries, supervision, medication, or food allergies is immediately locked in drafts for director review.' },
            { q: 'Can multiple daycare locations be managed?', a: 'Yes. Our platform connects multiple daycare Business Profiles, allowing group operators or franchise directors to manage review feeds from one dashboard.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. ReplyVera handles responses in both English and Spanish, replying to parents in their written language.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently supports Google Reviews, which is key for local preschool search rankings. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        related: [
            { id: 'tutoring', title: 'Tutoring' },
            { id: 'martial-arts', title: 'Martial Arts' }
        ]
    },
    {
        id: 'tutoring',
        title: 'Tutoring & Learning',
        metaTitle: 'ReplyVera for Tutoring Centers | Google Review Management',
        metaDesc: 'Automate Google review replies for tutoring and learning centers. Respond to parent praise, protect student privacy, and escalate academic score guarantee claims.',
        seoKeywords: 'tutoring center review software, Google review replies for tutoring businesses, learning center reputation management, automatic tutoring review responses',
        heroTitle: 'Turn Every Parent Review<br />Into <span class="text-gradient">Student Trust</span>',
        heroSub: 'ReplyVera writes personalized Google review responses, recognizes outstanding tutors, and carefully handles concerns involving progress, refunds, billing, or student safety.',
        targetCustomers: ['Tutoring centers', 'Test prep academies', 'Learning franchises', 'STEM centers', 'Language schools', 'Private educators'],
        problems: [
            { icon: 'book', title: 'Directors Teaching Classes', text: 'Learning center directors spend their afternoons teaching and enrolling students, leaving no time to monitor reviews.' },
            { icon: 'smile', title: 'Parents Value Quick Feedback', text: 'Parents look closely at reviews when selecting educators, making prompt replies critical.' },
            { icon: 'award', title: 'Uncollected Tutor Praise', text: 'Tutors who help children score high on tests deserve recognition, but positive feedback is rarely aggregated.' },
            { icon: 'lock', title: 'Student Privacy Rules', text: 'Educators must be extremely careful to protect minor students\' full names and academic records.' },
            { icon: 'dollar-sign', title: 'Score Guarantees & Claims', text: 'Claims regarding promised test score improvements need careful review to avoid legal liabilities.' },
            { icon: 'credit-card', title: 'Billing & Refund Disputes', text: 'Disputes over monthly tuition or package refunds must be handled quietly and offline.' }
        ],
        features: [
            { icon: 'award', title: 'Tutor Praise Tracking', text: 'Extracts references to specific educators (like Emily) and logs their positive review highlights.' },
            { icon: 'lock', title: 'Privacy-Conscious Safeguards', text: 'Ensures responses thank the reviewer without confirming minor student names or class grades.' },
            { icon: 'alert-triangle', title: 'Academic Guarantee Scanners', text: 'Identifies words like "guaranteed score", "pass", or "fail" and routes them to managers for approval.' },
            { icon: 'credit-card', title: 'Refund & Billing Filters', text: 'Automatically blocks auto-publishing for billing issues, routing them to director drafts.' },
            { icon: 'languages', title: 'Fluent Bilingual Support', text: 'Responds naturally to parent reviews written in both English and Spanish.' },
            { icon: 'map', title: 'Multi-Center Administration', text: 'Allows learning center franchises to monitor local ratings and response times across all cities.' }
        ],
        reviews: [
            {
                author: 'Jonathan Sterling',
                rating: 5,
                text: 'Emily helped my son understand algebra and become more confident.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing your experience! We’re delighted that Emily helped make algebra more understandable and supported your son’s confidence. We’ll be sure to share your kind words with her.'
            },
            {
                author: 'Claire Winters',
                rating: 2,
                text: 'We did not see the test score improvement we expected.',
                status: 'Manager Approval Required',
                reply: 'Thank you for your feedback. We aim to help every student succeed. Please reach out to our center director so we can review your child\'s progress plan and support options.'
            },
            {
                author: 'Michael Brody',
                rating: 1,
                text: 'The center promised a specific test-score increase but refused a refund.',
                status: 'Academic Claim Detected - Manual Review Required',
                reply: 'Guarantee concern detected. Response locked in drafts. Immediate email alert dispatched to learning center manager.'
            }
        ],
        insights: [
            'Emily (Algebra Tutor) received 7 positive parent mentions',
            'Scheduling and session booking complaints increased this month',
            'Parents frequently praise confidence and score improvement',
            'Refund and billing complaints are concentrated at the Suburban location',
            'Test-preparation programs have the highest review satisfaction ratings'
        ],
        faqs: [
            { q: 'Does ReplyVera reveal minor student information?', a: 'No. ReplyVera is programmed to protect privacy. It drafts professional responses that thank the parents without referencing minor names or grades.' },
            { q: 'Can score guarantee concerns be blocked from auto-publishing?', a: 'Yes. ReplyVera\'s academic claim scanners block auto-publishing for any reviews mentioning promises, guarantees, or grade scores, ensuring manager approval.' },
            { q: 'Can multiple center locations be managed?', a: 'Yes. Franchise owners and regional managers can connect multiple Google Business Profile locations and monitor everything from one screen.' },
            { q: 'Can instructors approve replies?', a: 'Yes. You can invite center directors, coordinators, or administrators to review and approve drafts.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently automates Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future tutoring center rollouts.' }
        ],
        related: [
            { id: 'childcare', title: 'Childcare' },
            { id: 'martial-arts', title: 'Martial Arts' }
        ]
    },
    {
        id: 'pet-care',
        title: 'Pet Care & Boarding',
        metaTitle: 'ReplyVera for Pet Care | Google Review Auto-Replies for Groomers & daycares',
        metaDesc: 'Automate Google review replies for dog daycares, pet boarding resorts, and grooming salons. Safely reply to owners, tag groomers, and escalate injuries.',
        seoKeywords: 'pet boarding review management, Google review replies for dog daycare, grooming salon reputation management, pet-care review software',
        heroTitle: 'Every Pet-Care Review<br />Answered <span class="text-gradient">Automatically</span>',
        heroSub: 'ReplyVera writes warm Google review responses, recognizes outstanding staff, and immediately escalates concerns involving injuries, illness, lost pets, grooming incidents, or animal safety.',
        targetCustomers: ['Dog daycares', 'Pet boarding resorts', 'Kennels', 'Grooming salons', 'Pet hotels', 'Multi-location pet care chains'],
        problems: [
            { icon: 'dog', title: 'Attendants Busy with Pets', text: 'Kennel attendants and play handlers are busy caring for animals, leaving no time to sit at a computer.' },
            { icon: 'heart', title: 'Pet Owners Seek Reassurance', text: 'Pet owners consider their dogs and cats as family. They look for warm, personalized, and rapid replies.' },
            { icon: 'award', title: 'Uncollected Groomer Praise', text: 'Praise for talented pet groomers or handlers gets buried, missing opportunities to reward staff.' },
            { icon: 'clock', title: 'Grooming Appointment Delays', text: 'Delays in pickup or scheduling bottlenecks can lead to negative public feedback on Google.' },
            { icon: 'shield-alert', title: 'Animal Safety Claims', text: 'Any review mentioning dog fights, injuries, escape, or sickness requires immediate executive drafting.' },
            { icon: 'map', title: 'Inconsistent Franchise Voice', text: 'Group operators struggle to keep a consistent, pet-friendly tone across all daycares.' }
        ],
        features: [
            { icon: 'scissors', title: 'Groomer & Staff Mentions', text: 'Identifies client praise for specific groomers or handlers (like Jordan) and highlights them.' },
            { icon: 'clock', title: 'Appointment Delay Scanners', text: 'Identifies wait-time or delay complaints and routes them to location managers for follow-up.' },
            { icon: 'alert-triangle', title: 'Animal Injury Lock', text: 'Detects keywords like "hurt", "injury", "cut", or "vet" and blocks auto-posting to prevent liability.' },
            { icon: 'shield', title: 'Lost Pet Warnings', text: 'Identifies mentions of escape or lost pets, triggering immediate email alerts to the facility owner.' },
            { icon: 'heart', title: 'Pet-Friendly Tone Engine', text: 'Generates warm, pet-loving, and reassuring responses referencing specific details from the review.' },
            { icon: 'languages', title: 'Bilingual Owner Support', text: 'Responds naturally to client feedback in both English and Spanish.' }
        ],
        reviews: [
            {
                author: 'Mark Douglas',
                rating: 5,
                text: 'Bella loves daycare, and Jordan always greets her by name.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for sharing this! We love hearing that Bella enjoys her daycare visits and that Jordan makes her feel so welcome. We’ll be sure to share your kind words with the team.'
            },
            {
                author: 'Sandra Collins',
                rating: 3,
                text: 'Our grooming appointment took much longer than expected.',
                status: 'Manager Approval Recommended',
                reply: 'Thank you for your feedback. We\'re glad you chose us, but we\'re sorry the grooming took longer than planned. We\'re reviewing our schedule flow to improve our pickup times.'
            },
            {
                author: 'Philip Sterling',
                rating: 1,
                text: 'My dog was injured while staying at the facility.',
                status: 'Animal-Safety Concern - Immediate Owner Action Required',
                reply: 'Animal-safety concern detected. Response locked in drafts. Immediate alert dispatched to facility owner.'
            }
        ],
        insights: [
            'Jordan received 9 positive staff mentions in client reviews',
            'Grooming wait-time complaints rose by 8% this month',
            'One boarding location has repeated cleanliness mentions',
            'Clients frequently praise daycare photo updates',
            'Two animal-injury complaints require immediate manager check'
        ],
        faqs: [
            { q: 'Can ReplyVera manage multiple locations?', a: 'Yes. Our Multi-Location plan lets you connect multiple Google Business Profiles to track boarding or grooming reviews across all centers.' },
            { q: 'Can animal safety complaints be blocked from auto-publishing?', a: 'Yes. Any reviews mentioning cuts, injuries, escape, illnesses, or vet visits are immediately locked in drafts, blocking auto-replies.' },
            { q: 'Can we reward staff members praised in reviews?', a: 'Yes. ReplyVera identifies employee names and aggregates their positive mentions in the dashboard leaderboard.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. ReplyVera automatically translates and replies to pet owners in their native language.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently automates Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        related: [
            { id: 'agencies', title: 'Agencies' },
            { id: 'restaurants', title: 'Restaurants' },
            { id: 'car-washes', title: 'Car Washes' }
        ]
    },
    {
        id: 'car-washes',
        title: 'Car Washes',
        metaTitle: 'ReplyVera for Car Washes | Automatic Google Review Responses',
        metaDesc: 'Automate Google review replies for express car washes, detailing centers, and multi-location operators. Track damage claims and highlight membership complaints.',
        seoKeywords: 'car wash review management, Google review replies for car washes, car wash reputation software, multi-location car wash reviews',
        heroTitle: 'Every Car-Wash Review<br />Answered <span class="text-gradient">Automatically</span>',
        heroSub: 'ReplyVera handles routine Google reviews, recognizes great employees, and sends vehicle-damage, billing, membership, and safety complaints to management.',
        targetCustomers: ['Express car washes', 'Detailing centers', 'Self-serve bays', 'Multi-location wash chains', 'Franchise operators'],
        problems: [
            { icon: 'car', title: 'Operators Busy on Site', text: 'Managers are maintaining equipment, managing site attendants, and managing wash volume, leaving no time for reviews.' },
            { icon: 'alert-triangle', title: 'Vehicle Damage Claims', text: 'Scratched paint or mirror damage complaints need instant owner alerts to verify cameras before replying.' },
            { icon: 'credit-card', title: 'Membership Cancel Issues', text: 'Complex monthly wash pass cancellation issues can lead to angry, unresolved reviews on Google.' },
            { icon: 'clock', title: 'Long Lines & Wait Times', text: 'Peak weekend traffic delays can draw negative reviews, pulling down your local search rating.' },
            { icon: 'users', title: 'Attendant Praise Missed', text: 'Reviews thanking friendly payment or prep attendants are rarely logged to track employee performance.' },
            { icon: 'map-pin', title: 'Franchise Consistency', text: 'Dozens of locations must maintain a consistent tone, which is hard to enforce manually.' }
        ],
        features: [
            { icon: 'alert-triangle', title: 'Damage Claim Detection', text: 'Instantly identifies words like "scratch", "damage", "mirror", or "dent" and blocks auto-posting.' },
            { icon: 'credit-card', title: 'Membership Filter Rules', text: 'Detects monthly pass cancel complaints, routing them directly to customer support drafts.' },
            { icon: 'sliders', title: 'Equipment Failure Alarms', text: 'Identifies reviews mentioning broken payment terminals or broken vacuums for immediate action.' },
            { icon: 'users', title: 'Attendant Praise Aggregator', text: 'Extracts names of detailing or prep staff mentioned, celebrating top performers.' },
            { icon: 'map', title: 'Multi-Site Dashboard', text: 'Monitor ratings, review volumes, and response metrics across all locations in one panel.' },
            { icon: 'globe', title: 'Bilingual Wash Responses', text: 'Automatically detects Spanish reviews and drafts replies in fluent Spanish.' }
        ],
        reviews: [
            {
                author: 'Gordon Fisher',
                rating: 5,
                text: 'Excellent wash, and Marcus helped me with the payment machine.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for your review! We’re glad you had a great wash and that Marcus was able to help with the payment machine. We’ll be sure to share your kind words with him.'
            },
            {
                author: 'Terry Cooper',
                rating: 3,
                text: 'The vacuums were not working, and the line was very long.',
                status: 'Location Manager Review Required',
                reply: 'Thank you for letting us know. We\'re sorry the vacuums were out of service and that you experienced a delay. We\'re sharing this with our site team to inspect the equipment.'
            },
            {
                author: 'Victor Grant',
                rating: 1,
                text: 'The wash scratched the side of my vehicle.',
                status: 'Damage Complaint - Immediate Manager Alert',
                reply: 'Vehicle-damage complaint detected. Auto-reply blocked. Review escalated to site manager.'
            }
        ],
        insights: [
            'Vacuum out of service complaints increased by 10% at the Westside wash',
            'Marcus received 6 positive attendant mentions this month',
            'Membership cancel disputes rose slightly',
            'Weekend wait-time complaints are peaking between 10 AM and 2 PM',
            'Two vehicle damage complaints require camera review'
        ],
        faqs: [
            { q: 'Can ReplyVera handle multiple car wash locations?', a: 'Yes. Our platform connects multiple Google Business Profile locations, making it simple for group operators or franchise owners to manage feeds.' },
            { q: 'Can vehicle damage complaints be blocked from auto-publishing?', a: 'Yes. ReplyVera\'s damage claim filters immediately flag and hold any reviews containing words like scratch, dent, mirror, or damage, blocking auto-replies.' },
            { q: 'Does it recognize staff members?', a: 'Yes. The system parses attendant, detailer, or cashier names from positive reviews to log positive staff mentions.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. ReplyVera responds to reviews in the language they were written, supporting both English and Spanish.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently supports Google Reviews, which drives the local SEO maps search. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future wash packages.' }
        ],
        related: [
            { id: 'restaurants', title: 'Restaurants' },
            { id: 'pet-care', title: 'Pet Care' },
            { id: 'laundromats', title: 'Laundromats' }
        ]
    },
    {
        id: 'laundromats',
        title: 'Laundromats',
        metaTitle: 'ReplyVera for Laundromats | Automatic Google Review Responses',
        metaDesc: 'Automate Google review replies for laundromats, wash-and-fold services, and dry cleaners. Detect broken machines, handle refunds, and manage multi-location stores.',
        seoKeywords: 'laundromat review management, Google review replies for laundromats, laundry business reputation software, automatic review responses for dry cleaners',
        heroTitle: 'Keep Every Laundromat Review <span class="text-gradient">Clean and Professional</span>',
        heroSub: 'ReplyVera automatically responds to routine Google reviews and alerts owners when customers report broken machines, refund problems, missing clothing, cleanliness issues, or safety concerns.',
        targetCustomers: ['Independent Laundromats', 'Laundry franchises', 'Wash-and-fold services', 'Dry cleaners', 'Pickup and delivery laundry fleets'],
        problems: [
            { icon: 'washing-machine', title: 'Owners Managing Equipment', text: 'Owners spend their days fixing machinery, emptying coin boxes, and coordinating utilities, leaving zero time for reviews.' },
            { icon: 'alert-triangle', title: 'Broken Machine Complaints', text: 'Reviews about broken washers or out-of-service dryers can discourage new customers from visiting.' },
            { icon: 'credit-card', title: 'Coin & Card Refund Issues', text: 'Lost money in coin slide or app errors can lead to angry, unresolved reviews on Google.' },
            { icon: 'package', title: 'Missing Wash & Fold Items', text: 'Claims of lost laundry or mixed-up shirts require immediate manager review to prevent liability.' },
            { icon: 'trash-2', title: 'Trash & Cleanliness Issues', text: 'Dirty folding tables or full trash cans can quickly pull down a laundromat\'s rating.' },
            { icon: 'users', title: 'Attendant Praise Missed', text: 'Praise for friendly wash-and-fold attendants or cleaners goes unnoticed and unlogged.' }
        ],
        features: [
            { icon: 'washing-machine', title: 'Broken Machine Scanners', text: 'Scans reviews for keywords like "broken", "out of order", or "stolen coin", alerting maintenance.' },
            { icon: 'dollar-sign', title: 'Refund Dispute Routing', text: 'Detects money or card charge errors, holding them in drafts for store manager check.' },
            { icon: 'package', title: 'Wash & Fold Quality Logs', text: 'Identifies missing laundry or wash quality issues for drop-off orders.' },
            { icon: 'trash-2', title: 'Cleanliness Alert Scanners', text: 'Monitors comments regarding trash, floors, or folding tables to preserve standards.' },
            { icon: 'users', title: 'Linda & Attendant Praise', text: 'Attributes positive review praise to specific attendants (like Linda) to reward staff.' },
            { icon: 'map-pin', title: 'Multi-Store Dashboards', text: 'Manage multiple coin-ops or laundry services from one centralized agency dashboard.' }
        ],
        reviews: [
            {
                author: 'Dorothy Miller',
                rating: 5,
                text: 'The store was spotless, and Linda was extremely helpful.',
                status: 'Safe to Auto-Publish',
                reply: 'Thank you for your kind review! We’re glad you found the store clean and that Linda provided such helpful service. We’ll be sure to share your feedback with her.'
            },
            {
                author: 'Arthur Vance',
                rating: 3,
                text: 'Three washers were out of service.',
                status: 'Location Follow-Up Recommended',
                reply: 'Thank you for letting us know. We’re sorry several machines were unavailable during your visit. We’re sharing this with the location team so the equipment can be reviewed.'
            },
            {
                author: 'Gary Higgins',
                rating: 1,
                text: 'One of my items was missing from my wash-and-fold order.',
                status: 'Missing-Item Dispute - Manager Review Required',
                reply: 'Missing clothing claim detected. Response locked in drafts. Escales immediately to store manager.'
            }
        ],
        insights: [
            'Washing machine out-of-order complaints rose at the Westside store',
            'Linda received 5 positive attendant mentions this month',
            'Refund and coin complaints rose by 6%',
            'Customers frequently praise clean folding tables and quick wash cycles',
            'Two missing-clothing drop-off claims require immediate camera check'
        ],
        faqs: [
            { q: 'Does ReplyVera handle multiple laundromat locations?', a: 'Yes. Our dashboard connects multiple Google Business Profile locations, making it easy for multi-store owners to manage reviews.' },
            { q: 'Can broken-machine reviews be blocked from auto-publishing?', a: 'Yes. Any reviews mentioning broken washers, dryers, app billing issues, or lost coins are held in drafts for manager follow-up.' },
            { q: 'Can we reward laundry attendants who receive positive reviews?', a: 'Yes. The system tags attendant names (like Linda) and aggregates their positive mentions in the analytics.' },
            { q: 'Does it support Spanish reviews?', a: 'Yes. ReplyVera responds to reviews in the language they were written, supporting both English and Spanish.' },
            { q: 'Which review platforms are supported?', a: 'ReplyVera currently automates Google Reviews, which drives local laundromat maps SEO. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.' }
        ],
        related: [
            { id: 'agencies', title: 'Agencies' },
            { id: 'restaurants', title: 'Restaurants' },
            { id: 'car-washes', title: 'Car Washes' }
        ]
    }
];

// Helper to compile dynamic category body
function buildCategoryBody(ind) {
    // Generate Target Customers Block HTML
    const customersHtml = ind.targetCustomers.map(cust => `
        <div style="display:flex; align-items:center; gap:8px; color:var(--text-primary-current); font-size:0.95rem;">
            <i data-lucide="check-circle" style="color:var(--accent); width:18px; height:18px; flex-shrink:0;"></i> ${cust}
        </div>
    `).join('');

    // Generate Customer Problems Block HTML
    const problemsHtml = ind.problems.map(prob => `
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:24px; border-radius:12px; transition:transform var(--transition-fast);" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
            <div style="width:40px; height:40px; background:rgba(99, 102, 241, 0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:16px;">
                <i data-lucide="${prob.icon}" style="width:20px; height:20px;"></i>
            </div>
            <h3 style="font-size:1.15rem; font-weight:700; color:#FFF; margin-bottom:8px;">${prob.title}</h3>
            <p style="font-size:0.88rem; color:var(--text-secondary-current); line-height:1.5;">${prob.text}</p>
        </div>
    `).join('');

    // Generate Features Block HTML
    const featuresHtml = ind.features.map((feat, idx) => `
        <div class="feature-split" style="margin-bottom: 80px; ${idx % 2 === 1 ? 'flex-direction: row-reverse !important;' : ''}">
            <div class="feature-content-box" style="flex:1;">
                <div class="label-pill"><i data-lucide="${feat.icon}" style="width:12px; height:12px;"></i> ${feat.title}</div>
                <h2 class="mb-4" style="font-size:1.8rem; font-weight:800; color:#FFF;">Built for ${ind.title}</h2>
                <p class="mb-6" style="font-size:1.05rem; color:var(--text-secondary-current);">${feat.text}</p>
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
                        <span>Topic Extracted:</span> <span style="color:#FFF;">"${feat.title}"</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                        <span>Safety Verdict:</span> <span style="color:var(--accent);">Safe to Publish</span>
                    </div>
                    <div style="display:flex; justify-content:space-between;">
                        <span>Status:</span> <span style="color:var(--primary-light);">Draft Ready</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Generate Review Examples Block HTML
    const reviewsHtml = ind.reviews.map(rev => {
        let labelColor = 'var(--accent)';
        let labelBg = 'rgba(16, 185, 129, 0.08)';
        let borderStyle = '1px solid var(--border-current)';
        let glow = 'none';

        if (rev.status.includes('Escalation') || rev.status.includes('Required')) {
            labelColor = '#EF4444';
            labelBg = 'rgba(239, 68, 68, 0.08)';
            borderStyle = '1.5px solid #EF4444';
            glow = '0 0 15px rgba(239, 68, 68, 0.1)';
        } else if (rev.status.includes('Recommended') || rev.status.includes('Review')) {
            labelColor = 'var(--primary-light)';
            labelBg = 'rgba(99, 102, 241, 0.08)';
        }

        return `
            <div style="background:var(--bg-card-current); border:${borderStyle}; box-shadow:${glow}; padding:28px; border-radius:16px; text-align:left; display:flex; flex-direction:column; justify-content:space-between;">
                <div>
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                        <div>
                            <span style="font-weight:700; color:#FFF; font-size:0.95rem;">${rev.author}</span>
                            <div style="display:flex; gap:2px; margin-top:2px;">
                                ${Array.from({ length: rev.rating }).map(() => `<i data-lucide="star" style="fill:#F59E0B; color:#F59E0B; width:12px; height:12px;"></i>`).join('')}
                                ${Array.from({ length: 5 - rev.rating }).map(() => `<i data-lucide="star" style="color:#CBD5E1; width:12px; height:12px;"></i>`).join('')}
                            </div>
                        </div>
                        <span style="font-size:0.75rem; color:var(--text-secondary-current);">Google Review</span>
                    </div>
                    <p style="font-style:italic; font-size:0.95rem; color:var(--text-primary-current); margin-bottom:20px; line-height:1.5;">"${rev.text}"</p>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid rgba(255,255,255,0.04); padding:16px; border-radius:10px; margin-top:auto;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; font-size:0.72rem; font-weight:800; letter-spacing:0.03em;">
                        <span style="color:var(--primary-light); text-transform:uppercase;"><i data-lucide="cpu" style="width:12px; height:12px; vertical-align:middle; margin-right:4px;"></i> Autopilot Reply</span>
                        <span style="color:${labelColor}; background:${labelBg}; padding:2px 8px; border-radius:4px; text-transform:uppercase;">${rev.status}</span>
                    </div>
                    <p style="font-size:0.88rem; color:#E2E8F0; line-height:1.5;">"${rev.reply}"</p>
                </div>
            </div>
        `;
    }).join('');

    // Generate Dashboard Insights Block HTML
    const insightsHtml = ind.insights.map(ins => `
        <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:16px 20px; border-radius:10px; color:#FFF; font-size:0.95rem; font-weight:500;">
            <i data-lucide="trending-up" style="color:var(--accent); width:18px; height:18px; flex-shrink:0;"></i>
            <span>${ins}</span>
        </div>
    `).join('');

    // Generate FAQs Block HTML
    const faqsHtml = ind.faqs.map(faq => `
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

    // Generate Related Industries Links
    const relatedHtml = ind.related.map(rel => `
        <a href="/industries/${rel.id}" style="color:var(--primary-light); text-decoration:none; font-weight:600; font-size:0.92rem; border: 1px solid rgba(99, 102, 241, 0.15); background:rgba(99,102,241,0.02); padding:8px 16px; border-radius:50px; transition:all var(--transition-fast);" onmouseover="this.style.borderColor='var(--primary-light)';this.style.background='rgba(99,102,241,0.08)';" onmouseout="this.style.borderColor='rgba(99, 102, 241, 0.15)';this.style.background='rgba(99,102,241,0.02)';">
            ${rel.title} <i data-lucide="arrow-right" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-left:4px;"></i>
        </a>
    `).join('');

    return `
    <!-- Hero Section -->
    <header class="hero theme-dark" style="padding: 160px 0 80px;">
        <div class="hero-glow-layer"></div>
        <div class="container" style="display:grid; grid-template-columns:1.2fr 1fr; gap:40px; align-items:center;">
            <div class="hero-content" style="text-align:left; max-width:100%;">
                <div class="hero-badge" style="display:inline-flex; align-items:center; gap:6px; background:rgba(99, 102, 241, 0.08); border: 1px solid rgba(99, 102, 241, 0.2); padding: 6px 12px; border-radius: 50px; color: var(--primary-light); font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 24px;">
                    <i data-lucide="sparkles" style="width:12px; height:12px;"></i> Built for ${ind.title}
                </div>
                <h1 class="hero-headline" style="font-size:2.8rem; font-weight:800; line-height:1.1; margin-bottom:20px; color:#FFF;">${ind.heroTitle}</h1>
                <p class="hero-sub" style="font-size:1.1rem; color:var(--text-secondary-current); margin-bottom:32px; line-height:1.6;">${ind.heroSub}</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center; margin-bottom:24px;">
                    <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding:14px 28px; font-size:0.95rem;">Start Your Free Trial</a>
                    <a href="/pricing.html" class="btn btn-secondary" style="padding:14px 28px; font-size:0.95rem;">Start for $39 per Month</a>
                </div>
                <p style="font-size:0.82rem; color:var(--text-secondary-current); font-weight:500;">Try ReplyVera free. 14-day free trial. No credit card required.</p>
            </div>
            
            <!-- Static Product Mockup Graphic -->
            <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:20px; backdrop-filter:blur(20px); box-shadow:var(--shadow-premium); text-align:left;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:16px; margin-bottom:20px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div style="width:12px; height:12px; background:#EF4444; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#F59E0B; border-radius:50%;"></div>
                        <div style="width:12px; height:12px; background:#10B981; border-radius:50%;"></div>
                    </div>
                    <span style="font-size:0.75rem; font-weight:700; color:var(--primary-light); text-transform:uppercase;">ReplyVera Autopilot Panel</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    <div style="font-size:0.8rem; color:var(--text-secondary-current);">Connection status:</div>
                    <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:12px; border-radius:8px;">
                        <span style="font-weight:600; color:#FFF; display:flex; align-items:center; gap:6px;"><i data-lucide="google" style="color:#DB4437; width:16px; height:16px;"></i> Google Business Profile</span>
                        <span style="font-size:0.75rem; font-weight:700; color:var(--accent); background:rgba(16, 185, 129, 0.08); padding:2px 8px; border-radius:4px;">Connected</span>
                    </div>
                    <div style="font-size:0.8rem; color:var(--text-secondary-current); margin-top:8px;">Recent Activity:</div>
                    <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-current); padding:16px; border-radius:8px; font-family:monospace; font-size:0.82rem; color:#94A3B8;">
                        <div style="margin-bottom:4px;">[12:24 PM] Google review scanned.</div>
                        <div style="margin-bottom:4px; color:var(--accent);">[12:24 PM] Safe to Auto-Publish reply drafted.</div>
                        <div style="color:var(--primary-light);">[12:25 PM] Autopilot response published successfully.</div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Problem Section -->
    <section class="section theme-light" style="padding: 80px 0;">
        <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
            <div class="label-pill"><i data-lucide="alert-circle" style="width:12px; height:12px;"></i> Core Challenges</div>
            <h2 class="mb-4" style="color:#FFF;">Managing Reviews is Painful</h2>
            <p class="lead-text" style="color:var(--text-secondary-current);">Here are the daily friction points businesses face without ReplyVera\'s review automation.</p>
        </div>
        
        <div class="container">
            <div class="grid-3" style="gap:24px;">
                ${problemsHtml}
            </div>
        </div>
    </section>

    <!-- Target Customer Profile Preview Section -->
    <section class="section theme-gray" style="padding: 60px 0; border-top:1px solid var(--border-current); border-bottom:1px solid var(--border-current);">
        <div class="container text-center" style="max-width: 600px; margin-bottom: 32px;">
            <h3 style="font-size:1.4rem; font-weight:700; color:#FFF;">Designed specifically for:</h3>
        </div>
        <div class="container">
            <div style="display:flex; justify-content:center; gap:24px; flex-wrap:wrap; max-width:800px; margin:0 auto;">
                ${customersHtml}
            </div>
        </div>
    </section>

    <!-- How ReplyVera Works -->
    <section class="section theme-white" style="padding: 80px 0;" id="how-it-works">
        <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
            <div class="label-pill"><i data-lucide="settings" style="width:12px; height:12px;"></i> Connection Setup</div>
            <h2 class="mb-4">Reputation autopilot in 3 steps</h2>
            <p class="lead-text">Connect your Google Business Profile and let ReplyVera take over the heavy lifting.</p>
        </div>
        <div class="container">
            <div class="grid-3" style="gap:32px;">
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">1</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">Connect Google Profile</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">Securely authorize your Google Business Profile in one click. No long integrations or setup fees.</p>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">2</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">Configure Tone</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">Choose a brand tone and set guardrails. Select which ratings autopost and which route to approval.</p>
                </div>
                <div style="background:rgba(255,255,255,0.01); border:1px solid var(--border-current); padding:32px; border-radius:12px;">
                    <div style="width:40px; height:40px; background:rgba(99,102,241,0.08); color:var(--primary-light); border-radius:8px; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.1rem; margin-bottom:20px;">3</div>
                    <h3 style="font-size:1.2rem; font-weight:700; color:#FFF; margin-bottom:12px;">Save Admin Hours</h3>
                    <p style="font-size:0.9rem; color:var(--text-secondary-current); line-height:1.5;">Replies publish instantly. Enjoy consistent support coverage and improved local SEO map rankings.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Industry Specific Features -->
    <section class="section theme-dark" style="padding: 80px 0;">
        <div class="container">
            ${featuresHtml}
        </div>
    </section>

    <!-- Realistic Review Examples -->
    <section class="section theme-light" style="padding: 80px 0;">
        <div class="container text-center" style="max-width: 700px; margin-bottom: 56px;">
            <div class="label-pill"><i data-lucide="eye" style="width:12px; height:12px;"></i> Interactive Examples</div>
            <h2 class="mb-4" style="color:#FFF;">Review Response Workflows</h2>
            <p class="lead-text" style="color:var(--text-secondary-current);">See how ReplyVera handles positive reviews automatically while escalating complex ones for manager draft approval.</p>
        </div>
        <div class="container">
            <div class="grid-3" style="gap:24px;">
                ${reviewsHtml}
            </div>
        </div>
    </section>

    <!-- Escalation & Employee & Operational Insights Section -->
    <section class="section theme-gray" style="padding: 80px 0; border-top:1px solid var(--border-current); border-bottom:1px solid var(--border-current);">
        <div class="container" style="display:grid; grid-template-columns:1fr 1fr; gap:40px;">
            <div style="text-align:left;">
                <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="shield-alert" style="width:12px; height:12px;"></i> Risk Control</div>
                <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">Supervision & Escalation Guardrails</h2>
                <p style="color:var(--text-secondary-current); margin-bottom:24px; line-height:1.6;">ReplyVera never auto-posts blindly. Our scanners flag safety hazards, injuries, cancellation disputes, or billing errors, alerting managers immediately and locking the reviews in drafts.</p>
                <div style="background:#05050C; padding:20px; border-radius:12px; border:1px solid var(--border-current); display:flex; flex-direction:column; gap:12px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.88rem;">
                        <span style="color:#FFF; font-weight:600;"><i data-lucide="search" style="width:14px; height:14px; vertical-align:middle; margin-right:6px; color:var(--primary-light);"></i> Auto-Draft Guardrails</span>
                        <span style="color:var(--accent); font-weight:700;">Active</span>
                    </div>
                    <p style="font-size:0.82rem; color:var(--text-secondary-current); line-height:1.4; margin:0;">Reviews containing negative trigger words or ratings below 4 stars bypass automatic posting and are sent straight to your email alerts.</p>
                </div>
            </div>
            
            <div style="text-align:left; display:flex; flex-direction:column; justify-content:center;">
                <div class="label-pill" style="margin-bottom:16px;"><i data-lucide="bar-chart-2" style="width:12px; height:12px;"></i> Reputation Analytics</div>
                <h2 style="font-size:1.8rem; font-weight:800; color:#FFF; margin-bottom:16px;">Operational Insights & Staff Leaderboard</h2>
                <p style="color:var(--text-secondary-current); margin-bottom:24px; line-height:1.6;">Track review volume, average ratings, and positive mentions of team members automatically extracted from Google customer feedback.</p>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${insightsHtml}
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Preview Block -->
    <section class="section theme-dark" id="pricing" style="padding: 80px 0;">
        <div class="container text-center" style="max-width: 700px;">
            <div class="label-pill"><i data-lucide="credit-card" style="width:12px; height:12px;"></i> Simple Pricing</div>
            <h2 class="mb-4">Standard pricing starting at $29 per month</h2>
            <p class="lead-text mb-8">Choose the plan that fits your business. All plans support Google Reviews.</p>
            
            <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-current); padding: 40px; border-radius: 20px; box-shadow: var(--shadow-premium); margin-bottom: 32px; backdrop-filter: blur(20px); text-align:left; max-width:600px; margin-left:auto; margin-right:auto;">
                <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:16px; margin-bottom:20px;">
                    <div>
                        <div style="font-size: 1rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--primary-light); font-weight: 700;">Autopilot Plan</div>
                        <div style="font-size: 0.82rem; color:var(--accent); font-weight:700; margin-top:2px;">Most Popular</div>
                    </div>
                    <div style="text-align:right;">
                        <span style="font-size: 2.2rem; font-weight: 800; color: #FFF;">$39</span>
                        <span style="color: var(--text-secondary-current); font-size: 0.88rem;">/ mo / location</span>
                    </div>
                </div>
                
                <ul style="list-style:none; padding:0; display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.9rem; margin-bottom:32px;">
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Google review responses</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Auto-publishing for safe reviews</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Approval rules for negatives</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Custom business tone</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> English and Spanish</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Employee-name recognition</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Review history logs</li>
                    <li style="display:flex; align-items:center; gap:8px;"><i data-lucide="check" style="color:var(--accent); width:16px; height:16px;"></i> Negative-review alerts</li>
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

    <!-- Industry Specific FAQ -->
    <section class="section theme-white" id="faq" style="padding: 80px 0;">
        <div class="container" style="max-width: 800px;">
            <div class="text-center mb-12">
                <div class="label-pill"><i data-lucide="help-circle" style="width:12px; height:12px;"></i> FAQ</div>
                <h2 class="mb-4">Frequently Asked Questions</h2>
                <p>Everything you need to know about ReplyVera for ${ind.title}.</p>
            </div>
            
            <div class="faq-list" style="display:flex; flex-direction:column; gap:4px;">
                ${faqsHtml}
            </div>
        </div>
    </section>

    <!-- Final Call to Action -->
    <section class="section theme-dark" style="border-top: 1px solid rgba(255, 255, 255, 0.04); padding: 80px 0;">
        <div class="container text-center" style="max-width: 650px;">
            <h2 class="mb-4" style="color:#FFF;">Start Answering Every Google Review</h2>
            <p class="mb-8" style="color:var(--text-secondary-current);">Connect your Google Business Profile and let ReplyVera handle routine responses while you stay in control of sensitive feedback.</p>
            
            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; margin-bottom:32px; align-items:center;">
                <a href="https://replyvera-dashboard.vercel.app/login?signup=true" class="btn btn-accent" style="padding: 14px 28px; font-size:0.95rem;">Start Your Free Trial</a>
                <a href="/pricing.html#comparison" style="color: #94A3B8; text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: color var(--transition-fast);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">Compare Plans</a>
            </div>
        </div>
    </section>

    <!-- Related Industries -->
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

// Compile all category pages
industryPages.forEach((ind) => {
    // Generate page body
    const bodyContent = buildCategoryBody(ind);

    // Modify header meta data
    let header = baseHeader;
    header = header.replace(
        /<title>[^<]+<\/title>/,
        `<title>${ind.metaTitle}</title>`
    );
    header = header.replace(
        /<meta name="description" content="[^"]+">/,
        `<meta name="description" content="${ind.metaDesc}">`
    );
    header = header.replace(
        /<\/head>/,
        `    <meta name="keywords" content="${ind.seoKeywords}">\n</head>`
    );

    const fullPageContent = header + bodyContent + baseFooter;

    // Target directory: industries/[id]/
    const indDir = path.join(__dirname, 'industries', ind.id);
    if (!fs.existsSync(indDir)) {
        fs.mkdirSync(indDir, { recursive: true });
    }

    const indFilePath = path.join(indDir, 'index.html');
    fs.writeFileSync(indFilePath, fullPageContent, 'utf8');
    console.log(`Successfully compiled industry page: ${indFilePath}`);
});

console.log('All 9 industry landing pages successfully generated!');
