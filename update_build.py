import re
import os

with open('build-industries.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update the industries array with themes
themes = {
    'restaurants': "{ accent: '#F59E0B', motif: 'radial', divider: 'glow' }",
    'dentists': "{ accent: '#3B82F6', motif: 'grid', divider: 'line' }",
    'agencies': "{ accent: '#8B5CF6', motif: 'nodes', divider: 'glow' }",
    'martial-arts': "{ accent: '#DC2626', motif: 'diagonal', divider: 'line' }",
    'childcare': "{ accent: '#14B8A6', motif: 'rounded', divider: 'glow' }",
    'tutoring': "{ accent: '#6366F1', motif: 'dots', divider: 'line' }",
    'pet-care': "{ accent: '#22C55E', motif: 'paws', divider: 'glow' }",
    'car-washes': "{ accent: '#06B6D4', motif: 'waves', divider: 'line' }",
    'laundromats': "{ accent: '#2DD4BF', motif: 'bubbles', divider: 'glow' }"
}

# 2. Add themes to the objects in industryPages
for slug, theme_str in themes.items():
    pattern = r"(slug: '" + slug + r"',)"
    replacement = r"\1\n        theme: " + theme_str + ","
    content = re.sub(pattern, replacement, content)

# 3. Add active state logic to navbar
# Wait, patchHeader takes `h` and currently doesn't know the slug.
# We need to change `patchHeader` signature or do it in the build loop.
# Let's change the build loop where `baseHeader` is used.
build_loop_start = r"    let header = baseHeader\n        .replace(/<title>[^<]+<\/title>/, `<title>${ind.metaTitle}</title>`)\n        .replace(/<meta name=\"description\" content=\"[^\"]+\">/, `<meta name=\"description\" content=\"${ind.metaDescription}\">`);"
build_loop_end = r"    let header = baseHeader\n        .replace(/<title>[^<]+<\/title>/, `<title>${ind.metaTitle}</title>`)\n        .replace(/<meta name=\"description\" content=\"[^\"]+\">/, `<meta name=\"description\" content=\"${ind.metaDescription}\">`);\n\n    // Highlight active industry\n    header = header.replace(`href=\"/industries/${ind.slug}\" class=\"dropdown-item\"`, `href=\"/industries/${ind.slug}\" class=\"dropdown-item active\"`);\n    header = header.replace(`href=\"/industries/${ind.slug}\" class=\"mobile-industry-item\"`, `href=\"/industries/${ind.slug}\" class=\"mobile-industry-item active\"`);"
content = content.replace(build_loop_start, build_loop_end)

# 4. Inject CSS variables and motifs in renderIndustryPage
render_func_start = "function renderIndustryPage(ind) {\n    const isAgency = ind.slug === 'agencies';"
render_func_new = """function renderIndustryPage(ind) {
    const isAgency = ind.slug === 'agencies';
    const themeStyles = `
    <style>
        :root {
            --industry-accent: ${ind.theme.accent};
            --industry-accent-soft: ${ind.theme.accent}20;
            --industry-icon-bg: ${ind.theme.accent}15;
            --industry-accent-glow: ${ind.theme.accent}33;
        }
    </style>
    `;
"""
content = content.replace(render_func_start, render_func_new)

# Inject motif data attribute and divider
# Replace <header class="hero"...> with <header class="hero" data-motif="${ind.theme.motif}"...>
hero_start = r"<header class=\"hero\" style=\"padding:140px 0 80px;\">"
hero_new = r"<header class=\"hero industry-hero\" data-motif=\"${ind.theme.motif}\" style=\"padding:140px 0 80px;\">"
content = content.replace(hero_start, hero_new)

# Eyebrow color
eyebrow_old = r"<i data-lucide=\"google\" style=\"width:12px;height:12px;color:#DB4437;\"></i>"
# Keep google icon red as it's their brand, but maybe the text should be accent?
# The request says: "Apply it to: Hero eyebrow"
eyebrow_full = r"<div class=\"eyebrow\">"
eyebrow_full_new = r"<div class=\"eyebrow industry-eyebrow\">"
content = content.replace(eyebrow_full, eyebrow_full_new)

# Make sure topic tags use the accent color. In `renderTopics`, we can add a class.
topics_func_old = r"function renderTopics(topics) {\n    return topics.map(t => `<span class=\"topic-tag\">${t}</span>`).join('');\n}"
topics_func_new = r"function renderTopics(topics) {\n    return topics.map(t => `<span class=\"topic-tag industry-tag\">${t}</span>`).join('');\n}"
content = content.replace(topics_func_old, topics_func_new)

# We need to prepend themeStyles to the return of renderIndustryPage
return_old = r"return `${heroSection}${benefitsSection}${howItWorksSection}${reviewsSection}${sensitiveSection}${pricingSection}${faqSection}${ctaSection}`;"
return_new = r"return `${themeStyles}${heroSection}${benefitsSection}${howItWorksSection}${reviewsSection}${sensitiveSection}${pricingSection}${faqSection}${ctaSection}`;"
content = content.replace(return_old, return_new)

# Add dividers. Let's add them between sections
benefits_sec_start = r"<!-- Three Benefits -->"
divider_html = r"${ind.theme.divider === 'glow' ? '<div class=\"industry-divider-glow\"></div>' : '<div class=\"industry-divider-line\"></div>'}\n    "
content = content.replace(benefits_sec_start, divider_html + benefits_sec_start)

# Add dividers between other sections too
how_it_works_start = r"<!-- How It Works -->"
content = content.replace(how_it_works_start, divider_html + how_it_works_start)

reviews_start = r"<!-- Review Examples -->"
content = content.replace(reviews_start, divider_html + reviews_start)

sensitive_start = r"<!-- Sensitive Review Protection -->"
content = content.replace(sensitive_start, divider_html + sensitive_start)

pricing_start = r"<!-- Pricing -->"
content = content.replace(pricing_start, divider_html + pricing_start)

faq_start = r"<!-- FAQ -->"
content = content.replace(faq_start, divider_html + faq_start)

with open('build-industries.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated build-industries.js successfully.")
