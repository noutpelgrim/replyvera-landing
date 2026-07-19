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

# Sort by length descending to replace longer strings first
sorted_keys = sorted(en_dict.keys(), key=lambda k: len(en_dict[k]), reverse=True)

def localize(lang, target_dict):
    content = demo_js
    for k in sorted_keys:
        s = en_dict[k]
        # Ignore very short strings or strings that are just code
        if len(s) < 2 or "{" in s or "window.va" in s or s in ["ReplyVera", "Vera"]:
            continue
            
        translated = target_dict.get(k, s)
        if s != translated:
            content = content.replace(">" + s + "<", ">" + translated + "<")
            content = content.replace("'" + s + "'", "'" + translated + "'")
            content = content.replace('"' + s + '"', '"' + translated + '"')
            content = content.replace("`" + s + "`", "`" + translated + "`")

    # fix absolute link
    content = content.replace('href="/pricing.html"', 'href="pricing.html"')
    
    os.makedirs(lang, exist_ok=True)
    with open(lang + "/demo.js", "w", encoding="utf-8") as f:
        f.write(content)

localize("es", es_dict)
localize("nl", nl_dict)
print("Localized demo.js generated")
