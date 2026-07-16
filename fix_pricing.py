import re

with open('build-industries.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Change function signature
content = content.replace("function renderPricingSection(isAgency) {", "function renderPricingSection(isAgency, ind) {")

# Change call site
# The call site looks like: const pricingSection = renderPricingSection(isAgency);
content = content.replace("const pricingSection = renderPricingSection(isAgency);", "const pricingSection = renderPricingSection(isAgency, ind);")

with open('build-industries.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed renderPricingSection signature.")
