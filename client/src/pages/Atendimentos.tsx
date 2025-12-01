import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Plus, Download, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { exportAttendancesToExcel } from "@/lib/exportExcel";

const CURSOS = [
  "ADMINISTRAÇÃO",
  "DIREITO",
  "GASTRONOMIA",
  "ONTOPSICOLOGIA",
  "PEDAGOGIA",
  "SISTEMAS DE INFORMAÇÃO",
];

const SEMESTRES = ["1º", "2º", "3º", "4º", "5º", "6º", "7º", "8º"];

export default function Atendimentos() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    attendanceDate: new Date().toISOString().slice(0, 16),
    studentName: "",
    course: "",
    semester: "",
    observedAspects: "",
    directivesTaken: "",
  });

  const { data: attendances, isLoading, refetch } = trpc.attendances.list.useQuery();
  const { data: nextNumberData } = trpc.attendances.getNextNumber.useQuery();
  const createMutation = trpc.attendances.create.useMutation({
    onSuccess: () => {
      toast.success("Atendimento registrado com sucesso!");
      setIsDialogOpen(false);
      refetch();
      resetForm();
    },
    onError: (error) => {
      toast.error("Erro ao registrar atendimento: " + error.message);
    },
  });

  const deleteMutation = trpc.attendances.delete.useMutation({
    onSuccess: () => {
      toast.success("Atendimento excluído com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao excluir atendimento: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      attendanceDate: new Date().toISOString().slice(0, 16),
      studentName: "",
      course: "",
      semester: "",
      observedAspects: "",
      directivesTaken: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({
      attendanceDate: new Date(formData.attendanceDate),
      studentName: formData.studentName,
      course: formData.course,
      semester: formData.semester,
      observedAspects: formData.observedAspects,
      directivesTaken: formData.directivesTaken,
    });
  };

  const handleExportExcel = () => {
    if (!attendances || attendances.length === 0) {
      toast.error("Não há atendimentos para exportar");
      return;
    }
    try {
      exportAttendancesToExcel(attendances);
      toast.success("Planilha exportada com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar planilha");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Registro de Atendimentos</h1>
            <p className="text-muted-foreground">
              Gerencie os atendimentos da Mentoria Educacional
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleExportExcel} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar Excel
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Atendimento
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Registrar Novo Atendimento</DialogTitle>
                  <DialogDescription>
                    Nº do Atendimento: <strong>{nextNumberData?.nextNumber || "..."}</strong>
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="attendanceDate">Data e Horário *</Label>
                      <Input
                        id="attendanceDate"
                        type="datetime-local"
                        value={formData.attendanceDate}
                        onChange={(e) =>
                          setFormData({ ...formData, attendanceDate: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentName">Nome do Aluno *</Label>
                      <Input
                        id="studentName"
                        value={formData.studentName}
                        onChange={(e) =>
                          setFormData({ ...formData, studentName: e.target.value })
                        }
                        placeholder="Digite o nome completo"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="course">Curso *</Label>
                      <Select
                        value={formData.course}
                        onValueChange={(value) =>
                          setFormData({ ...formData, course: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {CURSOS.map((curso) => (
                            <SelectItem key={curso} value={curso}>
                              {curso}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semestre *</Label>
                      <Select
                        value={formData.semester}
                        onValueChange={(value) =>
                          setFormData({ ...formData, semester: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o semestre" />
                        </SelectTrigger>
                        <SelectContent>
                          {SEMESTRES.map((sem) => (
                            <SelectItem key={sem} value={sem}>
                              {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="observedAspects">Aspectos Observados</Label>
                    <Textarea
                      id="observedAspects"
                      value={formData.observedAspects}
                      onChange={(e) =>
                        setFormData({ ...formData, observedAspects: e.target.value })
                      }
                      placeholder="Descreva os aspectos observados durante o atendimento..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="directivesTaken">Diretivas Tomadas</Label>
                    <Textarea
                      id="directivesTaken"
                      value={formData.directivesTaken}
                      onChange={(e) =>
                        setFormData({ ...formData, directivesTaken: e.target.value })
                      }
                      placeholder="Descreva as diretivas e orientações fornecidas..."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button type="submit" disabled={createMutation.isPending}>
                      {createMutation.isPending ? "Salvando..." : "Salvar Atendimento"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Lista de Atendimentos</CardTitle>
            <CardDescription>
              Total de {attendances?.length || 0} atendimentos registrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Carregando...</div>
            ) : attendances && attendances.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Nº</TableHead>
                      <TableHead>Data/Horário</TableHead>
                      <TableHead>Aluno</TableHead>
                      <TableHead>Curso</TableHead>
                      <TableHead>Semestre</TableHead>
                      <TableHead className="w-[100px]">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendances.map((attendance) => (
                      <TableRow key={attendance.id}>
                        <TableCell className="font-bold">
                          {attendance.attendanceNumber}
                        </TableCell>
                        <TableCell>
                          {format(new Date(attendance.attendanceDate), "dd/MM/yyyy HH:mm", {
                            locale: ptBR,
                          })}
                        </TableCell>
                        <TableCell>{attendance.studentName}</TableCell>
                        <TableCell>{attendance.course}</TableCell>
                        <TableCell>{attendance.semester}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                deleteMutation.mutate({ id: attendance.id })
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg mb-2">Nenhum atendimento registrado ainda</p>
                <p className="text-sm">
                  Clique em "Novo Atendimento" para começar
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
