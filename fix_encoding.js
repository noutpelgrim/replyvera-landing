const fs = require('fs');

const es = {
    'See Vera in Action': 'Ver a Vera en Acción',
    'Watch a new Google review arrive, get analyzed, and move through Vera\'s approval rules.': 'Observe cómo llega una nueva reseña de Google, se analiza y pasa por las reglas de aprobación de Vera.',
    'Positive Review': 'Reseña Positiva',
    'Negative Review': 'Reseña Negativa',
    'Sensitive Review': 'Reseña Delicada',
    'Stage 1: New Google Review': 'Etapa 1: Nueva Reseña de Google',
    'New Google review received': 'Nueva reseña de Google recibida',
    'Stage 2: Review Analysis': 'Etapa 2: Análisis de Reseñas',
    'Sentiment:': 'Sentimiento:',
    'Rating:': 'Calificación:',
    'Topic:': 'Tema:',
    'Employee mention:': 'Mención de empleado:',
    'Sensitive topic:': 'Tema delicado:',
    'Risk level:': 'Nivel de riesgo:',
    'Stage 3: Vera Response Generated': 'Etapa 3: Respuesta de Vera Generada',
    'Vera\'s response': 'Respuesta de Vera',
    'Sensitive topic detected': 'Tema delicado detectado',
    'ReplyVera paused automatic response generation.': 'ReplyVera pausó la generación automática de respuestas.',
    'Stage 4: Approval Decision': 'Etapa 4: Decisión de Aprobación',
    'Stage 5: Final Outcome': 'Etapa 5: Resultado Final',
    'Response published to Google': 'Respuesta publicada en Google',
    'Published moments ago': 'Publicado hace unos momentos',
    'Approve and Publish': 'Aprobar y Publicar',
    'Edit Response': 'Editar Respuesta',
    'Keep as Draft': 'Mantener como Borrador',
    'Response approved and ready to publish': 'Respuesta aprobada y lista para publicar',
    'Escalated to manager': 'Escalado al gerente',
    'Suggested actions:': 'Acciones sugeridas:',
    'Review the complaint': 'Revisar la queja',
    'Contact the customer privately': 'Contactar al cliente en privado',
    'Create a response manually': 'Crear una respuesta manualmente',
    'Run Demo': 'Ejecutar Demo',
    'Skip to Result': 'Saltar al Resultado',
    'Pause': 'Pausa',
    'Ready to automate your Google review replies?': '¿Listo para automatizar tus respuestas a las reseñas de Google?',
    'Start Free Trial': 'Comenzar Prueba Gratuita',
    'View Pricing': 'Ver Precios',
    "Start Agency Trial": "Iniciar Prueba de Agencia",
    "Replay Demo": "Repetir Demo"
};

const enDict = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const esDict = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));

let i = 0;
for (const [k, v] of Object.entries(es)) {
    const key = 'demo_text_ex_' + i;
    esDict[key] = v;
    i++;
}

fs.writeFileSync('locales/es.json', JSON.stringify(esDict, null, 2));
console.log('es.json encoding fixed!');
