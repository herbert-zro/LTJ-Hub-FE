import { AdminTitle } from "@/admin/components/AdminTitle";
import { MetricChart } from "@/admin/components/MetricChart";

import StatCard from "@/admin/components/StatCard";
import {
  UserRound,
  BriefcaseBusiness,
  ClipboardCheck,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Candidatos",
    value: "24,567",
    change: "+12.5% from last month",
    changeType: "positive" as const,
    icon: UserRound,
    color: "bg-blue-500",
  },
  {
    title: "Cantidad de Procesos",
    value: "84,230",
    change: "+8.2% from last month",
    changeType: "positive" as const,
    icon: BriefcaseBusiness,
    color: "bg-green-500",
  },
  {
    title: "Evaluaciones Completadas",
    value: "1,429",
    change: "-2.4% from last month",
    changeType: "negative" as const,
    icon: ClipboardCheck,
    color: "bg-purple-500",
  },
  {
    title: "Evaluaciones Pendientes",
    value: "324",
    change: "+0.3% from last month",
    changeType: "positive" as const,
    icon: Clock3,
    color: "bg-orange-500",
  },
];

/* const chartData = [
  { label: "Desktop", value: 65 },
  { label: "Mobile", value: 28 },
  { label: "Tablet", value: 7 },
]; */

/* const chartData = [
  { label: "Organic", value: 120 },
  { label: "Social", value: 80 },
  { label: "Paid", value: 40 },
];

const performanceData = [
  { label: "Page Views", value: 24567 },
  { label: "Sessions", value: 18234 },
  { label: "Users", value: 12847 },
  { label: "Bounce Rate", value: 23 },
]; */

export const DashboardPage = () => {
  return (
    <>
      {/* Welcome Section */}
      <AdminTitle
        title="Dashboard"
        subtitle="Bienvenido al panel de administración."
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="min-h-screen bg-background flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <MetricChart />
        </div>
      </div>

      {/* Charts and Activity Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
          <Chart title="Traffic Sources" data={chartData} />
          <Chart title="Performance Metrics" data={performanceData} />
        </div>
      </div> */}
    </>
  );
};
