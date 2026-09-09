/**
 * ReplyVera Homepage Interactive Simulator
 * Pure vanilla JavaScript - no external dependencies.
 * Labeled clearly as simulation - does not publish to Google.
 * Fully localized for English (en), Spanish (es), and Dutch (nl).
 */

function getSimLang() {
    try {
        const htmlLang = (document.documentElement.lang || '').toLowerCase();
        if (htmlLang.startsWith('es') || window.location.pathname.includes('/es/')) return 'es';
        if (htmlLang.startsWith('nl') || window.location.pathname.includes('/nl/')) return 'nl';
    } catch(e) {}
    return 'en';
}

const HOME_SIM_PRESETS_EN = {
    'hotels': {
        'positive': {
            name: 'Robert Vance', avatar: 'RV', stars: 5,
            quote: 'The front desk team upgraded our suite for our anniversary and breakfast was superb. Outstanding hospitality!',
            sentiment: 'Positive', topic: 'Front Desk & Room', employee: 'Front Desk', safety: 'Clear',
            tone: 'Hospitable & Warm',
            reply: 'Thank you for celebrating your anniversary with us, Robert! We are thrilled our team could make your stay special, and we look forward to welcoming you back on your next visit.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Routine guest compliment passed auto-publish criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Sarah Connor', avatar: 'SC', stars: 3,
            quote: 'Check-in took over 30 minutes and the air conditioning in room 204 was noisy throughout the night.',
            sentiment: 'Constructive / Delay', topic: 'Check-in & AC Maintenance', employee: 'None', safety: 'Flagged',
            tone: 'Attentive & Apologetic',
            reply: 'Thank you for sharing your feedback, Sarah. We apologize for the wait during check-in and the AC noise. Our maintenance team has inspected room 204, and we hope to host you again for a seamless stay.',
            decision: 'Needs Approval', decisionSub: 'Service delay and maintenance complaint held for GM approval.', decisionType: 'approval', status: 'Pending Manager Review'
        },
        'sensitive': {
            name: 'Marcus Brody', avatar: 'MB', stars: 1,
            quote: 'Found bed bugs in room 312 and the night manager was unhelpful and refused to refund us!',
            sentiment: 'Critical Incident', topic: 'Pest / Hygiene Complaint', employee: 'Night Manager', safety: 'BLOCKED',
            tone: 'Internal GM Escalation',
            reply: '[Auto-Publishing Blocked] Sensitive pest/hygiene claim detected. Incident report generated and dispatched directly to General Manager.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Health & hygiene trigger activated. Automatic response suppressed.', decisionType: 'blocked', status: 'Escalated to GM'
        }
    },
    'restaurants': {
        'positive': {
            name: 'Sarah Jenkins', avatar: 'SJ', stars: 5,
            quote: 'The lasagna was incredible and our server Alex was super attentive. Best Italian dinner in town!',
            sentiment: 'Positive', topic: 'Food & Staff', employee: 'Alex', safety: 'Clear',
            tone: 'Warm & Welcoming',
            reply: 'Thank you so much for the kind words, Sarah! We’re thrilled you loved the lasagna and enjoyed Alex’s service. We’ll pass along your praise to him!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Matches rule: 4-5 star praise auto-publishes immediately.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Mark Davis', avatar: 'MD', stars: 3,
            quote: 'Food was decent but we waited 45 minutes for a table even with a confirmed reservation.',
            sentiment: 'Neutral / Delay', topic: 'Wait Time & Seating', employee: 'None', safety: 'Flagged',
            tone: 'Empathetic & Accountable',
            reply: 'Thank you for sharing your feedback, Mark. We sincerely apologize for the 45-minute wait despite your reservation. We are reviewing our host scheduling to prevent this.',
            decision: 'Needs Approval', decisionSub: 'Held for review because rating is under 4 stars.', decisionType: 'approval', status: 'Pending Host Manager Review'
        },
        'sensitive': {
            name: 'David Chen', avatar: 'DC', stars: 1,
            quote: 'Specifically asked for peanut-free dish due to severe allergy. Sauce had peanut oil and I needed an EpiPen!',
            sentiment: 'Severe Risk', topic: 'Allergen / Food Safety Emergency', employee: 'None', safety: 'BLOCKED',
            tone: 'Urgent Management Hold',
            reply: '[Auto-Publishing Blocked] Critical allergen incident detected. Alert dispatched directly to General Manager & Kitchen Director.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Critical health hazard triggered automatic publishing suppression.', decisionType: 'blocked', status: 'Escalated to Owner & GM'
        }
    },
    'auto-repair': {
        'positive': {
            name: 'Carlos Mendez', avatar: 'CM', stars: 5,
            quote: 'Honest diagnostic and reasonable pricing. Replaced my front brakes and had the car back before 3 PM. Excellent service!',
            sentiment: 'Positive', topic: 'Brake Service & Timeliness', employee: 'Shop Team', safety: 'Clear',
            tone: 'Professional & Appreciative',
            reply: 'Thank you for the five-star review, Carlos! We are glad we could complete your brake service ahead of schedule and appreciate your trust in our garage.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Routine brake service compliment passed auto-publish criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Jennifer Wu', avatar: 'JW', stars: 3,
            quote: 'The oil change was fine, but the quote for new rotors was $120 higher than another shop down the street.',
            sentiment: 'Pricing Dispute', topic: 'Rotor Quote & Pricing', employee: 'None', safety: 'Flagged',
            tone: 'Courteous & Explanatory',
            reply: 'Thank you for your feedback, Jennifer. We appreciate you choosing us for your oil change and would welcome the opportunity to explain our OEM parts warranty on brake rotors.',
            decision: 'Needs Approval', decisionSub: 'Pricing inquiry held for Service Advisor review.', decisionType: 'approval', status: 'Pending Advisor Review'
        },
        'sensitive': {
            name: 'Kevin O\'Connor', avatar: 'KO', stars: 1,
            quote: 'Lug nuts were left hand-tight on my wheel after tire rotation and flew off on the highway! Complete negligence!',
            sentiment: 'Mechanical Hazard', topic: 'Loose Lug Nuts / Safety Hazard', employee: 'Technician', safety: 'BLOCKED',
            tone: 'Immediate Shop Lead Escalation',
            reply: '[Auto-Publishing Blocked] Mechanical safety incident detected. Notification sent immediately to Shop Foreman and Managing Director.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Road safety hazard triggered emergency block.', decisionType: 'blocked', status: 'Escalated to Shop Foreman'
        }
    },
    'dentists': {
        'positive': {
            name: 'Amanda Foster', avatar: 'AF', stars: 5,
            quote: 'I have severe dental anxiety, but Dr. Chen and dental assistant Lisa were so gentle and patient during my root canal.',
            sentiment: 'Positive', topic: 'Patient Care & Root Canal', employee: 'Dr. Chen & Lisa', safety: 'Clear',
            tone: 'Compassionate & Professional',
            reply: 'Thank you so much, Amanda! Ensuring patients feel calm and comfortable is our top priority, and Dr. Chen and Lisa will be delighted to read your review.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Routine positive patient praise passed safety rules.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Brian Miller', avatar: 'BM', stars: 3,
            quote: 'Cleaning was thorough, but the front desk billed my insurance out-of-network without notifying me beforehand.',
            sentiment: 'Billing Confusion', topic: 'Out-of-Network Insurance', employee: 'Front Desk', safety: 'Flagged',
            tone: 'Helpful & Reassuring',
            reply: 'Thank you for your feedback, Brian. We apologize for the miscommunication regarding your insurance coverage and our billing team is reviewing your claim today.',
            decision: 'Needs Approval', decisionSub: 'Billing dispute held for Practice Manager sign-off.', decisionType: 'approval', status: 'Pending Practice Manager'
        },
        'sensitive': {
            name: 'Rachel Scott', avatar: 'RS', stars: 1,
            quote: 'Extraction caused severe nerve damage and temporary facial paralysis. Consulting a medical malpractice attorney.',
            sentiment: 'Malpractice / Legal', topic: 'Nerve Damage & Legal Claim', employee: 'Surgeon', safety: 'BLOCKED',
            tone: 'Strict Legal Hold',
            reply: '[Auto-Publishing Blocked] Legal and medical liability claim detected. Automatic publishing withheld; incident escalated to Practice Owner & Counsel.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Legal threat & clinical complication triggered auto-block.', decisionType: 'blocked', status: 'Escalated to Legal/Owner'
        }
    },
    'salons-spas': {
        'positive': {
            name: 'Chloe Bennett', avatar: 'CB', stars: 5,
            quote: 'Maya worked magic on my balayage! Exact color match to the inspiration photos and no heat damage.',
            sentiment: 'Positive', topic: 'Balayage & Color Match', employee: 'Maya', safety: 'Clear',
            tone: 'Warm & Stylish',
            reply: 'Thank you so much, Chloe! Maya will be thrilled to hear you love your balayage. We look forward to seeing you for your next refresh!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Stylist praise auto-published under positive feedback rule.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Jessica Taylor', avatar: 'JT', stars: 3,
            quote: 'Haircut looks nice, but toner turned noticeably brassy after just two washes. Expected better longevity.',
            sentiment: 'Technical Feedback', topic: 'Toner Longevity', employee: 'Stylist', safety: 'Flagged',
            tone: 'Helpful & Accommodating',
            reply: 'Thank you for sharing your thoughts, Jessica. We want you to love your color—please contact the salon so we can schedule a complimentary toner adjustment.',
            decision: 'Needs Approval', decisionSub: 'Color longevity concern held for Salon Director review.', decisionType: 'approval', status: 'Pending Salon Director'
        },
        'sensitive': {
            name: 'Ashley Morgan', avatar: 'AM', stars: 1,
            quote: 'Bleach was left on my scalp for 50 minutes without checking. Severe chemical burns and hair fell out in clumps!',
            sentiment: 'Severe Injury', topic: 'Chemical Scalp Burn', employee: 'Colorist', safety: 'BLOCKED',
            tone: 'Urgent Owner Hold',
            reply: '[Auto-Publishing Blocked] Physical injury and chemical burn claim detected. Auto-response withheld and notification dispatched directly to Salon Owner.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Chemical injury safety filter activated.', decisionType: 'blocked', status: 'Escalated to Salon Owner'
        }
    },
    'medspas': {
        'positive': {
            name: 'Elena Rostova', avatar: 'ER', stars: 5,
            quote: 'Nurse practitioner Sarah explained the entire microneedling treatment clearly. Skin looks glowing 5 days later!',
            sentiment: 'Positive', topic: 'Microneedling & Consultation', employee: 'Sarah (NP)', safety: 'Clear',
            tone: 'Clinical & Warm',
            reply: 'Thank you for trusting us with your skincare journey, Elena! Sarah and our entire clinic team are delighted with your glowing results.',
            decision: 'Safe to Auto-Publish', decisionSub: 'Standard treatment compliment passed auto-publish rules.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Maria Santos', avatar: 'MS', stars: 3,
            quote: 'Treatment was fine, but appointment started 35 minutes late and reception was disorganized.',
            sentiment: 'Scheduling Delay', topic: 'Wait Time & Front Desk', employee: 'Reception', safety: 'Flagged',
            tone: 'Polite & Accountable',
            reply: 'Thank you for your feedback, Maria. We apologize for the delay during your appointment and are refining our scheduling intervals to respect your time.',
            decision: 'Needs Approval', decisionSub: 'Clinic delay feedback held for Medical Director review.', decisionType: 'approval', status: 'Pending Clinic Director'
        },
        'sensitive': {
            name: 'Danielle Vance', avatar: 'DV', stars: 1,
            quote: 'Second-degree blistering and pigmentation scars after laser resurfacing. Medical malpractice inquiry opened!',
            sentiment: 'Severe Medical Adverse Event', topic: 'Laser Scarring & Malpractice', employee: 'Laser Tech', safety: 'BLOCKED',
            tone: 'Strict Clinical Legal Hold',
            reply: '[Auto-Publishing Blocked] Medical adverse event detected. Public reply suppressed; incident escalated immediately to Medical Director & Legal Risk Lead.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Clinical adverse event triggered emergency suppression.', decisionType: 'blocked', status: 'Escalated to Medical Director'
        }
    },
    'contractors': {
        'positive': {
            name: 'Greg Wilson', avatar: 'GW', stars: 5,
            quote: 'Replaced our 2,400 sq ft roof in two days flat. Left the yard completely spotless with magnetic nail sweeps.',
            sentiment: 'Positive', topic: 'Roofing Replacement & Clean-Up', employee: 'Crew', safety: 'Clear',
            tone: 'Direct & Professional',
            reply: 'Thank you for the five-star review, Greg! Our roofing crew takes great pride in efficient work and thorough yard clean-up. We appreciate your recommendation!',
            decision: 'Safe to Auto-Publish', decisionSub: 'Job completion compliment passed auto-publish criteria.', decisionType: 'auto', status: 'Auto-Published'
        },
        'negative': {
            name: 'Lisa Ray', avatar: 'LR', stars: 3,
            quote: 'Work was completed on time, but crew left several sharp roofing nails near our garage door tires.',
            sentiment: 'Site Hygiene', topic: 'Nails & Clean-up Oversight', employee: 'Crew', safety: 'Flagged',
            tone: 'Accountable & Action-Oriented',
            reply: 'Thank you for letting us know, Lisa. We apologize for the leftover nails. A foreman will perform an additional magnetic sweep of your driveway today.',
            decision: 'Needs Approval', decisionSub: 'Site safety oversight held for Project Manager sign-off.', decisionType: 'approval', status: 'Pending Project Manager'
        },
        'sensitive': {
            name: 'Gary Oldman', avatar: 'GO', stars: 1,
            quote: 'They drilled through a main waterline flooding our finished basement and drywall! Huge water damage claim!',
            sentiment: 'Property Damage', topic: 'Flooding & Structural Loss', employee: 'None', safety: 'BLOCKED',
            tone: 'Insurance & Owner Hold',
            reply: '[Auto-Publishing Blocked] Major water damage claim detected. General contractor and insurance lead alerted immediately.',
            decision: 'Auto-Publishing Blocked', decisionSub: 'Structural property damage trigger activated. Auto-publishing blocked.', decisionType: 'blocked', status: 'Escalated to Contractor Lead'
        }
    }
};

