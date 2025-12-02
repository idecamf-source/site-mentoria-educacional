import { describe, it, expect } from "vitest";
import { getCurrentUser, getScheduledEvents } from "./calendly";

describe("Calendly API Credentials - Patrícia Dias", () => {
  it("deve autenticar com sucesso e retornar informações do usuário", async () => {
    const user = await getCurrentUser();
    
    expect(user).toBeDefined();
    expect(user.email).toBeDefined();
    expect(user.name).toBeDefined();
    
    console.log(`✓ Autenticado como: ${user.name} (${user.email})`);
  }, 15000);

  it("deve buscar eventos agendados sem erros", async () => {
    const events = await getScheduledEvents({
      count: 10,
    });
    
    expect(Array.isArray(events)).toBe(true);
    console.log(`✓ Encontrados ${events.length} eventos agendados`);
  }, 15000);
});
