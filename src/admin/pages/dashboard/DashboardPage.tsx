import { AdminTitle } from "@/admin/components/AdminTitle";
import { EvaluacionesChart } from "@/admin/components/EvaluacionesChart";
import { MetricChart } from "@/admin/components/MetricChart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import StatCard from "@/admin/components/StatCard";
import {
  UserRound,
  BriefcaseBusiness,
  ClipboardCheck,
  Clock3,
} from "lucide-react";
import { CustomMenu } from "@/admin/components/custom/CustomMenu";

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

const performanceData = [
  {
    label: "Evaluaciones Completadas",
    value: 24567,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    label: "Evaluaciones en Proceso",
    value: 18234,
    color: "from-violet-500 to-violet-700",
  },
  {
    label: "Evaluaciones Pendientes",
    value: 12847,
    color: "from-rose-500 to-rose-600",
  },
];

export const DashboardPage = () => {
  return (
    <>
      {/* Welcome Section */}
      <CustomMenu />
      <AdminTitle
        title="Dashboard"
        subtitle="Bienvenido al panel de administración."
      />

      {/* Stats Grid */}
      {/* Stats (Mobile) */}
      <div className="mb-8 md:hidden">
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {stats.map((stat, index) => (
              <CarouselItem key={index} className="basis-[85%] pl-2">
                <StatCard {...stat} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      {/* Stats (Desktop) */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="flex items-start justify-center mb-8">
        <div className="w-full ">
          <MetricChart />
        </div>
      </div>

      <div className="grid grid-cols-2">
        <EvaluacionesChart
          title="Evaluaciones por Departamento"
          data={performanceData}
        />
      </div>
    </>
  );
};
