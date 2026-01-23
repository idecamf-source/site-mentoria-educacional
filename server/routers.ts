import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,

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
});

export type AppRouter = typeof appRouter;
