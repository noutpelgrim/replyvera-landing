import os

def fix_file(lang):
    path = f"{lang}/demo.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if lang == "es":
        content = content.replace("Thank you for your kind review. We're glad you had a great experience and that Sarah was especially helpful. We'll be sure to share your feedback with her.", "Gracias por su amable reseña. Nos alegra que haya tenido una gran experiencia y que Sarah haya sido de gran ayuda. Nos aseguraremos de compartir sus comentarios con ella.")
        content = content.replace("Thank you for sharing your feedback. We're sorry the service took longer than expected and that the delay was not clearly explained. We're sharing this with the team so we can improve.", "Gracias por compartir sus comentarios. Lamentamos que el servicio haya demorado más de lo esperado y que el retraso no se haya explicado claramente. Lo estamos compartiendo con el equipo para que podamos mejorar.")
    else:
        content = content.replace("Thank you for your kind review. We're glad you had a great experience and that Sarah was especially helpful. We'll be sure to share your feedback with her.", "Bedankt voor uw vriendelijke beoordeling. We zijn blij dat u een geweldige ervaring had en dat Sarah bijzonder behulpzaam was. We zullen uw feedback zeker met haar delen.")
        content = content.replace("Thank you for sharing your feedback. We're sorry the service took longer than expected and that the delay was not clearly explained. We're sharing this with the team so we can improve.", "Bedankt voor het delen van uw feedback. Het spijt ons dat de service langer duurde dan verwacht en dat de vertraging niet duidelijk werd uitgelegd. We delen dit met het team zodat we kunnen verbeteren.")
        
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

fix_file("es")
fix_file("nl")
print("Quotes fixed!")
