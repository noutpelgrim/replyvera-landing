// Preset Scenarios Data for All Supported Industries
        const INDUSTRY_PRESETS = {
            'restaurant': {
                'positive': { name: 'Sarah Jenkins', avatar: 'SJ', stars: 5, text: 'The lasagna was incredible and our server Alex was super attentive. Best Italian dinner in town!', sentiment: 'Positive', topic: 'Food & Staff', employee: 'Alex', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Warm & Welcoming', response: 'Thank you so much for the kind words, Sarah! We’re thrilled you loved the lasagna and enjoyed Alex’s service. We’ll pass along your praise to him!', decision: 'Safe to Auto-Publish', decisionSub: 'Matches rule: 4-5 star praise auto-publishes immediately.', decisionType: 'positive' },
                'negative': { name: 'Mark Davis', avatar: 'MD', stars: 3, text: 'Food was decent but we waited 45 minutes for a table even with a reservation.', sentiment: 'Neutral / Negative', topic: 'Wait Time & Service', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Empathetic & Apologetic', response: 'Thank you for sharing your feedback, Mark. We sincerely apologize for the 45-minute wait despite your reservation. We are reviewing our host scheduling to prevent this.', decision: 'Needs Approval', decisionSub: 'Held for review because rating is under 4 stars.', decisionType: 'warning' },
                'sensitive': { name: 'Lisa Ray', avatar: 'LR', stars: 1, text: 'We got terrible food poisoning after eating the seafood soup last night. Unacceptable safety conditions!', sentiment: 'Critical', topic: 'Food Safety Emergency', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Management', response: '[AI Generation Paused] Flagged for Food Safety Escalation. Immediate owner notification sent.', decision: 'Auto-Publishing Blocked', decisionSub: 'Sensitive topic "Food Poisoning" detected. Escalated directly to owner.', decisionType: 'danger' }
            },
            'dentist': {
                'positive': { name: 'David Miller', avatar: 'DM', stars: 5, text: 'Dr. Evans made my root canal painless and easy. The front desk team was also wonderful!', sentiment: 'Positive', topic: 'Patient Care', employee: 'Dr. Evans', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Professional & Reassuring', response: 'Thank you for your feedback, David! We’re glad Dr. Evans made your procedure comfortable. We appreciate your trust in our clinic.', decision: 'Safe to Auto-Publish', decisionSub: 'Patient privacy safeguards passed.', decisionType: 'positive' },
                'negative': { name: 'Karen White', avatar: 'KW', stars: 2, text: 'Billing was confusing and they charged me twice for X-rays.', sentiment: 'Negative', topic: 'Billing Claim', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Professional & Direct', response: 'Hello Karen, thank you for alerting us. We apologize for the billing confusion and would love to review your account immediately to issue a correction.', decision: 'Needs Approval', decisionSub: 'Billing complaints require staff verification before posting.', decisionType: 'warning' },
                'sensitive': { name: 'Robert King', avatar: 'RK', stars: 1, text: 'The procedure resulted in severe nerve damage and infection. Medical malpractice!', sentiment: 'Critical', topic: 'Medical Incident', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Practice Owner', response: '[AI Generation Paused] Flagged for Medical Liability. Auto-response suppressed.', decision: 'Auto-Publishing Blocked', decisionSub: 'Trigger word "malpractice/injury" detected. Strict patient privacy escalation activated.', decisionType: 'danger' }
            },
            'agency': {
                'positive': { name: 'Emily Thorne', avatar: 'ET', stars: 5, text: 'ReplyVera helped us scale local review management for 35 client locations seamlessly. Sarah delivered outstanding results!', sentiment: 'Positive', topic: 'Client ROI & Scaling', employee: 'Sarah', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Professional B2B', response: 'Thank you Emily! We are thrilled to partner with your agency and help scale your local SEO results. We appreciate your partnership!', decision: 'Safe to Auto-Publish', decisionSub: 'Standard B2B testimonial auto-published.', decisionType: 'positive' },
                'negative': { name: 'Jason Reed', avatar: 'JR', stars: 3, text: 'Great strategy but monthly analytics reporting calls are frequently delayed.', sentiment: 'Neutral / Negative', topic: 'Reporting Timeliness', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Accountable & Professional', response: 'Thanks for the feedback, Jason. We apologize for the reporting call delays and are streamlining our scheduling workflow.', decision: 'Needs Approval', decisionSub: 'Service delivery feedback flagged for Account Manager.', decisionType: 'warning' },
                'sensitive': { name: 'Victor Vance', avatar: 'VV', stars: 1, text: 'Your team leaked our confidential Q4 product launch plan to a competitor! Breach of NDA!', sentiment: 'Critical', topic: 'Legal / NDA Breach', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Executive Legal', response: '[AI Generation Paused] Legal Breach Keyword detected. Escalated immediately to Executive Council.', decision: 'Auto-Publishing Blocked', decisionSub: 'Critical legal liability risk flagged.', decisionType: 'danger' }
            },
            'martial-arts': {
                'positive': { name: 'Marcus Brody', avatar: 'MB', stars: 5, text: 'Coach Marcus is amazing with the kids! My 8-year-old has gained so much confidence and discipline since joining the karate program.', sentiment: 'Positive', topic: 'Youth Discipline & Coaching', employee: 'Coach Marcus', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Encouraging & Warm', response: 'Thank you so much! We are so proud of your child’s progress on and off the mat. Coach Marcus loves teaching our youth students!', decision: 'Safe to Auto-Publish', decisionSub: 'Positive parent feedback auto-published.', decisionType: 'positive' },
                'negative': { name: 'Daniel Park', avatar: 'DP', stars: 3, text: 'Great classes but the parent waiting area gets overcrowded and hot during peak evening classes.', sentiment: 'Neutral / Negative', topic: 'Facility & Comfort', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Attentive & Respectful', response: 'Thank you for the feedback, Daniel! We are currently looking into expanding seating and upgrading airflow in our parent lobby.', decision: 'Needs Approval', decisionSub: 'Facility feedback held for Dojo Manager.', decisionType: 'warning' },
                'sensitive': { name: 'Rachel Hayes', avatar: 'RH', stars: 1, text: 'My son sprained his wrist during sparring today because there was no instructor supervision on the mat!', sentiment: 'Critical', topic: 'Student Safety & Injury', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Head Sensei', response: '[AI Generation Paused] Mat Safety & Student Injury Keyword detected. Immediate notification sent to Head Sensei.', decision: 'Auto-Publishing Blocked', decisionSub: 'Injury and mat safety hazard flagged for urgent executive review.', decisionType: 'danger' }
            },
            'childcare': {
                'positive': { name: 'Jessica Vance', avatar: 'JV', stars: 5, text: 'Ms. Clara is an angel! Our toddler loves going to preschool every morning and learns so many new things.', sentiment: 'Positive', topic: 'Early Education & Care', employee: 'Ms. Clara', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Warm & Caring', response: 'Thank you so much Jessica! We love having your toddler with us, and Ms. Clara will be delighted to read your kind words!', decision: 'Safe to Auto-Publish', decisionSub: 'Parent praise auto-published.', decisionType: 'positive' },
                'negative': { name: 'Brian Scott', avatar: 'BS', stars: 3, text: 'Love the teachers but morning drop-off parking is chaotic and needs better traffic flow.', sentiment: 'Neutral / Negative', topic: 'Drop-off Logistics', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Reassuring & Action-Oriented', response: 'Thank you Brian! We appreciate your patience and are coordinating with staff to improve drop-off lane guidance.', decision: 'Needs Approval', decisionSub: 'Logistics feedback held for Center Director.', decisionType: 'warning' },
                'sensitive': { name: 'Amanda Cole', avatar: 'AC', stars: 1, text: 'Picked up my daughter with an unexplained deep bruise on her arm and no incident report!', sentiment: 'Critical', topic: 'Child Safety Incident', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Center Director', response: '[AI Generation Paused] Unexplained Child Injury Keyword detected. Emergency alert dispatched to Director.', decision: 'Auto-Publishing Blocked', decisionSub: 'Child safety escalation triggered immediately.', decisionType: 'danger' }
            },
            'pet-care': {
                'positive': { name: 'Chloe Bennett', avatar: 'CB', stars: 5, text: 'They groomed my golden retriever Max so gently! He came out smelling great and wasn’t stressed at all.', sentiment: 'Positive', topic: 'Gentle Grooming', employee: 'Max (Pet)', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Warm & Pet-Friendly', response: 'Thank you Chloe! Max was such a sweet boy to work with. We can’t wait to see him again for his next bath!', decision: 'Safe to Auto-Publish', decisionSub: 'Grooming praise auto-published.', decisionType: 'positive' },
                'negative': { name: 'Derek Shaw', avatar: 'DS', stars: 3, text: 'Good haircut for my poodle but pickup was delayed by over an hour past the promised time.', sentiment: 'Neutral / Negative', topic: 'Pickup Delay', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Apologetic', response: 'Thanks for your feedback, Derek. We apologize for the delay in pickup time today and are adjusting our grooming schedule buffer.', decision: 'Needs Approval', decisionSub: 'Timing complaint flagged for manager.', decisionType: 'warning' },
                'sensitive': { name: 'Megan Ross', avatar: 'MR', stars: 1, text: 'My dog came home bleeding from a cut claw quick and a clipper nick on his belly!', sentiment: 'Critical', topic: 'Pet Injury / Grooming Cut', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Salon Lead', response: '[AI Generation Paused] Pet Injury Keyword detected. Alert sent to Salon Lead.', decision: 'Auto-Publishing Blocked', decisionSub: 'Pet injury claim blocked to prevent liability issues.', decisionType: 'danger' }
            },
            'car-wash': {
                'positive': { name: 'Tom Higgins', avatar: 'TH', stars: 5, text: 'Best drive-thru wash in the city! My car shines like brand new.', sentiment: 'Positive', topic: 'Wash Quality', employee: 'None', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Enthusiastic', response: 'Thanks for the awesome 5-star review, Tom! We’re glad your car is shining bright. See you next time!', decision: 'Safe to Auto-Publish', decisionSub: 'Standard positive review auto-published.', decisionType: 'positive' },
                'negative': { name: 'Chris Vance', avatar: 'CV', stars: 2, text: 'The vacuum machines had weak suction and half were out of order.', sentiment: 'Negative', topic: 'Equipment Maintenance', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Apologetic & Action-Oriented', response: 'Thanks for letting us know, Chris. We apologize for the vacuum issue and our team is servicing them today.', decision: 'Needs Approval', decisionSub: 'Equipment complaint flagged for facility manager review.', decisionType: 'warning' },
                'sensitive': { name: 'Amanda B.', avatar: 'AB', stars: 1, text: 'The side brushes scratched my brand new hood and dented the door mirror!', sentiment: 'Critical', topic: 'Vehicle Damage Claim', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Claims Manager', response: '[AI Generation Paused] Property Damage Trigger activated. Incident report auto-created.', decision: 'Auto-Publishing Blocked', decisionSub: 'Damage claim detected. Blocked to prevent unintended liability admission.', decisionType: 'danger' }
            },
            'laundromat': {
                'positive': { name: 'Carlos Rivera', avatar: 'CR', stars: 5, text: 'Super clean facility! Heavy-duty washers work great and folding tables are always sanitized.', sentiment: 'Positive', topic: 'Cleanliness & Machines', employee: 'None', risk: 'Low Risk', riskType: 'chip-positive', tone: 'Appreciative', response: 'Thank you Carlos! We pride ourselves on maintaining a spotless facility with top-tier machines for our community.', decision: 'Safe to Auto-Publish', decisionSub: 'Cleanliness praise auto-published.', decisionType: 'positive' },
                'negative': { name: 'Sandra Lee', avatar: 'SL', stars: 3, text: 'Washer #8 ate my quarters without starting, and the change machine ran out of quarters.', sentiment: 'Neutral / Negative', topic: 'Coin Mechanism & Refund', employee: 'None', risk: 'Medium Risk', riskType: 'chip-warning', tone: 'Helpful & Direct', response: 'Hello Sandra, disculpas for the machine issue! Please contact our attendant or email us to receive an instant refund code.', decision: 'Needs Approval', decisionSub: 'Refund request flagged for attendant.', decisionType: 'warning' },
                'sensitive': { name: 'Kevin Durant', avatar: 'KD', stars: 1, text: 'Someone stole my clothes basket while unattended and management refused to check CCTV!', sentiment: 'Critical', topic: 'Theft / CCTV Incident', employee: 'None', risk: 'High Risk (Blocked)', riskType: 'chip-danger', tone: 'Escalated to Security Lead', response: '[AI Generation Paused] Theft & Security Keyword detected. Incident dispatched to Security Manager.', decision: 'Auto-Publishing Blocked', decisionSub: 'Theft report flagged for security review.', decisionType: 'danger' }
            }
        };

        let selectedStars = 5;
        let currentPreset = 'positive';

        function getActiveIndustry() {
            return document.getElementById('industrySelect').value;
        }

        function updateStarPickerUI(s) {
            document.querySelectorAll('.star-pick-btn').forEach((btn, idx) => {
                if (idx + 1 === s) btn.classList.add('selected');
                else btn.classList.remove('selected');
            });
        }

        function loadPreset(presetKey) {
            currentPreset = presetKey;
            
            // Highlight preset buttons
            document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.getElementById(`btn-preset-${presetKey}`);
            if (activeBtn) activeBtn.classList.add('active');

            const ind = getActiveIndustry();
            const data = (INDUSTRY_PRESETS[ind] && INDUSTRY_PRESETS[ind][presetKey]) ? INDUSTRY_PRESETS[ind][presetKey] : INDUSTRY_PRESETS['restaurant'][presetKey];

            if (data && data.stars) {
                selectedStars = data.stars;
                updateStarPickerUI(selectedStars);
            }

            updateCanvas(data);
        }

        function handleIndustryChange() {
            loadPreset(currentPreset);
        }

        function setCustomStars(s) {
            selectedStars = s;
            updateStarPickerUI(s);

            const textInput = document.getElementById('customReviewText');
            const text = textInput ? textInput.value.trim() : '';
            if (text) {
                runCustomAnalysis();
            } else {
                let starsHtml = '';
                for(let i=1; i<=5; i++) {
                    starsHtml += i <= selectedStars ? '★' : '☆';
                }
                const displayEl = document.getElementById('displayStars');
                if (displayEl) displayEl.textContent = starsHtml;
            }
        }

        function runCustomAnalysis() {
            const text = document.getElementById('customReviewText').value.trim();
            if (!text) {
                alert('Please type some review text in the box first!');
                return;
            }

            document.querySelectorAll('.preset-btn').forEach(btn => btn.classList.remove('active'));

            let lower = text.toLowerCase();
            
            // 1. Smart Employee Extraction (Supports Jason, Mary, Raul, Host, Server, Doctor, etc.)
            let employee = 'None';
            const empMatch = text.match(/(?:with|by|server|host|hostess|waiter|waitress|bartender|manager|receptionist|driver|guide|coach|dr\.|dr|doctor|trainer|attendant|employee|staff|senor|señor|sr\.|sr|mr\.|mr|mrs\.|ms\.)\s+([a-zA-ZÀ-ÿ]+)/i);
            if (empMatch && empMatch[1]) {
                const cand = empMatch[1];
                const stopwords = ['the', 'a', 'an', 'my', 'our', 'very', 'good', 'bad', 'clinic', 'restaurant', 'food', 'service', 'great', 'awesome', 'nice', 'friendly'];
                if (!stopwords.includes(cand.toLowerCase())) {
                    employee = cand.charAt(0).toUpperCase() + cand.slice(1).toLowerCase();
                    if (employee.toLowerCase() === 'raul') employee = 'Raúl';
                }
            }
            if (employee === 'None') {
                const commonNames = [
                    'jason', 'alex', 'sarah', 'mary', 'maria', 'raul', 'raúl', 'hank', 'marcus', 'clara', 'jessica', 
                    'david', 'max', 'john', 'mike', 'sam', 'emily', 'anna', 'carlos', 'juan', 'rachel', 'derek', 'lisa',
                    'tom', 'chris', 'kevin', 'steve', 'mark', 'brian', 'laura', 'nicole', 'amanda', 'hannah', 'danny',
                    'peter', 'paul', 'james', 'robert', 'william', 'richard', 'thomas', 'charles', 'daniel', 'matthew',
                    'anthony', 'steven', 'andrew', 'joshua', 'ryan', 'jacob', 'eric', 'jonathan', 'adam', 'nathan', 'ethan'
                ];
                for (let n of commonNames) {
                    const regex = new RegExp(`\\b${n}\\b`, 'i');
                    if (regex.test(text)) {
                        employee = (n === 'raul' || n === 'raúl') ? 'Raúl' : (n.charAt(0).toUpperCase() + n.slice(1).toLowerCase());
                        break;
                    }
                }
            }
            if (employee === 'None') {
                const words = text.split(/\s+/);
                for (let i = 0; i < words.length; i++) {
                    let clean = words[i].replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
                    if (clean.length >= 3 && /^[A-ZÁÉÍÓÚÑ]/.test(clean)) {
                        const ignoreList = ['The', 'Google', 'Clinic', 'Clinica', 'Clinico', 'Restaurant', 'Service', 'Food', 'Senor', 'Señor', 'Doctor', 'Coach', 'Chef', 'Good', 'Great', 'Bad', 'Poor', 'Best', 'Very', 'Mijn', 'Onze', 'Deze', 'Het', 'Een', 'Beste', 'Hartelijk', 'Bedankt', 'Muchas', 'Gracias', 'Excelente', 'Bueno', 'Buena', 'Hola'];
                        if (!ignoreList.includes(clean)) {
                            employee = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
                            break;
                        }
                    }
                }
            }

            // 2. Risk & Safety Check
            let isSensitive = lower.includes('injury') || lower.includes('poison') || lower.includes('lawyer') || lower.includes('scratch') || lower.includes('hurt') || lower.includes('sue') || lower.includes('malpractice') || lower.includes('bleed') || lower.includes('stolen') || lower.includes('theft');
            
            // 3. Sentiment & Praise vs Complaint
            let hasPraise = lower.includes('good') || lower.includes('great') || lower.includes('perfect') || lower.includes('awesome') || lower.includes('excellent') || lower.includes('loved') || lower.includes('amazing') || lower.includes('shines') || lower.includes('friendly') || lower.includes('kind') || lower.includes('nice');
            let hasComplaint = lower.includes('not good') || lower.includes('bad') || lower.includes('slow') || lower.includes('cold') || lower.includes('poor') || lower.includes('terrible') || lower.includes('dirty') || lower.includes('wait') || lower.includes('overcrowded') || lower.includes('expensive') || lower.includes('price') || lower.includes('overpriced') || lower.includes('costly');

            let sentiment = 'Positive';
            if (isSensitive) {
                sentiment = 'Critical';
            } else if (selectedStars <= 2) {
                sentiment = 'Negative';
            } else if (selectedStars === 3 || (hasPraise && hasComplaint)) {
                sentiment = 'Mixed / Neutral';
            } else if (hasComplaint) {
                sentiment = 'Negative';
            } else {
                sentiment = 'Positive';
            }

            // 4. Topic Detection
            let topic = 'General Experience';
            if (lower.includes('bill') || lower.includes('price') || lower.includes('charge') || lower.includes('cost') || lower.includes('expensive') || lower.includes('overpriced')) {
                topic = (employee !== 'None') ? `Service (${employee}) & Pricing` : 'Pricing & Billing';
            } else if (lower.includes('food') || lower.includes('meal') || lower.includes('taste') || lower.includes('lasagna') || lower.includes('soup')) {
                topic = (employee !== 'None') ? 'Food & Staff Praise' : 'Food Quality';
            } else if (lower.includes('wait') || lower.includes('table') || lower.includes('reservation') || lower.includes('line')) {
                topic = 'Wait Time & Service';
            } else if (lower.includes('clean') || lower.includes('dirty') || lower.includes('wash') || lower.includes('vacuum')) {
                topic = 'Cleanliness & Facility';
            } else if (employee !== 'None') {
                topic = `Staff Service (${employee})`;
            }

            // 5. Intelligent AI Response Draft Generator
            let responseText = '';
            let tone = 'Warm & Professional';

            if (isSensitive) {
                tone = 'Escalated to Management';
                responseText = '[AI Generation Paused] Sensitive safety keywords detected. Auto-response suppressed and sent directly to owner queue.';
            } else if (hasPraise && hasComplaint) {
                tone = 'Empathetic & Balanced';
                if (employee !== 'None') {
                    if (lower.includes('price') || lower.includes('expensive') || lower.includes('overpriced') || lower.includes('cost')) {
                        responseText = `Thank you for taking the time to leave a review! We're glad to hear that ${employee} was friendly and provided great service, but we appreciate your honest feedback regarding our pricing. We strive to keep our rates fair and transparent!`;
                    } else {
                        responseText = `Thank you for taking the time to leave a review! We're thrilled to hear that ${employee} provided fantastic service, but we sincerely apologize for the areas that fell short. We've passed your comments to our team!`;
                    }
                } else {
                    responseText = `Thank you for your feedback! We're glad you enjoyed parts of your visit, but we apologize for the areas that didn't meet your expectations. We're actively working with our team to improve!`;
                }
            } else if (sentiment === 'Positive') {
                tone = 'Warm & Welcoming';
                if (employee !== 'None') {
                    responseText = `Thank you so much for the review! We're delighted that ${employee} took such great care of you. We'll be sure to pass along your praise to ${employee}!`;
                } else {
                    responseText = `Thank you so much for the fantastic review! We're thrilled that you had a great experience and look forward to welcoming you back soon!`;
                }
            } else {
                tone = 'Apologetic & Professional';
                if (employee !== 'None') {
                    responseText = `Thank you for bringing this to our attention. We apologize that your experience fell short of expectations. We will follow up with ${employee} and our team to ensure we improve.`;
                } else {
                    responseText = `Thank you for your honest feedback. We sincerely apologize for your experience and are addressing this with our management team to ensure it doesn't happen again.`;
                }
            }

            let isNegative = sentiment === 'Negative' || sentiment === 'Mixed / Neutral' || isSensitive;

            let data = {
                name: 'Custom Reviewer',
                avatar: 'CR',
                stars: selectedStars,
                text: text,
                sentiment: sentiment,
                topic: topic,
                employee: employee,
                risk: isSensitive ? 'High Risk (Blocked)' : (isNegative ? 'Medium Risk' : 'Low Risk'),
                riskType: isSensitive ? 'chip-danger' : (isNegative ? 'chip-warning' : 'chip-positive'),
                tone: tone,
                response: responseText,
                decision: isSensitive ? 'Auto-Publishing Blocked' : (isNegative ? 'Needs Approval' : 'Safe to Auto-Publish'),
                decisionSub: isSensitive ? 'Sensitive trigger detected. Held for human review.' : (isNegative ? 'Review contains a complaint or negative rating. Held for owner approval.' : 'Matches rules for auto-publishing.'),
                decisionType: isSensitive ? 'danger' : (isNegative ? 'warning' : 'positive')
            };

            updateCanvas(data);
        }

        function updateCanvas(data) {
            document.getElementById('reviewerName').textContent = data.name;
            document.getElementById('reviewerAvatar').textContent = data.avatar;
            document.getElementById('displayReviewText').textContent = `"${data.text}"`;
            
            // Stars
            let starsHtml = '';
            for(let i=1; i<=5; i++) {
                starsHtml += i <= data.stars ? '★' : '☆';
            }
            document.getElementById('displayStars').textContent = starsHtml;

            // Engine outputs
            document.getElementById('valSentiment').textContent = data.sentiment;
            document.getElementById('valTopic').textContent = data.topic;
            document.getElementById('valEmployee').textContent = data.employee;
            document.getElementById('valSafety').textContent = data.riskType === 'chip-danger' ? 'Flagged' : 'Clear';

            // Risk Chip
            const riskChip = document.getElementById('riskChip');
            riskChip.className = `tag-chip ${data.riskType}`;
            riskChip.innerHTML = `<i data-lucide="${data.riskType === 'chip-danger' ? 'alert-triangle' : (data.riskType === 'chip-warning' ? 'alert-circle' : 'shield-check')}" style="width:12px;height:12px;"></i> ${data.risk}`;

            document.getElementById('valTone').textContent = data.tone;
            document.getElementById('aiResponseText').textContent = data.response;

            // Decision banner styling
            const banner = document.getElementById('decisionBanner');
            const iconBox = document.getElementById('decisionIcon');
            const btn = document.getElementById('publishActionBtn');

            document.getElementById('decisionTitle').textContent = data.decision;
            document.getElementById('decisionSub').textContent = data.decisionSub;

            if (data.decisionType === 'positive') {
                banner.style.background = 'rgba(0, 201, 167, 0.08)';
                banner.style.borderColor = 'rgba(0, 201, 167, 0.3)';
                iconBox.style.background = 'rgba(0, 201, 167, 0.2)';
                iconBox.style.color = '#00C9A7';
                iconBox.innerHTML = `<i data-lucide="check-circle-2" style="width:22px;height:22px;"></i>`;
                btn.style.display = 'inline-flex';
                btn.className = 'btn btn-accent btn-sm';
                btn.textContent = 'Auto-Published to Google';
            } else if (data.decisionType === 'warning') {
                banner.style.background = 'rgba(245, 158, 11, 0.08)';
                banner.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                iconBox.style.background = 'rgba(245, 158, 11, 0.2)';
                iconBox.style.color = '#F59E0B';
                iconBox.innerHTML = `<i data-lucide="clock" style="width:22px;height:22px;"></i>`;
                btn.style.display = 'inline-flex';
                btn.className = 'btn btn-secondary btn-sm';
                btn.textContent = 'Approve & Publish';
            } else {
                banner.style.background = 'rgba(239, 68, 68, 0.08)';
                banner.style.borderColor = 'rgba(239, 68, 68, 0.3)';
                iconBox.style.background = 'rgba(239, 68, 68, 0.2)';
                iconBox.style.color = '#EF4444';
                iconBox.innerHTML = `<i data-lucide="shield-alert" style="width:22px;height:22px;"></i>`;
                btn.style.display = 'inline-flex';
                btn.className = 'btn btn-secondary btn-sm';
                btn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                btn.textContent = 'Review Escalation';
            }

            if (typeof lucide !== "undefined" && lucide.createIcons) { lucide.createIcons(); }
        }

        function triggerSimulatedPublish() {
            alert('Simulation Only: This sandbox demonstrates how ReplyVera evaluates responses. No reviews or replies are sent to Google.');
        }

        // Initialize icons
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof lucide !== "undefined" && lucide.createIcons) { lucide.createIcons(); }
            loadPreset('positive');
        });
    

window.loadPreset = loadPreset;
window.handleIndustryChange = handleIndustryChange;
window.setCustomStars = setCustomStars;
window.runCustomAnalysis = runCustomAnalysis;
window.triggerSimulatedPublish = triggerSimulatedPublish;

document.addEventListener('DOMContentLoaded', () => {
    const indSelect = document.getElementById('industrySelect');
    if (indSelect) indSelect.addEventListener('change', handleIndustryChange);
    document.addEventListener('click', (e) => {
        const target = e.target.closest('[data-preset], [data-stars], [data-action="custom-analysis"], [data-action="simulated-publish"]');
        if (!target) return;
        if (target.dataset.preset) loadPreset(target.dataset.preset);
        else if (target.dataset.stars) setCustomStars(parseInt(target.dataset.stars, 10));
        else if (target.dataset.action === 'custom-analysis') runCustomAnalysis();
        else if (target.dataset.action === 'simulated-publish') triggerSimulatedPublish();
    });
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
    loadPreset('positive');
});
