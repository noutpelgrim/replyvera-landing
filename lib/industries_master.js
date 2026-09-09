/**
 * ReplyVera Centralized Master Industry Registry
 * Single Source of Truth for all Industry verticals across English (en), Dutch (nl), and Spanish (es).
 */

const industriesData = [
    {
        "id": "hotels",
        "slugs": {
            "en": "hotels",
            "nl": "hotels",
            "es": "hoteles"
        },
        "icon": "hotel",
        "iconBgClass": "hotel-icon",
        "theme": {
            "accent": "#2563EB",
            "motif": "luxury",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Hotels & Hospitality",
                "dropdownDesc": "Prompt guest replies with safety filters for hygiene and booking issues.",
                "metaTitle": "Google Review Automation for Hotels & Hospitality | ReplyVera",
                "metaDescription": "Automate Google review responses for your hotel. ReplyVera drafts warm, personalized replies while escalating hygiene and booking complaints to managers.",
                "heroHeadline": "Warm, Timely Google Review Replies for Hotels & Lodging",
                "heroDescription": "ReplyVera publishes prompt, hospitable responses to guest praise while routing cleanliness, booking, and noise complaints directly to your front-desk manager.",
                "mockupPositive": "The front desk team upgraded our room for our anniversary and breakfast was superb.",
                "mockupNegative": "Check-in took over 30 minutes and the air conditioning in room 204 was noisy.",
                "mockupSensitive": "Found bed bugs in room 312 and the night manager refused to speak with us.",
                "benefitsHeadline": "Five-Star Hospitality in Every Google Review Reply",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Front-Desk Hours",
                        "text": "Respond within minutes to positive guest reviews without burdening your busy reception staff."
                    },
                    {
                        "icon": "award",
                        "title": "Boost Booking Rank",
                        "text": "Frequent, professional replies signal active management to future travelers and Google algorithms."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Protect Hotel Reputation",
                        "text": "Health, pest, and security complaints are stopped instantly before any response is published."
                    }
                ],
                "step2Text": "Set hospitality tone, VIP guest recognition rules, and alert thresholds for room cleanliness.",
                "step3Text": "Routine guest compliments publish automatically. Severe complaints notify your General Manager immediately.",
                "reviewsHeadline": "From Anniversary Stays to Maintenance Issues",
                "reviewsSubhead": "See how ReplyVera handles hotel guest feedback with promptness and tact.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"The front desk team upgraded our room for our anniversary and breakfast was superb.\"",
                        "reply": "\"Thank you for celebrating your anniversary with us! We are thrilled our team could make your stay special, and we look forward to welcoming you back.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Check-In Delay",
                        "quote": "\"Check-in took over 30 minutes and the air conditioning in room 204 was noisy.\"",
                        "reply": "\"Thank you for sharing your feedback. We apologize for the delay at check-in and the AC noise. Our maintenance team has inspected room 204, and we hope to host you again for a seamless stay.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Pest / Sanitation Alert",
                        "quote": "\"Found bed bugs in room 312 and the night manager refused to speak with us.\"",
                        "isAlert": true,
                        "alertTitle": "Sanitation complaint detected",
                        "alertText": "Auto-publishing blocked. General Manager and housekeeping alerted immediately."
                    }
                ],
                "sensitiveHeadline": "Pest, Safety, and Overbooking Feedback Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Bed bugs / Pests",
                    "Room Hygiene Violations",
                    "Overbooking / Walked Guests",
                    "Theft / Security",
                    "Billing Disputes",
                    "Noise Inaction"
                ],
                "faqItems": [
                    {
                        "q": "Can ReplyVera handle multi-property hotel groups?",
                        "a": "Yes. Our Multi-Location and Agency plans allow centralized management across multiple property profiles."
                    },
                    {
                        "q": "How does ReplyVera handle negative reviews or pest claims?",
                        "a": "Any review mentioning bed bugs, pests, or safety issues is automatically blocked from publishing and sent to management for manual review."
                    }
                ],
                "finalCtaHeadline": "Deliver 5-Star Hospitality to Every Review",
                "finalCtaDescription": "Start your 14-day free trial today. Connect your Google Business Profile in minutes."
            },
            "nl": {
                "name": "Hotels & Gastvrijheid",
                "dropdownDesc": "Snelle gastreacties met filters voor hygiëne en boekingsklachten.",
                "metaTitle": "Google Review Automatisering voor Hotels & Gastvrijheid | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor uw hotel. ReplyVera reageert gastvrij op complimenten en escaleert klachten naar de receptiemanager.",
                "heroHeadline": "Gastvrije Google Review Reacties voor Hotels en Accommodaties",
                "heroDescription": "ReplyVera publiceert snelle, warme reacties op gastcomplimenten en houdt klachten over hygiëne, lawaai of boekingen onder controle van de duty manager.",
                "mockupPositive": "Het receptieteam gaf ons een kamerupgrade voor onze trouwdag en het ontbijt was heerlijk.",
                "mockupNegative": "Inchecken duurde meer dan 30 minuten en de airco in kamer 204 maakte veel lawaai.",
                "mockupSensitive": "Bedwantsen gevonden in kamer 312 en de nachtmanager weigerde ons te woord te staan.",
                "benefitsHeadline": "Vijfsterren Gastvrijheid in Elk Google Antwoord",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Receptietijd",
                        "text": "Reageer binnen minuten op positieve reviews zonder dat de receptie handmatig hoeft te typen."
                    },
                    {
                        "icon": "award",
                        "title": "Verhoog Boekingen",
                        "text": "Actieve en professionele reacties versterken uw zichtbaarheid en reputatie op Google Maps."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Bescherm Hotelreputatie",
                        "text": "Meldingen over ongedierte, hygiëne of veiligheid worden direct geblokkeerd voor handmatige opvolging."
                    }
                ],
                "step2Text": "Stel uw gastvrije toon in, herkenning van VIP-gasten en escalatieregels voor kamerhygiëne.",
                "step3Text": "Routinematige complimenten gaan direct live. Ernstige klachten waarschuwen direct de General Manager.",
                "reviewsHeadline": "Van Jubileumverblijf tot Onderhoudsklachten",
                "reviewsSubhead": "Zie hoe ReplyVera gastbeoordelingen discreet en vlot afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Het receptieteam gaf ons een kamerupgrade voor onze trouwdag en het ontbijt was heerlijk.\"",
                        "reply": "\"Hartelijk dank voor uw prachtige review! Geweldig dat we uw jubileum speciaal konden maken. We kijken uit naar uw volgende verblijf!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Vertraging bij Inchecken",
                        "quote": "\"Inchecken duurde meer dan 30 minuten en de airco in kamer 204 maakte veel lawaai.\"",
                        "reply": "\"Bedankt voor uw feedback. Onze excuses voor de wachttijd en het ongemak met de airco. Onze technische dienst heeft dit inmiddels verholpen.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Hygiëne Alert",
                        "quote": "\"Bedwantsen gevonden in kamer 312 en de nachtmanager weigerde ons te woord te staan.\"",
                        "isAlert": true,
                        "alertTitle": "Ernstige hygiëneklacht gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. General Manager en housekeeping direct geïnformeerd."
                    }
                ],
                "sensitiveHeadline": "Hygiëne- en veiligheidsklachten mogen nooit automatisch online gaan",
                "sensitiveTopics": [
                    "Bedwantsen / Ongedierte",
                    "Kamerhygiëne",
                    "Overboeking",
                    "Diefstal / Veiligheid",
                    "Facturatiedisputen",
                    "Geluidsoverlast"
                ],
                "faqItems": [
                    {
                        "q": "Kan ReplyVera meerdere hotelvestigingen beheren?",
                        "a": "Ja. Met onze Multi-Location en Agency abonnementen beheert u meerdere locaties vanuit één centraal dashboard."
                    },
                    {
                        "q": "Wat gebeurt er bij ernstige klachten?",
                        "a": "Reviews met gevoelige trefwoorden worden automatisch geblokkeerd voor publicatie en ter goedkeuring voorgelegd aan het management."
                    }
                ],
                "finalCtaHeadline": "Geef Elke Gast een Vijfsterren Reactie",
                "finalCtaDescription": "Start vandaag nog uw gratis proefperiode van 14 dagen. Koppel uw Google Bedrijfsprofiel binnen 2 minuten."
            },
            "es": {
                "name": "Hoteles y Hospedaje",
                "dropdownDesc": "Respuestas rápidas para huéspedes con filtros de seguridad para higiene y reservas.",
                "metaTitle": "Automatización de Reseñas de Google para Hoteles | ReplyVera",
                "metaDescription": "Automatiza las respuestas a reseñas de Google en tu hotel. ReplyVera responde con calidez y deriva quejas graves a los gerentes de recepción.",
                "heroHeadline": "Respuestas Cálidas y Oportunas en Google para Hoteles",
                "heroDescription": "ReplyVera publica respuestas atentas a reseñas de huéspedes y mantiene las quejas de limpieza, ruido o reservas bajo control del gerente de guardia.",
                "mockupPositive": "El personal de recepción nos mejoró la habitación por nuestro aniversario y el desayuno fue excelente.",
                "mockupNegative": "El check-in tardó más de 30 minutos y el aire acondicionado de la habitación 204 hacía ruido.",
                "mockupSensitive": "Encontramos chinches en la habitación 312 y el recepcionista nocturno no quiso atendernos.",
                "benefitsHeadline": "Hospitalidad de Cinco Estrellas en Cada Respuesta",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Horas en Recepción",
                        "text": "Responde de inmediato a las reseñas de viajeros sin sobrecargar a tu equipo de recepción."
                    },
                    {
                        "icon": "award",
                        "title": "Mejora tu Posición en Google",
                        "text": "Las respuestas consistentes y profesionales aumentan el interés de futuros huéspedes."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Protege tu Prestigio",
                        "text": "Las alertas de plagas, higiene o seguridad se detienen antes de publicar cualquier respuesta."
                    }
                ],
                "step2Text": "Define tu tono de hospitalidad, reconocimiento de huéspedes frecuentes y alertas de limpieza.",
                "step3Text": "Los elogios rutinarios se publican solos. Los incidentes críticos notifican al gerente general.",
                "reviewsHeadline": "Desde Estancias de Celebración hasta Incidencias de Mantenimiento",
                "reviewsSubhead": "Descubre cómo ReplyVera atiende a tus huéspedes con cortesía y rapidez.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"El personal de recepción nos mejoró la habitación por nuestro aniversario y el desayuno fue excelente.\"",
                        "reply": "\"¡Muchas gracias por celebrar su aniversario con nosotros! Nos alegra saber que tuvieron una estancia memorable y esperamos verlos de nuevo.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Demora en Check-In",
                        "quote": "\"El check-in tardó más de 30 minutos y el aire acondicionado de la habitación 204 hacía ruido.\"",
                        "reply": "\"Agradecemos sus comentarios. Lamentamos la demora en la recepción y el inconveniente con el aire, el cual ya fue revisado por mantenimiento.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Alerta Sanitaria",
                        "quote": "\"Encontramos chinches en la habitación 312 y el recepcionista nocturno no quiso atendernos.\"",
                        "isAlert": true,
                        "alertTitle": "Reclamo de salubridad detectado",
                        "alertText": "Publicación automática bloqueada. Gerente General y equipo de limpieza notificados."
                    }
                ],
                "sensitiveHeadline": "Las reclamaciones sanitarias y de seguridad nunca deben publicarse automáticamente",
                "sensitiveTopics": [
                    "Chinches / Plagas",
                    "Higiene de habitaciones",
                    "Sobreventa de habitaciones",
                    "Seguridad y hurtos",
                    "Cobros indebidos",
                    "Ruidos molestos"
                ],
                "faqItems": [
                    {
                        "q": "¿Puede ReplyVera gestionar cadenas o múltiples propiedades?",
                        "a": "Sí. Nuestros planes Multi-Location y Agency permiten administrar varios establecimientos desde un único panel."
                    },
                    {
                        "q": "¿Cómo se manejan las opiniones negativas de huéspedes?",
                        "a": "Cualquier reseña con menciones a plagas o problemas graves se bloquea para revisión manual inmediata."
                    }
                ],
                "finalCtaHeadline": "Ofrece Hospitalidad de 5 Estrellas en Cada Reseña",
                "finalCtaDescription": "Empieza tu prueba gratuita de 14 días hoy mismo. Conecta tu Perfil de Negocio de Google en minutos."
            }
        }
    },
    {
        "id": "restaurants",
        "slugs": {
            "en": "restaurants",
            "nl": "restaurants",
            "es": "restaurantes"
        },
        "icon": "utensils",
        "iconBgClass": "restaurant-icon",
        "theme": {
            "accent": "#D97706",
            "motif": "crosshatch",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Restaurants",
                "dropdownDesc": "Automated replies with food-safety and allergy escalation.",
                "metaTitle": "Google Review Automation for Restaurants | ReplyVera",
                "metaDescription": "Automatically respond to restaurant Google reviews. ReplyVera handles routine customer praise while escalating food safety and allergy complaints to managers.",
                "heroHeadline": "Every Restaurant Review Answered Automatically",
                "heroDescription": "ReplyVera handles routine reviews while escalating food-safety, allergy, and service complaints before any response is published.",
                "mockupPositive": "Maria made our anniversary dinner absolutely unforgettable.",
                "mockupNegative": "Food was good but we waited almost an hour for our table.",
                "mockupSensitive": "My daughter had an allergic reaction after eating here.",
                "benefitsHeadline": "Responses That Work as Hard as Your Floor Staff",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Manager Hours",
                        "text": "Routine reviews are answered instantly so managers focus on hospitality."
                    },
                    {
                        "icon": "award",
                        "title": "Recognize Great Staff",
                        "text": "Servers and chefs mentioned in reviews are naturally acknowledged in replies."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Protect Brand Safety",
                        "text": "Allergy and food safety complaints require manager sign-off before publishing."
                    }
                ],
                "step2Text": "Configure tone rules, staff member recognition, and food-safety escalation limits.",
                "step3Text": "Routine praise publishes automatically. Sensitive health feedback alerts your floor manager.",
                "reviewsHeadline": "From Anniversary Praises to Allergy Complaints",
                "reviewsSubhead": "See how ReplyVera handles the full range of restaurant reviews.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Maria made our anniversary dinner absolutely unforgettable.\"",
                        "reply": "\"Thank you for celebrating with us! We are thrilled Maria made your evening special, and we will pass along your compliments!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Wait Time Complaint",
                        "quote": "\"Food was good but we waited almost an hour for our table.\"",
                        "reply": "\"Thank you for your feedback. We are glad you enjoyed the meal, but we apologize for the longer wait time than expected.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Food Safety Alert",
                        "quote": "\"My daughter had an allergic reaction after eating here.\"",
                        "isAlert": true,
                        "alertTitle": "Food safety issue detected",
                        "alertText": "Auto-publishing blocked. Manager approval required."
                    }
                ],
                "sensitiveHeadline": "Food-Safety Feedback Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Allergies",
                    "Food Poisoning",
                    "Contamination",
                    "Injuries",
                    "Discrimination",
                    "Hygiene Violations"
                ],
                "faqItems": [
                    {
                        "q": "Does ReplyVera recognize staff names in reviews?",
                        "a": "Yes. ReplyVera identifies staff names and includes personal thank-yous naturally."
                    },
                    {
                        "q": "Are food safety complaints blocked from auto-publishing?",
                        "a": "Yes. Keywords about allergies or sickness trigger immediate alerts."
                    }
                ],
                "finalCtaHeadline": "Stop Leaving Restaurant Reviews Unanswered",
                "finalCtaDescription": "Let ReplyVera handle routine replies and protect your reputation while you focus on great food."
            },
            "nl": {
                "name": "Restaurants",
                "dropdownDesc": "Geautomatiseerde reacties met escalatie van voedselveiligheid en allergieën.",
                "metaTitle": "Google Review Automatisering voor Restaurants | ReplyVera",
                "metaDescription": "Reageer automatisch op Google-reviews van uw restaurant. ReplyVera behandelt routinematige complimenten en escaleert allergieklachten naar managers.",
                "heroHeadline": "Elke Restaurant Review Automatisch Beantwoord",
                "heroDescription": "ReplyVera schrijft gepersonaliseerde reacties op Google-reviews en houdt allergieën, voedselveiligheid en ernstige klachten onder controle van de manager.",
                "mockupPositive": "Maria heeft ons jubileumdiner geweldig gemaakt.",
                "mockupNegative": "Het eten was goed, maar we moesten bijna een uur wachten.",
                "mockupSensitive": "Mijn dochter kreeg een allergische reactie na het eten hier.",
                "benefitsHeadline": "Reacties die net zo hard werken als uw bediening",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Managertijd",
                        "text": "Routinematige reviews worden automatisch afgehandeld, zodat u zich kunt richten op de service in de zaak."
                    },
                    {
                        "icon": "award",
                        "title": "Erken Goede Service",
                        "text": "Medewerkers die in reviews worden genoemd, worden natuurlijk bedankt in de reactie."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Bescherm het Merk",
                        "text": "Allergie- en hygiëneklachten vereisen altijd goedkeuring van de manager voordat er wordt gereageerd."
                    }
                ],
                "step2Text": "Stel voorkeuren in voor merktoon, personeelserkenning en drempels voor voedselveiligheid.",
                "step3Text": "Routinematige bedankjes gaan direct live. Allergieklachten waarschuwen uw restaurantmanager.",
                "reviewsHeadline": "Van Jubileumcomplimenten tot Allergieklachten",
                "reviewsSubhead": "Zie hoe ReplyVera alle soorten restaurant-reviews afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Maria heeft ons jubileumdiner geweldig gemaakt.\"",
                        "reply": "\"Bedankt dat u dit bij ons kwam vieren. Fijn dat Maria de avond speciaal heeft gemaakt, we geven uw complimenten zeker door!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Klacht over Wachttijd",
                        "quote": "\"Het eten was goed, maar we moesten bijna een uur wachten.\"",
                        "reply": "\"Bedankt voor uw eerlijke feedback. Fijn dat het eten smaakte, maar excuses dat u zo lang heeft moeten wachten.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Gevoelige Review",
                        "quote": "\"Mijn dochter kreeg een allergische reactie na het eten hier.\"",
                        "isAlert": true,
                        "alertTitle": "Voedselveiligheidsprobleem gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Goedkeuring van manager vereist."
                    }
                ],
                "sensitiveHeadline": "Sommige restaurantreviews mogen nooit automatisch worden beantwoord",
                "sensitiveTopics": [
                    "Allergieën",
                    "Voedselvergiftiging",
                    "Besmetting",
                    "Letsel",
                    "Discriminatie",
                    "Ernstige hygiëneklachten"
                ],
                "faqItems": [
                    {
                        "q": "Herken ReplyVera namen van medewerkers in reviews?",
                        "a": "Ja. ReplyVera herkent namen in reviews en neemt deze op in het antwoord."
                    },
                    {
                        "q": "Worden voedselveiligheidsreviews geblokkeerd?",
                        "a": "Ja. Reviews met sleutelwoorden over allergieën of ziekte worden direct geblokkeerd voor automatische publicatie."
                    }
                ],
                "finalCtaHeadline": "Stop met het Onbeantwoord Laten van Restaurant Reviews",
                "finalCtaDescription": "Laat ReplyVera routinereacties afhandelen en bescherm uw reputatie terwijl u zich richt op heerlijk eten."
            },
            "es": {
                "name": "Restaurantes",
                "dropdownDesc": "Respuestas automatizadas con escalado de alergias y seguridad alimentaria.",
                "metaTitle": "Automatización de Reseñas de Google para Restaurantes | ReplyVera",
                "metaDescription": "Responde automáticamente a las reseñas de Google de tu restaurante. ReplyVera gestiona elogios rutinarios y escala quejas de alergias a los gerentes.",
                "heroHeadline": "Cada Reseña de Restaurante Respondida Automáticamente",
                "heroDescription": "ReplyVera escribe respuestas personalizadas en Google y mantiene las quejas sobre alergias, seguridad alimentaria y servicio bajo control del gerente.",
                "mockupPositive": "María hizo que nuestra cena de aniversario fuera maravillosa.",
                "mockupNegative": "La comida estuvo buena pero esperamos casi una hora.",
                "mockupSensitive": "Mi hija tuvo una reacción alérgica después de comer aquí.",
                "benefitsHeadline": "Respuestas que trabajan tan duro como tu personal de sala",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Tiempo al Gerente",
                        "text": "Las reseñas rutinarias se manejan automáticamente para que tus gerentes se enfoquen en el servicio."
                    },
                    {
                        "icon": "award",
                        "title": "Reconoce el Buen Servicio",
                        "text": "Los camareros y cocineros mencionados en las reseñas se incluyen naturalmente en la respuesta."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Protege tu Marca",
                        "text": "Las quejas de alergias e higiene requieren aprobación del gerente antes de responder."
                    }
                ],
                "step2Text": "Configura las reglas de tono, reconocimientos de camareros y límites de seguridad alimentaria.",
                "step3Text": "Los elogios rutinarios se publican solos. Los comentarios de salud notifican al responsable de sala.",
                "reviewsHeadline": "Desde Felicitaciones de Aniversario hasta Quejas de Alergias",
                "reviewsSubhead": "Descubre cómo ReplyVera maneja la gama completa de reseñas de restaurantes.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"María hizo que nuestra cena de aniversario fuera maravillosa.\"",
                        "reply": "\"¡Gracias por celebrar con nosotros! Nos alegra que María haya hecho especial la velada y le transmitiremos tus amables palabras.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Queja de Tiempo de Espera",
                        "quote": "\"La comida estuvo buena pero esperamos casi una hora.\"",
                        "reply": "\"Gracias por tus comentarios. Nos alegra que hayas disfrutado la comida, pero lamentamos que la espera haya sido más larga de lo esperado.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Reseña Sensible",
                        "quote": "\"Mi hija tuvo una reacción alérgica después de comer aquí.\"",
                        "isAlert": true,
                        "alertTitle": "Problema de seguridad alimentaria detectado",
                        "alertText": "Publicación automática bloqueada. Se requiere aprobación del gerente."
                    }
                ],
                "sensitiveHeadline": "Algunas reseñas de restaurantes nunca deben responderse automáticamente",
                "sensitiveTopics": [
                    "Alergias",
                    "Intoxicación alimentaria",
                    "Contaminación",
                    "Lesiones",
                    "Discriminación",
                    "Quejas graves de higiene"
                ],
                "faqItems": [
                    {
                        "q": "¿ReplyVera reconoce nombres de empleados en las reseñas?",
                        "a": "Sí. ReplyVera identifica los nombres mencionados y los incluye de forma natural en la respuesta."
                    },
                    {
                        "q": "¿Se bloquean las reseñas de seguridad alimentaria?",
                        "a": "Sí. Las reseñas con palabras clave sobre alergias o intoxicaciones se bloquean inmediatamente."
                    }
                ],
                "finalCtaHeadline": "Deja de Dejar Reseñas de Restaurante sin Responder",
                "finalCtaDescription": "Permite que ReplyVera gestione las respuestas rutinarias y proteja tu reputación."
            }
        }
    },
    {
        "id": "auto-repair",
        "slugs": {
            "en": "auto-repair",
            "nl": "autogarages",
            "es": "talleres-mecanicos"
        },
        "icon": "wrench",
        "iconBgClass": "autorepair-icon",
        "theme": {
            "accent": "#475569",
            "motif": "gears",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Auto Repair & Mechanics",
                "dropdownDesc": "Automated replies for mechanic shops with mechanical safety escalation.",
                "metaTitle": "Google Review Automation for Auto Repair Shops | ReplyVera",
                "metaDescription": "Automate Google review replies for your auto repair shop. ReplyVera handles routine customer compliments and routes mechanical safety and billing issues to service advisors.",
                "heroHeadline": "Build Trust with Every Auto Repair Google Review",
                "heroDescription": "ReplyVera automatically thanks satisfied drivers while holding brake failure, pricing disputes, and warranty claims for service manager approval.",
                "mockupPositive": "Honest mechanic. They diagnosed my check-engine light in 10 minutes and did not overcharge.",
                "mockupNegative": "Repair took two days longer than estimated and no one called to update me.",
                "mockupSensitive": "My brakes failed on the highway 20 miles after your brake service.",
                "benefitsHeadline": "Reputation Protection That Works as Hard as Your Techs",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Service Advisor Time",
                        "text": "Routine 5-star reviews are answered instantly so advisors stay focused on customers in the shop."
                    },
                    {
                        "icon": "award",
                        "title": "Highlight Master Techs",
                        "text": "Recognize mechanics mentioned by name to highlight honest craftsmanship."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Block Safety & Damage Claims",
                        "text": "Reviews citing safety hazards, failed repairs, or towing claims require human sign-off."
                    }
                ],
                "step2Text": "Configure shop tone, mechanic recognition, and strict safety escalation keywords.",
                "step3Text": "Routine positive reviews publish automatically. Safety or pricing complaints alert your service manager.",
                "reviewsHeadline": "From Honest Diagnostic Praise to Mechanical Inquiries",
                "reviewsSubhead": "See how ReplyVera manages auto repair reviews with clarity and control.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Honest mechanic. They diagnosed my check-engine light in 10 minutes and did not overcharge.\"",
                        "reply": "\"Thank you for trusting us with your vehicle! We pride ourselves on transparent, honest diagnostics and look forward to keeping your car running smoothly.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Delay Complaint",
                        "quote": "\"Repair took two days longer than estimated and no one called to update me.\"",
                        "reply": "\"Thank you for your feedback. We apologize for the delay and communication gap during your repair. We will follow up with you directly to make this right.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Safety Hazard Alert",
                        "quote": "\"My brakes failed on the highway 20 miles after your brake service.\"",
                        "isAlert": true,
                        "alertTitle": "Safety incident detected",
                        "alertText": "Auto-publishing blocked. Service manager and owner notified immediately."
                    }
                ],
                "sensitiveHeadline": "Safety Failures and Unauthorized Work Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Brake / Steering Failures",
                    "Unauthorized Repairs / Hidden Fees",
                    "Warranty Disputes",
                    "Vehicle Damage in Shop",
                    "Towing / Accident Inquiries"
                ],
                "faqItems": [
                    {
                        "q": "Can ReplyVera mention specific technicians by name?",
                        "a": "Yes. ReplyVera identifies technician and advisor names and includes personalized appreciation."
                    },
                    {
                        "q": "How are mechanical safety complaints handled?",
                        "a": "Any review mentioning safety components like brakes, steering, or engine failure is automatically blocked and escalated to management."
                    }
                ],
                "finalCtaHeadline": "Keep Your Auto Shop’s Reputation Running at Peak Performance",
                "finalCtaDescription": "Start your 14-day free trial. Handle routine reviews on autopilot and safeguard against negative feedback."
            },
            "nl": {
                "name": "Autogarages & Schadeherstel",
                "dropdownDesc": "Automatische reacties voor garages met escalatie voor veiligheid en reparatieclaims.",
                "metaTitle": "Google Review Automatisering voor Autogarages | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor uw autogarage. ReplyVera reageert op tevreden klanten en stuurt veiligheids- en facturatieklachten door naar werkplaatschefs.",
                "heroHeadline": "Betrouwbare Google Review Reacties voor Autogarages",
                "heroDescription": "ReplyVera bedankt tevreden automobilisten automatisch en houdt klachten over remmen, meerwerkkosten en garanties onder controle van de werkplaatschef.",
                "mockupPositive": "Eerlijke garage. Ze stelden de diagnose binnen 10 minuten en rekenden een scherpe prijs.",
                "mockupNegative": "Reparatie duurde twee dagen langer dan afgesproken zonder dat ik werd gebeld.",
                "mockupSensitive": "Mijn remmen weigerden op de snelweg vlak na jullie onderhoudsbeurt.",
                "benefitsHeadline": "Bescherming voor de Reputatie van uw Werkplaats",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Werkplaatseruimte & Tijd",
                        "text": "Positieve beoordelingen worden vlot beantwoord zonder tijd te kosten aan de servicebalie."
                    },
                    {
                        "icon": "award",
                        "title": "Waardeer uw Monteurs",
                        "text": "Monteurs die bij naam worden genoemd in reviews worden persoonlijk bedankt in de reactie."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Voorkom Schadeclaims",
                        "text": "Klachten over veiligheid, remmen of onvoorziene kosten vereisen altijd menselijke goedkeuring."
                    }
                ],
                "step2Text": "Stel uw werkplaatscultuur in, erken monteurs en stel scherpe veiligheidsfilters in.",
                "step3Text": "Tevreden klanten krijgen direct antwoord. Ernstige defecten alarmeren direct uw chef-werkplaats.",
                "reviewsHeadline": "Van Tevreden APK tot Complexe Reparaties",
                "reviewsSubhead": "Zie hoe ReplyVera garage-reviews met vakkundigheid en precisie beheert.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Eerlijke garage. Ze stelden de diagnose binnen 10 minuten en rekenden een scherpe prijs.\"",
                        "reply": "\"Hartelijk dank voor het vertrouwen in onze garage! We streven altijd naar eerlijk en transparant advies. Veel veilige kilometers gewenst!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Klacht over Doorlooptijd",
                        "quote": "\"Reparatie duurde twee dagen langer dan afgesproken zonder dat ik werd gebeld.\"",
                        "reply": "\"Bedankt voor uw reactie. Onze excuses voor de vertraging en het gebrek aan tussentijds contact. We nemen spoedig contact met u op om dit te bespreken.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Veiligheidsrisico Alert",
                        "quote": "\"Mijn remmen weigerden op de snelweg vlak na jullie onderhoudsbeurt.\"",
                        "isAlert": true,
                        "alertTitle": "Veiligheidsincident gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Chef werkplaats en eigenaar direct gealarmeerd."
                    }
                ],
                "sensitiveHeadline": "Veiligheidsincidenten en meerwerkkosten mogen nooit automatisch online gaan",
                "sensitiveTopics": [
                    "Rem- & Stuurinrichting",
                    "Ongeautoriseerde Reparaties",
                    "Garantiedisputen",
                    "Schade tijdens werkplaatsbezoek",
                    "Sleepdienst / Ongevallen"
                ],
                "faqItems": [
                    {
                        "q": "Kan ReplyVera namen van monteurs herkennen?",
                        "a": "Ja. Als een klant een specifieke monteur noemt, wordt deze naam meegenomen in het bedankwoord."
                    },
                    {
                        "q": "Hoe worden veiligheidsclaims afgehandeld?",
                        "a": "Reviews met betrekking tot remmen, sturen of ernstige defecten worden direct geblokkeerd voor menselijke beoordeling."
                    }
                ],
                "finalCtaHeadline": "Houd de Reputatie van uw Garage in Topconditie",
                "finalCtaDescription": "Start vandaag uw 14-daagse proefperiode. Beantwoord routine-reviews automatisch en behoud volledige controle over gevoelige zaken."
            },
            "es": {
                "name": "Talleres Mecánicos",
                "dropdownDesc": "Respuestas automáticas para talleres con filtro de seguridad y reclamos de piezas.",
                "metaTitle": "Automatización de Reseñas de Google para Talleres Mecánicos | ReplyVera",
                "metaDescription": "Automatiza respuestas a reseñas de Google en tu taller mecánico. ReplyVera responde a clientes satisfechos y deriva fallos de seguridad y costos al jefe de taller.",
                "heroHeadline": "Respuestas de Confianza en Google para Talleres Mecánicos",
                "heroDescription": "ReplyVera responde automáticamente elogios de conductores satisfechos y retiene fallos mecánicos graves, presupuestos y garantías para revisión del jefe de taller.",
                "mockupPositive": "Taller muy honesto. Diagnosticaron el fallo en 10 minutos y no cobraron de más.",
                "mockupNegative": "La reparación tardó dos días más de lo prometido y nadie me avisó.",
                "mockupSensitive": "Mis frenos fallaron en la autopista 20 km después de su revisión.",
                "benefitsHeadline": "Protege el Prestigio y la Confianza de tu Taller",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Tiempo en Recepción",
                        "text": "Las reseñas positivas se responden solas para que los asesores se enfoquen en los coches en el taller."
                    },
                    {
                        "icon": "award",
                        "title": "Destaca a tus Mecánicos",
                        "text": "Reconoce a los mecánicos mencionados por su nombre en las respuestas a clientes."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Filtra Reclamos de Seguridad",
                        "text": "Las quejas por fallos mecánicos o costes imprevistos requieren aprobación obligatoria."
                    }
                ],
                "step2Text": "Ajusta el tono de tu taller, mención de mecánicos y filtros para averías mecánicas críticas.",
                "step3Text": "Los clientes contentos reciben respuesta de inmediato. Las alertas mecánicas notifican al jefe de taller.",
                "reviewsHeadline": "Desde Diagnósticos Impecables hasta Dudas Mecánicas",
                "reviewsSubhead": "Comprueba cómo ReplyVera gestiona las opiniones de tu taller con profesionalismo.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Taller muy honesto. Diagnosticaron el fallo en 10 minutos y no cobraron de más.\"",
                        "reply": "\"¡Muchas gracias por confiar en nuestro taller! Nos esforzamos por ofrecer diagnósticos transparentes y un servicio honesto. ¡Buen viaje!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Queja por Demora",
                        "quote": "\"La reparación tardó dos días más de lo prometido y nadie me avisó.\"",
                        "reply": "\"Agradecemos tus comentarios. Lamentamos el retraso y la falta de aviso durante la reparación. Nos pondremos en contacto contigo para aclararlo.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Alerta de Seguridad Vial",
                        "quote": "\"Mis frenos fallaron en la autopista 20 km después de su revisión.\"",
                        "isAlert": true,
                        "alertTitle": "Incidencia de seguridad detectada",
                        "alertText": "Publicación automática bloqueada. Jefe de taller notificado de urgencia."
                    }
                ],
                "sensitiveHeadline": "Los fallos mecánicos y presupuestos no deben responderse automáticamente",
                "sensitiveTopics": [
                    "Frenos y Dirección",
                    "Reparaciones no autorizadas",
                    "Disputas de garantía",
                    "Daños en el vehículo en taller",
                    "Grúas y accidentes"
                ],
                "faqItems": [
                    {
                        "q": "¿Puede ReplyVera reconocer nombres de mecánicos?",
                        "a": "Sí. Detecta nombres de mecánicos y asesores y los incluye con agradecimientos naturales."
                    },
                    {
                        "q": "¿Qué ocurre con quejas sobre frenos o averías graves?",
                        "a": "Se detienen automáticamente de inmediato para que el responsable del taller las analice."
                    }
                ],
                "finalCtaHeadline": "Mantén la Confianza de tu Taller en Marcha",
                "finalCtaDescription": "Inicia tu prueba gratuita de 14 días. Automatiza respuestas positivas y protege tu negocio frente a reclamos delicados."
            }
        }
    },
    {
        "id": "dentists",
        "slugs": {
            "en": "dentists",
            "nl": "tandartsen",
            "es": "dentistas"
        },
        "icon": "activity",
        "iconBgClass": "dentist-icon",
        "theme": {
            "accent": "#0891B2",
            "motif": "pulse",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Dentists & Clinics",
                "dropdownDesc": "Privacy-conscious replies for patient reviews.",
                "metaTitle": "Google Review Automation for Dentists & Clinics | ReplyVera",
                "metaDescription": "Automate Google review responses for your dental practice. ReplyVera drafts personalized replies while escalating clinical and billing feedback to your team.",
                "heroHeadline": "Professional Google Review Replies for Dental Practices",
                "heroDescription": "ReplyVera creates privacy-conscious review responses while keeping clinical, billing, and sensitive patient feedback under staff approval.",
                "mockupPositive": "Jessica made me feel completely comfortable during my procedure.",
                "mockupNegative": "I received a bill that was much higher than the initial estimate.",
                "mockupSensitive": "I had severe pain after my root canal and no one returned my call.",
                "benefitsHeadline": "Professional Replies That Protect Your Practice",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Front-Desk Hours",
                        "text": "Routine 5-star reviews are handled automatically without taking time from your reception team."
                    },
                    {
                        "icon": "lock",
                        "title": "Protect Patient Privacy",
                        "text": "Responses strictly avoid confirming patient identity or treatment details."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Escalate Clinical Inquiries",
                        "text": "Reviews mentioning pain, complications, or billing require manual approval."
                    }
                ],
                "step2Text": "Set tone preferences, privacy safeguards, and notify team members for clinical alerts.",
                "step3Text": "Safe reviews publish automatically. Clinical or billing complaints alert your practice manager.",
                "reviewsHeadline": "Professional Responses for Every Patient Experience",
                "reviewsSubhead": "See how ReplyVera handles dental practice reviews with care and discretion.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Jessica made me feel completely comfortable during my procedure.\"",
                        "reply": "\"Thank you so much for your kind words! We are glad our team provided a comfortable experience for you.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Billing Inquiry",
                        "quote": "\"I received a bill that was much higher than the initial estimate.\"",
                        "reply": "\"Thank you for bringing this to our attention. We will reach out to you directly to review your account details.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Clinical Alert",
                        "quote": "\"I had severe pain after my root canal and no one returned my call.\"",
                        "isAlert": true,
                        "alertTitle": "Clinical complaint detected",
                        "alertText": "Auto-publishing blocked. Practice manager notified immediately."
                    }
                ],
                "sensitiveHeadline": "Medical & Clinical Inquiries Require Staff Supervision",
                "sensitiveTopics": [
                    "Pain / Complications",
                    "Treatment Results",
                    "Billing & Insurance",
                    "Prescriptions",
                    "Confidential Info"
                ],
                "faqItems": [
                    {
                        "q": "How does ReplyVera handle patient privacy?",
                        "a": "Responses are drafted without confirming patient status or medical details."
                    },
                    {
                        "q": "Are clinical complaints blocked from auto-publishing?",
                        "a": "Yes. Any review detailing medical issues or pain is routed to your manager."
                    }
                ],
                "finalCtaHeadline": "Protect Your Dental Practice Reputation",
                "finalCtaDescription": "Provide patients with professional replies and manage sensitive feedback effectively."
            },
            "nl": {
                "name": "Tandartsen & Klinieken",
                "dropdownDesc": "Privacybewuste reacties op beoordelingen van patiënten.",
                "metaTitle": "Google Review Automatisering voor Tandartspraktijken | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor uw tandartspraktijk. ReplyVera stelt reacties op en escaleert klinische en gevoelige feedback naar uw team.",
                "heroHeadline": "Professionele Google Review Reacties voor Tandartspraktijken",
                "heroDescription": "ReplyVera creëert privacybewuste reviewreacties en houdt klinische, financiële en gevoelige patiëntvragen onder controle van uw personeel.",
                "mockupPositive": "Jessica zorgde ervoor dat ik me op mijn gemak voelde.",
                "mockupNegative": "Ik ontving een rekening die hoger was dan verwacht.",
                "mockupSensitive": "Ik had ernstige pijn na de behandeling en niemand belde mij terug.",
                "benefitsHeadline": "Professionele Reacties die uw Praktijk Beschermen",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Tijd bij de Receptie",
                        "text": "Routinematige positieve beoordelingen worden consistent afgehandeld zonder dat de receptie elke reactie handmatig hoeft te typen."
                    },
                    {
                        "icon": "lock",
                        "title": "Bescherm Patiëntprivacy",
                        "text": "Reacties vermijden het bevestigen van patiëntstatus of medische gegevens conform privacyrichtlijnen."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Escaleer Klinische Zorgen",
                        "text": "Klachten over pijn, behandeling of facturering vereisen goedkeuring vooraf."
                    }
                ],
                "step2Text": "Stel uw voorkeurstoon in en stel escalatieregels in voor medische en financiële vragen.",
                "step3Text": "Veilige reviews worden automatisch gepubliceerd. Klinische klachten waarschuwen direct uw praktijkmanager.",
                "reviewsHeadline": "Professionele Reacties voor Elke Patiëntervaring",
                "reviewsSubhead": "Zie hoe ReplyVera tandheelkundige reviews discreet afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Jessica zorgde ervoor dat ik me op mijn gemak voelde.\"",
                        "reply": "\"Hartelijk dank voor uw vriendelijke woorden! Fijn om te horen dat ons team u een comfortabele ervaring heeft geboden.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Factureringsvraag",
                        "quote": "\"Ik ontving een rekening die hoger was dan verwacht.\"",
                        "reply": "\"Bedankt dat u dit onder onze aandacht brengt. We nemen graag contact met u op om de facturatiedetails te bespreken.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Klinische Zorg",
                        "quote": "\"Ik had ernstige pijn na de behandeling en niemand belde mij terug.\"",
                        "isAlert": true,
                        "alertTitle": "Klinische klacht gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Praktijkmanager direct geïnformeerd."
                    }
                ],
                "sensitiveHeadline": "Medische en klinische klachten vereisen menselijke controle",
                "sensitiveTopics": [
                    "Pijn / Complicaties",
                    "Behandelresultaten",
                    "Facturering & Verzekering",
                    "Medicatie",
                    "Privacygevoelige informatie"
                ],
                "faqItems": [
                    {
                        "q": "Houdt ReplyVera rekening met privacy in reacties?",
                        "a": "Ja. Reacties worden zo opgesteld dat patiëntidentiteit en medische details nooit publiekelijk worden bevestigd."
                    },
                    {
                        "q": "Worden pijn- en behandelklachten geblokkeerd?",
                        "a": "Ja. Reviews met klinische klachten worden direct doorgestuurd naar uw praktijkmanager."
                    }
                ],
                "finalCtaHeadline": "Bescherm de Reputatie van uw Tandartspraktijk",
                "finalCtaDescription": "Geef patiënten professionele antwoorden en beheer gevoelige feedback effectief."
            },
            "es": {
                "name": "Dentistas y Clínicas",
                "dropdownDesc": "Respuestas respetuosas de la privacidad para pacientes.",
                "metaTitle": "Automatización de Reseñas de Google para Odontólogos | ReplyVera",
                "metaDescription": "Automatiza las respuestas a reseñas de Google en tu clínica dental. ReplyVera redacta respuestas personalizadas y deriva comentarios médicos a tu equipo.",
                "heroHeadline": "Respuestas Profesionales en Google para Clínicas Dentales",
                "heroDescription": "ReplyVera crea respuestas que respetan la privacidad del paciente y mantiene las consultas clínicas, financieras y sensibles bajo revisión de tu equipo.",
                "mockupPositive": "Jessica me hizo sentir muy cómodo durante todo el tratamiento.",
                "mockupNegative": "Recibí una factura más alta de lo esperado.",
                "mockupSensitive": "Tuve un dolor severo después del tratamiento y nadie me devolvió la llamada.",
                "benefitsHeadline": "Respuestas Profesionales que Protegen tu Clínica",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Tiempo en Recepción",
                        "text": "Las reseñas positivas se gestionan de forma consistente sin requerir tiempo del personal de recepción."
                    },
                    {
                        "icon": "lock",
                        "title": "Protege la Privacidad del Paciente",
                        "text": "Las respuestas evitan confirmar el estado de salud o detalles médicos del paciente."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Escala Consultas Clínicas",
                        "text": "Las quejas de dolor, tratamientos o facturación requieren aprobación previa."
                    }
                ],
                "step2Text": "Define el tono deseado y activa salvaguardas de privacidad para tu equipo.",
                "step3Text": "Las reseñas seguras se publican automáticamente. Los reclamos médicos notifican al gerente de tu clínica.",
                "reviewsHeadline": "Respuestas Profesionales para Cada Experiencia de Paciente",
                "reviewsSubhead": "Mira cómo ReplyVera responde de forma discreta a las reseñas odontológicas.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Jessica me hizo sentir muy cómodo durante todo el tratamiento.\"",
                        "reply": "\"¡Muchas gracias por tus amables palabras! Nos alegra saber que nuestro equipo te brindó una experiencia cómoda.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Consulta de Facturación",
                        "quote": "\"Recibí una factura más alta de lo esperado.\"",
                        "reply": "\"Agradecemos que nos lo hagas saber. Nos gustaría ponernos en contacto contigo para revisar los detalles de tu factura.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Atención Clínica",
                        "quote": "\"Tuve un dolor severo después del tratamiento y nadie me devolvió la llamada.\"",
                        "isAlert": true,
                        "alertTitle": "Reclamo clínico detectado",
                        "alertText": "Publicación automática bloqueada. Notificación urgente enviada a gerencia."
                    }
                ],
                "sensitiveHeadline": "Los reclamos médicos y clínicos requieren supervisión humana",
                "sensitiveTopics": [
                    "Dolor / Complicaciones",
                    "Resultados de tratamientos",
                    "Facturación y Seguros",
                    "Medicamentos",
                    "Información confidencial"
                ],
                "faqItems": [
                    {
                        "q": "¿Cómo garantiza ReplyVera la privacidad del paciente?",
                        "a": "Las respuestas se redactan omitiendo confirmar públicamente datos médicos ni identidad del paciente."
                    },
                    {
                        "q": "¿Se bloquean las consultas sobre tratamientos o dolor?",
                        "a": "Sí. Cualquier reseña clínica se deriva de inmediato a revisión manual."
                    }
                ],
                "finalCtaHeadline": "Protege la Reputación de tu Clínica Dental",
                "finalCtaDescription": "Ofrece a tus pacientes respuestas profesionales y gestiona comentarios sensibles con eficacia."
            }
        }
    },
    {
        "id": "salons-spas",
        "slugs": {
            "en": "salons-spas",
            "nl": "salons-spas",
            "es": "salones-spas"
        },
        "icon": "scissors",
        "iconBgClass": "salon-icon",
        "theme": {
            "accent": "#BE185D",
            "motif": "sparkles",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Salons & Spas",
                "dropdownDesc": "Personalized replies for stylists with allergy and chemical burn safeguards.",
                "metaTitle": "Google Review Automation for Salons & Spas | ReplyVera",
                "metaDescription": "Automate Google review responses for your hair salon or spa. ReplyVera celebrates stylist praise while escalating chemical burn, allergy, and pricing feedback.",
                "heroHeadline": "Flawless Google Review Replies for Salons & Spas",
                "heroDescription": "ReplyVera automatically thanks happy beauty clients and names their stylist, while holding chemical reactions, burns, or service disputes for manager approval.",
                "mockupPositive": "Sarah gave me the best balayage and haircut I have ever had. Truly talented!",
                "mockupNegative": "Waited 25 minutes past my appointment time before anyone even greeted me.",
                "mockupSensitive": "Severe chemical burn on my scalp from the bleach treatment, had to visit urgent care.",
                "benefitsHeadline": "Client Care That Matches Your Beauty Expertise",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Stylist & Front-Desk Time",
                        "text": "Routine 5-star praise is acknowledged promptly without taking stylists away from appointments."
                    },
                    {
                        "icon": "award",
                        "title": "Highlight Top Stylists",
                        "text": "Stylists and estheticians mentioned in reviews are celebrated naturally in public replies."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Intercept Injury & Chemical Claims",
                        "text": "Feedback citing chemical burns, cuts, or allergic reactions requires immediate manager sign-off."
                    }
                ],
                "step2Text": "Customize salon tone, stylist name tagging, and chemical injury safety filters.",
                "step3Text": "Rave reviews publish automatically. Scalp injury or treatment complaints alert your salon manager.",
                "reviewsHeadline": "From Balayage Raves to Appointment Delays",
                "reviewsSubhead": "See how ReplyVera maintains high client satisfaction across every review.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Sarah gave me the best balayage and haircut I have ever had. Truly talented!\"",
                        "reply": "\"Thank you so much for the glowing review! We are thrilled Sarah gave you such a fabulous balayage and cut. We cannot wait to see you for your next visit!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Wait Time Complaint",
                        "quote": "\"Waited 25 minutes past my appointment time before anyone even greeted me.\"",
                        "reply": "\"Thank you for sharing your experience. We sincerely apologize for the delay you experienced at check-in. We will follow up with you directly to ensure a smoother visit next time.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Injury / Chemical Alert",
                        "quote": "\"Severe chemical burn on my scalp from the bleach treatment, had to visit urgent care.\"",
                        "isAlert": true,
                        "alertTitle": "Chemical reaction complaint detected",
                        "alertText": "Auto-publishing blocked. Salon owner and head colorist notified immediately."
                    }
                ],
                "sensitiveHeadline": "Chemical Reactions and Treatment Injuries Require Human Attention",
                "sensitiveTopics": [
                    "Chemical Burns / Scalp Injury",
                    "Allergic Reactions",
                    "Sanitation & Hygiene Concerns",
                    "Cuts / Physical Injury",
                    "Unauthorized Treatment Upsells"
                ],
                "faqItems": [
                    {
                        "q": "Can ReplyVera celebrate specific stylists?",
                        "a": "Yes. ReplyVera identifies stylist, barber, or esthetician names and crafts personalized thank-yous."
                    },
                    {
                        "q": "Are allergic reaction reviews blocked from auto-publishing?",
                        "a": "Yes. Any mention of burns, rashes, allergies, or injuries is instantly held for manual review."
                    }
                ],
                "finalCtaHeadline": "Give Every Client a Beautiful Online Experience",
                "finalCtaDescription": "Start your 14-day free trial. Handle routine reviews on autopilot and protect your salon’s reputation."
            },
            "nl": {
                "name": "Kapsalons, Schoonheidssalons & Spas",
                "dropdownDesc": "Persoonlijke reacties voor stylisten met filters voor allergieën en chemische reacties.",
                "metaTitle": "Google Review Automatisering voor Salons & Spas | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor uw kapsalon of beautysalon. ReplyVera bedankt tevreden klanten en escaleert allergie- of behandelklachten naar de eigenaar.",
                "heroHeadline": "Verzorgde Google Review Reacties voor Salons & Spas",
                "heroDescription": "ReplyVera bedankt tevreden klanten automatisch en vermeldt hun stylist, terwijl chemische reacties, brandplekken of behandelklachten direct naar de salonmanager gaan.",
                "mockupPositive": "Sarah gaf me de mooiste balayage en knipbeurt ooit. Een echte vakvrouw!",
                "mockupNegative": "Moest 25 minuten wachten na mijn afspraak voordat iemand mij te woord stond.",
                "mockupSensitive": "Ernstige chemische brandplek op mijn hoofdhuid door het blonderen, moest naar de huisartsenpost.",
                "benefitsHeadline": "Klantenservice die past bij uw Schoonheidsexpertise",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Salon- & Receptietijd",
                        "text": "Positieve reviews worden direct beantwoord zonder dat stylisten de behandeling hoeven te onderbreken."
                    },
                    {
                        "icon": "award",
                        "title": "Zet Stylisten in het Zonnetje",
                        "text": "Kappers en huidspecialisten die worden genoemd worden automatisch persoonlijk geprezen in de reactie."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Onderschep Allergieën & Letsel",
                        "text": "Reviews over chemische reacties, uitslag of brandplekken worden direct tegengehouden voor persoonlijk contact."
                    }
                ],
                "step2Text": "Kies de stijl van uw salon, stylisten-herkenning en strenge filters voor gevoelige behandelingen.",
                "step3Text": "Routinematige complimenten gaan direct live. Klachten over behandelingen alarmeren uw salonmanager.",
                "reviewsHeadline": "Van Prachtige Kleuringen tot Wachttijdklachten",
                "reviewsSubhead": "Zie hoe ReplyVera salon-reviews verzorgt en uw reputatie laat stralen.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Sarah gaf me de mooiste balayage en knipbeurt ooit. Een echte vakvrouw!\"",
                        "reply": "\"Wat een geweldige review, hartelijk dank! We geven uw complimenten direct door aan Sarah. Tot snel bij uw volgende afspraak!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Klacht over Wachttijd",
                        "quote": "\"Moest 25 minuten wachten na mijn afspraak voordat iemand mij te woord stond.\"",
                        "reply": "\"Bedankt voor uw feedback. Onze oprechte excuses dat u zo lang moest wachten bij ontvangst. We nemen graag contact met u op om dit recht te zetten.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Gevoelige Behandelreactie",
                        "quote": "\"Ernstige chemische brandplek op mijn hoofdhuid door het blonderen, moest naar de huisartsenpost.\"",
                        "isAlert": true,
                        "alertTitle": "Chemische reactie gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Saloneigenaar direct gewaarschuwd."
                    }
                ],
                "sensitiveHeadline": "Chemische reacties en letsel mogen nooit automatisch online worden beantwoord",
                "sensitiveTopics": [
                    "Chemische brandplekken",
                    "Allergische reacties",
                    "Hygiëne & Sterilisatie",
                    "Snijwondjes / Pijn",
                    "Onverwachte meerprijzen"
                ],
                "faqItems": [
                    {
                        "q": "Kan ReplyVera specifieke stylisten bedanken?",
                        "a": "Ja. ReplyVera herkent de namen van kappers of schoonheidsspecialisten en verwerkt deze in de reactie."
                    },
                    {
                        "q": "Hoe reageert het systeem op allergische reacties?",
                        "a": "Reviews met meldingen over huidirritatie of brandplekken worden per direct geblokkeerd en ter inzage aangeboden."
                    }
                ],
                "finalCtaHeadline": "Geef Elke Klant een Stralende Ervaring",
                "finalCtaDescription": "Start vandaag uw gratis proefperiode van 14 dagen. Reageer moeiteloos op reviews en bescherm uw salon."
            },
            "es": {
                "name": "Salones de Belleza y Spas",
                "dropdownDesc": "Respuestas personalizadas para estilistas con salvaguardas para alergias y quemaduras.",
                "metaTitle": "Automatización de Reseñas de Google para Salones de Belleza | ReplyVera",
                "metaDescription": "Automatiza respuestas a reseñas de Google en tu salón de belleza o spa. ReplyVera destaca a tus estilistas y deriva quejas sobre alergias o quemaduras.",
                "heroHeadline": "Respuestas Impecables en Google para Salones de Belleza y Spas",
                "heroDescription": "ReplyVera agradece automáticamente a clientes felices y menciona a su estilista, reteniendo quejas sobre tintes, quemaduras o alergias para revisión del gerente.",
                "mockupPositive": "Sara me hizo el mejor balayage y corte de pelo de mi vida. ¡Una verdadera artista!",
                "mockupNegative": "Esperé 25 minutos después de mi cita antes de que alguien me atendiera.",
                "mockupSensitive": "Quemadura química grave en el cuero cabelludo por la decoloración, tuve que ir a urgencias.",
                "benefitsHeadline": "Atención al Cliente a la Altura de tu Estilo y Profesionalismo",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Tiempo en el Salón",
                        "text": "Las reseñas positivas se responden solas sin interrumpir el trabajo de tus estilistas con clientes."
                    },
                    {
                        "icon": "award",
                        "title": "Celebra a tus Estilistas",
                        "text": "Los peluqueros y esteticistas mencionados en opiniones son reconocidos en las respuestas públicas."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Filtra Reacciones y Quemaduras",
                        "text": "Cualquier queja por quemaduras químicas o cortes se bloquea para atención prioritaria."
                    }
                ],
                "step2Text": "Personaliza el estilo de tu salón, reconocimiento de estilistas y límites de seguridad en tratamientos.",
                "step3Text": "Los agradecimientos se publican automáticamente. Las quejas de salud alertan de inmediato a la dirección.",
                "reviewsHeadline": "Desde Cortes Espectaculares hasta Demoras de Agenda",
                "reviewsSubhead": "Comprueba cómo ReplyVera protege y hace brillar la imagen de tu salón.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Sara me hizo el mejor balayage y corte de pelo de mi vida. ¡Una verdadera artista!\"",
                        "reply": "\"¡Muchas gracias por tan lindas palabras! Nos emociona saber que te encantó el trabajo de Sara. ¡Te esperamos para tu próxima sesión de belleza!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Demora en la Cita",
                        "quote": "\"Esperé 25 minutos después de mi cita antes de que alguien me atendiera.\"",
                        "reply": "\"Gracias por compartir tu experiencia. Te pedimos una sincera disculpa por la espera al llegar. Nos pondremos en contacto contigo para compensarte.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Alerta Sanitaria / Quemadura",
                        "quote": "\"Quemadura química grave en el cuero cabelludo por la decoloración, tuve que ir a urgencias.\"",
                        "isAlert": true,
                        "alertTitle": "Reacción adversa detectada",
                        "alertText": "Publicación automática bloqueada. Notificación urgente a la dueña del salón."
                    }
                ],
                "sensitiveHeadline": "Las reacciones químicas y lesiones requieren atención humana inmediata",
                "sensitiveTopics": [
                    "Quemaduras químicas",
                    "Reacciones alérgicas",
                    "Higiene y esterilización",
                    "Cortes accidentales",
                    "Cobros adicionales imprevistos"
                ],
                "faqItems": [
                    {
                        "q": "¿Puede ReplyVera reconocer a estilistas por su nombre?",
                        "a": "Sí. Identifica los nombres de estilistas y terapeutas y los menciona con gratitud personalizada."
                    },
                    {
                        "q": "¿Qué ocurre con opiniones sobre reacciones o alergias?",
                        "a": "Cualquier mención sobre quemaduras o irritaciones se bloquea de inmediato para revisión manual."
                    }
                ],
                "finalCtaHeadline": "Haz Brillar la Reputación de tu Salón",
                "finalCtaDescription": "Comienza tu prueba de 14 días. Automatiza respuestas positivas y cuida la confianza de tus clientes."
            }
        }
    },
    {
        "id": "medspas",
        "slugs": {
            "en": "medspas",
            "nl": "medspas",
            "es": "medspas"
        },
        "icon": "sparkles",
        "iconBgClass": "medspa-icon",
        "theme": {
            "accent": "#7C3AED",
            "motif": "sparkles",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Medical Spas & Aesthetic Clinics",
                "dropdownDesc": "Privacy-conscious review replies with clinical complication and injector filters.",
                "metaTitle": "Google Review Automation for Medical Spas & Aesthetic Clinics | ReplyVera",
                "metaDescription": "Automate Google review responses for your medical spa or aesthetic clinic. ReplyVera drafts compliant, personalized replies while escalating clinical complications to practitioners.",
                "heroHeadline": "Compliant, Reassuring Google Review Replies for Medical Spas",
                "heroDescription": "ReplyVera publishes prompt, privacy-conscious responses to treatment praise while holding clinical complications, bruising, burns, or injector feedback for director approval.",
                "mockupPositive": "Dr. Lee and the laser team gave me incredible results. My skin has never looked better!",
                "mockupNegative": "Had to wait 45 minutes past my appointment time and felt rushed through the consultation.",
                "mockupSensitive": "Severe chemical burn and blistering after the laser peel, had to visit urgent care.",
                "benefitsHeadline": "Clinical Discretion & Reputation Defense for Aesthetic Practices",
                "benefits": [
                    {
                        "icon": "shield-check",
                        "title": "Patient Privacy Discretion",
                        "text": "Professional, courteous responses that protect client privacy and never disclose sensitive treatment details."
                    },
                    {
                        "icon": "clock",
                        "title": "Save Clinical Staff Time",
                        "text": "Routine 5-star praise is acknowledged promptly, letting your practitioners focus on patient care."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Adverse Reaction Safeguard",
                        "text": "Mentions of burns, infection, or practitioner licensing issues are halted immediately before publication."
                    }
                ],
                "step2Text": "Set aesthetic clinic tone, practitioner recognition rules, and alert thresholds for treatment reactions.",
                "step3Text": "Routine treatment praise publishes automatically. Adverse clinical reactions alert your Medical Director immediately.",
                "reviewsHeadline": "From Glowing Rejuvenation to Sensitive Clinical Concerns",
                "reviewsSubhead": "See how ReplyVera protects your aesthetic clinic reputation while maintaining clinical standards.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Dr. Lee and the laser team gave me incredible results. My skin has never looked better!\"",
                        "reply": "\"Thank you so much for your kind words! We are thrilled to hear you had a great experience and are loving your skin results. We look forward to welcoming you back!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Wait Time Feedback",
                        "quote": "\"Had to wait 45 minutes past my appointment time and felt rushed through the consultation.\"",
                        "reply": "\"Thank you for your feedback. We apologize for the wait time during your recent visit and that your consultation felt rushed. We strive to provide attentive care, and our clinic manager will follow up directly.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Adverse Clinical Reaction",
                        "quote": "\"Severe chemical burn and blistering after the laser peel, had to visit urgent care.\"",
                        "isAlert": true,
                        "alertTitle": "Clinical complication detected",
                        "alertText": "Auto-publishing blocked. Medical Director and Practice Manager alerted immediately."
                    }
                ],
                "sensitiveHeadline": "Clinical Complications and Adverse Reactions Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Chemical Burns / Blistering",
                    "Botox / Filler Drooping / Asymmetry",
                    "Severe Swelling / Allergic Reactions",
                    "Laser Hyperpigmentation Damage",
                    "Unlicensed Injector Accusations",
                    "Patient Privacy / Clinical Confidentiality"
                ],
                "faqItems": [
                    {
                        "q": "How does ReplyVera maintain patient confidentiality and privacy standards?",
                        "a": "ReplyVera responses use professional, privacy-conscious language that never reveals medical records, specific treatments, or diagnoses in public Google replies."
                    },
                    {
                        "q": "What happens when a patient reports an adverse reaction or complication?",
                        "a": "Reviews mentioning burns, blistering, unexpected swelling, or injector disputes are instantly blocked from auto-publishing and sent to your clinical director for manual review."
                    }
                ],
                "finalCtaHeadline": "Protect Your Medical Spa's Reputation on Autopilot",
                "finalCtaDescription": "Start your 14-day free trial today. Connect your Google Business Profile in minutes."
            },
            "nl": {
                "name": "Medische Spa's & Klinieken",
                "dropdownDesc": "Privacybewuste reviewreacties met complicatie- en behandelingsfilters.",
                "metaTitle": "Google Review Automatisering voor Medische Spa's | ReplyVera",
                "metaDescription": "Automatiseer reacties op Google-reviews voor uw medische spa of esthetische kliniek. ReplyVera beantwoordt positieve reviews en escaleert behandelingscomplicaties direct naar artsen.",
                "heroHeadline": "Discrete, Professionele Google Review Reacties voor Medische Spa's",
                "heroDescription": "ReplyVera publiceert snelle, privacybewuste reacties op tevreden patiënten en houdt behandelingscomplicaties, zwellingen of klachten vast voor goedkeuring van de kliniekdirecteur.",
                "mockupPositive": "Dr. Lee en het laserteam hebben geweldig werk geleverd. Mijn huid ziet er fantastisch uit!",
                "mockupNegative": "Moest 45 minuten wachten na mijn afspraak en voelde me gehaast tijdens het consult.",
                "mockupSensitive": "Ernstige chemische verbranding en blaren na de laserpeeling, moest naar de spoedpost.",
                "benefitsHeadline": "Klinische Discretie & Reputatiebescherming",
                "benefits": [
                    {
                        "icon": "shield-check",
                        "title": "Privacybewuste Discretie",
                        "text": "Professionele reacties die de privacy van de patiënt beschermen en nooit medische details vrijgeven."
                    },
                    {
                        "icon": "clock",
                        "title": "Bespaar Kliniekpersoneel Tijd",
                        "text": "5-sterren reviews worden binnen enkele minuten beantwoord, zodat uw specialisten zich op patiënten kunnen richten."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Bescherming bij Complicaties",
                        "text": "Meldingen van verbrandingen, allergieën of behandelingsklachten worden direct geblokkeerd voor publicatie."
                    }
                ],
                "step2Text": "Stel kliniekregels, behandelarentonen en escalatiedrempels in voor medische reacties.",
                "step3Text": "Positieve complimenten worden automatisch geplaatst. Behandelingscomplicaties waarschuwen direct uw medisch directeur.",
                "reviewsHeadline": "Van Tevreden Resultaten tot Gevoelige Medische Vragen",
                "reviewsSubhead": "Zie hoe ReplyVera de reputatie van uw esthetische kliniek beschermt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Dr. Lee en het laserteam hebben geweldig werk geleverd. Mijn huid ziet er fantastisch uit!\"",
                        "reply": "\"Hartelijk dank voor uw fijne review! We zijn verheugd dat u zo tevreden bent met het resultaat en verwelkomen u graag weer in onze kliniek.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Wachttijd Feedback",
                        "quote": "\"Moest 45 minuten wachten na mijn afspraak en voelde me gehaast tijdens het consult.\"",
                        "reply": "\"Bedankt voor uw feedback. Onze excuses voor de wachttijd en het gehaaste gevoel tijdens uw consult. Onze kliniekmanager neemt graag contact met u op.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Medische Complicatie",
                        "quote": "\"Ernstige chemische verbranding en blaren na de laserpeeling, moest naar de spoedpost.\"",
                        "isAlert": true,
                        "alertTitle": "Klinische complicatie gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Medisch directeur en praktijkmanager direct op de hoogte gesteld."
                    }
                ],
                "sensitiveHeadline": "Behandelingscomplicaties mogen nooit automatisch worden gepubliceerd",
                "sensitiveTopics": [
                    "Chemische Verbrandingen / Blaren",
                    "Botox / Fillers Asymmetrie",
                    "Ernstige Allergische Reacties / Zwelling",
                    "Laser Hyperpigmentatie Schade",
                    "Onbevoegde Behandelaar Klachten",
                    "Medische Privacy & AVG Bezwaren"
                ],
                "faqItems": [
                    {
                        "q": "Hoe waarborgt ReplyVera de medische privacy van patiënten?",
                        "a": "ReplyVera reacties bevatten algemene professionele beleefdheid en noemen nooit specifieke medische behandelingen of privégegevens."
                    },
                    {
                        "q": "Wat gebeurt er als een patiënt een complicatie meldt in een review?",
                        "a": "Reviews over brandwonden, infecties of behandelingsklachten worden direct geblokkeerd en doorgestuurd naar uw kliniekdirectie."
                    }
                ],
                "finalCtaHeadline": "Bescherm de Reputatie van uw Medische Kliniek op de Automaat",
                "finalCtaDescription": "Start vandaag uw gratis proefperiode van 14 dagen. Koppel uw Google Bedrijfsprofiel binnen enkele minuten."
            },
            "es": {
                "name": "Spas Médicos y Clínicas Estéticas",
                "dropdownDesc": "Respuestas conformes a privacidad con filtros para complicaciones y tratamientos.",
                "metaTitle": "Automatización de Reseñas de Google para Spas Médicos | ReplyVera",
                "metaDescription": "Automatiza respuestas a reseñas de Google para tu spa médico o clínica estética. ReplyVera publica respuestas discretas a elogios y retiene complicaciones para aprobación médica.",
                "heroHeadline": "Respuestas Discretas y Conformes en Reseñas de Google para Spas Médicos",
                "heroDescription": "ReplyVera publica respuestas atentas y conformes a la privacidad para pacientes satisfechos, mientras retiene complicaciones clínicas, quemaduras o inquietudes para revisión médica.",
                "mockupPositive": "El Dr. Lee y el equipo de láser me dieron resultados increíbles. ¡Mi piel nunca se ha visto mejor!",
                "mockupNegative": "Tuve que esperar 45 minutos después de mi cita y sentí que la consulta fue apresurada.",
                "mockupSensitive": "Grave quemadura química y ampollas tras el peeling láser, tuve que ir a urgencias.",
                "benefitsHeadline": "Discreción Clínica y Protección de Reputación para Clínicas Estéticas",
                "benefits": [
                    {
                        "icon": "shield-check",
                        "title": "Discreción y Privacidad Médica",
                        "text": "Respuestas respetuosas y profesionales que jamás revelan diagnósticos médicos o tratamientos privados."
                    },
                    {
                        "icon": "clock",
                        "title": "Ahorro de Tiempo Clínico",
                        "text": "Los elogios de 5 estrellas se responden en minutos, permitiendo que tu personal se centre en los pacientes."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Filtro de Reacciones Adversas",
                        "text": "Menciones de quemaduras, infecciones o problemas de tratamiento se bloquean al instante antes de publicarse."
                    }
                ],
                "step2Text": "Configura el tono de la clínica, especialistas y filtros estrictos de escalación médica.",
                "step3Text": "Los elogios habituales se publican automáticamente. Las complicaciones clínicas alertan de inmediato al director médico.",
                "reviewsHeadline": "Desde Resultados Excepcionales hasta Inquietudes Clínicas Delicadas",
                "reviewsSubhead": "Descubre cómo ReplyVera protege la reputación de tu práctica estética.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"El Dr. Lee y el equipo de láser me dieron resultados increíbles. ¡Mi piel nunca se ha visto mejor!\"",
                        "reply": "\"¡Muchas gracias por sus amables palabras! Nos alegra enormemente saber que tuvo una experiencia maravillosa y que disfruta de sus resultados. ¡Esperamos verle pronto de nuevo!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Comentario sobre Tiempo de Espera",
                        "quote": "\"Tuve que esperar 45 minutos después de mi cita y sentí que la consulta fue apresurada.\"",
                        "reply": "\"Gracias por sus comentarios. Nos disculpamos sinceramente por la espera durante su visita y por la sensación de prisa en su consulta. Nuestro director de clínica se pondrá en contacto directamente.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Reacción Clínica Adversa",
                        "quote": "\"Grave quemadura química y ampollas tras el peeling láser, tuve que ir a urgencias.\"",
                        "isAlert": true,
                        "alertTitle": "Complicación clínica detectada",
                        "alertText": "Publicación automática bloqueada. Director médico y gerente de clínica alertados de inmediato."
                    }
                ],
                "sensitiveHeadline": "Las Complicaciones y Reacciones Adversas Jamás Deben Auto-Publicarse",
                "sensitiveTopics": [
                    "Quemaduras Químicas / Ampollas",
                    "Asimetría o Caída por Botox / Rellenos",
                    "Hinchazón Severa / Reacciones Alérgicas",
                    "Daños por Hiperpigmentación Láser",
                    "Acusaciones sobre Inyectores No Autorizados",
                    "Privacidad Médica e Inquietudes de Confidencialidad"
                ],
                "faqItems": [
                    {
                        "q": "¿Cómo protege ReplyVera la privacidad médica de los pacientes?",
                        "a": "Las respuestas de ReplyVera mantienen un tono cortés y general que nunca confirma ni divulga tratamientos específicos o datos de salud privados."
                    },
                    {
                        "q": "¿Qué ocurre si un paciente menciona una complicación o quemadura?",
                        "a": "Cualquier reseña con menciones de quemaduras, infecciones o quejas sobre tratamientos se bloquea de inmediato y se remite al director médico."
                    }
                ],
                "finalCtaHeadline": "Protege la Reputación de tu Clínica Estética en Piloto Automático",
                "finalCtaDescription": "Comienza hoy tu prueba gratuita de 14 días. Conecta tu Perfil de Empresa de Google en pocos minutos."
            }
        }
    },
    {
        "id": "contractors",
        "slugs": {
            "en": "contractors",
            "nl": "aannemers-installateurs",
            "es": "contratistas-reformas"
        },
        "icon": "hammer",
        "iconBgClass": "contractor-icon",
        "theme": {
            "accent": "#EA580C",
            "motif": "blueprint",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Home Services & Contractors",
                "dropdownDesc": "Automated replies for trades with water damage and code violation filters.",
                "metaTitle": "Google Review Automation for Contractors & Home Services | ReplyVera",
                "metaDescription": "Automate Google review replies for contractors, roofers, HVAC, and plumbers. ReplyVera celebrates successful jobs while routing water damage, code, and pricing disputes to owners.",
                "heroHeadline": "Professional Google Review Replies for Trades & Contractors",
                "heroDescription": "ReplyVera automatically thanks homeowners for glowing job reviews, while holding flooding, property damage, code violations, and delay complaints for contractor review.",
                "mockupPositive": "On time, clean work, and our new HVAC system cut our energy bill in half. Highly recommend!",
                "mockupNegative": "Job took three weeks longer than promised and scrap metal was left on the lawn.",
                "mockupSensitive": "Water pipe burst during installation, flooding our newly finished basement.",
                "benefitsHeadline": "Reputation Protection That Works as Hard as Your Crew",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Win More High-Value Bids",
                        "text": "Fast, professional review replies show homeowners and commercial clients that you stand behind your work."
                    },
                    {
                        "icon": "award",
                        "title": "Praise Field Technicians",
                        "text": "Technicians and lead foremen praised by name receive tailored recognition in public replies."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Intercept Property Damage Claims",
                        "text": "Claims involving burst pipes, leaks, code issues, or unfinished jobs require direct owner sign-off."
                    }
                ],
                "step2Text": "Set trade tone, crew member recognition, and property damage escalation triggers.",
                "step3Text": "Routine homeowner praise publishes automatically. Structural or damage claims alert you instantly on your phone.",
                "reviewsHeadline": "From 5-Star Remodels to Property Inquiries",
                "reviewsSubhead": "See how ReplyVera manages homeowner feedback for plumbers, roofers, and builders.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"On time, clean work, and our new HVAC system cut our energy bill in half. Highly recommend!\"",
                        "reply": "\"Thank you for choosing our team! We take great pride in clean, reliable craftsmanship and are glad your new HVAC system is performing so well.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Timeline Delay",
                        "quote": "\"Job took three weeks longer than promised and scrap metal was left on the lawn.\"",
                        "reply": "\"Thank you for your feedback. We apologize for the schedule overrun and the mess left behind. Our crew manager will contact you directly to ensure the cleanup is completed.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Property Damage Alert",
                        "quote": "\"Water pipe burst during installation, flooding our newly finished basement.\"",
                        "isAlert": true,
                        "alertTitle": "Severe property damage detected",
                        "alertText": "Auto-publishing blocked. Business owner notified immediately for direct resolution."
                    }
                ],
                "sensitiveHeadline": "Property Damage and Building Code Disputes Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Water Damage / Flooding",
                    "Structural & Safety Hazards",
                    "Permit & Building Code Issues",
                    "Unfinished Work / Deposit Disputes",
                    "License Inquiries"
                ],
                "faqItems": [
                    {
                        "q": "Does ReplyVera work for multi-trade contractor companies?",
                        "a": "Yes. Whether you specialize in HVAC, roofing, plumbing, or general remodeling, ReplyVera tailors replies to your trade."
                    },
                    {
                        "q": "How does ReplyVera handle property damage complaints?",
                        "a": "Reviews mentioning water damage, leaks, or safety hazards are instantly blocked from auto-publishing and forwarded directly to the owner."
                    }
                ],
                "finalCtaHeadline": "Build a Rock-Solid Reputation in Your Service Area",
                "finalCtaDescription": "Start your 14-day free trial. Answer routine reviews automatically and keep sensitive homeowner disputes under direct control."
            },
            "nl": {
                "name": "Aannemers & Installateurs",
                "dropdownDesc": "Automatische reacties voor bouwbedrijven met filters voor waterschade en geschillen.",
                "metaTitle": "Google Review Automatisering voor Aannemers & Installateurs | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor aannemers, loodgieters en installatiebedrijven. ReplyVera bedankt tevreden klanten en escaleert schadeclaims naar de eigenaar.",
                "heroHeadline": "Professionele Google Review Reacties voor Bouw en Installatie",
                "heroDescription": "ReplyVera bedankt opdrachtgevers automatisch na een geslaagde klus en houdt klachten over waterschade, meerwerk of vertraging onder controle van de aannemer.",
                "mockupPositive": "Netjes op tijd, schone oplevering en onze nieuwe warmtepomp werkt geruisloos. Aanrader!",
                "mockupNegative": "Klus duurde drie weken langer dan afgesproken en er lag nog bouwafval in de tuin.",
                "mockupSensitive": "Waterleiding geraakt tijdens montage waardoor onze pas gestucte woonkamer onder water liep.",
                "benefitsHeadline": "Reputatiebescherming die net zo betrouwbaar is als uw vakwerk",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Scoor Meer Nieuwe Opdrachten",
                        "text": "Actieve en beleefde reacties tonen particuliere en zakelijke klanten dat u garant staat voor uw werk."
                    },
                    {
                        "icon": "award",
                        "title": "Waardeer uw Vaklieden",
                        "text": "Monteurs en voormannen die in reviews worden geprezen krijgen direct een verdiend compliment in het antwoord."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Onderschep Schadeclaims",
                        "text": "Meldingen over lekkages, constructieschade of achterstallig werk worden direct tegengehouden voor persoonlijk overleg."
                    }
                ],
                "step2Text": "Stel uw toon in, erkenning van monteurs en escalatiedrempels voor schade en geschillen.",
                "step3Text": "Routinematige tevredenheid gaat direct live. Schadeclaims alarmeren direct de eigenaar.",
                "reviewsHeadline": "Van Geslaagde Opleveringen tot Uitloopklachten",
                "reviewsSubhead": "Zie hoe ReplyVera klantbeoordelingen voor aannemers en installateurs beheert.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Netjes op tijd, schone oplevering en onze nieuwe warmtepomp werkt geruisloos. Aanrader!\"",
                        "reply": "\"Hartelijk dank voor deze mooie referentie! Fijn dat de installatie zo soepel is verlopen en de warmtepomp naar wens functioneert. Veel plezier met de nieuwe installatie!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Klacht over Planning",
                        "quote": "\"Klus duurde drie weken langer dan afgesproken en er lag nog bouwafval in de tuin.\"",
                        "reply": "\"Bedankt voor uw opmerking. Onze excuses voor de uitloop en het achtergebleven puin. We nemen vandaag nog contact met u op om de tuin netjes af te ronden.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Schade Incident Alert",
                        "quote": "\"Waterleiding geraakt tijdens montage waardoor onze pas gestucte woonkamer onder water liep.\"",
                        "isAlert": true,
                        "alertTitle": "Ernstige schadeclaim gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Directe notificatie naar eigenaar."
                    }
                ],
                "sensitiveHeadline": "Schadeclaims en vergunningsgeschillen mogen nooit automatisch online gaan",
                "sensitiveTopics": [
                    "Waterschade / Lekkages",
                    "Constructieve & Veiligheidsrisico’s",
                    "Vergunningen & Bouwbesluit",
                    "Onvoltooid werk / Aanbetalingen",
                    "Garantieclaims"
                ],
                "faqItems": [
                    {
                        "q": "Is ReplyVera geschikt voor installateurs en klusbedrijven?",
                        "a": "Zeker. Of u nu loodgieter, schilder, dakdekker of aannemer bent, ReplyVera past de vaktermen aan op uw werkzaamheden."
                    },
                    {
                        "q": "Hoe wordt schade aan eigendommen afgehandeld?",
                        "a": "Reviews met meldingen over lekkages, schade of oplevergeschillen worden per direct tegengehouden zodat u direct contact kunt opnemen."
                    }
                ],
                "finalCtaHeadline": "Bouw aan een IJzersterke Reputatie in uw Regio",
                "finalCtaDescription": "Start vandaag uw gratis proefperiode van 14 dagen. Reageer moeiteloos op tevreden klanten en behoud volledige controle over geschillen."
            },
            "es": {
                "name": "Contratistas y Reformas",
                "dropdownDesc": "Respuestas automatizadas para reformas y construcción con filtro de daños y retrasos.",
                "metaTitle": "Automatización de Reseñas de Google para Contratistas y Reformas | ReplyVera",
                "metaDescription": "Automatiza respuestas a reseñas de Google para empresas de reformas, fontanería y climatización. ReplyVera responde elogios y deriva daños y disputas al contratista.",
                "heroHeadline": "Respuestas Profesionales en Google para Contratistas y Reformas",
                "heroDescription": "ReplyVera responde automáticamente a propietarios satisfechos tras una obra y retiene quejas de fugas de agua, desperfectos o plazos para el contratista.",
                "mockupPositive": "Puntuales, muy limpios y el nuevo sistema de aire acondicionado redujo el consumo a la mitad.",
                "mockupNegative": "La obra tardó tres semanas más de lo pactado y dejaron escombros en el jardín.",
                "mockupSensitive": "Perforaron una tubería durante la instalación e inundaron el salón recién pintado.",
                "benefitsHeadline": "Protección de Reputación tan Firme como tus Construcciones",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Consigue Mejores Presupuestos",
                        "text": "Respuestas profesionales demuestran a futuros clientes que respondes por cada proyecto realizado."
                    },
                    {
                        "icon": "award",
                        "title": "Reconoce a tus Oficiales de Obra",
                        "text": "Los jefes de cuadrilla y técnicos mencionados en las reseñas reciben agradecimientos personalizados."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Intercepta Reclamos de Daños",
                        "text": "Cualquier queja por inundaciones, grietas o remates inacabados se desvía para atención del dueño."
                    }
                ],
                "step2Text": "Ajusta el tono para construcción, reconocimiento de técnicos y alertas de averías o daños en obra.",
                "step3Text": "Los clientes satisfechos reciben respuesta al instante. Los reclamos de daños notifican de inmediato a tu móvil.",
                "reviewsHeadline": "Desde Reformas Impecables hasta Demoras de Obra",
                "reviewsSubhead": "Comprueba cómo ReplyVera protege la reputación de tu empresa constructora.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Puntuales, muy limpios y el nuevo sistema de aire acondicionado redujo el consumo a la mitad.\"",
                        "reply": "\"¡Muchas gracias por su confianza! Nos enorgullece entregar obras limpias y duraderas. Nos alegra mucho saber que el sistema funciona a la perfección.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Demora en Plazos",
                        "quote": "\"La obra tardó tres semanas más de lo pactado y dejaron escombros en el jardín.\"",
                        "reply": "\"Agradecemos sus comentarios. Lamentamos el retraso en el cronograma y el estado de la limpieza. El jefe de obra se pondrá en contacto para solucionarlo de inmediato.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Incidente de Daños en Obra",
                        "quote": "\"Perforaron una tubería durante la instalación e inundaron el salón recién pintado.\"",
                        "isAlert": true,
                        "alertTitle": "Reclamo de daños materiales detectado",
                        "alertText": "Publicación automática bloqueada. Notificación urgente al titular de la empresa."
                    }
                ],
                "sensitiveHeadline": "Los reclamos de desperfectos y normativas nunca deben responderse solos",
                "sensitiveTopics": [
                    "Inundaciones y Fugas de Agua",
                    "Riesgos Estructurales",
                    "Permisos y Licencias de Obra",
                    "Trabajos Inacabados / Adelantos",
                    "Garantías de Obra"
                ],
                "faqItems": [
                    {
                        "q": "¿Sirve ReplyVera para fontaneros, electricistas y pintores?",
                        "a": "Sí. Ya sea que hagas reformas integrales o instalaciones específicas, las respuestas se adaptan a tu sector."
                    },
                    {
                        "q": "¿Qué sucede si un cliente reporta una fuga o daño?",
                        "a": "Se detiene la publicación de inmediato y se te notifica para que puedas contactar al cliente antes de que escale."
                    }
                ],
                "finalCtaHeadline": "Construye una Reputación Sólida en tu Zona",
                "finalCtaDescription": "Comienza tu prueba de 14 días. Automatiza respuestas a clientes contentos y mantén el control directo sobre cualquier imprevisto."
            }
        }
    },
    {
        "id": "car-washes",
        "slugs": {
            "en": "car-washes",
            "nl": "autowasstraten",
            "es": "autolavados"
        },
        "icon": "car",
        "iconBgClass": "carwash-icon",
        "theme": {
            "accent": "#0D9488",
            "motif": "waves",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Car Wash Operators",
                "dropdownDesc": "Track damage, billing, and service complaints.",
                "metaTitle": "Google Review Automation for Car Washes | ReplyVera",
                "metaDescription": "Automate Google review replies for car wash locations. ReplyVera answers routine positive feedback and routes vehicle damage or billing claims to managers.",
                "heroHeadline": "Every Car Wash Review Answered Automatically",
                "heroDescription": "ReplyVera handles routine reviews while escalating vehicle-damage, billing, membership, and safety complaints before any response is published.",
                "mockupPositive": "Best car wash in the area. Always spotless.",
                "mockupNegative": "The equipment was broken and my car was not cleaned properly.",
                "mockupSensitive": "My side mirror was ripped off during the automatic wash.",
                "benefitsHeadline": "Responses That Work as Hard as Your Equipment",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Save Manager Hours",
                        "text": "Routine 5-star reviews are handled automatically, freeing managers for site ops."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Prevent Damage Claims",
                        "text": "Complaints mentioning scratched paint or broken mirrors require human approval."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Manage Membership & Pass Inquiries",
                        "text": "Billing and wash-pass membership issues route directly to your supervisor."
                    }
                ],
                "step2Text": "Set tone preferences, damage safeguards, and billing approval thresholds.",
                "step3Text": "Clean wash reviews publish automatically. Damage claims trigger an instant owner alert.",
                "reviewsHeadline": "From Cleanliness Praises to Damage Claims",
                "reviewsSubhead": "See how ReplyVera handles all types of car wash reviews.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Best car wash in the area. Always spotless.\"",
                        "reply": "\"Thank you for the fantastic review! We are glad your vehicle looks great and we look forward to seeing you again!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Equipment Complaint",
                        "quote": "\"The equipment was broken and my car was not cleaned properly.\"",
                        "reply": "\"Thank you for letting us know. We apologize for the inconvenience and have alerted our technician to inspect the wash bay.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Damage Claim Alert",
                        "quote": "\"My side mirror was ripped off during the automatic wash.\"",
                        "isAlert": true,
                        "alertTitle": "Vehicle damage detected",
                        "alertText": "Auto-publishing blocked. Owner approval required before responding."
                    }
                ],
                "sensitiveHeadline": "Damage Claims Must Never Auto-Publish",
                "sensitiveTopics": [
                    "Vehicle Damage",
                    "Paint Scratches",
                    "Broken Mirrors",
                    "Duplicate Billing",
                    "Membership Cancellations",
                    "Personal Injury"
                ],
                "faqItems": [
                    {
                        "q": "Does ReplyVera escalate vehicle damage claims?",
                        "a": "Yes. Any mention of scratches or broken components is blocked for owner approval."
                    },
                    {
                        "q": "Can ReplyVera handle wash pass and billing issues?",
                        "a": "Yes. Membership and billing questions route to your manager."
                    }
                ],
                "finalCtaHeadline": "Stop Leaving Car Wash Reviews Unanswered",
                "finalCtaDescription": "Let ReplyVera handle routine replies and protect your reputation while your team delivers clean cars."
            },
            "nl": {
                "name": "Autowasstraten",
                "dropdownDesc": "Schade aan voertuigen en escalatie van facturering.",
                "metaTitle": "Google Review Automatisering voor Autowasstraten | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor uw autowasstraat. ReplyVera beantwoordt routinematige reviews en escaleert schade- of facturatieklachten.",
                "heroHeadline": "Elke Review voor uw Autowasstraat Automatisch Beantwoord",
                "heroDescription": "ReplyVera behandelt routinematige reviews en escaleert klachten over voertuigschade, facturering, lidmaatschap en veiligheid voordat er een antwoord wordt gepubliceerd.",
                "mockupPositive": "Beste autowasstraat in de buurt. Altijd vlekkeloos schoon.",
                "mockupNegative": "De apparatuur was kapot en mijn auto werd niet goed schoon.",
                "mockupSensitive": "Mijn zijspiegel werd afgebroken tijdens het wassen.",
                "benefitsHeadline": "Reacties die net zo hard werken als uw apparatuur",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Bespaar Tijd voor Managers",
                        "text": "Routinematige beoordelingen worden automatisch afgehandeld, zodat uw team zich kan richten op de operationele zaken."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Voorkom Schadeclaims",
                        "text": "Klachten over schade aan voertuigen, spiegels of lak vereisen altijd menselijke goedkeuring voordat er wordt gereageerd."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Beheer Lidmaatschapklachten",
                        "text": "Vragen over facturering en abonnementen worden direct doorgestuurd naar uw leidinggevende."
                    }
                ],
                "step2Text": "Stel uw voorkeursregels in voor schadedrempels, abonnementen en merktoon.",
                "step3Text": "Schone wasreviews gaan direct live. Schadeclaims sturen direct een melding naar de eigenaar.",
                "reviewsHeadline": "Van Schoonmaakcomplimenten tot Schadeclaims",
                "reviewsSubhead": "Zie hoe ReplyVera alle soorten autowasstraat-reviews afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Beste autowasstraat in de buurt. Altijd vlekkeloos schoon.\"",
                        "reply": "\"Hartelijk dank voor deze geweldige beoordeling! Fijn om te horen dat uw auto glanzend schoon is geworden. Graag tot de volgende keer!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Klacht over Apparatuur",
                        "quote": "\"De apparatuur was kapot en mijn auto werd niet goed schoon.\"",
                        "reply": "\"Bedankt voor uw eerlijke feedback. Onze excuses voor het ongemak. We hebben ons onderhoudsteam ingeschakeld om de apparatuur te controleren.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Gevoelig Onderwerp (Schade)",
                        "quote": "\"Mijn zijspiegel werd afgebroken tijdens het wassen.\"",
                        "isAlert": true,
                        "alertTitle": "Voertuigschade gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Goedkeuring van de eigenaar is vereist voordat er wordt gereageerd."
                    }
                ],
                "sensitiveHeadline": "Schadeclaims mogen nooit automatisch worden beantwoord",
                "sensitiveTopics": [
                    "Voertuigschade",
                    "Krassen",
                    "Afgebroken spiegels",
                    "Dubbele facturering",
                    "Lidmaatschap annuleringen",
                    "Letsel"
                ],
                "faqItems": [
                    {
                        "q": "Escaleert ReplyVera claims over voertuigschade?",
                        "a": "Ja. Reviews die melding maken van krassen, deuken of schade aan voertuigen worden direct geblokkeerd voor automatische publicatie."
                    },
                    {
                        "q": "Kan ReplyVera abonnements- en factureringsklachten behandelen?",
                        "a": "Ja. Klachten over waspaslidmaatschappen of dubbele afschrijvingen worden gefilterd voor menselijke goedkeuring."
                    }
                ],
                "finalCtaHeadline": "Stop met het laten liggen van Autowasstraat Reviews",
                "finalCtaDescription": "Laat ReplyVera routinematige reacties afhandelen en bescherm uw reputatie terwijl uw team zorgt voor schone auto's."
            },
            "es": {
                "name": "Operadores de Lavado de Autos",
                "dropdownDesc": "Rastrea quejas de daños, facturación y servicio.",
                "metaTitle": "Automatización de Reseñas de Google para Autolavados | ReplyVera",
                "metaDescription": "Automatiza las respuestas en Google para tu autolavado. ReplyVera responde reseñas rutinarias y escala reclamos de daños o facturación a los gerentes.",
                "heroHeadline": "Cada Reseña de tu Autolavado Respondida Automáticamente",
                "heroDescription": "ReplyVera gestiona las reseñas rutinarias y escala reclamos sobre daños a vehículos, facturación, membresías y seguridad antes de publicar cualquier respuesta.",
                "mockupPositive": "El mejor autolavado de la zona. Siempre impecable.",
                "mockupNegative": "El equipo estaba roto y mi auto no quedó bien limpio.",
                "mockupSensitive": "Mi espejo retrovisor se rompió durante el lavado automático.",
                "benefitsHeadline": "Respuestas que trabajan tan duro como tus equipos",
                "benefits": [
                    {
                        "icon": "clock",
                        "title": "Ahorra Tiempo a los Gerentes",
                        "text": "Las reseñas rutinarias se manejan automáticamente para que tu equipo se concentre en la operación."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Evita Reclamos de Daños",
                        "text": "Las quejas sobre rayones o daños en vehículos siempre requieren aprobación humana antes de responder."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Gestiona Quejas de Membresía",
                        "text": "Las dudas sobre cobros y suscripciones se dirigen directamente al responsable."
                    }
                ],
                "step2Text": "Ajusta las salvaguardas de daños, reglas de cobros y el tono de tu autolavado.",
                "step3Text": "Las reseñas de lavado perfecto se publican solas. Los reclamos de daños notifican de inmediato al dueño.",
                "reviewsHeadline": "Desde Elogios de Limpieza hasta Reclamos de Daños",
                "reviewsSubhead": "Mira cómo ReplyVera gestiona todo tipo de reseñas de autolavados.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"El mejor autolavado de la zona. Siempre impecable.\"",
                        "reply": "\"¡Muchas gracias por esta excelente calificación! Nos alegra saber que tu auto quedó brillante y limpio. ¡Te esperamos pronto!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Queja de Equipo",
                        "quote": "\"El equipo estaba roto y mi auto no quedó bien limpio.\"",
                        "reply": "\"Gracias por tu comentario sincero. Pedimos disculpas por los inconvenientes. Hemos notificado a nuestro equipo de mantenimiento.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Tema Sensible (Daño)",
                        "quote": "\"Mi espejo retrovisor se rompió durante el lavado automático.\"",
                        "isAlert": true,
                        "alertTitle": "Daño vehicular detectado",
                        "alertText": "Publicación automática bloqueada. Se requiere aprobación del propietario antes de responder."
                    }
                ],
                "sensitiveHeadline": "Los reclamos de daños nunca deben responderse automáticamente",
                "sensitiveTopics": [
                    "Daños a vehículos",
                    "Rayones",
                    "Espejos rotos",
                    "Cobros duplicados",
                    "Cancelación de membresías",
                    "Lesiones"
                ],
                "faqItems": [
                    {
                        "q": "¿ReplyVera escala reclamos de daños en vehículos?",
                        "a": "Sí. Las reseñas que mencionan rayones o daños se bloquean inmediatamente y se envían a tu bandeja de aprobación."
                    },
                    {
                        "q": "¿Puede ReplyVera gestionar quejas de membresía y facturación?",
                        "a": "Sí. Las quejas sobre cobros o pases de lavado se filtran para revisión manual."
                    }
                ],
                "finalCtaHeadline": "No Dejes Reseñas de tu Autolavado sin Responder",
                "finalCtaDescription": "Deja que ReplyVera responda a las reseñas rutinarias y proteja tu reputación mientras tu equipo se enfoca en entregar autos limpios."
            }
        }
    },
    {
        "id": "pet-care",
        "slugs": {
            "en": "pet-care",
            "nl": "dierenverzorging",
            "es": "cuidado-de-mascotas"
        },
        "icon": "dog",
        "iconBgClass": "petcare-icon",
        "theme": {
            "accent": "#16A34A",
            "motif": "topography",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Pet Care",
                "dropdownDesc": "Warm replies with animal-safety escalation.",
                "metaTitle": "Google Review Automation for Pet Care | ReplyVera",
                "metaDescription": "Warm Google review response software for veterinary clinics and pet groomers. ReplyVera answers routine reviews while routing animal health concerns to staff.",
                "heroHeadline": "Warm Review Replies for Vets & Pet Groomers",
                "heroDescription": "ReplyVera generates empathetic replies for pet care businesses and immediately escalates health or injury concerns to your team.",
                "mockupPositive": "Our dog Max was treated with so much love during his grooming session.",
                "mockupNegative": "The wait time at the clinic was much longer than promised.",
                "mockupSensitive": "My cat returned home with a limp after staying at the boarding facility.",
                "benefitsHeadline": "Caring Communication for Pet Lovers",
                "benefits": [
                    {
                        "icon": "dog",
                        "title": "Warm & Empathetic Tone",
                        "text": "Show pet parents that their companion is in caring hands."
                    },
                    {
                        "icon": "award",
                        "title": "Personalized Touch",
                        "text": "Pet names mentioned in reviews are warmly incorporated into replies."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Animal Safety Escalation",
                        "text": "Health, sickness, or injury feedback is blocked from automated posting."
                    }
                ],
                "step2Text": "Configure warm brand voice, pet name recognition, and injury safety filters.",
                "step3Text": "Happy pet reviews publish automatically. Animal health concerns alert your manager immediately.",
                "reviewsHeadline": "From Happy Pets to Owner Concerns",
                "reviewsSubhead": "See how ReplyVera handles pet care and veterinary reviews.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Our dog Max was treated with so much love during his grooming session.\"",
                        "reply": "\"Thank you so much! Max is a sweet boy and we cannot wait to see him again!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Wait Time Complaint",
                        "quote": "\"The wait time at the clinic was much longer than promised.\"",
                        "reply": "\"Thank you for your patience. We strive to keep appointments on time and apologize for the delay.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Animal Welfare Alert",
                        "quote": "\"My cat returned home with a limp after staying at the boarding facility.\"",
                        "isAlert": true,
                        "alertTitle": "Welfare incident detected",
                        "alertText": "Auto-publishing blocked. Immediate alert sent to management."
                    }
                ],
                "sensitiveHeadline": "Pet Welfare Concerns Always Require Human Care",
                "sensitiveTopics": [
                    "Pet Injury",
                    "Post-Stay Sickness",
                    "Medical Complications",
                    "Dosing Errors"
                ],
                "faqItems": [
                    {
                        "q": "Does ReplyVera recognize pet names?",
                        "a": "Yes. Dog, cat, and pet names are identified and warmly included in replies."
                    }
                ],
                "finalCtaHeadline": "Show Your Love for Pet Care",
                "finalCtaDescription": "Reply to reviews with warmth and protect the trust of pet owners."
            },
            "nl": {
                "name": "Dierenverzorging",
                "dropdownDesc": "Warme reacties met escalatie van diergezondheid en veiligheid.",
                "metaTitle": "Google Review Automatisering voor Dierenverzorging | ReplyVera",
                "metaDescription": "Warme Google-reviewreacties voor dierenartsen en trimsalons. ReplyVera beantwoordt routinematige reviews en escaleert gezondheidsvragen naar uw team.",
                "heroHeadline": "Warme Review Reacties voor Dierenartsen en Trimsalons",
                "heroDescription": "ReplyVera genereert warme, meelevende reacties voor dierenverzorgers en escaleert medische of veiligheidsvragen direct.",
                "mockupPositive": "Onze hond Max werd zo liefdevol verzorgd tijdens de trimbeurt.",
                "mockupNegative": "De wachttijd in de praktijk liep erg uit.",
                "mockupSensitive": "Mijn kat kwam gewond terug uit het pension.",
                "benefitsHeadline": "Meelevende Communicatie voor Dierenliefhebbers",
                "benefits": [
                    {
                        "icon": "dog",
                        "title": "Warme & Diervriendelijke Toon",
                        "text": "Laat diereigenaren zien dat uw hart bij de verzorging van hun huisdier ligt."
                    },
                    {
                        "icon": "award",
                        "title": "Persoonlijke Aandacht",
                        "text": "Namen van huisdieren in reviews worden liefdevol overgenomen in het antwoord."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Dierenwelzijn Escalatie",
                        "text": "Meldingen over ziekte of letsel bij dieren worden direct geblokkeerd voor automatisering."
                    }
                ],
                "step2Text": "Stel uw warme merktoon in, activeer diernaam-herkenning en stel veiligheidsfilters in.",
                "step3Text": "Blije huisdierbeoordelingen gaan direct live. Zorgen over diergezondheid waarschuwen uw directie.",
                "reviewsHeadline": "Van Blije Huisdieren tot Zorgen van Eigenaren",
                "reviewsSubhead": "Zie hoe ReplyVera reacties op dierbeoordelingen verzorgt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Onze hond Max werd zo liefdevol verzorgd tijdens de trimbeurt.\"",
                        "reply": "\"Wat fijn om te horen! Max is een geweldige hond en we zien hem graag snel weer in de salon.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Wachttijdklacht",
                        "quote": "\"De wachttijd in de praktijk liep erg uit.\"",
                        "reply": "\"Bedankt voor uw geduld. We doen ons best om wachttijden minimaal te houden en excuses voor het uitlopen.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Melding Dierenwelzijn",
                        "quote": "\"Mijn kat kwam gewond terug uit het pension.\"",
                        "isAlert": true,
                        "alertTitle": "Welzijnsincident gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Directie waarschuwen."
                    }
                ],
                "sensitiveHeadline": "Veiligheid van Huisdieren staat altijd centraal",
                "sensitiveTopics": [
                    "Letsel bij huisdieren",
                    "Ziekte na verblijf",
                    "Medische complicaties",
                    "Medicatiefouten"
                ],
                "faqItems": [
                    {
                        "q": "Herken ReplyVera de namen van huisdieren?",
                        "a": "Ja. Namen van honden, katten en andere dieren worden herkend en opgenomen in de reactie."
                    }
                ],
                "finalCtaHeadline": "Toon uw Liefde voor Dierenverzorging",
                "finalCtaDescription": "Beantwoord reviews met een warme toon en bescherm het vertrouwen van baasjes."
            },
            "es": {
                "name": "Cuidado de Mascotas",
                "dropdownDesc": "Respuestas cálidas con escalado de salud y seguridad animal.",
                "metaTitle": "Automatización de Reseñas de Google para Cuidado de Mascotas | ReplyVera",
                "metaDescription": "Software de respuestas a reseñas de Google para clínicas veterinarias y peluquerías caninas. ReplyVera escala dudas sobre salud animal a tu equipo.",
                "heroHeadline": "Respuestas Cálidas para Veterinarias y Peluquerías Caninas",
                "heroDescription": "ReplyVera redacta respuestas afectuosas para centros de mascotas y escala inmediatamente dudas médicas o de salud.",
                "mockupPositive": "Trataron a nuestro perro Max con mucho cariño durante el baño.",
                "mockupNegative": "El tiempo de espera en la clínica fue demasiado largo.",
                "mockupSensitive": "Mi gato volvió lastimado de su estancia en la guardería.",
                "benefitsHeadline": "Comunicación Afectuosa para Amantes de los Animales",
                "benefits": [
                    {
                        "icon": "dog",
                        "title": "Tono Cálido y Empático",
                        "text": "Muestra a los dueños el amor y cuidado que dedican a sus mascotas."
                    },
                    {
                        "icon": "award",
                        "title": "Atención Personalizada",
                        "text": "Los nombres de las mascotas se mencionan cariñosamente en la respuesta."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Escalado de Bienestar Animal",
                        "text": "Cualquier reporte sobre salud o lesiones se bloquea para respuesta automática."
                    }
                ],
                "step2Text": "Configura un tono afectuoso, reconocimiento de mascotas y salvaguardas de salud.",
                "step3Text": "Las opiniones felices de mascotas se publican solas. Las dudas de salud alertan a la gerencia.",
                "reviewsHeadline": "Desde Mascotas Felices hasta Preocupaciones de Dueños",
                "reviewsSubhead": "Mira cómo ReplyVera responde a reseñas en el sector veterinario y canino.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Trataron a nuestro perro Max con mucho cariño durante el baño.\"",
                        "reply": "\"¡Muchas gracias! Max es un perrito encantador y será un placer recibirlo nuevamente.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Queja de Espera",
                        "quote": "\"El tiempo de espera en la clínica fue demasiado largo.\"",
                        "reply": "\"Agradecemos tu paciencia. Hacemos lo posible por optimizar nuestros tiempos y pedimos disculpas por la demora.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Alerta de Salud",
                        "quote": "\"Mi gato volvió lastimado de su estancia en la guardería.\"",
                        "isAlert": true,
                        "alertTitle": "Incidente de salud detectado",
                        "alertText": "Publicación automática bloqueada. Notificación urgente a la gerencia."
                    }
                ],
                "sensitiveHeadline": "La salud de las mascotas es siempre prioritaria",
                "sensitiveTopics": [
                    "Lesiones en mascotas",
                    "Enfermedades tras estancia",
                    "Complicaciones médicas",
                    "Errores de medicación"
                ],
                "faqItems": [
                    {
                        "q": "¿ReplyVera reconoce los nombres de las mascotas?",
                        "a": "Sí. Los nombres de perros, gatos y otras mascotas se identifican e incluyen en la respuesta."
                    }
                ],
                "finalCtaHeadline": "Muestra tu Pasión por el Cuidado Animal",
                "finalCtaDescription": "Responde a tus clientes con empatía y protege la confianza de los dueños de mascotas."
            }
        }
    },
    {
        "id": "childcare",
        "slugs": {
            "en": "childcare",
            "nl": "kinderopvang",
            "es": "guarderias"
        },
        "icon": "heart",
        "iconBgClass": "childcare-icon",
        "theme": {
            "accent": "#CA8A04",
            "motif": "stars",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Childcare & Preschool",
                "dropdownDesc": "Safety-aware responses for parent feedback.",
                "metaTitle": "Google Review Automation for Childcare & Preschool | ReplyVera",
                "metaDescription": "Professional Google review responses for daycare centers and preschools. ReplyVera automates friendly replies while escalating safety and parent concerns.",
                "heroHeadline": "Safety-Aware Review Replies for Childcare & Preschools",
                "heroDescription": "ReplyVera helps childcare centers respond with warmth and professionalism while ensuring child safety and privacy are strictly safeguarded.",
                "mockupPositive": "The teachers are so loving and attentive to our daughter.",
                "mockupNegative": "Daily activity communication could be more consistent.",
                "mockupSensitive": "My child came home with unexplained bruises today.",
                "benefitsHeadline": "Trust & Safety in Every Response",
                "benefits": [
                    {
                        "icon": "heart",
                        "title": "Warm & Reassuring Tone",
                        "text": "Reflect the caring environment your staff provides every single day."
                    },
                    {
                        "icon": "lock",
                        "title": "Child Privacy Protection",
                        "text": "Replies strictly omit private child details or personal identifying info."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Immediate Safety Escalation",
                        "text": "Any concern regarding child safety is routed straight to your director."
                    }
                ],
                "step2Text": "Configure warm parent tone, privacy boundaries, and immediate safety escalations.",
                "step3Text": "Warm reviews publish automatically. Safety concerns alert your school director immediately.",
                "reviewsHeadline": "Careful Handling of Parent Reviews",
                "reviewsSubhead": "See how ReplyVera maintains parent trust and safety across all review types.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"The teachers are so loving and attentive to our daughter.\"",
                        "reply": "\"Thank you so much for your kind words! We will happily pass along your compliment to our classroom team!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Communication Suggestion",
                        "quote": "\"Daily activity communication could be more consistent.\"",
                        "reply": "\"Thank you for your valuable feedback. We will review our daily updates to ensure parents stay well informed.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Child Safety Alert",
                        "quote": "\"My child came home with unexplained bruises today.\"",
                        "isAlert": true,
                        "alertTitle": "Child safety concern detected",
                        "alertText": "Auto-publishing blocked. School director notified immediately."
                    }
                ],
                "sensitiveHeadline": "Child Safety Concerns Must Always Require Director Care",
                "sensitiveTopics": [
                    "Child Safety",
                    "Classroom Incidents",
                    "Hygiene & Food",
                    "Privacy of Minors"
                ],
                "faqItems": [
                    {
                        "q": "How does ReplyVera protect child privacy?",
                        "a": "Replies never mention minor names or specific classroom details publicly."
                    }
                ],
                "finalCtaHeadline": "Strengthen Parent Trust Today",
                "finalCtaDescription": "Ensure warm, professional, and secure review responses for your childcare center."
            },
            "nl": {
                "name": "Kinderopvang & Peuterspeelzalen",
                "dropdownDesc": "Veiligheidsbewuste antwoorden op beoordelingen van ouders.",
                "metaTitle": "Google Review Automatisering voor Kinderopvang | ReplyVera",
                "metaDescription": "Professionele Google-reviewreacties voor kinderopvang en peuterspeelzalen. ReplyVera automatiseert reacties en escaleert veiligheidsvragen van ouders.",
                "heroHeadline": "Veiligheidsbewuste Review Reacties voor Kinderopvang",
                "heroDescription": "ReplyVera helpt kinderopvangcentra met warme, professionele antwoorden terwijl kinderveiligheid en privacy strikt gewaarborgd blijven.",
                "mockupPositive": "De leidsters zijn zo lief en zorgzaam voor onze dochter.",
                "mockupNegative": "Communicatie over de dagindeling kon beter.",
                "mockupSensitive": "Mijn kind kwam thuis met onverklarde blauwe plekken.",
                "benefitsHeadline": "Vertrouwen en Veiligheid in Elke Reactie",
                "benefits": [
                    {
                        "icon": "heart",
                        "title": "Warme & Professionele Uitstraling",
                        "text": "Laat zien hoeveel zorg en aandacht uw team dagelijks geeft."
                    },
                    {
                        "icon": "lock",
                        "title": "Privacy van Kinderen",
                        "text": "Reacties bevatten nooit privacygevoelige gegevens van kinderen of ouders."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Strikte Escalatie bij Veiligheid",
                        "text": "Elk signaal over kinderveiligheid wordt direct doorgestuurd naar de directie."
                    }
                ],
                "step2Text": "Stel uw warme inslag in, waarborg de privacy van kinderen en stel directie-escalaties in.",
                "step3Text": "Warme reviews gaan direct live. Veiligheidssignalen waarschuwen direct uw vestigingsmanager.",
                "reviewsHeadline": "Zorgvuldige Afhandeling van Ouderbeoordelingen",
                "reviewsSubhead": "Bekijk voorbeelden van reacties voor de kinderopvang.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"De leidsters zijn zo lief en zorgzaam voor onze dochter.\"",
                        "reply": "\"Wat fijn om te lezen! We geven uw lieve woorden met veel plezier door aan het team op de groep.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Aandachtspunt",
                        "quote": "\"Communicatie over de dagindeling kon beter.\"",
                        "reply": "\"Bedankt voor uw waardevolle feedback. We nemen dit mee in ons overleg om de oudercommunicatie verder te verbeteren.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Ernstige Zorg",
                        "quote": "\"Mijn kind kwam thuis met onverklarde blauwe plekken.\"",
                        "isAlert": true,
                        "alertTitle": "Veiligheidszorg gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Directie direct geïnformeerd."
                    }
                ],
                "sensitiveHeadline": "Kinderveiligheid staat altijd voorop",
                "sensitiveTopics": [
                    "Kinderveiligheid",
                    "Incidenten op de groep",
                    "Hygiëne & Voeding",
                    "Privacy van kinderen"
                ],
                "faqItems": [
                    {
                        "q": "Hoe waarborgt ReplyVera de privacy van kinderen?",
                        "a": "Reacties worden gegenereerd zonder namen van kinderen of specifieke groepsdetails te noemen."
                    }
                ],
                "finalCtaHeadline": "Versterk het Vertrouwen van Ouders",
                "finalCtaDescription": "Zorg voor professionele en veilige reviewreacties voor uw opvang."
            },
            "es": {
                "name": "Guardería y Preescolar",
                "dropdownDesc": "Respuestas cuidadosas para comentarios de padres.",
                "metaTitle": "Automatización de Reseñas de Google para Guarderías | ReplyVera",
                "metaDescription": "Respuestas profesionales a reseñas de Google para guarderías y preescolares. ReplyVera automatiza respuestas y escala consultas de seguridad a tu equipo.",
                "heroHeadline": "Respuestas de Reseñas Cuidadosas para Guarderías y Preescolares",
                "heroDescription": "ReplyVera brinda respuestas cálidas y profesionales a las familias garantizando siempre la privacidad y seguridad infantil.",
                "mockupPositive": "Las educadoras son muy cariñosas y atentas con nuestra hija.",
                "mockupNegative": "La comunicación sobre las actividades diarias podría mejorar.",
                "mockupSensitive": "Mi hijo volvió a casa con moretones sin explicación.",
                "benefitsHeadline": "Confianza y Seguridad en Cada Respuesta",
                "benefits": [
                    {
                        "icon": "heart",
                        "title": "Tono Cálido y Humano",
                        "text": "Muestra el nivel de dedicación y cuidado que tu equipo brinda diariamente."
                    },
                    {
                        "icon": "lock",
                        "title": "Privacidad Infantil",
                        "text": "Las respuestas jamás incluyen datos privados o nombres de menores."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Escalado Inmediato de Seguridad",
                        "text": "Cualquier alerta sobre el bienestar de los niños se redirige a la dirección."
                    }
                ],
                "step2Text": "Establece un tono cercano para padres, salvaguardas de privacidad y escalado urgente a dirección.",
                "step3Text": "Las reseñas afectuosas se publican solas. Las inquietudes de seguridad notifican a la directora.",
                "reviewsHeadline": "Gestión Responsable de Reseñas de Padres",
                "reviewsSubhead": "Ejemplos de respuestas para centros infantiles y jardines.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Las educadoras son muy cariñosas y atentas con nuestra hija.\"",
                        "reply": "\"¡Qué alegría leer tu comentario! Transmitiremos con mucho gusto tus lindas palabras a todo nuestro equipo.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 3,
                        "type": "Sugerencia de Comunicación",
                        "quote": "\"La comunicación sobre las actividades diarias podría mejorar.\"",
                        "reply": "\"Gracias por tus valiosos comentarios. Revisaremos nuestros canales para seguir mejorando la comunicación con las familias.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Preocupación Grave",
                        "quote": "\"Mi hijo volvió a casa con moretones sin explicación.\"",
                        "isAlert": true,
                        "alertTitle": "Alerta de seguridad infantil detectada",
                        "alertText": "Publicación automática bloqueada. Dirección notificada de inmediato."
                    }
                ],
                "sensitiveHeadline": "La seguridad de los niños es siempre lo primero",
                "sensitiveTopics": [
                    "Seguridad infantil",
                    "Incidentes en aula",
                    "Higiene y Alimentación",
                    "Privacidad de menores"
                ],
                "faqItems": [
                    {
                        "q": "¿Cómo protege ReplyVera la privacidad de los menores?",
                        "a": "Las respuestas se redactan omitiendo nombres de niños y detalles específicos de los grupos."
                    }
                ],
                "finalCtaHeadline": "Refuerza la Confianza de las Familias",
                "finalCtaDescription": "Asegura respuestas profesionales y cuidadosas para tu centro educativo."
            }
        }
    },
    {
        "id": "martial-arts",
        "slugs": {
            "en": "martial-arts",
            "nl": "vechtsportscholen",
            "es": "escuelas-de-artes-marciales"
        },
        "icon": "shield",
        "iconBgClass": "martial-arts-icon",
        "theme": {
            "accent": "#DC2626",
            "motif": "grid",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Martial Arts Schools",
                "dropdownDesc": "Parent-friendly replies with safety controls.",
                "metaTitle": "Google Review Automation for Martial Arts Schools | ReplyVera",
                "metaDescription": "Automate Google review replies for dojos and martial arts academies. ReplyVera publishes student praise while routing billing and safety questions to staff.",
                "heroHeadline": "Google Review Automation for Martial Arts Schools",
                "heroDescription": "ReplyVera provides respectful, parent-friendly replies while escalating safety, injury, and membership inquiries directly to the head instructor.",
                "mockupPositive": "My son has built so much confidence and discipline through these classes.",
                "mockupNegative": "My membership cancellation request was not processed in time.",
                "mockupSensitive": "My child suffered a concussion during sparring practice.",
                "benefitsHeadline": "Respectful Replies That Build Parent Trust",
                "benefits": [
                    {
                        "icon": "shield",
                        "title": "Safety First Safeguards",
                        "text": "Any review mentioning injury or safety is blocked from auto-publishing."
                    },
                    {
                        "icon": "heart",
                        "title": "Parent-Friendly Tone",
                        "text": "Replies convey discipline, respect, encouragement, and community values."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Membership Escalation",
                        "text": "Dues and cancellation issues filter to your administrative team."
                    }
                ],
                "step2Text": "Set respectful school tone, injury safety limits, and membership escalation rules.",
                "step3Text": "Student achievement reviews publish automatically. Injury reports alert your head instructor.",
                "reviewsHeadline": "From Student Achievements to Safety Queries",
                "reviewsSubhead": "See how ReplyVera handles dojo and academy reviews.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"My son has built so much confidence and discipline through these classes.\"",
                        "reply": "\"Thank you so much for your kind words! We are incredibly proud of his dedication and growth!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Billing Inquiry",
                        "quote": "\"My membership cancellation request was not processed in time.\"",
                        "reply": "\"We apologize for the oversight regarding your account. Our administrative team will reach out directly to assist.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Safety Alert",
                        "quote": "\"My child suffered a concussion during sparring practice.\"",
                        "isAlert": true,
                        "alertTitle": "Injury incident detected",
                        "alertText": "Auto-publishing blocked. Head instructor notified immediately."
                    }
                ],
                "sensitiveHeadline": "Injury & Safety Feedback Always Demands Owner Care",
                "sensitiveTopics": [
                    "Injuries",
                    "Sparring Incidents",
                    "Membership Dues",
                    "Bullying / Safety"
                ],
                "faqItems": [
                    {
                        "q": "Are injury reports blocked from auto-publishing?",
                        "a": "Yes. Any mention of injury or sparring accidents is routed to your instructor."
                    }
                ],
                "finalCtaHeadline": "Build Lasting Trust with Parents & Students",
                "finalCtaDescription": "Let ReplyVera manage your reviews with respect, safety, and care."
            },
            "nl": {
                "name": "Vechtsportscholen",
                "dropdownDesc": "Oudervriendelijke antwoorden met veiligheidscontrole.",
                "metaTitle": "Google Review Automatisering voor Vechtsportscholen | ReplyVera",
                "metaDescription": "Automatiseer Google-reviewreacties voor vechtsportscholen en dojo's. ReplyVera publiceert complimenten en escaleert vragen over lidmaatschap en veiligheid.",
                "heroHeadline": "Google Review Automatisering voor Vechtsportscholen",
                "heroDescription": "ReplyVera geeft oudervriendelijke antwoorden en escaleert vragen over veiligheid, blessures en lidmaatschappen direct naar de eigenaar.",
                "mockupPositive": "Mijn zoon heeft zoveel zelfvertrouwen gekregen door de lessen.",
                "mockupNegative": "De opzegging van mijn lidmaatschap werd niet verwerkt.",
                "mockupSensitive": "Mijn kind raakte gewond tijdens een sparringsessie.",
                "benefitsHeadline": "Vriendelijke reacties die vertrouwen bouwen bij ouders",
                "benefits": [
                    {
                        "icon": "shield",
                        "title": "Veiligheid Eerst",
                        "text": "Meldingen over blessures of veiligheid worden direct geblokkeerd voor automatische reactie."
                    },
                    {
                        "icon": "heart",
                        "title": "Oudervriendelijke Toon",
                        "text": "Reacties stralen respect, discipline en een positieve sfeer uit."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Lidmaatschap Escalatie",
                        "text": "Vragen over opzeggingen of contributie worden gefilterd voor handmatige opvolging."
                    }
                ],
                "step2Text": "Stel een respectvolle schooltoon in en stel meldingen in voor blessures en lidmaatschappen.",
                "step3Text": "Complimenten over lessen gaan direct live. Blessuremeldingen waarschuwen uw hoofdtrainer.",
                "reviewsHeadline": "Van Oudercomplimenten tot Veiligheidsvragen",
                "reviewsSubhead": "Zie hoe ReplyVera beoordelingen voor sportscholen afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Mijn zoon heeft zoveel zelfvertrouwen gekregen door de lessen.\"",
                        "reply": "\"Hartelijk dank voor deze mooie woorden! We zijn erg trots op zijn inzet en vooruitgang in de lessen.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Administratieve Vraag",
                        "quote": "\"De opzegging van mijn lidmaatschap werd niet verwerkt.\"",
                        "reply": "\"Onze excuses voor de verwarring rondom uw opzegging. We kijken de administratie direct na en nemen contact op.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Veiligheidsmelding",
                        "quote": "\"Mijn kind raakte gewond tijdens een sparringsessie.\"",
                        "isAlert": true,
                        "alertTitle": "Veiligheidsincident gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Eigenaar van de sportschool gewaarschuwd."
                    }
                ],
                "sensitiveHeadline": "Veiligheidsincidenten vereisen directe aandacht",
                "sensitiveTopics": [
                    "Blessures",
                    "Sparringsincidenten",
                    "Lidmaatschap opzeggingen",
                    "Pesten / Veiligheid"
                ],
                "faqItems": [
                    {
                        "q": "Worden blessuremeldingen geblokkeerd?",
                        "a": "Ja. Elk bericht dat melding maakt van letsel wordt direct geblokkeerd voor automatische reactie."
                    }
                ],
                "finalCtaHeadline": "Bouw Vertrouwen op bij Ouders en Leden",
                "finalCtaDescription": "Laat ReplyVera uw reviews professioneel en veilig beheren."
            },
            "es": {
                "name": "Escuelas de Artes Marciales",
                "dropdownDesc": "Respuestas adaptadas a familias con controles de seguridad.",
                "metaTitle": "Automatización de Reseñas de Google para Escuelas de Artes Marciales | ReplyVera",
                "metaDescription": "Automatiza respuestas a reseñas de Google en tu escuela de artes marciales. ReplyVera gestiona elogios y escala dudas sobre cobros y seguridad al personal.",
                "heroHeadline": "Automatización de Reseñas para Escuelas de Artes Marciales",
                "heroDescription": "ReplyVera ofrece respuestas amigables para padres y escala dudas sobre seguridad, lesiones y membresías directamente al instructor principal.",
                "mockupPositive": "Mi hijo ha ganado mucha confianza gracias a las clases.",
                "mockupNegative": "No procesaron la cancelación de mi membresía.",
                "mockupSensitive": "Mi hijo se lesionó durante una sesión de combate.",
                "benefitsHeadline": "Respuestas Amigables que Generan Confianza en los Padres",
                "benefits": [
                    {
                        "icon": "shield",
                        "title": "Seguridad Primero",
                        "text": "Las menciones sobre lesiones o seguridad se bloquean para revisión manual."
                    },
                    {
                        "icon": "heart",
                        "title": "Tono Respetuoso y Familiar",
                        "text": "Las respuestas transmiten valores de disciplina, respeto y ambiente positivo."
                    },
                    {
                        "icon": "credit-card",
                        "title": "Escalado de Membresías",
                        "text": "Las consultas sobre cobros o bajas se dirigen al equipo administrativo."
                    }
                ],
                "step2Text": "Define el tono de tu dojo, salvaguardas de lesiones y reglas para cuotas.",
                "step3Text": "Los elogios a alumnos se publican solos. Los reportes de lesiones alertan al instructor principal.",
                "reviewsHeadline": "Desde Felicitaciones de Padres hasta Consultas de Seguridad",
                "reviewsSubhead": "Mira cómo ReplyVera responde a las reseñas de tu dojo o academia.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Mi hijo ha ganado mucha confianza gracias a las clases.\"",
                        "reply": "\"¡Muchas gracias por tus amables palabras! Estamos muy orgullosos del esfuerzo y avance de tu hijo en las clases.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Consulta Administrativa",
                        "quote": "\"No procesaron la cancelación de mi membresía.\"",
                        "reply": "\"Pedimos disculpas por la confusión con tu membresía. Revisaremos de inmediato tu caso y nos comunicaremos contigo.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Alerta de Seguridad",
                        "quote": "\"Mi hijo se lesionó durante una sesión de combate.\"",
                        "isAlert": true,
                        "alertTitle": "Incidente de seguridad detectado",
                        "alertText": "Publicación automática bloqueada. Instructor principal notificado."
                    }
                ],
                "sensitiveHeadline": "Los incidentes de seguridad requieren atención inmediata",
                "sensitiveTopics": [
                    "Lesiones",
                    "Incidentes de combate",
                    "Cancelación de cuotas",
                    "Bullying / Seguridad"
                ],
                "faqItems": [
                    {
                        "q": "¿Se bloquean los reportes de lesiones?",
                        "a": "Sí. Cualquier comentario sobre lesiones o accidentes se bloquea para respuesta automática."
                    }
                ],
                "finalCtaHeadline": "Genera Confianza en Padres y Alumnos",
                "finalCtaDescription": "Permite que ReplyVera gestione tus reseñas de forma segura y profesional."
            }
        }
    },
    {
        "id": "tutoring",
        "slugs": {
            "en": "tutoring",
            "nl": "bijlescentra",
            "es": "centros-de-tutoria"
        },
        "icon": "book-open",
        "iconBgClass": "tutoring-icon",
        "theme": {
            "accent": "#2563EB",
            "motif": "circuits",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Tutoring Centers",
                "dropdownDesc": "Professional replies for parent and student reviews.",
                "metaTitle": "Google Review Automation for Tutoring Centers | ReplyVera",
                "metaDescription": "Automated Google review responses for tutoring centers and learning academies. ReplyVera handles routine reviews while routing parent concerns to directors.",
                "heroHeadline": "Professional Review Replies for Tutoring Centers",
                "heroDescription": "ReplyVera helps tutoring centers respond professionally to parents and students while routing refund and guarantee queries for staff review.",
                "mockupPositive": "Thanks to the math tutoring, my son passed his entrance exam with honors.",
                "mockupNegative": "Tutor sessions were rescheduled twice without sufficient notice.",
                "mockupSensitive": "No progress after expensive sessions, I want a full refund.",
                "benefitsHeadline": "Professional Communication for Educational Institutes",
                "benefits": [
                    {
                        "icon": "book-open",
                        "title": "Academic Excellence Tone",
                        "text": "Convey encouraging, academic, and goal-oriented support."
                    },
                    {
                        "icon": "clock",
                        "title": "Coordinator Time-Saver",
                        "text": "Automate thank-yous for positive exam results and score improvements."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Refund & Guarantee Filter",
                        "text": "Questions regarding fees, refunds, or grade guarantees route for manual review."
                    }
                ],
                "step2Text": "Select academic tone rules, score achievement highlights, and refund filters.",
                "step3Text": "Excellence reviews publish automatically. Refund queries alert your center director.",
                "reviewsHeadline": "From Exam Successes to Refund Claims",
                "reviewsSubhead": "See how ReplyVera manages tutoring center feedback.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Thanks to the math tutoring, my son passed his entrance exam with honors.\"",
                        "reply": "\"Congratulations on this fantastic achievement! We are delighted to have contributed to his success!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Schedule Complaint",
                        "quote": "\"Tutor sessions were rescheduled twice without sufficient notice.\"",
                        "reply": "\"We apologize for the scheduling conflict. We will contact you immediately to make things right.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Refund Claim Alert",
                        "quote": "\"No progress after expensive sessions, I want a full refund.\"",
                        "isAlert": true,
                        "alertTitle": "Financial / Guarantee complaint detected",
                        "alertText": "Auto-publishing blocked. Center director approval required."
                    }
                ],
                "sensitiveHeadline": "Protect Your Educational Institution Reputation",
                "sensitiveTopics": [
                    "Refund Claims",
                    "Grade Guarantees",
                    "Tutor Complaints"
                ],
                "faqItems": [
                    {
                        "q": "Can ReplyVera filter refund claims?",
                        "a": "Yes. Any review mentioning money-back claims is held for manual response."
                    }
                ],
                "finalCtaHeadline": "Highlight Educational Excellence",
                "finalCtaDescription": "Automate review replies while preserving your academic reputation."
            },
            "nl": {
                "name": "Bijlescentra",
                "dropdownDesc": "Professionele reacties voor reviews van ouders en studenten.",
                "metaTitle": "Google Review Automatisering voor Bijlescentra | ReplyVera",
                "metaDescription": "Geautomatiseerde Google-reviewreacties voor bijlescentra. ReplyVera behandelt routinematige reviews en escaleert vragen van ouders naar de leiding.",
                "heroHeadline": "Professionele Review Reacties voor Bijlescentra",
                "heroDescription": "ReplyVera helpt bijlescentra en huiswerkbegeleiders met professionele antwoorden op beoordelingen van studenten en ouders.",
                "mockupPositive": "Mijn zoon is dankzij de begeleiding geslaagd voor zijn wiskunde-examen.",
                "mockupNegative": "De afgesproken begeleidingstijden werden niet nagekomen.",
                "mockupSensitive": "Geen resultaat gezien na dure bijlessen, ik wil mijn geld terug.",
                "benefitsHeadline": "Professionele Communicatie voor Onderwijsinstituten",
                "benefits": [
                    {
                        "icon": "book-open",
                        "title": "Academische Toon",
                        "text": "Reacties stralen professionaliteit, motivatie en onderwijskwaliteit uit."
                    },
                    {
                        "icon": "clock",
                        "title": "Tijdbesparing voor Coördinatoren",
                        "text": "Automatiseer standaard bedankjes voor positieve examenresultaten."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Garantie & Restitutie Filter",
                        "text": "Klachten over kosten of tegenvallende resultaten worden gefilterd voor overleg."
                    }
                ],
                "step2Text": "Stel een motiverende academische toon in en stel geld-terug filters in.",
                "step3Text": "Examensuccesreviews gaan direct live. Restitutieclaims waarschuwen de directie.",
                "reviewsHeadline": "Van Examensucces tot Restitutievragen",
                "reviewsSubhead": "Zie hoe ReplyVera reviews voor bijlescentra afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Mijn zoon is dankzij de begeleiding geslaagd voor zijn wiskunde-examen.\"",
                        "reply": "\"Gefeliciteerd met dit fantastische resultaat! Geweldig dat we hebben kunnen bijdragen aan dit succes.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Roosterklacht",
                        "quote": "\"De afgesproken begeleidingstijden werden niet nagekomen.\"",
                        "reply": "\"Excuus voor het misverstand in de planning. We nemen contact met u op om dit recht te zetten.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Restitutievraag",
                        "quote": "\"Geen resultaat gezien na dure bijlessen, ik wil mijn geld terug.\"",
                        "isAlert": true,
                        "alertTitle": "Financiële/Resultaatklacht gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Handmatige controle vereist."
                    }
                ],
                "sensitiveHeadline": "Bescherm de Reputatie van uw Instituut",
                "sensitiveTopics": [
                    "Restitutie / Geld-terug claims",
                    "Examengaranties",
                    "Klachten over docenten"
                ],
                "faqItems": [
                    {
                        "q": "Kan ReplyVera restitutieclaims filteren?",
                        "a": "Ja. Vragen over geld terug of garanties worden altijd tegengehouden voor handmatige reactie."
                    }
                ],
                "finalCtaHeadline": "Laat uw Bijlescentrum Transparant Stralen",
                "finalCtaDescription": "Automatiseer reviewreacties en behoud de controle over uw professionele imago."
            },
            "es": {
                "name": "Centros de Tutoría",
                "dropdownDesc": "Respuestas profesionales para padres y estudiantes.",
                "metaTitle": "Automatización de Reseñas de Google para Centros de Tutoría | ReplyVera",
                "metaDescription": "Respuestas automáticas a reseñas de Google para centros de tutoría. ReplyVera gestiona reseñas rutinarias y escala comentarios de padres a los directores.",
                "heroHeadline": "Respuestas Profesionales para Centros de Tutoría",
                "heroDescription": "ReplyVera ayuda a centros de tutoría y refuerzo escolar a ofrecer respuestas de calidad a estudiantes y apoderados.",
                "mockupPositive": "Gracias a las clases mi hijo aprobó su examen de matemáticas.",
                "mockupNegative": "Los horarios acordados no se cumplieron adecuadamente.",
                "mockupSensitive": "No vi resultados tras clases costosas, exijo la devolución.",
                "benefitsHeadline": "Comunicación Profesional para Instituciones Educativas",
                "benefits": [
                    {
                        "icon": "book-open",
                        "title": "Tono Académico y Motivador",
                        "text": "Proyecta excelencia, profesionalismo y compromiso pedagógico."
                    },
                    {
                        "icon": "clock",
                        "title": "Ahorro de Tiempo",
                        "text": "Automatiza felicitaciones por logros académicos y aprobaciones de exámenes."
                    },
                    {
                        "icon": "shield-alert",
                        "title": "Filtro de Garantías y Reembolsos",
                        "text": "Las dudas sobre costos o resultados se derivan a la administración."
                    }
                ],
                "step2Text": "Define las reglas de tono académico y activa filtros de garantías o reembolsos.",
                "step3Text": "Los logros estudiantiles se publican solos. Los reclamos de dinero alertan a la dirección.",
                "reviewsHeadline": "Desde Éxito Escolar hasta Reclamos Financieros",
                "reviewsSubhead": "Mira cómo ReplyVera maneja las reseñas de centros de estudios.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Gracias a las clases mi hijo aprobó su examen de matemáticas.\"",
                        "reply": "\"¡Felicitaciones por este gran logro! Nos llena de orgullo haber sido parte de su éxito académico.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Queja de Horario",
                        "quote": "\"Los horarios acordados no se cumplieron adecuadamente.\"",
                        "reply": "\"Pedimos disculpas por los inconvenientes en la agenda. Nos comunicaremos contigo para coordinar correctamente.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Solicitud de Reembolso",
                        "quote": "\"No vi resultados tras clases costosas, exijo la devolución.\"",
                        "isAlert": true,
                        "alertTitle": "Reclamo financiero / resultado detectado",
                        "alertText": "Publicación automática bloqueada. Requiere revisión manual."
                    }
                ],
                "sensitiveHeadline": "Protege la Reputación de tu Centro de Estudios",
                "sensitiveTopics": [
                    "Solicitudes de reembolso",
                    "Garantías de aprobación",
                    "Quejas de tutores"
                ],
                "faqItems": [
                    {
                        "q": "¿ReplyVera filtra solicitudes de reembolso?",
                        "a": "Sí. Cualquier mención a devoluciones de dinero se bloquea para respuesta manual."
                    }
                ],
                "finalCtaHeadline": "Destaca la Excelencia de tu Centro de Tutoría",
                "finalCtaDescription": "Automatiza respuestas manteniendo el control total de tu imagen académica."
            }
        }
    },
    {
        "id": "laundromats",
        "slugs": {
            "en": "laundromats",
            "nl": "wasserettes",
            "es": "lavanderias"
        },
        "icon": "wind",
        "iconBgClass": "laundromat-icon",
        "theme": {
            "accent": "#0D9488",
            "motif": "dots",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Laundromats",
                "dropdownDesc": "Monitor cleanliness, equipment, and refunds.",
                "metaTitle": "Google Review Automation for Laundromats | ReplyVera",
                "metaDescription": "Automated Google review response software for laundromats. ReplyVera answers routine feedback while routing machine breakdown and refund requests to owners.",
                "heroHeadline": "Automatic Google Review Replies for Laundromats",
                "heroDescription": "ReplyVera answers routine laundromat reviews while routing complaints about broken washers, coin slots, or cleanliness to your manager.",
                "mockupPositive": "Clean facility, fast dryers, and free Wi-Fi while waiting.",
                "mockupNegative": "Dryer #4 did not heat up at all and wasted my coins.",
                "mockupSensitive": "Washing machine ruined my white clothes and coin machine ate $20.",
                "benefitsHeadline": "Efficient Review Management for Your Laundromat",
                "benefits": [
                    {
                        "icon": "wind",
                        "title": "Automated Thank-Yous",
                        "text": "Instantly thank customers for praising clean machines and fast service."
                    },
                    {
                        "icon": "wrench",
                        "title": "Machine Outage Reports",
                        "text": "Specific mentions of broken washers or dryers alert maintenance staff."
                    },
                    {
                        "icon": "dollar-sign",
                        "title": "Refund & Coin Machine Filter",
                        "text": "Complaints about swallowed coins or refund requests route to owner."
                    }
                ],
                "step2Text": "Set clean facility tone, machine outage alerts, and coin refund escalation limits.",
                "step3Text": "Positive facility reviews publish automatically. Broken machine alerts notify maintenance.",
                "reviewsHeadline": "From Clean Clothes to Broken Equipment",
                "reviewsSubhead": "See how ReplyVera handles laundromat reviews.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Clean facility, fast dryers, and free Wi-Fi while waiting.\"",
                        "reply": "\"Thank you for your great review! We are glad you enjoyed our clean machines and amenities!\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Broken Machine Complaint",
                        "quote": "\"Dryer #4 did not heat up at all and wasted my coins.\"",
                        "reply": "\"We apologize for the trouble. We have notified our technician to service Dryer #4 immediately.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Garment Damage / Refund Alert",
                        "quote": "\"Washing machine ruined my white clothes and coin machine ate $20.\"",
                        "isAlert": true,
                        "alertTitle": "Damage / Refund claim detected",
                        "alertText": "Auto-publishing blocked. Owner notified immediately."
                    }
                ],
                "sensitiveHeadline": "Machine Outages & Damage Claims Resolved Fast",
                "sensitiveTopics": [
                    "Damaged Garments",
                    "Swallowed Coins / Refunds",
                    "Facility Cleanliness",
                    "Vandalism"
                ],
                "faqItems": [
                    {
                        "q": "Can ReplyVera report broken machine numbers?",
                        "a": "Yes. If a review mentions a specific machine number, it is highlighted in your alert."
                    }
                ],
                "finalCtaHeadline": "Keep Your Laundromat Reputation Spotless",
                "finalCtaDescription": "Let ReplyVera streamline your reviews while you maintain top-notch facilities."
            },
            "nl": {
                "name": "Wasserettes",
                "dropdownDesc": "Moniteer hygiëne, apparatuur en geld-terug verzoeken.",
                "metaTitle": "Google Review Automatisering voor Wasserettes | ReplyVera",
                "metaDescription": "Geautomatiseerde Google-reviewreacties voor wasserettes. ReplyVera beantwoordt routinematige feedback en escaleert machine- en terugbetalingsklachten.",
                "heroHeadline": "Automatische Google Review Reacties voor Wasserettes",
                "heroDescription": "ReplyVera beantwoordt routinereviews voor wasserettes en filtreert klachten over defecte wasmachines, muntinworp of hygiëne.",
                "mockupPositive": "Schone zaak, snelle drogers en gratis wifi.",
                "mockupNegative": "Droger nummer 4 werd niet echt warm en kostte me munten.",
                "mockupSensitive": "Wasmachine heeft mijn witte kleding beschadigd en automaat slikte geld in.",
                "benefitsHeadline": "Efficiënt Reviewbeheer voor uw Wasserette",
                "benefits": [
                    {
                        "icon": "wind",
                        "title": "Automatische Bedankjes",
                        "text": "Bedank klanten automatisch voor positieve reviews over schone machines en snelle service."
                    },
                    {
                        "icon": "wrench",
                        "title": "Machine-defect Signalering",
                        "text": "Meldingen over kapotte drogers of wasmachines worden direct doorgestuurd naar de eigenaar."
                    },
                    {
                        "icon": "dollar-sign",
                        "title": "Restitutie & Facturering Filter",
                        "text": "Klachten over ingeslikt geld of wisselautomaten worden gefilterd."
                    }
                ],
                "step2Text": "Stel de gewenste toon in, activeer machinenummer-signalering en stel teruggavefilters in.",
                "step3Text": "Reviews over schone machines gaan direct live. Defectmeldingen gaan naar de monteur.",
                "reviewsHeadline": "Van Schone Was tot Defecte Apparatuur",
                "reviewsSubhead": "Zie hoe ReplyVera beoordelingen voor wasserettes afhandelt.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Schone zaak, snelle drogers en gratis wifi.\"",
                        "reply": "\"Bedankt voor uw mooie beoordeling! Fijn dat u tevreden bent over de hygiëne en onze voorzieningen.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Defecte Droger",
                        "quote": "\"Droger nummer 4 werd niet echt warm en kostte me munten.\"",
                        "reply": "\"Excuus voor het ongemak. We laten ons onderhoudsteam meteen naar droger 4 kijken.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Kledingbeschadiging / Restitutie",
                        "quote": "\"Wasmachine heeft mijn witte kleding beschadigd en automaat slikte geld in.\"",
                        "isAlert": true,
                        "alertTitle": "Schade / Restitutie gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Eigenaar geïnformeerd."
                    }
                ],
                "sensitiveHeadline": "Machineproblemen Snel Opgelost",
                "sensitiveTopics": [
                    "Beschadigde kleding",
                    "Ingeslikt geld / Restitutie",
                    "Vervuiling / Hygiëne",
                    "Vandalisme"
                ],
                "faqItems": [
                    {
                        "q": "Kan ReplyVera meldingen over defecte machines doormelden?",
                        "a": "Ja. Als een review een specifiek machinenummer noemt, wordt dit doorgestuurd voor onderhoud."
                    }
                ],
                "finalCtaHeadline": "Houd uw Wasserette Reputatie Schoon",
                "finalCtaDescription": "Laat ReplyVera uw online reviews stroomlijnen terwijl u zorgt voor perfecte machines."
            },
            "es": {
                "name": "Lavanderías",
                "dropdownDesc": "Monitorea limpieza, equipos y reembolsos.",
                "metaTitle": "Automatización de Reseñas de Google para Lavanderías | ReplyVera",
                "metaDescription": "Software de respuestas a reseñas de Google para lavanderías. ReplyVera responde comentarios rutinarios y escala reclamos de máquinas y reembolsos al dueño.",
                "heroHeadline": "Respuestas Automáticas en Google para Lavanderías",
                "heroDescription": "ReplyVera responde reseñas rutinarias de lavanderías y filtra quejas sobre lavadoras averiadas, monedas o limpieza.",
                "mockupPositive": "Local muy limpio, secadoras rápidas y buen wifi.",
                "mockupNegative": "La secadora número 4 no calentaba bien y perdí monedas.",
                "mockupSensitive": "La lavadora dañó mi ropa blanca y la máquina se tragó mi dinero.",
                "benefitsHeadline": "Gestión Eficiente de Reseñas para tu Lavandería",
                "benefits": [
                    {
                        "icon": "wind",
                        "title": "Agradecimientos Automáticos",
                        "text": "Agradece automáticamente reseñas positivas sobre limpieza y máquinas rápidas."
                    },
                    {
                        "icon": "wrench",
                        "title": "Reporte de Máquinas Averiadas",
                        "text": "Las quejas sobre lavadoras o secadoras dañadas se notifican al propietario."
                    },
                    {
                        "icon": "dollar-sign",
                        "title": "Filtro de Devoluciones y Cobros",
                        "text": "Los reclamos por monedas atrapadas o fichas se derivan para revisión manual."
                    }
                ],
                "step2Text": "Configura las reglas para tu local, alertas de máquinas averiadas y reclamos de monedas.",
                "step3Text": "Las reseñas de clientes contentos se publican solas. Las averías de máquinas notifican a mantenimiento.",
                "reviewsHeadline": "Desde Ropa Limpia hasta Equipos Averiados",
                "reviewsSubhead": "Mira cómo ReplyVera atiende las opiniones de tu lavandería.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Local muy limpio, secadoras rápidas y buen wifi.\"",
                        "reply": "\"¡Muchas gracias por tu reseña! Nos alegra que disfrutes de la limpieza y comodidades de nuestro local.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Secadora Defectuosa",
                        "quote": "\"La secadora número 4 no calentaba bien y perdí monedas.\"",
                        "reply": "\"Lamentamos los inconvenientes. Enviaremos a nuestro equipo técnico a revisar la secadora 4 de inmediato.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Daño de Ropa / Devolución",
                        "quote": "\"La lavadora dañó mi ropa blanca y la máquina se tragó mi dinero.\"",
                        "isAlert": true,
                        "alertTitle": "Daño / Reembolso detectado",
                        "alertText": "Publicación automática bloqueada. Propietario notificado."
                    }
                ],
                "sensitiveHeadline": "Resuelve Incidencias de Equipos con Rapidez",
                "sensitiveTopics": [
                    "Ropa dañada",
                    "Monedas atrapadas / Reembolsos",
                    "Suciedad / Falta de higiene",
                    "Vandalismo"
                ],
                "faqItems": [
                    {
                        "q": "¿Puede ReplyVera reportar el número de máquina averiada?",
                        "a": "Sí. Si una reseña menciona un número de máquina, se incluye en la alerta enviada al gerente."
                    }
                ],
                "finalCtaHeadline": "Mantén Impecable la Reputación de tu Lavandería",
                "finalCtaDescription": "Deja que ReplyVera automatice tus reseñas mientras te enfocas en mantener tus equipos al 100%."
            }
        }
    },
    {
        "id": "agencies",
        "slugs": {
            "en": "agencies",
            "nl": "marketingbureaus",
            "es": "agencias-de-marketing"
        },
        "icon": "briefcase",
        "iconBgClass": "agency-icon",
        "theme": {
            "accent": "#4F46E5",
            "motif": "dots",
            "divider": "glow"
        },
        "translations": {
            "en": {
                "name": "Marketing Agencies",
                "dropdownDesc": "Manage Google review replies for every client from one dashboard.",
                "metaTitle": "Google Review Automation for Marketing Agencies | ReplyVera",
                "metaDescription": "Manage Google review responses across all client locations. ReplyVera automates personalized replies with custom brand voice and approval controls per client.",
                "heroHeadline": "Scalable Review Automation for Marketing Agencies",
                "heroDescription": "Manage Google review responses across all client accounts from one dashboard. Define client-specific rules and deliver high-value reporting.",
                "mockupPositive": "Great client support and lightning fast responses.",
                "mockupNegative": "Our appointment was canceled at the last minute.",
                "mockupSensitive": "Unprofessional interaction with upper management.",
                "benefitsHeadline": "Scalable Review Management for Client Accounts",
                "benefits": [
                    {
                        "icon": "briefcase",
                        "title": "Central Dashboard",
                        "text": "Oversee all client locations and accounts from a single unified workspace."
                    },
                    {
                        "icon": "sliders",
                        "title": "Client-Specific Rules",
                        "text": "Customize brand voice, keywords, and approval flows independently per client."
                    },
                    {
                        "icon": "trending-up",
                        "title": "New Recurring Revenue",
                        "text": "Offer review management as a high-margin add-on service."
                    }
                ],
                "step2Text": "Set individual client brand voices, notification emails, and approval permissions.",
                "step3Text": "Client reviews publish according to their rules. Escalations alert client managers.",
                "reviewsHeadline": "Automated Client Management in Practice",
                "reviewsSubhead": "See how ReplyVera helps agencies scale review responses across multiple accounts.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positive Review",
                        "quote": "\"Great client support and lightning fast responses.\"",
                        "reply": "\"Thank you for your fantastic review! We are glad we could help you quickly.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Service Inquiry",
                        "quote": "\"Our appointment was canceled at the last minute.\"",
                        "reply": "\"We sincerely apologize for the scheduling conflict. We will reach out to reschedule immediately.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Sensitive Review",
                        "quote": "\"Unprofessional interaction with upper management.\"",
                        "isAlert": true,
                        "alertTitle": "Sensitive review detected",
                        "alertText": "Auto-publishing blocked. Agency manager notified."
                    }
                ],
                "sensitiveHeadline": "Agency-Level Brand Safeguards",
                "sensitiveTopics": [
                    "Legal Threats",
                    "Severe Complaints",
                    "Reputational Risk",
                    "Staff Conflicts"
                ],
                "faqItems": [
                    {
                        "q": "How many client locations can an agency manage?",
                        "a": "The Agency plan supports unlimited client locations with scalable tiers."
                    },
                    {
                        "q": "Can clients approve their own reviews?",
                        "a": "Yes. You can assign client-level access for manual review approvals."
                    }
                ],
                "finalCtaHeadline": "Scale Your Agency with Review Automation",
                "finalCtaDescription": "Start an agency trial today and streamline reputation management across all client locations."
            },
            "nl": {
                "name": "Marketingbureaus",
                "dropdownDesc": "Beheer Google-reviewreacties voor al uw klanten vanuit één dashboard.",
                "metaTitle": "Google Review Automatisering voor Marketingbureaus | ReplyVera",
                "metaDescription": "Beheer Google-reviewreacties voor alle klantlocaties. ReplyVera automatiseert gepersonaliseerde reacties met klantspecifieke merktoon en goedkeuring.",
                "heroHeadline": "Review Automatisering Schaalbaar voor Marketingbureaus",
                "heroDescription": "Beheer Google-reviewreacties voor al uw klanten vanuit één dashboard. Bepaal regels per klant en lever extra waarde.",
                "mockupPositive": "Geweldige klantenservice en snel geholpen.",
                "mockupNegative": "Mijn afspraak werd op het laatste moment geannuleerd.",
                "mockupSensitive": "Slechte ervaring met de leidinggevende.",
                "benefitsHeadline": "Schaalbare reviewdienstverlening voor uw klanten",
                "benefits": [
                    {
                        "icon": "briefcase",
                        "title": "Centraal Dashboard",
                        "text": "Beheer alle klantlocaties en accounts vanuit één overzichtelijke omgeving."
                    },
                    {
                        "icon": "sliders",
                        "title": "Klantspecifieke Regels",
                        "text": "Stel per klant de gewenste merktoon en escalatiedrempels in."
                    },
                    {
                        "icon": "trending-up",
                        "title": "Extra Maandelijkse Omzet",
                        "text": "Bied reviewbeheer aan als waardevolle add-on dienst voor uw klanten."
                    }
                ],
                "step2Text": "Stel per klant de eigen merkstem, e-mailnotificaties en goedkeuringsrechten in.",
                "step3Text": "Klantreviews worden volgens hun specifieke regels gepubliceerd. Escalaties gaan naar het bureauteam.",
                "reviewsHeadline": "Geautomatiseerd Klantbeheer in de Praktijk",
                "reviewsSubhead": "Zie hoe ReplyVera uw bureau helpt bij het beheren van diverse klanteditorials.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Positieve Beoordeling",
                        "quote": "\"Geweldige klantenservice en snel geholpen.\"",
                        "reply": "\"Bedankt voor uw fantastische beoordeling! Fijn dat we u snel hebben kunnen helpen.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Serviceklacht",
                        "quote": "\"Mijn afspraak werd op het laatste moment geannuleerd.\"",
                        "reply": "\"Onze welgemeende excuses voor het ongemak. We nemen direct contact met u op om een nieuwe afspraak in te plannen.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Gevoelig Onderwerp",
                        "quote": "\"Slechte ervaring met de leidinggevende.\"",
                        "isAlert": true,
                        "alertTitle": "Gevoelige review gedetecteerd",
                        "alertText": "Automatisch publiceren geblokkeerd. Klant / bureaubeheerder gewaarschuwd."
                    }
                ],
                "sensitiveHeadline": "Klantbescherming op Bureau-niveau",
                "sensitiveTopics": [
                    "Juridische dreigementen",
                    "Ernstige klachten",
                    "Merkschade",
                    "Personeelconflicten"
                ],
                "faqItems": [
                    {
                        "q": "Hoeveel klanten kan een bureau beheren?",
                        "a": "Het Agency-abonnement ondersteunt onbeperkte klantlocaties met flexibele tarieven."
                    },
                    {
                        "q": "Kunnen klanten hun eigen reviews inzien?",
                        "a": "Ja, u kunt rollen en toegang per klant instellen."
                    }
                ],
                "finalCtaHeadline": "Schaal uw Bureau met Review Automatisering",
                "finalCtaDescription": "Start vandaag nog een proefperiode voor uw bureau en ontdek het gemak van gecentraliseerd reviewbeheer."
            },
            "es": {
                "name": "Agencias de Marketing",
                "dropdownDesc": "Gestiona respuestas de reseñas de Google para todos tus clientes.",
                "metaTitle": "Automatización de Reseñas de Google para Agencias de Marketing | ReplyVera",
                "metaDescription": "Gestiona respuestas a reseñas de Google para todos tus clientes. ReplyVera automatiza respuestas personalizadas con reglas de aprobación por cliente.",
                "heroHeadline": "Automatización de Reseñas Escalable para Agencias",
                "heroDescription": "Administra las respuestas en Google para todos tus clientes desde un único panel. Configura reglas por cliente y añade valor a tu servicio.",
                "mockupPositive": "Excelente servicio al cliente y atención muy rápida.",
                "mockupNegative": "Mi cita fue cancelada a último momento.",
                "mockupSensitive": "Mala experiencia con la gerencia.",
                "benefitsHeadline": "Servicio de Reseñas Escalable para tus Clientes",
                "benefits": [
                    {
                        "icon": "briefcase",
                        "title": "Panel Centralizado",
                        "text": "Administra todas las ubicaciones y cuentas de tus clientes desde una sola pantalla."
                    },
                    {
                        "icon": "sliders",
                        "title": "Reglas por Cliente",
                        "text": "Establece el tono de marca y los umbrales de escalado para cada cliente."
                    },
                    {
                        "icon": "trending-up",
                        "title": "Ingresos Recurrentes",
                        "text": "Ofrece la gestión de reseñas como un servicio adicional de alto valor."
                    }
                ],
                "step2Text": "Define la voz de marca, notificaciones y permisos de aprobación para cada cliente.",
                "step3Text": "Las reseñas de los clientes se publican según sus reglas. Las alertas llegan al equipo de tu agencia.",
                "reviewsHeadline": "Gestión de Clientes Automatizada en la Práctica",
                "reviewsSubhead": "Descubre cómo ReplyVera ayuda a tu agencia a gestionar diversas cuentas.",
                "reviewExamples": [
                    {
                        "rating": 5,
                        "type": "Reseña Positiva",
                        "quote": "\"Excelente servicio al cliente y atención muy rápida.\"",
                        "reply": "\"¡Gracias por tu fantástica calificación! Nos alegra haber podido ayudarte rápidamente.\"",
                        "needsApproval": false
                    },
                    {
                        "rating": 2,
                        "type": "Queja de Servicio",
                        "quote": "\"Mi cita fue cancelada a último momento.\"",
                        "reply": "\"Lamentamos sinceramente los inconvenientes. Nos pondremos en contacto contigo para agendar una nueva cita.\"",
                        "needsApproval": true
                    },
                    {
                        "rating": 1,
                        "type": "Tema Sensible",
                        "quote": "\"Mala experiencia con la gerencia.\"",
                        "isAlert": true,
                        "alertTitle": "Reseña sensible detectada",
                        "alertText": "Publicación automática bloqueada. Alerta enviada a la agencia."
                    }
                ],
                "sensitiveHeadline": "Protección de Marca a Nivel de Agencia",
                "sensitiveTopics": [
                    "Amenazas legales",
                    "Quejas graves",
                    "Daño reputacional",
                    "Conflictos de personal"
                ],
                "faqItems": [
                    {
                        "q": "¿Cuántos clientes puede gestionar una agencia?",
                        "a": "El plan de Agencia admite ubicaciones ilimitadas de clientes con tarifas adaptables."
                    },
                    {
                        "q": "¿Pueden los clientes revisar sus propias reseñas?",
                        "a": "Sí. Puedes otorgar accesos individuales de aprobación por cliente."
                    }
                ],
                "finalCtaHeadline": "Haz Crecer tu Agencia con Automatización de Reseñas",
                "finalCtaDescription": "Comienza hoy una prueba para tu agencia y simplifica la gestión de reseñas."
            }
        }
    }
];

