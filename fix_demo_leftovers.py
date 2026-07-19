import os

es_replacements = {
    "Friendly team and excellent service. Sarah was especially helpful.": "Equipo amable y excelente servicio. Sarah fue especialmente servicial.",
    "Positive": "Positivo",
    "Customer service": "Servicio al cliente",
    "Sarah": "Sarah",
    "Low": "Bajo",
    "Thank you for your kind review. We\\'re glad you had a great experience and that Sarah was especially helpful. We\\'ll be sure to share your feedback with her.": "Gracias por su amable reseña. Nos alegra que haya tenido una gran experiencia y que Sarah haya sido de gran ayuda. Nos aseguraremos de compartir sus comentarios con ella.",
    "Safe to Auto-Publish": "Seguro para publicar automáticamente",
    "This review matches your automatic publishing rules.": "Esta reseña coincide con sus reglas de publicación automática.",
    
    "The service took much longer than expected, and nobody explained the delay.": "El servicio tomó mucho más tiempo de lo esperado y nadie explicó el retraso.",
    "Negative": "Negativo",
    "Wait time and communication": "Tiempo de espera y comunicación",
    "None": "Ninguno",
    "Medium": "Medio",
    "Thank you for sharing your feedback. We\\'re sorry the service took longer than expected and that the delay was not clearly explained. We\\'re sharing this with the team so we can improve.": "Gracias por compartir sus comentarios. Lamentamos que el servicio haya demorado más de lo esperado y que el retraso no se haya explicado claramente. Lo estamos compartiendo con el equipo para que podamos mejorar.",
    "Needs Approval": "Necesita aprobación",
    "Negative reviews require approval under your current rules.": "Las reseñas negativas requieren aprobación bajo sus reglas actuales.",
    
    "This caused an injury, and the manager has not responded.": "Esto causó una lesión y el gerente no ha respondido.",
    "Injury and management response": "Lesiones y respuesta de la gerencia",
    "High": "Alto",
    "Injury": "Lesión",
    "Auto-Publishing Blocked": "Publicación automática bloqueada",
    "This review requires human review before any public response is created or published.": "Esta reseña requiere revisión humana antes de que se cree o publique cualquier respuesta pública.",
    
    "</i> New Google review received": "</i> Nueva reseña de Google recibida",
    " stars": " estrellas"
}

nl_replacements = {
    "Friendly team and excellent service. Sarah was especially helpful.": "Vriendelijk team en uitstekende service. Sarah was bijzonder behulpzaam.",
    "Positive": "Positief",
    "Customer service": "Klantenservice",
    "Sarah": "Sarah",
    "Low": "Laag",
    "Thank you for your kind review. We\\'re glad you had a great experience and that Sarah was especially helpful. We\\'ll be sure to share your feedback with her.": "Bedankt voor uw vriendelijke beoordeling. We zijn blij dat u een geweldige ervaring had en dat Sarah bijzonder behulpzaam was. We zullen uw feedback zeker met haar delen.",
    "Safe to Auto-Publish": "Veilig om automatisch te publiceren",
    "This review matches your automatic publishing rules.": "Deze recensie komt overeen met uw regels voor automatische publicatie.",
    
    "The service took much longer than expected, and nobody explained the delay.": "De service duurde veel langer dan verwacht, en niemand legde de vertraging uit.",
    "Negative": "Negatief",
    "Wait time and communication": "Wachttijd en communicatie",
    "None": "Geen",
    "Medium": "Gemiddeld",
    "Thank you for sharing your feedback. We\\'re sorry the service took longer than expected and that the delay was not clearly explained. We\\'re sharing this with the team so we can improve.": "Bedankt voor het delen van uw feedback. Het spijt ons dat de service langer duurde dan verwacht en dat de vertraging niet duidelijk werd uitgelegd. We delen dit met het team zodat we kunnen verbeteren.",
    "Needs Approval": "Vereist goedkeuring",
    "Negative reviews require approval under your current rules.": "Negatieve recensies vereisen goedkeuring volgens uw huidige regels.",
    
    "This caused an injury, and the manager has not responded.": "Dit veroorzaakte een blessure, en de manager heeft niet gereageerd.",
    "Injury and management response": "Letsel en reactie van het management",
    "High": "Hoog",
    "Injury": "Letsel",
    "Auto-Publishing Blocked": "Automatische publicatie geblokkeerd",
    "This review requires human review before any public response is created or published.": "Deze recensie vereist menselijke beoordeling voordat een openbare reactie wordt gemaakt of gepubliceerd.",
    
    "</i> New Google review received": "</i> Nieuwe Google-review ontvangen",
    " stars": " sterren"
}

def apply_replacements(lang, replacements):
    path = f"{lang}/demo.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    for en, translated in replacements.items():
        content = content.replace(en, translated)
        
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

apply_replacements("es", es_replacements)
apply_replacements("nl", nl_replacements)
print("Demo left-overs translated!")
