/**
 * ReplyVera Homepage Interactive Simulator
 * Pure vanilla JavaScript - no external dependencies.
 * Labeled clearly as simulation - does not publish to Google.
 */

const HOME_SIM_PRESETS = {
    'hotels': {
        'positive': {
            name: 'Robert Vance', avatar: 'RV', stars: 5,
            quote: 'The front desk team upgraded our suite for our anniversary and breakfast was superb. Outstanding hospitality!',
            sentiment: 'Positive', topic: 'Front Desk & Room', employee: 'Front Desk', safety: 'Clear',
            tone: 'Hospitable & Warm',
            reply: 'Thank you for celebrating your anniversary with us, Robert! We are thrilled our team could make your stay special, and we look forward to welcoming you back on your next visit.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Routine guest compliment passed auto-publish criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Sarah Connor', avatar: 'SC', stars: 3,
            quote: 'Check-in took over 30 minutes and the air conditioning in room 204 was noisy throughout the night.',
            sentiment: 'Constructive / Delay', topic: 'Check-in & AC Maintenance', employee: 'None', safety: 'Flagged',
            tone: 'Attentive & Apologetic',
            reply: 'Thank you for sharing your feedback, Sarah. We apologize for the wait during check-in and the AC noise. Our maintenance team has inspected room 204, and we hope to host you again for a seamless stay.',
            decision: 'Needs Approval', decisionSub: 'Service delay and maintenance complaint held for GM approval.', decisionType: 'approval', status: 'Pending Manager Review'
        },
        'sensitive': {
            name: 'Marcus Brody', avatar: 'MB', stars: 1,
            quote: 'Found bed bugs in room 312 and the night manager was unhelpful and refused to refund us!',
            sentiment: 'Critical Incident', topic: 'Pest / Hygiene Complaint', employee: 'Night Manager', safety: 'BLOCKED',
            tone: 'Internal GM Escalation',
            reply: '[Auto-Publishing Blocked] Sensitive pest/hygiene claim detected. Incident report generated and dispatched directly to General Manager.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Health & hygiene trigger activated. Automatic response suppressed.', decisionType: 'blocked', status: 'Escalated to GM'
        }
    },
    'restaurants': {
        'positive': {
            name: 'Sarah Jenkins', avatar: 'SJ', stars: 5,
            quote: 'The lasagna was incredible and our server Alex was super attentive. Best Italian dinner in town!',
            sentiment: 'Positive', topic: 'Food & Staff', employee: 'Alex', safety: 'Clear',
            tone: 'Warm & Welcoming',
            reply: 'Thank you so much for the kind words, Sarah! We’re thrilled you loved the lasagna and enjoyed Alex’s service. We’ll pass along your praise to him!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Matches rule: 4-5 star praise auto-publishes immediately.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Mark Davis', avatar: 'MD', stars: 3,
            quote: 'Food was decent but we waited 45 minutes for a table even with a confirmed reservation.',
            sentiment: 'Neutral / Delay', topic: 'Wait Time & Seating', employee: 'None', safety: 'Flagged',
            tone: 'Empathetic & Accountable',
            reply: 'Thank you for sharing your feedback, Mark. We sincerely apologize for the 45-minute wait despite your reservation. We are reviewing our host scheduling to prevent this.',
            decision: 'Needs Approval', decisionSub: 'Held for review because rating is under 4 stars.', decisionType: 'approval', status: 'Pending Host Manager Review'
        },
        'sensitive': {
            name: 'Lisa Ray', avatar: 'LR', stars: 1,
            quote: 'We got severe food poisoning after eating the seafood soup last night. Unacceptable hygiene!',
            sentiment: 'Critical Food Safety', topic: 'Food Safety Emergency', employee: 'None', safety: 'BLOCKED',
            tone: 'Owner Escalation',
            reply: '[Auto-Publishing Blocked] Health & food safety trigger activated. Auto-publishing blocked to prevent unintended liability admission.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Sensitive topic "Food Poisoning" detected. Escalated directly to owner.', decisionType: 'blocked', status: 'Escalated to Owner'
        }
    },
    'auto-repair': {
        'positive': {
            name: 'David Hayes', avatar: 'DH', stars: 5,
            quote: 'Mike diagnosed my brake problem in 10 minutes and had my truck back on the road the same afternoon. Honest pricing!',
            sentiment: 'Positive', topic: 'Brake Service & Speed', employee: 'Mike', safety: 'Clear',
            tone: 'Professional & Direct',
            reply: 'Thank you David! We appreciate your trust in our shop. Mike will be glad to hear your feedback, and we look forward to keeping your truck running smoothly.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Positive repair compliment passed auto-publish criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Carlos Ruiz', avatar: 'CR', stars: 3,
            quote: 'Repairs were done well but the final invoice was $120 higher than the written estimate.',
            sentiment: 'Billing Concern', topic: 'Estimate Variance', employee: 'None', safety: 'Flagged',
            tone: 'Transparent & Respectful',
            reply: 'Thank you for your review, Carlos. We apologize for the surprise regarding the estimate difference. Our service advisor will call you today to go through the itemized parts cost.',
            decision: 'Needs Approval', decisionSub: 'Billing variance held for Service Advisor approval.', decisionType: 'approval', status: 'Pending Advisor Review'
        },
        'sensitive': {
            name: 'Jason Reed', avatar: 'JR', stars: 1,
            quote: 'Lug nuts were left loose on the highway and the front wheel almost detached! Total mechanical negligence!',
            sentiment: 'Safety Incident', topic: 'Mechanical Safety Claim', employee: 'None', safety: 'BLOCKED',
            tone: 'Legal & Lead Tech Alert',
            reply: '[Auto-Publishing Blocked] Critical road safety issue detected. Shop owner and lead technician notified immediately.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Mechanical hazard flagged. Public reply held for owner review.', decisionType: 'blocked', status: 'Escalated to Shop Owner'
        }
    },
    'dentists': {
        'positive': {
            name: 'Emily Watson', avatar: 'EW', stars: 5,
            quote: 'Dr. Evans made my root canal painless and easy. The front desk team was also wonderful!',
            sentiment: 'Positive', topic: 'Gentle Care', employee: 'Dr. Evans', safety: 'Clear',
            tone: 'Professional & Reassuring',
            reply: 'Thank you for your feedback, Emily! We are glad Dr. Evans and our team made your visit comfortable. We appreciate your trust in our dental practice.',
            decision: 'Safe to Auto-Publish', decisionSub: 'HIPAA-compliant general praise auto-published.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Karen White', avatar: 'KW', stars: 2,
            quote: 'Billing was confusing and they charged my dental insurance twice for standard X-rays.',
            sentiment: 'Insurance Claim', topic: 'Billing Dispute', employee: 'None', safety: 'Flagged',
            tone: 'Helpful & Compliant',
            reply: 'Hello Karen, thank you for alerting us. We apologize for the billing confusion and would be happy to review your account details directly to resolve this.',
            decision: 'Needs Approval', decisionSub: 'Insurance and billing complaints held for Office Manager.', decisionType: 'approval', status: 'Pending Office Manager'
        },
        'sensitive': {
            name: 'Robert King', avatar: 'RK', stars: 1,
            quote: 'The procedure resulted in severe nerve damage and infection. Contacting my medical malpractice attorney!',
            sentiment: 'Malpractice Claim', topic: 'Medical Liability', employee: 'None', safety: 'BLOCKED',
            tone: 'Strict Clinical Hold',
            reply: '[Auto-Publishing Blocked] Legal & medical liability keyword detected. Strict HIPAA escalation activated.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Malpractice / injury trigger detected. No public response posted.', decisionType: 'blocked', status: 'Escalated to Practice Owner'
        }
    },
    'salons-spas': {
        'positive': {
            name: 'Jessica Vance', avatar: 'JV', stars: 5,
            quote: 'Sarah gave me the best balayage and haircut I have ever had. Truly talented colorist!',
            sentiment: 'Positive', topic: 'Balayage & Styling', employee: 'Sarah', safety: 'Clear',
            tone: 'Warm & Celebratory',
            reply: 'Thank you so much Jessica! Sarah loved working with your hair and will be so happy to see your review. We look forward to seeing you at your next appointment!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Stylist compliment published on autopilot.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Amanda Bell', avatar: 'AB', stars: 3,
            quote: 'Waited 30 minutes past my appointment time before anyone greeted me or washed my hair.',
            sentiment: 'Wait Time', topic: 'Front Desk Hospitality', employee: 'None', safety: 'Flagged',
            tone: 'Apologetic & Caring',
            reply: 'Thank you for your feedback, Amanda. We apologize for the delay during your visit today and are adjusting our schedule buffers to ensure on-time appointments.',
            decision: 'Needs Approval', decisionSub: 'Wait time feedback held for salon manager.', decisionType: 'approval', status: 'Pending Manager Review'
        },
        'sensitive': {
            name: 'Chloe Ross', avatar: 'CR', stars: 1,
            quote: 'Severe chemical burn on my scalp from the bleach treatment, had to visit urgent care for prescription cream!',
            sentiment: 'Burn / Injury', topic: 'Chemical Treatment Burn', employee: 'None', safety: 'BLOCKED',
            tone: 'Emergency Hold',
            reply: '[Auto-Publishing Blocked] Chemical burn claim detected. Salon Director alerted immediately.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Chemical injury claim detected. Auto-publishing disabled.', decisionType: 'blocked', status: 'Escalated to Salon Director'
        }
    },
    'medspas': {
        'positive': {
            name: 'Laura Palmer', avatar: 'LP', stars: 5,
            quote: 'Dr. Lee and the laser team gave me incredible results. My skin looks completely refreshed and radiant!',
            sentiment: 'Positive', topic: 'Aesthetic Results', employee: 'Dr. Lee', safety: 'Clear',
            tone: 'Discreet & Professional',
            reply: 'Thank you for your wonderful review, Laura! We are delighted to hear you had a great experience with Dr. Lee and our team. We look forward to welcoming you back!',
            decision: 'Safe to Auto-Publish', decisionSub: 'HIPAA-conscious aesthetic compliment auto-published.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Rachel Green', avatar: 'RG', stars: 3,
            quote: 'Had to wait 45 minutes past my Botox appointment and felt rushed through consultation.',
            sentiment: 'Schedule Delay', topic: 'Consultation Pacing', employee: 'None', safety: 'Flagged',
            tone: 'Attentive & Reassuring',
            reply: 'Thank you for your feedback, Rachel. We apologize for the delay and that your consultation felt rushed. Our clinic manager will reach out directly to ensure your questions are answered.',
            decision: 'Needs Approval', decisionSub: 'Consultation feedback held for clinical coordinator.', decisionType: 'approval', status: 'Pending Coordinator Review'
        },
        'sensitive': {
            name: 'Diana Prince', avatar: 'DP', stars: 1,
            quote: 'Severe chemical blistering and allergic swelling after the peel, had to visit urgent care!',
            sentiment: 'Clinical Reaction', topic: 'Adverse Medical Event', employee: 'None', safety: 'BLOCKED',
            tone: 'Clinical Hold',
            reply: '[Auto-Publishing Blocked] Adverse clinical reaction detected. Medical Director and Practice Manager alerted immediately.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Medical complication detected. Auto-response suppressed for patient safety.', decisionType: 'blocked', status: 'Escalated to Medical Director'
        }
    },
    'contractors': {
        'positive': {
            name: 'Brian Taylor', avatar: 'BT', stars: 5,
            quote: 'Tom and his crew replaced our roof in two days and left the yard spotless. Exceptional craftsmanship!',
            sentiment: 'Positive', topic: 'Roof Replacement', employee: 'Tom', safety: 'Clear',
            tone: 'Proud & Professional',
            reply: 'Thank you Brian! Tom and our roofing crew take great pride in quality work and clean job sites. We appreciate your recommendation and business!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Trades praise passed safety criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Frank Miller', avatar: 'FM', stars: 3,
            quote: 'Good plumbing work on the bathroom renovation, but scheduling was delayed by two weeks.',
            sentiment: 'Project Timeline', topic: 'Schedule Delay', employee: 'None', safety: 'Flagged',
            tone: 'Accountable',
            reply: 'Thank you for sharing your feedback, Frank. We are glad you are happy with the plumbing craftsmanship, and we apologize for the schedule timeline delay.',
            decision: 'Needs Approval', decisionSub: 'Timeline complaint held for Project Manager review.', decisionType: 'approval', status: 'Pending PM Review'
        },
        'sensitive': {
            name: 'Gary Oldman', avatar: 'GO', stars: 1,
            quote: 'They drilled through a main waterline flooding our finished basement and drywall! Huge water damage claim!',
            sentiment: 'Property Damage', topic: 'Flooding & Structural Loss', employee: 'None', safety: 'BLOCKED',
            tone: 'Insurance & Owner Hold',
            reply: '[Auto-Publishing Blocked] Major water damage claim detected. General contractor and insurance lead alerted immediately.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Structural property damage trigger activated. Auto-publishing blocked.', decisionType: 'blocked', status: 'Escalated to Contractor Lead'
        }
    }
};

