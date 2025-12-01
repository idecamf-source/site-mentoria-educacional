import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { Calendar, TrendingUp, Users, MousePointerClick, BarChart3, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const [dateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // últimos 30 dias
    endDate: new Date(),
  });

  const { data: dashboardData, isLoading: isDashboardLoading } = trpc.analytics.dashboard.useQuery({
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
  });

  const { data: appointments, isLoading: isAppointmentsLoading } = trpc.appointments.list.useQuery();
  const { data: events, isLoading: isEventsLoading } = trpc.tracking.list.useQuery();

  const stats = useMemo(() => {
    if (!dashboardData) return null;

    const pending = dashboardData.appointments.byStatus.find(s => s.status === 'pending')?.count || 0;
    const confirmed = dashboardData.appointments.byStatus.find(s => s.status === 'confirmed')?.count || 0;
    const completed = dashboardData.appointments.byStatus.find(s => s.status === 'completed')?.count || 0;
    const cancelled = dashboardData.appointments.byStatus.find(s => s.status === 'cancelled')?.count || 0;

    const buttonClicks = dashboardData.events.byType.find(e => e.eventType === 'button_click')?.count || 0;

    return {
      totalAppointments: dashboardData.appointments.total,
      pending,
      confirmed,
      completed,
      cancelled,
      pageViews: dashboardData.pageViews,
      buttonClicks,
      conversionRate: dashboardData.conversionRate,
    };
  }, [dashboardData]);

  if (isDashboardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard de Mentoria</h1>
          <p className="text-muted-foreground">
            Estatísticas e KPIs dos últimos 30 dias
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Agendamentos</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.totalAppointments || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats?.pending || 0} pendentes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pageViews || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Visitas à página
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.conversionRate || 0}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Agendamentos / Visualizações
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cliques em Botões</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.buttonClicks || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Interações totais
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Status Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Status</CardTitle>
              <CardDescription>Agendamentos por status atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <span className="text-sm font-bold">{stats?.pending || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-sm">Confirmados</span>
                  </div>
                  <span className="text-sm font-bold">{stats?.confirmed || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="text-sm">Concluídos</span>
                  </div>
                  <span className="text-sm font-bold">{stats?.completed || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="text-sm">Cancelados</span>
                  </div>
                  <span className="text-sm font-bold">{stats?.cancelled || 0}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tipos de Eventos</CardTitle>
              <CardDescription>Distribuição de eventos rastreados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardData?.events.byType.map((event) => (
                  <div key={event.eventType} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{event.eventType.replace('_', ' ')}</span>
                    <span className="text-sm font-bold">{event.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for detailed data */}
        <Tabs defaultValue="appointments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="appointments">Agendamentos</TabsTrigger>
            <TabsTrigger value="events">Eventos</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lista de Agendamentos</CardTitle>
                <CardDescription>Todos os agendamentos registrados</CardDescription>
              </CardHeader>
              <CardContent>
                {isAppointmentsLoading ? (
                  <div className="text-center py-8">Carregando...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments?.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">#{appointment.id}</TableCell>
                          <TableCell>{appointment.userName || "—"}</TableCell>
                          <TableCell>{appointment.userEmail || "—"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                appointment.status === "completed"
                                  ? "default"
                                  : appointment.status === "confirmed"
                                  ? "secondary"
                                  : appointment.status === "cancelled"
                                  ? "destructive"
                                  : "outline"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(appointment.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Eventos Recentes</CardTitle>
                <CardDescription>Últimos eventos rastreados</CardDescription>
              </CardHeader>
              <CardContent>
                {isEventsLoading ? (
                  <div className="text-center py-8">Carregando...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Dados</TableHead>
                        <TableHead>Sessão</TableHead>
                        <TableHead>Data</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {events?.slice(0, 50).map((event) => (
                        <TableRow key={event.id}>
                          <TableCell className="font-medium capitalize">
                            {event.eventType.replace('_', ' ')}
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {event.eventData || "—"}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {event.sessionId?.substring(0, 12)}...
                          </TableCell>
                          <TableCell>
                            {format(new Date(event.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
