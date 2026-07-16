import re

with open('index.html', 'r', encoding='utf-8') as f:
    index_html = f.read()

# Extract Navbar and Mobile Nav from index.html
start_nav = index_html.find('<!-- Navbar -->')
end_mobile_nav = index_html.find('<!-- 2. Hero -->')

if start_nav != -1 and end_mobile_nav != -1:
    nav_content = index_html[start_nav:end_mobile_nav].strip() + '\n\n'
    
    # Modify links for pricing.html
    nav_content = nav_content.replace('href="#product"', 'href="index.html#product"')
    nav_content = nav_content.replace('href="#how-it-works"', 'href="index.html#how-it-works"')
    # Note: #pricing and #faq work locally on pricing.html so leave them as is
    
    with open('pricing.html', 'r', encoding='utf-8') as f:
        pricing_html = f.read()
        
    start_pricing_nav = pricing_html.find('<!-- Navbar -->')
    end_pricing_nav = pricing_html.find('</nav>') + len('</nav>')
    
    # In case there's already a mobile nav in pricing (there shouldn't be, but just in case)
    # The current pricing.html goes from </nav> to <!-- Mobile Plan Selector -->
    # Let's just replace from <!-- Navbar --> to </nav>
    if start_pricing_nav != -1 and end_pricing_nav != -1:
        new_pricing_html = pricing_html[:start_pricing_nav] + nav_content + pricing_html[end_pricing_nav:].lstrip()
        with open('pricing.html', 'w', encoding='utf-8') as f:
            f.write(new_pricing_html)
        print("Updated pricing.html navbar successfully.")
    else:
        print("Could not find navbar in pricing.html")
else:
    print("Could not find navbar in index.html")
