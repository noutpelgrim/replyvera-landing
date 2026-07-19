import glob

replacements = [
    ('>Product</a>', '>{{ index_product_deb1 }}</a>'),
    ('>How It Works</a>', '>{{ index_how_it_works_aabd }}</a>'),
    ('>Pricing</a>', '>{{ index_pricing_e22a }}</a>'),
    ('>Contact Us</a>', '>{{ index_contact_us_9cfc }}</a>'),
    ('>Log In</a>', '>{{ index_log_in_3bbb }}</a>'),
    ('>Terms of Service</a>', '>{{ index_terms_of_service_3b6c }}</a>'),
    ('>Privacy Policy</a>', '>{{ index_privacy_policy_fa2e }}</a>'),
    ('>Cookie Policy</a>', '>{{ index_cookie_policy_26b3 }}</a>'),
    ('&copy; 2026 ReplyVera. All rights reserved.', '{{ index_2026_replyvera_all_rights_r_c9ec }}')
]

for filepath in glob.glob('src/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Footer fixed")
