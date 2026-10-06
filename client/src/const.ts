export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Agendamento: WhatsApp da mentoria. Número só com dígitos, com DDI e DDD (ex.: "5555999999999").
// Se ficar vazio, os botões voltam a abrir o Calendly.
const WHATSAPP_NUMBER: string = import.meta.env.VITE_WHATSAPP_NUMBER || "5555999546611"; // +55 55 99954-6611
const WHATSAPP_MESSAGE = "Olá! Gostaria de agendar uma sessão de Mentoria Educacional.";

const CALENDLY_URL: string =
  import.meta.env.VITE_CALENDLY_EVENT_URL ||
  "https://calendly.com/patricia-dias-amf/mentoria-educacional";

export const AGENDAR_VIA_WHATSAPP = WHATSAPP_NUMBER.length > 0;

// Link usado por todos os botões "Agendar".
export const AGENDAR_URL: string = AGENDAR_VIA_WHATSAPP
  ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : CALENDLY_URL;

// Generate login URL at runtime so redirect URI reflects the current origin.
export const getLoginUrl = () => {
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${oauthPortalUrl}/app-auth`);
  url.searchParams.set("appId", appId);
  url.searchParams.set("redirectUri", redirectUri);
  url.searchParams.set("state", state);
  url.searchParams.set("type", "signIn");

  return url.toString();
};
