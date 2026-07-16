import os
import re

def process_file(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()

        original = content

        # 1. Agency locations
        content = content.replace("up to five locations", "10 client locations")
        content = content.replace("five locations", "10 client locations")
        content = content.replace("5 client locations", "10 client locations")
        content = re.sub(
            r"The Agency plan starts at \$149 per month and includes up to 10 client locations\..*?(?=<\/div>)",
            "The Agency plan starts at $149 per month and includes 10 client locations. Additional client locations can be added for a monthly fee.",
            content
        )
        content = re.sub(
            r"The Agency plan starts at \$149 per month and includes 10 client locations\..*?(?=<\/div>)",
            "The Agency plan starts at $149 per month and includes 10 client locations. Additional client locations can be added for a monthly fee.",
            content
        )
        
        # 2. Qualify Sensitive-Review Claims
        content = content.replace("never published automatically", "blocked from automatic publishing under your configured approval rules")
        content = content.replace("never auto-published", "blocked from automatic publishing under your configured approval rules")
        content = content.replace("never bypass approval", "blocked from automatic publishing under your configured approval rules")
        
        if "restaurants" in content or "Food-safety and" in content:
            content = content.replace(
                "Food-safety and serious service complaints are held for manager approval and blocked from automatic publishing under your configured approval rules.",
                "Food-safety and allergy reviews are blocked from automatic publishing under your configured approval rules."
            )
        if "Clinical, billing, and sensitive reviews" in content or "Clinical, privacy, and billing concerns" in content:
            content = content.replace(
                "Clinical, billing, and sensitive reviews are held and never published without approval.",
                "Clinical, privacy, and billing concerns are held for approval under your configured rules."
            )
            content = content.replace(
                "Clinical, billing, and sensitive reviews are held and blocked from automatic publishing under your configured approval rules.",
                "Clinical, privacy, and billing concerns are held for approval under your configured rules."
            )
        if "Safety, supervision, and illness concerns" in content or "Safety, supervision, allergy, and privacy concerns" in content:
            content = content.replace(
                "Safety, supervision, and illness concerns are held for director approval and blocked from automatic publishing under your configured approval rules.",
                "Safety, supervision, allergy, and privacy concerns are held for director approval."
            )
            content = content.replace(
                "Safety, supervision, and illness concerns are held for director approval and never published without approval.",
                "Safety, supervision, allergy, and privacy concerns are held for director approval."
            )
        if "Animal safety concerns are" in content:
            content = content.replace(
                "Animal safety concerns are blocked from automatic publishing under your configured approval rules.",
                "Animal-safety concerns are blocked from automatic publishing under your configured rules."
            )
        if "Vehicle damage and serious billing complaints" in content:
            content = content.replace(
                "Vehicle damage and serious billing complaints are held for management approval and blocked from automatic publishing under your configured approval rules.",
                "Vehicle-damage and serious billing complaints are held for management approval."
            )

        # 3. Standardize Footer Wording
        content = re.sub(
            r"(?i)trusted by storefronts, franchises, and agencies",
            "Built for storefronts, franchises, and agencies.",
            content
        )

        # 4. Standardize Google-Only Platform Copy
        content = content.replace(
            "Currently supported: Google Reviews. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases.",
            "ReplyVera currently supports Google Reviews through Google Business Profile. Facebook, Trustpilot, Booking.com, and Tripadvisor are planned for future releases."
        )

        # 5. Check Pricing Language
        content = content.replace("Unlimited review responses**", "Unlimited review responses")
        content = content.replace("Unlimited review responses*", "Unlimited review responses")
        content = content.replace("Unlimited review responses", "Unlimited review responses*")
        content = content.replace("Unlimited replies", "Unlimited review responses*")
        
        # 6. CTA Consistency
        content = content.replace(">Start Free<", ">Start Free Trial<")
        content = content.replace(">Start Your Free Trial<", ">Start Free Trial<")
        content = content.replace(">View Multi-Location Pricing<", ">Start Multi-Location Trial<")

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            if "node_modules" not in root and "temp_" not in root:
                process_file(os.path.join(root, file))
