/**
 * ReplyVera Centralized Master Industry Registry
 * Single Source of Truth for all Industry verticals across English (en), Dutch (nl), and Spanish (es).
 */

const industriesData = [
    {
        id: 'dentists',
        slugs: { en: 'dentists', nl: 'tandartsen', es: 'dentistas' },
        icon: 'activity',
        iconBgClass: 'dentist-icon',
        theme: { accent: '#0EA5E9', motif: 'pulse', divider: 'glow' },
        translations: {
            en: {
                name: 'Dentists & Clinics',
                dropdownDesc: 'Privacy-conscious replies for patient reviews.',
                metaTitle: 'Google Review Automation for Dentists & Clinics | ReplyVera',
                metaDescription: 'Automate Google review responses for your dental practice. ReplyVera drafts personalized replies while escalating clinical and billing feedback to your team.',
                heroHeadline: 'Professional Google Review Replies for Dental Practices',
                heroDescription: 'ReplyVera creates privacy-conscious review responses while keeping clinical, billing, and sensitive patient feedback under staff approval.',
                mockupPositive: 'Jessica made me feel completely comfortable during my procedure.',
                mockupNegative: 'I received a bill that was much higher than the initial estimate.',
                mockupSensitive: 'I had severe pain after my root canal and no one returned my call.',
                benefitsHeadline: 'Professional Replies That Protect Your Practice',
                benefits: [
                    { icon: 'clock', title: 'Save Front-Desk Hours', text: 'Routine 5-star reviews are handled automatically without taking time from your reception team.' },
                    { icon: 'lock', title: 'Protect Patient Privacy', text: 'Responses strictly avoid confirming patient identity or treatment details.' },
                    { icon: 'shield-alert', title: 'Escalate Clinical Inquiries', text: 'Reviews mentioning pain, complications, or billing require manual approval.' }
                ],
                step2Text: 'Set tone preferences, privacy safeguards, and notify team members for clinical alerts.',
                step3Text: 'Safe reviews publish automatically. Clinical or billing complaints alert your practice manager.',
                reviewsHeadline: 'Professional Responses for Every Patient Experience',
                reviewsSubhead: 'See how ReplyVera handles dental practice reviews with care and discretion.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Jessica made me feel completely comfortable during my procedure."', reply: '"Thank you so much for your kind words! We are glad our team provided a comfortable experience for you."', needsApproval: false },
                    { rating: 2, type: 'Billing Inquiry', quote: '"I received a bill that was much higher than the initial estimate."', reply: '"Thank you for bringing this to our attention. We will reach out to you directly to review your account details."', needsApproval: true },
                    { rating: 1, type: 'Clinical Alert', quote: '"I had severe pain after my root canal and no one returned my call."', isAlert: true, alertTitle: 'Clinical complaint detected', alertText: 'Auto-publishing blocked. Practice manager notified immediately.' }
                ],
                sensitiveHeadline: 'Medical & Clinical Inquiries Require Staff Supervision',
                sensitiveTopics: ['Pain / Complications', 'Treatment Results', 'Billing & Insurance', 'Prescriptions', 'Confidential Info'],
                faqItems: [
                    { q: 'How does ReplyVera handle patient privacy?', a: 'Responses are drafted without confirming patient status or medical details.' },
                    { q: 'Are clinical complaints blocked from auto-publishing?', a: 'Yes. Any review detailing medical issues or pain is routed to your manager.' }
                ],
                finalCtaHeadline: 'Protect Your Dental Practice Reputation',
                finalCtaDescription: 'Provide patients with professional replies and manage sensitive feedback effectively.'
            },
            nl: {
                name: 'Tandartsen & Klinieken',
                dropdownDesc: 'Privacybewuste reacties op beoordelingen van patiënten.',
                metaTitle: 'Google Review Automatisering voor Tandartspraktijken | ReplyVera',
                metaDescription: 'Automatiseer Google-reviewreacties voor je tandartspraktijk. ReplyVera stelt reacties op en escaleert klinische en gevoelige feedback naar je team.',
                heroHeadline: 'Professionele Google Review Reacties voor Tandartspraktijken',
                heroDescription: 'ReplyVera creëert privacybewuste reviewreacties en houdt klinische, financiële en gevoelige patiëntvragen onder controle van uw personeel.',
                mockupPositive: 'Jessica zorgde ervoor dat ik me op mijn gemak voelde.',
                mockupNegative: 'Ik ontving een rekening die hoger was dan verwacht.',
                mockupSensitive: 'Ik had ernstige pijn na de behandeling en niemand belde mij terug.',
                benefitsHeadline: 'Professionele Reacties die uw Praktijk Beschermen',
                benefits: [
                    { icon: 'clock', title: 'Bespaar Tijd bij de Receptie', text: 'Routinematige positieve beoordelingen worden consistent afgehandeld zonder dat de receptie elke reactie handmatig hoeft te typen.' },
                    { icon: 'lock', title: 'Bescherm Patiëntprivacy', text: 'Reacties vermijden het bevestigen van patiëntstatus of medische gegevens conform privacyrichtlijnen.' },
                    { icon: 'shield-alert', title: 'Escaleer Klinische Zorgen', text: 'Klachten over pijn, behandeling of facturering vereisen goedkeuring vooraf.' }
                ],
                step2Text: 'Stel uw voorkeurstoon in en stel escalatieregels in voor medische en financiële vragen.',
                step3Text: 'Veilige reviews worden automatisch gepubliceerd. Klinische klachten waarschuwen direct uw praktijkmanager.',
                reviewsHeadline: 'Professionele Reacties voor Elke Patiëntervaring',
                reviewsSubhead: 'Zie hoe ReplyVera tandheelkundige reviews discreet afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Jessica zorgde ervoor dat ik me op mijn gemak voelde."', reply: '"Hartelijk dank voor uw vriendelijke woorden! Fijn om te horen dat ons team u een comfortabele ervaring heeft geboden."', needsApproval: false },
                    { rating: 2, type: 'Factureringsvraag', quote: '"Ik ontving een rekening die hoger was dan verwacht."', reply: '"Bedankt dat u dit onder onze aandacht brengt. We nemen graag contact met u op om de facturatiedetails te bespreken."', needsApproval: true },
                    { rating: 1, type: 'Klinische Zorg', quote: '"Ik had ernstige pijn na de behandeling en niemand belde mij terug."', isAlert: true, alertTitle: 'Klinische klacht gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Praktijkmanager direct geïnformeerd.' }
                ],
                sensitiveHeadline: 'Medische en klinische klachten vereisen menselijke controle',
                sensitiveTopics: ['Pijn / Complicaties', 'Behandelresultaten', 'Facturering & Verzekering', 'Medicatie', 'Privacygevoelige informatie'],
                faqItems: [
                    { q: 'Houdt ReplyVera rekening met privacy in reacties?', a: 'Ja. Reacties worden zo opgesteld dat patiëntidentiteit en medische details nooit publiekelijk worden bevestigd.' },
                    { q: 'Worden pijn- en behandelklachten geblokkeerd?', a: 'Ja. Reviews met klinische klachten worden direct doorgestuurd naar uw praktijkmanager.' }
                ],
                finalCtaHeadline: 'Bescherm de Reputatie van uw Tandartspraktijk',
                finalCtaDescription: 'Geef patiënten professionele antwoorden en beheer gevoelige feedback effectief.'
            },
            es: {
                name: 'Dentistas y Clínicas',
                dropdownDesc: 'Respuestas respetuosas de la privacidad para pacientes.',
                metaTitle: 'Automatización de Reseñas de Google para Odontólogos | ReplyVera',
                metaDescription: 'Automatiza las respuestas a reseñas de Google en tu clínica dental. ReplyVera redacta respuestas personalizadas y deriva comentarios médicos a tu equipo.',
                heroHeadline: 'Respuestas Profesionales en Google para Clínicas Dentales',
                heroDescription: 'ReplyVera crea respuestas que respetan la privacidad del paciente y mantiene las consultas clínicas, financieras y sensibles bajo revisión de tu equipo.',
                mockupPositive: 'Jessica me hizo sentir muy cómodo durante todo el tratamiento.',
                mockupNegative: 'Recibí una factura más alta de lo esperado.',
                mockupSensitive: 'Tuve un dolor severo después del tratamiento y nadie me devolvió la llamada.',
                benefitsHeadline: 'Respuestas Profesionales que Protegen tu Clínica',
                benefits: [
                    { icon: 'clock', title: 'Ahorra Tiempo en Recepción', text: 'Las reseñas positivas se gestionan de forma consistente sin requerir tiempo del personal de recepción.' },
                    { icon: 'lock', title: 'Protege la Privacidad del Paciente', text: 'Las respuestas evitan confirmar el estado de salud o detalles médicos del paciente.' },
                    { icon: 'shield-alert', title: 'Escala Consultas Clínicas', text: 'Las quejas de dolor, tratamientos o facturación requieren aprobación previa.' }
                ],
                step2Text: 'Define el tono deseado y activa salvaguardas de privacidad para tu equipo.',
                step3Text: 'Las reseñas seguras se publican automáticamente. Los reclamos médicos notifican al gerente de tu clínica.',
                reviewsHeadline: 'Respuestas Profesionales para Cada Experiencia de Paciente',
                reviewsSubhead: 'Mira cómo ReplyVera responde de forma discreta a las reseñas odontológicas.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Jessica me hizo sentir muy cómodo durante todo el tratamiento."', reply: '"¡Muchas gracias por tus amables palabras! Nos alegra saber que nuestro equipo te brindó una experiencia cómoda."', needsApproval: false },
                    { rating: 2, type: 'Consulta de Facturación', quote: '"Recibí una factura más alta de lo esperado."', reply: '"Agradecemos que nos lo hagas saber. Nos gustaría ponernos en contacto contigo para revisar los detalles de tu factura."', needsApproval: true },
                    { rating: 1, type: 'Atención Clínica', quote: '"Tuve un dolor severo después del tratamiento y nadie me devolvió la llamada."', isAlert: true, alertTitle: 'Reclamo clínico detectado', alertText: 'Publicación automática bloqueada. Notificación urgente enviada a gerencia.' }
                ],
                sensitiveHeadline: 'Los reclamos médicos y clínicos requieren supervisión humana',
                sensitiveTopics: ['Dolor / Complicaciones', 'Resultados de tratamientos', 'Facturación y Seguros', 'Medicamentos', 'Información confidencial'],
                faqItems: [
                    { q: '¿Cómo garantiza ReplyVera la privacidad del paciente?', a: 'Las respuestas se redactan omitiendo confirmar públicamente datos médicos ni identidad del paciente.' },
                    { q: '¿Se bloquean las consultas sobre tratamientos o dolor?', a: 'Sí. Cualquier reseña clínica se deriva de inmediato a revisión manual.' }
                ],
                finalCtaHeadline: 'Protege la Reputación de tu Clínica Dental',
                finalCtaDescription: 'Ofrece a tus pacientes respuestas profesionales y gestiona comentarios sensibles con eficacia.'
            }
        }
    },
    {
        id: 'restaurants',
        slugs: { en: 'restaurants', nl: 'restaurants', es: 'restaurantes' },
        icon: 'utensils',
        iconBgClass: 'restaurant-icon',
        theme: { accent: '#EF4444', motif: 'crosshatch', divider: 'glow' },
        translations: {
            en: {
                name: 'Restaurants',
                dropdownDesc: 'Automated replies with food-safety and allergy escalation.',
                metaTitle: 'Google Review Automation for Restaurants | ReplyVera',
                metaDescription: 'Automatically respond to restaurant Google reviews. ReplyVera handles routine customer praise while escalating food safety and allergy complaints to managers.',
                heroHeadline: 'Every Restaurant Review Answered Automatically',
                heroDescription: 'ReplyVera handles routine reviews while escalating food-safety, allergy, and service complaints before any response is published.',
                mockupPositive: 'Maria made our anniversary dinner absolutely unforgettable.',
                mockupNegative: 'Food was good but we waited almost an hour for our table.',
                mockupSensitive: 'My daughter had an allergic reaction after eating here.',
                benefitsHeadline: 'Responses That Work as Hard as Your Floor Staff',
                benefits: [
                    { icon: 'clock', title: 'Save Manager Hours', text: 'Routine reviews are answered instantly so managers focus on hospitality.' },
                    { icon: 'award', title: 'Recognize Great Staff', text: 'Servers and chefs mentioned in reviews are naturally acknowledged in replies.' },
                    { icon: 'shield-alert', title: 'Protect Brand Safety', text: 'Allergy and food safety complaints require manager sign-off before publishing.' }
                ],
                step2Text: 'Configure tone rules, staff member recognition, and food-safety escalation limits.',
                step3Text: 'Routine praise publishes automatically. Sensitive health feedback alerts your floor manager.',
                reviewsHeadline: 'From Anniversary Praises to Allergy Complaints',
                reviewsSubhead: 'See how ReplyVera handles the full range of restaurant reviews.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Maria made our anniversary dinner absolutely unforgettable."', reply: '"Thank you for celebrating with us! We are thrilled Maria made your evening special, and we will pass along your compliments!"', needsApproval: false },
                    { rating: 3, type: 'Wait Time Complaint', quote: '"Food was good but we waited almost an hour for our table."', reply: '"Thank you for your feedback. We are glad you enjoyed the meal, but we apologize for the longer wait time than expected."', needsApproval: true },
                    { rating: 1, type: 'Food Safety Alert', quote: '"My daughter had an allergic reaction after eating here."', isAlert: true, alertTitle: 'Food safety issue detected', alertText: 'Auto-publishing blocked. Manager approval required.' }
                ],
                sensitiveHeadline: 'Food-Safety Feedback Must Never Auto-Publish',
                sensitiveTopics: ['Allergies', 'Food Poisoning', 'Contamination', 'Injuries', 'Discrimination', 'Hygiene Violations'],
                faqItems: [
                    { q: 'Does ReplyVera recognize staff names in reviews?', a: 'Yes. ReplyVera identifies staff names and includes personal thank-yous naturally.' },
                    { q: 'Are food safety complaints blocked from auto-publishing?', a: 'Yes. Keywords about allergies or sickness trigger immediate alerts.' }
                ],
                finalCtaHeadline: 'Stop Leaving Restaurant Reviews Unanswered',
                finalCtaDescription: 'Let ReplyVera handle routine replies and protect your reputation while you focus on great food.'
            },
            nl: {
                name: 'Restaurants',
                dropdownDesc: 'Geautomatiseerde reacties met escalatie van voedselveiligheid en allergieën.',
                metaTitle: 'Google Review Automatisering voor Restaurants | ReplyVera',
                metaDescription: 'Reageer automatisch op Google-reviews van je restaurant. ReplyVera behandelt routinematige complimenten en escaleert allergieklachten naar managers.',
                heroHeadline: 'Elke Restaurant Review Automatisch Beantwoord',
                heroDescription: 'ReplyVera schrijft gepersonaliseerde reacties op Google-reviews en houdt allergieën, voedselveiligheid en ernstige klachten onder controle van de manager.',
                mockupPositive: 'Maria heeft ons jubileumdiner geweldig gemaakt.',
                mockupNegative: 'Het eten was goed, maar we moesten bijna een uur wachten.',
                mockupSensitive: 'Mijn dochter kreeg een allergische reactie na het eten hier.',
                benefitsHeadline: 'Reacties die net zo hard werken als uw bediening',
                benefits: [
                    { icon: 'clock', title: 'Bespaar Managertijd', text: 'Routinematige reviews worden automatisch afgehandeld, zodat u zich kunt richten op de service in de zaak.' },
                    { icon: 'award', title: 'Erken Goede Service', text: 'Medewerkers die in reviews worden genoemd, worden natuurlijk bedankt in de reactie.' },
                    { icon: 'shield-alert', title: 'Bescherm het Merk', text: 'Allergie- en hygiëneklachten vereisen altijd goedkeuring van de manager voordat er wordt gereageerd.' }
                ],
                step2Text: 'Stel voorkeuren in voor merktoon, personeelserkenning en drempels voor voedselveiligheid.',
                step3Text: 'Routinematige bedankjes gaan direct live. Allergieklachten waarschuwen uw restaurantmanager.',
                reviewsHeadline: 'Van Jubileumcomplimenten tot Allergieklachten',
                reviewsSubhead: 'Zie hoe ReplyVera alle soorten restaurant-reviews afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Maria heeft ons jubileumdiner geweldig gemaakt."', reply: '"Bedankt dat u dit bij ons kwam vieren. Fijn dat Maria de avond speciaal heeft gemaakt, we geven uw complimenten zeker door!"', needsApproval: false },
                    { rating: 3, type: 'Klacht over Wachttijd', quote: '"Het eten was goed, maar we moesten bijna een uur wachten."', reply: '"Bedankt voor uw eerlijke feedback. Fijn dat het eten smaakte, maar excuses dat u zo lang heeft moeten wachten."', needsApproval: true },
                    { rating: 1, type: 'Gevoelige Review', quote: '"Mijn dochter kreeg een allergische reactie na het eten hier."', isAlert: true, alertTitle: 'Voedselveiligheidsprobleem gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Goedkeuring van manager vereist.' }
                ],
                sensitiveHeadline: 'Sommige restaurantreviews mogen nooit automatisch worden beantwoord',
                sensitiveTopics: ['Allergieën', 'Voedselvergiftiging', 'Besmetting', 'Letsel', 'Discriminatie', 'Ernstige hygiëneklachten'],
                faqItems: [
                    { q: 'Herken ReplyVera namen van medewerkers in reviews?', a: 'Ja. ReplyVera herkent namen in reviews en neemt deze op in het antwoord.' },
                    { q: 'Worden voedselveiligheidsreviews geblokkeerd?', a: 'Ja. Reviews met sleutelwoorden over allergieën of ziekte worden direct geblokkeerd voor automatische publicatie.' }
                ],
                finalCtaHeadline: 'Stop met het Onbeantwoord Laten van Restaurant Reviews',
                finalCtaDescription: 'Laat ReplyVera routinereacties afhandelen en bescherm uw reputatie terwijl u zich richt op heerlijk eten.'
            },
            es: {
                name: 'Restaurantes',
                dropdownDesc: 'Respuestas automatizadas con escalado de alergias y seguridad alimentaria.',
                metaTitle: 'Automatización de Reseñas de Google para Restaurantes | ReplyVera',
                metaDescription: 'Responde automáticamente a las reseñas de Google de tu restaurante. ReplyVera gestiona elogios rutinarios y escala quejas de alergias a los gerentes.',
                heroHeadline: 'Cada Reseña de Restaurante Respondida Automáticamente',
                heroDescription: 'ReplyVera escribe respuestas personalizadas en Google y mantiene las quejas sobre alergias, seguridad alimentaria y servicio bajo control del gerente.',
                mockupPositive: 'María hizo que nuestra cena de aniversario fuera maravillosa.',
                mockupNegative: 'La comida estuvo buena pero esperamos casi una hora.',
                mockupSensitive: 'Mi hija tuvo una reacción alérgica después de comer aquí.',
                benefitsHeadline: 'Respuestas que trabajan tan duro como tu personal de sala',
                benefits: [
                    { icon: 'clock', title: 'Ahorra Tiempo al Gerente', text: 'Las reseñas rutinarias se manejan automáticamente para que tus gerentes se enfoquen en el servicio.' },
                    { icon: 'award', title: 'Reconoce el Buen Servicio', text: 'Los camareros y cocineros mencionados en las reseñas se incluyen naturalmente en la respuesta.' },
                    { icon: 'shield-alert', title: 'Protege tu Marca', text: 'Las quejas de alergias e higiene requieren aprobación del gerente antes de responder.' }
                ],
                step2Text: 'Configura las reglas de tono, reconocimientos de camareros y límites de seguridad alimentaria.',
                step3Text: 'Los elogios rutinarios se publican solos. Los comentarios de salud notifican al responsable de sala.',
                reviewsHeadline: 'Desde Felicitaciones de Aniversario hasta Quejas de Alergias',
                reviewsSubhead: 'Descubre cómo ReplyVera maneja la gama completa de reseñas de restaurantes.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"María hizo que nuestra cena de aniversario fuera maravillosa."', reply: '"¡Gracias por celebrar con nosotros! Nos alegra que María haya hecho especial la velada y le transmitiremos tus amables palabras."', needsApproval: false },
                    { rating: 3, type: 'Queja de Tiempo de Espera', quote: '"La comida estuvo buena pero esperamos casi una hora."', reply: '"Gracias por tus comentarios. Nos alegra que hayas disfrutado la comida, pero lamentamos que la espera haya sido más larga de lo esperado."', needsApproval: true },
                    { rating: 1, type: 'Reseña Sensible', quote: '"Mi hija tuvo una reacción alérgica después de comer aquí."', isAlert: true, alertTitle: 'Problema de seguridad alimentaria detectado', alertText: 'Publicación automática bloqueada. Se requiere aprobación del gerente.' }
                ],
                sensitiveHeadline: 'Algunas reseñas de restaurantes nunca deben responderse automáticamente',
                sensitiveTopics: ['Alergias', 'Intoxicación alimentaria', 'Contaminación', 'Lesiones', 'Discriminación', 'Quejas graves de higiene'],
                faqItems: [
                    { q: '¿ReplyVera reconoce nombres de empleados en las reseñas?', a: 'Sí. ReplyVera identifica los nombres mencionados y los incluye de forma natural en la respuesta.' },
                    { q: '¿Se bloquean las reseñas de seguridad alimentaria?', a: 'Sí. Las reseñas con palabras clave sobre alergias o intoxicaciones se bloquean inmediatamente.' }
                ],
                finalCtaHeadline: 'Deja de Dejar Reseñas de Restaurante sin Responder',
                finalCtaDescription: 'Permite que ReplyVera gestione las respuestas rutinarias y proteja tu reputación.'
            }
        }
    },
    {
        id: 'car-washes',
        slugs: { en: 'car-washes', nl: 'autowasstraten', es: 'autolavados' },
        icon: 'car',
        iconBgClass: 'carwash-icon',
        theme: { accent: '#06B6D4', motif: 'waves', divider: 'glow' },
        translations: {
            en: {
                name: 'Car Wash Operators',
                dropdownDesc: 'Track damage, billing, and service complaints.',
                metaTitle: 'Google Review Automation for Car Washes | ReplyVera',
                metaDescription: 'Automate Google review replies for car wash locations. ReplyVera answers routine positive feedback and routes vehicle damage or billing claims to managers.',
                heroHeadline: 'Every Car Wash Review Answered Automatically',
                heroDescription: 'ReplyVera handles routine reviews while escalating vehicle-damage, billing, membership, and safety complaints before any response is published.',
                mockupPositive: 'Best car wash in the area. Always spotless.',
                mockupNegative: 'The equipment was broken and my car was not cleaned properly.',
                mockupSensitive: 'My side mirror was ripped off during the automatic wash.',
                benefitsHeadline: 'Responses That Work as Hard as Your Equipment',
                benefits: [
                    { icon: 'clock', title: 'Save Manager Hours', text: 'Routine 5-star reviews are handled automatically, freeing managers for site ops.' },
                    { icon: 'shield-alert', title: 'Prevent Damage Claims', text: 'Complaints mentioning scratched paint or broken mirrors require human approval.' },
                    { icon: 'credit-card', title: 'Manage Pass Complaints', text: 'Billing and wash-pass membership issues route directly to your supervisor.' }
                ],
                step2Text: 'Set tone preferences, damage safeguards, and billing approval thresholds.',
                step3Text: 'Clean wash reviews publish automatically. Damage claims trigger an instant owner alert.',
                reviewsHeadline: 'From Cleanliness Praises to Damage Claims',
                reviewsSubhead: 'See how ReplyVera handles all types of car wash reviews.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Best car wash in the area. Always spotless."', reply: '"Thank you for the fantastic review! We are glad your vehicle looks great and we look forward to seeing you again!"', needsApproval: false },
                    { rating: 2, type: 'Equipment Complaint', quote: '"The equipment was broken and my car was not cleaned properly."', reply: '"Thank you for letting us know. We apologize for the inconvenience and have alerted our technician to inspect the wash bay."', needsApproval: true },
                    { rating: 1, type: 'Damage Claim Alert', quote: '"My side mirror was ripped off during the automatic wash."', isAlert: true, alertTitle: 'Vehicle damage detected', alertText: 'Auto-publishing blocked. Owner approval required before responding.' }
                ],
                sensitiveHeadline: 'Damage Claims Must Never Auto-Publish',
                sensitiveTopics: ['Vehicle Damage', 'Paint Scratches', 'Broken Mirrors', 'Duplicate Billing', 'Membership Cancellations', 'Personal Injury'],
                faqItems: [
                    { q: 'Does ReplyVera escalate vehicle damage claims?', a: 'Yes. Any mention of scratches or broken components is blocked for owner approval.' },
                    { q: 'Can ReplyVera handle wash pass and billing issues?', a: 'Yes. Membership and billing questions route to your manager.' }
                ],
                finalCtaHeadline: 'Stop Leaving Car Wash Reviews Unanswered',
                finalCtaDescription: 'Let ReplyVera handle routine replies and protect your reputation while your team delivers clean cars.'
            },
            nl: {
                name: 'Autowasstraten',
                dropdownDesc: 'Schade aan voertuigen en escalatie van facturering.',
                metaTitle: 'Google Review Automatisering voor Autowasstraten | ReplyVera',
                metaDescription: 'Automatiseer Google-reviewreacties voor je autowasstraat. ReplyVera beantwoordt routinematige reviews en escaleert schade- of facturatieklachten.',
                heroHeadline: 'Elke Review voor uw Autowasstraat Automatisch Beantwoord',
                heroDescription: 'ReplyVera behandelt routinematige reviews en escaleert klachten over voertuigschade, facturering, lidmaatschap en veiligheid voordat er een antwoord wordt gepubliceerd.',
                mockupPositive: 'Beste autowasstraat in de buurt. Altijd vlekkeloos schoon.',
                mockupNegative: 'De apparatuur was kapot en mijn auto werd niet goed schoon.',
                mockupSensitive: 'Mijn zijspiegel werd afgebroken tijdens het wassen.',
                benefitsHeadline: 'Reacties die net zo hard werken als uw apparatuur',
                benefits: [
                    { icon: 'clock', title: 'Bespaar Tijd voor Managers', text: 'Routinematige beoordelingen worden automatisch afgehandeld, zodat uw team zich kan richten op de operationele zaken.' },
                    { icon: 'shield-alert', title: 'Voorkom Schadeclaims', text: 'Klachten over schade aan voertuigen, spiegels of lak vereisen altijd menselijke goedkeuring voordat er wordt gereageerd.' },
                    { icon: 'credit-card', title: 'Beheer Lidmaatschapklachten', text: 'Vragen over facturering en abonnementen worden direct doorgestuurd naar uw leidinggevende.' }
                ],
                step2Text: 'Stel uw voorkeursregels in voor schadedrempels, abonnementen en merktoon.',
                step3Text: 'Schone wasreviews gaan direct live. Schadeclaims sturen direct een melding naar de eigenaar.',
                reviewsHeadline: 'Van Schoonmaakcomplimenten tot Schadeclaims',
                reviewsSubhead: 'Zie hoe ReplyVera alle soorten autowasstraat-reviews afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Beste autowasstraat in de buurt. Altijd vlekkeloos schoon."', reply: '"Hartelijk dank voor deze geweldige beoordeling! Fijn om te horen dat uw auto glanzend schoon is geworden. Graag tot de volgende keer!"', needsApproval: false },
                    { rating: 2, type: 'Klacht over Apparatuur', quote: '"De apparatuur was kapot en mijn auto werd niet goed schoon."', reply: '"Bedankt voor uw eerlijke feedback. Onze excuses voor het ongemak. We hebben ons onderhoudsteam ingeschakeld om de apparatuur te controleren."', needsApproval: true },
                    { rating: 1, type: 'Gevoelig Onderwerp (Schade)', quote: '"Mijn zijspiegel werd afgebroken tijdens het wassen."', isAlert: true, alertTitle: 'Voertuigschade gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Goedkeuring van de eigenaar is vereist voordat er wordt gereageerd.' }
                ],
                sensitiveHeadline: 'Schadeclaims mogen nooit automatisch worden beantwoord',
                sensitiveTopics: ['Voertuigschade', 'Krassen', 'Afgebroken spiegels', 'Dubbele facturering', 'Lidmaatschap annuleringen', 'Letsel'],
                faqItems: [
                    { q: 'Escaleert ReplyVera claims over voertuigschade?', a: 'Ja. Reviews die melding maken van krassen, deuken of schade aan voertuigen worden direct geblokkeerd voor automatische publicatie.' },
                    { q: 'Kan ReplyVera abonnements- en factureringsklachten behandelen?', a: 'Ja. Klachten over waspaslidmaatschappen of dubbele afschrijvingen worden gefilterd voor menselijke goedkeuring.' }
                ],
                finalCtaHeadline: 'Stop met het laten liggen van Autowasstraat Reviews',
                finalCtaDescription: 'Laat ReplyVera routinematige reacties afhandelen en bescherm uw reputatie terwijl uw team zorgt voor schone auto\'s.'
            },
            es: {
                name: 'Operadores de Lavado de Autos',
                dropdownDesc: 'Rastrea quejas de daños, facturación y servicio.',
                metaTitle: 'Automatización de Reseñas de Google para Autolavados | ReplyVera',
                metaDescription: 'Automatiza las respuestas en Google para tu autolavado. ReplyVera responde reseñas rutinarias y escala reclamos de daños o facturación a los gerentes.',
                heroHeadline: 'Cada Reseña de tu Autolavado Respondida Automáticamente',
                heroDescription: 'ReplyVera gestiona las reseñas rutinarias y escala reclamos sobre daños a vehículos, facturación, membresías y seguridad antes de publicar cualquier respuesta.',
                mockupPositive: 'El mejor autolavado de la zona. Siempre impecable.',
                mockupNegative: 'El equipo estaba roto y mi auto no quedó bien limpio.',
                mockupSensitive: 'Mi espejo retrovisor se rompió durante el lavado automático.',
                benefitsHeadline: 'Respuestas que trabajan tan duro como tus equipos',
                benefits: [
                    { icon: 'clock', title: 'Ahorra Tiempo a los Gerentes', text: 'Las reseñas rutinarias se manejan automáticamente para que tu equipo se concentre en la operación.' },
                    { icon: 'shield-alert', title: 'Evita Reclamos de Daños', text: 'Las quejas sobre rayones o daños en vehículos siempre requieren aprobación humana antes de responder.' },
                    { icon: 'credit-card', title: 'Gestiona Quejas de Membresía', text: 'Las dudas sobre cobros y suscripciones se dirigen directamente al responsable.' }
                ],
                step2Text: 'Ajusta las salvaguardas de daños, reglas de cobros y el tono de tu autolavado.',
                step3Text: 'Las reseñas de lavado perfecto se publican solas. Los reclamos de daños notifican de inmediato al dueño.',
                reviewsHeadline: 'Desde Elogios de Limpieza hasta Reclamos de Daños',
                reviewsSubhead: 'Mira cómo ReplyVera gestiona todo tipo de reseñas de autolavados.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"El mejor autolavado de la zona. Siempre impecable."', reply: '"¡Muchas gracias por esta excelente calificación! Nos alegra saber que tu auto quedó brillante y limpio. ¡Te esperamos pronto!"', needsApproval: false },
                    { rating: 2, type: 'Queja de Equipo', quote: '"El equipo estaba roto y mi auto no quedó bien limpio."', reply: '"Gracias por tu comentario sincero. Pedimos disculpas por los inconvenientes. Hemos notificado a nuestro equipo de mantenimiento."', needsApproval: true },
                    { rating: 1, type: 'Tema Sensible (Daño)', quote: '"Mi espejo retrovisor se rompió durante el lavado automático."', isAlert: true, alertTitle: 'Daño vehicular detectado', alertText: 'Publicación automática bloqueada. Se requiere aprobación del propietario antes de responder.' }
                ],
                sensitiveHeadline: 'Los reclamos de daños nunca deben responderse automáticamente',
                sensitiveTopics: ['Daños a vehículos', 'Rayones', 'Espejos rotos', 'Cobros duplicados', 'Cancelación de membresías', 'Lesiones'],
                faqItems: [
                    { q: '¿ReplyVera escala reclamos de daños en vehículos?', a: 'Sí. Las reseñas que mencionan rayones o daños se bloquean inmediatamente y se envían a tu bandeja de aprobación.' },
                    { q: '¿Puede ReplyVera gestionar quejas de membresía y facturación?', a: 'Sí. Las quejas sobre cobros o pases de lavado se filtran para revisión manual.' }
                ],
                finalCtaHeadline: 'No Dejes Reseñas de tu Autolavado sin Responder',
                finalCtaDescription: 'Deja que ReplyVera responda a las reseñas rutinarias y proteja tu reputación mientras tu equipo se enfoca en entregar autos limpios.'
            }
        }
    },
    {
        id: 'agencies',
        slugs: { en: 'agencies', nl: 'marketingbureaus', es: 'agencias-de-marketing' },
        icon: 'briefcase',
        iconBgClass: 'agency-icon',
        theme: { accent: '#8B5CF6', motif: 'dots', divider: 'glow' },
        translations: {
            en: {
                name: 'Marketing Agencies',
                dropdownDesc: 'Manage Google review replies for every client from one dashboard.',
                metaTitle: 'Google Review Automation for Marketing Agencies | ReplyVera',
                metaDescription: 'Manage Google review responses across all client locations. ReplyVera automates personalized replies with custom brand voice and approval controls per client.',
                heroHeadline: 'Scalable Review Automation for Marketing Agencies',
                heroDescription: 'Manage Google review responses across all client accounts from one dashboard. Define client-specific rules and deliver high-value reporting.',
                mockupPositive: 'Great client support and lightning fast responses.',
                mockupNegative: 'Our appointment was canceled at the last minute.',
                mockupSensitive: 'Unprofessional interaction with upper management.',
                benefitsHeadline: 'Scalable Review Management for Client Accounts',
                benefits: [
                    { icon: 'briefcase', title: 'Central Dashboard', text: 'Oversee all client locations and accounts from a single unified workspace.' },
                    { icon: 'sliders', title: 'Client-Specific Rules', text: 'Customize brand voice, keywords, and approval flows independently per client.' },
                    { icon: 'trending-up', title: 'New Recurring Revenue', text: 'Offer review management as a high-margin add-on service.' }
                ],
                step2Text: 'Set individual client brand voices, notification emails, and approval permissions.',
                step3Text: 'Client reviews publish according to their rules. Escalations alert client managers.',
                reviewsHeadline: 'Automated Client Management in Practice',
                reviewsSubhead: 'See how ReplyVera helps agencies scale review responses across multiple accounts.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Great client support and lightning fast responses."', reply: '"Thank you for your fantastic review! We are glad we could help you quickly."', needsApproval: false },
                    { rating: 2, type: 'Service Inquiry', quote: '"Our appointment was canceled at the last minute."', reply: '"We sincerely apologize for the scheduling conflict. We will reach out to reschedule immediately."', needsApproval: true },
                    { rating: 1, type: 'Sensitive Review', quote: '"Unprofessional interaction with upper management."', isAlert: true, alertTitle: 'Sensitive review detected', alertText: 'Auto-publishing blocked. Agency manager notified.' }
                ],
                sensitiveHeadline: 'Agency-Level Brand Safeguards',
                sensitiveTopics: ['Legal Threats', 'Severe Complaints', 'Reputational Risk', 'Staff Conflicts'],
                faqItems: [
                    { q: 'How many client locations can an agency manage?', a: 'The Agency plan supports unlimited client locations with scalable tiers.' },
                    { q: 'Can clients approve their own reviews?', a: 'Yes. You can assign client-level access for manual review approvals.' }
                ],
                finalCtaHeadline: 'Scale Your Agency with Review Automation',
                finalCtaDescription: 'Start an agency trial today and streamline reputation management across all client locations.'
            },
            nl: {
                name: 'Marketingbureaus',
                dropdownDesc: 'Beheer Google-reviewreacties voor al uw klanten vanuit één dashboard.',
                metaTitle: 'Google Review Automatisering voor Marketingbureaus | ReplyVera',
                metaDescription: 'Beheer Google-reviewreacties voor alle klantlocaties. ReplyVera automatiseert gepersonaliseerde reacties met klantspecifieke merktoon en goedkeuring.',
                heroHeadline: 'Review Automatisering Schaalbaar voor Marketingbureaus',
                heroDescription: 'Beheer Google-reviewreacties voor al uw klanten vanuit één dashboard. Bepaal regels per klant en lever extra waarde.',
                mockupPositive: 'Geweldige klantenservice en snel geholpen.',
                mockupNegative: 'Mijn afspraak werd op het laatste moment geannuleerd.',
                mockupSensitive: 'Slechte ervaring met de leidinggevende.',
                benefitsHeadline: 'Schaalbare reviewdienstverlening voor uw klanten',
                benefits: [
                    { icon: 'briefcase', title: 'Centraal Dashboard', text: 'Beheer alle klantlocaties en accounts vanuit één overzichtelijke omgeving.' },
                    { icon: 'sliders', title: 'Klantspecifieke Regels', text: 'Stel per klant de gewenste merktoon en escalatiedrempels in.' },
                    { icon: 'trending-up', title: 'Extra Maandelijkse Omzet', text: 'Bied reviewbeheer aan als waardevolle add-on dienst voor uw klanten.' }
                ],
                step2Text: 'Stel per klant de eigen merkstem, e-mailnotificaties en goedkeuringsrechten in.',
                step3Text: 'Klantreviews worden volgens hun specifieke regels gepubliceerd. Escalaties gaan naar het bureauteam.',
                reviewsHeadline: 'Geautomatiseerd Klantbeheer in de Praktijk',
                reviewsSubhead: 'Zie hoe ReplyVera uw bureau helpt bij het beheren van diverse klanteditorials.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Geweldige klantenservice en snel geholpen."', reply: '"Bedankt voor uw fantastische beoordeling! Fijn dat we u snel hebben kunnen helpen."', needsApproval: false },
                    { rating: 2, type: 'Serviceklacht', quote: '"Mijn afspraak werd op het laatste moment geannuleerd."', reply: '"Onze welgemeende excuses voor het ongemak. We nemen direct contact met u op om een nieuwe afspraak in te plannen."', needsApproval: true },
                    { rating: 1, type: 'Gevoelig Onderwerp', quote: '"Slechte ervaring met de leidinggevende."', isAlert: true, alertTitle: 'Gevoelige review gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Klant / bureaubeheerder gewaarschuwd.' }
                ],
                sensitiveHeadline: 'Klantbescherming op Bureau-niveau',
                sensitiveTopics: ['Juridische dreigementen', 'Ernstige klachten', 'Merkschade', 'Personeelconflicten'],
                faqItems: [
                    { q: 'Hoeveel klanten kan een bureau beheren?', a: 'Het Agency-abonnement ondersteunt onbeperkte klantlocaties met flexibele tarieven.' },
                    { q: 'Kunnen klanten hun eigen reviews inzien?', a: 'Ja, u kunt rollen en toegang per klant instellen.' }
                ],
                finalCtaHeadline: 'Schaal uw Bureau met Review Automatisering',
                finalCtaDescription: 'Start vandaag nog een proefperiode voor uw bureau en ontdek het gemak van gecentraliseerd reviewbeheer.'
            },
            es: {
                name: 'Agencias de Marketing',
                dropdownDesc: 'Gestiona respuestas de reseñas de Google para todos tus clientes.',
                metaTitle: 'Automatización de Reseñas de Google para Agencias de Marketing | ReplyVera',
                metaDescription: 'Gestiona respuestas a reseñas de Google para todos tus clientes. ReplyVera automatiza respuestas personalizadas con reglas de aprobación por cliente.',
                heroHeadline: 'Automatización de Reseñas Escalable para Agencias',
                heroDescription: 'Administra las respuestas en Google para todos tus clientes desde un único panel. Configura reglas por cliente y añade valor a tu servicio.',
                mockupPositive: 'Excelente servicio al cliente y atención muy rápida.',
                mockupNegative: 'Mi cita fue cancelada a último momento.',
                mockupSensitive: 'Mala experiencia con la gerencia.',
                benefitsHeadline: 'Servicio de Reseñas Escalable para tus Clientes',
                benefits: [
                    { icon: 'briefcase', title: 'Panel Centralizado', text: 'Administra todas las ubicaciones y cuentas de tus clientes desde una sola pantalla.' },
                    { icon: 'sliders', title: 'Reglas por Cliente', text: 'Establece el tono de marca y los umbrales de escalado para cada cliente.' },
                    { icon: 'trending-up', title: 'Ingresos Recurrentes', text: 'Ofrece la gestión de reseñas como un servicio adicional de alto valor.' }
                ],
                step2Text: 'Define la voz de marca, notificaciones y permisos de aprobación para cada cliente.',
                step3Text: 'Las reseñas de los clientes se publican según sus reglas. Las alertas llegan al equipo de tu agencia.',
                reviewsHeadline: 'Gestión de Clientes Automatizada en la Práctica',
                reviewsSubhead: 'Descubre cómo ReplyVera ayuda a tu agencia a gestionar diversas cuentas.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Excelente servicio al cliente y atención muy rápida."', reply: '"¡Gracias por tu fantástica calificación! Nos alegra haber podido ayudarte rápidamente."', needsApproval: false },
                    { rating: 2, type: 'Queja de Servicio', quote: '"Mi cita fue cancelada a último momento."', reply: '"Lamentamos sinceramente los inconvenientes. Nos pondremos en contacto contigo para agendar una nueva cita."', needsApproval: true },
                    { rating: 1, type: 'Tema Sensible', quote: '"Mala experiencia con la gerencia."', isAlert: true, alertTitle: 'Reseña sensible detectada', alertText: 'Publicación automática bloqueada. Alerta enviada a la agencia.' }
                ],
                sensitiveHeadline: 'Protección de Marca a Nivel de Agencia',
                sensitiveTopics: ['Amenazas legales', 'Quejas graves', 'Daño reputacional', 'Conflictos de personal'],
                faqItems: [
                    { q: '¿Cuántos clientes puede gestionar una agencia?', a: 'El plan de Agencia admite ubicaciones ilimitadas de clientes con tarifas adaptables.' },
                    { q: '¿Pueden los clientes revisar sus propias reseñas?', a: 'Sí. Puedes otorgar accesos individuales de aprobación por cliente.' }
                ],
                finalCtaHeadline: 'Haz Crecer tu Agencia con Automatización de Reseñas',
                finalCtaDescription: 'Comienza hoy una prueba para tu agencia y simplifica la gestión de reseñas.'
            }
        }
    },
    {
        id: 'pet-care',
        slugs: { en: 'pet-care', nl: 'dierenverzorging', es: 'cuidado-de-mascotas' },
        icon: 'dog',
        iconBgClass: 'petcare-icon',
        theme: { accent: '#F59E0B', motif: 'topography', divider: 'glow' },
        translations: {
            en: {
                name: 'Pet Care',
                dropdownDesc: 'Warm replies with animal-safety escalation.',
                metaTitle: 'Google Review Automation for Pet Care | ReplyVera',
                metaDescription: 'Warm Google review response software for veterinary clinics and pet groomers. ReplyVera answers routine reviews while routing animal health concerns to staff.',
                heroHeadline: 'Warm Review Replies for Vets & Pet Groomers',
                heroDescription: 'ReplyVera generates empathetic replies for pet care businesses and immediately escalates health or injury concerns to your team.',
                mockupPositive: 'Our dog Max was treated with so much love during his grooming session.',
                mockupNegative: 'The wait time at the clinic was much longer than promised.',
                mockupSensitive: 'My cat returned home with a limp after staying at the boarding facility.',
                benefitsHeadline: 'Caring Communication for Pet Lovers',
                benefits: [
                    { icon: 'dog', title: 'Warm & Empathetic Tone', text: 'Show pet parents that their companion is in caring hands.' },
                    { icon: 'award', title: 'Personalized Touch', text: 'Pet names mentioned in reviews are warmly incorporated into replies.' },
                    { icon: 'shield-alert', title: 'Animal Safety Escalation', text: 'Health, sickness, or injury feedback is blocked from automated posting.' }
                ],
                step2Text: 'Configure warm brand voice, pet name recognition, and injury safety filters.',
                step3Text: 'Happy pet reviews publish automatically. Animal health concerns alert your manager immediately.',
                reviewsHeadline: 'From Happy Pets to Owner Concerns',
                reviewsSubhead: 'See how ReplyVera handles pet care and veterinary reviews.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Our dog Max was treated with so much love during his grooming session."', reply: '"Thank you so much! Max is a sweet boy and we cannot wait to see him again!"', needsApproval: false },
                    { rating: 3, type: 'Wait Time Complaint', quote: '"The wait time at the clinic was much longer than promised."', reply: '"Thank you for your patience. We strive to keep appointments on time and apologize for the delay."', needsApproval: true },
                    { rating: 1, type: 'Animal Welfare Alert', quote: '"My cat returned home with a limp after staying at the boarding facility."', isAlert: true, alertTitle: 'Welfare incident detected', alertText: 'Auto-publishing blocked. Immediate alert sent to management.' }
                ],
                sensitiveHeadline: 'Pet Welfare Concerns Always Require Human Care',
                sensitiveTopics: ['Pet Injury', 'Post-Stay Sickness', 'Medical Complications', 'Dosing Errors'],
                faqItems: [
                    { q: 'Does ReplyVera recognize pet names?', a: 'Yes. Dog, cat, and pet names are identified and warmly included in replies.' }
                ],
                finalCtaHeadline: 'Show Your Love for Pet Care',
                finalCtaDescription: 'Reply to reviews with warmth and protect the trust of pet owners.'
            },
            nl: {
                name: 'Dierenverzorging',
                dropdownDesc: 'Warme reacties met escalatie van diergezondheid en veiligheid.',
                metaTitle: 'Google Review Automatisering voor Dierenverzorging | ReplyVera',
                metaDescription: 'Warme Google-reviewreacties voor dierenartsen en trimsalons. ReplyVera beantwoordt routinematige reviews en escaleert gezondheidsvragen naar je team.',
                heroHeadline: 'Warme Review Reacties voor Dierenartsen en Trimsalons',
                heroDescription: 'ReplyVera genereert warme, meelevende reacties voor dierenverzorgers en escaleert medische of veiligheidsvragen direct.',
                mockupPositive: 'Onze hond Max werd zo liefdevol verzorgd tijdens de trimbeurt.',
                mockupNegative: 'De wachttijd in de praktijk liep erg uit.',
                mockupSensitive: 'Mijn kat kwam gewond terug uit het pension.',
                benefitsHeadline: 'Meelevende Communicatie voor Dierenliefhebbers',
                benefits: [
                    { icon: 'dog', title: 'Warme & Diervriendelijke Toon', text: 'Laat diereigenaren zien dat uw hart bij de verzorging van hun huisdier ligt.' },
                    { icon: 'award', title: 'Persoonlijke Aandacht', text: 'Namen van huisdieren in reviews worden liefdevol overgenomen in het antwoord.' },
                    { icon: 'shield-alert', title: 'Dierenwelzijn Escalatie', text: 'Meldingen over ziekte of letsel bij dieren worden direct geblokkeerd voor automatisering.' }
                ],
                step2Text: 'Stel uw warme merktoon in, activeer diernaam-herkenning en stel veiligheidsfilters in.',
                step3Text: 'Blije huisdierbeoordelingen gaan direct live. Zorgen over diergezondheid waarschuwen uw directie.',
                reviewsHeadline: 'Van Blije Huisdieren tot Zorgen van Eigenaren',
                reviewsSubhead: 'Zie hoe ReplyVera reacties op dierbeoordelingen verzorgt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Onze hond Max werd zo liefdevol verzorgd tijdens de trimbeurt."', reply: '"Wat fijn om te horen! Max is een geweldige hond en we zien hem graag snel weer in de salon."', needsApproval: false },
                    { rating: 3, type: 'Wachttijdklacht', quote: '"De wachttijd in de praktijk liep erg uit."', reply: '"Bedankt voor uw geduld. We doen ons best om wachttijden minimaal te houden en excuses voor het uitlopen."', needsApproval: true },
                    { rating: 1, type: 'Melding Dierenwelzijn', quote: '"Mijn kat kwam gewond terug uit het pension."', isAlert: true, alertTitle: 'Welzijnsincident gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Directie waarschuwen.' }
                ],
                sensitiveHeadline: 'Veiligheid van Huisdieren staat altijd centraal',
                sensitiveTopics: ['Letsel bij huisdieren', 'Ziekte na verblijf', 'Medische complicaties', 'Medicatiefouten'],
                faqItems: [
                    { q: 'Herken ReplyVera de namen van huisdieren?', a: 'Ja. Namen van honden, katten en andere dieren worden herkend en opgenomen in de reactie.' }
                ],
                finalCtaHeadline: 'Toon uw Liefde voor Dierenverzorging',
                finalCtaDescription: 'Beantwoord reviews met een warme toon en bescherm het vertrouwen van baasjes.'
            },
            es: {
                name: 'Cuidado de Mascotas',
                dropdownDesc: 'Respuestas cálidas con escalado de salud y seguridad animal.',
                metaTitle: 'Automatización de Reseñas de Google para Cuidado de Mascotas | ReplyVera',
                metaDescription: 'Software de respuestas a reseñas de Google para clínicas veterinarias y peluquerías caninas. ReplyVera escala dudas sobre salud animal a tu equipo.',
                heroHeadline: 'Respuestas Cálidas para Veterinarias y Peluquerías Caninas',
                heroDescription: 'ReplyVera redacta respuestas afectuosas para centros de mascotas y escala inmediatamente dudas médicas o de salud.',
                mockupPositive: 'Trataron a nuestro perro Max con mucho cariño durante el baño.',
                mockupNegative: 'El tiempo de espera en la clínica fue demasiado largo.',
                mockupSensitive: 'Mi gato volvió lastimado de su estancia en la guardería.',
                benefitsHeadline: 'Comunicación Afectuosa para Amantes de los Animales',
                benefits: [
                    { icon: 'dog', title: 'Tono Cálido y Empático', text: 'Muestra a los dueños el amor y cuidado que dedican a sus mascotas.' },
                    { icon: 'award', title: 'Atención Personalizada', text: 'Los nombres de las mascotas se mencionan cariñosamente en la respuesta.' },
                    { icon: 'shield-alert', title: 'Escalado de Bienestar Animal', text: 'Cualquier reporte sobre salud o lesiones se bloquea para respuesta automática.' }
                ],
                step2Text: 'Configura un tono afectuoso, reconocimiento de mascotas y salvaguardas de salud.',
                step3Text: 'Las opiniones felices de mascotas se publican solas. Las dudas de salud alertan a la gerencia.',
                reviewsHeadline: 'Desde Mascotas Felices hasta Preocupaciones de Dueños',
                reviewsSubhead: 'Mira cómo ReplyVera responde a reseñas en el sector veterinario y canino.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Trataron a nuestro perro Max con mucho cariño durante el baño."', reply: '"¡Muchas gracias! Max es un perrito encantador y será un placer recibirlo nuevamente."', needsApproval: false },
                    { rating: 3, type: 'Queja de Espera', quote: '"El tiempo de espera en la clínica fue demasiado largo."', reply: '"Agradecemos tu paciencia. Hacemos lo posible por optimizar nuestros tiempos y pedimos disculpas por la demora."', needsApproval: true },
                    { rating: 1, type: 'Alerta de Salud', quote: '"Mi gato volvió lastimado de su estancia en la guardería."', isAlert: true, alertTitle: 'Incidente de salud detectado', alertText: 'Publicación automática bloqueada. Notificación urgente a la gerencia.' }
                ],
                sensitiveHeadline: 'La salud de las mascotas es siempre prioritaria',
                sensitiveTopics: ['Lesiones en mascotas', 'Enfermedades tras estancia', 'Complicaciones médicas', 'Errores de medicación'],
                faqItems: [
                    { q: '¿ReplyVera reconoce los nombres de las mascotas?', a: 'Sí. Los nombres de perros, gatos y otras mascotas se identifican e incluyen en la respuesta.' }
                ],
                finalCtaHeadline: 'Muestra tu Pasión por el Cuidado Animal',
                finalCtaDescription: 'Responde a tus clientes con empatía y protege la confianza de los dueños de mascotas.'
            }
        }
    },
    {
        id: 'childcare',
        slugs: { en: 'childcare', nl: 'kinderopvang', es: 'guarderias' },
        icon: 'heart',
        iconBgClass: 'childcare-icon',
        theme: { accent: '#EC4899', motif: 'stars', divider: 'glow' },
        translations: {
            en: {
                name: 'Childcare & Preschool',
                dropdownDesc: 'Safety-aware responses for parent feedback.',
                metaTitle: 'Google Review Automation for Childcare & Preschool | ReplyVera',
                metaDescription: 'Professional Google review responses for daycare centers and preschools. ReplyVera automates friendly replies while escalating safety and parent concerns.',
                heroHeadline: 'Safety-Aware Review Replies for Childcare & Preschools',
                heroDescription: 'ReplyVera helps childcare centers respond with warmth and professionalism while ensuring child safety and privacy are strictly safeguarded.',
                mockupPositive: 'The teachers are so loving and attentive to our daughter.',
                mockupNegative: 'Daily activity communication could be more consistent.',
                mockupSensitive: 'My child came home with unexplained bruises today.',
                benefitsHeadline: 'Trust & Safety in Every Response',
                benefits: [
                    { icon: 'heart', title: 'Warm & Reassuring Tone', text: 'Reflect the caring environment your staff provides every single day.' },
                    { icon: 'lock', title: 'Child Privacy Protection', text: 'Replies strictly omit private child details or personal identifying info.' },
                    { icon: 'shield-alert', title: 'Immediate Safety Escalation', text: 'Any concern regarding child safety is routed straight to your director.' }
                ],
                step2Text: 'Configure warm parent tone, privacy boundaries, and immediate safety escalations.',
                step3Text: 'Warm reviews publish automatically. Safety concerns alert your school director immediately.',
                reviewsHeadline: 'Careful Handling of Parent Reviews',
                reviewsSubhead: 'See how ReplyVera maintains parent trust and safety across all review types.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"The teachers are so loving and attentive to our daughter."', reply: '"Thank you so much for your kind words! We will happily pass along your compliment to our classroom team!"', needsApproval: false },
                    { rating: 3, type: 'Communication Suggestion', quote: '"Daily activity communication could be more consistent."', reply: '"Thank you for your valuable feedback. We will review our daily updates to ensure parents stay well informed."', needsApproval: true },
                    { rating: 1, type: 'Child Safety Alert', quote: '"My child came home with unexplained bruises today."', isAlert: true, alertTitle: 'Child safety concern detected', alertText: 'Auto-publishing blocked. School director notified immediately.' }
                ],
                sensitiveHeadline: 'Child Safety Concerns Must Always Require Director Care',
                sensitiveTopics: ['Child Safety', 'Classroom Incidents', 'Hygiene & Food', 'Privacy of Minors'],
                faqItems: [
                    { q: 'How does ReplyVera protect child privacy?', a: 'Replies never mention minor names or specific classroom details publicly.' }
                ],
                finalCtaHeadline: 'Strengthen Parent Trust Today',
                finalCtaDescription: 'Ensure warm, professional, and secure review responses for your childcare center.'
            },
            nl: {
                name: 'Kinderopvang & Peuterspeelzalen',
                dropdownDesc: 'Veiligheidsbewuste antwoorden op beoordelingen van ouders.',
                metaTitle: 'Google Review Automatisering voor Kinderopvang | ReplyVera',
                metaDescription: 'Professionele Google-reviewreacties voor kinderopvang en peuterspeelzalen. ReplyVera automatiseert reacties en escaleert veiligheidsvragen van ouders.',
                heroHeadline: 'Veiligheidsbewuste Review Reacties voor Kinderopvang',
                heroDescription: 'ReplyVera helpt kinderopvangcentra met warme, professionele antwoorden terwijl kinderveiligheid en privacy strikt gewaarborgd blijven.',
                mockupPositive: 'De leidsters zijn zo lief en zorgzaam voor onze dochter.',
                mockupNegative: 'Communicatie over de dagindeling kon beter.',
                mockupSensitive: 'Mijn kind kwam thuis met onverklarde blauwe plekken.',
                benefitsHeadline: 'Vertrouwen en Veiligheid in Elke Reactie',
                benefits: [
                    { icon: 'heart', title: 'Warme & Professionele Uitstraling', text: 'Laat zien hoeveel zorg en aandacht uw team dagelijks geeft.' },
                    { icon: 'lock', title: 'Privacy van Kinderen', text: 'Reacties bevatten nooit privacygevoelige gegevens van kinderen of ouders.' },
                    { icon: 'shield-alert', title: 'Strikte Escalatie bij Veiligheid', text: 'Elk signaal over kinderveiligheid wordt direct doorgestuurd naar de directie.' }
                ],
                step2Text: 'Stel uw warme inslag in, waarborg de privacy van kinderen en stel directie-escalaties in.',
                step3Text: 'Warme reviews gaan direct live. Veiligheidssignalen waarschuwen direct uw vestigingsmanager.',
                reviewsHeadline: 'Zorgvuldige Afhandeling van Ouderbeoordelingen',
                reviewsSubhead: 'Bekijk voorbeelden van reacties voor de kinderopvang.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"De leidsters zijn zo lief en zorgzaam voor onze dochter."', reply: '"Wat fijn om te lezen! We geven uw lieve woorden met veel plezier door aan het team op de groep."', needsApproval: false },
                    { rating: 3, type: 'Aandachtspunt', quote: '"Communicatie over de dagindeling kon beter."', reply: '"Bedankt voor uw waardevolle feedback. We nemen dit mee in ons overleg om de oudercommunicatie verder te verbeteren."', needsApproval: true },
                    { rating: 1, type: 'Ernstige Zorg', quote: '"Mijn kind kwam thuis met onverklarde blauwe plekken."', isAlert: true, alertTitle: 'Veiligheidszorg gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Directie direct geïnformeerd.' }
                ],
                sensitiveHeadline: 'Kinderveiligheid staat altijd voorop',
                sensitiveTopics: ['Kinderveiligheid', 'Incidenten op de groep', 'Hygiëne & Voeding', 'Privacy van kinderen'],
                faqItems: [
                    { q: 'Hoe waarborgt ReplyVera de privacy van kinderen?', a: 'Reacties worden gegenereerd zonder namen van kinderen of specifieke groepsdetails te noemen.' }
                ],
                finalCtaHeadline: 'Versterk het Vertrouwen van Ouders',
                finalCtaDescription: 'Zorg voor professionele en veilige reviewreacties voor uw opvang.'
            },
            es: {
                name: 'Guardería y Preescolar',
                dropdownDesc: 'Respuestas cuidadosas para comentarios de padres.',
                metaTitle: 'Automatización de Reseñas de Google para Guarderías | ReplyVera',
                metaDescription: 'Respuestas profesionales a reseñas de Google para guarderías y preescolares. ReplyVera automatiza respuestas y escala consultas de seguridad a tu equipo.',
                heroHeadline: 'Respuestas de Reseñas Cuidadosas para Guarderías y Preescolares',
                heroDescription: 'ReplyVera brinda respuestas cálidas y profesionales a las familias garantizando siempre la privacidad y seguridad infantil.',
                mockupPositive: 'Las educadoras son muy cariñosas y atentas con nuestra hija.',
                mockupNegative: 'La comunicación sobre las actividades diarias podría mejorar.',
                mockupSensitive: 'Mi hijo volvió a casa con moretones sin explicación.',
                benefitsHeadline: 'Confianza y Seguridad en Cada Respuesta',
                benefits: [
                    { icon: 'heart', title: 'Tono Cálido y Humano', text: 'Muestra el nivel de dedicación y cuidado que tu equipo brinda diariamente.' },
                    { icon: 'lock', title: 'Privacidad Infantil', text: 'Las respuestas jamás incluyen datos privados o nombres de menores.' },
                    { icon: 'shield-alert', title: 'Escalado Inmediato de Seguridad', text: 'Cualquier alerta sobre el bienestar de los niños se redirige a la dirección.' }
                ],
                step2Text: 'Establece un tono cercano para padres, salvaguardas de privacidad y escalado urgente a dirección.',
                step3Text: 'Las reseñas afectuosas se publican solas. Las inquietudes de seguridad notifican a la directora.',
                reviewsHeadline: 'Gestión Responsable de Reseñas de Padres',
                reviewsSubhead: 'Ejemplos de respuestas para centros infantiles y jardines.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Las educadoras son muy cariñosas y atentas con nuestra hija."', reply: '"¡Qué alegría leer tu comentario! Transmitiremos con mucho gusto tus lindas palabras a todo nuestro equipo."', needsApproval: false },
                    { rating: 3, type: 'Sugerencia de Comunicación', quote: '"La comunicación sobre las actividades diarias podría mejorar."', reply: '"Gracias por tus valiosos comentarios. Revisaremos nuestros canales para seguir mejorando la comunicación con las familias."', needsApproval: true },
                    { rating: 1, type: 'Preocupación Grave', quote: '"Mi hijo volvió a casa con moretones sin explicación."', isAlert: true, alertTitle: 'Alerta de seguridad infantil detectada', alertText: 'Publicación automática bloqueada. Dirección notificada de inmediato.' }
                ],
                sensitiveHeadline: 'La seguridad de los niños es siempre lo primero',
                sensitiveTopics: ['Seguridad infantil', 'Incidentes en aula', 'Higiene y Alimentación', 'Privacidad de menores'],
                faqItems: [
                    { q: '¿Cómo protege ReplyVera la privacidad de los menores?', a: 'Las respuestas se redactan omitiendo nombres de niños y detalles específicos de los grupos.' }
                ],
                finalCtaHeadline: 'Refuerza la Confianza de las Familias',
                finalCtaDescription: 'Asegura respuestas profesionales y cuidadosas para tu centro educativo.'
            }
        }
    },
    {
        id: 'martial-arts',
        slugs: { en: 'martial-arts', nl: 'vechtsportscholen', es: 'escuelas-de-artes-marciales' },
        icon: 'shield',
        iconBgClass: 'martial-arts-icon',
        theme: { accent: '#6366F1', motif: 'grid', divider: 'glow' },
        translations: {
            en: {
                name: 'Martial Arts Schools',
                dropdownDesc: 'Parent-friendly replies with safety controls.',
                metaTitle: 'Google Review Automation for Martial Arts Schools | ReplyVera',
                metaDescription: 'Automate Google review replies for dojos and martial arts academies. ReplyVera publishes student praise while routing billing and safety questions to staff.',
                heroHeadline: 'Google Review Automation for Martial Arts Schools',
                heroDescription: 'ReplyVera provides respectful, parent-friendly replies while escalating safety, injury, and membership inquiries directly to the head instructor.',
                mockupPositive: 'My son has built so much confidence and discipline through these classes.',
                mockupNegative: 'My membership cancellation request was not processed in time.',
                mockupSensitive: 'My child suffered a concussion during sparring practice.',
                benefitsHeadline: 'Respectful Replies That Build Parent Trust',
                benefits: [
                    { icon: 'shield', title: 'Safety First Safeguards', text: 'Any review mentioning injury or safety is blocked from auto-publishing.' },
                    { icon: 'heart', title: 'Parent-Friendly Tone', text: 'Replies convey discipline, respect, encouragement, and community values.' },
                    { icon: 'credit-card', title: 'Membership Escalation', text: 'Dues and cancellation issues filter to your administrative team.' }
                ],
                step2Text: 'Set respectful school tone, injury safety limits, and membership escalation rules.',
                step3Text: 'Student achievement reviews publish automatically. Injury reports alert your head instructor.',
                reviewsHeadline: 'From Student Achievements to Safety Queries',
                reviewsSubhead: 'See how ReplyVera handles dojo and academy reviews.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"My son has built so much confidence and discipline through these classes."', reply: '"Thank you so much for your kind words! We are incredibly proud of his dedication and growth!"', needsApproval: false },
                    { rating: 2, type: 'Billing Inquiry', quote: '"My membership cancellation request was not processed in time."', reply: '"We apologize for the oversight regarding your account. Our administrative team will reach out directly to assist."', needsApproval: true },
                    { rating: 1, type: 'Safety Alert', quote: '"My child suffered a concussion during sparring practice."', isAlert: true, alertTitle: 'Injury incident detected', alertText: 'Auto-publishing blocked. Head instructor notified immediately.' }
                ],
                sensitiveHeadline: 'Injury & Safety Feedback Always Demands Owner Care',
                sensitiveTopics: ['Injuries', 'Sparring Incidents', 'Membership Dues', 'Bullying / Safety'],
                faqItems: [
                    { q: 'Are injury reports blocked from auto-publishing?', a: 'Yes. Any mention of injury or sparring accidents is routed to your instructor.' }
                ],
                finalCtaHeadline: 'Build Lasting Trust with Parents & Students',
                finalCtaDescription: 'Let ReplyVera manage your reviews with respect, safety, and care.'
            },
            nl: {
                name: 'Vechtsportscholen',
                dropdownDesc: 'Oudervriendelijke antwoorden met veiligheidscontrole.',
                metaTitle: 'Google Review Automatisering voor Vechtsportscholen | ReplyVera',
                metaDescription: 'Automatiseer Google-reviewreacties voor vechtsportscholen en dojo\'s. ReplyVera publiceert complimenten en escaleert vragen over lidmaatschap en veiligheid.',
                heroHeadline: 'Google Review Automatisering voor Vechtsportscholen',
                heroDescription: 'ReplyVera geeft oudervriendelijke antwoorden en escaleert vragen over veiligheid, blessures en lidmaatschappen direct naar de eigenaar.',
                mockupPositive: 'Mijn zoon heeft zoveel zelfvertrouwen gekregen door de lessen.',
                mockupNegative: 'De opzegging van mijn lidmaatschap werd niet verwerkt.',
                mockupSensitive: 'Mijn kind raakte gewond tijdens een sparringsessie.',
                benefitsHeadline: 'Vriendelijke reacties die vertrouwen bouwen bij ouders',
                benefits: [
                    { icon: 'shield', title: 'Veiligheid Eerst', text: 'Meldingen over blessures of veiligheid worden direct geblokkeerd voor automatische reactie.' },
                    { icon: 'heart', title: 'Oudervriendelijke Toon', text: 'Reacties stralen respect, discipline en een positieve sfeer uit.' },
                    { icon: 'credit-card', title: 'Lidmaatschap Escalatie', text: 'Vragen over opzeggingen of contributie worden gefilterd voor handmatige opvolging.' }
                ],
                step2Text: 'Stel een respectvolle schooltoon in en stel meldingen in voor blessures en lidmaatschappen.',
                step3Text: 'Complimenten over lessen gaan direct live. Blessuremeldingen waarschuwen uw hoofdtrainer.',
                reviewsHeadline: 'Van Oudercomplimenten tot Veiligheidsvragen',
                reviewsSubhead: 'Zie hoe ReplyVera beoordelingen voor sportscholen afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Mijn zoon heeft zoveel zelfvertrouwen gekregen door de lessen."', reply: '"Hartelijk dank voor deze mooie woorden! We zijn erg trots op zijn inzet en vooruitgang in de lessen."', needsApproval: false },
                    { rating: 2, type: 'Administratieve Vraag', quote: '"De opzegging van mijn lidmaatschap werd niet verwerkt."', reply: '"Onze excuses voor de verwarring rondom uw opzegging. We kijken de administratie direct na en nemen contact op."', needsApproval: true },
                    { rating: 1, type: 'Veiligheidsmelding', quote: '"Mijn kind raakte gewond tijdens een sparringsessie."', isAlert: true, alertTitle: 'Veiligheidsincident gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Eigenaar van de sportschool gewaarschuwd.' }
                ],
                sensitiveHeadline: 'Veiligheidsincidenten vereisen directe aandacht',
                sensitiveTopics: ['Blessures', 'Sparringsincidenten', 'Lidmaatschap opzeggingen', 'Pesten / Veiligheid'],
                faqItems: [
                    { q: 'Worden blessuremeldingen geblokkeerd?', a: 'Ja. Elk bericht dat melding maakt van letsel wordt direct geblokkeerd voor automatische reactie.' }
                ],
                finalCtaHeadline: 'Bouw Vertrouwen op bij Ouders en Leden',
                finalCtaDescription: 'Laat ReplyVera uw reviews professioneel en veilig beheren.'
            },
            es: {
                name: 'Escuelas de Artes Marciales',
                dropdownDesc: 'Respuestas adaptadas a familias con controles de seguridad.',
                metaTitle: 'Automatización de Reseñas de Google para Escuelas de Artes Marciales | ReplyVera',
                metaDescription: 'Automatiza respuestas a reseñas de Google en tu escuela de artes marciales. ReplyVera gestiona elogios y escala dudas sobre cobros y seguridad al personal.',
                heroHeadline: 'Automatización de Reseñas para Escuelas de Artes Marciales',
                heroDescription: 'ReplyVera ofrece respuestas amigables para padres y escala dudas sobre seguridad, lesiones y membresías directamente al instructor principal.',
                mockupPositive: 'Mi hijo ha ganado mucha confianza gracias a las clases.',
                mockupNegative: 'No procesaron la cancelación de mi membresía.',
                mockupSensitive: 'Mi hijo se lesionó durante una sesión de combate.',
                benefitsHeadline: 'Respuestas Amigables que Generan Confianza en los Padres',
                benefits: [
                    { icon: 'shield', title: 'Seguridad Primero', text: 'Las menciones sobre lesiones o seguridad se bloquean para revisión manual.' },
                    { icon: 'heart', title: 'Tono Respetuoso y Familiar', text: 'Las respuestas transmiten valores de disciplina, respeto y ambiente positivo.' },
                    { icon: 'credit-card', title: 'Escalado de Membresías', text: 'Las consultas sobre cobros o bajas se dirigen al equipo administrativo.' }
                ],
                step2Text: 'Define el tono de tu dojo, salvaguardas de lesiones y reglas para cuotas.',
                step3Text: 'Los elogios a alumnos se publican solos. Los reportes de lesiones alertan al instructor principal.',
                reviewsHeadline: 'Desde Felicitaciones de Padres hasta Consultas de Seguridad',
                reviewsSubhead: 'Mira cómo ReplyVera responde a las reseñas de tu dojo o academia.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Mi hijo ha ganado mucha confianza gracias a las clases."', reply: '"¡Muchas gracias por tus amables palabras! Estamos muy orgullosos del esfuerzo y avance de tu hijo en las clases."', needsApproval: false },
                    { rating: 2, type: 'Consulta Administrativa', quote: '"No procesaron la cancelación de mi membresía."', reply: '"Pedimos disculpas por la confusión con tu membresía. Revisaremos de inmediato tu caso y nos comunicaremos contigo."', needsApproval: true },
                    { rating: 1, type: 'Alerta de Seguridad', quote: '"Mi hijo se lesionó durante una sesión de combate."', isAlert: true, alertTitle: 'Incidente de seguridad detectado', alertText: 'Publicación automática bloqueada. Instructor principal notificado.' }
                ],
                sensitiveHeadline: 'Los incidentes de seguridad requieren atención inmediata',
                sensitiveTopics: ['Lesiones', 'Incidentes de combate', 'Cancelación de cuotas', 'Bullying / Seguridad'],
                faqItems: [
                    { q: '¿Se bloquean los reportes de lesiones?', a: 'Sí. Cualquier comentario sobre lesiones o accidentes se bloquea para respuesta automática.' }
                ],
                finalCtaHeadline: 'Genera Confianza en Padres y Alumnos',
                finalCtaDescription: 'Permite que ReplyVera gestione tus reseñas de forma segura y profesional.'
            }
        }
    },
    {
        id: 'tutoring',
        slugs: { en: 'tutoring', nl: 'bijlescentra', es: 'centros-de-tutoria' },
        icon: 'book-open',
        iconBgClass: 'tutoring-icon',
        theme: { accent: '#10B981', motif: 'circuits', divider: 'glow' },
        translations: {
            en: {
                name: 'Tutoring Centers',
                dropdownDesc: 'Professional replies for parent and student reviews.',
                metaTitle: 'Google Review Automation for Tutoring Centers | ReplyVera',
                metaDescription: 'Automated Google review responses for tutoring centers and learning academies. ReplyVera handles routine reviews while routing parent concerns to directors.',
                heroHeadline: 'Professional Review Replies for Tutoring Centers',
                heroDescription: 'ReplyVera helps tutoring centers respond professionally to parents and students while routing refund and guarantee queries for staff review.',
                mockupPositive: 'Thanks to the math tutoring, my son passed his entrance exam with honors.',
                mockupNegative: 'Tutor sessions were rescheduled twice without sufficient notice.',
                mockupSensitive: 'No progress after expensive sessions, I want a full refund.',
                benefitsHeadline: 'Professional Communication for Educational Institutes',
                benefits: [
                    { icon: 'book-open', title: 'Academic Excellence Tone', text: 'Convey encouraging, academic, and goal-oriented support.' },
                    { icon: 'clock', title: 'Coordinator Time-Saver', text: 'Automate thank-yous for positive exam results and score improvements.' },
                    { icon: 'shield-alert', title: 'Refund & Guarantee Filter', text: 'Questions regarding fees, refunds, or grade guarantees route for manual review.' }
                ],
                step2Text: 'Select academic tone rules, score achievement highlights, and refund filters.',
                step3Text: 'Excellence reviews publish automatically. Refund queries alert your center director.',
                reviewsHeadline: 'From Exam Successes to Refund Claims',
                reviewsSubhead: 'See how ReplyVera manages tutoring center feedback.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Thanks to the math tutoring, my son passed his entrance exam with honors."', reply: '"Congratulations on this fantastic achievement! We are delighted to have contributed to his success!"', needsApproval: false },
                    { rating: 2, type: 'Schedule Complaint', quote: '"Tutor sessions were rescheduled twice without sufficient notice."', reply: '"We apologize for the scheduling conflict. We will contact you immediately to make things right."', needsApproval: true },
                    { rating: 1, type: 'Refund Claim Alert', quote: '"No progress after expensive sessions, I want a full refund."', isAlert: true, alertTitle: 'Financial / Guarantee complaint detected', alertText: 'Auto-publishing blocked. Center director approval required.' }
                ],
                sensitiveHeadline: 'Protect Your Educational Institution Reputation',
                sensitiveTopics: ['Refund Claims', 'Grade Guarantees', 'Tutor Complaints'],
                faqItems: [
                    { q: 'Can ReplyVera filter refund claims?', a: 'Yes. Any review mentioning money-back claims is held for manual response.' }
                ],
                finalCtaHeadline: 'Highlight Educational Excellence',
                finalCtaDescription: 'Automate review replies while preserving your academic reputation.'
            },
            nl: {
                name: 'Bijlescentra',
                dropdownDesc: 'Professionele reacties voor reviews van ouders en studenten.',
                metaTitle: 'Google Review Automatisering voor Bijlescentra | ReplyVera',
                metaDescription: 'Geautomatiseerde Google-reviewreacties voor bijlescentra. ReplyVera behandelt routinematige reviews en escaleert vragen van ouders naar de leiding.',
                heroHeadline: 'Professionele Review Reacties voor Bijlescentra',
                heroDescription: 'ReplyVera helpt bijlescentra en huiswerkbegeleiders met professionele antwoorden op beoordelingen van studenten en ouders.',
                mockupPositive: 'Mijn zoon is dankzij de begeleiding geslaagd voor zijn wiskunde-examen.',
                mockupNegative: 'De afgesproken begeleidingstijden werden niet nagekomen.',
                mockupSensitive: 'Geen resultaat gezien na dure bijlessen, ik wil mijn geld terug.',
                benefitsHeadline: 'Professionele Communicatie voor Onderwijsinstituten',
                benefits: [
                    { icon: 'book-open', title: 'Academische Toon', text: 'Reacties stralen professionaliteit, motivatie en onderwijskwaliteit uit.' },
                    { icon: 'clock', title: 'Tijdbesparing voor Coördinatoren', text: 'Automatiseer standaard bedankjes voor positieve examenresultaten.' },
                    { icon: 'shield-alert', title: 'Garantie & Restitutie Filter', text: 'Klachten over kosten of tegenvallende resultaten worden gefilterd voor overleg.' }
                ],
                step2Text: 'Stel een motiverende academische toon in en stel geld-terug filters in.',
                step3Text: 'Examensuccesreviews gaan direct live. Restitutieclaims waarschuwen de directie.',
                reviewsHeadline: 'Van Examensucces tot Restitutievragen',
                reviewsSubhead: 'Zie hoe ReplyVera reviews voor bijlescentra afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Mijn zoon is dankzij de begeleiding geslaagd voor zijn wiskunde-examen."', reply: '"Gefeliciteerd met dit fantastische resultaat! Geweldig dat we hebben kunnen bijdragen aan dit succes."', needsApproval: false },
                    { rating: 2, type: 'Roosterklacht', quote: '"De afgesproken begeleidingstijden werden niet nagekomen."', reply: '"Excuus voor het misverstand in de planning. We nemen contact met u op om dit recht te zetten."', needsApproval: true },
                    { rating: 1, type: 'Restitutievraag', quote: '"Geen resultaat gezien na dure bijlessen, ik wil mijn geld terug."', isAlert: true, alertTitle: 'Financiële/Resultaatklacht gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Handmatige controle vereist.' }
                ],
                sensitiveHeadline: 'Bescherm de Reputatie van uw Instituut',
                sensitiveTopics: ['Restitutie / Geld-terug claims', 'Examengaranties', 'Klachten over docenten'],
                faqItems: [
                    { q: 'Kan ReplyVera restitutieclaims filteren?', a: 'Ja. Vragen over geld terug of garanties worden altijd tegengehouden voor handmatige reactie.' }
                ],
                finalCtaHeadline: 'Laat uw Bijlescentrum Transparant Stralen',
                finalCtaDescription: 'Automatiseer reviewreacties en behoud de controle over uw professionele imago.'
            },
            es: {
                name: 'Centros de Tutoría',
                dropdownDesc: 'Respuestas profesionales para padres y estudiantes.',
                metaTitle: 'Automatización de Reseñas de Google para Centros de Tutoría | ReplyVera',
                metaDescription: 'Respuestas automáticas a reseñas de Google para centros de tutoría. ReplyVera gestiona reseñas rutinarias y escala comentarios de padres a los directores.',
                heroHeadline: 'Respuestas Profesionales para Centros de Tutoría',
                heroDescription: 'ReplyVera ayuda a centros de tutoría y refuerzo escolar a ofrecer respuestas de calidad a estudiantes y apoderados.',
                mockupPositive: 'Gracias a las clases mi hijo aprobó su examen de matemáticas.',
                mockupNegative: 'Los horarios acordados no se cumplieron adecuadamente.',
                mockupSensitive: 'No vi resultados tras clases costosas, exijo la devolución.',
                benefitsHeadline: 'Comunicación Profesional para Instituciones Educativas',
                benefits: [
                    { icon: 'book-open', title: 'Tono Académico y Motivador', text: 'Proyecta excelencia, profesionalismo y compromiso pedagógico.' },
                    { icon: 'clock', title: 'Ahorro de Tiempo', text: 'Automatiza felicitaciones por logros académicos y aprobaciones de exámenes.' },
                    { icon: 'shield-alert', title: 'Filtro de Garantías y Reembolsos', text: 'Las dudas sobre costos o resultados se derivan a la administración.' }
                ],
                step2Text: 'Define las reglas de tono académico y activa filtros de garantías o reembolsos.',
                step3Text: 'Los logros estudiantiles se publican solos. Los reclamos de dinero alertan a la dirección.',
                reviewsHeadline: 'Desde Éxito Escolar hasta Reclamos Financieros',
                reviewsSubhead: 'Mira cómo ReplyVera maneja las reseñas de centros de estudios.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Gracias a las clases mi hijo aprobó su examen de matemáticas."', reply: '"¡Felicitaciones por este gran logro! Nos llena de orgullo haber sido parte de su éxito académico."', needsApproval: false },
                    { rating: 2, type: 'Queja de Horario', quote: '"Los horarios acordados no se cumplieron adecuadamente."', reply: '"Pedimos disculpas por los inconvenientes en la agenda. Nos comunicaremos contigo para coordinar correctamente."', needsApproval: true },
                    { rating: 1, type: 'Solicitud de Reembolso', quote: '"No vi resultados tras clases costosas, exijo la devolución."', isAlert: true, alertTitle: 'Reclamo financiero / resultado detectado', alertText: 'Publicación automática bloqueada. Requiere revisión manual.' }
                ],
                sensitiveHeadline: 'Protege la Reputación de tu Centro de Estudios',
                sensitiveTopics: ['Solicitudes de reembolso', 'Garantías de aprobación', 'Quejas de tutores'],
                faqItems: [
                    { q: '¿ReplyVera filtra solicitudes de reembolso?', a: 'Sí. Cualquier mención a devoluciones de dinero se bloquea para respuesta manual.' }
                ],
                finalCtaHeadline: 'Destaca la Excelencia de tu Centro de Tutoría',
                finalCtaDescription: 'Automatiza respuestas manteniendo el control total de tu imagen académica.'
            }
        }
    },
    {
        id: 'laundromats',
        slugs: { en: 'laundromats', nl: 'wasserettes', es: 'lavanderias' },
        icon: 'wind',
        iconBgClass: 'laundromat-icon',
        theme: { accent: '#14B8A6', motif: 'dots', divider: 'glow' },
        translations: {
            en: {
                name: 'Laundromats',
                dropdownDesc: 'Monitor cleanliness, equipment, and refunds.',
                metaTitle: 'Google Review Automation for Laundromats | ReplyVera',
                metaDescription: 'Automated Google review response software for laundromats. ReplyVera answers routine feedback while routing machine breakdown and refund requests to owners.',
                heroHeadline: 'Automatic Google Review Replies for Laundromats',
                heroDescription: 'ReplyVera answers routine laundromat reviews while routing complaints about broken washers, coin slots, or cleanliness to your manager.',
                mockupPositive: 'Clean facility, fast dryers, and free Wi-Fi while waiting.',
                mockupNegative: 'Dryer #4 did not heat up at all and wasted my coins.',
                mockupSensitive: 'Washing machine ruined my white clothes and coin machine ate $20.',
                benefitsHeadline: 'Efficient Review Management for Your Laundromat',
                benefits: [
                    { icon: 'wind', title: 'Automated Thank-Yous', text: 'Instantly thank customers for praising clean machines and fast service.' },
                    { icon: 'wrench', title: 'Machine Outage Reports', text: 'Specific mentions of broken washers or dryers alert maintenance staff.' },
                    { icon: 'dollar-sign', title: 'Refund & Coin Machine Filter', text: 'Complaints about swallowed coins or refund requests route to owner.' }
                ],
                step2Text: 'Set clean facility tone, machine outage alerts, and coin refund escalation limits.',
                step3Text: 'Positive facility reviews publish automatically. Broken machine alerts notify maintenance.',
                reviewsHeadline: 'From Clean Clothes to Broken Equipment',
                reviewsSubhead: 'See how ReplyVera handles laundromat reviews.',
                reviewExamples: [
                    { rating: 5, type: 'Positive Review', quote: '"Clean facility, fast dryers, and free Wi-Fi while waiting."', reply: '"Thank you for your great review! We are glad you enjoyed our clean machines and amenities!"', needsApproval: false },
                    { rating: 2, type: 'Broken Machine Complaint', quote: '"Dryer #4 did not heat up at all and wasted my coins."', reply: '"We apologize for the trouble. We have notified our technician to service Dryer #4 immediately."', needsApproval: true },
                    { rating: 1, type: 'Garment Damage / Refund Alert', quote: '"Washing machine ruined my white clothes and coin machine ate $20."', isAlert: true, alertTitle: 'Damage / Refund claim detected', alertText: 'Auto-publishing blocked. Owner notified immediately.' }
                ],
                sensitiveHeadline: 'Machine Outages & Damage Claims Resolved Fast',
                sensitiveTopics: ['Damaged Garments', 'Swallowed Coins / Refunds', 'Facility Cleanliness', 'Vandalism'],
                faqItems: [
                    { q: 'Can ReplyVera report broken machine numbers?', a: 'Yes. If a review mentions a specific machine number, it is highlighted in your alert.' }
                ],
                finalCtaHeadline: 'Keep Your Laundromat Reputation Spotless',
                finalCtaDescription: 'Let ReplyVera streamline your reviews while you maintain top-notch facilities.'
            },
            nl: {
                name: 'Wasserettes',
                dropdownDesc: 'Moniteer hygiëne, apparatuur en geld-terug verzoeken.',
                metaTitle: 'Google Review Automatisering voor Wasserettes | ReplyVera',
                metaDescription: 'Geautomatiseerde Google-reviewreacties voor wasserettes. ReplyVera beantwoordt routinematige feedback en escaleert machine- en terugbetalingsklachten.',
                heroHeadline: 'Automatische Google Review Reacties voor Wasserettes',
                heroDescription: 'ReplyVera beantwoordt routinereviews voor wasserettes en filtreert klachten over defecte wasmachines, muntinworp of hygiëne.',
                mockupPositive: 'Schone zaak, snelle drogers en gratis wifi.',
                mockupNegative: 'Droger nummer 4 werd niet echt warm en kostte me munten.',
                mockupSensitive: 'Wasmachine heeft mijn witte kleding beschadigd en automaat slikte geld in.',
                benefitsHeadline: 'Efficiënt Reviewbeheer voor uw Wasserette',
                benefits: [
                    { icon: 'wind', title: 'Automatische Bedankjes', text: 'Bedank klanten automatisch voor positieve reviews over schone machines en snelle service.' },
                    { icon: 'wrench', title: 'Machine-defect Signalering', text: 'Meldingen over kapotte drogers of wasmachines worden direct doorgestuurd naar de eigenaar.' },
                    { icon: 'dollar-sign', title: 'Restitutie & Facturering Filter', text: 'Klachten over ingeslikt geld of wisselautomaten worden gefilterd.' }
                ],
                step2Text: 'Stel de gewenste toon in, activeer machinenummer-signalering en stel teruggavefilters in.',
                step3Text: 'Reviews over schone machines gaan direct live. Defectmeldingen gaan naar de monteur.',
                reviewsHeadline: 'Van Schone Was tot Defecte Apparatuur',
                reviewsSubhead: 'Zie hoe ReplyVera beoordelingen voor wasserettes afhandelt.',
                reviewExamples: [
                    { rating: 5, type: 'Positieve Beoordeling', quote: '"Schone zaak, snelle drogers en gratis wifi."', reply: '"Bedankt voor uw mooie beoordeling! Fijn dat u tevreden bent over de hygiëne en onze voorzieningen."', needsApproval: false },
                    { rating: 2, type: 'Defecte Droger', quote: '"Droger nummer 4 werd niet echt warm en kostte me munten."', reply: '"Excuus voor het ongemak. We laten ons onderhoudsteam meteen naar droger 4 kijken."', needsApproval: true },
                    { rating: 1, type: 'Kledingbeschadiging / Restitutie', quote: '"Wasmachine heeft mijn witte kleding beschadigd en automaat slikte geld in."', isAlert: true, alertTitle: 'Schade / Restitutie gedetecteerd', alertText: 'Automatisch publiceren geblokkeerd. Eigenaar geïnformeerd.' }
                ],
                sensitiveHeadline: 'Machineproblemen Snel Opgelost',
                sensitiveTopics: ['Beschadigde kleding', 'Ingeslikt geld / Restitutie', 'Vervuiling / Hygiëne', 'Vandalisme'],
                faqItems: [
                    { q: 'Kan ReplyVera meldingen over defecte machines doormelden?', a: 'Ja. Als een review een specifiek machinenummer noemt, wordt dit doorgestuurd voor onderhoud.' }
                ],
                finalCtaHeadline: 'Houd uw Wasserette Reputatie Schoon',
                finalCtaDescription: 'Laat ReplyVera uw online reviews stroomlijnen terwijl u zorgt voor perfecte machines.'
            },
            es: {
                name: 'Lavanderías',
                dropdownDesc: 'Monitorea limpieza, equipos y reembolsos.',
                metaTitle: 'Automatización de Reseñas de Google para Lavanderías | ReplyVera',
                metaDescription: 'Software de respuestas a reseñas de Google para lavanderías. ReplyVera responde comentarios rutinarios y escala reclamos de máquinas y reembolsos al dueño.',
                heroHeadline: 'Respuestas Automáticas en Google para Lavanderías',
                heroDescription: 'ReplyVera responde reseñas rutinarias de lavanderías y filtra quejas sobre lavadoras averiadas, monedas o limpieza.',
                mockupPositive: 'Local muy limpio, secadoras rápidas y buen wifi.',
                mockupNegative: 'La secadora número 4 no calentaba bien y perdí monedas.',
                mockupSensitive: 'La lavadora dañó mi ropa blanca y la máquina se tragó mi dinero.',
                benefitsHeadline: 'Gestión Eficiente de Reseñas para tu Lavandería',
                benefits: [
                    { icon: 'wind', title: 'Agradecimientos Automáticos', text: 'Agradece automáticamente reseñas positivas sobre limpieza y máquinas rápidas.' },
                    { icon: 'wrench', title: 'Reporte de Máquinas Averiadas', text: 'Las quejas sobre lavadoras o secadoras dañadas se notifican al propietario.' },
                    { icon: 'dollar-sign', title: 'Filtro de Devoluciones y Cobros', text: 'Los reclamos por monedas atrapadas o fichas se derivan para revisión manual.' }
                ],
                step2Text: 'Configura las reglas para tu local, alertas de máquinas averiadas y reclamos de monedas.',
                step3Text: 'Las reseñas de clientes contentos se publican solas. Las averías de máquinas notifican a mantenimiento.',
                reviewsHeadline: 'Desde Ropa Limpia hasta Equipos Averiados',
                reviewsSubhead: 'Mira cómo ReplyVera atiende las opiniones de tu lavandería.',
                reviewExamples: [
                    { rating: 5, type: 'Reseña Positiva', quote: '"Local muy limpio, secadoras rápidas y buen wifi."', reply: '"¡Muchas gracias por tu reseña! Nos alegra que disfrutes de la limpieza y comodidades de nuestro local."', needsApproval: false },
                    { rating: 2, type: 'Secadora Defectuosa', quote: '"La secadora número 4 no calentaba bien y perdí monedas."', reply: '"Lamentamos los inconvenientes. Enviaremos a nuestro equipo técnico a revisar la secadora 4 de inmediato."', needsApproval: true },
                    { rating: 1, type: 'Daño de Ropa / Devolución', quote: '"La lavadora dañó mi ropa blanca y la máquina se tragó mi dinero."', isAlert: true, alertTitle: 'Daño / Reembolso detectado', alertText: 'Publicación automática bloqueada. Propietario notificado.' }
                ],
                sensitiveHeadline: 'Resuelve Incidencias de Equipos con Rapidez',
                sensitiveTopics: ['Ropa dañada', 'Monedas atrapadas / Reembolsos', 'Suciedad / Falta de higiene', 'Vandalismo'],
                faqItems: [
                    { q: '¿Puede ReplyVera reportar el número de máquina averiada?', a: 'Sí. Si una reseña menciona un número de máquina, se incluye en la alerta enviada al gerente.' }
                ],
                finalCtaHeadline: 'Mantén Impecable la Reputación de tu Lavandería',
                finalCtaDescription: 'Deja que ReplyVera automatice tus reseñas mientras te enfocas en mantener tus equipos al 100%.'
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

module.exports = {
    industriesData,
    getAllIndustries,
    getIndustryById,
    getIndustryBySlug,
    getLocalizedSlug,
    getLocalizedPath,
    getNavItems,
    renderHeaderDropdownHTML,
    renderMobileAccordionHTML
};
