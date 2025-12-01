import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  appointments: router({
    create: publicProcedure
      .input(z.object({
        userName: z.string().optional(),
        userEmail: z.string().email().optional(),
        scheduledAt: z.date().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        await db.createAppointment({
          userId: ctx.user?.id,
          userName: input.userName,
          userEmail: input.userEmail,
          scheduledAt: input.scheduledAt,
          notes: input.notes,
          status: "pending",
        });
        return { success: true };
      }),

    list: protectedProcedure
      .input(z.object({
        status: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ input }) => {
        const appointments = await db.getAppointments(input || {});
        return appointments;
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
      }))
      .mutation(async ({ input }) => {
        await db.updateAppointmentStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  tracking: router({
    track: publicProcedure
      .input(z.object({
        eventType: z.string(),
        eventData: z.string().optional(),
        sessionId: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const userAgent = ctx.req.headers['user-agent'] || undefined;
        const ipAddress = (ctx.req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
                         (ctx.req.headers['x-real-ip'] as string) || 
                         undefined;

        await db.createTrackingEvent({
          userId: ctx.user?.id,
          eventType: input.eventType,
          eventData: input.eventData,
          sessionId: input.sessionId,
          userAgent,
          ipAddress,
        });
        return { success: true };
      }),

    list: protectedProcedure
      .input(z.object({
        eventType: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ input }) => {
        const events = await db.getTrackingEvents(input || {});
        return events;
      }),
  }),

  analytics: router({
    appointmentStats: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ input }) => {
        const stats = await db.getAppointmentStats(input?.startDate, input?.endDate);
        return stats;
      }),

    eventStats: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ input }) => {
        const stats = await db.getEventStats(input?.startDate, input?.endDate);
        return stats;
      }),

    dailyStats: protectedProcedure
      .input(z.object({
        startDate: z.date(),
        endDate: z.date(),
      }))
      .query(async ({ input }) => {
        const stats = await db.getDailyStats(input.startDate, input.endDate);
        return stats;
      }),

    dashboard: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      }).optional())
      .query(async ({ input }) => {
        const [appointmentStats, eventStats] = await Promise.all([
          db.getAppointmentStats(input?.startDate, input?.endDate),
          db.getEventStats(input?.startDate, input?.endDate),
        ]);

        // Calcular taxa de conversão
        const pageViews = eventStats.byType.find(e => e.eventType === 'page_view')?.count || 0;
        const conversionRate = pageViews > 0 ? (appointmentStats.total / pageViews) * 100 : 0;

        return {
          appointments: appointmentStats,
          events: eventStats,
          conversionRate: Math.round(conversionRate * 100) / 100,
          pageViews,
        };
      }),
  }),

  attendances: router({
    create: protectedProcedure
      .input(z.object({
        attendanceDate: z.date(),
        studentName: z.string(),
        course: z.string(),
        semester: z.string(),
        observedAspects: z.string().optional(),
        directivesTaken: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const nextNumber = await db.getNextAttendanceNumber();
        await db.createAttendance({
          attendanceNumber: nextNumber,
          attendanceDate: input.attendanceDate,
          studentName: input.studentName,
          course: input.course,
          semester: input.semester,
          observedAspects: input.observedAspects,
          directivesTaken: input.directivesTaken,
          mentorId: ctx.user.id,
        });
        return { success: true, attendanceNumber: nextNumber };
      }),

    list: protectedProcedure
      .input(z.object({
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        course: z.string().optional(),
        semester: z.string().optional(),
      }).optional())
      .query(async ({ input, ctx }) => {
        const attendances = await db.getAttendances({
          ...input,
          mentorId: ctx.user.role === 'admin' ? undefined : ctx.user.id,
        });
        return attendances;
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        attendanceDate: z.date().optional(),
        studentName: z.string().optional(),
        course: z.string().optional(),
        semester: z.string().optional(),
        observedAspects: z.string().optional(),
        directivesTaken: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await db.updateAttendance(id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({
        id: z.number(),
      }))
      .mutation(async ({ input }) => {
        await db.deleteAttendance(input.id);
        return { success: true };
      }),

    getNextNumber: protectedProcedure
      .query(async () => {
        const nextNumber = await db.getNextAttendanceNumber();
        return { nextNumber };
      }),
  }),
});

export type AppRouter = typeof appRouter;
