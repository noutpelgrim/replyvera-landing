with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("never published without approval", "blocked from automatic publishing under your configured rules")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
