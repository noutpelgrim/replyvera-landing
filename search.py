import os

search_terms = [
    "five locations", "5 client locations", "10 client locations", "trusted by storefronts", "never published automatically", 
    "never auto-published", "never published", "never bypass", "unlimited review responses", "Unlimited replies",
    "Facebook", "Trustpilot", "Booking.com", "Tripadvisor",
    "Start Free", "Start Trial", "Start Your Free Trial"
]

for root, _, files in os.walk('.'):
    for file in files:
        if file.endswith('.html') or file.endswith('.js'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                lines = f.readlines()
                for i, line in enumerate(lines):
                    for term in search_terms:
                        if term.lower() in line.lower():
                            print(f"{path}:{i+1} : {term} -> {line.strip()}")