const HOME_SIM_PRESETS_ES = {
    'hotels': {
        'positive': {
            name: 'Roberto Vance', avatar: 'RV', stars: 5,
            quote: 'El equipo de recepción nos mejoró la suite por nuestro aniversario y el desayuno fue excelente. ¡Hospitalidad impecable!',
            sentiment: 'Positivo', topic: 'Recepción y Habitación', employee: 'Recepción', safety: 'Despejado',
            tone: 'Hospitalario y Cálido',
            reply: '¡Muchas gracias por celebrar su aniversario con nosotros, Roberto! Nos alegra saber que nuestro equipo hizo su estancia tan especial. Esperamos darle la bienvenida nuevamente.',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Elogio rutinario pasó los criterios de auto-publicación.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Sara Connor', avatar: 'SC', stars: 3,
            quote: 'El check-in tardó más de 30 minutos y el aire acondicionado de la habitación 204 hizo ruido toda la noche.',
            sentiment: 'Constructivo / Retraso', topic: 'Check-in y Mantenimiento AC', employee: 'Ninguno', safety: 'Marcado',
            tone: 'Atento y Disculpatorio',
            reply: 'Gracias por sus comentarios, Sara. Lamentamos la demora en el check-in y el ruido del climatizador. Mantenimiento ya ha revisado la habitación 204.',
            decision: 'Requiere Aprobación', decisionSub: 'Demora y queja de mantenimiento retenidas para aprobación del gerente.', decisionType: 'approval', status: 'Pendiente Revisión de Gerente'
        },
        'sensitive': {
            name: 'Marcos Brody', avatar: 'MB', stars: 1,
            quote: '¡Encontré chinches en la habitación 312 y el encargado nocturno se negó a devolvernos el dinero!',
            sentiment: 'Incidente Crítico', topic: 'Plagas e Higiene', employee: 'Encargado Nocturno', safety: 'BLOQUEADO',
            tone: 'Escalada a Dirección',
            reply: '[Auto-Publicación Bloqueada] Reclamo delicado de plagas detectado. Reporte enviado inmediatamente al Director General.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Filtro de salud e higiene activado. Publicación automática suprimida.', decisionType: 'blocked', status: 'Escalado a Dirección General'
        }
    },
    'restaurants': {
        'positive': {
            name: 'Sofía Jenkins', avatar: 'SJ', stars: 5,
            quote: '¡La lasaña estuvo increíble y nuestro camarero Alex fue super atento! La mejor cena italiana de la ciudad.',
            sentiment: 'Positivo', topic: 'Comida y Personal', employee: 'Alex', safety: 'Despejado',
            tone: 'Cálido y Agradecido',
            reply: '¡Muchísimas gracias por tus amables palabras, Sofía! Nos emociona que disfrutaras de la lasaña y la atención de Alex. Le transmitiremos tu felicitación.',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Regla: elogios de 4-5 estrellas se publican de inmediato.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Marcos Davis', avatar: 'MD', stars: 3,
            quote: 'La comida estuvo buena pero esperamos 45 minutos por mesa a pesar de tener reserva confirmada.',
            sentiment: 'Neutral / Retraso', topic: 'Tiempo de Espera', employee: 'Ninguno', safety: 'Marcado',
            tone: 'Empático y Responsable',
            reply: 'Gracias por compartir tu opinión, Marcos. Nos disculpamos sinceramente por la espera de 45 minutos. Estamos revisando la gestión de reservas para evitar esto.',
            decision: 'Requiere Aprobación', decisionSub: 'Retenido para revisión al tener calificación inferior a 4 estrellas.', decisionType: 'approval', status: 'Pendiente Encargado de Sala'
        },
        'sensitive': {
            name: 'David Chen', avatar: 'DC', stars: 1,
            quote: 'Avisé de mi alergia severa a los frutos secos. La salsa contenía aceite de cacahuete y necesité inyección de adrenalina.',
            sentiment: 'Riesgo Crítico', topic: 'Alérgenos y Seguridad Alimentaria', employee: 'Ninguno', safety: 'BLOQUEADO',
            tone: 'Retención Urgente Gerencia',
            reply: '[Auto-Publicación Bloqueada] Incidente crítico de alérgenos detectado. Notificación prioritaria enviada a Dirección y Jefe de Cocina.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Riesgo sanitario grave bloqueó la respuesta automática.', decisionType: 'blocked', status: 'Escalado a Dueño y Dirección'
        }
    },
    'auto-repair': {
        'positive': {
            name: 'Carlos Méndez', avatar: 'CM', stars: 5,
            quote: 'Diagnóstico honesto y precio justo. Cambiaron las pastillas de freno y tuvieron el coche antes de las 15:00.',
            sentiment: 'Positivo', topic: 'Frenos y Puntualidad', employee: 'Equipo Taller', safety: 'Despejado',
            tone: 'Profesional y Cordial',
            reply: '¡Muchas gracias por su reseña, Carlos! Nos alegra haber completado el cambio de frenos antes de lo previsto y agradecemos su confianza en nuestro taller.',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Elogio de servicio rutinario cumple reglas de publicación.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Jennifer Wu', avatar: 'JW', stars: 3,
            quote: 'El cambio de aceite bien, pero el presupuesto para los discos de freno era 120€ más caro que en otro taller cercano.',
            sentiment: 'Discrepancia Precio', topic: 'Presupuesto de Discos', employee: 'Ninguno', safety: 'Marcado',
            tone: 'Transparente y Explicativo',
            reply: 'Gracias por su comentario, Jennifer. Agradecemos su visita para el cambio de aceite y nos gustaría explicarle la garantía de piezas originales que usamos.',
            decision: 'Requiere Aprobación', decisionSub: 'Consulta de tarifas retenida para revisión del asesor técnico.', decisionType: 'approval', status: 'Pendiente Asesor Técnico'
        },
        'sensitive': {
            name: 'Kevin O\'Connor', avatar: 'KO', stars: 1,
            quote: 'Dejaron los tornillos de la rueda sueltos tras rotar neumáticos y saltaron en plena autopista. ¡Una negligencia total!',
            sentiment: 'Riesgo Mecánico Severo', topic: 'Tornillos Sueltos / Seguridad Vial', employee: 'Mecánico', safety: 'BLOQUEADO',
            tone: 'Escalada Inmediata a Jefe de Taller',
            reply: '[Auto-Publicación Bloqueada] Incidente de seguridad mecánica detectado. Notificación enviada al Jefe de Taller.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Peligro vial activó bloqueo de emergencia.', decisionType: 'blocked', status: 'Escalado a Jefe de Taller'
        }
    },
    'dentists': {
        'positive': {
            name: 'Amanda Foster', avatar: 'AF', stars: 5,
            quote: 'Tengo fobia al dentista, pero la Dra. Chen y Lisa fueron súper cariñosas y no sentí ningún dolor durante la endodoncia.',
            sentiment: 'Positivo', topic: 'Endodoncia y Trato al Paciente', employee: 'Dra. Chen y Lisa', safety: 'Despejado',
            tone: 'Compasivo y Cercano',
            reply: '¡Muchísimas gracias, Amanda! Que nuestros pacientes se sientan tranquilos es nuestra prioridad. La Dra. Chen y Lisa estarán encantadas de leerte.',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Elogio de paciente pasó los controles de seguridad.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Brian Miller', avatar: 'BM', stars: 3,
            quote: 'La limpieza dental fue buena, pero en recepción me cobraron un extra sin avisar previamente de la cobertura del seguro.',
            sentiment: 'Duda de Facturación', topic: 'Cobertura de Seguro Dental', employee: 'Recepción', safety: 'Marcado',
            tone: 'Solícito y Aclaratorio',
            reply: 'Gracias por tu reseña, Brian. Lamentamos cualquier malentendido con la cobertura de tu póliza y nuestro equipo de administración está revisando tu caso.',
            decision: 'Requiere Aprobación', decisionSub: 'Retenido para validación por la dirección de la clínica.', decisionType: 'approval', status: 'Pendiente Dirección Clínica'
        },
        'sensitive': {
            name: 'Raquel Scott', avatar: 'RS', stars: 1,
            quote: 'La extracción causó daño nervioso severo y parálisis facial temporal. Estoy consultando con abogados especializados.',
            sentiment: 'Legal / Mala Praxis', topic: 'Lesión Nerviosa y Acción Legal', employee: 'Cirujano', safety: 'BLOQUEADO',
            tone: 'Retención Legal Estricta',
            reply: '[Auto-Publicación Bloqueada] Reclamación legal y clínica detectada. Respuesta pública suprimida y escalada a Dirección y Asesoría Legal.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Amenaza legal y complicación médica activaron bloqueo.', decisionType: 'blocked', status: 'Escalado a Dirección y Legal'
        }
    },
    'salons-spas': {
        'positive': {
            name: 'Claudia Bennett', avatar: 'CB', stars: 5,
            quote: '¡Maya hizo magia con mi balayage! El color quedó idéntico a las fotos de referencia y mi cabello súper brillante.',
            sentiment: 'Positivo', topic: 'Balayage y Brillo', employee: 'Maya', safety: 'Despejado',
            tone: 'Estiloso y Cálido',
            reply: '¡Muchas gracias, Claudia! A Maya le encantará saber lo contenta que estás con tu balayage. ¡Te esperamos para tu próximo mantenimiento!',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Elogio a estilista publicado bajo regla de feedback positivo.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Jésica Taylor', avatar: 'JT', stars: 3,
            quote: 'El corte está bien, pero el matizador se volvió cobrizo tras solo dos lavados. Esperaba mayor duración.',
            sentiment: 'Técnico Capilar', topic: 'Durabilidad del Matizador', employee: 'Estilista', safety: 'Marcado',
            tone: 'Servicial y Conciliador',
            reply: 'Gracias por comentárnoslo, Jésica. Queremos que tu tono quede perfecto; por favor contáctanos para agendar un retoque de matiz sin coste.',
            decision: 'Requiere Aprobación', decisionSub: 'Inquietud de color retenida para la responsable del salón.', decisionType: 'approval', status: 'Pendiente Responsable Salón'
        },
        'sensitive': {
            name: 'Andrea Morgan', avatar: 'AM', stars: 1,
            quote: 'Me dejaron la decoloración 50 minutos sin vigilar. ¡Tengo quemaduras químicas en el cuero cabelludo y se me cae el pelo!',
            sentiment: 'Lesión Severa', topic: 'Quemadura Química Capilar', employee: 'Colorista', safety: 'BLOQUEADO',
            tone: 'Retención Urgente Dirección',
            reply: '[Auto-Publicación Bloqueada] Queja de quemadura química detectada. Respuesta retenida y alerta enviada a la propietaria del salón.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Filtro de quemaduras químicas y lesiones activado.', decisionType: 'blocked', status: 'Escalado a Dirección de Salón'
        }
    },
    'medspas': {
        'positive': {
            name: 'Elena Rostova', avatar: 'ER', stars: 5,
            quote: 'La enfermera Sarah me explicó todo el tratamiento de microneedling con detalle. ¡Mi piel luce radiante 5 días después!',
            sentiment: 'Positivo', topic: 'Microneedling y Consulta', employee: 'Sarah', safety: 'Despejado',
            tone: 'Clínico y Cálido',
            reply: '¡Gracias por confiar en nosotros para cuidar tu piel, Elena! A Sarah y a todo el equipo clínico les encantará leer tus resultados.',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Comentario rutinario de tratamiento aprobado automáticamente.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'María Santos', avatar: 'MS', stars: 3,
            quote: 'El tratamiento estuvo bien, pero la cita empezó con 35 minutos de retraso y en recepción había desorden.',
            sentiment: 'Demora de Agenda', topic: 'Tiempo de Espera en Recepción', employee: 'Recepción', safety: 'Marcado',
            tone: 'Atento y Responsable',
            reply: 'Gracias por tu feedback, María. Te pedimos disculpas por el retraso en tu cita y estamos ajustando los intervalos para respetar tu tiempo.',
            decision: 'Requiere Aprobación', decisionSub: 'Queja de retraso retenida para revisión de dirección.', decisionType: 'approval', status: 'Pendiente Dirección Médica'
        },
        'sensitive': {
            name: 'Daniela Vance', avatar: 'DV', stars: 1,
            quote: 'Ampollas de segundo grado y cicatrices oscuras tras el láser fraccionado. ¡Iniciando acciones legales por negligencia médica!',
            sentiment: 'Efecto Adverso Médico Grave', topic: 'Cicatrices Láser y Mala Praxis', employee: 'Operadora Láser', safety: 'BLOQUEADO',
            tone: 'Retención Médica Legal',
            reply: '[Auto-Publicación Bloqueada] Evento médico adverso detectado. Respuesta pública cancelada; escalado directo a Director Médico y Legal.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Complicación clínica grave activó supresión de emergencia.', decisionType: 'blocked', status: 'Escalado a Director Médico'
        }
    },
    'contractors': {
        'positive': {
            name: 'Gregorio Wilson', avatar: 'GW', stars: 5,
            quote: 'Cambiaron los 220 m² de tejado en dos días. Dejaron el jardín impecable pasando imanes para recoger todos los clavos.',
            sentiment: 'Positivo', topic: 'Reparación de Tejado y Limpieza', employee: 'Cuadrilla', safety: 'Despejado',
            tone: 'Profesional y Resolutivo',
            reply: '¡Muchas gracias por su reseña, Gregorio! Nuestro equipo se esmera en trabajar rápido y dejar todo limpio. ¡Agradecemos su recomendación!',
            decision: 'Seguro para Auto-Publicar', decisionSub: 'Felicitación de obra completada aprobada automáticamente.', decisionType: 'auto', status: 'Auto-Publicado'
        },
        'negative': {
            name: 'Luisa Ray', avatar: 'LR', stars: 3,
            quote: 'La obra terminó a tiempo, pero dejaron varios clavos del tejado tirados cerca de las ruedas de nuestro garaje.',
            sentiment: 'Limpieza de Obra', topic: 'Clavos Abandonados en Parcela', employee: 'Cuadrilla', safety: 'Marcado',
            tone: 'Responsable y Proactivo',
            reply: 'Gracias por informarnos, Luisa. Le pedimos disculpas por ese descuido. Un encargado pasará hoy mismo a realizar un barrido magnético de su entrada.',
            decision: 'Requiere Aprobación', decisionSub: 'Incidencia de seguridad en obra retenida para el jefe de proyecto.', decisionType: 'approval', status: 'Pendiente Jefe de Proyecto'
        },
        'sensitive': {
            name: 'Tomás Harrison', avatar: 'TH', stars: 1,
            quote: '¡Perforaron la tubería principal e inundaron el sótano terminado! Reclamación millonaria de daños estructurales.',
            sentiment: 'Daño Estructural a Propiedad', topic: 'Inundación y Daño en Vivienda', employee: 'Ninguno', safety: 'BLOQUEADO',
            tone: 'Retención de Seguros y Gerencia',
            reply: '[Auto-Publicación Bloqueada] Reclamo grave de daños por agua detectado. Alerta enviada al contratista principal y a la aseguradora.',
            decision: 'Auto-Publicación Bloqueada', decisionSub: 'Daño estructural activó bloqueo de seguridad.', decisionType: 'blocked', status: 'Escalado a Contratista Principal'
        }
    }
};

