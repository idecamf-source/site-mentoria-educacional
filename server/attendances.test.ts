import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import * as db from "./db";

describe("Attendances System", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;
  let mockUser: any;

  beforeAll(async () => {
    // Criar usuário mock para testes
    mockUser = {
      id: 1,
      name: "Patrícia da Silva Dias",
      email: "patricia@amf.edu.br",
      role: "admin",
    };

    // Criar caller com contexto de usuário autenticado
    caller = appRouter.createCaller({
      user: mockUser,
    });
  });

  it("deve obter o próximo número de atendimento", async () => {
    const result = await caller.attendances.getNextNumber();
    expect(result).toHaveProperty("nextNumber");
    expect(typeof result.nextNumber).toBe("number");
    expect(result.nextNumber).toBeGreaterThanOrEqual(1);
  });

  it("deve criar um novo atendimento", async () => {
    const attendanceData = {
      attendanceDate: new Date("2025-02-24T19:00:00"),
      studentName: "João Silva",
      course: "ADMINISTRAÇÃO",
      semester: "3º",
      observedAspects: "Aluno demonstrou interesse em empreendedorismo",
      directivesTaken: "Recomendado leitura sobre gestão de negócios",
    };

    const result = await caller.attendances.create(attendanceData);
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("attendanceNumber");
    expect(typeof result.attendanceNumber).toBe("number");
  });

  it("deve listar atendimentos", async () => {
    const attendances = await caller.attendances.list();
    expect(Array.isArray(attendances)).toBe(true);
    
    if (attendances.length > 0) {
      const attendance = attendances[0];
      expect(attendance).toHaveProperty("id");
      expect(attendance).toHaveProperty("attendanceNumber");
      expect(attendance).toHaveProperty("studentName");
      expect(attendance).toHaveProperty("course");
      expect(attendance).toHaveProperty("semester");
    }
  });

  it("deve filtrar atendimentos por curso", async () => {
    const attendances = await caller.attendances.list({
      course: "ADMINISTRAÇÃO",
    });
    
    expect(Array.isArray(attendances)).toBe(true);
    attendances.forEach((attendance) => {
      expect(attendance.course).toBe("ADMINISTRAÇÃO");
    });
  });

  it("deve criar múltiplos atendimentos com números sequenciais", async () => {
    const firstAttendance = await caller.attendances.create({
      attendanceDate: new Date(),
      studentName: "Maria Santos",
      course: "DIREITO",
      semester: "2º",
    });

    const secondAttendance = await caller.attendances.create({
      attendanceDate: new Date(),
      studentName: "Pedro Oliveira",
      course: "GASTRONOMIA",
      semester: "1º",
    });

    expect(firstAttendance.success).toBe(true);
    expect(secondAttendance.success).toBe(true);
    expect(secondAttendance.attendanceNumber).toBeGreaterThan(
      firstAttendance.attendanceNumber
    );
  });
});
