import json
import os

es_demo_translations = {
    "See Vera in Action": "Ver a Vera en Acción",
    "Watch a new Google review arrive, get analyzed, and move through Vera's approval rules.": "Observe cómo llega una nueva reseña de Google, se analiza y pasa por las reglas de aprobación de Vera.",
    "Positive Review": "Reseña Positiva",
    "Negative Review": "Reseña Negativa",
    "Sensitive Review": "Reseña Delicada",
    "Stage 1: New Google Review": "Etapa 1: Nueva Reseña de Google",
    "New Google review received": "Nueva reseña de Google recibida",
    "Stage 2: Review Analysis": "Etapa 2: Análisis de Reseñas",
    "Sentiment:": "Sentimiento:",
    "Rating:": "Calificación:",
    "Topic:": "Tema:",
    "Employee mention:": "Mención de empleado:",
    "Sensitive topic:": "Tema delicado:",
    "Risk level:": "Nivel de riesgo:",
    "Stage 3: Vera Response Generated": "Etapa 3: Respuesta de Vera Generada",
    "Vera's response": "Respuesta de Vera",
    "Sensitive topic detected": "Tema delicado detectado",
    "ReplyVera paused automatic response generation.": "ReplyVera pausó la generación automática de respuestas.",
    "Stage 4: Approval Decision": "Etapa 4: Decisión de Aprobación",
    "Stage 5: Final Outcome": "Etapa 5: Resultado Final",
    "Response published to Google": "Respuesta publicada en Google",
    "Published moments ago": "Publicado hace unos momentos",
    "Approve and Publish": "Aprobar y Publicar",
    "Edit Response": "Editar Respuesta",
    "Keep as Draft": "Mantener como Borrador",
    "Response approved and ready to publish": "Respuesta aprobada y lista para publicar",
    "Escalated to manager": "Escalado al gerente",
    "Suggested actions:": "Acciones sugeridas:",
    "Review the complaint": "Revisar la queja",
    "Contact the customer privately": "Contactar al cliente en privado",
    "Create a response manually": "Crear una respuesta manualmente",
    "Run Demo": "Ejecutar Demo",
    "Skip to Result": "Saltar al Resultado",
    "Pause": "Pausa",
    "Ready to automate your Google review replies?": "¿Listo para automatizar tus respuestas a las reseñas de Google?",
    "Start Free Trial": "Comenzar Prueba Gratuita",
    "View Pricing": "Ver Precios",
    "Start Agency Trial": "Iniciar Prueba de Agencia",
    "Replay Demo": "Repetir Demo"
}

nl_demo_translations = {
    "See Vera in Action": "Bekijk Vera in Actie",
    "Watch a new Google review arrive, get analyzed, and move through Vera's approval rules.": "Kijk hoe een nieuwe Google-review binnenkomt, wordt geanalyseerd en door de goedkeuringsregels van Vera gaat.",
    "Positive Review": "Positieve Review",
    "Negative Review": "Negatieve Review",
    "Sensitive Review": "Gevoelige Review",
    "Stage 1: New Google Review": "Fase 1: Nieuwe Google Review",
    "New Google review received": "Nieuwe Google-review ontvangen",
    "Stage 2: Review Analysis": "Fase 2: Review Analyse",
    "Sentiment:": "Sentiment:",
    "Rating:": "Beoordeling:",
    "Topic:": "Onderwerp:",
    "Employee mention:": "Werknemer vermeld:",
    "Sensitive topic:": "Gevoelig onderwerp:",
    "Risk level:": "Risiconiveau:",
    "Stage 3: Vera Response Generated": "Fase 3: Vera Reactie Gegenereerd",
    "Vera's response": "Reactie van Vera",
    "Sensitive topic detected": "Gevoelig onderwerp gedetecteerd",
    "ReplyVera paused automatic response generation.": "ReplyVera heeft automatische reactiegeneratie gepauzeerd.",
    "Stage 4: Approval Decision": "Fase 4: Goedkeuringsbesluit",
    "Stage 5: Final Outcome": "Fase 5: Eindresultaat",
    "Response published to Google": "Reactie gepubliceerd op Google",
    "Published moments ago": "Zojuist gepubliceerd",
    "Approve and Publish": "Goedkeuren en Publiceren",
    "Edit Response": "Reactie Bewerken",
    "Keep as Draft": "Als Concept Bewaren",
    "Response approved and ready to publish": "Reactie goedgekeurd en klaar om te publiceren",
    "Escalated to manager": "Geëscaleerd naar manager",
    "Suggested actions:": "Voorgestelde acties:",
    "Review the complaint": "Bekijk de klacht",
    "Contact the customer privately": "Neem privé contact op met de klant",
    "Create a response manually": "Maak handmatig een reactie",
    "Run Demo": "Demo Starten",
    "Skip to Result": "Ga naar Resultaat",
    "Pause": "Pauze",
    "Ready to automate your Google review replies?": "Klaar om je Google-reviewreacties te automatiseren?",
    "Start Free Trial": "Start Gratis Proefperiode",
    "View Pricing": "Bekijk Prijzen",
    "Start Agency Trial": "Start Agency Proefperiode",
    "Replay Demo": "Demo Herhalen"
}

def update_locale(filepath, new_data):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    for k, v in new_data.items():
        data[k] = v
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

with open("locales/en.json", "r", encoding="utf-8") as f:
    en_dict = json.load(f)

# generate new keys and mapping
new_en = {}
new_es = {}
new_nl = {}
i = 0
for en_text, es_text in es_demo_translations.items():
    key = f"demo_text_{i}"
    new_en[key] = en_text
    new_es[key] = es_text
    new_nl[key] = nl_demo_translations[en_text]
    i += 1

update_locale("locales/en.json", new_en)
update_locale("locales/es.json", new_es)
update_locale("locales/nl.json", new_nl)
print("Updated locale files")