const HOME_SIM_PRESETS_NL = {
    'hotels': {
        'positive': {
            name: 'Robert Vance', avatar: 'RV', stars: 5,
            quote: 'Het receptieteam heeft onze suite kosteloos geüpgraded voor ons jubileum en het ontbijt was voortreffelijk. Fantastische gastvrijheid!',
            sentiment: 'Positief', topic: 'Receptie & Suite', employee: 'Receptie', safety: 'Veilig',
            tone: 'Gastvrij & Warm',
            reply: 'Hartelijk dank dat u uw jubileum bij ons vierde, Robert! We zijn verheugd dat ons team uw verblijf speciaal heeft gemaakt en verwelkomen u graag snel weer.',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Standaard gastencompliment voldoet aan publicatiecriteria.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Sara Connor', avatar: 'SC', stars: 3,
            quote: 'Het inchecken duurde ruim 30 minuten en de airconditioning op kamer 204 maakte de hele nacht lawaai.',
            sentiment: 'Constructief / Vertraging', topic: 'Inchecken & Airco-onderhoud', employee: 'Geen', safety: 'Gemarkeerd',
            tone: 'Attent & Begripvol',
            reply: 'Bedankt voor uw feedback, Sara. Onze excuses voor de wachttijd bij het inchecken en het geluid van de airco. Ons onderhoudsteam heeft kamer 204 direct gecontroleerd.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Wachttijd en onderhoudsklacht vastgehouden voor beoordeling manager.', decisionType: 'approval', status: 'In afwachting van manager'
        },
        'sensitive': {
            name: 'Mark Brody', avatar: 'MB', stars: 1,
            quote: 'Bedwantsen aangetroffen in kamer 312 en de nachtmanager weigerde ons te helpen of een terugbetaling te geven!',
            sentiment: 'Kritiek Incident', topic: 'Ongedierte / Hygiëneklacht', employee: 'Nachtmanager', safety: 'GEBLOKKEERD',
            tone: 'Directe Escalatie Directie',
            reply: '[Automatisch Publiceren Geblokkeerd] Gevoelige hygiëneklacht gedetecteerd. Incidentrapport direct doorgestuurd naar de Algemeen Directeur.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Gezondheids- en hygiënetrigger geactiveerd. Reactie onderdrukt.', decisionType: 'blocked', status: 'Geëscaleerd naar Directie'
        }
    },
    'restaurants': {
        'positive': {
            name: 'Sanne Jenkins', avatar: 'SJ', stars: 5,
            quote: 'De lasagne was verrukkelijk en onze ober Alex was ontzettend attent. Beste Italiaanse diner in de stad!',
            sentiment: 'Positief', topic: 'Eten & Bediening', employee: 'Alex', safety: 'Veilig',
            tone: 'Warm & Hartelijk',
            reply: 'Hartelijk dank voor uw lovende woorden, Sanne! Fijn om te horen dat u genoot van de lasagne en Alex zijn service. We geven het compliment direct aan hem door!',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Regel: 4-5 sterren lof wordt direct gepubliceerd.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Mark Davis', avatar: 'MD', stars: 3,
            quote: 'Het eten was goed, maar we moesten 45 minuten wachten op onze tafel ondanks een bevestigde reservering.',
            sentiment: 'Neutraal / Wachttijd', topic: 'Tafelreservering & Wachttijd', employee: 'Geen', safety: 'Gemarkeerd',
            tone: 'Verontschuldigend & Oplossingsgericht',
            reply: 'Bedankt voor uw feedback, Mark. Onze oprechte excuses voor de wachttijd van 45 minuten ondanks uw reservering. We herzien onze planning om dit te voorkomen.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Vastgehouden voor beoordeling omdat beoordeling lager is dan 4 sterren.', decisionType: 'approval', status: 'In afwachting van gastheer'
        },
        'sensitive': {
            name: 'David Chen', avatar: 'DC', stars: 1,
            quote: 'Expliciet gevraagd om pindavrij gerecht wegens ernstige allergie. De saus bevatte pindaolie, EpiPen was noodzakelijk!',
            sentiment: 'Levensbedreigend Risico', topic: 'Allergie & Voedselveiligheid', employee: 'Geen', safety: 'GEBLOKKEERD',
            tone: 'Uiterst Dringende Directie-stop',
            reply: '[Automatisch Publiceren Geblokkeerd] Ernstig allergie-incident gedetecteerd. Melding met spoed naar eigenaar en keukenchef gestuurd.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Gezondheidsrisico activeerde noodblokkade.', decisionType: 'blocked', status: 'Geëscaleerd naar Eigenaar'
        }
    },
    'auto-repair': {
        'positive': {
            name: 'Carlos Mendez', avatar: 'CM', stars: 5,
            quote: 'Eerlijke diagnose en scherpe prijzen. Remmen vervangen en de auto stond voor 15:00 alweer klaar. Topservice!',
            sentiment: 'Positief', topic: 'Remservice & Tijdigheid', employee: 'Werkplaatsteam', safety: 'Veilig',
            tone: 'Deskundig & Vriendelijk',
            reply: 'Hartelijk dank voor de mooie recensie, Carlos! Fijn dat uw remservice snel en soepel is verlopen. Dank voor het vertrouwen in onze garage!',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Standaard compliment over remreparatie goedgekeurd.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Jennifer Wu', avatar: 'JW', stars: 3,
            quote: 'De olieverversing was prima, maar de prijsopgave voor nieuwe remschijven was €120 duurder dan bij de buurgarage.',
            sentiment: 'Prijsverschil', topic: 'Offerte Remschijven', employee: 'Geen', safety: 'Gemarkeerd',
            tone: 'Helder & Informerend',
            reply: 'Dank voor uw feedback, Jennifer. Fijn dat de olieverversing naar wens was. We lichten graag toe waarom we uitsluitend werken met originele merkonderdelen en garantie.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Prijsvraag vastgehouden voor beoordeling werkplaatschef.', decisionType: 'approval', status: 'In afwachting van chef'
        },
        'sensitive': {
            name: 'Kevin O\'Connor', avatar: 'KO', stars: 1,
            quote: 'Wielbouten niet goed aangedraaid na bandenwissel; wiel kwam los op de snelweg! Levensgevaarlijke nalatigheid!',
            sentiment: 'Mechanisch Veiligheidsrisico', topic: 'Losgeraakt Wiel / Verkeersveiligheid', employee: 'Monteur', safety: 'GEBLOKKEERD',
            tone: 'Onmiddellijke Directie-escalatie',
            reply: '[Automatisch Publiceren Geblokkeerd] Ernstig technisch veiligheidsincident. Spoedmelding verzonden naar werkplaatsleider en directie.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Verkeersveiligheidstrigger activeerde blokkade.', decisionType: 'blocked', status: 'Geëscaleerd naar Werkplaatschef'
        }
    },
    'dentists': {
        'positive': {
            name: 'Amanda Foster', avatar: 'AF', stars: 5,
            quote: 'Ik heb enorme tandartsangst, maar tandarts Chen en assistente Lisa stelden me zo gerust tijdens de wortelkanaalbehandeling.',
            sentiment: 'Positief', topic: 'Patiëntenzorg & Behandeling', employee: 'Dr. Chen & Lisa', safety: 'Veilig',
            tone: 'Empathisch & Professioneel',
            reply: 'Hartelijk dank Amanda! Patiënten geruststellen is onze topprioriteit. Dr. Chen en Lisa zullen uw fijne woorden met veel plezier lezen.',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Positieve patiëntervaring goedgekeurd.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Brian Miller', avatar: 'BM', stars: 3,
            quote: 'Gebitsreiniging was vakkundig, maar de balie rekende een code zonder vooraf te controleren of de verzekering dit dekt.',
            sentiment: 'Declaratie-onduidelijkheid', topic: 'Zorgverzekering & Facturatie', employee: 'Balie', safety: 'Gemarkeerd',
            tone: 'Ondersteunend & Verhelderend',
            reply: 'Dank voor uw bericht, Brian. Onze excuses voor de verwarring over de vergoeding. Onze praktijkadministratie kijkt uw declaratie vandaag direct na.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Declaratievraag vastgehouden voor praktijkmanager.', decisionType: 'approval', status: 'In afwachting van praktijkmanager'
        },
        'sensitive': {
            name: 'Rachel Scott', avatar: 'RS', stars: 1,
            quote: 'Trekken van kies leidde tot zenuwbeschadiging en tijdelijke aangezichtsverlamming. Medisch tuchtcollege en letselschadejurist ingeschakeld.',
            sentiment: 'Medische Aansprakelijkheid', topic: 'Zenuwletsel & Juridische Stappen', employee: 'Kaakchirurg', safety: 'GEBLOKKEERD',
            tone: 'Juridische Directiestop',
            reply: '[Automatisch Publiceren Geblokkeerd] Medische aansprakelijkheidsclaim gedetecteerd. Publicatie onderdrukt; geëscaleerd naar directie en jurist.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Letselschadeclaim activeerde noodblokkade.', decisionType: 'blocked', status: 'Geëscaleerd naar Directie/Juridisch'
        }
    },
    'salons-spas': {
        'positive': {
            name: 'Chantal Bennett', avatar: 'CB', stars: 5,
            quote: 'Maya toverde mijn haar om met een prachtige balayage! Exact dezelfde tint als mijn voorbeeldfoto en geen beschadiging.',
            sentiment: 'Positief', topic: 'Balayage & Kleurresultaat', employee: 'Maya', safety: 'Veilig',
            tone: 'Stijlvol & Enthousiast',
            reply: 'Super bedankt, Chantal! Maya zal het fantastisch vinden om te horen dat je zo blij bent met je balayage. Tot de volgende opfrisbeurt!',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Compliment voor stylist automatisch goedgekeurd.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Jessica Taylor', avatar: 'JT', stars: 3,
            quote: 'Kapsel zit mooi, maar de toner werd na twee wasbeurten al koperachtig. Ik verwachtte een langere houdbaarheid.',
            sentiment: 'Technisch Kleuradvies', topic: 'Houdbaarheid Kleurtoner', employee: 'Stylist', safety: 'Gemarkeerd',
            tone: 'Servicegericht & Uitnodigend',
            reply: 'Dank voor je eerlijke review, Jessica. We willen dat je kleur perfect blijft. Neem gerust contact op, dan plannen we kosteloos een toner-opfrissing voor je in!',
            decision: 'Vereist Goedkeuring', decisionSub: 'Kleurbehoud-feedback vastgehouden voor saloneigenaar.', decisionType: 'approval', status: 'In afwachting van saloneigenaar'
        },
        'sensitive': {
            name: 'Ashley Morgan', avatar: 'AM', stars: 1,
            quote: 'Blondeermiddel 50 minuten op hoofdhuid laten zitten zonder toezicht. Chemische brandwonden en haar valt met plukken uit!',
            sentiment: 'Ernstig Letsel', topic: 'Chemische Brandwond Hoofdhuid', employee: 'Colorist', safety: 'GEBLOKKEERD',
            tone: 'Directe Directie-stop',
            reply: '[Automatisch Publiceren Geblokkeerd] Ernstige letselklacht gedetecteerd. Reactie onderdrukt en melding direct naar de eigenaresse verzonden.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Veiligheidsfilter voor chemisch letsel geactiveerd.', decisionType: 'blocked', status: 'Geëscaleerd naar Eigenaresse'
        }
    },
    'medspas': {
        'positive': {
            name: 'Elena Rostova', avatar: 'ER', stars: 5,
            quote: 'Verpleegkundig specialist Sarah legde de microneedling-behandeling stap voor stap uit. Huid straalt enorm na 5 dagen!',
            sentiment: 'Positief', topic: 'Microneedling & Intake', employee: 'Sarah', safety: 'Veilig',
            tone: 'Klinisch & Warm',
            reply: 'Dank voor uw vertrouwen in onze kliniek, Elena! Fijn om te horen dat uw huid straalt na de microneedling bij Sarah.',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Standaard behandelingscompliment automatisch goedgekeurd.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Maria Santos', avatar: 'MS', stars: 3,
            quote: 'Behandeling was goed, maar de afspraak liep 35 minuten uit en de receptie maakte een chaotische indruk.',
            sentiment: 'Planningsvertraging', topic: 'Wachttijd & Receptie', employee: 'Receptie', safety: 'Gemarkeerd',
            tone: 'Correct & Begripvol',
            reply: 'Bedankt voor uw feedback, Maria. Onze excuses voor het uitlopen van uw afspraak. We hebben onze agendaplanning aangescherpt om uw tijd te respecteren.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Kliniekvertraging vastgehouden voor praktijkmanager.', decisionType: 'approval', status: 'In afwachting van praktijkmanager'
        },
        'sensitive': {
            name: 'Danielle Vance', avatar: 'DV', stars: 1,
            quote: 'Tweedegraads brandblaren en pigmentvlekken na laserbehandeling. Formele klacht wegens medische fout ingediend!',
            sentiment: 'Ernstige Medische Complicatie', topic: 'Laserwonden & Aansprakelijkheid', employee: 'Lasertherapeut', safety: 'GEBLOKKEERD',
            tone: 'Medisch-Juridische Blokkade',
            reply: '[Automatisch Publiceren Geblokkeerd] Medisch incident gedetecteerd. Reactie onderdrukt; melding direct naar Medisch Directeur gestuurd.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Medische complicatie activeerde noodblokkade.', decisionType: 'blocked', status: 'Geëscaleerd naar Medisch Directeur'
        }
    },
    'contractors': {
        'positive': {
            name: 'Gert Wilson', avatar: 'GW', stars: 5,
            quote: 'Nieuw dak van 220 m² in twee dagen gelegd. De tuin werd keurig achtergelaten na een magneetronde voor spijkers.',
            sentiment: 'Positief', topic: 'Dakvervanging & Opruimronde', employee: 'Ploeg', safety: 'Veilig',
            tone: 'Vakkundig & Direct',
            reply: 'Hartelijk dank voor de uitstekende recensie, Gert! Onze dakdekkers zijn trots op snel en schoon werk. Dank voor uw aanbeveling!',
            decision: 'Veilig voor Automatisch Publiceren', decisionSub: 'Opleveringscompliment voldoet aan publicatiecriteria.', decisionType: 'auto', status: 'Automatisch Gepubliceerd'
        },
        'negative': {
            name: 'Lisa Ray', avatar: 'LR', stars: 3,
            quote: 'Werkzaamheden op tijd klaar, maar de ploeg liet meerdere dakspijkers liggen vlak voor onze garagebanden.',
            sentiment: 'Werfhygiëne', topic: 'Achtergebleven Spijkers op Oprit', employee: 'Ploeg', safety: 'Gemarkeerd',
            tone: 'Oplossingsgericht & Zorgvuldig',
            reply: 'Bedankt voor het melden, Lisa. Onze excuses voor de achtergebleven spijkers. Een voorman komt vandaag direct langs met een magneetrol om uw oprit schoon te maken.',
            decision: 'Vereist Goedkeuring', decisionSub: 'Veiligheidsschoonmaak vastgehouden voor projectleider.', decisionType: 'approval', status: 'In afwachting van projectleider'
        },
        'sensitive': {
            name: 'Tom Harrison', avatar: 'TH', stars: 1,
            quote: 'Hoofdwaterleiding doorboord waardoor het afgewerkte souterrain volledig is ondergelopen! Enorme waterschadeclaim!',
            sentiment: 'Structurele Schade', topic: 'Waterschade & Lekkage', employee: 'Geen', safety: 'GEBLOKKEERD',
            tone: 'Verzekerings- en Directiestop',
            reply: '[Automatisch Publiceren Geblokkeerd] Grote waterschadeclaim gedetecteerd. Hoofdaannemer en verzekeringsexpert direct op de hoogte gebracht.',
            decision: 'Automatisch Publiceren Geblokkeerd', decisionSub: 'Materiële schade activeerde noodblokkade.', decisionType: 'blocked', status: 'Geëscaleerd naar Hoofdaannemer'
        }
    }
};

