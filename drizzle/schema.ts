import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Tabela de agendamentos - registra cada tentativa de agendamento via Calendly
 */
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  userName: varchar("userName", { length: 255 }),
  userEmail: varchar("userEmail", { length: 320 }),
  scheduledAt: timestamp("scheduledAt"),
  status: mysqlEnum("status", ["pending", "confirmed", "completed", "cancelled"]).default("pending").notNull(),
  source: varchar("source", { length: 100 }).default("website"),
  notes: text("notes"),
  // Campos do Calendly
  calendlyEventUri: varchar("calendlyEventUri", { length: 500 }).unique(), // URI único do evento no Calendly
  calendlyInviteeUri: varchar("calendlyInviteeUri", { length: 500 }), // URI do convidado no Calendly
  calendlyStatus: varchar("calendlyStatus", { length: 50 }), // Status original do Calendly
  calendlyStartTime: timestamp("calendlyStartTime"), // Hora de início do Calendly
  calendlyEndTime: timestamp("calendlyEndTime"), // Hora de término do Calendly
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

/**
 * Tabela de eventos de rastreamento - registra interações dos usuários
 */
export const trackingEvents = mysqlTable("tracking_events", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").references(() => users.id),
  eventType: varchar("eventType", { length: 100 }).notNull(), // 'page_view', 'button_click', 'section_view', etc
  eventData: text("eventData"), // JSON com dados adicionais
  sessionId: varchar("sessionId", { length: 100 }),
  userAgent: text("userAgent"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrackingEvent = typeof trackingEvents.$inferSelect;
export type InsertTrackingEvent = typeof trackingEvents.$inferInsert;

/**
 * Tabela de atendimentos detalhados - registra cada sessão de mentoria com informações completas
 */
export const attendances = mysqlTable("attendances", {
  id: int("id").autoincrement().primaryKey(),
  appointmentId: int("appointmentId").references(() => appointments.id), // Referência ao agendamento
  attendanceNumber: int("attendanceNumber").notNull(), // Número sequencial do atendimento
  attendanceDate: timestamp("attendanceDate").notNull(), // Data e horário do atendimento
  studentName: varchar("studentName", { length: 255 }).notNull(), // Nome do aluno
  course: varchar("course", { length: 255 }).notNull(), // Curso
  semester: varchar("semester", { length: 50 }).notNull(), // Semestre
  observedAspects: text("observedAspects"), // Aspectos observados durante a sessão
  directivesTaken: text("directivesTaken"), // Diretivas tomadas
  mentorId: int("mentorId").references(() => users.id), // ID da mentora que registrou
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Attendance = typeof attendances.$inferSelect;
export type InsertAttendance = typeof attendances.$inferInsert;