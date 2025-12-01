import * as XLSX from "xlsx";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Attendance {
  id: number;
  attendanceNumber: number;
  attendanceDate: Date;
  studentName: string;
  course: string;
  semester: string;
  observedAspects: string | null;
  directivesTaken: string | null;
  mentorId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export function exportAttendancesToExcel(attendances: Attendance[]) {
  // Preparar dados no formato da planilha
  const data = attendances.map((attendance) => ({
    "Nº DE ATENDIMENTO": attendance.attendanceNumber,
    "DATA E HORÁRIO": format(new Date(attendance.attendanceDate), "dd/MM/yyyy HH:mm", {
      locale: ptBR,
    }),
    "ALUNO": attendance.studentName,
    "CURSO": attendance.course,
    "SEMESTRE": attendance.semester,
    "ASPECTOS OBSERVADOS": attendance.observedAspects || "",
    "DIRETIVAS TOMADAS": attendance.directivesTaken || "",
  }));

  // Criar workbook e worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);

  // Definir larguras das colunas
  const colWidths = [
    { wch: 20 }, // Nº DE ATENDIMENTO
    { wch: 18 }, // DATA E HORÁRIO
    { wch: 25 }, // ALUNO
    { wch: 20 }, // CURSO
    { wch: 12 }, // SEMESTRE
    { wch: 50 }, // ASPECTOS OBSERVADOS
    { wch: 50 }, // DIRETIVAS TOMADAS
  ];
  ws["!cols"] = colWidths;

  // Estilizar cabeçalho (primeira linha)
  const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
    if (!ws[cellAddress]) continue;
    
    // Aplicar estilo ao cabeçalho
    ws[cellAddress].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1a3a52" } }, // Azul marinho
      alignment: { horizontal: "center", vertical: "center" },
    };
  }

  // Adicionar worksheet ao workbook
  XLSX.utils.book_append_sheet(wb, ws, "Atendimentos");

  // Gerar arquivo e fazer download
  const fileName = `Mentoria_Educacional_${format(new Date(), "dd-MM-yyyy_HH-mm")}.xlsx`;
  XLSX.writeFile(wb, fileName);
}
