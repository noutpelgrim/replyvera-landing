import os
import re

es_dir = 'es'
privacy_es = os.path.join(es_dir, 'privacy.html')
terms_es = os.path.join(es_dir, 'terms.html')
cookie_es = os.path.join(es_dir, 'cookie.html')

privacy_content = '''            <div class="content-wrapper">
                <p>ReplyVera ("nosotros", "nuestro") valora tu privacidad y la confianza que depositas en nosotros para manejar tu reputación online. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos tu información cuando utilizas nuestro servicio.</p>

                <h2>1. Información que Recopilamos</h2>
                <p>Recopilamos información para brindar un mejor servicio a todos nuestros usuarios. Esto incluye:</p>
                <ul>
                    <li><strong>Información de la Cuenta:</strong> Cuando te registras, recopilamos tu correo electrónico e información básica del perfil a través de Google OAuth.</li>
                    <li><strong>Datos del Perfil de Empresa de Google:</strong> Para operar nuestro servicio principal, solicitamos acceso a tu Perfil de Empresa de Google. Esto incluye el contenido de las reseñas, los nombres de los revisores y los datos de ubicación.</li>
                    <li><strong>Datos de Uso:</strong> Podemos recopilar información sobre cómo interactúas con nuestro panel para mejorar nuestra interfaz de usuario y el rendimiento de la IA.</li>
                </ul>

                <h2>2. Cómo Usamos la Información</h2>
                <p>Usamos los datos que recopilamos para los siguientes propósitos:</p>
                <ul>
                    <li>Para redactar y publicar respuestas a tus reseñas de Google mediante IA.</li>
                    <li>Para proporcionarte análisis sobre el rendimiento de tus reseñas.</li>
                    <li>Para comunicarnos contigo sobre tu cuenta y actualizaciones del servicio.</li>
                    <li>Para mejorar nuestros algoritmos de IA y generar respuestas más precisas y útiles.</li>
                </ul>

                <h2>3. Uso Limitado de Datos de Usuario de Google</h2>
                <p>El uso y la transferencia de información recibida de las API de Google a cualquier otra aplicación por parte de ReplyVera se adherirá a la <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">Política de Datos de Usuario de los Servicios de la API de Google</a>, incluidos los requisitos de Uso Limitado.</p>
                <p>No usamos tus datos de Google para publicar anuncios y no vendemos tus datos a terceros.</p>

                <h2>4. Retención de Datos</h2>
                <p>Mantenemos tu información mientras tu cuenta permanezca activa. Si desconectas tu cuenta de Google o eliminas tu cuenta de ReplyVera, eliminaremos tus tokens y dejaremos de recopilar datos inmediatamente.</p>

                <h2>5. Seguridad</h2>
                <p>Implementamos medidas de seguridad estándar de la industria, incluido el cifrado en reposo y en tránsito, para proteger tus datos contra el acceso o la divulgación no autorizados.</p>

                <h2>6. Contáctanos</h2>
                <p>Si tienes preguntas sobre esta Política de Privacidad, contáctanos en <a href="mailto:info@replyvera.com">info@replyvera.com</a>.</p>
            </div>'''

