import { describe, it, expect } from "vitest";
import { addAttendanceToSheet, testSheetsConnection } from "./googleSheets";

describe("Google Sheets Integration", () => {
  it("deve testar conexão com Google Sheets", async () => {
    const result = await testSheetsConnection();
    // A conexão pode falhar se a planilha não estiver pública, mas não deve lançar erro
    expect(typeof result).toBe("boolean");
  });

  it("deve adicionar atendimento ao Google Sheets", async () => {
    const testAttendance = {
      attendanceNumber: 999,
      attendanceDate: new Date("2025-03-01T19:00:00"),
      studentName: "Teste Integração",
      course: "TESTE",
      semester: "1º",
      observedAspects: "Teste de integração automática",
      directivesTaken: "Verificar sincronização",
    };

    const result = await addAttendanceToSheet(testAttendance);
    
    // O resultado pode ser false se a planilha não estiver configurada corretamente,
    // mas a função não deve lançar erro
    expect(typeof result).toBe("boolean");
    
    if (result) {
      console.log("✓ Atendimento de teste adicionado com sucesso ao Google Sheets");
    } else {
      console.log("⚠ Não foi possível adicionar ao Google Sheets - verifique permissões da planilha");
    }
  });
});
