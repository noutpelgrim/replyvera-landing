import os

def fix_file(lang):
    path = f"{lang}/demo.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if lang == "es":
        content = content.replace("Thank you for your kind review", "Gracias por su amable reseña")
        content = content.replace("We\\'re glad you had a great experience and that Sarah was especially helpful", "Nos alegra que haya tenido una gran experiencia y que Sarah haya sido de gran ayuda")
        content = content.replace("We\\'ll be sure to share your feedback with her.", "Nos aseguraremos de compartir sus comentarios con ella.")
        content = content.replace("We're glad you had a great experience and that Sarah was especially helpful", "Nos alegra que haya tenido una gran experiencia y que Sarah haya sido de gran ayuda")
        content = content.replace("We'll be sure to share your feedback with her.", "Nos aseguraremos de compartir sus comentarios con ella.")
        
        content = content.replace("Thank you for sharing your feedback.", "Gracias por compartir sus comentarios.")
        content = content.replace("We\\'re sorry the service took longer than expected and that the delay was not clearly explained.", "Lamentamos que el servicio haya demorado más de lo esperado y que el retraso no se haya explicado claramente.")
        content = content.replace("We\\'re sharing this with the team so we can improve.", "Lo estamos compartiendo con el equipo para que podamos mejorar.")
        content = content.replace("We're sorry the service took longer than expected and that the delay was not clearly explained.", "Lamentamos que el servicio haya demorado más de lo esperado y que el retraso no se haya explicado claramente.")
        content = content.replace("We're sharing this with the team so we can improve.", "Lo estamos compartiendo con el equipo para que podamos mejorar.")
    else:
        content = content.replace("Thank you for your kind review", "Bedankt voor uw vriendelijke beoordeling")
        content = content.replace("We\\'re glad you had a great experience and that Sarah was especially helpful", "We zijn blij dat u een geweldige ervaring had en dat Sarah bijzonder behulpzaam was")
        content = content.replace("We\\'ll be sure to share your feedback with her.", "We zullen uw feedback zeker met haar delen.")
        content = content.replace("We're glad you had a great experience and that Sarah was especially helpful", "We zijn blij dat u een geweldige ervaring had en dat Sarah bijzonder behulpzaam was")
        content = content.replace("We'll be sure to share your feedback with her.", "We zullen uw feedback zeker met haar delen.")
        
        content = content.replace("Thank you for sharing your feedback.", "Bedankt voor het delen van uw feedback.")
        content = content.replace("We\\'re sorry the service took longer than expected and that the delay was not clearly explained.", "Het spijt ons dat de service langer duurde dan verwacht en dat de vertraging niet duidelijk werd uitgelegd.")
        content = content.replace("We\\'re sharing this with the team so we can improve.", "We delen dit met het team zodat we kunnen verbeteren.")
        content = content.replace("We're sorry the service took longer than expected and that the delay was not clearly explained.", "Het spijt ons dat de service langer duurde dan verwacht en dat de vertraging niet duidelijk werd uitgelegd.")
        content = content.replace("We're sharing this with the team so we can improve.", "We delen dit met het team zodat we kunnen verbeteren.")
        
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

fix_file("es")
fix_file("nl")
print("Quotes fixed 2!")