terms_content = '''            <div class="content-wrapper">
                <p>Al acceder o usar ReplyVera ("el Servicio"), aceptas estar sujeto a estos Términos de Servicio. Si no estás de acuerdo con estos términos, no utilices nuestro servicio.</p>

                <h2>1. Descripción del Servicio</h2>
                <p>ReplyVera es una herramienta impulsada por IA que redacta y publica automáticamente respuestas a las reseñas de Google para empresas. No garantizamos que las respuestas generadas sean impecables y debes revisar las respuestas siempre que sea posible.</p>

                <h2>2. Responsabilidades del Usuario</h2>
                <p>Eres el único responsable del contenido publicado a través de tu Perfil de Empresa de Google. Aceptas no usar ReplyVera para acosar, difamar, abusar o enviar spam a tus clientes.</p>

                <h2>3. Acceso a la Cuenta de Google</h2>
                <p>Al conectar tu Cuenta de Google, otorgas a ReplyVera permiso para acceder a tu Perfil de Empresa de Google, leer las reseñas y publicar respuestas en tu nombre. Puedes revocar este acceso en cualquier momento a través de la configuración de tu Cuenta de Google o nuestro panel.</p>

                <h2>4. Suscripciones y Pagos</h2>
                <p>ReplyVera es un servicio basado en suscripción. Aceptas pagar todas las tarifas asociadas con tu plan seleccionado. Todos los pagos se procesan a través de nuestro proveedor externo seguro (Paddle). Puedes cancelar tu suscripción en cualquier momento.</p>

                <h2>5. Limitación de Responsabilidad</h2>
                <p>ReplyVera se proporciona "tal cual". No somos responsables de ningún daño, pérdida de reputación o suspensión de cuentas de Google que resulte del uso del Servicio o del contenido de las respuestas generadas por IA.</p>

                <h2>6. Terminación</h2>
                <p>Nos reservamos el derecho de suspender o cancelar tu cuenta a nuestra discreción si violas estos términos o participas en un uso abusivo o perjudicial de nuestro sistema.</p>

                <h2>7. Cambios en los Términos</h2>
                <p>Podemos actualizar estos Términos periódicamente. Tu uso continuo del Servicio después de publicar los cambios constituye tu aceptación de los nuevos Términos.</p>

                <h2>8. Contáctanos</h2>
                <p>Si tienes preguntas sobre estos Términos, contáctanos en <a href="mailto:info@replyvera.com" style="color: var(--primary);">info@replyvera.com</a>.</p>
            </div>'''

cookie_content = '''            <div class="content-wrapper">
                <p>Esta Política de Cookies explica cómo ReplyVera usa cookies y tecnologías similares para reconocerte cuando visitas nuestro sitio web. Explica qué son estas tecnologías, por qué las usamos y tus derechos para controlar su uso.</p>

                <h2>1. ¿Qué son las cookies?</h2>
                <p>Las cookies son pequeños archivos de datos que se colocan en tu computadora o dispositivo móvil cuando visitas un sitio web. Los propietarios de sitios web las utilizan ampliamente para hacer que sus sitios funcionen, o funcionen de manera más eficiente, así como para proporcionar información de análisis.</p>

                <h2>2. ¿Por qué usamos cookies?</h2>
                <p>Usamos cookies de origen y de terceros por varias razones. Algunas cookies son necesarias por motivos técnicos para que nuestro sitio web funcione, y nos referimos a estas como cookies "esenciales" o "estrictamente necesarias". Otras cookies también nos permiten rastrear y dirigir los intereses de nuestros usuarios para mejorar su experiencia.</p>

                <ul>
                    <li><strong>Cookies Esenciales:</strong> Estas cookies son estrictamente necesarias para proporcionarte los servicios disponibles a través de nuestro sitio web y para usar algunas de sus funciones, como el acceso a áreas seguras.</li>
                    <li><strong>Cookies de Autenticación:</strong> Nos ayudan a recordar tu sesión de inicio para que no tengas que volver a autenticarte cada vez que navegas entre el panel de control y el sitio.</li>
                </ul>

                <h2>3. ¿Cómo puedo controlar las cookies?</h2>
                <p>Tienes el derecho de decidir si aceptas o rechazas las cookies. Puedes configurar los controles de tu navegador web para aceptar o rechazar las cookies. Si eliges rechazar las cookies, aún puedes usar nuestro sitio web, aunque tu acceso a algunas funciones o áreas de nuestro sitio podría estar restringido.</p>

                <h2>4. Contáctanos</h2>
                <p>Si tienes preguntas sobre nuestro uso de cookies, contáctanos en <a href="mailto:info@replyvera.com" style="color: var(--primary);">info@replyvera.com</a>.</p>
            </div>'''


def replace_content(filepath, new_content):
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    html = re.sub(r'<div class="content-wrapper">.*?</div>', new_content, html, flags=re.DOTALL)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f'Updated {filepath}')

replace_content(privacy_es, privacy_content)
replace_content(terms_es, terms_content)
replace_content(cookie_es, cookie_content)
