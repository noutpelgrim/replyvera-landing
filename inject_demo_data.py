import re

demo_data = {
    'restaurants': {
        'positive': { 'review': 'Great food and our server Marco was fantastic!', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Server praise', 'employee': 'Marco', 'risk': 'Low', 'reply': 'Thank you for this wonderful feedback! We are so glad to hear you enjoyed the food and that Marco took great care of you. We will be sure to pass along your compliments to him.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'We waited 45 minutes for our table despite having a reservation.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Long wait time', 'employee': 'None', 'risk': 'Medium', 'reply': 'We are sorry to hear that you had to wait so long for your table despite having a reservation. We try our best to honor reservation times and we are sharing this with our front-of-house team so we can improve.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'I specifically mentioned my peanut allergy and still got a reaction.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Allergy and food safety', 'employee': 'None', 'risk': 'High', 'blocked': 'Allergy', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'dentists': {
        'positive': { 'review': 'The hygienists here are incredibly gentle and kind.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Staff praise', 'employee': 'None', 'risk': 'Low', 'reply': 'Thank you for your kind review! We are so happy to hear that our hygienists made your visit a gentle and comfortable experience.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'I was charged $200 more than my original estimate.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Unexpected billing', 'employee': 'None', 'risk': 'Medium', 'reply': 'We appreciate you bringing this to our attention. We apologize for any confusion regarding your treatment estimate and we would like to look into your billing details to clarify this.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'The procedure caused severe nerve pain that hasn\'t gone away.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Clinical pain concern', 'employee': 'None', 'risk': 'High', 'blocked': 'Pain/Injury', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'agencies': {
        'positive': { 'review': 'The whole team loved the campaign design, fantastic job.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Client praise', 'employee': 'None', 'risk': 'Low', 'reply': 'Thank you so much! We are thrilled to hear that your team loved the campaign design. It was a pleasure working on this project with you.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'Communication has been slow since the contract was signed.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Communication delay', 'employee': 'None', 'risk': 'Medium', 'reply': 'Thank you for your feedback. We apologize for the delay in communication and we are reviewing our account management process to ensure you get timely updates moving forward.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'The campaign launched with the wrong budget and cost us thousands.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Financial loss', 'employee': 'None', 'risk': 'High', 'blocked': 'Financial loss', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'martial-arts': {
        'positive': { 'review': 'Sensei John is an amazing instructor. My son loves his classes.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Instructor praise', 'employee': 'Sensei John', 'risk': 'Low', 'reply': 'Thank you for your review! We are so glad to hear your son is enjoying classes and we will be sure to share your kind words with Sensei John.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'I have been trying to cancel my membership for weeks with no reply.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Membership cancellation', 'employee': 'None', 'risk': 'Medium', 'reply': 'Thank you for bringing this to our attention. We are sorry for the delay in processing your cancellation request and we will follow up with you directly to resolve this.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'My child was bullied during class and the instructor did nothing.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Child safety and bullying', 'employee': 'None', 'risk': 'High', 'blocked': 'Bullying', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'childcare': {
        'positive': { 'review': 'Miss Emma is so wonderful with our toddler. Highly recommend.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Teacher praise', 'employee': 'Miss Emma', 'risk': 'Low', 'reply': 'Thank you for your wonderful feedback! We are so happy to have your family with us, and we will definitely share your kind words with Miss Emma.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'We were not informed that they were out of diapers until pickup.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Communication complaint', 'employee': 'None', 'risk': 'Medium', 'reply': 'Thank you for your feedback. We apologize for not communicating this to you sooner during the day. We are reviewing our parent notification process to improve.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'My son came home with a large scratch and no incident report.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Injury and supervision', 'employee': 'None', 'risk': 'High', 'blocked': 'Injury', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'tutoring': {
        'positive': { 'review': 'Mr. Davis helped my daughter finally understand algebra.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Tutor praise', 'employee': 'Mr. Davis', 'risk': 'Low', 'reply': 'Thank you for this wonderful review! We are so proud of your daughter\'s progress in algebra, and we will be sure to pass your thanks to Mr. Davis.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'The center changed our schedule three times without asking.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Scheduling complaint', 'employee': 'None', 'risk': 'Medium', 'reply': 'We apologize for the inconvenience and frustration regarding your schedule. We strive to provide consistent session times and are looking into why these changes occurred.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'They promised a 2-letter grade improvement but we saw no change.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Academic guarantee concern', 'employee': 'None', 'risk': 'High', 'blocked': 'Academic Guarantee', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'pet-care': {
        'positive': { 'review': 'The staff is always so excited to see our golden retriever.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Staff praise', 'employee': 'None', 'risk': 'Low', 'reply': 'Thank you for your kind review! We truly love seeing your golden retriever and we appreciate you trusting us with their care.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'Grooming took two hours longer than we were quoted.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Grooming delay', 'employee': 'None', 'risk': 'Medium', 'reply': 'We are sorry that your pet\'s grooming took longer than expected today. We understand your time is valuable and we are working to improve our scheduling accuracy.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'My dog came home with a cut near his ear that needed a vet.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Animal injury concern', 'employee': 'None', 'risk': 'High', 'blocked': 'Injury', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'car-washes': {
        'positive': { 'review': 'Quick, thorough, and the attendants are always super polite.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Employee praise', 'employee': 'None', 'risk': 'Low', 'reply': 'Thank you for your 5-star review! We pride ourselves on providing a quick and thorough wash, and we are glad our team provided great service.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'The vacuum on the far left was broken and took my tokens.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Broken equipment', 'employee': 'None', 'risk': 'Medium', 'reply': 'Thank you for letting us know about the broken vacuum. We apologize for the inconvenience and the lost tokens, and we will get our maintenance team on it immediately.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'The brushes completely scratched the paint on my new hood.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Vehicle damage', 'employee': 'None', 'risk': 'High', 'blocked': 'Damage', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    },
    'laundromats': {
        'positive': { 'review': 'Very clean facility and the owner is always helpful.', 'sentiment': 'Positive', 'rating': 5, 'topic': 'Cleanliness and staff praise', 'employee': 'None', 'risk': 'Low', 'reply': 'Thank you for your fantastic review! We work hard to keep the facility clean and comfortable, and we are always happy to help.', 'decision': 'Safe to Auto-Publish', 'text': 'This review matches your automatic publishing rules.' },
        'negative': { 'review': 'Dryer #4 is still not heating up properly, wasting money.', 'sentiment': 'Negative', 'rating': 2, 'topic': 'Broken machine', 'employee': 'None', 'risk': 'Medium', 'reply': 'Thank you for reporting this issue with Dryer #4. We apologize for the frustration and we have placed an out-of-order sign on it until our technician can fix the heating element.', 'decision': 'Needs Approval', 'text': 'Negative reviews require approval under your current rules.' },
        'sensitive': { 'review': 'Someone stole my basket of clothes when I stepped outside.', 'sentiment': 'Negative', 'rating': 1, 'topic': 'Theft allegation', 'employee': 'None', 'risk': 'High', 'blocked': 'Theft', 'decision': 'Auto-Publishing Blocked', 'text': 'This review requires human review before any public response is created or published.' }
    }
}

import json

with open('build-industries.js', 'r', encoding='utf-8') as f:
    content = f.read()

# First replace the html generation to include the script tag at the very end
script_injection = """
    // Inject demo data
    const demoDataScript = `<script>window.REPLYVERA_DEMO_DATA = ${JSON.stringify(ind.demo)};</script>`;
    const modifiedFooter = baseFooter.replace('</body>', demoDataScript + '\\n</body>');
    const finalHtml = modifiedHeader + mainContent + modifiedFooter;
"""
if "const finalHtml = modifiedHeader + mainContent + baseFooter;" in content:
    content = content.replace(
        "const finalHtml = modifiedHeader + mainContent + baseFooter;",
        script_injection
    )

# Now inject the demo data into the array
lines = content.split('\n')
out_lines = []
import json

for line in lines:
    out_lines.append(line)
    match = re.search(r"slug:\s*'([^']+)'", line)
    if match:
        slug = match.group(1)
        if slug in demo_data:
            demo_json = json.dumps(demo_data[slug])
            out_lines.append(f"        demo: {demo_json},")

with open('build-industries.js', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))
