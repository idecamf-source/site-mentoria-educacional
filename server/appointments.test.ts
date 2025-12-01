import { describe, expect, it, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as db from "./db";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createMockContext(isAdmin = false): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: isAdmin ? "admin" : "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {
        "user-agent": "test-agent",
        "x-forwarded-for": "127.0.0.1",
      },
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("Appointments Router", () => {
  it("should create an appointment", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.appointments.create({
      userName: "João Silva",
      userEmail: "joao@example.com",
      notes: "Primeira sessão de mentoria",
    });

    expect(result).toEqual({ success: true });
  });

  it("should list appointments for authenticated users", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Criar um agendamento primeiro
    await caller.appointments.create({
      userName: "Maria Santos",
      userEmail: "maria@example.com",
    });

    const appointments = await caller.appointments.list();

    expect(Array.isArray(appointments)).toBe(true);
    expect(appointments.length).toBeGreaterThan(0);
  });
});

describe("Tracking Router", () => {
  it("should track an event", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.tracking.track({
      eventType: "page_view",
      eventData: JSON.stringify({ page: "home" }),
      sessionId: "test-session-123",
    });

    expect(result).toEqual({ success: true });
  });

  it("should list tracking events for authenticated users", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    // Criar um evento primeiro
    await caller.tracking.track({
      eventType: "button_click",
      eventData: JSON.stringify({ button: "agendar" }),
    });

    const events = await caller.tracking.list();

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
  });
});

describe("Analytics Router", () => {
  it("should return appointment stats", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.analytics.appointmentStats();

    expect(stats).toHaveProperty("total");
    expect(stats).toHaveProperty("byStatus");
    expect(Array.isArray(stats.byStatus)).toBe(true);
  });

  it("should return event stats", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const stats = await caller.analytics.eventStats();

    expect(stats).toHaveProperty("total");
    expect(stats).toHaveProperty("byType");
    expect(Array.isArray(stats.byType)).toBe(true);
  });

  it("should return dashboard data with conversion rate", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const dashboard = await caller.analytics.dashboard();

    expect(dashboard).toHaveProperty("appointments");
    expect(dashboard).toHaveProperty("events");
    expect(dashboard).toHaveProperty("conversionRate");
    expect(dashboard).toHaveProperty("pageViews");
    expect(typeof dashboard.conversionRate).toBe("number");
  });
});