// Helper Functions
function getAllIndustries() {
    return industriesData;
}

function getIndustryById(id) {
    return industriesData.find(ind => ind.id === id);
}

function getIndustryBySlug(slug, locale) {
    const loc = locale || 'en';
    // Match exact slug for target locale first, then match any slug across any locale
    let ind = industriesData.find(item => item.slugs[loc] === slug);
    if (!ind) {
        ind = industriesData.find(item => Object.values(item.slugs).includes(slug));
    }
    return ind;
}

function getLocalizedSlug(id, locale) {
    const ind = getIndustryById(id);
    if (!ind) return id;
    const loc = locale || 'en';
    return ind.slugs[loc] || ind.slugs.en;
}

function getLocalizedPath(id, locale) {
    const slug = getLocalizedSlug(id, locale);
    const loc = locale || 'en';
    if (loc === 'en') {
        return `/industries/${slug}/`;
    }
    return `/${loc}/industries/${slug}/`;
}

function getNavItems(locale) {
    const loc = locale || 'en';
    return industriesData.map(ind => {
        const trans = ind.translations[loc] || ind.translations.en;
        return {
            id: ind.id,
            slug: ind.slugs[loc],
            path: getLocalizedPath(ind.id, loc),
            name: trans.name,
            dropdownDesc: trans.dropdownDesc,
            icon: ind.icon,
            iconBgClass: ind.iconBgClass
        };
    });
}

