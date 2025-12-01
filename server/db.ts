import { eq, desc, and, gte, lte, count, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, appointments, trackingEvents, InsertAppointment, InsertTrackingEvent } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ============================================
// APPOINTMENTS
// ============================================

export async function createAppointment(data: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(appointments).values(data);
  return result;
}

export async function getAppointments(filters?: {
  userId?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  let query = db.select().from(appointments);

  const conditions = [];
  if (filters?.userId) {
    conditions.push(eq(appointments.userId, filters.userId));
  }
  if (filters?.status) {
    conditions.push(eq(appointments.status, filters.status as any));
  }
  if (filters?.startDate) {
    conditions.push(gte(appointments.createdAt, filters.startDate));
  }
  if (filters?.endDate) {
    conditions.push(lte(appointments.createdAt, filters.endDate));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const result = await query.orderBy(desc(appointments.createdAt));
  return result;
}

export async function updateAppointmentStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(appointments)
    .set({ status: status as any, updatedAt: new Date() })
    .where(eq(appointments.id, id));
}

// ============================================
// TRACKING EVENTS
// ============================================

export async function createTrackingEvent(data: InsertTrackingEvent) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(trackingEvents).values(data);
  return result;
}

export async function getTrackingEvents(filters?: {
  eventType?: string;
  startDate?: Date;
  endDate?: Date;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  let query = db.select().from(trackingEvents);

  const conditions = [];
  if (filters?.eventType) {
    conditions.push(eq(trackingEvents.eventType, filters.eventType));
  }
  if (filters?.startDate) {
    conditions.push(gte(trackingEvents.createdAt, filters.startDate));
  }
  if (filters?.endDate) {
    conditions.push(lte(trackingEvents.createdAt, filters.endDate));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as any;
  }

  const result = await query.orderBy(desc(trackingEvents.createdAt));
  return result;
}

// ============================================
// ANALYTICS & KPIs
// ============================================

export async function getAppointmentStats(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions = [];
  if (startDate) {
    conditions.push(gte(appointments.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(lte(appointments.createdAt, endDate));
  }

  // Total de agendamentos
  let totalQuery = db.select({ count: count() }).from(appointments);
  if (conditions.length > 0) {
    totalQuery = totalQuery.where(and(...conditions)) as any;
  }
  const totalResult = await totalQuery;
  const total = totalResult[0]?.count || 0;

  // Por status
  let statusQuery = db.select({
    status: appointments.status,
    count: count()
  }).from(appointments).groupBy(appointments.status);
  
  if (conditions.length > 0) {
    statusQuery = statusQuery.where(and(...conditions)) as any;
  }
  const byStatus = await statusQuery;

  return {
    total,
    byStatus,
  };
}

export async function getEventStats(startDate?: Date, endDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const conditions = [];
  if (startDate) {
    conditions.push(gte(trackingEvents.createdAt, startDate));
  }
  if (endDate) {
    conditions.push(lte(trackingEvents.createdAt, endDate));
  }

  // Total de eventos
  let totalQuery = db.select({ count: count() }).from(trackingEvents);
  if (conditions.length > 0) {
    totalQuery = totalQuery.where(and(...conditions)) as any;
  }
  const totalResult = await totalQuery;
  const total = totalResult[0]?.count || 0;

  // Por tipo de evento
  let byTypeQuery = db.select({
    eventType: trackingEvents.eventType,
    count: count()
  }).from(trackingEvents).groupBy(trackingEvents.eventType);
  
  if (conditions.length > 0) {
    byTypeQuery = byTypeQuery.where(and(...conditions)) as any;
  }
  const byType = await byTypeQuery;

  return {
    total,
    byType,
  };
}

export async function getDailyStats(startDate: Date, endDate: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Agendamentos por dia
  const appointmentsByDay = await db.select({
    date: sql`DATE(${appointments.createdAt})`,
    count: count()
  })
  .from(appointments)
  .where(and(
    gte(appointments.createdAt, startDate),
    lte(appointments.createdAt, endDate)
  ))
  .groupBy(sql`DATE(${appointments.createdAt})`);

  // Eventos por dia
  const eventsByDay = await db.select({
    date: sql`DATE(${trackingEvents.createdAt})`,
    count: count()
  })
  .from(trackingEvents)
  .where(and(
    gte(trackingEvents.createdAt, startDate),
    lte(trackingEvents.createdAt, endDate)
  ))
  .groupBy(sql`DATE(${trackingEvents.createdAt})`);

  return {
    appointmentsByDay,
    eventsByDay,
  };
}
