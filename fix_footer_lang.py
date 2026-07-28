import re

files = ['terms.html', 'privacy.html', 'cookie.html']

# Match the Company footer-col from its title through the closing </div>
# capturing everything between Contact Us </li> and </ul></div>
pattern = re.compile(
    r'(<div class="footer-col">\s*<div class="footer-col-title">Company</div>\s*<ul class="footer-links">\s*<li><a href="mailto:info@replyvera\.com">Contact Us</a></li>\s*).*?(\s*</ul>\s*</div>)',
    re.DOTALL
)

good_middle = '                        <li><a href="https://dashboard.replyvera.com/login">Log In</a></li>\n'

def replacer(m):
    return m.group(1) + good_middle + m.group(2)

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content, count = re.subn(pattern, replacer, content)
    if count:
        with open(fname, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Fixed {fname} ({count} replacement(s))')
    else:
        print(f'No match in {fname}')
