import re

def fix(lang):
    with open(f"{lang}/demo.js", "r", encoding="utf-8") as f:
        text = f.read()

    # Spanish
    if lang == "es":
        text = re.sub(r"We.re glad you had a great experience and that Sarah was especially helpful\. We.ll be sure to share your feedback with her\.", "Nos alegra que haya tenido una gran experiencia y que Sarah haya sido de gran ayuda. Nos aseguraremos de compartir sus comentarios con ella.", text)
        text = re.sub(r"We.re sorry the service took longer than expected and that the delay was not clearly explained\. We.re sharing this with the team so we can improve\.", "Lamentamos que el servicio haya demorado más de lo esperado y que el retraso no se haya explicado claramente. Lo estamos compartiendo con el equipo para que podamos mejorar.", text)
    else:
        text = re.sub(r"We.re glad you had a great experience and that Sarah was especially helpful\. We.ll be sure to share your feedback with her\.", "We zijn blij dat u een geweldige ervaring had en dat Sarah bijzonder behulpzaam was. We zullen uw feedback zeker met haar delen.", text)
        text = re.sub(r"We.re sorry the service took longer than expected and that the delay was not clearly explained\. We.re sharing this with the team so we can improve\.", "Het spijt ons dat de service langer duurde dan verwacht en dat de vertraging niet duidelijk werd uitgelegd. We delen dit met het team zodat we kunnen verbeteren.", text)

    with open(f"{lang}/demo.js", "w", encoding="utf-8") as f:
        f.write(text)

fix("es")
fix("nl")
print("Fixed curly quotes!")