function renderHeaderDropdownHTML(locale) {
    const navItems = getNavItems(locale);
    return navItems.map(item => `
        <a href="${item.path}" class="dropdown-item">
            <div class="dropdown-icon-wrapper ${item.iconBgClass}"><i data-lucide="${item.icon}" style="width:16px;height:16px;"></i></div>
            <div class="dropdown-text">
                <div class="dropdown-title">${item.name}</div>
                <div class="dropdown-desc">${item.dropdownDesc}</div>
            </div>
        </a>`).join('');
}

function renderMobileAccordionHTML(locale) {
    const navItems = getNavItems(locale);
    return navItems.map(item => `
        <a href="${item.path}" class="mobile-industry-item">
            <div class="mobile-ind-icon ${item.iconBgClass}"><i data-lucide="${item.icon}" style="width:14px;height:14px;"></i></div>
            <div>
                <div class="mobile-ind-name">${item.name}</div>
                <div class="mobile-ind-desc">${item.dropdownDesc}</div>
            </div>
        </a>`).join('');
}

function renderHomepageIndustryGridHTML(locale) {
    const loc = locale || 'en';
    const homepageIds = ['hotels', 'restaurants', 'auto-repair', 'dentists', 'salons-spas', 'contractors', 'car-washes', 'agencies'];
    return homepageIds.map(id => {
        const ind = getIndustryById(id);
        if (!ind) return '';
        const trans = ind.translations[loc] || ind.translations.en;
        const path = getLocalizedPath(id, loc);
        return `
                <a href="${path}" class="industry-card">
                    <div class="industry-card-icon ${ind.iconBgClass}"><i data-lucide="${ind.icon}" style="width:16px;height:16px;"></i></div>
                    <div class="industry-card-body">
                        <h3 class="industry-card-name">${trans.name}</h3>
                        <div class="dropdown-desc">${trans.dropdownDesc}</div>
                    </div>
                    <i data-lucide="arrow-right" class="industry-card-arrow" style="width:15px;height:15px;"></i>
                </a>`;
    }).join('\n');
}

module.exports = {
    industriesData,
    getAllIndustries,
    getIndustryById,
    getIndustryBySlug,
    getLocalizedSlug,
    getLocalizedPath,
    getNavItems,
    renderHeaderDropdownHTML,
    renderMobileAccordionHTML,
    renderHomepageIndustryGridHTML
};
