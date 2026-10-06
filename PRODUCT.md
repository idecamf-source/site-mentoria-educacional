# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Undergraduate students of Antonio Meneghetti Faculdade (AMF), Recanto Maestro, RS. Most arrive on a phone, often from a link shared in class groups. Typical situation: something is getting in the way of their studies (learning difficulties, anxiety or stress, career doubts, relationships) and they are deciding whether to book a first conversation. Many are first-time users of the service and may feel hesitant about asking for help.

## Product Purpose

Present the Mentoria Educacional Universitária service of AMF and get students to book a 30-minute session with the mentor. Success: a student understands what the service covers, trusts the mentor, and starts a booking.

## Positioning

An in-house mentoring service run by AMF's psychopedagogical coordinator, Prof. Patrícia da Silva Dias, covering five fronts in one place: learning difficulties, emotional well-being, accessibility and inclusion, career guidance, and interpersonal relationships.

## Operating Context

- Sessions: Monday, Wednesday and Thursday; 30-minute sessions starting at 18:30, 19:00, 19:30, 20:00, 20:30, 21:00, 21:30 and 22:00. Hours may change due to the mentor's commitments.
- Booking: WhatsApp +55 55 99954-6611 (wa.me link with a pre-filled message). Calendly is only a fallback if the number is removed.
- Contact e-mail: patricia.dias@amf.edu.br. Location: Antonio Meneghetti Faculdade, Recanto Maestro, RS.
- Deployed as a static site on Vercel.

## Capabilities and Constraints

- Single landing page (React + Vite + Tailwind v4). No login, no backend in production.
- Copy may be lightly adjusted (shorten, reorder); its substance stays.
- Do not state cost, confidentiality, or format (in-person/online) beyond what the existing copy already says; the user chose not to add these facts.

## Brand Commitments

- Name: "Mentoria Educacional Universitária", tied to Antonio Meneghetti Faculdade.
- Logo exists (`client/public/images/logo.webp`, navy and gold). Palette and visual treatment are open for redesign (user: "tudo livre").
- Must not feel generic (template/coach-site look) or childish (too playful for university students).

## Evidence on Hand

- Presentation video by the mentor, 3:25, with subtitles: `client/public/videos/mentoria-educacional.mp4` (poster: the opening frame, `mentoria-educacional-abertura.jpg`, with AMF and Mentoria logos and the line "Mentoria: sua vantagem para se dar bem nessa jornada!").
- Mentor portrait (the page's only photo, in the hero): `client/public/images/mentora-patricia-perfil.webp`.
- Logo: full logo with text `client/public/images/logo-mentoria.webp`; symbol only `logo-simbolo.webp` (color) and `logo-simbolo-noite.webp` (one color, navy).
- Mentor credentials (degrees and roles) in the current copy; "15+ anos de experiência em educação".
- No testimonials, statistics, or student numbers exist; do not invent them.

## Product Principles

- Lower the barrier to the first conversation: the booking action is always one tap away.
- Trust comes from the real person: the mentor's face, voice (video), and credentials carry the page.
- Specific to AMF, never a generic coaching template.
- Light on phones: fast to load, video downloads only on demand.

## Accessibility & Inclusion

Accessibility and inclusion is one of the service's own pillars, so the site must model it: WCAG AA contrast, full keyboard use, reduced-motion support, readable type on small screens.