let currentSimScenario = 'positive';

function selectSimScenario(scen) {
    currentSimScenario = scen;
    ['positive', 'negative', 'sensitive'].forEach(s => {
        const btn = document.getElementById('sim-btn-' + s);
        if (btn) {
            if (s === scen) {
                btn.style.borderColor = 'var(--primary)';
                btn.style.background = '#FFFFFF';
                btn.classList.add('active');
            } else {
                btn.style.borderColor = '#E2E8F0';
                btn.style.background = '#FFFFFF';
                btn.classList.remove('active');
            }
        }
    });
    runHomepageSimulation();
}

function runHomepageSimulation() {
    const sel = document.getElementById('homeSimIndustry');
    const ind = sel ? sel.value : 'restaurants';
    const presets = HOME_SIM_PRESETS[ind] || HOME_SIM_PRESETS['restaurants'];
    const data = presets[currentSimScenario] || presets['positive'];

    // Update DOM safely
    const avatar = document.getElementById('simReviewerAvatar');
    const name = document.getElementById('simReviewerName');
    const stars = document.getElementById('simDisplayStars');
    const quote = document.getElementById('simReviewQuote');
    const sentiment = document.getElementById('simSentiment');
    const topic = document.getElementById('simTopic');
    const employee = document.getElementById('simEmployee');
    const safety = document.getElementById('simSafety');
    const tone = document.getElementById('simTone');
    const responseText = document.getElementById('simResponseText');
    const decisionBar = document.getElementById('simDecisionBar');
    const decisionBadge = document.getElementById('simDecisionBadge');
    const decisionSub = document.getElementById('simDecisionSub');
    const publishStatus = document.getElementById('simPublishStatus');

    if (avatar) avatar.textContent = data.avatar;
    if (name) name.textContent = data.name;
    if (stars) {
        let starsStr = '';
        for (let i = 1; i <= 5; i++) starsStr += (i <= data.stars ? '★' : '☆');
        stars.textContent = starsStr;
    }
    if (quote) quote.textContent = '"' + data.quote + '"';
    if (sentiment) sentiment.textContent = data.sentiment;
    if (topic) topic.textContent = data.topic;
    if (employee) {
        employee.textContent = data.employee;
        employee.style.color = data.employee !== 'None' ? '#10B981' : '#64748B';
    }
    if (safety) {
        safety.textContent = data.safety;
        safety.style.color = data.safety === 'Clear' ? '#10B981' : (data.safety === 'BLOCKED' ? '#EF4444' : '#F59E0B');
    }
    if (tone) tone.textContent = data.tone;
    if (responseText) responseText.textContent = data.reply;

    if (decisionBadge) {
        decisionBadge.textContent = data.decision;
        decisionBadge.className = 'review-badge badge-' + data.decisionType;
    }
    if (decisionSub) decisionSub.textContent = data.decisionSub;
    if (publishStatus) {
        publishStatus.textContent = data.status;
        publishStatus.style.color = data.decisionType === 'auto' ? '#10B981' : (data.decisionType === 'blocked' ? '#EF4444' : '#F59E0B');
    }
    if (decisionBar) {
        if (data.decisionType === 'auto') {
            decisionBar.style.background = 'rgba(16, 185, 129, 0.08)';
            decisionBar.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        } else if (data.decisionType === 'approval') {
            decisionBar.style.background = 'rgba(245, 158, 11, 0.08)';
            decisionBar.style.borderColor = 'rgba(245, 158, 11, 0.25)';
        } else {
            decisionBar.style.background = 'rgba(239, 68, 68, 0.08)';
            decisionBar.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('homeSimIndustry')) {
        runHomepageSimulation();
    }
});
