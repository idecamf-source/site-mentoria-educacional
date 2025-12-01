import { google } from "googleapis";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import path from "path";

const SPREADSHEET_ID = "1VvD_VphMZvv5OXXXz0ec1Uefya59K3Wbl9uz7qRgCyk";
const SHEET_NAME = "Página1";

// Caminho para o arquivo de credenciais
const CREDENTIALS_PATH = path.join(process.cwd(), "google-credentials.json");

// Configurar autenticação com Service Account
const auth = new google.auth.GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

interface AttendanceData {
  attendanceNumber: number;
  attendanceDate: Date;
  studentName: string;
  course: string;
  semester: string;
  observedAspects: string | null;
  directivesTaken: string | null;
}

/**
 * Adiciona um novo atendimento à planilha do Google Sheets
 */
export async function addAttendanceToSheet(attendance: AttendanceData): Promise<boolean> {
  try {
    // Formatar data no padrão brasileiro
    const formattedDate = format(new Date(attendance.attendanceDate), "dd/MM/yyyy HH:mm", {
      locale: ptBR,
    });

    // Preparar linha de dados conforme estrutura da planilha
    // Colunas: A=Nº, B=Data/Horário, C=Aluno, D=Curso, E=Semestre, F=Ações (vazio), G=Aspectos, H=Diretivas
    const values = [
      [
        attendance.attendanceNumber,
        formattedDate,
        attendance.studentName,
        attendance.course,
        attendance.semester,
        "", // Coluna "Ações" vazia
        attendance.observedAspects || "",
        attendance.directivesTaken || "",
      ],
    ];

    // Adicionar linha à planilha
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:H`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values,
      },
    });

    console.log("✓ Atendimento adicionado ao Google Sheets:", response.data.updates?.updatedRange);
    return true;
  } catch (error) {
    console.error("✗ Erro ao adicionar atendimento ao Google Sheets:", error);
    if (error instanceof Error) {
      console.error("Detalhes do erro:", error.message);
    }
    return false;
  }
}

/**
 * Testa a conexão com o Google Sheets
 */
export async function testSheetsConnection(): Promise<boolean> {
  try {
    const response = await sheets.spreadsheets.get({
      spreadsheetId: SPREADSHEET_ID,
    });
    
    console.log("✓ Conexão com Google Sheets OK:", response.data.properties?.title);
    return true;
  } catch (error) {
    console.error("✗ Erro ao conectar com Google Sheets:", error);
    if (error instanceof Error) {
      console.error("Detalhes do erro:", error.message);
    }
    return false;
  }
}
