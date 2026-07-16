import os
for f_name in ['pricing.html', 'build-industries.js']:
    with open(f_name, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace("Unlimited review responses**", "Unlimited review responses*")
    with open(f_name, 'w', encoding='utf-8') as f:
        f.write(c)