const HOME_SIM_PRESETS = HOME_SIM_PRESETS_EN;

let currentSimScenario = 'positive';

function selectSimScenario(scen) {
    currentSimScenario = scen;
    ['positive', 'negative', 'sensitive'].forEach(s => {
        const btn = document.getElementById('sim-btn-' + s);
        if (btn) {
            if (s === scen) {
                btn.style.borderColor = 'var(--primary)';
                btn.style.background = '#FFFFFF';
                btn.classList.add('active');
            } else {
                btn.style.borderColor = '#E2E8F0';
                btn.style.background = '#FFFFFF';
                btn.classList.remove('active');
            }
        }
    });
    runHomepageSimulation();
}

function runHomepageSimulation() {
    const sel = document.getElementById('homeSimIndustry');
    const ind = sel ? sel.value : 'restaurants';
    const lang = getSimLang();
    
    let presetsPool = HOME_SIM_PRESETS_EN;
    if (lang === 'es') presetsPool = HOME_SIM_PRESETS_ES;
    if (lang === 'nl') presetsPool = HOME_SIM_PRESETS_NL;

    const presets = presetsPool[ind] || presetsPool['restaurants'] || HOME_SIM_PRESETS_EN['restaurants'];
    const data = presets[currentSimScenario] || presets['positive'];

    // Update DOM safely
    const avatar = document.getElementById('simReviewerAvatar');
    const name = document.getElementById('simReviewerName');
    const stars = document.getElementById('simDisplayStars');
    const quote = document.getElementById('simReviewQuote');
    const sentiment = document.getElementById('simSentiment');
    const topic = document.getElementById('simTopic');
    const employee = document.getElementById('simEmployee');
    const safety = document.getElementById('simSafety');
    const tone = document.getElementById('simTone');
    const responseText = document.getElementById('simResponseText');
    const decisionBar = document.getElementById('simDecisionBar');
    const decisionBadge = document.getElementById('simDecisionBadge');
    const decisionSub = document.getElementById('simDecisionSub');
    const publishStatus = document.getElementById('simPublishStatus');

    if (avatar) avatar.textContent = data.avatar;
    if (name) name.textContent = data.name;
    if (stars) {
        let starsStr = '';
        for (let i = 1; i <= 5; i++) starsStr += (i <= data.stars ? '★' : '☆');
        stars.textContent = starsStr;
    }
    if (quote) quote.textContent = '"' + data.quote + '"';
    if (sentiment) sentiment.textContent = data.sentiment;
    if (topic) topic.textContent = data.topic;
    if (employee) {
        employee.textContent = data.employee;
        const isNone = data.employee === 'None' || data.employee === 'Ninguno' || data.employee === 'Geen';
        employee.style.color = isNone ? '#64748B' : '#10B981';
    }
    if (safety) {
        safety.textContent = data.safety;
        const isClear = data.safety === 'Clear' || data.safety === 'Despejado' || data.safety === 'Veilig';
        const isBlocked = data.safety === 'BLOCKED' || data.safety === 'BLOQUEADO' || data.safety === 'GEBLOKKEERD';
        safety.style.color = isClear ? '#10B981' : (isBlocked ? '#EF4444' : '#F59E0B');
    }
    if (tone) tone.textContent = data.tone;
    if (responseText) responseText.textContent = data.reply;

    if (decisionBadge) {
        decisionBadge.textContent = data.decision;
        decisionBadge.className = 'review-badge badge-' + data.decisionType;
    }
    if (decisionSub) decisionSub.textContent = data.decisionSub;
    if (publishStatus) {
        publishStatus.textContent = data.status;
        publishStatus.style.color = data.decisionType === 'auto' ? '#10B981' : (data.decisionType === 'blocked' ? '#EF4444' : '#F59E0B');
    }
    if (decisionBar) {
        if (data.decisionType === 'auto') {
            decisionBar.style.background = 'rgba(16, 185, 129, 0.08)';
            decisionBar.style.borderColor = 'rgba(16, 185, 129, 0.25)';
        } else if (data.decisionType === 'approval') {
            decisionBar.style.background = 'rgba(245, 158, 11, 0.08)';
            decisionBar.style.borderColor = 'rgba(245, 158, 11, 0.25)';
        } else {
            decisionBar.style.background = 'rgba(239, 68, 68, 0.08)';
            decisionBar.style.borderColor = 'rgba(239, 68, 68, 0.25)';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('homeSimIndustry')) {
        runHomepageSimulation();
    }
});
