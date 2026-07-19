import json
import os

with open("demo.js", "r", encoding="utf-8") as f:
    demo_js = f.read()

with open("locales/en.json", "r", encoding="utf-8") as f:
    en_dict = json.load(f)
with open("locales/es.json", "r", encoding="utf-8") as f:
    es_dict = json.load(f)
with open("locales/nl.json", "r", encoding="utf-8") as f:
    nl_dict = json.load(f)

# Hardcoded strings from demo.js to translate
strings_to_translate = [
    "See Vera in Action",
    "Watch a new Google review arrive, get analyzed, and move through Vera's approval rules.",
    "Positive Review",
    "Negative Review",
    "Sensitive Review",
    "Stage 1: New Google Review",
    "New Google review received",
    "Stage 2: Review Analysis",
    "Sentiment:",
    "Rating:",
    "Topic:",
    "Employee mention:",
    "Sensitive topic:",
    "Risk level:",
    "Stage 3: Vera Response Generated",
    "Vera's response",
    "Sensitive topic detected",
    "ReplyVera paused automatic response generation.",
    "Stage 4: Approval Decision",
    "Stage 5: Final Outcome",
    "Response published to Google",
    "Published moments ago",
    "Approve and Publish",
    "Edit Response",
    "Keep as Draft",
    "Response approved and ready to publish",
    "Escalated to manager",
    "Suggested actions:",
    "Review the complaint",
    "Contact the customer privately",
    "Create a response manually",
    "Run Demo",
    "Skip to Result",
    "Pause",
    "Ready to automate your Google review replies?",
    "Start Free Trial",
    "View Pricing",
    "Start Agency Trial",
    "Replay Demo",
    "Friendly team and excellent service. Sarah was especially helpful.",
    "Positive",
    "Customer service",
    "Sarah",
    "Low",
    "Safe to Auto-Publish",
    "This review matches your automatic publishing rules.",
    "The service took much longer than expected, and nobody explained the delay.",
    "Negative",
    "Wait time and communication",
    "None",
    "Medium",
    "Needs Approval",
    "Negative reviews require approval under your current rules.",
    "This caused an injury, and the manager has not responded.",
    "Injury and management response",
    "High",
    "Injury",
    "Auto-Publishing Blocked",
    "This review requires human review before any public response is created or published.",
    "Policy violation"
]

# Note: The long responses are slightly modified so we must match them carefully
long_str1 = "Thank you for your kind review. We’re glad you had a great experience and that Sarah was especially helpful. We’ll be sure to share your feedback with her."
long_str2 = "Thank you for sharing your feedback. We’re sorry the service took longer than expected and that the delay was not clearly explained. We’re sharing this with the team so we can improve."
strings_to_translate.extend([long_str1, long_str2])

def localize(lang, target_dict):
    content = demo_js
    for s in strings_to_translate:
        # Find key in en
        translated = s
        for k, v in en_dict.items():
            if v == s:
                translated = target_dict.get(k, s)
                break
        
        # Replace occurrences. To avoid issues with quotes, replace exactly inside HTML tags or JS quotes
        content = content.replace(">" + s + "<", ">" + translated + "<")
        content = content.replace("'" + s + "'", "'" + translated + "'")
        content = content.replace('"' + s + '"', '"' + translated + '"')
        
    # fix pricing link
    content = content.replace('href="/pricing.html"', 'href="pricing.html"')
    
    # Save file
    os.makedirs(lang, exist_ok=True)
    with open(f"{lang}/demo.js", "w", encoding="utf-8") as f:
        f.write(content)

localize("es", es_dict)
localize("nl", nl_dict)
print("Demo localized")
